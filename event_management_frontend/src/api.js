//
// API utility for Event Management Frontend
//

// Get the backend URL from environment variable or default for local dev
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000/api";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// PUBLIC_INTERFACE
export async function apiLogin(email, password) {
  // Assumes backend endpoint /auth/login
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Invalid email or password");
  return await res.json();
}

// PUBLIC_INTERFACE
export async function apiRegister(name, email, password) {
  // Assumes backend endpoint /auth/register
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return await res.json();
}

// PUBLIC_INTERFACE
export async function apiFetchEvents(query) {
  // List events with optional search
  const q = query ? `?q=${encodeURIComponent(query)}` : "";
  const res = await fetch(`${API_BASE_URL}/events${q}`);
  if (!res.ok) throw new Error("Failed to load events");
  return await res.json();
}

// PUBLIC_INTERFACE
export async function apiFetchEventDetail(eventId) {
  const res = await fetch(`${API_BASE_URL}/events/${eventId}`);
  if (!res.ok) throw new Error("Event not found");
  return await res.json();
}

// PUBLIC_INTERFACE
export async function apiCreateEvent(eventData) {
  const res = await fetch(`${API_BASE_URL}/events`, {
    method: "POST",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(eventData),
  });
  if (!res.ok) throw new Error("Create event failed");
  return await res.json();
}

// PUBLIC_INTERFACE
export async function apiUpdateEvent(eventId, eventData) {
  const res = await fetch(`${API_BASE_URL}/events/${eventId}`, {
    method: "PUT",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(eventData),
  });
  if (!res.ok) throw new Error("Update event failed");
  return await res.json();
}

// PUBLIC_INTERFACE
export async function apiDeleteEvent(eventId) {
  const res = await fetch(`${API_BASE_URL}/events/${eventId}`, {
    method: "DELETE",
    headers: { ...authHeaders() }
  });
  if (!res.ok) throw new Error("Delete event failed");
  return await res.json();
}

// PUBLIC_INTERFACE
export async function apiRegisterAttendee(eventId) {
  // POST /events/<id>/register
  const res = await fetch(`${API_BASE_URL}/events/${eventId}/register`, {
    method: "POST",
    headers: {
      ...authHeaders()
    }
  });
  if (!res.ok) throw new Error("Registration failed");
  return await res.json();
}

// PUBLIC_INTERFACE
export async function apiMyEvents() {
  // GET /me/events (user's created events)
  const res = await fetch(`${API_BASE_URL}/me/events`, {
    headers: { ...authHeaders() }
  });
  if (!res.ok) throw new Error("Failed to load your events");
  return await res.json();
}

// PUBLIC_INTERFACE
export async function apiMyRegistrations() {
  // GET /me/registrations (events the user is attending)
  const res = await fetch(`${API_BASE_URL}/me/registrations`, {
    headers: { ...authHeaders() }
  });
  if (!res.ok) throw new Error("Failed to load your registrations");
  return await res.json();
}

// PUBLIC_INTERFACE
export function storeToken(token) {
  localStorage.setItem("token", token);
}
export function clearToken() {
  localStorage.removeItem("token");
}
export function isAuthenticated() {
  return !!localStorage.getItem("token");
}
