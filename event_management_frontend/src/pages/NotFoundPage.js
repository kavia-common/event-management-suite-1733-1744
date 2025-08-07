import React from "react";
import { Link } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * 404 not found page
 */
export default function NotFoundPage() {
  return (
    <div className="container" style={{ marginTop: 80, textAlign: "center" }}>
      <h2>404 - Page not found</h2>
      <Link className="btn" to="/">Go to Home</Link>
    </div>
  );
}
