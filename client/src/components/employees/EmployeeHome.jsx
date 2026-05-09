import React from "react";

const EmployeeHome = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container mt-4">
      <h2>Welcome {user?.name}</h2>
      <p className="text-muted">Employee Dashboard</p>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>Reservations</h5>
            <p>Manage bookings</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>Rooms</h5>
            <p>Check rooms status</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>Offers</h5>
            <p>Manage hotel offers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHome;
