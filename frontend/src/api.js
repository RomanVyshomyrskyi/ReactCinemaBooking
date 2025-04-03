const API_URL = "http://localhost:5000/api";

export const register = async (data) => fetch(`${API_URL}/auth/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

export const login = async (data) => fetch(`${API_URL}/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

export const getMovies = async () => (await fetch(`${API_URL}/movies`)).json();

export const getSessions = async () => (await fetch(`${API_URL}/sessions`)).json();

export const createBooking = async (token, data) => fetch(`${API_URL}/bookings`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(data),
});

export const createMovie = async (token, data) =>
    fetch(`${API_URL}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

  export const createSession = async (token, data) =>
    fetch(`${API_URL}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
