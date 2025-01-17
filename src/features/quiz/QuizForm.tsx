import React, { useState } from "react";

interface QuizFormProps {
  onSubmit: (categoryId: string, difficulty: string, questionsAmount: number) => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ onSubmit }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Any Category");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("any");
  const [questionsAmount, setQuestionsAmount] = useState<number>(1);

  const categoriesArr = [
    { name: "Any Category", id: Math.floor(Math.random() * (32 - 9 + 1)) + 9 },
    { name: "General Knowledge", id: 9 },
    { name: "Music", id: 12 },
    { name: "Sports", id: 21 },
    { name: "Animals", id: 27 },
    { name: "Vehicles", id: 28 },
    { name: "Geography", id: 22 },
    { name: "History", id: 23 },
    { name: "Mathematics", id: 19 },
    { name: "Video Games", id: 15 },
    { name: "Film", id: 11 },
    { name: "Anime", id: 31 },
  ];

  const difficultiesArr = ["any", "easy", "medium", "hard"];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCategoryId: string = String(
      categoriesArr.find((cat) => cat.name === selectedCategory)?.id || ""
    );
    onSubmit(selectedCategoryId, selectedDifficulty, questionsAmount);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setQuestionsAmount(0);
    } else {
      const parsedValue = Math.max(0, Math.min(100, Number(value)));
      setQuestionsAmount(parsedValue);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="mb-8 text-black max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
    >
      <div className="flex flex-col space-y-2">
        <label htmlFor="category" className="text-lg font-semibold text-gray-800">
          Select Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border-2 border-gray-300 text-center text-lg p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
        >
          {categoriesArr.map((cat, index) => (
            <option key={index} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="difficulty" className="text-lg font-semibold text-gray-800">
          Select Difficulty:
        </label>
        <select
          id="difficulty"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="border-2 border-gray-300 text-center text-lg p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
        >
          {difficultiesArr.map((difficulty, index) => (
            <option key={index} value={difficulty}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="quantity" className="text-lg font-semibold text-gray-800">
          Number of Questions:
        </label>
        <input
          id="quantity"
          type="number"
          min="0"
          max="100"
          value={questionsAmount === 0 ? "" : questionsAmount}
          onChange={handleAmountChange}
          className="border-2 border-gray-300 text-center text-lg p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
        />
      </div>

      <button
        type="submit"
        className="w-full text-lg md:text-xl bg-yellow-400 text-gray-800 font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 hover:shadow-xl transition-transform transform"
      >
        Start Quiz
      </button>
    </form>
  );
};

export default QuizForm;
