import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, rollNo: user.rollNo }, // ✅ Add rollNo
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Register a new user
export const register = async (req, res) => {
  try {
    console.log("📩 Register Request:", req.body);

    const { role, fullName, email, password } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (!["student", "warden", "admin"].includes(role)) {
      return res.status(403).json({ error: "Invalid role for registration." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      id: user._id,
      name: user.fullName,
      email: user.email,
      rollNo: user.rollNo, // ✅ Send rollNo in response
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Reset password
export const resetPassword = async (req, res) => {
  try {
    console.log("🔄 Reset Password Request:", req.body);

    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("❌ Reset Password Error:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
