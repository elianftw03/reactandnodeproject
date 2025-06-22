import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-header">About Us</h1>
        <p className="about-description">
          Welcome to our Business Cards App! We help you create and manage your
          business cards with ease. Our platform offers a user-friendly
          interface to design, customize, and share your business cards
          effortlessly.
        </p>
        <p className="about-description">
          Whether you're a freelancer, entrepreneur, or part of a large
          organization, our app is designed to meet your needs. We believe in
          the power of networking and making lasting connections—and our app is
          here to support you in that journey.
        </p>
        <p className="about-description">
          Thank you for choosing our Business Cards App. We look forward to
          helping you make a great impression!
        </p>

        <h2 className="about-subheader">Our Mission</h2>
        <p className="about-description">
          Our mission is to simplify the process of creating and managing
          business cards, making it accessible to everyone. We strive to provide
          a seamless experience that empowers users to showcase their
          professional identity.
        </p>

        <h2 className="about-subheader">Contact Us</h2>
        <p className="about-description">
          Have questions or feedback? Feel free to reach out to us at{" "}
          <a href="mailto:elianftw03@gmail.com" className="about-link">
            elianftw03@gmail.com
          </a>
          . We’d love to hear from you!
        </p>
      </div>

      <div className="about-image-container">
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
          alt="Teamwork and Connection"
          className="about-image"
        />
      </div>
    </div>
  );
}

export default About;
