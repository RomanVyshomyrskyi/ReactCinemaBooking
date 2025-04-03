import React, { useState, useEffect } from "react";
import { login } from "../api";

const Login = ({ setToken, setPage }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.href = "https://fonts.googleapis.com/css2?family=Grenze:wght@400;700&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      setPage("sessions");
    } else alert(data.message);
  };

  const renderInput = (name, type, label) => (
    <div style={{ position: "relative", marginBottom: "2rem" }}>
      <input
        name={name}
        type={type}
        className="form-control"
        style={{
          backgroundColor: "#0d1b2a",
          borderColor: focused === name ? "#E17564" : "#d7263d",
          borderRadius: "1.25rem",
          color: form[name] ? "#BE3144" : "#E17564",
          padding: "0 1rem",
          height: "3.5rem",
          fontSize: "1.25rem",
          lineHeight: "3.5rem",
          transition: "all 0.3s ease",
        }}
        onFocus={() => setFocused(name)}
        onBlur={() => setFocused(null)}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        value={form[name]}
      />
      <label
        htmlFor={name}
        style={{
          color: "#BE3144",
          fontWeight: 700,
          backgroundColor: "transparent",
          padding: "0 0.5rem",
          transform:
            focused === name || form[name]
              ? "translateY(-1.4rem)"
              : "",
          transformOrigin: "top left",
          transition: "all 0.2s ease-in-out",
          position: "absolute",
          left: "1.2rem",
          top: focused === name || form[name] ? "-0.25rem" : "0.85rem",
          pointerEvents: "none",
          fontSize: focused === name || form[name] ? "1.15rem" : "1.3rem",
        }}
      >
        {label}
      </label>
    </div>
  );

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#0a1128", fontFamily: "Grenze, serif" }}
    >
      <form
        onSubmit={handleSubmit}
        className="text-center px-5 py-5"
        style={{
          backgroundColor: "#0d1b2a",
          color: "#fff",
          width: "35rem",
          height: "30rem",
          borderRadius: "5rem",
          boxShadow: "0 0 15.625rem 0.5625rem #872341",
        }}
      >
        <h2 className="mb-4">Sign in</h2>
        {renderInput("username", "text", "Login")}
        {renderInput("password", "password", "Password")}
        <button
          className="btn w-100 mb-2"
          style={{
            backgroundColor: "#d7263d",
            color: "#09122C",
            width: "25.9375rem",
            height: "5.0625rem",
            fontWeight: 600,
            borderRadius: "1.25rem",
          }}
        >
          Log in
        </button>
        <div className="mb-3">
          <a href="#" className="text-danger" style={{ fontSize: "0.8rem" }}>
            Forgot login or password
          </a>
        </div>
        <button
          type="button"
          className="btn btn-link text-light"
          onClick={() => setPage("register")}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;