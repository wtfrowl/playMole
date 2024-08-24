const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getScores,updateScore } = require('../controllers/scoreController');

router.get('/leaderboard', getScores);
router.patch('/update',authMiddleware,updateScore);

module.exports = router;
