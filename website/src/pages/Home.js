import { useNavigate } from "react-router-dom";
import '../styles/Home.css';
import main from '../assets/main.jpeg';
import home2 from '../assets/home2.png';
import locationmain from '../assets/locationmain.png';
import ScrollDown from "../components/ScrollDown";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();

  return (
    <div id="hero" className="home">
      <Navbar />
      <section 
        className="hero" 
        style={{ backgroundImage: `url(${main})` }}
      >
        <div className="overlay">
          <h1 className="hero-title">Hànzì Shífǔ</h1>
          <p className="hero-subtitle">
            Hànzì Shífǔ is accepting dinner reservations daily. Head to our reservations 
            page to reserve ahead online or browse our menu.
          </p>

          <div className="hero-buttons">
            <button 
              className="btn-reserve" 
              onClick={() => navigate("/reservations")}
            >
              Reservations
            </button>
          </div>

          <ScrollDown target=".luxury" />
        </div>
      </section>

      <section id="luxury" className="luxury">
        <div className="text">
          <h2>A Celebration of Luxury</h2>
          <p>
            Hànzì Shífǔ’s menu is a modern interpretation of authentic Chinese cuisine,
            using the finest ingredients and expert techniques to create timeless yet 
            innovative dishes.
          </p>
        </div>

        <img src={home2} alt="Luxury dish" />

        
      </section>
      <section id="Philosophy" className="philosophy">
        <div className="text">
          <h2>Elegance.<br />Energy.<br />Innovation.</h2>
          <p>
            Founded in 2013, Hànzì Shífǔ celebrates Chinese cuisine through traditional
            techniques, the finest ingredients, and a contemporary flair.
          </p>

          <a href="/Hanzi-Shifu-Restaurant/locations">Discover our place</a>
          
        </div>

        <img src={locationmain} alt="Restaurant interior" />
       
      </section>

    </div>
  );
}

export default Home;
