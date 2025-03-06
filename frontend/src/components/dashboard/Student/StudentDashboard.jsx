import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getMyComplaints, getMyLeaveRequests, getStudentDashboardData } from "../../../services/dashboardService";
import "./StudentDashboard.css"; 

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [studata, setstudata] = useState(null);

  useEffect(() => {
    if (!user?.rollNo) {
      console.error("❌ No roll number found, cannot fetch student data.");
      return;
    }
    fetchStudentData();
    fetchComplaints();
    fetchLeaveRequests();
  }, [user?.rollNo]);

  const fetchComplaints = async () => {
    try {
      const data = await getMyComplaints();
      setComplaints(data || []); 
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const fetchLeaveRequests = async () => {
    try {
      const data = await getMyLeaveRequests();
      setLeaveRequests(data || []); 
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const fetchStudentData = async () => {
    try {
      const data = await getStudentDashboardData(user.rollNo);
      console.log("📢 API Response:", data); // Log full response
  
      if (!data || typeof data !== "object") {
        console.error("❌ Invalid data received:", data);
        return;
      }
  
      // Log the values before calculations
      console.log("🔍 Data Received:", {
        totalFees: data.totalFees,
        paidAmount: data.paidAmount,
      });
  
      // Ensure numbers are correctly parsed
      const totalFees = parseFloat(data.totalFees) || 0;
      const paidAmount = parseFloat(data.paidAmount) || 0;
      const pendingFees = Math.max(totalFees - paidAmount, 0); // Avoid negative values
  
      console.log("✅ Corrected Values:", { totalFees, paidAmount, pendingFees });
  
      setstudata({ ...data, totalFees, paidAmount, pendingFees });
    } catch (error) {
      console.error("❌ Error fetching student data:", error);
    }
  };   
  
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar5">
        <h2 className="logo2">🏠 HostelHub</h2>
        <ul>
          <li onClick={() => navigate("/student/profile")}>👤 My Profile</li>
          <li onClick={() => navigate("/student/complaints")}>📝 Report Complaints</li>
          <li onClick={() => navigate("/student/leave")}>📆 Request Leave</li>
          <li onClick={() => navigate("/student/announcements")}>📢 Announcements</li>
          <li onClick={() => navigate("/student/payments")}>💰 Payments</li>
          <li onClick={() => navigate("/student/logout")}>🚪 Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <h2>Welcome back, {studata?.name || "Student"}! 🎉</h2>
          <button className="logout-btn" onClick={() => navigate("/student/logout")}>Logout</button>
        </header>

        <div className="stats-container">
          <div className="stat-card">
            <h3>Pending Payments</h3>
            <p className="amount">₹{studata?.pendingFees || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Total Complaints</h3>
            <p className="count">{complaints.length}</p>
          </div>
          <div className="stat-card">
            <h3>Leave Requests</h3>
            <p className="count">{leaveRequests.length}</p>
          </div>
        </div>

        <div className="data-section">
          <div className="data-card">
            <h3>Recent Complaints</h3>
            {complaints.length > 0 ? (
              complaints.slice(0, 3).map((complaint) => (
                <p key={complaint._id}>
                  {complaint.title} - 
                  <span className={complaint.status === "Resolved" ? "status-resolved" : "status-pending"}>
                    {complaint.status}
                  </span>
                </p>
              ))
            ) : (
              <p>No complaints found.</p>
            )}
          </div>

          <div className="data-card">
            <h3>Recent Leave Requests</h3>
            {leaveRequests.length > 0 ? (
              leaveRequests.slice(0, 3).map((leave) => (
                <p key={leave._id}>
                  <b>Reason:</b> {leave.reason} <br />
                  <b>Status:</b> 
                  <span className={leave.status === "Approved" ? "status-approved" : "status-pending"}>
                    {leave.status}
                  </span>
                </p>
              ))
            ) : (
              <p>No leave requests found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
