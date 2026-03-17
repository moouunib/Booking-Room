import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const Checkresrevation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/getAllReservation");
        setReservations(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const statusColor = (status) => {
    switch (status) {
      case "confirmed": return "success";
      case "pending":   return "warning";
      case "cancelled": return "danger";
      default:          return "secondary";
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4 fw-bold">Hotel Reservations</h3>

      {/* Stats */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h6 className="text-muted">Total Reservations</h6>
              <h3 className="fw-bold">{reservations.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h6 className="text-muted">Confirmed</h6>
              <h3 className="fw-bold text-success">
                {reservations.filter((r) => r.status === "confirmed").length}
              </h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h6 className="text-muted">Cancelled</h6>
              <h3 className="fw-bold text-danger">
                {reservations.filter((r) => r.status === "cancelled").length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading reservations...</p>
        </div>
      )}

      {error && <p className="text-danger">{error}</p>}

      {/* Table */}
      {!loading && (
        <div className="card shadow border-0">
          <div className="card-header fw-bold bg-white">Reservations List</div>
          <div className="card-body p-0">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Client</th>
                  <th>Room</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Total Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{res.client?.fName} {res.client?.lName}</td>
                    <td>{res.roomNumber}</td>
                    <td>{res.checkIn}</td>
                    <td>{res.checkOut}</td>
                    <td>{res.totalPrice ?? "—"}</td>
                    <td>
                      <span className={`badge bg-${statusColor(res.status)}`}>
                        {res.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {reservations.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} className="text-center text-muted py-4">
                      No reservations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkresrevation;
