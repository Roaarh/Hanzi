// src/pages/AdminLayout.js
import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "../styles/Admin-panel.css";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // PROTECT ADMIN
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(storedUser);
    if (user.role !== "admin") {
      localStorage.clear();
      navigate("/login");
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin-root">
      <button
        className="admin-hamburger"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span></span><span></span><span></span>
      </button>

      <div className="admin-layout">
        <aside className={`admin-sidebar ${isMobileMenuOpen ? "sidebar-open" : ""}`}>
          <div className="admin-sidebar-top">
            <h2 className="admin-sidebar-title">Admin Panel</h2>
          </div>
          <nav className="admin-nav">
            <button 
              className="admin-nav-link active"
              onClick={() => navigate("/admin/dashboard")}
            >
              Dashboard
            </button>
            <button 
              className="admin-nav-link"
              onClick={() => navigate("/admin/users")}
            >
              Users
            </button>
            <button 
              className="admin-nav-link"
              onClick={() => navigate("/admin/reservations")}
            >
              Reservations
            </button>
          </nav>
          <button className="admin-logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </aside>

        <main className="admin-main">
          <Outlet /> {/* Renders child pages */}
        </main>
      </div>
    </div>
  );
}
