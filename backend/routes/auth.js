const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

// signup
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Name, email, and password are required' });
  }

  const checkSql = 'SELECT id FROM users WHERE email = ?';
  db.query(checkSql, [email], async (err, rows) => {
    if (err) {
      console.error('DB error on check:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql =
        'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)';
      db.query(
        insertSql,
        [name, email, hashedPassword, 'user'],
        (err2, result) => {
          if (err2) {
            console.error('DB error on insert:', err2);
            return res.status(500).json({ message: 'Database error' });
          }

          return res
            .status(201)
            .json({ message: 'User created successfully' });
        }
      );
    } catch (hashErr) {
      console.error('Hash error:', hashErr);
      return res
        .status(500)
        .json({ message: 'Error processing password' });
    }
  });
});

// login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email and password are required' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, rows) => {
    if (err) {
      console.error('DB error on login:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: 'Invalid email or password' });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
});

module.exports = router;
