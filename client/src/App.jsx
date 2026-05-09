import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Homescreen from "./screen/Homescreen";
import Roomscreen from "./screen/Roomscreen";
import OurServices from "./screen/OurServices";
import AboutUs from "./components/AboutUs";

import Loginscreen from "./screen/Loginscreen";
import ClientScreen from "./screen/ClientScreen";
import Reservation from "./screen/Reservation";
import Bookingscreen from "./screen/Bookingscreen";

import Employeescreen from "./screen/Employeescreen";
import EmployeeHome from "./components/employees/EmployeeHome";

import Checkresrevation from "./components/employees/Checkresrevation";
import Checkrooms from "./components/employees/Checkrooms";
import Updateroom from "./components/employees/Updateroom";

import CreateOffer from "./components/employees/offers/CreateOffer";
import ShowOffers from "./components/employees/offers/ShowOffers";
import UpdateOffer from "./components/employees/offers/UpdateOffer";

import Register from "./components/employees/manager/Register";

import ProtectedRoute from "./components/Protected Route/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      {!window.location.pathname.startsWith("/employee") && <Navbar />}

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Homescreen />} />
        <Route path="/rooms" element={<Roomscreen />} />
        <Route path="/OurServices" element={<OurServices />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Loginscreen />} />

        {/* Client Pages */}
        <Route path="/client" element={<ClientScreen />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/booking" element={<Bookingscreen />} />

        {/* Employee Panel */}
        <Route path="/employee" element={<Employeescreen />}>
          {/* الصفحة الرئيسية */}
          <Route index element={<EmployeeHome />} />

          {/* Reservations */}
          <Route
            path="checkReservation"
            element={
              <ProtectedRoute allowedRoles={["manager", "operation_staff"]}>
                <Checkresrevation />
              </ProtectedRoute>
            }
          />

          {/* Rooms */}
          <Route
            path="checkRooms"
            element={
              <ProtectedRoute allowedRoles={["manager", "operation_staff"]}>
                <Checkrooms />
              </ProtectedRoute>
            }
          />

          {/* Update Room */}
          <Route
            path="updateStatusRoom"
            element={
              <ProtectedRoute allowedRoles={["manager", "operation_staff"]}>
                <Updateroom />
              </ProtectedRoute>
            }
          />

          {/* Offers */}
          <Route
            path="createOffer"
            element={
              <ProtectedRoute allowedRoles={["manager", "offers_manger"]}>
                <CreateOffer />
              </ProtectedRoute>
            }
          />

          <Route
            path="showOffers"
            element={
              <ProtectedRoute allowedRoles={["manager", "offers_manger"]}>
                <ShowOffers />
              </ProtectedRoute>
            }
          />

          <Route
            path="updateOffer/:id"
            element={
              <ProtectedRoute allowedRoles={["manager", "offers_manger"]}>
                <UpdateOffer />
              </ProtectedRoute>
            }
          />

          {/* Register Employee */}
          <Route
            path="register"
            element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <Register />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
