import Payment from "../models/Payment.js";
import User from "../models/User.js";

// ✅ Simple Payment Processing
export const payFees = async (req, res) => {
  try {
    const { rollNo, amount, paymentMethod, transactionId } = req.body;

    // ✅ Find the student
    const student = await User.findOne({ rollNo });
    if (!student) return res.status(404).json({ error: "Student not found" });

    // ✅ Create a payment entry
    const newPayment = new Payment({
      student: student._id,
      amount,
      paymentMethod,
      transactionId: transactionId || `TXN-${Date.now()}`, // Generate ID if not provided
      status: "Paid",
    });

    await newPayment.save();
    res.status(201).json({ message: "Payment recorded successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🟡 **Get All Payments for Admin**
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("student", "fullName rollNo");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Fetch payments for the logged-in student
export const getStudentPayments = async (req, res) => {
    try {
      const student = await User.findById(req.user.id);
      if (!student) return res.status(404).json({ error: "Student not found" });
  
      const payments = await Payment.find({ student: req.user.id }); // ✅ Fetch only student's payments
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

export default { payFees, getAllPayments, getStudentPayments };
