import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitComplaint, getMyComplaints } from "../../../services/dashboardService";
import { useAuth } from "../../../context/AuthContext";
import "./Complaints.css"; 

const Complaints = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await getMyComplaints();
      setComplaints(data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Title and Description cannot be empty.");
      return;
    }

    if (!user || !user.rollNo) {
      console.error("❌ User roll number not found!");
      alert("Error: User roll number is missing.");
      return;
    }

    console.log("📤 Sending complaint:", { title, description });

    try {
      await submitComplaint(title, description);
      alert("✅ Complaint submitted successfully!");
      setTitle("");
      setDescription("");
      fetchComplaints(); // Refresh complaints after submission
    } catch (error) {
      console.error("❌ Error submitting complaint:", error.response?.data || error.message);
      alert("Failed to submit complaint. Please try again.");
    }
  };

  return (
    <div className="complaints-container">
      {/* Header Section */}
      <div className="complaints-header21">
        <h2 className="logo2">🏠 HostelHub</h2>
        <button className="home-button1" onClick={() => navigate("/dashboard/student")}>Home</button>
      </div>

      {/* Complaint Form */}
      <div className="complaint-form">
        <h3>Report a Complaint</h3>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Describe your issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {/* Complaints List */}
      <div className="complaint-list">
        <h3>My Complaints</h3>
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <div className="complaint-card" key={complaint._id}>
              <h4>{complaint.title}</h4>
              <p>{complaint.description}</p>
              <p><b>Status:</b> <span className={complaint.status.toLowerCase()}>{complaint.status}</span></p>
            </div>
          ))
        ) : (
          <p>No complaints found.</p>
        )}
      </div>
    </div>
  );
};

export default Complaints;
