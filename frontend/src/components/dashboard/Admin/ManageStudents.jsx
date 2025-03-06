import { useEffect, useState } from "react";
import { getStudents, addStudent, deleteStudent } from "../../../services/dashboardService";
import "./ManageStudents.css";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ fullName: "", email: "", password: "", rollNo: "" });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data.sort((a, b) => a.rollNo.localeCompare(b.rollNo)));
    } catch (error) {
      console.error("Error fetching students", error);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await addStudent(newStudent);
      fetchStudents();
      setNewStudent({ fullName: "", email: "", password: "", rollNo: "" });
    } catch (error) {
      console.error("Error adding student", error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student", error);
    }
  };

  return (
    <div className="page-container">
      <header className="header">
        <h1 className="logoA">HostelHub</h1>
        <nav>
          <a href="/dashboard/admin" className="home-button">Home</a>
        </nav>
      </header>

      <h2 className="ms">Manage Students</h2>

      <main className="manage-students">
        {/* Add New Student Box */}
        <div className="add-student-box">
          <h3>Add New Student</h3>
          <form className="student-form" onSubmit={handleAddStudent}>
            <input type="text" placeholder="Full Name" value={newStudent.fullName} onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })} required />
            <input type="email" placeholder="Email" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} required />
            <input type="password" placeholder="Password" value={newStudent.password} onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })} required />
            <input type="text" placeholder="Roll Number" value={newStudent.rollNo} onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })} required />
            <button type="submit" className="add-btn">Add Student</button>
          </form>
        </div>

        {/* Student List */}
        <ul className="student-list">
          {students.map((student, index) => (
            <li key={student._id}>
              <span>{index + 1}. {student.rollNo} - {student.fullName} - {student.email}</span>
              <button className="delete-btn" onClick={() => handleDeleteStudent(student._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>

      <footer className="footeras">
        <p>&copy; {new Date().getFullYear()} HostelHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ManageStudents;
