const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Reservation = require('../models/Reservation');

const router = express.Router();

// checking the admin role
const requireAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Admin access required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Admin role required' });
    }
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// dashboard stats
router.get('/stats', requireAdmin, async (req, res) => {
  try {
    const [totalUsers, totalReservations, totalAdmins] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Reservation.countDocuments({}),
      User.countDocuments({ role: 'admin' }),
    ]);

    res.json({
      totalUsers,
      totalReservations,
      totalAdmins,
    });
  } catch (err) {
    console.error('Stats error:', err);
    return res.status(500).json({ message: 'Database error' });
  }
});

// list of users (paginated)
router.get('/users', requireAdmin, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const [users, total] = await Promise.all([
      User.find({})
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit)
        .select('name email role created_at'),
      User.countDocuments({}),
    ]);

    res.json({
      users: users.map((u) => ({
        id: u._id.toString(),
        name: u.name,
        email: u.email,
        role: u.role,
        created_at: u.created_at,
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error('Users error:', err);
    return res.status(500).json({ message: 'Database error' });
  }
});

// update user
router.put('/users/:id', requireAdmin, async (req, res) => {
  const { name, email } = req.body;
  const userId = req.params.id;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email required' });
  }

  try {
    const updated = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Update user error:', err);
    return res.status(500).json({ message: 'Database error' });
  }
});

// delete user (non-admin only)
router.delete('/users/:id', requireAdmin, async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user || user.role === 'admin') {
      return res
        .status(404)
        .json({ message: 'User not found or is admin' });
    }

    await User.findByIdAndDelete(userId);

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete user error:', err);
    return res.status(500).json({ message: 'Database error' });
  }
});

// reservations list (paginated, with user info)
router.get('/reservations', requireAdmin, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const [reservations, total] = await Promise.all([
      Reservation.find({})
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit)
        .populate('user', 'name email'),
      Reservation.countDocuments({}),
    ]);

    res.json({
      reservations: reservations.map((r) => ({
        id: r._id.toString(),
        name: r.name,
        phone: r.phone,
        reservation_date: r.reservation_date,
        reservation_time: r.reservation_time,
        guests: r.guests,
        created_at: r.created_at,
        user_name: r.user ? r.user.name : null,
        user_email: r.user ? r.user.email : null,
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error('Reservations error:', err);
    return res.status(500).json({ message: 'Database error' });
  }
});

// delete reservation
router.delete('/reservations/:id', requireAdmin, async (req, res) => {
  const reservationId = req.params.id;

  try {
    const deleted = await Reservation.findByIdAndDelete(reservationId);

    if (!deleted) {
      return res
        .status(404)
        .json({ message: 'Reservation not found' });
    }

    res.json({ message: 'Reservation cancelled successfully' });
  } catch (err) {
    console.error('Delete reservation error:', err);
    return res.status(500).json({ message: 'Database error' });
  }
});

module.exports = router;
