import { useState, useEffect } from "react";

const slides = [
  {
    bg: "https://cache.marriott.com/content/dam/marriott-renditions/ALGSI/algsi-exterior-entrance-9768-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*",
    badge: "bi-star-fill",
    badgeText: "5-Star Luxury Experience",
    title: (
      <>
        Welcome To
        <br />
        <span style={{ color: "#C9A84C" }}>RoomLux Hotel</span>
      </>
    ),
    desc: "Indulge in the finest hospitality with world-class amenities, breathtaking sea views, and unforgettable experiences crafted just for you.",
  },
  {
    bg: "https://cache.marriott.com/content/dam/marriott-renditions/ALGSI/algsi-king-suite-5243-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*",
    badge: "bi-gem",
    badgeText: "Exclusive Suites",
    title: (
      <>
        Luxury Rooms
        <br />
        <span style={{ color: "#C9A84C" }}>&amp; Suites</span>
      </>
    ),
    desc: "Discover our exquisite collection of rooms and suites designed to offer you the ultimate comfort, elegance, and style.",
  },
  {
    bg: "https://cache.marriott.com/content/dam/marriott-renditions/ALGSI/algsi-outdoor-pool-9771-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*",
    badge: "bi-water",
    badgeText: "Private Beach & Pool",
    title: (
      <>
        Enjoy The
        <br />
        <span style={{ color: "#C9A84C" }}>Mediterranean Sea</span>
      </>
    ),
    desc: "Wake up to stunning sea views and spend your days relaxing by our infinity pool overlooking the Mediterranean.",
  },
  {
    bg: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80",
    badge: "bi-cup-hot",
    badgeText: "World-Class Dining",
    title: (
      <>
        Taste The
        <br />
        <span style={{ color: "#C9A84C" }}>Finest Cuisine</span>
      </>
    ),
    desc: "Experience extraordinary culinary journeys with our award-winning chefs, serving international and local delicacies.",
  },
  {
    bg: "https://cache.marriott.com/content/dam/marriott-renditions/ALGSI/algsi-auditorium-2126-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*",
    badge: "bi-calendar-event",
    badgeText: "Events & Conferences",
    title: (
      <>
        Host Your
        <br />
        <span style={{ color: "#C9A84C" }}>Perfect Event</span>
      </>
    ),
    desc: "From grand weddings to international conferences, our state-of-the-art event halls ensure a flawless experience.",
  },
  {
    bg: "https://cache.marriott.com/content/dam/marriott-renditions/ALGSI/algsi-lobby-1862-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*",
    badge: "bi-building",
    badgeText: "Elegant Lobby",
    title: (
      <>
        Feel The
        <br />
        <span style={{ color: "#C9A84C" }}>True Luxury</span>
      </>
    ),
    desc: "From the moment you step through our doors, you are greeted with warmth, elegance, and signature hospitality.",
  },
];

export default function Main() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActive((p) => (p + 1) % slides.length),
      4500,
    );
    return () => clearInterval(t);
  }, []);

  const slide = slides[active];

  return (
    <section
      id="hero"
      className="position-relative w-100 overflow-hidden"
      style={{ height: "100vh", minHeight: "600px" }}
    >
      <div
        className="position-absolute w-100 h-100"
        style={{
          backgroundImage: `url('${slide.bg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.8s ease-in-out",
        }}
      >
        {/* Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(11,31,58,0.85), rgba(11,31,58,0.45))",
          }}
        />

        {/* Content */}
        <div
          className="container position-relative h-100 d-flex flex-column justify-content-center text-white"
          style={{ zIndex: 2 }}
        >
          <div className="row">
            <div className="col-lg-8 col-xl-7">
              <span
                className="badge rounded-pill mb-3 px-3 py-2 text-uppercase letter-spacing-2"
                style={{ background: "#C9A84C", fontSize: "0.8rem" }}
              >
                <i className={`bi ${slide.badge} me-2`}></i>
                {slide.badgeText}
              </span>

              <h1
                className="display-3 fw-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {slide.title}
              </h1>

              <p className="lead mb-5 opacity-75" style={{ maxWidth: "600px" }}>
                {slide.desc}
              </p>

              <div className="d-flex flex-wrap gap-3">
                <a
                  href="/rooms"
                  className="btn btn-lg fw-semibold px-4 rounded-pill"
                  style={{
                    background: "#C9A84C",
                    color: "#fff",
                    border: "2px solid #C9A84C",
                  }}
                >
                  <i className="bi bi-calendar-check me-2"></i>View Rooms
                </a>
                
              </div>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div
          className="position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2"
          style={{ zIndex: 3 }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-circle border-0 p-0"
              style={{
                width: "12px",
                height: "12px",
                background: i === active ? "#C9A84C" : "rgba(255,255,255,0.5)",
                transform: i === active ? "scale(1.2)" : "scale(1)",
                transition: "all 0.3s ease",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() =>
            setActive((p) => (p - 1 + slides.length) % slides.length)
          }
          className="position-absolute top-50 start-0 translate-middle-y ms-4 rounded-circle border-0 d-flex align-items-center justify-content-center"
          style={{
            width: "50px",
            height: "50px",
            background: "rgba(201,168,76,0.85)",
            color: "#fff",
            zIndex: 3,
          }}
        >
          <i className="bi bi-chevron-left fs-4"></i>
        </button>
        <button
          onClick={() => setActive((p) => (p + 1) % slides.length)}
          className="position-absolute top-50 end-0 translate-middle-y me-4 rounded-circle border-0 d-flex align-items-center justify-content-center"
          style={{
            width: "50px",
            height: "50px",
            background: "rgba(201,168,76,0.85)",
            color: "#fff",
            zIndex: 3,
          }}
        >
          <i className="bi bi-chevron-right fs-4"></i>
        </button>
      </div>
    </section>
  );
}
