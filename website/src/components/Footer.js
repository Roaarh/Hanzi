import React from "react";
import "../styles/Footer.css";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <img src={logo} alt="Hànzì Shífǔ logo" className="footer-logo" />
          <p className="footer-tagline">
            A modern celebration of authentic Chinese artistry.
          </p>
        </div>

        <div className="footer-links">
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/gallery">Gallery</a></li>
          </ul>
          <ul>
            <li><a href="/locations">Locations</a></li>
            <li><a href="/reservations">Reservations</a></li>
          </ul>
        </div>

        <div className="footer-info">
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>Beirut, Lebanon</p>
            <p>+961 70 123 456</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-icons">
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-tiktok"></i></a>
        </div>
        <p>© 2025 Hànzì Shífǔ. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
