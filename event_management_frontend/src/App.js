import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./AppLayout";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import EventEditPage from "./pages/EventEditPage";
import NotFoundPage from "./pages/NotFoundPage";
import { isAuthenticated } from "./api";

/**
 * PUBLIC_INTERFACE
 * Root App component with routing and layout
 */
function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/events" />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:eventId" element={<EventDetailPage />} />
          <Route path="/events/:eventId/edit" element={
            <RequireAuth>
              <EventEditPage />
            </RequireAuth>
          } />
          <Route path="/events/new" element={
            <RequireAuth>
              <EventEditPage createNew />
            </RequireAuth>
          } />
          <Route path="/dashboard" element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          } />
          <Route path="/login" element={
            !isAuthenticated() ? <LoginPage /> : <Navigate to="/dashboard" />
          } />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

// PUBLIC_INTERFACE
function RequireAuth({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default App;
