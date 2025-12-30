const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

// creating reservation
router.post('/', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Login required' });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { name, phone, reservation_date, reservation_time, guests } = req.body;

    // Validate all fields
    if (!name || !phone || !reservation_date || !reservation_time || !guests) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const sql = `
      INSERT INTO reservations (user_id, name, phone, reservation_date, reservation_time, guests)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql, 
      [userId, name, phone, reservation_date, reservation_time, parseInt(guests)], 
      (err, result) => {
        if (err) {
          console.error('DB Insert Error:', err);
          return res.status(500).json({ message: 'Database error' });
        }

        console.log(`✅ New reservation #${result.insertId} by user ${userId}`);
        res.status(201).json({
          message: 'Reservation created successfully!',
          reservationId: result.insertId
        });
      }
    );
  } catch (err) {
    console.error('Token error:', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
});

// gets the user reservation
router.get('/my', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Login required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const sql = `
      SELECT id, name, phone, reservation_date, reservation_time, guests, created_at
      FROM reservations 
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;

    db.query(sql, [userId], (err, rows) => {
      if (err) {
        console.error('DB Select Error:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      res.json(rows);
    });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
