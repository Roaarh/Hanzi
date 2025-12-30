// src/pages/Reservations.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Reservation.css";
import axios from "axios";

function Reservations() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) {
      navigate("/login");
      return;
    }
    setUser(savedUser);
  }, [navigate]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: ""
  });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || user.email.split("@")[0]  // Use real name or email prefix
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.clear();  // Remove token + user data
    navigate("/");         // Go to home page
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      console.log('📤 Sending reservation:', form);
      
      const response = await axios.post(
        "http://localhost:5001/api/reservations",
        {
          name: form.name,
          phone: form.phone,
          reservation_date: form.date,
          reservation_time: form.time,
          guests: parseInt(form.guests),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log('✅ Response:', response.data);
      alert(`✅ Reservation confirmed!\nID: ${response.data.reservationId}`);
      
      // Clear form (keep name)
      setForm({ 
        name: form.name, 
        phone: "", 
        date: "", 
        time: "", 
        guests: "" 
      });
    } catch (err) {
      console.error('❌ Error:', err.response?.data || err.message);
      alert("❌ " + (err.response?.data?.message || "Reservation failed"));
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="reservation-page">
      <Navbar />
      <div className="reservation-overlay">
        <div className="reservation-box">
          <h2>Make a Reservation</h2>
          <p>Welcome, {user.name || user.email}</p>

          <input 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            placeholder="Full Name"
            disabled 
            style={{background: '#f0f0f0'}}
          />
          
          <input 
            name="phone" 
            value={form.phone} 
            onChange={handleChange} 
            placeholder="Phone Number"
            type="tel"
          />
          
          <input 
            type="date" 
            name="date" 
            value={form.date} 
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
          />
          
          <input 
            type="time" 
            name="time" 
            value={form.time} 
            onChange={handleChange}
          />
          
          <input
            type="number"
            name="guests"
            value={form.guests}
            placeholder="Number of guests"
            onChange={handleChange}
            min="1"
            max="10"
          />

         
          {/* SUBMIT BUTTON */}
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Confirm Reservation"}
          </button>
           {/* 🆕 LOGOUT BUTTON */}
          <button 
            onClick={handleLogout}
            style={{
             width: "50%",
             padding: "0.5rem",
             background: "#af1e11ff",
             borderradius: "10px",
             margintop: "2rem",
             cursor: "pointer",
            fontweight: "bold",
            border: "none",
            color: "#000000ff",
            }}
          >
             Logout 
          </button>

        </div>
      </div>
    </div>
  );
}

export default Reservations;
