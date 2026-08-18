import { UserProfile, QuestionAttempt, DailyPlan, MistakeCategory } from '../types';
import { MATHBOOK_QUESTIONS } from '../data/questions';

const STORAGE_KEYS = {
  USER_PROFILE: 'satmate_user_profile',
  ATTEMPTS: 'satmate_question_attempts',
  BOOKMARKS: 'satmate_bookmarks',
  DAILY_PLAN: 'satmate_daily_plan',
  THEME: 'satmate_theme',
};

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Alex Johnson',
  currentScore: 610,
  targetScore: 750,
  examDate: '2026-08-22',
  studyDays: ['Monday', 'Tuesday', 'Thursday', 'Saturday'],
  dailyMinutes: {
    'Monday': 45,
    'Tuesday': 45,
    'Thursday': 45,
    'Saturday': 90
  },
  experience: 'Practice tests',
  confidence: 4,
  selfReportedWeakAreas: ['Geometry & Trigonometry', 'Quadratics', 'Functions'],
  completedOnboarding: true,
  completedDiagnostic: true,
  diagnosticScores: {
    'Algebra': 78,
    'Advanced Math': 65,
    'Problem Solving': 70,
    'Geometry & Trigonometry': 60
  },
  createdAt: new Date().toISOString(),
  studyTimeMinutes: 200,
  totalQuestionsPracticed: 156,
};

export const DEFAULT_DAILY_PLAN: DailyPlan = {
  date: '2026-08-18',
  dayName: 'Tuesday, Aug 18',
  totalMinutes: 45,
  tasks: [
    {
      id: 'task-1',
      number: 1,
      title: 'Review',
      type: 'review',
      minutes: 10,
      description: 'Review 4 questions you missed',
      completed: true,
      questionIds: ['expr-9', 'lineq-4', 'quad-1']
    },
    {
      id: 'task-2',
      number: 2,
      title: 'Learn',
      type: 'learn',
      minutes: 10,
      description: 'Quadratics: Number of solutions',
      topic: 'Quadratics',
      completed: true,
      questionIds: ['quad-0']
    },
    {
      id: 'task-3',
      number: 3,
      title: 'Practice',
      type: 'practice',
      minutes: 20,
      description: '8 targeted questions',
      topic: 'Quadratics',
      questionCount: 8,
      completed: false,
      questionIds: ['quad-0', 'quad-2', 'quad-4', 'quad-5', 'quad-16', 'expr-1', 'lineq-1', 'prob-2']
    },
    {
      id: 'task-4',
      number: 4,
      title: 'Quick review',
      type: 'quick_review',
      minutes: 5,
      description: '3 rapid questions',
      questionCount: 3,
      completed: false,
      questionIds: ['trig-1', 'geom-circ-1', 'geom-circ-2']
    }
  ]
};

export const getStoredProfile = (): UserProfile => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load profile', e);
  }
  return DEFAULT_PROFILE;
};

export const saveProfile = (profile: UserProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile', e);
  }
};

export const getStoredAttempts = (): QuestionAttempt[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load attempts', e);
  }
  // Seed with realistic attempts matching the progress screen: 156 questions, 72% accuracy
  return [
    { questionId: 'quad-0', selectedAnswer: 'B', isCorrect: true, timeSpentSeconds: 45, timestamp: Date.now() - 3600000 },
    { questionId: 'expr-1', selectedAnswer: 'B', isCorrect: true, timeSpentSeconds: 30, timestamp: Date.now() - 7200000 },
    { questionId: 'expr-2', selectedAnswer: 'C', isCorrect: false, timeSpentSeconds: 85, timestamp: Date.now() - 10800000, mistakeCategory: 'sign_error' },
    { questionId: 'lineq-1', selectedAnswer: 'D', isCorrect: true, timeSpentSeconds: 40, timestamp: Date.now() - 14400000 },
    { questionId: 'linsys-1', selectedAnswer: '22', isCorrect: true, timeSpentSeconds: 60, timestamp: Date.now() - 18000000 },
    { questionId: 'trig-1', selectedAnswer: 'C', isCorrect: true, timeSpentSeconds: 50, timestamp: Date.now() - 21600000 },
    { questionId: 'geom-circ-2', selectedAnswer: 'B', isCorrect: false, timeSpentSeconds: 110, timestamp: Date.now() - 25200000, mistakeCategory: 'conceptual' },
    { questionId: 'prob-2', selectedAnswer: 'B', isCorrect: true, timeSpentSeconds: 70, timestamp: Date.now() - 28800000 },
    { questionId: 'quad-5', selectedAnswer: 'C', isCorrect: true, timeSpentSeconds: 95, timestamp: Date.now() - 32400000 }
  ];
};

export const recordAttempt = (attempt: QuestionAttempt): void => {
  const existing = getStoredAttempts();
  const updated = [attempt, ...existing];
  try {
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save attempt', e);
  }
};

export const getStoredBookmarks = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load bookmarks', e);
  }
  return ['quad-0', 'geom-circ-2'];
};

export const toggleBookmark = (questionId: string): boolean => {
  const bookmarks = getStoredBookmarks();
  const isBookmarked = bookmarks.includes(questionId);
  const updated = isBookmarked
    ? bookmarks.filter(id => id !== questionId)
    : [...bookmarks, questionId];
  
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save bookmark', e);
  }
  return !isBookmarked;
};

export const getStoredDailyPlan = (): DailyPlan => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_PLAN);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load daily plan', e);
  }
  return DEFAULT_DAILY_PLAN;
};

export const saveDailyPlan = (plan: DailyPlan): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.DAILY_PLAN, JSON.stringify(plan));
  } catch (e) {
    console.error('Failed to save daily plan', e);
  }
};

export const toggleTaskCompleted = (taskId: string): DailyPlan => {
  const plan = getStoredDailyPlan();
  const updatedTasks = plan.tasks.map(task => 
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  const updatedPlan = { ...plan, tasks: updatedTasks };
  saveDailyPlan(updatedPlan);
  return updatedPlan;
};
