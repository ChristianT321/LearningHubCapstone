import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pkg from 'pg'

const { Pool } = pkg
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// PostgreSQL connection
const pool = new Pool({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
})

// ✅ Default route
app.get('/', (req, res) => {
  res.send('🎉 Backend is running!')
})

// ✅ GET all students
app.get('/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students')
    res.json(result.rows)
  } catch (err) {
    console.error('Error fetching students:', err)
    res.status(500).json({ error: err.message })
  }
})

// ✅ POST a new student
app.post('/student', async (req, res) => {
  const { firstName, lastName, classCode } = req.body

  try {
    const result = await pool.query(
      'INSERT INTO students (first_name, last_name, class_code) VALUES ($1, $2, $3) RETURNING *',
      [firstName || '', lastName || '', classCode || '']
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Error inserting student:', err)
    res.status(500).json({ error: err.message })
  }
})

// ✅ POST teacher signup
app.post('/teacher', async (req, res) => {
  const { email, classCode } = req.body

  if (!email || !classCode) {
    return res.status(400).json({ error: 'Email and class code are required' })
  }

  try {
    // Check if classCode already exists for a teacher
    const existing = await pool.query(
      'SELECT * FROM teachers WHERE class_code = $1',
      [classCode]
    )

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Class code already exists' })
    }

    // Insert new teacher
    const result = await pool.query(
      'INSERT INTO teachers (email, class_code) VALUES ($1, $2) RETURNING *',
      [email, classCode]
    )

    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Error inserting teacher:', err)
    res.status(500).json({ error: err.message })
  }
})

// ✅ POST student login
app.post('/student/login', async (req, res) => {
  const { firstName, lastName, classCode } = req.body

  if (!firstName || !lastName || !classCode) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const result = await pool.query(
      `SELECT * FROM students 
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

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})
