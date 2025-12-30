import React from "react";
import "../styles/Menu.css";
import Navbar from "../components/Navbar";

function Menu() {
  return (
    <div className="menu-page">
      <Navbar />

      <div className="menu-container">
       <aside className="menu-sidebar">
          <ul>
            <li><a href="#alacarte">A La Carte Menu</a></li>
            <li><a href="#signature">Signature Menus</a></li>
            <li><a href="#dessert">Dessert Menus</a></li>
          </ul>

          <div className="menu-allergies">
            <p>
              <strong>Guests with allergies</strong><br />
              and intolerances should inform a member of the team before placing
              an order for food or beverages.
            </p>
          </div>
        </aside>

      
        <div className="menu-sections">
         <div id="alacarte" className="menu-section">
            <h2>A La Carte Menu</h2>
            <div className="menu-item">
              <span>Snail roll</span>
              <span className="price">24</span>
            </div>
            <div className="menu-item">
              <span>Stir-fried pepper squid</span>
              <span className="price">26</span>
            </div>
            <div className="menu-item">
              <span>Seafood fried rice with XO sauce</span>
              <span className="price">39</span>
            </div>
          </div>

          <hr />
          <div id="signature" className="menu-section">
            <h2>Signature Menus</h2>
            <h3>Chrysanthemum</h3>
            <p>
              580 per person. Available for parties of four or more. A noble
              character; a symbol of longevity, good health and vitality.
            </p>

            <h4>Appetizer</h4>
            <p>
              Vegetarian dim sum platter with mango and plum dressing
            </p>

            <h4>Main</h4>
            <p>
              Stir-fry black pepper vegetarian chicken served with mushrooms and bean curd
            </p>

            <h4>Dessert</h4>
            <p>Chef’s choice of dessert</p>
          </div>

          <hr />
          <div id="dessert" className="menu-section">
            <h2>Dessert Menus</h2>
            <div className="menu-item">
              <span>Miso Cream with Yuzu Dream</span>
              <span className="price">26</span>
            </div>
            <div className="menu-item">
              <span>
                Mango Custard with Kalamansi, Lychee, Grapefruit Sorbet
              </span>
              <span className="price">36</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
