import React, { useState, useEffect } from "react";
import { getSessions, getMovies, createMovie, createSession } from "../api";

const AdminPanel = ({ token }) => {
  const [movies, setMovies] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [sessionForm, setSessionForm] = useState({ movie: "", date: "", hall: "" });
  const [movieForm, setMovieForm] = useState({ title: "", description: "", duration: "" });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    const movies = await getMovies();
    const allSessions = await getSessions();
    const upcomingSessions = allSessions.filter(s => new Date(s.date) > new Date());
    setMovies(movies);
    setSessions(upcomingSessions);
  };

  const handleSessionChange = (e) => {
    setSessionForm({ ...sessionForm, [e.target.name]: e.target.value });
  };

  const handleMovieChange = (e) => {
    setMovieForm({ ...movieForm, [e.target.name]: e.target.value });
  };

  const handleSessionSubmit = async (e) => {
    e.preventDefault();
    const res = await createSession(token, {
      ...sessionForm,
      seats: Array.from({ length: 20 }, () => Array(20).fill(false)),
    });
    if (res.ok) {
      alert("Session created");
      refreshData();
    } else {
      alert("Failed to create session");
    }
  };

  const handleMovieSubmit = async (e) => {
    e.preventDefault();
    const res = await createMovie(token, movieForm);
    if (res.ok) {
      alert("Movie created");
      refreshData();
    } else {
      alert("Failed to create movie");
    }
  };

  return (
    <div
      className="container py-4"
      style={{ backgroundColor: "#0d1b2a", color: "#fff", fontFamily: "Grenze, serif" }}
    >
      <style>{`
        ::placeholder {
          color: #BE3144 !important;
          opacity: 1;
        }
      `}</style>

      <h2 style={{ color: "#d7263d" }} className="mb-4">
        Admin Panel
      </h2>

      <form onSubmit={handleMovieSubmit} className="mb-5">
        <h4 style={{ color: "#BE3144" }}>Create Movie</h4>
        <input
          name="title"
          className="form-control mb-2"
          placeholder="Title"
          onChange={handleMovieChange}
          style={{ backgroundColor: "#09122C", color: "#E17564", borderColor: "#d7263d" }}
        />
        <input
          name="description"
          className="form-control mb-2"
          placeholder="Description"
          onChange={handleMovieChange}
          style={{ backgroundColor: "#09122C", color: "#E17564", borderColor: "#d7263d" }}
        />
        <input
          name="duration"
          className="form-control mb-3"
          placeholder="Duration (min)"
          onChange={handleMovieChange}
          style={{ backgroundColor: "#09122C", color: "#E17564", borderColor: "#d7263d" }}
        />
        <button
          className="btn mb-3"
          style={{ backgroundColor: "#d7263d", color: "#09122C", fontWeight: 600, borderRadius: "1rem" }}
        >
          Create Movie
        </button>
      </form>

      <form onSubmit={handleSessionSubmit} className="mb-5">
        <h4 style={{ color: "#BE3144" }}>Create Session</h4>
        <select
          name="movie"
          className="form-control mb-2"
          value={sessionForm.movie} 
          onChange={handleSessionChange}
          style={{ backgroundColor: "#09122C", color: "#E17564", borderColor: "#d7263d" }}
        >
          <option value="" disabled>Select movie</option>
          {movies.map((m) => (
            <option key={m._id} value={m._id} style={{ color: "#000" }}>
              {m.title}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          name="date"
          className="form-control mb-2"
          onChange={handleSessionChange}
          style={{ backgroundColor: "#09122C", color: "#E17564", borderColor: "#d7263d" }}
        />
        <input
          name="hall"
          placeholder="Hall name"
          className="form-control mb-3"
          onChange={handleSessionChange}
          style={{ backgroundColor: "#09122C", color: "#E17564", borderColor: "#d7263d" }}
        />
        <button
          className="btn"
          style={{ backgroundColor: "#d7263d", color: "#09122C", fontWeight: 600, borderRadius: "1rem" }}
        >
          Create Session
        </button>
      </form>

      <h4 style={{ color: "#BE3144" }}>Sessions:</h4>
      <ul className="list-group">
        {sessions.map((s) => (
          <li
            key={s._id}
            className="list-group-item mb-3"
            style={{
              backgroundColor: "#09122C",
              color: "#E17564",
              border: "1px solid #d7263d",
              borderRadius: "1rem",
              padding: "1rem 1.5rem",
            }}
          >
            {s.movie.title} — {new Date(s.date).toLocaleString()} — Hall: {s.hall}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
