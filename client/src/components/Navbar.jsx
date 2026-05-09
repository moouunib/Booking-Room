import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);

    window.addEventListener("scroll", fn);

    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [location]);

  const getAccountPath = () => {
    if (!user) return "/login";

    if (
      user.role === "manager" ||
      user.role === "operation_staff" ||
      user.role === "offers_manger"
    ) {
      return "/employee";
    }

    return "/client";
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(11,31,58,0.97)" : "#0B1F3A",
        padding: scrolled ? "8px 0" : "14px 0",
        boxShadow: scrolled
          ? "0 4px 30px rgba(0,0,0,.3)"
          : "0 2px 20px rgba(0,0,0,.25)",
        transition: "all .3s ease",
      }}
    >
      <div
        className="container d-flex align-items-center justify-content-between flex-wrap"
        style={{ gap: 10 }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "1.7rem",
            fontWeight: 700,
            color: "#C9A84C",
            textDecoration: "none",
            letterSpacing: 1,
          }}
        >
          Room<span style={{ color: "#fff" }}>Lux</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="d-lg-none"
          style={{
            background: "transparent",
            border: "1px solid #C9A84C",
            borderRadius: 4,
            padding: "4px 10px",
            cursor: "pointer",
          }}
        >
          <i
            className="bi bi-list"
            style={{ color: "#fff", fontSize: "1.5rem" }}
          ></i>
        </button>

        {/* Menu */}
        <div
          className={`${menuOpen ? "d-flex" : "d-none"} d-lg-flex`}
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Link to="/" style={linkStyle}>
            Main
          </Link>

          <Link to="/rooms" style={linkStyle}>
            Rooms
          </Link>

          <Link to="/OurServices" style={linkStyle}>
            Our Services
          </Link>

          <Link to="/about" style={linkStyle}>
            About Us
          </Link>

          <Link to={getAccountPath()} style={btnStyle}>
            {user ? "Account" : "Login"}
          </Link>
        </div>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "rgba(255,255,255,.85)",
  fontSize: ".93rem",
  fontWeight: 500,
  padding: "6px 14px",
  textDecoration: "none",
};

const btnStyle = {
  background: "#C9A84C",
  color: "#fff",
  border: "2px solid #C9A84C",
  padding: "8px 20px",
  borderRadius: 30,
  fontWeight: 500,
  textDecoration: "none",
};
