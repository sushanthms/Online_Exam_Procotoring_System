// src/pages/ExamPage.js
import React, { useState, useEffect, useRef } from "react";
import "./ExamPage.css";

export default function ExamPage() {
  const videoRef = useRef(null);

  // Dummy questions with correct answers
  const questions = [
    { id: 1, text: "What is the capital of France?", correct: "paris" },
    { id: 2, text: "Solve: 12 + 45 = ?", correct: "57" },
    { id: 3, text: "Who wrote 'Hamlet'?", correct: "shakespeare" },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 min

  // Handle text input and save to state
  const handleAnswerChange = (value) => {
    const updated = [...answers];
    updated[currentQuestion] = value;
    setAnswers(updated);
  };

  // Timer countdown & auto-submit
  useEffect(() => {
    if (submitted) return;
    if (timeLeft <= 0) {
      handleSubmitExam();
      return;
    }
    const timerId = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, submitted]);

  // Format mm:ss
  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // Webcam setup
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Camera access denied:", err);
      });
  }, []);

  // Tab switch detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !submitted) {
        alert("Tab switching detected! This will be recorded.");
        // Optional: handleSubmitExam(); // auto-submit on tab switch
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [submitted]);

  // Exam submission & grading
  const handleSubmitExam = () => {
    let newScore = 0;
    questions.forEach((q, i) => {
      if (answers[i].trim().toLowerCase() === q.correct) {
        newScore++;
      }
    });
    setScore(newScore);
    setSubmitted(true);
  };

  const handlePrev = () => setCurrentQuestion((q) => Math.max(0, q - 1));
  const handleNext = () =>
    setCurrentQuestion((q) => Math.min(questions.length - 1, q + 1));

  return (
    <div className="exam-page">
      {/* HEADER */}
      <header className="exam-header">
        <h1>📄 Online Exam</h1>
        <div className="timer">⏳ {formatTime(timeLeft)}</div>
      </header>

      {/* Webcam */}
      <div className="camera-box">
        <video ref={videoRef} autoPlay playsInline width="200" height="150" />
      </div>

      {!submitted ? (
        <>
          {/* Question area */}
          <div className="question-box">
            <h2>
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <p>{questions[currentQuestion].text}</p>
            <textarea
              placeholder="Type your answer here..."
              value={answers[currentQuestion]}
              onChange={(e) => handleAnswerChange(e.target.value)}
            />
          </div>

          {/* Controls */}
          <div className="exam-controls">
            <button onClick={handlePrev} disabled={currentQuestion === 0}>
              ⬅ Prev
            </button>
            <button
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1}
            >
              Next ➡
            </button>
            <button className="submit-btn" onClick={handleSubmitExam}>
              Submit Exam
            </button>
          </div>
        </>
      ) : (
        // Results after submission
        <div className="results-box">
          <h2>Results</h2>
          <p>
            Your Score: {score} / {questions.length}
          </p>
          <ul>
            {questions.map((q, i) => (
              <li key={q.id}>
                <strong>{q.text}</strong> <br />
                Your answer: {answers[i] || <em>No answer</em>} <br />
                {answers[i].trim().toLowerCase() === q.correct ? (
                  <span style={{ color: "green" }}>✅ Correct</span>
                ) : (
                  <span style={{ color: "red" }}>
                    ❌ Wrong (Correct: {q.correct})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
