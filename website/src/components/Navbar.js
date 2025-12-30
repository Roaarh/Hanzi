import { useEffect, useState } from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="Hànzì Shífǔ logo" />
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <ul className={`navbar-links ${mobileOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={() => setMobileOpen(false)}>Home</Link></li>
          <li><Link to="/menu" onClick={() => setMobileOpen(false)}>Menu</Link></li>
          <li><Link to="/gallery" onClick={() => setMobileOpen(false)}>Gallery</Link></li>
          <li><Link to="/locations" onClick={() => setMobileOpen(false)}>Locations</Link></li>
          <li><Link to="/reservations" onClick={() => setMobileOpen(false)}>Reservations</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
