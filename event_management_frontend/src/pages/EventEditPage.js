import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiCreateEvent, apiFetchEventDetail, apiUpdateEvent } from "../api";

/**
 * PUBLIC_INTERFACE
 * Create/Edit Event Form page (used for new and for editing)
 */
export default function EventEditPage({ createNew = false }) {
  const { eventId } = useParams();
  const isEdit = !createNew && Boolean(eventId);
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    name: "", location: "", start_time: "", description: "",
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      apiFetchEventDetail(eventId)
        .then(data => {
          const ev = data.event || data;
          setFields({
            name: ev.name || "",
            location: ev.location || "",
            start_time: ev.start_time ? ev.start_time.slice(0, 16) : "",
            description: ev.description || "",
          });
          setLoading(false);
        }).catch(() => setLoading(false));
    }
  }, [eventId, isEdit]);

  function handleChange(e) {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await apiUpdateEvent(eventId, fields);
      } else {
        await apiCreateEvent(fields);
      }
      navigate(isEdit ? `/events/${eventId}` : "/dashboard");
    } catch {
      alert("Failed to save event.");
    }
    setSaving(false);
  }

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container" style={{ maxWidth: 600, marginTop: 40 }}>
      <h2>{isEdit ? "Edit Event" : "Create Event"}</h2>
      <form onSubmit={handleSubmit} className="event-edit-form" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <label>
          Name
          <input type="text" name="name" required value={fields.name} onChange={handleChange} className="input" />
        </label>
        <label>
          Location
          <input type="text" name="location" required value={fields.location} onChange={handleChange} className="input" />
        </label>
        <label>
          Start Time
          <input type="datetime-local" name="start_time" required value={fields.start_time} onChange={handleChange} className="input" />
        </label>
        <label>
          Description
          <textarea name="description" value={fields.description} onChange={handleChange} className="input" rows={3}></textarea>
        </label>
        <button type="submit" className="btn" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
      </form>
    </div>
  );
}
