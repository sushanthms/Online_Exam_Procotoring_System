import React, { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ExamPage from "./pages/ExamPage";

export default function App() {
  const [page, setPage] = useState("landing");
  const [forceRender, setForceRender] = useState(0);

  console.log("🏠 App component rendered");
  console.log("📄 Current page:", page);
  console.log("🔄 Force render counter:", forceRender);

  // Force re-render whenever page changes
  useEffect(() => {
    console.log("📄 Page changed to:", page);
    setForceRender(prev => prev + 1);
  }, [page]);

  const handleLoginSuccess = () => {
    console.log("🎉 handleLoginSuccess called in App.js");
    console.log("📄 Current page before setPage:", page);
    setPage("exam");
    console.log("📄 setPage('exam') called");
    
    // Force immediate re-render
    setTimeout(() => {
      setForceRender(prev => prev + 1);
    }, 0);
  };

  const handleStartFromLanding = () => {
    console.log("🚀 handleStartFromLanding called in App.js");
    setPage("login");
    console.log("📄 setPage('login') called");
  };

  // Add debugging for rendering
  console.log("🎯 About to render based on page:", page);

  if (page === "landing") {
    console.log("🏠 Rendering LandingPage");
    return (
      <div key="landing">
        <LandingPage onStart={handleStartFromLanding} />
      </div>
    );
  }

  if (page === "login") {
    console.log("🔐 Rendering LoginPage");
    return (
      <div key="login">
        <LoginPage onLogin={handleLoginSuccess} />
      </div>
    );
  }

  if (page === "exam") {
    console.log("📝 Rendering ExamPage");
    return (
      <div key="exam">
        <ExamPage />
        <div style={{ position: 'absolute', top: '10px', right: '10px', color: 'white', background: 'green', padding: '5px' }}>
          SUCCESS: On Exam Page!
        </div>
      </div>
    );
  }

  console.log("❌ Unknown page:", page);
  return <div>Error: Unknown page: {page}</div>;
}