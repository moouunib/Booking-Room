import { useEffect, useState } from "react";
import axios from "axios";
import Rooms from "../components/Rooms";
import Spinner from "react-bootstrap/Spinner";

const Roomscreen = () => {
  const [rooms, setRooms]         = useState([]);
  const [loading, setLoading]     = useState();
  const [findError, setFindError] = useState();
  const [error, setError]         = useState();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/rooms/getAllRooms");
        console.log(data);
        setRooms(data);
        setLoading(false);
      } catch (error) {
        setFindError(true);
        console.error(error);
        setError(error);
        setFindError(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="container py-5">
      {/* شريط البحث */}
      <div className="blockSearch">
        <strong>Check In:</strong>
        <input className="search" type="date" name="" id="" />
        <strong>Check Out:</strong>
        <input className="search" type="date" name="" id="" />
      </div>

      <h4 className="fw-bold mb-4">All Rooms</h4>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="dark" />
          <p className="mt-2">Loading rooms...</p>
        </div>
      )}

      {rooms.length ? <Rooms rooms={rooms} /> : <p>No rooms available</p>}

      {findError && <p className="text-danger">{String(error)}</p>}
    </div>
  );
};

export default Roomscreen;
