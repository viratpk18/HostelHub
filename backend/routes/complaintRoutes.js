import express from "express";
import { fileComplaint, getStudentComplaints, getComplaints, updateComplaintStatus } from "../controllers/complaintController.js";
import { protect, wardenOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/file", protect, fileComplaint); 
router.get("/my-complaints", protect, getStudentComplaints);
router.get("/", protect, getComplaints); 
router.put("/:id/status", protect, wardenOnly, updateComplaintStatus);

export default router;
 