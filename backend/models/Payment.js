import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["Cash", "UPI", "Card", "Bank Transfer"], required: true },
    transactionId: { type: String, unique: true },
    status: { type: String, enum: ["Paid", "Pending"], default: "Paid" },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
