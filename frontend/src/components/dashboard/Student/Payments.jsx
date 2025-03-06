import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { payStudentFees, getStudentDashboardData } from "../../../services/dashboardService";
import { useNavigate } from "react-router-dom";

const Payments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pendingFees, setPendingFees] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  useEffect(() => {
    if (user) {
      fetchStudentData();
    }
  }, [user]);

  const fetchStudentData = async () => {
    try {
      const data = await getStudentDashboardData(user.rollNo);
      setPendingFees(data.pendingFees || 0);
    } catch (error) {
      console.error("❌ Error fetching student data:", error);
    }
  };

  const handlePayment = async () => {
    if (!paymentAmount || isNaN(paymentAmount) || paymentAmount <= 0) {
      alert("⚠️ Please enter a valid amount.");
      return;
    }

    setLoading(true);
    try {
      const response = await payStudentFees(user.rollNo, paymentAmount, paymentMethod);
      console.log("🔍 API Response:", response); 

      if (response.message === "Payment recorded successfully!") {
        alert("✅ Payment successful!");
        setPendingFees((prev) => Math.max(0, prev - paymentAmount));
        setPaymentAmount(""); // Clear input field
      } else {
        alert("⚠️ Payment failed. Try again.");
      }
    } catch (error) {
      console.error("❌ Payment Error:", error);
      alert("⚠️ Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payments-container">
      {/* Header */}
      <header className="header54">
        <h1 className="logo7536">HostelHub</h1>
        <button className="home-button1025" onClick={() => navigate("/dashboard/student")}>🏠 Home</button>
      </header>

      <div className="payment-box">
        <h2>💰 Pay Hostel Fees</h2>
        <p><strong>Roll No:</strong> {user?.rollNo}</p>

        <p><strong>Pending Fees:</strong> ₹{pendingFees}</p>

        <label><strong>Enter Amount:</strong></label>
        <input 
          type="number" 
          value={paymentAmount} 
          onChange={(e) => setPaymentAmount(e.target.value)} 
          placeholder="Enter amount to pay" 
          className="amount-input"
        />

        <label><strong>Payment Method:</strong></label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="payment-select">
          <option value="UPI">UPI</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>

        <button className="pay-button" onClick={handlePayment} disabled={loading}>
          {loading ? "Processing..." : `Pay ₹${paymentAmount || 0}`}
        </button>
      </div>
    </div>
  );
};

export default Payments;
