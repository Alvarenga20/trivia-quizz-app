import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuizQuestions } from "../features/quiz/fetchQuizQuestions";
import QuizForm from "../features/quiz/QuizForm";
import Navbar from "../components/Navbar/Navbar";
import he from "he";
import Footer from "../components/Footer/Footer";
import FloatingEl from "../components/FloatingElement/FloatingEl";

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  user_answer: string;
}

const QuizPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const fetchQuestions = async (
    categoryId: string,
    difficulty: string,
    questionAmount: number
  ) => {
    try {
      const questions = await fetchQuizQuestions(
        categoryId,
        difficulty,
        questionAmount
      );
      setQuestions(questions);
      setCurrentIndex(0);
      setScore(0);
      setSelectedOption("");
      setShowAnswer(false);
      setErrorMessage("");
      setApiError("");
    } catch (error: unknown) {
      console.error("Error fetching questions", error);
      if (error instanceof Error)
        setApiError(
          error.message || "An error occurred while fetching questions."
        );
    }
  };

  const handleSubmitBtn = () => {
    if (!selectedOption) {
      setErrorMessage("You need to select an option");
    } else {
      setShowAnswer(true);
      setErrorMessage("");
    }
  };

  const handleNextQuestion = () => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[currentIndex] = {
        ...updatedQuestions[currentIndex],
        user_answer: selectedOption,
      };
      return updatedQuestions;
    });

    if (selectedOption === questions[currentIndex].correct_answer) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex < questions.length - 1) {
      setShowAnswer(false);
      setSelectedOption("");
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    const updatedQuestions = questions.map((quest, index) =>
      index === currentIndex ? { ...quest, user_answer: selectedOption } : quest
    );

    const finalScore = updatedQuestions.filter(
      (quest) => quest.user_answer === quest.correct_answer
    ).length;

    //retrieve previous results from localStorage
    const previousResults = JSON.parse(
      localStorage.getItem("quizResultsHistory") || "[]"
    );

    const newResult = {
      score: finalScore,
      questions: updatedQuestions,
      date: new Date().toISOString(),
    };

    const updatedResults = [newResult, ...previousResults].slice(0, 10);

    // store the updated result history in localStorage
    localStorage.setItem("quizResultsHistory", JSON.stringify(updatedResults));

    navigate("/results", {
      state: {
        score: finalScore,
        questions: updatedQuestions,
      },
    });
  };

  const currentQuestion = questions[currentIndex];
  const options =
    currentQuestion &&
    [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ].sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white flex flex-col">
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-grow p-6 relative z-20">
        {questions.length === 0 ? (
          <div className="text-center bg-white px-6 py-4 rounded-lg shadow-md">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-700 mb-8 mt-4">
              Welcome to the{" "}
              <span className="text-yellow-400 font-extrabold">Quiz!</span>
            </h1>
            {apiError && <div className="text-red-500 mb-4">{apiError}</div>}
            <QuizForm
              onSubmit={(categoryId, difficulty, questionAmount) =>
                fetchQuestions(categoryId, difficulty, questionAmount)
              }
            />
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              Quiz Time!
            </h1>
            {currentQuestion && (
              <>
                <h2
                  className="text-lg font-medium text-gray-700 mb-6 text-center"
                  dangerouslySetInnerHTML={{
                    __html: he.decode(currentQuestion.question),
                  }}
                ></h2>
                <div className="mb-4 space-y-3">
                  {options.map((option, index) => (
                    <button
                      key={index}
                      // doing style here cause tailwind is not working as expected in this case
                      style={{
                        backgroundColor: !showAnswer
                          ? option === selectedOption
                            ? '#2563EB' // equivalent to Tailwind's bg-blue-600
                            : '' 
                          : ""
                      }}
                      className={`w-full px-4 py-2 text-left text-black border rounded-lg ${
                        !showAnswer
                          ? option === selectedOption
                            ? "text-white hover:none"
                            : "hover:bg-blue-100"
                          : ""
                      } ${
                        showAnswer
                          ? option === currentQuestion.correct_answer
                            ? "bg-green-500 text-white"
                            : option === selectedOption
                            ? "bg-red-500 text-white"
                            : "bg-gray-200 hover:bg-blue-100"
                          : "bg-gray-100"
                      } transition-all duration-300`}
                      onClick={() => setSelectedOption(option)}
                      disabled={showAnswer}
                    >
                      {he.decode(option)}
                    </button>
                  ))}
                </div>
              </>
            )}
            {errorMessage && (
              <div className="text-red-500 text-center">{errorMessage}</div>
            )}
            {showAnswer ? (
              <button
                onClick={handleNextQuestion}
                className="w-full mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all duration-300"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleSubmitBtn}
                className="w-full mt-4 px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all duration-300"
              >
                Submit Answer
              </button>
            )}
            <div className="mt-6 text-center">
              <h2 className="text-xl font-bold text-gray-700">
                Current Score: <span className="text-blue-600">{score}</span>
              </h2>
            </div>
          </div>
        )}
      </div>
      <Footer />

      <FloatingEl />
    </div>
  );
};

export default QuizPage;
