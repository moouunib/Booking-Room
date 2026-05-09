import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: "bi-door-open",
    title: "Luxury Rooms",
    desc: "Spacious and elegantly designed rooms with premium amenities, comfortable bedding, and stunning views.",
    color: "#0B1F3A",
  },
  {
    icon: "bi-cup-hot",
    title: "Fine Dining",
    desc: "Experience world-class culinary journey with our award-winning chefs serving international and local delicacies.",
    color: "#C9A84C",
  },
  {
    icon: "bi-water",
    title: "Pool & Beach",
    desc: "Infinity pool overlooking the Mediterranean Sea with private beach access and sun loungers.",
    color: "#0B1F3A",
  },
  
  
  
];

const OurServices = () => {
  return (
    <div className="bg-light">
      <div
        className="py-5 text-center"
        style={{
          background: "linear-gradient(135deg, #0B1F3A 0%, #1a3a5c 100%)",
        }}
      >
        <div className="container py-5">
          <h1
            className="display-3 fw-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our <span style={{ color: "#C9A84C" }}>Services</span>
          </h1>
          <p className="lead text-white-50 mx-auto" style={{ maxWidth: 600 }}>
            Experience unparalleled luxury with our range of premium services
            designed to make your stay unforgettable.
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="card border-0 shadow-sm h-100 service-card">
                <div className="card-body p-4 text-center">
                  <div
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4 service-icon"
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: `${service.color}15`,
                    }}
                  >
                    <i
                      className={`bi ${service.icon} fs-3`}
                      style={{ color: service.color }}
                    ></i>
                  </div>
                  <h4 className="fw-bold mb-3" style={{ color: "#0B1F3A" }}>
                    {service.title}
                  </h4>
                  <p className="text-muted mb-0">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5 py-4">
          <h4 className="fw-bold mb-4" style={{ color: "#0B1F3A" }}>
            Ready to Experience Luxury?
          </h4>
          <Link
            to="/rooms"
            className="btn btn-warning btn-lg fw-semibold rounded-pill px-5"
          >
            <i className="bi bi-door-open me-2"></i>Book Your Stay
          </Link>
        </div>
      </div>

      <style>{`
        .service-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
        }
        .service-icon {
          transition: transform 0.3s ease;
        }
        .service-card:hover .service-icon {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default OurServices;
