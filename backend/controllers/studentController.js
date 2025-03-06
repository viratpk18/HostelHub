import User from "../models/User.js";
import Payment from "../models/Payment.js";
import Room from "../models/Room.js";
import Announcement from "../models/Announcement.js";

export const getStudentDashboard = async (req, res) => {
  try {
    const { rollNo } = req.params;

    // Find student details
    const student = await User.findOne({ rollNo }).select("-password");
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Fetch room details
    const room = await Room.findOne({ occupants: student._id });

    // Fetch pending fees
    const payments = await Payment.findOne({ student: student._id });

    // Fetch announcements
    const announcements = await Announcement.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      name: student.fullName,
      email: student.email,
      rollNo: student.rollNo,
      roomNumber: room ? room.roomNumber : "Not Assigned",
      pendingFees: payments ? payments.amount : 0,
      announcements: announcements.length > 0 ? announcements : "No new announcements.",
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student dashboard data", error });
  }
};
