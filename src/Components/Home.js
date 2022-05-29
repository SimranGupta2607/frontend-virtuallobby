import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import img from "../assets/images/Group 52.png";
import reviewcard from "../assets/images/Group 57.png"
import Footer from './Footer/Footer.js'

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-parent">
      <nav className="d-flex justify-content-between align-items-centre">
        <h6>
          Virtual Lobby
          <span style={{ color: "#73A9DF", fontSize: "34px" }}>.</span>
        </h6>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Our Services</a>
          <a href="#reviews">Reviews</a>
          <button id='nav-btn' onClick={() => navigate("/register")}>Register</button>
        </div>
      </nav>
      <div className="lower-landing">
      <a href='/' name='home' style={{textDecoration:'none',color:'white'}}>
      <h1>
          A platform for <br />
          <span className="diff-font">hassle free</span> Appointments
        </h1>
      </a>
        <p>
          Schedule your appointments at home
          <br />
          before heading to them. Reduce the rush at stores,
          <br />
          salons and clinics in this pandemic times.
        </p>
        <button className='custom-btn' onClick={() => navigate("/register")}>Get Started</button>
        <img src={img} alt="" />
      </div>
      <div className="our-services">
        <a href='/' name='services' style={{textDecoration:'none',color:'white'}}><h2>Our Services</h2></a>
        <div id="service-cards">
          <div className="service-card">
            <h4>Booking Hassle Free</h4>
            <p>
              A platform where you can book your seat for any stores, clinics,
              salons etc. without any hassle
            </p>
          </div>
          <div className="service-card">
            <h4>Safety first</h4>
            <p>
              We ensure your safety by providing limited slots for a day to
              avoid crowd in public places
            </p>
          </div>
          <div className="service-card">
            <h4>Find nearby places</h4>
            <p>
              With our services you will never be unaware of new openings in
              your locality.
            </p>
          </div>
        </div>
      </div>
      <div className="our-services">
      <a href='/' name='reviews' style={{textDecoration:'none',color:'white'}}><h2>What Our Customers Say</h2></a>
      <div id="review-cards">
        <div className="review-card">
          <img src={reviewcard} alt="" />
          <div className="overlay-reviewcard">
            <div className="profile"></div>
            <h6>Love Quinn</h6>
            <div className="testimonial">
              I really liked the service of this app. Especially in this pandemic, it is quite something of a great use. Thanks Virtual Lobby for the service.
            </div>
          </div>
        </div>
        <div className="review-card">
          <img src={reviewcard} alt="" />
          <div className="overlay-reviewcard">
          <div className="profile"></div>
          <h6>Joe Goldberg</h6>
          <div className="testimonial">
            I really liked the service of this app. Especially in this pandemic, it is quite something of a great use. Thanks Virtual Lobby for the service.
          </div>
          </div>
        </div>
        <div className="review-card">
          <img src={reviewcard} alt="" />
          <div className="overlay-reviewcard">
          <div className="profile"></div>
          <h6>Natalie Thomson</h6>
          <div className="testimonial">
            I really liked the service of this app. Especially in this pandemic, it is quite something of a great use. Thanks Virtual Lobby for the service.
          </div>
          </div>
        </div>
      </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
