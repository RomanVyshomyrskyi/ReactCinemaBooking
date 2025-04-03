import React, { useEffect, useState } from "react";
import { getSessions, createBooking } from "../api";
import SeatGrid from "./SeatGrid";

const SessionView = ({ token }) => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getSessions().then((all) => {
      const upcoming = all.filter((s) => new Date(s.date) > new Date());
      setSessions(upcoming);
    });
  }, []);

  const loadBookings = async (sessionId) => {
    const res = await fetch(`http://localhost:5000/api/bookings/${sessionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setBookings(data);
  };

  const handleBook = async () => {
    if (!selectedSeats.length || !selectedSession) return;
    for (const seat of selectedSeats) {
      await createBooking(token, {
        sessionId: selectedSession._id,
        row: seat.row,
        column: seat.column,
      });
    }
    alert("Оплата пройшла успішно!");
    setSelectedSeats([]);
    loadBookings(selectedSession._id);
  };

  const handleSessionSelect = (s) => {
    setSelectedSession(s);
    setSelectedSeats([]);
    loadBookings(s._id);
  };

  const toggleSeat = (row, col) => {
    const exists = selectedSeats.find((s) => s.row === row && s.column === col);
    if (exists) {
      setSelectedSeats(selectedSeats.filter((s) => !(s.row === row && s.column === col)));
    } else {
      setSelectedSeats([...selectedSeats, { row, column: col }]);
    }
  };

  const getSeatStatus = (row, col) => {
    const booking = bookings.find(
      (b) => b.seat.row === row && b.seat.column === col
    );
    if (!booking) {
      return selectedSeats.some((s) => s.row === row && s.column === col)
        ? "selected"
        : "free";
    }
    return booking.user === JSON.parse(atob(token.split('.')[1])).id ? "mine" : "taken";
  };

  return (
    <div className="container py-4 text-light" style={{ fontFamily: "Grenze, serif" }}>
      <h2 className="mb-4" style={{ color: "#d7263d" }}>Sessions</h2>
      <ul className="list-group mb-4">
        {sessions.map((s) => (
          <li
            key={s._id}
            className="list-group-item bg-dark text-light cursor-pointer"
            onClick={() => handleSessionSelect(s)}
            style={{ backgroundColor: "#09122C", borderColor: "#d7263d" }}
          >
            {s.movie.title} — {new Date(s.date).toLocaleString()}
          </li>
        ))}
      </ul>

      {selectedSession && (
        <>
          <h4 style={{ color: "#BE3144" }}>{selectedSession.movie.title} — Seats</h4>
          <SeatGrid
            seats={selectedSession.seats}
            selected={selectedSeats}
            getStatus={getSeatStatus}
            onSelect={toggleSeat}
          />

          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-success" onClick={handleBook}>
              Book Selected Seats
            </button>
            <button className="btn btn-outline-warning" onClick={() => setSelectedSeats([])}>
              Clear Selection
            </button>
          </div>

          <div className="mt-4">
            <h5>Legend:</h5>
            <div className="d-flex gap-3">
              <span className="badge bg-success">Selected</span>
              <span className="badge bg-info">Your booked</span>
              <span className="badge bg-secondary">Taken</span>
              <span className="badge border border-danger text-danger">Free</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SessionView;
