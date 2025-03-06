import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Room from "../models/Room.js";
import Payment from "../models/Payment.js";
import Announcement from "../models/Announcement.js";

const router = express.Router();

// ✅ Get student dashboard data
router.get("/dashboard/:rollNo", protect, async (req, res) => {
  try {
    const student = await User.findOne({ rollNo: req.params.rollNo }).select("-password");

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // ✅ Fetch Room Details
    const room = await Room.findOne({ occupants: student._id });
    const roomNumber = room ? room.roomNumber : "Not Assigned";

    // ✅ Fetch Pending Fees
    const payments = await Payment.find({ student: student._id });
    const pendingFees = payments.reduce((sum, payment) => sum + payment.amount, 0);

    // ✅ Fetch Announcements
    const announcements = await Announcement.find({ audience: { $in: ["Students", "Everyone"] } });

    res.json({
      name: student.fullName,
      email: student.email,
      rollNo: student.rollNo,
      roomNumber,
      pendingFees,
      announcements,
    });
  } catch (error) {
    console.error("❌ Error fetching student dashboard data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
