import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ViewAnnouncements.css"; 

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/announcements");
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="announcements-container">
      {/* Header Section */}
      <div className="announcements-header">
        <h2 className="logo">HostelHub Announcements</h2>
        <button className="home-button010" onClick={() => navigate("/dashboard/student")}>Home</button>
      </div>

      {/* Announcements List */}
      <div className="announcements-list">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div className="announcement-card" key={announcement._id}>
              <h3>{announcement.title}</h3>
              <p>{announcement.message}</p>
            </div>
          ))
        ) : (
          <p className="no-announcements">No announcements available.</p>
        )}
      </div>
    </div>
  );
};

export default Announcements;
