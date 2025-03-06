import Complaint from "../models/Complaint.js";
import User from "../models/User.js";

// 🟢 File a new complaint
export const fileComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized. Please log in again." });
    }

    const student = await User.findById(req.user.id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    const complaint = new Complaint({
      student: req.user.id,
      title,
      description,
    });

    await complaint.save();
    res.status(201).json({ message: "Complaint submitted successfully!", complaint });
  } catch (error) {
    console.error("❌ Error in fileComplaint:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 🟢 Get Complaints of a Student
export const getStudentComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ student: req.user.id });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Fetch all complaints (for Wardens)
export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("student", "fullName rollNo"); // ✅ Include student name & rollNo
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 🟠 Update complaint status (warden action)
export const updateComplaintStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const complaint = await Complaint.findById(req.params.id);
  
      if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
      }
  
      complaint.status = status;
      await complaint.save();
  
      res.json({ message: "Complaint status updated successfully!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
