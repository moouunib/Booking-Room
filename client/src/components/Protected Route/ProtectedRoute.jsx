import React from "react";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in
  if (!token || !user) {
    return (
      <div className="container mt-5 text-center">
        <div className="card shadow p-4">
          <h3 className="text-danger">⛔ Access Denied</h3>
          <p className="mt-2">You must be logged in to access this page.</p>
          <p className="text-muted">
            Please login with your account to continue.
          </p>

          <a href="/login" className="btn btn-primary mt-3">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // ❌ account blocked
  if (user.status !== "active") {
    return (
      <div className="container mt-5 text-center">
        <div className="card shadow p-4">
          <h3 className="text-danger">⛔ Account Blocked</h3>
          <p className="mt-2">Your account is not active anymore.</p>
          <p className="text-muted">Please contact the administrator.</p>
        </div>
      </div>
    );
  }

  // ❌ role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="container mt-5 text-center">
        <div className="card shadow p-4">
          <h3 className="text-danger">⛔ Unauthorized Access</h3>
          <p className="mt-2">You don't have permission to view this page.</p>
          <p className="text-muted">
            Required role: {allowedRoles.join(" or ")}
          </p>
        </div>
      </div>
    );
  }

  // ✅ OK
  return children;
};

export default ProtectedRoute;
