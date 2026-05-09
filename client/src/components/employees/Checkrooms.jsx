import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";

const Checkrooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        if (!user ||( user.role !== "operation_staff" && user.role !== "manager"))
          return;
        setLoading(true);
        
        const { data } = await axios.get("http://localhost:5000/rooms/getAllRooms");
        setRooms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);
  if (!user || (user.role !== "operation_staff" && user.role !== "manager")) {
    return (
      <div className="text-center mt-5">
        <h2 className="text-danger">⛔ Unauthorized</h2>
        <p>You are not allowed to view this page</p>
      </div>
    );
  }

  

  return (
    <div className="container py-4">
      <h3 className="mb-4 fw-bold">Rooms Management</h3>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading rooms...</p>
        </div>
      )}

      {error && <p className="text-danger">{error}</p>}

      <div className="row g-4">
        {rooms.map((room) => (
          <div className="col-md-4" key={room._id}>
            <div className="card shadow border-0 h-100">
              <img
                src={`http://localhost:5000${room.imageUrl?.[0]}`}
                alt={`room-${room.roomNumber}`}
                className="card-img-top"
                style={{ height: 200, objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">Room {room.roomNumber}</h5>
                <p className="card-text mb-1">
                  <strong>Type:</strong> {room.typeRoom?.name}
                </p>
                <p className="card-text mb-1">
                  <strong>Capacity:</strong> {room.typeRoom?.capacity} guests
                </p>
                <p className="card-text mb-3"></p>
                <Link to="/employee/updateStatusRoom" state={{ room }}>
                  <Button variant="primary" size="sm">
                    Update Status
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkrooms;
