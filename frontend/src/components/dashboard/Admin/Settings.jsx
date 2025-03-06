import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Settings.css";

const Settings = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [hostelDetails, setHostelDetails] = useState({ hostelName: "", address: "", contact: "" });

  // Update Admin Profile
  const handleProfileUpdate = async () => {
    try {
      await axios.put("http://localhost:3000/api/settings/profile", profile);
      alert("✅ Profile updated!");
    } catch (error) {
      alert("❌ Failed to update profile.");
    }
  };

  // Change Admin Password
  const handleChangePassword = async () => {
    try {
      await axios.put("http://localhost:3000/api/settings/change-password", passwords);
      alert("✅ Password changed successfully!");
    } catch (error) {
      alert("❌ Failed to change password.");
    }
  };

  // Update Hostel Details
  const handleHostelUpdate = async () => {
    try {
      await axios.put("http://localhost:3000/api/settings/hostel-details", hostelDetails);
      alert("✅ Hostel details updated!");
    } catch (error) {
      alert("❌ Failed to update hostel details.");
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
      <div className="settings-container">
        <h2>⚙️ Admin Settings</h2>

        {/* Update Profile */}
        <div className="settings-section">
          <h3>👤 Update Profile</h3>
          <input
            type="text"
            placeholder="Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <button onClick={handleProfileUpdate}>Save Changes</button>
        </div>

        {/* Change Password */}
        <div className="settings-section">
          <h3>🔑 Change Password</h3>
          <input
            type="password"
            placeholder="Current Password"
            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
          />
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          />
          <button onClick={handleChangePassword}>Update Password</button>
        </div>

        {/* Hostel Details */}
        <div className="settings-section">
          <h3>🏠 Update Hostel Details</h3>
          <input
            type="text"
            placeholder="Hostel Name"
            value={hostelDetails.hostelName}
            onChange={(e) => setHostelDetails({ ...hostelDetails, hostelName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Address"
            value={hostelDetails.address}
            onChange={(e) => setHostelDetails({ ...hostelDetails, address: e.target.value })}
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={hostelDetails.contact}
            onChange={(e) => setHostelDetails({ ...hostelDetails, contact: e.target.value })}
          />
          <button onClick={handleHostelUpdate}>Update Hostel Info</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
