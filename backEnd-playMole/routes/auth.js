const express = require('express');
const router = express.Router();
const { login, signup, getUser } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/signup', signup);
//router.get('/me', authMiddleware, getUser);

module.exports = router;
