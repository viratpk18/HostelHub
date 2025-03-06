import User from "../models/User.js";
import Room from "../models/Room.js";
import Payment from "../models/Payment.js";
import Announcement from "../models/Announcement.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });

    // Fix: Use 'status: "available"' instead of 'isOccupied: false'
    const availableRooms = await Room.countDocuments({ status: "available" });

    const pendingPayments = await Payment.aggregate([
      { $match: { status: "pending" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const recentActivities = await User.find({ role: "student" })
      .sort({ createdAt: -1 })
      .limit(5);

    // ✅ Fetch all room details
    const allRooms = await Room.find();

    res.status(200).json({
      totalStudents,
      availableRooms,
      pendingPayments: pendingPayments.length > 0 ? pendingPayments[0].total : 0,
      recentActivities,
      allRooms, // ✅ Include full room details
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats", error });
  }
};


export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).sort({
      rollNo: 1,      
      fullName: 1,     
      email: 1,       
    });

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};


export const addStudent = async (req, res) => {
  try {
    const { fullName, email, password, rollNo } = req.body;

    if (!fullName || !email || !password || !rollNo) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the email or roll number already exists
    const existingStudent = await User.findOne({ $or: [{ email }, { rollNo }] });
    if (existingStudent) {
      return res.status(400).json({ message: "Email or Roll Number already exists" });
    }

    // Create new student
    const newStudent = new User({
      fullName,
      email,
      password, // Note: Hash password before saving in production
      rollNo,
      role: "student",
    });

    await newStudent.save();
    res.status(201).json({ message: "Student added successfully", newStudent });
  } catch (error) {
    res.status(500).json({ message: "Error adding student", error });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, rollNo } = req.body;

    const student = await User.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if roll number already exists for another student
    const existingStudent = await User.findOne({ rollNo, _id: { $ne: id } });
    if (existingStudent) {
      return res.status(400).json({ message: "Roll Number already exists" });
    }

    student.fullName = fullName || student.fullName;
    student.email = email || student.email;
    student.rollNo = rollNo || student.rollNo;

    await student.save();
    res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await User.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};


export const addRoom = async (req, res) => {
    try {
      const { roomNumber, capacity } = req.body;
  
      if (!roomNumber || !capacity) {
        return res.status(400).json({ message: "Room number and capacity are required" });
      }
  
      const existingRoom = await Room.findOne({ roomNumber });
      if (existingRoom) {
        return res.status(400).json({ message: "Room number already exists" });
      }
  
      const newRoom = new Room({
        roomNumber,
        capacity,
        status: "available",
        occupants: []
      });
  
      await newRoom.save();
      res.status(201).json({ message: "Room added successfully", newRoom });
    } catch (error) {
      res.status(500).json({ message: "Error adding room", error });
    }
  };
  

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms", error });
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;
    const announcement = new Announcement({ title, message, createdAt: new Date() });
    await announcement.save();
    res.status(201).json({ message: "Announcement created successfully", announcement });
  } catch (error) {
    res.status(500).json({ message: "Error creating announcement", error });
  }
};
