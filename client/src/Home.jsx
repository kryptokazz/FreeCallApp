import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
 return (
<div className="app">
      <header className="header">
        <h1>FreeCallApp</h1>
        <p>Where Cutting-edge Technology Meets Cognitive Science for a Smarter Tomorrow</p>
      </header>

      <div className="buttons">
        <button className="signup">Sign Up</button>
        <button className="login">Login</button>
      </div>

      <section className="main">
        <div className="left">
          <h2>Tech-Powered Learning</h2>
          <ul>
            <li>React: Intuitive interface for seamless interaction</li>
            <li>Typescript: Enhanced code reliability for a flawless experience</li>
            <li>Golang: Robust backend services for efficient data handling</li>
            <li>PostgreSQL: Secure, reliable database management</li>
          </ul>
        </div>

        <div className="right">
          <h2>Introduction</h2>
          <p>
            Embark on a revolutionary learning journey with FreeCallApp, inspired by the groundbreaking memory research of Professor Robert Allen Bjork. Tailored for ambitious learners in languages, medicine, law, and more, FreeCallApp is your gateway to mastering complex concepts effortlessly.
          </p>
        </div>
      </section>

      <section className="why-choose">
        <h2>Why Choose FreeCallApp?</h2>
        <div className="feature">
          <h3>Free Recall Method</h3>
          <p>Utilize cognitive science for profound learning. Embrace the power of free recall, validated by Professor Bjork's research, to solidify your knowledge beyond simple recognition.</p>
        </div>
        <div className="feature">
          <h3>Customized Learning Paths</h3>
          <p>Tailored for you, adapting to your unique learning style.</p>
        </div>
        <div className="feature">
          <h3>Insightful Progress Tracking</h3>
          <p>Monitor your growth with detailed analytics.</p>
        </div>
      </section>

      <section className="vision">
        <h2>Our Vision</h2>
        <p>FreeCallApp transcends traditional learning methods. It's not just an app; it's a movement towards a future where learning is seamlessly integrated with the science of memory.</p>
      </section>

      <section className="join-revolution">
        <h2>Join the Learning Revolution</h2>
        <p>Transform the way you learn with FreeCallApp. Our mission is to make your educational journey not only successful but also enjoyable and memorable.</p>
      </section>
    </div>
  );
};

export default Home;

