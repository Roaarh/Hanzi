// src/pages/AdminReservations.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Admin-panel.css";

export default function AdminReservations() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5001/api/admin/reservations", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReservations(res.data.reservations);
        setLoading(false);
      } catch (err) {
        navigate("/login");
      }
    };
    fetchReservations();
  }, [navigate]);

  const deleteReservation = async (id) => {
    if (!window.confirm("Cancel this reservation?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/admin/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservations(reservations.filter(r => r.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) return <div className="admin-section"><h2 className="admin-section-title">Loading...</h2></div>;

  return (
    <section className="admin-section">
      <h2 className="admin-section-title">Reservations Management</h2>
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Actions</th>
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
                <td>{r.guests}</td>
                <td>
                  <button 
                    onClick={() => deleteReservation(r.id)} 
                    className="admin-small-btn danger"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
