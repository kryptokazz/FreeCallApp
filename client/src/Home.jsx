// Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <div className="auth-buttons">
          <Link to="/user-registration" className="cta-button">Sign Up</Link>
          <Link to="/user-login" className="cta-button">Login</Link>
        </div>
        <h1>FreeLearnHub: Elevate Your Learning Experience!</h1>
        <p>Tech-Infused Learning</p>
      </header>

      <section className="content">
        <section className="tech-list">
          <h2>Technologies We Use</h2>
          <ul>
            <li>React: Experience a seamless and intuitive interface.</li>
            <li>Typescript: Enhance code reliability for a flawless learning journey.</li>
            <li>Golang: Utilize robust backend services for efficient data management.</li>
            <li>PostgreSQL: Ensure secure and reliable database operations.</li>
          </ul>
        </section>

        <section className="welcome-section">
          <h2>Welcome to FreeLearnHub!</h2>
          <p>
            Embark on a transformative learning journey with FreeLearnHub, inspired by Professor Robert Allen Bjork's
            groundbreaking memory research. Tailored for ambitious learners in various fields, FreeLearnHub is designed
            to help you master complex concepts effortlessly.
          </p>
        </section>

        <section className="why-choose-section">
          <h2>Why Choose FreeLearnHub?</h2>
          <ul>
            <li>
              <strong>Free Recall Method:</strong> Harness cognitive science for deeper learning. Embrace free recall,
              validated by Professor Bjork's research, to solidify your knowledge beyond mere recognition.
            </li>
            <li>
              <strong>Customized Learning Paths:</strong> Tailored to your unique learning style.
            </li>
            <li>
              <strong>Insightful Progress Tracking:</strong> Monitor your growth with detailed analytics.
            </li>
          </ul>
        </section>

        <section className="vision-section">
          <h2>Our Vision</h2>
          <p>
            FreeLearnHub transcends traditional learning methods. It's not just an app; it's a movement towards a future
            where learning is deeply integrated with the science of memory.
          </p>
        </section>

        <section className="join-section">
          <h2>Join the Learning Revolution</h2>
          <p>
            With FreeLearnHub, transform the way you learn. Our mission is to make your educational journey not just
            successful, but also enjoyable and memorable.
          </p>
        </section>
      </section>

      <footer className="footer">
        <p>FreeLearnHub: Where Advanced Technology Meets Cognitive Science for a Smarter Tomorrow!</p>
      </footer>
    </div>
  );
};

export default Home;

