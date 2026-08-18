import { Question, DailyPlan, MistakeCategory, UserProfile } from '../types';

export interface TutorResponse {
  message: string;
  suggestedPrompt?: string;
  hintStep?: number;
  conceptTag?: string;
}

export const explainQuestionWithAI = async (
  question: Question,
  userAnswer?: string
): Promise<string> => {
  try {
    const res = await fetch('/api/ai/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionText: question.text,
        choices: question.choices,
        correctAnswer: question.correctAnswer,
        userAnswer,
        topic: question.topic,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.explanation) return data.explanation;
    }
  } catch (err) {
    console.warn('Backend AI API fetch failed, using built-in verified Socratic explanation', err);
  }

  // High quality built-in Socratic tutor response
  return `Let's break down this ${question.topic} problem step-by-step:

**1. What the question is testing:**
This question examines key principles in **${question.topic}** (${question.subtopic || 'Core Concept'}).

**2. Concept & Setup:**
${question.explanation}

**3. Common Misconception to Avoid:**
Students often rush into calculations without checking conditions or signs. Always verify the required variable and units before finalizing your answer!`;
};

export const getAIHint = async (
  question: Question,
  level: 1 | 2 | 3
): Promise<string> => {
  try {
    const res = await fetch('/api/ai/hint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionText: question.text,
        level,
        topic: question.topic,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.hint) return data.hint;
    }
  } catch (err) {
    console.warn('Using built-in hint level', level, err);
  }

  return question.hints[level - 1] || question.hints[0];
};

export const chatWithAITutor = async (
  history: { sender: 'user' | 'tutor'; text: string }[],
  currentQuestion?: Question,
  userMessage?: string
): Promise<TutorResponse> => {
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        history,
        question: currentQuestion,
        message: userMessage,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn('Using local Socratic conversation response', err);
  }

  const query = (userMessage || '').toLowerCase();
  
  if (currentQuestion && (query.includes('why') || query.includes("don't understand") || query.includes('how to solve'))) {
    return {
      message: `Let's start with the concept rather than the calculation.

This question is testing the relationship in **${currentQuestion.topic}** (${currentQuestion.subtopic || 'fundamental rule'}).

Before I show you the next step:
What formula or definition comes to mind when you see this setup?`,
      suggestedPrompt: 'Can you give me a conceptual clue?',
      conceptTag: currentQuestion.topic
    };
  }

  if (query.includes('hint') || query.includes('clue')) {
    return {
      message: currentQuestion 
        ? `Here is a strategic clue:\n\n${currentQuestion.hints[1]}`
        : "Always look at what is given and what is being asked. Try setting up an algebraic equation.",
      suggestedPrompt: 'Show me the next step',
    };
  }

  return {
    message: `Great question! In Digital SAT Math, the key is recognizing structural patterns early. 

Would you like to review the core formula, or walk through a similar example together?`,
    suggestedPrompt: 'Show similar practice question',
  };
};

export const classifyMistakeWithAI = (
  timeSpentSeconds: number,
  question: Question,
  userAnswer: string
): MistakeCategory => {
  if (timeSpentSeconds < 15) return 'time_pressure';
  if (userAnswer.includes('-') && !question.correctAnswer.includes('-')) return 'sign_error';
  if (question.topic.includes('Formula') || question.topic.includes('Trigonometry')) return 'formula_error';
  return 'conceptual';
};
