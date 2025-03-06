import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  occupants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Students assigned to the room
  status: { type: String, enum: ["available", "occupied"], default: "available" },
}, { timestamps: true });

export default mongoose.model("Room", RoomSchema);
