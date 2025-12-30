const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const reservationsRoutes = require('./routes/reservations');
const adminRoutes = require('./routes/admin');

const app = express();

// CORS: allow local dev + Vercel
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://hanzi-eta.vercel.app',
    ],
    credentials: true,
  })
);

app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Simple health check
app.get('/', (req, res) => {
  res.send('Hanzi backend is running');
});

// MongoDB test route
app.get('/api/test-db', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    return res.json({
      message: 'MongoDB connected!',
      state: mongoose.connection.readyState,
    });
  }
  return res.status(500).json({
    message: 'MongoDB not connected',
    state: mongoose.connection.readyState,
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/admin', adminRoutes);

// Port (Render will inject process.env.PORT)
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
