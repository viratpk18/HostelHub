import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getComplaints, updateComplaintStatus } from "../../../services/dashboardService";
import "./WardenComplaints.css";

const WardenComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Fetch complaints from API
  const fetchComplaints = async () => {
    try {
      const data = await getComplaints();
      console.log("📢 Complaints Data:", data);  // Debugging
      setComplaints(data || []);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  // Mark a complaint as resolved
  const handleResolveComplaint = async (id) => {
    try {
      await updateComplaintStatus(id, "Resolved");
      fetchComplaints();
      alert("Complaint marked as resolved!");
    } catch (error) {
      console.error("Error resolving complaint:", error);
    }
  };

  return (
    <div className="warden-complaints">
      {/* HEADER SECTION */}
      <div className="warden-headerF">
        <h1>HostelHub</h1>
        <button className="heg" onClick={() => navigate("/dashboard/warden")}>🏡 Home</button>
      </div>

      <h2>📜 Manage Complaints</h2>

      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <ul>
          {complaints.map((c) => (
            <li key={c._id}>
              <strong>{c.student ? c.student.fullName || "Unknown" : "Unknown"}:</strong> {c.description}
              <button onClick={() => handleResolveComplaint(c._id)}>✔ Resolve</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WardenComplaints;
