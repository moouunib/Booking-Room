import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Updateroom = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const room = state?.room;

  const [form, setForm] = useState({
    status: room?.status || "maintenance",
    checkIn: "",
    checkOut: "",
  });
  const [loading, setLoading] = useState(false);

  if (!room) {
    return (
      <div className="container py-5 text-center">
        <p className="text-muted">No room selected.</p>
        <Link to="/employee/checkRooms" className="btn btn-primary mt-2">Back to Rooms</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = {
      status: form.status,
      checkIn: form.startDate,
      checkOut: form.endDate,
    };
    try {
      setLoading(true);
      const {data} =await axios.post(`http://localhost:5000/rooms/updateStatus/${room._id}`,
        finalData);
      alert(data.message);
      navigate("/employee/checkRooms");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 900 }}>

      <h3 className="fw-bold mb-4">Update Room Status</h3>

      <div className="row g-4">

        
        <div className="col-md-5">
          <div className="card shadow border-0">
            <img
              src={`http://localhost:5000${room.imageUrl?.[0]}`}
              alt={`room-${room.roomNumber}`}
              className="card-img-top"
              style={{ height: 220, objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="fw-bold">Room {room.roomNumber}</h5>
              <p className="mb-1"><strong>Type:</strong> {room.type?.name}</p>
              <p className="mb-1"><strong>Capacity:</strong> {room.type?.capacity} guests</p>
              <p className="mb-0">
                <strong>Current Status: </strong>
                <span className={`badge ${
                  room.status === "available"   ? "bg-success" :
                  room.status === "maintenance" ? "bg-warning text-dark" : "bg-secondary"
                }`}>
                  {room.status}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Update form */}
        <div className="col-md-7">
          <div className="card shadow border-0">
            <div className="card-header bg-white fw-bold">Change Room Status</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>

                {/* Status select */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">New Status</label>
                  <select
                    name="status"
                    className="form-select"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="available">Available</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>

                {/* Start date */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    className="form-control"
                    value={form.startDate}
                    onChange={handleChange}
                  />
                </div>

                {/* End date */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    className="form-control"
                    value={form.endDate}
                    onChange={handleChange}
                  />
                </div>

                {/* Buttons */}
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                  <Link to="/employee/checkRooms" className="btn btn-secondary">
                    Cancel
                  </Link>
                </div>

              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Updateroom;
