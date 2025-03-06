import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLeaveRequests, updateLeaveStatus } from "../../../services/dashboardService";
import "./WardenLeaveRequests.css";

const WardenLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const data = await getLeaveRequests();
      setLeaveRequests(data || []);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const handleLeaveApproval = async (id, status) => {
    try {
      await updateLeaveStatus(id, status);
      fetchLeaveRequests();
      alert(`Leave request ${status}`);
    } catch (error) {
      console.error("Error updating leave request:", error);
    }
  };

  return (
    <div className="warden-leaves">
      {/* HEADER SECTION */}
      <div className="warden-headerK">
        <h1>HostelHub</h1>
        <button className="qwer" onClick={() => navigate("/dashboard/warden")}>Home</button>
      </div>
      <h2>Manage Leave Requests</h2>
      {leaveRequests.length === 0 ? <p>No leave requests found.</p> : (
        <ul>
          {leaveRequests.map((l) => (
            <li key={l._id}>
              <strong>{l.student.fullName}:</strong> {l.reason} ({l.startDate} - {l.endDate})
              <button className="a123" onClick={() => handleLeaveApproval(l._id, "Approved")}>✅ Approve</button>
              <button className="a321" onClick={() => handleLeaveApproval(l._id, "Rejected")}>❌ Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WardenLeaveRequests;
