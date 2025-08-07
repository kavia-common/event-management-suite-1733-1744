import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, clearToken } from "./api";
import "./App.css";

function Navbar({ onLogout, theme, toggleTheme }) {
  const authed = isAuthenticated();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">EventSuite</Link>
      <div style={{ flex: 1 }} />
      <div className="navbar-links">
        <Link to="/events" className="navbar-link">Events</Link>
        {authed && <Link to="/dashboard" className="navbar-link">Dashboard</Link>}
        {!authed && <Link to="/login" className="navbar-link">Login</Link>}
        {!authed && <Link to="/register" className="navbar-link">Register</Link>}
        {authed && (
          <button
            className="btn btn-small"
            style={{ marginLeft: 8, background: "#ff9800" }}
            onClick={onLogout}
          >Logout</button>
        )}
      </div>
      <button className="theme-toggle" onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </nav>
  );
}

export default function AppLayout({ children }) {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function handleLogout() {
    clearToken();
    navigate("/");
  }

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div className={`App ${theme}`}>
      <Navbar
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div style={{ marginTop: 64 }}>
        {children}
      </div>
    </div>
  );
}
