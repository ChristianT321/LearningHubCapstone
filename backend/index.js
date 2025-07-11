import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pkg from 'pg'

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

app.get('/', (req, res) => {
  res.send('Backend is running!')
})

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

app.delete('/student/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM students WHERE id = $1', [req.params.id])
    res.status(204).send()
  } catch (err) {
    console.error('Error deleting student:', err)
    res.status(500).json({ error: err.message })
  }
})

app.post('/students/bulk', async (req, res) => {
  const students = req.body.students

  if (!Array.isArray(students)) {
    return res.status(400).json({ error: 'Expected an array of students' })
  }

  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const insertedStudents = []

    for (const student of students) {
      const { firstName, lastName, classCode } = student

      const exists = await client.query(
        `SELECT id FROM students WHERE LOWER(first_name) = LOWER($1) AND LOWER(last_name) = LOWER($2) AND LOWER(class_code) = LOWER($3)`,
        [firstName, lastName, classCode]
      )

      if (exists.rows.length > 0) {
        await client.query('ROLLBACK')
        return res.status(409).json({ error: 'Duplicate student exists' })
      }

      const result = await client.query(
        `INSERT INTO students (first_name, last_name, class_code)
         VALUES ($1, $2, $3)
         RETURNING id, first_name AS "firstName", last_name AS "lastName", class_code AS "classCode"`,
        [firstName || '', lastName || '', classCode || '']
      )
      insertedStudents.push(result.rows[0])
    }

    await client.query('COMMIT')
    res.status(201).json(insertedStudents)
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Error bulk inserting students:', err)
    res.status(500).json({ error: err.message })
  } finally {
    client.release()
  }
})

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
