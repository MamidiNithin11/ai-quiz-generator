
export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

export interface KeyEntities {
  people: string[];
  organizations: string[];
  locations: string[];
}

export interface QuizData {
  id: number;
  url: string;
  title: string;
  summary: string;
  key_entities: KeyEntities;
  sections: string[];
  quiz: QuizQuestion[];
  related_topics: string[];
}

export interface HistoryItem {
  id: number;
  title: string;
  url: string;
  date_generated: string;
}

export interface QuizDetailResponse {
    id: number;
    title: string;
    url: string;
    quiz_data: string; 
}
