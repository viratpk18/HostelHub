import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAnnouncements, postAnnouncement } from "../../../services/dashboardService";
import "./WardenAnnouncements.css";

const WardenAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const data = await getAnnouncements();
      setAnnouncements(data || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handlePostAnnouncement = async () => {
    if (!newAnnouncement.trim()) return alert("Announcement cannot be empty.");
    try {
      await postAnnouncement({ title: "Warden Notice", message: newAnnouncement });
      fetchAnnouncements();
      setNewAnnouncement("");
      alert("📢 Announcement posted successfully!");
    } catch (error) {
      console.error("Error posting announcement:", error);
    }
  };

  return (
    <div className="warden-announcements">
      {/* HEADER SECTION */}
      <div className="warden-headeAr">
        <h1>HostelHub</h1>
        <button className="okda" onClick={() => navigate("/dashboard/warden")}>🏡 Home</button>
      </div>

      <h2> Announcements</h2>

      {/* NEW ANNOUNCEMENT BOX */}
      <div className="new-announcement-box">
        <h3>Write New Announcement</h3>
        <textarea 
          value={newAnnouncement} 
          onChange={(e) => setNewAnnouncement(e.target.value)}
          placeholder="Write new announcement..."
        />
        <button className="okna" onClick={handlePostAnnouncement}>📢 Post Announcement</button>
      </div>

      {/* ANNOUNCEMENT LIST */}
      <ul>
        {announcements.map((a) => (
          <li key={a._id}><strong>{a.title}:</strong> {a.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default WardenAnnouncements;
