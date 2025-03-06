import { useState, useEffect } from "react";
import axios from "axios";

const AssignStudent = () => {
    const [rooms, setRooms] = useState([]);
    const [rollNo, setRollNo] = useState("");
    const [roomId, setRoomId] = useState("");

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/rooms");
            setRooms(response.data);
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }
    };

    const assignStudent = async () => {
        try {
            await axios.put("http://localhost:3000/api/rooms/assign", { rollNo, roomId });
            alert("Student assigned successfully!");
            fetchRooms(); // Refresh rooms
            setRollNo("");
            setRoomId("");
        } catch (error) {
            console.error("Error assigning student:", error);
            alert(error.response?.data?.error || "Failed to assign student");
        }
    };

    return (
        <div>
            <h2>Assign Student to Room</h2>
            <input
                type="text"
                placeholder="Enter Roll Number"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
            />
            <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
                <option value="">Select Room</option>
                {rooms.map((room) => (
                    <option key={room._id} value={room._id}>
                        Room {room.roomNumber} - {room.occupants.length}/{room.capacity} Occupied
                    </option>
                ))}
            </select>
            <button onClick={assignStudent}>Assign</button>
        </div>
    );
};

export default AssignStudent;
