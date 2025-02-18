import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Register a new user
export const register = async (req, res) => {
  try {
    const { role, fullName, email, password } = req.body;

    // Only allow registration for students
    if (role !== 'student') {
      return res.status(403).json({ error: "Only students can register." });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ role, fullName, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { role, email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Allow login for student, staff, warden, and admin roles
    if (!['student', 'staff', 'warden', 'admin'].includes(user.role)) {
      return res.status(403).json({ error: "Unauthorized role." });
    }

    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
