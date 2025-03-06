import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  },
  { timestamps: true, collection: "leaverequests" } // ✅ Explicit collection name
);

export default mongoose.model("LeaveRequest", LeaveSchema);
