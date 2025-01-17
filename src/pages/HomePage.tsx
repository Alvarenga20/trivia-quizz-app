import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import FloatingEl from "../components/FloatingElement/FloatingEl";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="home-page min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white flex flex-col">
      <Navbar />

      <main className="flex flex-col items-center justify-center flex-grow p-6 text-center space-y-8 relative z-20">
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
          Welcome to <span className="text-yellow-300">Trivia Quiz</span>
        </h1>
        <p className="text-xl sm:text-2xl font-bold max-w-2xl">
          Challenge your knowledge with fun and engaging trivia questions. Are
          you ready to test your skills and learn something new?
        </p>
        <button
          className="text-2xl sm:text-3xl bg-yellow-400 text-gray-800 font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 hover:shadow-xl transition-transform transform hover:scale-105"
          onClick={handleStartQuiz}
        >
          Start Quiz
        </button>
      </main>
      <Footer />

      <FloatingEl />
    </div>
  );
};

export default HomePage;
