import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

const ClientScreen = () => {
  const { state } = useLocation();
  const room = state?.room;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nin: "",
    fName: "",
    lName: "",
    email: "",
    phone: "",
    dateBirth: "",
    placeBirth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();
    const data = {
      nin: form.nin,
      fName: form.fName,
      lName: form.lName,
      email: form.email,
      phone: form.phone,
      dateBirth: form.dateBirth,
      placeBirth: form.placeBirth,
    };
    try {
      navigate("/reservation", { state: { room, client: data } });
    } catch (error) {
      console.log("An error occurred during register" + error);
      alert("An error occurred during register");
    }
  };

  if (!room) {
    return (
      <div className="container py-5 text-center">
        <p className="text-muted">No room selected.</p>
        <Link to="/rooms" className="btn btn-primary mt-2">Back to Rooms</Link>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: 900 }}>

      <h3 className="fw-bold mb-4">Guest Information</h3>

      <div className="row g-4">

        {/* Room info */}
        <div className="col-md-5">
          <div className="card shadow border-0">
            <img
              src={`http://localhost:5000${room.imageUrl[0]}`}
              alt="room"
              className="card-img-top"
              style={{ height: 220, objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="fw-bold">Room {room.roomNumber}</h5>
              <p className="mb-1"><strong>Type:</strong> {room.type?.name}</p>
              <p className="mb-0"><strong>Capacity:</strong> {room.type?.capacity} guests</p>
            </div>
          </div>
        </div>

        {/* Guest form */}
        <div className="col-md-7">
          <div className="card shadow border-0">
            <div className="card-header bg-white fw-bold">Enter your information</div>
            <div className="card-body">
              <form onSubmit={register}>

                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-semibold">National ID (NIN) *</label>
                    <input
                      type="text"
                      name="nin"
                      className="form-control"
                      placeholder="National ID number"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">First Name *</label>
                    <input
                      type="text"
                      name="fName"
                      className="form-control"
                      placeholder="First name"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Last Name *</label>
                    <input
                      type="text"
                      name="lName"
                      className="form-control"
                      placeholder="Last name"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Email *</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="email@example.com"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      placeholder="Phone number"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Date of Birth</label>
                    <input
                      type="date"
                      name="dateBirth"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Place of Birth</label>
                    <input
                      type="text"
                      name="placeBirth"
                      className="form-control"
                      placeholder="City / Country"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="d-flex gap-2 mt-4">
                  <button type="submit" className="btn btn-primary">
                    Confirm
                  </button>
                  <Link to="/rooms" className="btn btn-secondary">
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

export default ClientScreen;
