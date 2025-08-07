import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { apiFetchEventDetail, apiRegisterAttendee, apiDeleteEvent, isAuthenticated } from "../api";

/**
 * PUBLIC_INTERFACE
 * Detailed event view, with register or manage actions.
 */
export default function EventDetailPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [regStatus, setRegStatus] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await apiFetchEventDetail(eventId);
        setEvent(data.event || data);
      } catch {
        setError("Event not found.");
      }
    }
    load();
  }, [eventId]);

  async function handleRegister() {
    try {
      await apiRegisterAttendee(eventId);
      setRegStatus("registered");
    } catch {
      setRegStatus("error");
    }
  }

  async function handleDelete() {
    if (!window.confirm("Are you sure to delete this event?")) return;
    try {
      await apiDeleteEvent(eventId);
      navigate("/dashboard");
    } catch {
      setError("Delete failed");
    }
  }

  if (error) return <div className="container"><h2>Error</h2><div>{error}</div></div>;
  if (!event) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container" style={{ maxWidth: 700, marginTop: 42 }}>
      <h2>{event.name}</h2>
      <div style={{ color: "var(--text-secondary)", marginBottom: 8 }}>
        {new Date(event.start_time).toLocaleString()} &mdash; {event.location}
      </div>
      <div style={{ marginBottom: 17 }}>{event.description}</div>
      <div>
        <strong>Organizer:</strong> {event.organizer_name || event.owner?.name || "N/A"}
      </div>
      <br />
      {event.is_owner ? (
        <div>
          <Link to={`/events/${event.id}/edit`} className="btn btn-small">Edit</Link>
          <button className="btn btn-small" style={{ marginLeft: 8 }} onClick={handleDelete}>Delete</button>
        </div>
      ) : isAuthenticated() ? (
        regStatus === "registered" ? (
          <span className="btn btn-small btn-disabled">Registered!</span>
        ) : (
          <button className="btn btn-small" onClick={handleRegister}>Register as Attendee</button>
        )
      ) : (
        <Link className="btn btn-small" to="/login">Login to Register</Link>
      )}
    </div>
  );
}
