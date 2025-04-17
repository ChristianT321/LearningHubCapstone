import express from 'express';
import cors from 'cors';
import oracledb from 'oracledb';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

oracledb.getConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionString: process.env.DB_CONNECTION_STRING
})
  .then(conn => {
    console.log("Oracle DB connection succeeded!");
    conn.close();
  })
  .catch(err => {
    console.error("Oracle DB connection failed:", err.message);
  });

app.get('/api/facts', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECTION_STRING
    });

    const result = await connection.execute(
      `SELECT id, fact FROM rainforest_facts`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database connection failed.' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
