import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiLogin, storeToken } from "../api";

/**
 * PUBLIC_INTERFACE
 * Sign-in page
 */
export default function LoginPage() {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const data = await apiLogin(fields.email, fields.password);
      storeToken(data.token || data.access_token);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials.");
    }
  }

  return (
    <div className="container" style={{ maxWidth: 360, marginTop: 64 }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
        <button className="btn" type="submit">Login</button>
        <div style={{ fontSize: 14, color: "var(--text-secondary)" }}>
          No account? <Link to="/register">Register here</Link>
        </div>
      </form>
    </div>
  );
}
