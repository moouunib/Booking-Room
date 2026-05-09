import React from "react";
import { Link } from "react-router-dom";

const stats = [
  { number: "15+", label: "Years of Excellence" },
  { number: "50K+", label: "Happy Guests" },
  { number: "120+", label: "Luxury Rooms" },
  { number: "4.9", label: "Guest Rating" },
];

const team = [
  {
    name: "Ahmed Benali",
    role: "General Manager",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  },
  {
    name: "Sarah Mitchell",
    role: "Head of Guest Services",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    name: "Karim Boudiaf",
    role: "Executive Chef",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    name: "Emma Johnson",
    role: "Spa Director",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-light">
      <div
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #0B1F3A 0%, #1a3a5c 100%)",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1
                className="display-3 fw-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                About <span style={{ color: "#C9A84C" }}>RoomLux</span>
              </h1>
              <p className="lead text-white-50 mb-4">
                Welcome to RoomLux Hotel, where luxury meets tradition and
                modern comfort blends with timeless elegance.
              </p>
              <p className="text-white-50 mb-4">
                Since our founding, we have been committed to providing
                exceptional hospitality that exceeds the expectations of every
                guest. Our dedicated team works tirelessly to ensure that each
                visit is a memorable experience.
              </p>
              
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0">
              <div className="position-relative">
                <img
                  src="https://cache.marriott.com/content/dam/marriott-renditions/ALGSI/algsi-lobby-1862-hor-clsc.jpg"
                  alt="RoomLux Hotel Lobby"
                  className="img-fluid rounded-4 shadow"
                />
                <div className="position-absolute bottom-0 start-0 m-4">
                  <div className="bg-warning rounded-3 px-4 py-2 shadow">
                    <span className="fw-bold text-dark">Since 2010</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      <div className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3" style={{ color: "#0B1F3A" }}>
              Our <span style={{ color: "#C9A84C" }}>Mission</span>
            </h2>
            <p className="text-muted mx-auto" style={{ maxWidth: 700 }}>
              To create unforgettable experiences through impeccable service,
              luxurious accommodations, and genuine hospitality that makes every
              guest feel at home.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100 text-center p-4">
                <div
                  className="rounded-circle bg-warning bg-opacity-10 d-inline-flex align-items-center justify-content-center mx-auto mb-4"
                  style={{ width: 70, height: 70 }}
                >
                  <i className="bi bi-heart fs-3 text-warning"></i>
                </div>
                <h5 className="fw-bold mb-3" style={{ color: "#0B1F3A" }}>
                  Guest Satisfaction
                </h5>
                <p className="text-muted mb-0">
                  We prioritize the happiness and comfort of every guest above
                  all else.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100 text-center p-4">
                <div
                  className="rounded-circle bg-warning bg-opacity-10 d-inline-flex align-items-center justify-content-center mx-auto mb-4"
                  style={{ width: 70, height: 70 }}
                >
                  <i className="bi bi-gem fs-3 text-warning"></i>
                </div>
                <h5 className="fw-bold mb-3" style={{ color: "#0B1F3A" }}>
                  Excellence
                </h5>
                <p className="text-muted mb-0">
                  We strive for excellence in every detail of our service and
                  facilities.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100 text-center p-4">
                <div
                  className="rounded-circle bg-warning bg-opacity-10 d-inline-flex align-items-center justify-content-center mx-auto mb-4"
                  style={{ width: 70, height: 70 }}
                >
                  <i className="bi bi-globe fs-3 text-warning"></i>
                </div>
                <h5 className="fw-bold mb-3" style={{ color: "#0B1F3A" }}>
                  Sustainability
                </h5>
                <p className="text-muted mb-0">
                  We are committed to sustainable practices that protect our
                  beautiful environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      

      <div
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #0B1F3A 0%, #1a3a5c 100%)",
        }}
      >
        <div className="container py-4 text-center">
          <h2 className="fw-bold text-white mb-3">
            Experience the <span style={{ color: "#C9A84C" }}>RoomLux</span>{" "}
            Difference
          </h2>
          <p className="text-white-50 mb-4 mx-auto" style={{ maxWidth: 600 }}>
            Book your stay today and discover why we're consistently rated among
            the best hotels in the region.
          </p>
          <Link
            to="/rooms"
            className="btn btn-warning btn-lg fw-semibold rounded-pill px-5"
          >
            <i className="bi bi-calendar-check me-2"></i>Book Now
          </Link>
        </div>
      </div>

      <style>{`
        .team-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .team-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.15) !important;
        }
        .team-card:hover img {
          transform: scale(1.05);
        }
        .team-card img {
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
