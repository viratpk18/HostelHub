import Room from "../models/roomModel.js";
import User from "../models/userModel.js";

export const assignStudent = async (req, res) => {
  try {
    const { rollNo, roomId } = req.body;

    const student = await User.findOne({ rollNo });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    if (room.occupants.length >= room.capacity) {
      return res.status(400).json({ message: "Room is full" });
    }

    room.occupants.push(student._id);
    room.status = room.occupants.length === room.capacity ? "occupied" : "available";
    await room.save();

    // ✅ Set the hostel fees
    student.totalFees = 80000;
    student.pendingFees = 80000;
    await student.save();

    res.status(200).json({ message: `Student ${rollNo} assigned to room ${room.roomNumber}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
