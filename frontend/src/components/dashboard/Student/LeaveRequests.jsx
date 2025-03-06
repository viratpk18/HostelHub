import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { applyLeave, getMyLeaveRequests } from "../../../services/dashboardService";
import { useAuth } from "../../../context/AuthContext";
import "./LeaveRequests.css"; 

const LeaveRequests = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [leaveData, setLeaveData] = useState({ startDate: "", endDate: "", reason: "" });
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const data = await getMyLeaveRequests();
      setLeaveRequests(data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const handleSubmit = async () => {
    if (!leaveData.reason || !leaveData.startDate || !leaveData.endDate) {
      alert("All fields are required.");
      return;
    }

    try {
      await applyLeave(user.rollNo, leaveData);
      alert("✅ Leave request submitted successfully!");
      setLeaveData({ startDate: "", endDate: "", reason: "" });
      fetchLeaveRequests(); // Refresh leave requests
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert("Failed to submit leave request.");
    }
  };

  return (
    <div className="leave-container">
      {/* Header Section */}
      <div className="leave-header">
        <h2 className="logo69">🏠 HostelHub</h2>
        <button className="home-button69" onClick={() => navigate("/dashboard/student")}>Home</button>
      </div>

      {/* Leave Request Form */}
      <div className="leave-form">
        <h3>Request Leave</h3>
        <input type="date" value={leaveData.startDate} onChange={(e) => setLeaveData({ ...leaveData, startDate: e.target.value })} />
        <input type="date" value={leaveData.endDate} onChange={(e) => setLeaveData({ ...leaveData, endDate: e.target.value })} />
        <textarea placeholder="Reason for leave" value={leaveData.reason} onChange={(e) => setLeaveData({ ...leaveData, reason: e.target.value })} />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {/* Leave Requests List */}
      <div className="leave-list">
        <h3>My Leave Requests</h3>
        {leaveRequests.length > 0 ? (
          leaveRequests.map((leave) => (
            <div className="leave-card" key={leave._id}>
              <h4>Reason: {leave.reason}</h4>
              <p><b>Duration:</b> {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</p>
              <p><b>Status:</b> <span className={leave.status.toLowerCase()}>{leave.status}</span></p>
            </div>
          ))
        ) : (
          <p>No leave requests found.</p>
        )}
      </div>
    </div>
  );
};

export default LeaveRequests;
