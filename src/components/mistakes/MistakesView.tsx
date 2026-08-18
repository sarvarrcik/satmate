import React, { useState } from 'react';
import { AlertCircle, RotateCcw, Sparkles, ArrowRight, CheckCircle, Tag } from 'lucide-react';
import { MATHBOOK_QUESTIONS } from '../../data/questions';
import { MathText } from '../common/MathText';
import { Question, MistakeCategory } from '../../types';

interface MistakesViewProps {
  onStartPracticeQuestion: (questionId: string) => void;
  onOpenAITutorWithContext: (question: Question) => void;
}

export const MistakesView: React.FC<MistakesViewProps> = ({
  onStartPracticeQuestion,
  onOpenAITutorWithContext
}) => {
  // Sample missed questions
  const missedQuestions = [
    {
      question: MATHBOOK_QUESTIONS.find(q => q.id === 'expr-2') || MATHBOOK_QUESTIONS[1],
      userAnswer: 'C',
      correctAnswer: 'D',
      mistakeCategory: 'sign_error' as MistakeCategory,
      date: 'Aug 18, 2026'
    },
    {
      question: MATHBOOK_QUESTIONS.find(q => q.id === 'geom-circ-2') || MATHBOOK_QUESTIONS[2],
      userAnswer: 'B',
      correctAnswer: 'C',
      mistakeCategory: 'conceptual' as MistakeCategory,
      date: 'Aug 17, 2026'
    }
  ];

  const categoryLabels: Record<MistakeCategory, { label: string; color: string }> = {
    conceptual: { label: 'Conceptual Misunderstanding', color: 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300' },
    calculation: { label: 'Calculation Slip', color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' },
    sign_error: { label: 'Sign / Negative Error', color: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300' },
    formula_error: { label: 'Formula Misapplication', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300' },
    misread: { label: 'Misread Question / Units', color: 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300' },
    time_pressure: { label: 'Rushed / Time Pressure', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
    guessing: { label: 'Guessing / Uncertainty', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
          Mistake Intelligence & Tracker
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Turn your past errors into permanent mastery with intelligent root-cause diagnosis
        </p>
      </div>

      {/* AI Pattern Alert */}
      <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200">
              Pattern Detected: Negative Signs & Isolating Variables
            </h3>
            <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-0.5">
              4 of your last 6 incorrect attempts in Algebra were due to sign handling or inverted fractions.
            </p>
          </div>
        </div>

        <button
          onClick={() => onStartPracticeQuestion(missedQuestions[0].question.id)}
          className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-xs transition-all self-start sm:self-auto shrink-0"
        >
          Review Mistakes Now
        </button>
      </div>

      {/* List of Missed Questions */}
      <div className="space-y-4">
        {missedQuestions.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">
                  {item.question.section} • {item.question.topic}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${categoryLabels[item.mistakeCategory].color}`}>
                  {categoryLabels[item.mistakeCategory].label}
                </span>
              </div>
              <span className="text-xs text-slate-400">{item.date}</span>
            </div>

            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
              <MathText>{item.question.text}</MathText>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs">
              <div className="space-x-3">
                <span className="text-rose-600 dark:text-rose-400 font-semibold">
                  Your Answer: <strong>{item.userAnswer}</strong>
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  Correct Answer: <strong>{item.correctAnswer}</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60">
              <button
                onClick={() => onOpenAITutorWithContext(item.question)}
                className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI Coach Why</span>
              </button>

              <button
                onClick={() => onStartPracticeQuestion(item.question.id)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xs transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Question</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
