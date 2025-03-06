import { useEffect, useState } from "react";
import { getPayments } from "../../../services/dashboardService";
import { Link } from "react-router-dom";
import "./ManagePayments.css";

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const data = await getPayments();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  return (
    <div className="page-container">
      <header className="header">
        <h1 className="header-title">HostelHub</h1>
        <nav>
          <Link to="/dashboard/admin" className="home-button">🏠 Home</Link>
        </nav>
      </header>
      <div className="payments-container">
        <h2>💰 Student Payments</h2>

        <table className="payment-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Full Name</th>
              <th>Amount (₹)</th>
              <th>Payment Method</th>
              <th>Transaction ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-payments">No payments recorded.</td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.student?.rollNo || "N/A"}</td>
                  <td>{payment.student?.fullName || "Unknown"}</td> {/* ✅ Fix: Show fullName */}
                  <td>₹{payment.amount}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>{payment.transactionId}</td>
                  <td className={payment.status === "Paid" ? "paid" : "pending"}>{payment.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePayments;
