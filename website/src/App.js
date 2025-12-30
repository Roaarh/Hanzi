import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Gallery from "./pages/Gallery";
import Locations from "./pages/Locations";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reservations from "./pages/Reservations";
import AdminLayout from "./pages/AdminLayout";  // 👈 YOUR LAYOUT
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/Adminusers";
import AdminReservations from "./pages/AdminReservations";
import MainLayout from "./components/MainLayout";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Loading...
      </div>
    );
  }

  return (
    <Router basename="/Hanzi-Shifu-Restaurant">
      <Routes>
        {/* PUBLIC PAGES WITH FOOTER */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/reservations" element={<Reservations />} />
        </Route>

        {/* AUTH PAGES (No footer) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ADMIN PANEL (Nested - NO footer) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} /> {/* /admin → dashboard */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="reservations" element={<AdminReservations />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
