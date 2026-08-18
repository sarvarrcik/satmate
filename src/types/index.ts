export type SubjectSection = 'Algebra' | 'Advanced Math' | 'Problem Solving' | 'Geometry & Trigonometry';

export type QuestionType = 'multiple_choice' | 'student_produced';

export type MistakeCategory = 
  | 'conceptual'
  | 'calculation'
  | 'sign_error'
  | 'formula_error'
  | 'misread'
  | 'time_pressure'
  | 'guessing';

export interface QuestionChoice {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  id: string;
  section: SubjectSection;
  topic: string;
  subtopic?: string;
  questionNumber: number;
  examDate?: string;
  type: QuestionType;
  text: string;
  diagramSvg?: string;
  choices: QuestionChoice[];
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D' or numeric string
  explanation: string;
  hints: [string, string, string]; // [Conceptual, Strategic, Almost There]
  difficulty?: 'easy' | 'medium' | 'hard';
  sourcePage?: number;
  similarQuestionIds?: string[];
}

export interface FormulaItem {
  id: string;
  section: SubjectSection;
  topic: string;
  name: string;
  latex: string;
  description: string;
  variables?: { name: string; desc: string }[];
  category: string;
}

export interface UserProfile {
  name: string;
  currentScore: number; // e.g. 610
  targetScore: number;  // e.g. 750
  examDate: string;     // e.g. '2026-08-22'
  studyDays: string[];  // ['Mon', 'Tue', 'Thu', 'Sat']
  dailyMinutes: Record<string, number>; // { 'Tue': 45, 'Thu': 45, 'Sat': 90 }
  experience: string;
  confidence: number;   // 1 to 5
  selfReportedWeakAreas: string[];
  completedOnboarding: boolean;
  completedDiagnostic: boolean;
  diagnosticScores?: Record<SubjectSection, number>;
  createdAt: string;
  studyTimeMinutes: number;
  totalQuestionsPracticed: number;
}

export interface QuestionAttempt {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpentSeconds: number;
  timestamp: number;
  mistakeCategory?: MistakeCategory;
  sessionId?: string;
}

export interface DailyTask {
  id: string;
  number: number;
  title: string;
  type: 'review' | 'learn' | 'practice' | 'quick_review';
  minutes: number;
  description: string;
  topic?: string;
  questionCount?: number;
  completed: boolean;
  questionIds?: string[];
}

export interface DailyPlan {
  date: string; // YYYY-MM-DD
  dayName: string; // 'Tuesday, Aug 18'
  totalMinutes: number;
  tasks: DailyTask[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: number;
  questionContextId?: string;
  hintLevel?: number;
}
