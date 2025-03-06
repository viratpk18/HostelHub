import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getStudentDashboardData, updateStudentDetails } from "../../../services/dashboardService";
import { useNavigate } from "react-router-dom";
import "./StudentProfile.css"; // Import CSS

const Profile = () => {
  const { user, updateUserSession } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.rollNo) {
      console.error("❌ No roll number found, cannot fetch student data.");
      return;
    }

    const fetchStudentData = async () => {
      try {
        const data = await getStudentDashboardData(user.rollNo);
        setProfile(data);
        setFormData({ fullName: data.name, email: data.email, password: "" }); // Set initial values
      } catch (error) {
        console.error("❌ Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [user]);

  // Handle form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit updated profile details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateStudentDetails(formData);
      alert(response.message);
      setEditMode(false);
      updateUserSession(); // Refresh user session
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      alert(error.response?.data?.error || "Failed to update profile.");
    }
  };

  if (loading) return <p className="loading-text">Loading student data...</p>;

  return (
    <div className="profile-page">
      {/* Header */}
      <header className="profile-header">
        <h1 className="header-title">HostelHub</h1>
        <button className="home-button0a" onClick={() => navigate("/dashboard/student")}>🏠 Home</button>
      </header>

      {/* Profile Container */}
      <div className="profile-container">
        <div className="profile-avatar">{profile?.name?.charAt(0)}</div>
        <h2 className="profile-title">{profile?.name}</h2>
        <p><strong>Roll No:</strong> {profile?.rollNo}</p>

        {editMode ? (
          <form className="edit-profile-form0a" onSubmit={handleSubmit}>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="New Password (optional)" value={formData.password} onChange={handleChange} />
            <button type="submit" className="1a1">Save Changes</button>
            <button type="button" className="cancel-button" onClick={() => setEditMode(false)}>Cancel</button>
          </form>
        ) : (
          <div className="profile-details">
            <p><strong>Email:</strong> {profile?.email}</p>
            <p><strong>Room No:</strong> {profile?.roomNumber}</p>
            <p><strong>Pending Fees:</strong> <span className="pending-fees">₹{profile?.pendingFees}</span></p>
            <button className="buttom" onClick={() => setEditMode(true)}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
