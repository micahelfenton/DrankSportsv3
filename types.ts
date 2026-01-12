
export type Screen =
  | 'home'
  | 'setup'
  | 'lobby'
  | 'rules'
  | 'gameplay'
  | 'minigame'
  | 'quiz'
  | 'leaderboard';

export interface Player {
  id: string;
  name: string;
  score: number;
  initial: string;
  isHost?: boolean;
}

export interface Rule {
  id: string;
  title: string;
  penalty: string;
  active: boolean;
}

export interface QuizQuestionData {
  text: string;
  options: string[];
  correctAnswer: number;
  penalty?: string;
}
