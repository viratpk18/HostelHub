import express from "express";
import Room from "../models/Room.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find().populate("occupants", "fullName rollNo"); // ✅ Use fullName
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put("/assign", async (req, res) => {
  try {
    const { rollNo, roomId } = req.body;

    // ✅ Find student by roll number
    const student = await User.findOne({ rollNo });
    if (!student) return res.status(404).json({ error: "Student not found" });

    // ✅ Find room by ID
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ error: "Room not found" });

    // ✅ Check if student is already assigned to a room
    if (student.roomNumber && student.roomNumber !== "Not Assigned") {
      return res.status(400).json({ error: `Student is already assigned to Room ${student.roomNumber}` });
    }

    // ✅ Check if room is full
    if (room.occupants.length >= room.capacity) {
      return res.status(400).json({ error: "Room is full" });
    }

    // ✅ Assign student to the room
    student.roomNumber = room.roomNumber;
    await student.save();

    // ✅ Update room's occupants
    room.occupants.push(student._id);
    room.status = room.occupants.length === room.capacity ? "occupied" : "available";
    await room.save();

    res.json({ message: `Student ${student.fullName} assigned to Room ${room.roomNumber}`, room, student });
  } catch (error) {
    console.error("❌ Error assigning student:", error);
    res.status(500).json({ error: error.message });
  }
});


// 🟡 Remove Student from Room
router.put("/remove", async (req, res) => {
  try {
    const { rollNo, roomId } = req.body;

    // Find student by roll number
    const student = await User.findOne({ rollNo });
    if (!student) return res.status(404).json({ error: "Student not found" });

    // Find room
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ error: "Room not found" });

    // Remove student from room
    room.occupants = room.occupants.filter(id => id.toString() !== student._id.toString());
    room.status = room.occupants.length === 0 ? "available" : "occupied";
    await room.save();

    res.json({ message: "Student removed from room", room });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
