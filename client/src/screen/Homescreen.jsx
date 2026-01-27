import { useEffect, useState } from "react";
import axios from "axios";
import Rooms from "../components/Rooms";

const Homescreen = () => {
  const [rooms , setRooms ] = useState([]);
  const [loading , setLoading ] = useState();
  const [error, setError] = useState();


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:5000/rooms/getAllRooms"
        );
        console.log(data);
        setRooms(data);
        setLoading(false);
       
      } catch (error) {
        setError(true);
        console.error(error);
        setError(false);
      }
    };
    fetchRooms();
  }, []);

return (
  <div>
    {(loading && <h1>loading....</h1>) || (error && <h1>error</h1> ) }
    <Rooms rooms={rooms} />
  </div>
);

};

export default Homescreen;
