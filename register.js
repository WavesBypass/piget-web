import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
      res.json({ message: 'User registered' });
    } catch (err) {
      res.status(500).json({ message: 'Registration failed' });
    }
  }
}