const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { firstName, email, password, isBusiness } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      email,
      password: hashedPassword,
      isBusiness,
    });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.isBusiness ? "business" : "user" },
      process.env.JWT_SECRET
    );
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

module.exports = { signup };
