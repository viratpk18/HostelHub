import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true }, // ✅ Added Roll Number
    role: { type: String, enum: ["student", "warden", "admin"], default: "student" },
    roomNumber: { type: String, default: "Not Assigned" }, // Store Room No.
    pendingFees: { type: Number, default: 0 }, // Track Pending Fees
    announcements: { type: String, default: "No new announcements." }
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with stored hash
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", UserSchema);