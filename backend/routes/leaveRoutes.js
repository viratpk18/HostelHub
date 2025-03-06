import express from "express";
import { protect, wardenOnly } from "../middleware/authMiddleware.js";
import { applyLeave, getStudentLeaveRequests, getLeaveRequests, updateLeaveStatus } from "../controllers/leaveController.js";

const router = express.Router();

// ✅ Student: Apply for Leave
router.post("/apply", protect, applyLeave);

// 🟡 Fetch leave requests of a specific student
router.get("/my-leaves", protect, getStudentLeaveRequests);

// ✅ Warden: Get All Leave Requests
router.get("/", protect, wardenOnly, getLeaveRequests);

// ✅ Warden: Update Leave Status (Approve/Reject)
router.put("/:id/status", protect, wardenOnly, updateLeaveStatus);

export default router;
