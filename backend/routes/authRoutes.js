import express from "express";
import { register, login, resetPassword } from "../controllers/authController.js";

const router = express.Router();

// Register Route
router.post("/register", register);

// Login Route
router.post("/login", login);

// Reset Password Route
router.post("/reset-password", resetPassword);

export default router;
