// ==== Темна навігаційна панель у стилі проєкту (без іконок, прикріплена зверху) ====
import React, { useEffect } from "react";

const Navbar = ({ setPage, logout, role }) => {
  useEffect(() => {
    // Додаємо відступ зверху для основного контейнера, щоб не перекривало навбар
    const body = document.body;
    body.style.paddingTop = "5rem";
    return () => {
      body.style.paddingTop = "0";
    };
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg px-4 py-3 fixed-top"
      style={{
        backgroundColor: "#0d1b2a",
        fontFamily: "Grenze, serif",
        borderBottom: "2px solid #d7263d",
        zIndex: 1050,
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span
          className="navbar-brand text-light fw-bold"
          style={{ fontSize: "1.5rem" }}
        >
          Cinema Booking
        </span>

        <div className="d-flex align-items-center gap-3">
          <button
            className="btn text-light fw-bold"
            style={{ color: "#BE3144" }}
            onClick={() => setPage("movies")}
          >
            Movies
          </button>
          <button
            className="btn text-light fw-bold"
            style={{ color: "#BE3144" }}
            onClick={() => setPage("sessions")}
          >
            Sessions
          </button>
          {role === "admin" && (
            <button
              className="btn text-light fw-bold"
              style={{ color: "#E17564" }}
              onClick={() => setPage("admin")}
            >
              Admin
            </button>
          )}
          <button
            className="btn btn-sm text-light border-0"
            style={{
              backgroundColor: "#d7263d",
              fontWeight: 600,
              borderRadius: "1rem",
              padding: "0.5rem 1.2rem",
            }}
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
