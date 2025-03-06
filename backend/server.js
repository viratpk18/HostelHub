import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import roomRotes from "./routes/roomRoutes.js";
import authRoutes from "./routes/authRoutes.js"; 
import adminRoutes from "./routes/adminRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js"; 
import settingsRoutes from "./routes/settingsRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json()); 

// Route
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes); 
app.use("/api/room", roomRotes);
app.use("/api/announcements", announcementRoutes); 
app.use("/api/settings", settingsRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/leave", leaveRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });
