import { useEffect, useState } from "react";
import { getRooms, getStudents, assignStudentToRoom, removeStudentFromRoom } from "../../../services/dashboardService";
import "./ManageRooms.css";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [students, setStudents] = useState([]); // Unallocated students
  const [selectedStudent, setSelectedStudent] = useState("");

  useEffect(() => {
    fetchRooms();
    fetchStudents();
  }, []);

  const fetchRooms = async () => {
    try {
      const roomsData = await getRooms();
      console.log("Rooms Data:", roomsData); // ✅ Debugging API response
      setRooms(roomsData);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const studentsData = await getStudents();
      const unallocated = studentsData.filter((s) => !s.roomId);
      setStudents(unallocated);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleAssignStudent = async (roomId) => {
    if (!selectedStudent) {
      alert("⚠️ Please select a student.");
      return;
    }
    try {
      await assignStudentToRoom(roomId, selectedStudent);
      alert("✅ Student assigned successfully!");
      fetchRooms();
      fetchStudents();
      setSelectedStudent("");
    } catch (error) {
      console.error("Error assigning student:", error);
      alert("❌ Failed to assign student.");
    }
  };

  const handleRemoveStudent = async (roomId, studentRollNo) => {
    try {
      await removeStudentFromRoom(roomId, studentRollNo);
      alert("✅ Student removed successfully!");
      fetchRooms();
    } catch (error) {
      console.error("Error removing student:", error);
      alert("❌ Failed to remove student.");
    }
  };

  return (
    <div className="page-container">
      <header className="header7">
        <h1 className="logo5">HostelHub</h1>
        <nav>
          <a href="/dashboard/admin" className="home-button">Home</a>
        </nav>
      </header>

      <h2 className="title">Manage Rooms</h2>
      <main className="manage-rooms">
        <table className="room-table">
          <thead>
            <tr>
              <th>Room No</th>
              <th>Capacity</th>
              <th>Occupants</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td>{room.roomNumber}</td>
                <td>{room.capacity}</td>
                <td>
                  {room.occupants?.length > 0 ? (
                    <div className="occupants-container">
                      {room.occupants.map((student) => (
                        <div key={student._id} className="occupant-item">
                          <span className="occupant-name">
                            {student.fullName || student.name || "Unknown"}
                          </span>
                          <span className="occupant-roll">({student.rollNo || "No Roll No"})</span>
                          <button className="remove-btn" onClick={() => handleRemoveStudent(room._id, student.rollNo)}>
                            ❌
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="empty">No students</span>
                  )}
                </td>
                <td>
                  {room.occupants.length >= room.capacity ? (
                    <span className="room-full">🚫 Room is Full</span>
                  ) : (
                    <>
                      <select
                        className="student-select"
                        onChange={(e) => setSelectedStudent(e.target.value)}
                      >
                        <option value="">Select Student</option>
                        {students.map((student) => (
                          <option key={student._id} value={student.rollNo}>
                            {student.fullName || student.name} ({student.rollNo})
                          </option>
                        ))}
                      </select>
                      <button
                        className="assign-btn"
                        onClick={() => handleAssignStudent(room._id)}
                      >
                        ➕ Assign
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} HostelHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ManageRooms;
