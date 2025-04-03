import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import MovieList from "./components/MovieList";
import SessionView from "./components/SessionView";
import AdminPanel from "./components/AdminPanel";
import Navbar from "./components/Navbar";

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [page, setPage] = useState("login");
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setRole(payload.role);
      } catch (e) {
        console.error("Invalid token");
        setRole(null);
      }
    } else {
      setRole(null);
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setPage("login");
  };

  if (!token) {
    return page === "login" ? (
      <Login setToken={setToken} setPage={setPage} />
    ) : (
      <Register setPage={setPage} />
    );
  }

  return (
    <div className="container py-4">
      <Navbar setPage={setPage} logout={logout} role={role} />
      {page === "movies" && <MovieList token={token} />}
      {page === "sessions" && <SessionView token={token} />}
      {page === "admin" && role === "admin" && <AdminPanel token={token} />}
    </div>
  );
};

export default App;