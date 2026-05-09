import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner, Modal, Button, Form } from "react-bootstrap";


const Checkresrevation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || (user.role !== "operation_staff" && user.role !== "manager"))
      return;

    const fetchReservations = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          "http://localhost:5000/getAllReservation",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setReservations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (!user || (user.role !== "operation_staff" && user.role !== "manager")) {
    return (
      <div className="text-center mt-5">
        <h2 className="text-danger">⛔ Unauthorized</h2>
      </div>
    );
  }

  // 📅 format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1,
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  // 🗑 delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/deleteReservation/${id}`);
      setReservations((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert("Delete error");
    }
  };

  // ✏️ open modal
  const openModal = (reservation) => {
    setSelectedReservation(reservation);
    setNewStatus(reservation.status);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // 💾 update status
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/UpdateReservation/${selectedReservation._id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setReservations((prev) =>
        prev.map((res) =>
          res._id === selectedReservation._id
            ? { ...res, status: newStatus }
            : res,
        ),
      );

      setShowModal(false);
    } catch (err) {
      alert("Update error");
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4 fw-bold">Hotel Reservations</h3>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && <p className="text-danger">{error}</p>}

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
                  <th>Status</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {reservations.map((res, index) => (
                  <tr key={res._id}>
                    <td>{index + 1}</td>
                    <td>
                      {res.client?.fName} {res.client?.lName}
                    </td>
                    <td>{res.roomNumber}</td>
                    <td>{formatDate(res.checkIn)}</td>
                    <td>{formatDate(res.checkOut)}</td>

                    <td>
                      <span className={`badge bg-${statusColor(res.status)}`}>
                        {res.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => openModal(res)}
                      >
                        Update
                      </button>
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(res._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 🔥 MODAL */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Reservation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Status</Form.Label>

              <Form.Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="pending">pending</option>
                <option value="confirmed">confirmed</option>
                
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>

          <Button variant="warning" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Checkresrevation;
