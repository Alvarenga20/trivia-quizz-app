interface Question {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    user_answer: string; 
  }

export const fetchQuizQuestions = async (
    categoryId: string,
    difficulty: string,
    questionAmount: number
  ): Promise<Question[]> => {
    const difficultyParam = difficulty !== "any" ? `&difficulty=${difficulty}` : "";
    const url = `https://opentdb.com/api.php?amount=${questionAmount}${
      categoryId ? `&category=${categoryId}` : ""
    }${difficultyParam}&lang=pt`;
  
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error("Failed to fetch questions. Please try again later.");
    }
  
    const data = await response.json();
  
    if (data.results.length === 0) {
      throw new Error("No questions available for the selected category.");
    }
  
    return data.results;
  };