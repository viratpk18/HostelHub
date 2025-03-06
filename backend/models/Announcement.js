import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    audience: { type: String, enum: ["Everyone", "Students", "Wardens"], default: "Everyone" },
  },
  { timestamps: true }
);

export default mongoose.model("Announcement", AnnouncementSchema);
