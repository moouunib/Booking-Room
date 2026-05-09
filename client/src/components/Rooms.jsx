import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import "../style/rooms.css";
import { Link } from "react-router";

const Rooms = ({ rooms }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleClose = () => setSelectedRoom(null);
  const handleShow  = (room) => setSelectedRoom(room);

 ;

  return (
    <div>
      <div className="row g-4">
        {rooms.map((room, index) => (
          <div className="col-md-4 room" key={room._id}>
            <div className="card shadow border-0 h-100">
              {/* صورة الغرفة */}
              <img
                src={
                  room.imageUrl?.length
                    ? `http://localhost:5000${room.imageUrl[0]}`
                    : "https://via.placeholder.com/300"
                }
                alt={`room-${index}`}
                className="card-img-top imgM"
              />

              <div className="card-body d-flex flex-column">
                {/* رقم الغرفة */}
                <h5 className="card-title fw-bold">Room {room.roomNumber}</h5>

                {/* معلومات */}
                <p className="card-text mb-1">
                  <strong>Type:</strong> {room.typeRoom?.name || "N/A"}
                </p>
                <p className="card-text mb-1">
                  <strong>Capacity:</strong> {room.typeRoom?.capacity || "N/A"}{" "}
                  guests
                </p>
                <p className="card-text mb-1">
                  <strong>Night Price</strong> {room.typeRoom?.nightPrice || "N/A"}{" "}
                  DA
                </p>

                {/* أزرار */}
                <div className="d-flex gap-2 mt-auto">
                  <Link to="/client" state={{ room }}>
                    <Button variant="primary" size="sm">
                      Book Now
                    </Button>
                  </Link>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleShow(room)}
                  >
                    View Room
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal واحد فقط */}
      <Modal
        show={selectedRoom !== null}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedRoom && <span>Room {selectedRoom.roomNumber}</span>}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedRoom && (
            <>
              <Carousel>
                {selectedRoom.imageUrl.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100 bigimg"
                      src={`http://localhost:5000${img}`}
                      alt={`room-${index}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              {selectedRoom.typeRoom?.description && (
                <p className="mt-3 text-muted">
                  <strong>Description:</strong>{" "}
                  {selectedRoom.typeRoom.description}
                </p>
              )}
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Link to="/client" state={{ room: selectedRoom }}>
            <Button variant="primary">Book Now</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Rooms;
