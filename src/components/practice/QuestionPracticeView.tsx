import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Pause, 
  Play, 
  Bookmark, 
  Check, 
  HelpCircle, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  RotateCcw,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, QuestionAttempt, MistakeCategory } from '../../types';
import { MATHBOOK_QUESTIONS } from '../../data/questions';
import { MathText } from '../common/MathText';
import { toggleBookmark, getStoredBookmarks, recordAttempt } from '../../services/storage';
import { classifyMistakeWithAI } from '../../services/aiService';

interface QuestionPracticeViewProps {
  initialQuestionId?: string;
  topicFilter?: string;
  onBackToDashboard: () => void;
  onOpenAITutorWithContext: (question: Question, userMsg?: string) => void;
  onOpenFormulas: () => void;
}

export const QuestionPracticeView: React.FC<QuestionPracticeViewProps> = ({
  initialQuestionId,
  topicFilter,
  onBackToDashboard,
  onOpenAITutorWithContext,
  onOpenFormulas,
}) => {
  // Filter question pool
  const questionPool = React.useMemo(() => {
    if (topicFilter) {
      const filtered = MATHBOOK_QUESTIONS.filter(q => q.topic.toLowerCase() === topicFilter.toLowerCase());
      if (filtered.length > 0) return filtered;
    }
    return MATHBOOK_QUESTIONS;
  }, [topicFilter]);

  const [currentIndex, setCurrentIndex] = useState(() => {
    if (initialQuestionId) {
      const foundIdx = questionPool.findIndex(q => q.id === initialQuestionId);
      if (foundIdx !== -1) return foundIdx;
    }
    return 0;
  });

  const currentQuestion = questionPool[currentIndex] || questionPool[0];

  // Answering states
  const [selectedChoice, setSelectedChoice] = useState<string>('');
  const [numericInput, setNumericInput] = useState<string>('');
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [timerSeconds, setTimerSeconds] = useState(18 * 60 + 26); // Default matching screenshot: 00:18:26
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    setBookmarks(getStoredBookmarks());
  }, []);

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Format timer into HH:MM:SS or MM:SS
  const formatTime = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isBookmarked = bookmarks.includes(currentQuestion.id);

  const handleToggleBookmark = () => {
    toggleBookmark(currentQuestion.id);
    setBookmarks(getStoredBookmarks());
  };

  const handleSelectChoice = (choiceId: string) => {
    if (isAnswerChecked) return;
    setSelectedChoice(choiceId);
  };

  const handleCheckAnswer = () => {
    const userAnswer = currentQuestion.type === 'multiple_choice' 
      ? selectedChoice 
      : numericInput.trim();

    if (!userAnswer) return;

    const correct = userAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase();
    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#6366f1', '#a855f7', '#10b981']
      });
    }

    // Save attempt
    const attempt: QuestionAttempt = {
      questionId: currentQuestion.id,
      selectedAnswer: userAnswer,
      isCorrect: correct,
      timeSpentSeconds: 45,
      timestamp: Date.now(),
      mistakeCategory: !correct ? classifyMistakeWithAI(45, currentQuestion, userAnswer) : undefined
    };
    recordAttempt(attempt);
  };

  const handleNext = () => {
    if (currentIndex < questionPool.length - 1) {
      setCurrentIndex(i => i + 1);
      resetQuestionState();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      resetQuestionState();
    }
  };

  const resetQuestionState = () => {
    setSelectedChoice('');
    setNumericInput('');
    setIsAnswerChecked(false);
    setIsCorrect(false);
  };

  const handleStartSimilar = () => {
    const similarId = currentQuestion.similarQuestionIds?.[0];
    if (similarId) {
      const idx = questionPool.findIndex(q => q.id === similarId);
      if (idx !== -1) {
        setCurrentIndex(idx);
        resetQuestionState();
        return;
      }
    }
    // Fallback: pick next question with same topic
    const nextOfSameTopic = questionPool.findIndex(
      (q, idx) => idx !== currentIndex && q.topic === currentQuestion.topic
    );
    if (nextOfSameTopic !== -1) {
      setCurrentIndex(nextOfSameTopic);
      resetQuestionState();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-in fade-in duration-200">
      {/* Top Header Row (Matching Screenshot: Practice > Quadratics, Timer 00:18:26, 7 / 20, < >) */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
          <button 
            onClick={onBackToDashboard}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-slate-400 dark:text-slate-500">Practice</span>
          <span className="text-slate-400 dark:text-slate-500">&gt;</span>
          <span className="text-slate-900 dark:text-white font-bold">{currentQuestion.topic}</span>
        </div>

        {/* Right Tools: Timer, Counter, Arrows */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Timer */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            <span>{formatTime(timerSeconds)}</span>
            <button 
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white ml-1"
              title={isTimerRunning ? "Pause Timer" : "Resume Timer"}
            >
              {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          </div>

          {/* Question Counter */}
          <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">{currentIndex + 1}</span>
            <span className="text-slate-400 mx-1">/</span>
            <span>{questionPool.length}</span>
          </div>

          {/* Navigation Chevrons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === questionPool.length - 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Question Card (Matching Screenshot) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
        {/* Topic Tag & Exam Date attribution */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-lg">
            {currentQuestion.section} • {currentQuestion.topic}
          </span>
          {currentQuestion.examDate && (
            <span className="text-slate-400 font-medium">
              MathBook 3.0 • [{currentQuestion.examDate}]
            </span>
          )}
        </div>

        {/* Question Text with KaTeX */}
        <div className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
          <MathText>{currentQuestion.text}</MathText>
        </div>

        {/* Choices or Numeric Input */}
        {currentQuestion.type === 'multiple_choice' ? (
          <div className="space-y-3 pt-2">
            {currentQuestion.choices.map((choice) => {
              const isSelected = selectedChoice === choice.id;
              const isChoiceCorrect = choice.id === currentQuestion.correctAnswer;

              let cardStyle = "border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-400 dark:hover:border-indigo-600 bg-white dark:bg-slate-900/60";
              let badgeStyle = "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300";

              if (isSelected && !isAnswerChecked) {
                cardStyle = "border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-xs ring-1 ring-indigo-500";
                badgeStyle = "bg-indigo-600 text-white";
              } else if (isAnswerChecked) {
                if (isChoiceCorrect) {
                  cardStyle = "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-emerald-500";
                  badgeStyle = "bg-emerald-600 text-white";
                } else if (isSelected && !isCorrect) {
                  cardStyle = "border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 ring-1 ring-rose-500";
                  badgeStyle = "bg-rose-600 text-white";
                }
              }

              return (
                <div
                  key={choice.id}
                  id={`choice-${choice.id}`}
                  onClick={() => handleSelectChoice(choice.id)}
                  className={`w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl border text-left cursor-pointer transition-all duration-150 ${cardStyle}`}
                >
                  <div className="flex items-center gap-4">
                    {/* Circle badge A, B, C, D */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${badgeStyle}`}>
                      {choice.id}
                    </div>
                    {/* Choice Text with KaTeX */}
                    <div className="text-sm sm:text-base text-slate-900 dark:text-slate-100 font-medium">
                      <MathText>{choice.text}</MathText>
                    </div>
                  </div>

                  {/* Icon indicator */}
                  {isAnswerChecked && isChoiceCorrect && (
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                  {isAnswerChecked && isSelected && !isCorrect && (
                    <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
                      <XCircle className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Student Produced Response (Numeric Grid-In) */
          <div className="space-y-3 pt-2 max-w-sm">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
              Enter your calculated answer:
            </label>
            <input
              type="text"
              placeholder="e.g. 24 or 3/4"
              value={numericInput}
              disabled={isAnswerChecked}
              onChange={(e) => setNumericInput(e.target.value)}
              className="w-full px-4 py-3 text-base rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        {/* Buttons Row: Bookmark & Check Answer (Matching Screenshot) */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleBookmark}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-colors ${
                isBookmarked
                  ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>Bookmark</span>
            </button>

            <button
              onClick={onOpenFormulas}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold"
            >
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>Formula Help</span>
            </button>
          </div>

          <button
            onClick={handleCheckAnswer}
            disabled={(!selectedChoice && !numericInput) || isAnswerChecked}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-600/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Check Answer</span>
          </button>
        </div>
      </div>

      {/* Answer Feedback Card (Matching Screenshot: Correct! 🎉, Your answer: B, Correct: B, Explain this) */}
      {isAnswerChecked && (
        <div className={`p-6 rounded-3xl border animate-in slide-in-from-bottom-3 duration-300 space-y-4 ${
          isCorrect 
            ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/80 text-emerald-950 dark:text-emerald-100'
            : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/80 text-rose-950 dark:text-rose-100'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-extrabold flex items-center gap-2">
                {isCorrect ? 'Correct! 🎉' : 'Incorrect'}
              </h3>
              <div className="text-xs sm:text-sm font-medium mt-1 space-x-3">
                <span>Your answer: <strong className="font-bold">{selectedChoice || numericInput}</strong></span>
                <span>•</span>
                <span>Correct answer: <strong className="font-bold">{currentQuestion.correctAnswer}</strong></span>
              </div>
            </div>

            {/* Socratic Explain Button */}
            <button
              onClick={() => onOpenAITutorWithContext(currentQuestion, "I don't understand why this answer is correct.")}
              className="flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white text-xs sm:text-sm font-bold shadow-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-all self-start sm:self-auto"
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Explain this</span>
            </button>
          </div>

          {/* Quick Concept Explanation */}
          <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800/50 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <MathText>{currentQuestion.explanation}</MathText>
          </div>
        </div>
      )}

      {/* Similar Question Prompt (Matching Screenshot: Similar Question: Try another like this [Start >]) */}
      {isAnswerChecked && (
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Similar Question
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Try another question with {currentQuestion.topic}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleStartSimilar}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 font-semibold text-xs sm:text-sm transition-colors"
            >
              <span>Start</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === questionPool.length - 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all disabled:opacity-40"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
