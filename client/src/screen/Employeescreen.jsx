import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const navLinks = [
  {
    to: "/employee",
    label: "Dashboard",
    roles: ["manager", "operation_staff", "offers_manger"],
  },
  {
    to: "/employee/checkReservation",
    label: "Reservations",
    roles: ["manager", "operation_staff"],
  },
  {
    to: "/employee/checkRooms",
    label: "Rooms",
    roles: ["manager", "operation_staff"],
  },
  {
    to: "/employee/register",
    label: "Employees",
    roles: ["manager"],
  },
  {
    to: "/employee/showOffers",
    label: "Offers",
    roles: ["manager", "offers_manger"],
  },
];

const Employeescreen = () => {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const role = user.role || "employee";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f4f6f9",
        paddingTop: 64,
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 220,
          backgroundColor: "#fff",
          borderRight: "1px solid #ddd",
          padding: "20px",
        }}
      >
        <p style={{ fontWeight: "bold", marginBottom: 15 }}>Employee Panel</p>

        {navLinks
          .filter((item) => item.roles.includes(role))
          .map((item) => {
            const active =
              location.pathname === item.to ||
              (item.to === "/employee" && location.pathname === "/employee");

            return (
              <Link
                key={item.to}
                to={item.to}
                style={{
                  display: "block",
                  padding: "10px",
                  marginBottom: "8px",
                  textDecoration: "none",
                  borderRadius: "8px",
                  backgroundColor: active ? "#0d6efd" : "transparent",
                  color: active ? "white" : "black",
                }}
              >
                {item.label}
              </Link>
            );
          })}

        <button onClick={logout} className="btn btn-danger w-100 mt-3">
          Logout
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Employeescreen;
