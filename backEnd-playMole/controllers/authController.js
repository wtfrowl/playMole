const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    //finding user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await user.comparePassword(password);

    // Checking if user password matches
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = await user.generateAuthToken();
    user.password = "";
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    s;

    const user = new User({ username, password });

    // Save the user
    await user.save();

    // Generate an authentication token
    const token = await user.generateAuthToken();
    user.password = "";
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error creating user" });
  }
};
