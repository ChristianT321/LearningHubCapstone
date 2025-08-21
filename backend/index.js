import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pkg from 'pg'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🔥 Backend loaded from:", __dirname);

const { Pool } = pkg
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const pool = new Pool({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
})

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running!')
})

// Get all students
app.get('/students', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, first_name AS "firstName", last_name AS "lastName", class_code AS "classCode" FROM students'
    )
    res.json(result.rows)
  } catch (err) {
    console.error('Error fetching students:', err)
    res.status(500).json({ error: err.message })
  }
})

// Get students by class code
app.get('/students/:classCode', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, first_name AS "firstName", last_name AS "lastName", class_code AS "classCode" FROM students WHERE class_code = $1',
      [req.params.classCode]
    )
    res.json(result.rows)
  } catch (err) {
    console.error('Error fetching students:', err)
    res.status(500).json({ error: err.message })
  }
})

// Update a student
app.put('/student/:id', async (req, res) => {
  const { firstName, lastName, classCode } = req.body
  const studentId = req.params.id

  try {
    const result = await pool.query(
      `UPDATE students 
       SET first_name = $1, last_name = $2, class_code = $3 
       WHERE id = $4 
       RETURNING id, first_name AS "firstName", last_name AS "lastName", class_code AS "classCode"`,
      [firstName || '', lastName || '', classCode || '', studentId]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Student not found' })
    }

    res.status(200).json(result.rows[0])

  } catch (err) {
    console.error('Error updating student:', err)
    res.status(500).json({ error: err.message })
  }
})

// Delete a student
app.delete('/student/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM students WHERE id = $1', [req.params.id])

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Student not exists' })
    }

    res.status(200).json({ message: 'Student deleted successfully' })
    
  } catch (err) {
    console.error('Error deleting student:', err)
    res.status(500).json({ error: err.message })
  }
})

