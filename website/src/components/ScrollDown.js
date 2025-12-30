import React from "react";
import "../styles/ScrollDown.css";

function ScrollDown({ target, symbol = "₰", color = "#d4af37" }) {
  const handleScroll = () => {
    const section = document.querySelector(target);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="scroll-down"
      onClick={handleScroll}
      style={{ color: color }}
      role="button"
      aria-label="Scroll down"
    >
      {symbol}
    </div>
  );
}

export default ScrollDown;

