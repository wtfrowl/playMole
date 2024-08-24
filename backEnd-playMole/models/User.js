const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv=require('dotenv').config();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: false,
    default:0
  }
});

//before Saving we hash the Password
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10); 
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      console.error('Error hashing password:', error);
      next(error);
    }
  } else {
    next();
  }
});


// Method to hash the password
userSchema.methods.hashPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};


// Add a method to compare passwords
userSchema.methods.comparePassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
};

// Add a method to generate a JWT token
userSchema.methods.generateAuthToken = async function() {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' }); // Adjust expiration as needed
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw error;
  }
};

module.exports = mongoose.model('User', userSchema);