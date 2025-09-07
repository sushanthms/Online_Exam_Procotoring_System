import React from "react";
import "./LandingPage.css"; // we'll make this in Step 2

export default function LandingPage({ onStart }) {
  return (
    <div className="landing-container">
      {/* Top Navigation */}
      <header className="navbar">
        <div className="logo">AI Proctor</div>
        <nav>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#login" onClick={onStart}>Login</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Secure Online Exams with AI</h1>
        <p>
          Maintain academic integrity with our advanced AI-powered proctoring system.
        </p>
        <button onClick={onStart}>Get Started</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} AI Proctor — All Rights Reserved</p>
      </footer>
    </div>
  );
}
