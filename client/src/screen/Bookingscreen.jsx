import React from 'react'

import Spinner from 'react-bootstrap/Spinner';
import Room from '../components/room/Room';
import { Link, useLocation } from "react-router-dom";
import ".././style/booking.css"

const Bookingscreen = () => {

  const { state } = useLocation();
  const room = state?.room;
  const nights = state?.nights; ;
  const reservation = state?.reservation;
  

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
      <h3 className="fw-bold mb-4">Booking Details</h3>

      <div className="row g-4">
        {/* Room info */}
        <div className="col-md-5">
          <div className="card shadow border-0 h-100">
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

        {/* Booking & Payment Details */}
        <div className="col-md-7">
          <div className="card shadow border-0 h-100">
            <div className="card-header bg-white fw-bold">Reservation Summary</div>
            <div className="card-body d-flex flex-column">
              
              <div className="mb-4">
                <h6 className="fw-bold text-muted mb-3 border-bottom pb-2">Guest Information</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Name:</span>
                  <span className="fw-semibold">{reservation.client.fName} {reservation.client.lName}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Check-in:</span>
                  <span className="fw-semibold">
                    {reservation.checkIn ? new Date(reservation.checkIn).toLocaleDateString("en-GB") : ""}
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Check-out:</span>
                  <span className="fw-semibold">
                    {reservation.checkOut ? new Date(reservation.checkOut).toLocaleDateString("en-GB") : ""}
                  </span>
                </div>
              </div>

              <div className="mb-4 flex-grow-1">
                <h6 className="fw-bold text-muted mb-3 border-bottom pb-2">Payment Details</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Total Nights:</span>
                  <span className="fw-semibold">{nights} Nights</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Price Per Night:</span>
                  <span className="fw-semibold">{room.price || 8000} DZD</span>
                </div>
                <div className="d-flex justify-content-between mt-3 pt-2 border-top">
                  <span className="fw-bold">Total Amount:</span>
                  <span className="fw-bold text-success fs-5">{reservation.totalPrice} DZD</span>
                </div>
              </div>

              <div className="d-flex gap-2 mt-auto">
                <button className="btn btn-primary w-100 fw-bold">
                  <i className="bi bi-credit-card me-2"></i>Pay Now
                </button>
                <Link state={{ room }} to="/client" className="btn btn-outline-secondary w-100 fw-bold">
                  Cancel
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Bookingscreen;
