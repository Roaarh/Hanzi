const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const authRoutes = require('./routes/auth');
const reservationsRoutes = require('./routes/reservations');
const adminRoutes = require('./routes/admin');
const app = express();


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hanzi backend is running');
});
app.get('/api/test-db', (req, res) => {
  db.query('SELECT 1 + 1 AS result', (err, rows) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json({ message: 'Database connected!', result: rows[0].result });
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
