import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiMyEvents, apiMyRegistrations } from "../api";

/**
 * PUBLIC_INTERFACE
 * Dashboard for logged in users (owned events + registered events)
 */
export default function DashboardPage() {
  const [myEvents, setMyEvents] = useState([]);
  const [myRegistrations, setMyRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [owned, regs] = await Promise.all([apiMyEvents(), apiMyRegistrations()]);
        setMyEvents(owned.events || owned);
        setMyRegistrations(regs.events || regs);
      } catch {
        setMyEvents([]); setMyRegistrations([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="container" style={{ marginTop: 30, maxWidth: 900 }}>
      <h2>Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <section style={{ marginBottom: 40 }}>
            <h3>Your Events</h3>
            <Link className="btn btn-small" style={{ marginBottom: 14 }} to="/events/new">
              + Create Event
            </Link>
            {myEvents.length === 0 ? (
              <div>You haven't created any events.</div>
            ) : (
              <ul className="event-list" style={{ listStyle: "none", padding: 0 }}>
                {myEvents.map(ev => (
                  <li key={ev.id} style={{ background: "var(--bg-secondary)", borderRadius: 9, padding: 14, marginBottom: 10 }}>
                    <Link to={`/events/${ev.id}`}><strong>{ev.name}</strong> <span style={{ color: "var(--text-secondary)" }}>{ev.location}</span></Link>
                    {" — "}
                    <Link to={`/events/${ev.id}/edit`} className="btn btn-small">Edit</Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <h3>Events You're Attending</h3>
            {myRegistrations.length === 0 ? (
              <div>No event registrations yet.</div>
            ) : (
              <ul className="event-list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {myRegistrations.map(ev => (
                  <li key={ev.id} style={{ background: "var(--bg-secondary)", borderRadius: 9, padding: 12, marginBottom: 10 }}>
                    <Link to={`/events/${ev.id}`}><strong>{ev.name}</strong> {" "}
                      <span style={{ color: "var(--text-secondary)" }}>{ev.location}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}
