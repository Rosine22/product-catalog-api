const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'mysecretkey'; // Replace with a secure key in production

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password ,role} = req.body;

  try {
    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with hashed password
    user = new User({ username, email, password: hashedPassword, role});
    await user.save();

    // Generate JWT token
    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login user

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Search for user by username (or email if you want to support both)
    const user = await User.findOne({ username }); // Make sure you are using the correct field
    if (!user) {
      console.log("User not found:", username); // Debugging log
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Log the stored password for debugging
    console.log("Stored hashed password:", user.password);
    console.log("Entered password:", password);

    // Compare entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch); // Debugging log

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If password matches, generate a JWT token
    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '3h' });

    // Send token as response
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in loginUser:", error); // Debugging log
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Export functions
module.exports = { registerUser, loginUser };