app.post('/students/bulk', async (req, res) => {
  const rows = req.body.students;

  if (!Array.isArray(rows)) {
    return res.status(400).json({ error: 'Expected an array of students' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const insertedStudents = [];
    const skippedDuplicates = [];
    const skippedInvalid = [];

    for (const r of rows) {
      // normalize + validate
      const firstName = (r.firstName ?? '').trim();
      const lastName  = (r.lastName ?? '').trim();
      const classCode = (r.classCode ?? '').trim();

      if (!firstName || !lastName || !classCode) {
        skippedInvalid.push({ firstName, lastName, classCode, reason: 'Missing fields' });
        continue;
      }

      // Try to insert; DB blocks duplicates
      const ins = await client.query(
        `
        INSERT INTO students (first_name, last_name, class_code)
        VALUES ($1,$2,$3)
        ON CONFLICT DO NOTHING
        RETURNING id, first_name AS "firstName", last_name AS "lastName", class_code AS "classCode"
        `,
        [firstName, lastName, classCode]
      );

      if (ins.rowCount === 0) {
        // Duplicate
        skippedDuplicates.push({ firstName, lastName, classCode });
        continue;
      }

      const newStudent = ins.rows[0];
      const studentId = newStudent.id;

      // Related tables only for newly inserted students
      await client.query(
        `INSERT INTO progress_tracker (student_id, module1_complete, module2_complete, module3_complete, module4_complete, module5_complete)
         VALUES ($1, false, false, false, false, false)`,
        [studentId]
      );

      await client.query(
        `INSERT INTO test_results (student_id, test1_score, test2_score, test3_score, test4_score, test5_score)
         VALUES ($1, 0, 0, 0, 0, 0)`,
        [studentId]
      );

      insertedStudents.push(newStudent);
    }

    await client.query('COMMIT');
    return res.status(201).json({
      created: insertedStudents,
      skippedDuplicates,
      skippedInvalid,
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error in bulk insert:', err);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

app.post('/student', async (req, res) => {
  const firstName = (req.body.firstname ?? '').trim();
  const lastName  = (req.body.lastname ?? '').trim();
  const classCode = (req.body.classcode ?? '').trim();

  if (!firstName || !lastName || !classCode) {
    return res.status(400).json({ error: 'Missing required student info' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const ins = await client.query(
      `
      INSERT INTO students (first_name, last_name, class_code)
      VALUES ($1,$2,$3)
      ON CONFLICT DO NOTHING
      RETURNING id, first_name AS "firstName", last_name AS "lastName", class_code AS "classCode"
      `,
      [firstName, lastName, classCode]
    );

    if (ins.rowCount === 0) {
      // Duplicate detected by DB uniqueness
      await client.query('ROLLBACK');
      return res.status(409).json({ error: 'Student already exists in this class' });
    }

    const student = ins.rows[0];
    const studentId = student.id;

    await client.query(
      `INSERT INTO test_results (student_id, test1_score, test2_score, test3_score, test4_score, test5_score)
       VALUES ($1, 0, 0, 0, 0, 0)`,
      [studentId]
    );

    await client.query(
      `INSERT INTO progress_tracker (student_id, module1_complete, module2_complete, module3_complete, module4_complete, module5_complete)
       VALUES ($1, false, false, false, false, false)`,
      [studentId]
    );

    await client.query('COMMIT');
    return res.status(201).json(student);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error creating student:', err);

    // Extra safety if you created a UNIQUE *constraint* instead of the index
    // (or any other uniqueness violation bubbles up)
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Student already exists in this class' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

// Create a teacher
app.post('/teacher', async (req, res) => {
  const { email, classCode } = req.body

  if (!email || !classCode) {
    return res.status(400).json({ error: 'Email and class code are required' })
  }

  try {
    const existing = await pool.query(
      'SELECT * FROM teachers WHERE class_code = $1',
      [classCode]
    )

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Class code already exists' })
    }

    const result = await pool.query(
      'INSERT INTO teachers (email, class_code) VALUES ($1, $2) RETURNING id, email, class_code AS "classCode"',
      [email, classCode]
    )

    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Error inserting teacher:', err)
    res.status(500).json({ error: err.message })
  }
})

// Get all teachers
app.get('/teachers', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, class_code AS "classCode" FROM teachers'
    )
    res.json(result.rows)
  } catch (err) {
    console.error('Error fetching teachers:', err)
    res.status(500).json({ error: err.message })
  }
})

// Student login
app.post('/student/login', async (req, res) => {
  const { firstName, lastName, classCode } = req.body

  if (!firstName || !lastName || !classCode) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const result = await pool.query(
      `SELECT id, 
              first_name AS "firstName", 
              last_name AS "lastName", 
              class_code AS "classCode" 
       FROM students 
       WHERE LOWER(first_name) = LOWER($1) 
         AND LOWER(last_name) = LOWER($2) 
         AND LOWER(class_code) = LOWER($3) 
       LIMIT 1`,
      [firstName, lastName, classCode]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Name not recognized or invalid class code' })
    }

    res.json(result.rows[0])
  } catch (err) {
    console.error('Error during student login:', err)
    res.status(500).json({ error: err.message })
  }
})

app.post('/student/highscore', async (req, res) => {
  const { studentId, highscore } = req.body;

  if (!studentId || typeof highscore !== 'number') {
    return res.status(400).json({ error: 'Student ID and highscore are required' });
  }

  try {
    const result = await pool.query(
      'SELECT highscore FROM students WHERE id = $1',
      [studentId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const currentHighscore = result.rows[0].highscore ?? 0;

    if (highscore > currentHighscore) {
      const updateResult = await pool.query(
        `UPDATE students 
         SET highscore = $1 
         WHERE id = $2 
         RETURNING id, highscore`,
        [highscore, studentId]
      );
      return res.status(200).json(updateResult.rows[0]);
    } else {
      return res.status(200).json({ message: 'Highscore not updated — new score not higher' });
    }
  } catch (err) {
    console.error('Error saving highscore:', err);
    res.status(500).json({ error: err.message });
  }
})

app.get('/student/:id/highscore', async (req, res) => {
  const studentId = req.params.id;

  try {
    const result = await pool.query(
      `SELECT highscore FROM students WHERE id = $1`,
      [studentId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ highscore: result.rows[0].highscore });
  } catch (err) {
    console.error('Error getting highscore:', err)
    res.status(500).json({ error: err.message });
  }
})

app.post('/complete-module1', async (req, res) => {
  const { studentId, score } = req.body;

  if (!studentId || score === undefined) {
    return res.status(400).json({ error: 'Missing studentId or score' });
  }

  try {
    // Update test_results
    await pool.query(
      'UPDATE test_results SET test1_score = $1 WHERE student_id = $2',
      [score, studentId]
    );

    // Update progress_tracker
    await pool.query(
      'UPDATE progress_tracker SET module1_complete = true WHERE student_id = $1',
      [studentId]
    );

    res.status(200).json({ message: 'Module 1 complete and test score saved' });
  } catch (err) {
    console.error('Error completing module 1:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/complete-module2', async (req, res) => {
  const { studentId, score } = req.body;

  if (!studentId || score === undefined) {
    return res.status(400).json({ error: 'Missing studentId or score' });
  }

  try {
    await pool.query(
      'UPDATE test_results SET test2_score = $1 WHERE student_id = $2',
      [score, studentId]
    );

    await pool.query(
      'UPDATE progress_tracker SET module2_complete = true WHERE student_id = $1',
      [studentId]
    );

    res.status(200).json({ message: 'Module 2 complete and test score saved' });
  } catch (err) {
    console.error('Error completing module 2:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/complete-module3', async (req, res) => {
  const { studentId, score } = req.body;

  if (!studentId || score === undefined) {
    return res.status(400).json({ error: 'Missing studentId or score' });
  }

  try {
    await pool.query(
      'UPDATE test_results SET test3_score = $1 WHERE student_id = $2',
      [score, studentId]
    );

    await pool.query(
      'UPDATE progress_tracker SET module3_complete = true WHERE student_id = $1',
      [studentId]
    );

    res.status(200).json({ message: 'Module 3 complete and test score saved' });
  } catch (err) {
    console.error('Error completing module 3:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/complete-module4', async (req, res) => {
  const { studentId, score } = req.body;

  if (!studentId || score === undefined) {
    return res.status(400).json({ error: 'Missing studentId or score' });
  }

  try {
    await pool.query(
      'UPDATE test_results SET test4_score = $1 WHERE student_id = $2',
      [score, studentId]
    );

    await pool.query(
      'UPDATE progress_tracker SET module4_complete = true WHERE student_id = $1',
      [studentId]
    );

    res.status(200).json({ message: 'Module 4 complete and test score saved' });
  } catch (err) {
    console.error('Error completing module 4:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/complete-module5', async (req, res) => {
  const { studentId, score } = req.body;

  if (!studentId || score === undefined) {
    return res.status(400).json({ error: 'Missing studentId or score' });
  }

  try {
    await pool.query(
      'UPDATE test_results SET test5_score = $1 WHERE student_id = $2',
      [score, studentId]
    );

    await pool.query(
      'UPDATE progress_tracker SET module5_complete = true WHERE student_id = $1',
      [studentId]
    );

    res.status(200).json({ message: 'Module 5 complete and test score saved' });
  } catch (err) {
    console.error('Error completing module 5:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/progress/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM progress_tracker WHERE student_id = $1',
      [studentId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching progress:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/teacher/login', async (req, res) => {
  const { email, classCode } = req.body
  if (!email || !classCode) return res.status(400).json({ error: 'Missing email or classCode' })

  try {
    const { rows } = await pool.query(
      `SELECT id, email, class_code
       FROM teachers
       WHERE email = $1 AND class_code = $2
       LIMIT 1`,
      [email, classCode]
    )
    if (rows.length === 0) return res.status(401).json({ error: 'Invalid teacher email or class code' })
    res.json(rows[0])
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
})

app.get('/teacher/class/:classCode/roster', async (req, res) => {
  const { classCode } = req.params
  try {
    const { rows } = await pool.query(
      `
      SELECT
        s.id,
        s.first_name,
        s.last_name,
        s.class_code,
        tr.test1_score,
        tr.test2_score,
        tr.test3_score,
        tr.test4_score,
        tr.test5_score
      FROM students s
      LEFT JOIN test_results tr ON tr.student_id = s.id
      WHERE s.class_code = $1
      ORDER BY s.last_name, s.first_name;
      `,
      [classCode]
    )
    res.json(rows)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
})

app.get('/test_results/:studentId', async (req, res) => {
  const { studentId } = req.params
  try {
    const { rows } = await pool.query(
      `SELECT student_id, test1_score, test2_score, test3_score, test4_score, test5_score
       FROM test_results
       WHERE student_id = $1
       LIMIT 1`,
      [studentId]
    )
    res.json(rows[0] || { student_id: Number(studentId) })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
