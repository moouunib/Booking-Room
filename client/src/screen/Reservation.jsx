
import React from 'react'
import { Link, useLocation , useNavigate } from "react-router-dom";
import "../style/booking.css"
import { useState } from 'react';
import axios from 'axios';

const Reservation = () => {
  const navigate = useNavigate();
  const {state}= useLocation();
  const [form, setForm] = useState({
    checkIn:"",
    checkOut:"",
  });
  const room = state?.room;
  const client = state?.client;
  
  const roomId = room?._id
  const handleChange = (e)=>{
    const {name , value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }
  const reservation = async(e)=>{
    e.preventDefault();
    const finalData = {
      nin: client.nin,
      fName: client.fName,
      lName: client.lName,
      email: client.email,
      phone: client.phone,
      dateBirth: client.dateBirth,
      placeBirth: client.placeBirth,
      roomId,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
    };
    
    try {
        const  {data}  = await axios.post(
          "http://localhost:5000/reservation",
          finalData,
        );

        alert(data.message);
        navigate("/booking", { state: { room,  reservation:data.data , nights:data.nights } });

    } catch (error) {
        console.log(error.response.data);
        alert(error.response.data.message || "Reservation failed");
    }
  }
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
      <h3 className="fw-bold mb-4">Complete Reservation</h3>
      
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

        {/* Reservation form */}
        <div className="col-md-7">
          <div className="card shadow border-0 h-100">
            <div className="card-header bg-white fw-bold">Select Dates</div>
            <div className="card-body">
              <form onSubmit={reservation}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Check In *</label>
                    <input
                      required
                      type="date"
                      className="form-control"
                      name="checkIn"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Check Out *</label>
                    <input
                      required
                      type="date"
                      className="form-control"
                      name="checkOut"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="d-flex gap-2 mt-4">
                  <button type="submit" className="btn btn-primary">
                    Confirm Reservation
                  </button>
                  <Link state={{ room }} to="/client" className="btn btn-secondary">
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
}

export default Reservation
