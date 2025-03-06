import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardStats } from "../../../services/dashboardService";
import { useAuth } from "../../../context/AuthContext";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    availableRooms: 0,
    pendingPayments: 0,
    recentActivities: 0,
  });

  useEffect(() => { 
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        console.log("Dashboard Stats:", data); 
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-container">
      {/* <Header /> */}
      <nav className="sidebar">
        <h2>HostelHub</h2>
        <ul>
          <li onClick={() => navigate("/admin/manage-students")}>👨‍🎓 Manage Students</li>
          <li onClick={() => navigate("/admin/manage-rooms")}>🏠 Manage Rooms</li>
          <li onClick={() => navigate("/admin/manage-payments")}>💰 Manage Payments</li>
          <li onClick={() => navigate("/admin/announcements")}>📢 Announcements</li>
          <li onClick={() => navigate("/admin/logout")}>🚪 Logout</li>
        </ul>
      </nav>

      <main className="dashboard">
        <h1>Admin Dashboard</h1>
        
        {/* ✅ Fix applied: Only display valid strings */}
        <div className="admin-info">
          <h2>Welcome, {user?.fullName || "Admin"} 👋</h2>
          <p>Email: {user?.email || "admin@gmail.com"}</p>
        </div>

        <div className="dashboard-cards">
          <div className="card"><h3>Total Students</h3><p>{stats.totalStudents}</p></div>
          <div className="card"><h3>Available Rooms</h3><p>{stats.availableRooms}</p></div>
          <div className="card"><h3>Pending Payments</h3><p>₹ {stats.pendingPayments}</p></div>
          <div className="card"><h3>Recent Activities</h3>
                {Array.isArray(stats.recentActivities) && stats.recentActivities.length > 0 ? (
                  <ul>
                    {stats.recentActivities.map((activity, index) => (
                      <li key={index}>{activity.description || "Activity recorded"}</li> // Adjust property name
                    ))}
                  </ul>
                ) : (
                  <p>No recent activities</p>
                )}
            </div>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default AdminDashboard;
