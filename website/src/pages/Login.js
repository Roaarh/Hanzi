// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";
import Navbar from "../components/Navbar";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:5001/api/auth/login", {
      email,
      password,
    });

    const { token, user, message } = res.data;

    //save user data
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setError("");
    console.log("✅ Login success:", message);

 
    if (user.role === "admin") {
      console.log("👑 Admin detected → /admin/dashboard");
      navigate("/admin/dashboard");
    } else {
      console.log("👤 User detected → /reservations");
      navigate("/reservations");
    }
  


    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-overlay">
        <div className="auth-box">
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
          </form>

          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
