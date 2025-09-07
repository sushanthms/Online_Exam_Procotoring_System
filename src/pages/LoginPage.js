import React, { useState } from "react";
import "./LoginPage.css";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("🔄 LoginPage component rendered");

  const handleDirectLogin = () => {
    console.log("🚀 DIRECT LOGIN BUTTON CLICKED!");
    console.log("📧 Email value:", email);
    console.log("🔒 Password value:", password);

    if (
      (email.trim().toLowerCase() === "shreehari94477@gmail.com" && password === "12345") ||
      (email.trim().toLowerCase() === "shreeshailnidagundi655@gmail.com" && password === "Shree@7809") ||
      (email.trim().toLowerCase() === "sushanthms20@gmail.com" && password === "161975") 

    ) {
      console.log("✅ Credentials are valid!");
      console.log("📞 About to call onLogin()");
      onLogin();
      console.log("✅ onLogin() called successfully");
    } else {
      console.log("❌ Invalid credentials");
      alert("Invalid credentials.\nUse: shreehari94477@gmail.com / 12345");
    }
  };

  // Test function to bypass login entirely
  const testNavigation = () => {
    console.log("🧪 TEST NAVIGATION BUTTON CLICKED!");
    console.log("📞 Calling onLogin() directly for testing");
    onLogin();
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Welcome Back</h2>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button 
          type="button"
          onClick={handleDirectLogin}
          style={{
            width: '100%',
            padding: '0.8rem',
            background: '#673ab7',
            color: 'white',
            fontSize: '1rem',
            borderRadius: '8px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
            zIndex: 9999,
            position: 'relative',
            marginBottom: '10px'
          }}
        >
          Login
        </button>

        {/* DEBUG BUTTON - Remove this after testing */}
        <button 
          type="button"
          onClick={testNavigation}
          style={{
            width: '100%',
            padding: '0.8rem',
            background: '#ff5722',
            color: 'white',
            fontSize: '0.9rem',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            zIndex: 9999,
            position: 'relative'
          }}
        >
          🧪 TEST NAVIGATION (Skip Login)
        </button>
        
        <p className="footer-text">AI-Powered Exam Security</p>
      </form>
    </div>
  );
}
