const User = require("../models/User");

exports.getScores = async (req, res) => {
  try {
    const { username } = req.body;
    const sortedUsers = await User.find().sort({ score: -1 });
    const myRank =
      (await sortedUsers.findIndex((user) => user.username === username)) + 1;
    // User.find({ username: { $ne: username } }) if want to exclude
    const topScores = await User.find()
      .sort({ score: -1 })
      .limit(10)
      .select("username score");
    res.json({ topScores, myRank });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateScore = async (req, res) => {
  try {
    const { username, score } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (score > user.score) {
      user.score = Number(score);
      await user.save();
      res.json({ message: "Score updated successfully" });
    } else {
      res.status(401).json({ message: "not higher than prev" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
