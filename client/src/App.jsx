import { BrowserRouter, Routes, Route } from "react-router-dom";
import Roomscreen from "./screen/Roomscreen";
import Navbar from "./components/Navbar";
import Bookingscreen from "./screen/Bookingscreen";
import Loginscreen from "./screen/Loginscreen";
import Signupscreen from "./screen/Signupscreen";
import Signup from "./components/Signup";
import ClientScreen from "./screen/ClientScreen";
import Reservation from "./screen/Reservation";
import Homescreen from "./screen/Homescreen";
import Employeescreen from "./screen/Employeescreen";
import Checkresrevation from "./components/employees/Checkresrevation";
import Checkrooms from "./components/employees/Checkrooms";
import Updateroom from "./components/employees/Updateroom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/rooms" element={<Roomscreen />} />
        <Route path="/employee" element={<Employeescreen />}>
          <Route path="checkReservation" element={<Checkresrevation />} />
          <Route path="checkRooms" element={<Checkrooms />} />
          <Route path="updateRoom" element={<Updateroom />} />
        </Route>
        <Route path="/client" element={<ClientScreen />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/booking" element={<Bookingscreen />} />
        <Route path="/login" element={<Loginscreen />} />
        <Route path="/register" element={<Signupscreen />} />
        <Route path="/register/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
