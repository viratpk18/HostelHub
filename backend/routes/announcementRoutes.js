import express from "express";
import Announcement from "../models/Announcement.js";

const router = express.Router();

// 🟢 Create a new announcement
router.post("/create", async (req, res) => {
  try {
    const { title, message, audience } = req.body;
    const newAnnouncement = new Announcement({ title, message, audience });
    await newAnnouncement.save();
    res.status(201).json({ message: "Announcement posted successfully!", newAnnouncement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🟡 Get all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🟠 Delete an announcement
router.delete("/:id", async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
