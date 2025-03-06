import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Announcement.css";

const ManageAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", message: "", audience: "Everyone" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Fetch announcements
  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/announcements");
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
    setLoading(false);
  };

  // Post a new announcement
  const handlePostAnnouncement = async () => {
    if (!newAnnouncement.title || !newAnnouncement.message) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/announcements/create", newAnnouncement);
      fetchAnnouncements();
      setNewAnnouncement({ title: "", message: "", audience: "Everyone" });
      alert("✅ Announcement posted successfully!");
    } catch (error) {
      alert("❌ Failed to post announcement.");
    }
  };

  // Delete an announcement
  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/announcements/${id}`);
      fetchAnnouncements();
      alert("✅ Announcement deleted!");
    } catch (error) {
      alert("❌ Failed to delete announcement.");
    }
  };

  return (
    <div className="announcements-container">
      <header className="header">
        <h1 className="header-title">HostelHub</h1>
        <nav>
          <Link to="/dashboard/admin" className="home-button">🏠 Home</Link>
        </nav>
      </header>
      <h2>📢 Manage Announcements</h2>

      {/* Announcement Form */}
      <div className="announcement-form">
        <input
          type="text"
          placeholder="Title"
          value={newAnnouncement.title}
          onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
        />
        <textarea
          placeholder="Message"
          value={newAnnouncement.message}
          onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
        />
        <select
          value={newAnnouncement.audience}
          onChange={(e) => setNewAnnouncement({ ...newAnnouncement, audience: e.target.value })}
        >
          <option value="Everyone">Everyone</option>
          <option value="Students">Students</option>
          <option value="Wardens">Wardens</option>
        </select>
        <button onClick={handlePostAnnouncement}>📢 Post Announcement</button>
      </div>

      {/* Announcement List */}
      <div className="announcement-list">
        {loading ? (
          <p>Loading announcements...</p>
        ) : announcements.length === 0 ? (
          <p>No announcements available.</p>
        ) : (
          announcements.map((announcement) => (
            <div key={announcement._id} className="announcement-item">
              <h3>{announcement.title}</h3>
              <p>{announcement.message}</p>
              <small>🎯 Audience: {announcement.audience}</small>
              <button className="delete-btn" onClick={() => handleDeleteAnnouncement(announcement._id)}>🗑 Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageAnnouncements;
