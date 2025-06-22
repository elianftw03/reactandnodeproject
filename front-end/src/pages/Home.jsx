import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to BCards</h1>
      <p>Your smart solution for managing and sharing business cards online.</p>

      <div className="home-actions">
        <Link to="/signup" className="home-button">
          Get Started
        </Link>
        <Link to="/cards" className="home-button secondary">
          Browse Cards
        </Link>
      </div>

      <div className="home-features">
        <h2>Why Choose BCards?</h2>
        <ul>
          <li>Create digital business cards in seconds</li>
          <li>Save and favorite others’ cards</li>
          <li>Exclusive tools for business users</li>
          <li>Accessible on any device</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
