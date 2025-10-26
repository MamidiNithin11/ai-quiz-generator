const BASE_URL = 'http://127.0.0.1:8000';

export const generateQuiz = async (url, options) => {
  const params = new URLSearchParams({
    url,
    num_questions: options.numQuestions.toString(),
    difficulty: options.difficulty,
  });

  const response = await fetch(`${BASE_URL}/generate_quiz?${params.toString()}`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'An unknown error occurred.' }));
    throw new Error(errorData.detail || 'Failed to generate quiz.');
  }

  return response.json();
};

export const getHistory = async () => {
  const response = await fetch(`${BASE_URL}/history`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch history.');
  }

  return response.json();
};

export const getQuizById = async (id) => {
    const response = await fetch(`${BASE_URL}/quiz/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch quiz details.');
    }

    const data = await response.json();

  try {
    const parsedQuizData = JSON.parse(data.quiz_data);
        return {
            ...parsedQuizData,
            id: data.id,
            title: data.title,
            url: data.url,
        };
    } catch (e) {
        throw new Error('Failed to parse quiz data.');
    }
};