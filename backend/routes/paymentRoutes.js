import express from "express";
import { payFees, getAllPayments, getStudentPayments } from "../controllers/paymentController.js";
import { protect, studentOnly, adminOnly } from "../middleware/authMiddleware.js";  // ✅ Import middleware

const router = express.Router();

router.post("/pay", protect, payFees);  // ✅ Protect payment route
router.get("/", protect, adminOnly, getAllPayments);  // ✅ Only admins can see all payments
router.get("/student", protect, studentOnly, getStudentPayments);  // ✅ Students can see their payments

export default router;
