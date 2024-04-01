
import React from 'react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="app">
      <header className="header">
        <h1>StudySmart</h1>
        <p>Empowering Students through Smart Learning for a Brighter Future</p>
      </header>

      <div className="buttons">
        <button className="signup">Get Started</button>
        <button className="login">Log In</button>
      </div>

      <section className="main">
        <div className="exciting-subjects">
          <h2>Explore Exciting Subjects</h2>
          <p>Discover engaging lessons with an easy-to-use interface. Enjoy reliable content for a seamless learning experience. Access a variety of subjects to enhance your knowledge. Study at your own pace with convenient learning paths.</p>
        </div>

        <div className="path-to-success">
          <h2>Your Path to Success</h2>
          <p>Embark on a journey of academic excellence with StudySmart. Tailored for students in various fields, StudySmart is your key to mastering challenging concepts effortlessly.</p>
        </div>
      </section>

      <section className="why-choose">
        <h2>Why Choose StudySmart?</h2>
        <div className="feature">
          <h3>Effective Learning Techniques</h3>
          <p>Enhance your understanding through proven study methods.</p>
        </div>
        <div className="feature">
          <h3>Personalized Learning Paths</h3>
          <p>Adapt your study routine to match your unique learning style.</p>
        </div>
        <div className="feature">
          <h3>Track Your Progress</h3>
          <p>Stay motivated by monitoring your academic growth with detailed analytics.</p>
        </div>
      </section>

      <section className="vision">
        <h2>Our Vision</h2>
        <p>StudySmart goes beyond traditional learning. It's not just an app; it's a movement towards a future where education is seamlessly integrated with effective study techniques.</p>
      </section>

      <section className="join-revolution">
        <h2>Join the Academic Revolution</h2>
        <p>Transform your learning experience with StudySmart. Our mission is to make your academic journey not only successful but also enjoyable and memorable.</p>
      </section>
    </div>
  );
};

export default Home;

