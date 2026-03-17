import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";

const Checkrooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
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

  const statusColor = (status) => {
    switch (status) {
      case "available":   return "success";
      case "booked":      return "danger";
      case "maintenance": return "warning";
      default:            return "secondary";
    }
  };

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
                  <strong>Type:</strong> {room.type?.name}
                </p>
                <p className="card-text mb-1">
                  <strong>Capacity:</strong> {room.type?.capacity} guests
                </p>
                <p className="card-text mb-3">
                  <strong>Status: </strong>
                  <span className={`badge bg-${statusColor(room.status)}`}>
                    {room.status}
                  </span>
                </p>
                <Link to="/employee/updateRoom" state={{ room }}>
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
