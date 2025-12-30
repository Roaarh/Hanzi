import React from "react";
import "../styles/location.css";
import Navbar from "../components/Navbar";

import locationmain from "../assets/locationmain.png"; 
import location1 from "../assets/location1.png";
import locations2 from "../assets/locations2.png";
import location3 from "../assets/location3.png";

function Locations() {
  return (
    <div className="location-page">
      <Navbar />
      <section
        className="locations-hero"
        style={{ backgroundImage: `url(${locationmain})` }}
      >
      <div className="locations overlay">
          <h1 className="locations title">OUR LOCATIONS</h1>
        </div>
      </section>
      <div className="locations-container">
        <div className="location-card">
          <img src={location1} alt="Istanbul" />
          <h2>Hanzi Shifū Istanbul</h2>
          <p>
            Now open at the Mandarin Oriental Bosphorus.Our latest restaurant 
            overlooks the Bosphorus, providing 180 degree views of the scenic waterway.
          </p>
        </div>
        <div className="location-card">
          <img src={locations2} alt="London" />
          <h2>Hanzi Shifū London</h2>
          <p>
            Modern Cantonese cuisine, world-class mixology and dramatic design. 
            Located in London’s Mayfair district our second Hanzi Shifū restaurant.
          </p>
        </div>
        <div className="location-card">
          <img src={location3} alt="Dubai" />
          <h2>Hanzi Shifū Dubai</h2>
          <p>
            Recipient of one Michelin star.A rebirth of the iconic Shifū concept
            rediscover Hanzi Shifū Dubai with its Michelin-starred contemporary 
            Chinese cuisine.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Locations;
