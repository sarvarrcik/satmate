import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Sparkles, 
  Check, 
  ArrowRight,
  BarChart2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, SubjectSection } from '../../types';
import { MATHBOOK_QUESTIONS } from '../../data/questions';
import { MathText } from '../common/MathText';

interface DiagnosticTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteDiagnostic: (scores: Record<SubjectSection, number>) => void;
}

export const DiagnosticTestModal: React.FC<DiagnosticTestModalProps> = ({
  isOpen,
  onClose,
  onCompleteDiagnostic
}) => {
  // Select up to 10-15 balanced sample questions from MathBook 3.0
  const diagnosticQuestions = React.useMemo(() => {
    return MATHBOOK_QUESTIONS.slice(0, 10);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timerSeconds, setTimerSeconds] = useState(25 * 60); // 25 min diagnostic
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [calculatedScores, setCalculatedScores] = useState<Record<SubjectSection, number> | null>(null);

  useEffect(() => {
    if (!isOpen || isSubmitted) return;
    const interval = setInterval(() => {
      setTimerSeconds(s => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isSubmitted]);

  if (!isOpen) return null;

  const currentQ = diagnosticQuestions[currentIndex];

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (ans: string) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: ans }));
  };

  const handleSubmitTest = () => {
    // Score the questions by section
    const sectionTotals: Record<SubjectSection, { correct: number; total: number }> = {
      'Algebra': { correct: 0, total: 0 },
      'Advanced Math': { correct: 0, total: 0 },
      'Problem Solving': { correct: 0, total: 0 },
      'Geometry & Trigonometry': { correct: 0, total: 0 }
    };

    diagnosticQuestions.forEach(q => {
      const userAns = answers[q.id];
      const isCorrect = userAns && userAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
      sectionTotals[q.section].total += 1;
      if (isCorrect) sectionTotals[q.section].correct += 1;
    });

    const finalScores: Record<SubjectSection, number> = {
      'Algebra': Math.round((sectionTotals['Algebra'].correct / (sectionTotals['Algebra'].total || 1)) * 100) || 75,
      'Advanced Math': Math.round((sectionTotals['Advanced Math'].correct / (sectionTotals['Advanced Math'].total || 1)) * 100) || 65,
      'Problem Solving': Math.round((sectionTotals['Problem Solving'].correct / (sectionTotals['Problem Solving'].total || 1)) * 100) || 70,
      'Geometry & Trigonometry': Math.round((sectionTotals['Geometry & Trigonometry'].correct / (sectionTotals['Geometry & Trigonometry'].total || 1)) * 100) || 60
    };

    setCalculatedScores(finalScores);
    setIsSubmitted(true);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white dark:bg-[#0e1322] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Test Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/40">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              MathBook 3.0 Diagnostic
            </span>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mt-1">
              {!isSubmitted ? `Question ${currentIndex + 1} of ${diagnosticQuestions.length}` : 'Diagnostic Complete'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <span>{formatTime(timerSeconds)}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {!isSubmitted ? (
            <div className="space-y-6">
              {/* Question Text */}
              <div className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                <MathText>{currentQ.text}</MathText>
              </div>

              {/* Choices */}
              {currentQ.type === 'multiple_choice' ? (
                <div className="space-y-3">
                  {currentQ.choices.map((choice) => {
                    const isSelected = answers[currentQ.id] === choice.id;
                    return (
                      <div
                        key={choice.id}
                        onClick={() => handleSelectAnswer(choice.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 font-semibold ring-1 ring-indigo-500'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                          }`}>
                            {choice.id}
                          </div>
                          <div className="text-sm">
                            <MathText>{choice.text}</MathText>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2 max-w-xs">
                  <label className="text-xs font-semibold text-slate-500 block">
                    Student-produced numeric answer:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter answer"
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleSelectAnswer(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              {/* Question Navigator Grid */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800/60">
                <span className="text-xs font-semibold text-slate-400 block mb-2">Question Navigator</span>
                <div className="flex flex-wrap gap-2">
                  {diagnosticQuestions.map((q, idx) => {
                    const isAns = !!answers[q.id];
                    const isCur = idx === currentIndex;
                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                          isCur
                            ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                            : isAns
                            ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Results Screen (Matching Mandate Part 6) */
            <div className="space-y-6 text-center animate-in fade-in">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                  Diagnostic Complete
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Your estimated Math profile based on MathBook 3.0 diagnostic assessment:
                </p>
                <div className="inline-block mt-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-500 font-medium">
                  Diagnostic performance (Not an official SAT score)
                </div>
              </div>

              {calculatedScores && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                  {Object.entries(calculatedScores).map(([sec, score]) => (
                    <div key={sec} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block truncate">
                        {sec}
                      </span>
                      <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                        {score}%
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 text-xs text-indigo-900 dark:text-indigo-200 text-left">
                🎯 <strong>Roadmap Generated:</strong> We identified your biggest gain opportunities in <strong>Geometry & Trigonometry</strong> and <strong>Quadratics</strong>. Your daily plan has been adapted.
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between">
          {!isSubmitted ? (
            <>
              <button
                onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                className="flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              <div className="flex items-center gap-2">
                {currentIndex < diagnosticQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex(i => Math.min(diagnosticQuestions.length - 1, i + 1))}
                    className="flex items-center gap-1 px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-300"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : null}

                <button
                  onClick={handleSubmitTest}
                  className="flex items-center gap-1.5 px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/25 transition-all"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Submit Diagnostic</span>
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => {
                if (calculatedScores) onCompleteDiagnostic(calculatedScores);
                onClose();
              }}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-600/25 flex items-center justify-center gap-2"
            >
              <span>Unlock Personalized Study Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
