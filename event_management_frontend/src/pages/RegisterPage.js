import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRegister, storeToken } from "../api";

/**
 * PUBLIC_INTERFACE
 * User sign-up form page
 */
export default function RegisterPage() {
  const [fields, setFields] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await apiRegister(fields.name, fields.email, fields.password);
      storeToken(data.token || data.access_token);
      navigate("/dashboard");
    } catch {
      setError("Registration failed.");
    }
  }

  return (
    <div className="container" style={{ maxWidth: 380, marginTop: 64 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <input
          name="name"
          type="text"
          className="input"
          placeholder="Full Name"
          value={fields.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          className="input"
          placeholder="Email"
          value={fields.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          className="input"
          placeholder="Password"
          value={fields.password}
          onChange={handleChange}
          required
        />
        {error && <div style={{ color: "#e75454", fontSize: 14 }}>{error}</div>}
        <button className="btn" type="submit">Sign Up</button>
        <div style={{ fontSize: 14, color: "var(--text-secondary)" }}>
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </form>
    </div>
  );
}
