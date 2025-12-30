// src/pages/AdminDashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Admin-panel.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalUsers: 0, totalReservations: 0, totalAdmins: 0 });
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [statsRes, usersRes, resRes] = await Promise.all([
          axios.get("http://localhost:5001/api/admin/stats", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("http://localhost:5001/api/admin/users", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("http://localhost:5001/api/admin/reservations", { headers: { Authorization: `Bearer ${token}` } })
        ]);
        
        setStats(statsRes.data);
        setUsers(usersRes.data.users.slice(0, 5));
        setReservations(resRes.data.reservations.slice(0, 5));
        setLoading(false);
      } catch (err) {
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) return <div className="admin-section"><h2 className="admin-section-title">Loading...</h2></div>;

  return (
    <>
      <section className="admin-stats-grid">
        <div className="admin-stat-card">
          <span className="admin-stat-label">Total Users</span>
          <span className="admin-stat-value">{stats.totalUsers}</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-label">Reservations</span>
          <span className="admin-stat-value">{stats.totalReservations}</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-label">Admins</span>
          <span className="admin-stat-value">{stats.totalAdmins}</span>
        </div>
      </section>

      <section className="admin-section">
        <h2 className="admin-section-title">Latest Users</h2>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={u.role === 'admin' ? 'admin-role' : 'user-role'}>
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="admin-section">
        <h2 className="admin-section-title">Latest Reservations</h2>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                  <td>{r.phone}</td>
                  <td>{r.reservation_date}</td>
                  <td>{r.reservation_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
