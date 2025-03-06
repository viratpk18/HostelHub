import express from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// 🟢 Update Admin Profile
router.put("/profile", async (req, res) => {
  try {
    const { adminId, name, email } = req.body;
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { name, email },
      { new: true }
    );
    res.json({ message: "Profile updated successfully!", updatedAdmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🟢 Change Password
router.put("/change-password", async (req, res) => {
  try {
    const { adminId, currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(adminId);
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect current password" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    res.json({ message: "Password changed successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🟢 Update Hostel Details
router.put("/hostel-details", async (req, res) => {
  try {
    const { hostelName, address, contact } = req.body;
    // Save this information in the database (assuming there's a Settings model)
    res.json({ message: "Hostel details updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
