import LeaveRequest from "../models/LeaveRequest.js";  // ✅ Correct model import
import User from "../models/User.js";

// 🟢 Apply for Leave
export const applyLeave = async (req, res) => {
  try {
    const { reason, startDate, endDate } = req.body;

    const student = await User.findById(req.user.id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    const leave = new LeaveRequest({
      student: req.user.id,
      reason,
      startDate,
      endDate,
      status: "Pending", // ✅ Default status
    });

    await leave.save();
    res.status(201).json({ message: "Leave request submitted!", leave });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🟢 Get Leave Requests of a Student
export const getStudentLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find({ student: req.user.id });
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Fetch All Leave Requests (For Wardens)
export const getLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find().populate("student", "fullName rollNo");
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Leave Status (Approve/Reject)
export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // ✅ Find Leave Request
    const leaveRequest = await LeaveRequest.findById(id);
    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    // ✅ Update Status
    leaveRequest.status = status;
    await leaveRequest.save();

    res.json({ message: "Leave status updated successfully!", leaveRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
