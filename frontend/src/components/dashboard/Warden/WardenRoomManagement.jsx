import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRooms, assignStudentToRoom, removeStudentFromRoom } from "../../../services/dashboardService";
import "./WardenRoomManagement.css";

const WardenRoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const data = await getRooms();
      console.log("Rooms Data:", data); // Debugging Output
      setRooms(data || []);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleAssignStudent = async (roomId, capacity, occupants) => {
    if (occupants.length >= capacity) {
      return alert("Room is already full!");
    }
    
    const rollNo = prompt("Enter Student Roll No:");
    if (!rollNo) return alert("Roll No is required!");

    try {
      await assignStudentToRoom(roomId, rollNo);
      fetchRooms(); // Refresh data
      alert("Student assigned to room!");
    } catch (error) {
      console.error("Error assigning student:", error);
    }
  };

  const handleRemoveStudent = async (roomId, rollNo) => {
    if (!rollNo) return;
    try {
      await removeStudentFromRoom(roomId, rollNo);
      fetchRooms();
      alert("Student removed from room!");
    } catch (error) {
      console.error("Error removing student:", error);
    }
  };

  return (
    <div className="warden-rooms">
      <div className="warden-header58">
        <h1>🏠 HostelHub</h1>
        <button onClick={() => navigate("/dashboard/warden")}>🏡 Home</button>
      </div>
      <h2>Room Management</h2>
      {rooms.length === 0 ? (
        <p>No rooms available.</p>
      ) : (
        rooms.map((room) => (
          <div key={room._id} className="room-card">
            <p><strong>Room No:</strong> {room.roomNumber}</p>
            <p><strong>Capacity:</strong> {room.capacity}</p>
            <p>
              <strong>Students:</strong>{" "}
              {room.occupants.length > 0
                ? room.occupants.map(student => `${student.fullName} (${student.rollNo})`).join(", ")
                : "None"}
            </p>
            {room.occupants.map(student => (
              <button key={student._id} onClick={() => handleRemoveStudent(room._id, student.rollNo)}>
                🚫 Remove {student.fullName}
              </button>
            ))}
            <button 
              onClick={() => handleAssignStudent(room._id, room.capacity, room.occupants)} 
              disabled={room.occupants.length >= room.capacity}
            >
              ➕ Assign
            </button>
            {room.occupants.length >= room.capacity && <p className="full-room-msg">Room is full!</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default WardenRoomManagement;
