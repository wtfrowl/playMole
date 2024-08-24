const express = require('express');
 const authRoutes = require('./routes/auth');
 const scoreRoutes = require('./routes/score');
const app = express();
const dotenv=require('dotenv').config();
const { MONGO_URI } = process.env;
const mongoose = require('mongoose');
const cors=require('cors')
// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/scores', scoreRoutes);

// Connect to MongoDB


const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
