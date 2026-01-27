import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../style/rooms.css";
import Carousel from "react-bootstrap/Carousel";


const Rooms = ({ rooms }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleClose = () => setSelectedRoom(null);
  const handleShow = (room) => setSelectedRoom(room);

  return (
    <div>
      <div>
        {rooms.map((room, index) => (
          <div className="room" key={room._id}>
            <div class="image">
              <img
                src={`http://localhost:5000${room.imageUrl[0]}`}
                alt={`room-${index}`}
                class="imgM"
              />
              <div className="decs">
                <h3>the status of this room : {room.status}</h3>
                <br />
                <h3>description : {room.description}</h3>
                <Button variant="primary" onClick={() => handleShow(room)}>
                  View Room
                </Button>
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
            {selectedRoom && `Room Status: ${selectedRoom.status}`}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedRoom && (
            <Carousel>
              {selectedRoom.imageUrl.map((img, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 bigimg"
                    src={`http://localhost:5000${img}`}
                    alt={`room-${index}`}
                  />
                  <h5>{selectedRoom.description}</h5>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Rooms;
