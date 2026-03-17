import React from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/employee/checkReservation", label: "Reservations" },
  { to: "/employee/checkRooms",       label: "Rooms" },
];

const Employeescreen = () => {
  const location = useLocation();

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f9", paddingTop: 64 }}>

      {/* Sidebar */}
      <div style={{
        width: 200,
        backgroundColor: "#fff",
        borderRight: "1px solid #dee2e6",
        padding: "24px 12px",
        flexShrink: 0,
      }}>
        <p style={{ color: "#6c757d", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: 1, paddingLeft: 8, marginBottom: 12 }}>
          Employee Panel
        </p>

        {navLinks.map((ln) => {
          const active = location.pathname === ln.to;
          return (
            <Link
              key={ln.to}
              to={ln.to}
              style={{
                display: "block",
                padding: "10px 12px",
                borderRadius: 8,
                textDecoration: "none",
                marginBottom: 4,
                fontWeight: active ? 600 : 400,
                color: active ? "#fff" : "#343a40",
                backgroundColor: active ? "#0d6efd" : "transparent",
              }}
            >
              {ln.label}
            </Link>
          );
        })}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Employeescreen;