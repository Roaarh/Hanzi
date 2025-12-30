const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');

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

// dashbord stats
router.get('/stats', requireAdmin, (req, res) => {
  const stats = [
    'SELECT COUNT(*) as total_users FROM users WHERE role = "user"',
    'SELECT COUNT(*) as total_reservations FROM reservations',
    'SELECT COUNT(*) as total_admins FROM users WHERE role = "admin"'
  ];

  let results = {};
  
  stats.forEach((sql, index) => {
    db.query(sql, (err, rows) => {
      if (err) {
        console.error('Stats error:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      if (index === 0) results.totalUsers = rows[0].total_users;
      if (index === 1) results.totalReservations = rows[0].total_reservations;
      if (index === 2) results.totalAdmins = rows[0].total_admins;
      
      if (Object.keys(results).length === 3) {
        res.json(results);
      }
    });
  });
});

// the list of users
router.get('/users', requireAdmin, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const sql = `
    SELECT id, name, email, role, created_at 
    FROM users 
    ORDER BY created_at DESC 
    LIMIT ? OFFSET ?
  `;
  
  db.query(sql, [limit, offset], (err, users) => {
    if (err) {
      console.error('Users error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    
    db.query('SELECT COUNT(*) as total FROM users', (err2, count) => {
      res.json({
        users,
        pagination: {
          page,
          limit,
          total: count[0].total,
          pages: Math.ceil(count[0].total / limit)
        }
      });
    });
  });
});

// updating the user
router.put('/users/:id', requireAdmin, (req, res) => {
  const { name, email } = req.body;
  const userId = req.params.id;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email required' });
  }

  const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  db.query(sql, [name, email, userId], (err, result) => {
    if (err) {
      console.error('Update user error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User updated successfully' });
  });
});

//delete user
router.delete('/users/:id', requireAdmin, (req, res) => {
  const userId = req.params.id;

  const sql = 'DELETE FROM users WHERE id = ? AND role != "admin"';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Delete user error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found or is admin' });
    }
    
    res.json({ message: 'User deleted successfully' });
  });
});

router.get('/reservations', requireAdmin, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const sql = `
    SELECT 
      r.id, 
      r.name, 
      r.phone, 
      r.reservation_date, 
      r.reservation_time, 
      r.guests, 
      r.created_at,
      u.name as user_name,
      u.email as user_email
    FROM reservations r
    LEFT JOIN users u ON r.user_id = u.id
    ORDER BY r.created_at DESC
    LIMIT ? OFFSET ?
  `;
  
  db.query(sql, [limit, offset], (err, reservations) => {
    if (err) {
      console.error('Reservations error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    
    db.query('SELECT COUNT(*) as total FROM reservations', (err2, count) => {
      res.json({
        reservations,
        pagination: {
          page,
          limit,
          total: count[0].total,
          pages: Math.ceil(count[0].total / limit)
        }
      });
    });
  });
});

router.delete('/reservations/:id', requireAdmin, (req, res) => {
  const reservationId = req.params.id;

  const sql = 'DELETE FROM reservations WHERE id = ?';
  db.query(sql, [reservationId], (err, result) => {
    if (err) {
      console.error('Delete reservation error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    
    res.json({ message: 'Reservation cancelled successfully' });
  });
});

module.exports = router;
