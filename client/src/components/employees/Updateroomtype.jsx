import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateRoomType = () => {
  const [rooms, setRooms] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [message, setMessage] = useState("");

  // تحميل البيانات
  useEffect(() => {
    // ✅ get rooms
    axios
      .get("http://localhost:5000/rooms/getAllRooms")
      .then((res) => setRooms(res.data))
      .catch((err) => console.error(err));

    // ✅ get types
    axios
      .get("http://localhost:5000/typeRooms/getAllTypeRooms")
      .then((res) => setTypes(res.data))
      .catch((err) => console.error(err));
  }, []);

  // update function
  const updateRoom = async (e) => {
    e.preventDefault();

    // ✅ validation
    if (!selectedRoom || !selectedType) {
      return setMessage("❌ Please select room and type");
    }

    try {
      const { data } = await axios.put(
        `http://localhost:5000/rooms/updateRoomType/${selectedRoom}`,
        {
          typeId: selectedType,
        },
      );

      console.log(data);
      setMessage("✅ Updated successfully");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error updating room");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Update Room Type</h3>

        {message && (
          <div className="alert alert-info text-center">{message}</div>
        )}

        <form onSubmit={updateRoom}>
          {/* Select Room */}
          <div className="mb-3">
            <label className="form-label">Select Room</label>
            <select
              className="form-select"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
            >
              <option value="">-- Choose Room --</option>
              {rooms.map((room) => (
                <option key={room._id} value={room._id}>
                  Room {room.roomNumber}
                </option>
              ))}
            </select>
          </div>

          {/* Select Type */}
          <div className="mb-3">
            <label className="form-label">Select New Type</label>
            <select
              className="form-select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">-- Choose Type --</option>
              {types.map((type) => (
                <option key={type._id} value={type._id}>
                  {type.name} (Capacity: {type.capacity})
                </option>
              ))}
            </select>
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-primary w-100">
            Update Room Type
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoomType;
