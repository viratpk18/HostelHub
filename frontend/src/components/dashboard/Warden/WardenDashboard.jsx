import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  getComplaints, getLeaveRequests, getRooms, getAnnouncements 
} from "../../../services/dashboardService";
import { useAuth } from "../../../context/AuthContext";
import "./WardenDashboard.css";

const WardenDashboard = () => {
  const { user, updateUserSession, loading } = useAuth();
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    updateUserSession();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== "warden") {
        console.warn("🔴 Unauthorized access. Redirecting...");
        navigate("/login");
      } else {
        fetchData();
      }
    }
  }, [user, loading, navigate]);

  const fetchData = async () => {
    try {
      const [complaintsData, leaveData, roomsData, announcementsData] = await Promise.all([
        getComplaints(),
        getLeaveRequests(),
        getRooms(),
        getAnnouncements()
      ]);

      setComplaints(complaintsData || []);
      setLeaveRequests(leaveData || []);
      setRooms(roomsData || []);
      setAnnouncements(announcementsData || []);
    } catch (error) {
      console.error("❌ Error fetching warden data:", error);
    }
  };

  if (loading) return <p>Loading...</p>; // ✅ Prevents flickering redirects

  return (
    <div className="warden-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 onClick={() => navigate("/dashboard/warden")}>🏠 HostelHub</h2>
        <ul>
          <li onClick={() => navigate("/warden/complaints")}>📜 Manage Complaints</li>
          <li onClick={() => navigate("/warden/leaves")}>📆 Leave Requests</li>
          <li onClick={() => navigate("/warden/rooms")}>🏠 Room Management</li>
          <li onClick={() => navigate("/warden/announcements")}>📢 Announcements</li>
          <li onClick={() => navigate("/warden/logout")}>🚪 Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <h2>Warden Dashboard</h2>
        <div className="dashboard-cards">
          <div className="card">
            <h3>📜 Pending Complaints</h3>
            <p>{complaints.filter(c => c.status !== "Resolved").length} Unresolved Complaints</p>
          </div>
          <div className="card">
            <h3>📆 Pending Leave Requests</h3>
            <p>{leaveRequests.filter(l => l.status === "Pending").length} Requests Awaiting Approval</p>
          </div>
          <div className="card">
            <h3>🏠 Total Rooms Assigned</h3>
            <p>{rooms.filter(r => r.student).length} Students Assigned</p>
          </div>
          <div className="card">
            <h3>📢 Recent Announcement</h3>
            <p>{announcements.length > 0 ? announcements[0].message : "No announcements yet"}</p>
          </div>
        </div>
      </div>
    </div>
  ); 
};

export default WardenDashboard;
