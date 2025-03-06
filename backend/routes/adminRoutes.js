import express from "express";
import { 
  getDashboardStats, 
  getAllStudents, 
  addStudent,
  updateStudent,
  deleteStudent,
  getAllRooms, 
  getPayments, 
  createAnnouncement, 
  addRoom
} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard-stats", protect, adminOnly, getDashboardStats);
router.get("/students", protect, adminOnly, getAllStudents);
router.post("/students", protect, adminOnly, addStudent);
router.put("/students/:id", protect, adminOnly, updateStudent);
router.delete("/students/:id", protect, adminOnly, deleteStudent);
router.get("/rooms", protect, adminOnly, getAllRooms);
router.get("/payments", protect, adminOnly, getPayments);
router.post("/announcements", protect, adminOnly, createAnnouncement);
router.post("/rooms", protect, adminOnly, addRoom);

export default router;
