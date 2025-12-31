const express = require('express');
const jwt = require('jsonwebtoken');

const Reservation = require('../models/Reservation');

const router = express.Router();

// creating reservation
router.post('/', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Login required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; // this is Mongo ObjectId string

    const { name, phone, reservation_date, reservation_time, guests } = req.body;

    if (!name || !phone || !reservation_date || !reservation_time || !guests) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const reservation = new Reservation({
      user: userId,
      name,
      phone,
      reservation_date: new Date(reservation_date),
      reservation_time,
      guests: parseInt(guests, 10),
    });

    const saved = await reservation.save();

    console.log(`✅ New reservation ${saved._id} by user ${userId}`);

    res.status(201).json({
      message: 'Reservation created successfully!',
      reservationId: saved._id,
    });
  } catch (err) {
    console.error('Reservation create error:', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
});

// gets the user reservations
router.get('/my', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Login required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const reservations = await Reservation
      .find({ user: userId })
      .sort({ created_at: -1 });

    res.json(reservations);
  } catch (err) {
    console.error('Reservations fetch error:', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
