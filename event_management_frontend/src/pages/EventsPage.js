import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { apiFetchEvents, isAuthenticated } from "../api";

/**
 * PUBLIC_INTERFACE
 * Event listing and search page.
 */
export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    searchEvents();
    // no dep needed; search events on mount or query
    // eslint-disable-next-line
  }, []);

  async function searchEvents(e) {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const results = await apiFetchEvents(q);
      setEvents(results.events || results);
    } catch (err) {
      setEvents([]);
    }
    setLoading(false);
  }

  const handleQChange = (e) => setQ(e.target.value);

  return (
    <div className="container" style={{ marginTop: 32, maxWidth: 900 }}>
      <h2>Events</h2>
      <form
        onSubmit={searchEvents}
        className="event-search"
        style={{ display: "flex", gap: 8, marginBottom: 24, alignItems: "center" }}
      >
        <input
          type="text"
          placeholder="Search events"
          className="input"
          value={q}
          onChange={handleQChange}
          style={{
            flex: 1,
            padding: "0.6em 1em",
            borderRadius: 8,
            border: "1px solid var(--border-color)"
          }}
        />
        <button className="btn" type="submit" style={{ minWidth: 88 }}>Search</button>
        {isAuthenticated() && (
          <Link to="/events/new" className="btn" style={{ marginLeft: 12 }}>
            + Create Event
          </Link>
        )}
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul className="event-list" style={{ listStyle: "none", padding: 0 }}>
          {events.map(e => (
            <li key={e.id} style={{
              background: "var(--bg-secondary)",
              borderRadius: 12,
              boxShadow: "0 1px 3px #0001",
              marginBottom: 17,
              padding: 18,
              transition: "background 0.2s"
            }}>
              <Link to={`/events/${e.id}`}>
                <h3 style={{ margin: "0 0 0.3em 0" }}>{e.name}</h3>
              </Link>
              <div style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 4 }}>
                {new Date(e.start_time).toLocaleString()} &mdash; {e.location}
              </div>
              <div style={{ marginBottom: 4 }}>{e.short_description || e.description?.slice(0, 80) || ""}</div>
              <div>
                <Link to={`/events/${e.id}`} className="btn btn-small">Details</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
