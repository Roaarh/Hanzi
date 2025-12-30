// src/pages/Gallery.js
import React from "react";

import "../styles/Gallery.css";
import GalleryNavbar from "../components/GalleryNavbar";

import maingallery from "../assets/maingallery.jpeg";
import gallery2 from "../assets/gallery2.jpeg";
import gallery3 from "../assets/gallery3.jpeg";
import gallery4 from "../assets/gallery4.png";
import gallery5 from "../assets/gallery5.png";
import gallery6 from "../assets/gallery6.png";
import gallery7 from "../assets/gallery7.png";
import gallery8 from "../assets/gallery8.png";
import gallery9 from "../assets/gallery9.png";
import gallery10 from "../assets/gallery10.png";
import gallery11 from "../assets/gallery11.png";
import gallery12 from "../assets/gallery12.png";
import gallery13 from "../assets/gallery13.png"; 
function Gallery() {
  const images = [
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
    gallery7,
    gallery8,
    gallery9,
    gallery10,
    gallery11,
    gallery12,
    gallery13,
  ];

  
  const completeImages = [
    ...images,
    ...Array(12 - images.length).fill(gallery13),
  ];

  return (
    <div className="gallery-page">
      <GalleryNavbar />
      <section
        className="gallery-hero"
        style={{ backgroundImage: `url(${maingallery})` }}
      >
        <div className="gallery-overlay">
          <h1 className="gallery-title">Gallery</h1>
        </div>
      </section>
      <div className="fixed-gallery">
        {completeImages.map((img, index) => (
          <div key={index} className="gallery-cell">
            <img src={img} alt={`gallery-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
