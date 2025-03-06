import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["In Progress","Pending", "Resolved"], default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", ComplaintSchema);
