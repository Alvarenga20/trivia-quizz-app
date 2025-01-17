import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import he from "he";
import Footer from "../components/Footer/Footer";
import FloatingEl from "../components/FloatingElement/FloatingEl";

interface Question {
  question: string;
  correct_answer: string;
  user_answer: string;
}

interface Result {
  score: number;
  questions: Question[];
  date: string;
}

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [resultsHistory, setResultsHistory] = useState<Result[]>([]);

  useEffect(() => {
    //retrieve the history of quiz results from local Storage
    const savedResults = localStorage.getItem("quizResultsHistory");
    if (savedResults) {
      setResultsHistory(JSON.parse(savedResults));
    }
  }, []);

  const totalQuestions =
    resultsHistory.length > 0 ? resultsHistory[0].questions.length : 0;
  const latestResult = resultsHistory[0];
  const percentage = totalQuestions
    ? ((latestResult?.score / totalQuestions) * 100).toFixed(2)
    : "0";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white flex flex-col">
      <Navbar />

      <main className="flex flex-col items-center justify-center flex-grow pt-20 px-6 text-center space-y-4 relative z-20">
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
          Quiz Results
        </h1>
        {resultsHistory.length > 0 ? (
          <>
            <p className="text-xl sm:text-2xl font-light max-w-2xl">
              You scored{" "}
              <span className="text-yellow-300 font-bold">
                {latestResult.score}
              </span>{" "}
              out of{" "}
              <span className="text-yellow-300 font-bold">
                {totalQuestions}
              </span>
              .
            </p>
            <p className="text-xl sm:text-2xl font-light max-w-2xl">
              That’s{" "}
              <span className="text-green-500 font-bold">{percentage}%</span>!
            </p>
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-2xl w-full">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                Review Your Answers
              </h2>
              <div className="space-y-6">
                {latestResult.questions.map((question, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg transition-all duration-300 ${
                      question.user_answer === question.correct_answer
                        ? "bg-green-100 border-green-400"
                        : "bg-red-100 border-red-400"
                    }`}
                  >
                    <h3
                      className="text-lg font-medium text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: he.decode(question.question),
                      }}
                    ></h3>
                    <p className="mt-2 text-gray-600">
                      <span className="font-bold">Your Answer:</span>{" "}
                      {question.user_answer
                        ? he.decode(question.user_answer)
                        : "No Answer"}
                    </p>
                    <p className="mt-1 text-gray-600">
                      <span className="font-bold">Correct Answer:</span>{" "}
                      {he.decode(question.correct_answer)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className="text-lg sm:text-xl font-light max-w-2xl">
            No quiz results found. Please start a quiz first.
          </p>
        )}

        <div className="mt-6 p-4 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <button
            onClick={() => navigate("/quiz")}
            className="text-2xl sm:text-3xl bg-yellow-400 text-gray-800 font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 hover:shadow-xl transition-transform transform hover:scale-105"
          >
            Restart Quiz
          </button>
          <button
            onClick={() => navigate("/")}
            className="text-2xl sm:text-3xl bg-gray-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-800 hover:shadow-xl transition-transform transform hover:scale-105"
          >
            Go to Home
          </button>
        </div>
      </main>

      <Footer />
      <FloatingEl />
    </div>
  );
};

export default ResultsPage;
