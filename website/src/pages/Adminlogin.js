import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";


function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

   
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setError("");
    navigate("/admin/dashboard");
  };

  return (
    <div className="auth-page">
     
      <div className="auth-overlay">
        <div className="auth-box">
          <h2>Admin Login</h2>
          {error && <p className="error">{error}</p>}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
