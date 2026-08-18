import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Calendar, 
  Clock, 
  Star, 
  Sparkles, 
  Target,
  BrainCircuit,
  Award
} from 'lucide-react';
import { UserProfile } from '../../types';
import { saveProfile } from '../../services/storage';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profile: UserProfile, launchDiagnostic: boolean) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState('Alex Johnson');
  const [hasScore, setHasScore] = useState<'known' | 'practice' | 'none'>('known');
  const [currentScore, setCurrentScore] = useState<number>(610);
  const [targetScore, setTargetScore] = useState<number>(750);
  const [examDate, setExamDate] = useState<string>('2026-08-22');
  const [studyDays, setStudyDays] = useState<string[]>(['Monday', 'Tuesday', 'Thursday', 'Saturday']);
  const [dailyMinutes, setDailyMinutes] = useState<Record<string, number>>({
    'Monday': 45,
    'Tuesday': 45,
    'Thursday': 45,
    'Saturday': 90,
    'Wednesday': 30,
    'Friday': 30,
    'Sunday': 60
  });
  const [experience, setExperience] = useState('Practice tests');
  const [confidence, setConfidence] = useState(4);
  const [weakAreas, setWeakAreas] = useState<string[]>(['Geometry & Trigonometry', 'Quadratics']);

  if (!isOpen) return null;

  const totalSteps = 7;

  // Days until exam calculation
  const daysUntilExam = (() => {
    try {
      const exam = new Date(examDate);
      const now = new Date();
      const diffTime = exam.getTime() - now.getTime();
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 87;
    } catch {
      return 87;
    }
  })();

  const handleToggleDay = (day: string) => {
    if (studyDays.includes(day)) {
      if (studyDays.length > 1) {
        setStudyDays(studyDays.filter(d => d !== day));
      }
    } else {
      setStudyDays([...studyDays, day]);
    }
  };

  const handleToggleWeakArea = (area: string) => {
    if (weakAreas.includes(area)) {
      setWeakAreas(weakAreas.filter(a => a !== area));
    } else {
      setWeakAreas([...weakAreas, area]);
    }
  };

  const handleFinish = (launchDiagnostic: boolean) => {
    const profile: UserProfile = {
      name,
      currentScore: hasScore === 'none' ? 550 : currentScore,
      targetScore,
      examDate,
      studyDays,
      dailyMinutes,
      experience,
      confidence,
      selfReportedWeakAreas: weakAreas,
      completedOnboarding: true,
      completedDiagnostic: false,
      createdAt: new Date().toISOString()
    };
    saveProfile(profile);
    onComplete(profile, launchDiagnostic);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white dark:bg-[#0e1424] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Top Progress Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Step {currentStep} of {totalSteps}
            </span>
            <div className="w-48 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Content */}
        <div className="p-6 sm:p-8 flex-1">
          {/* STEP 1: CURRENT LEVEL */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                  What is your current SAT Math level?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  We use this as a starting baseline for your adaptive roadmap.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'known' as const, label: 'I know my SAT Math score' },
                  { id: 'practice' as const, label: 'I have a recent practice-test score' },
                  { id: 'none' as const, label: "I haven't taken a practice test yet / Not sure" },
                ].map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setHasScore(opt.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      hasScore === opt.id
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 font-semibold ring-1 ring-indigo-500'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-sm">{opt.label}</span>
                    {hasScore === opt.id && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                  </div>
                ))}
              </div>

              {hasScore !== 'none' && (
                <div className="pt-3 space-y-2">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                    Current Math Score (200 - 800)
                  </label>
                  <input
                    type="number"
                    min="200"
                    max="800"
                    step="10"
                    value={currentScore}
                    onChange={(e) => setCurrentScore(Number(e.target.value))}
                    className="w-full px-4 py-3 text-lg font-bold rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 2: TARGET */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                  What score are you aiming for?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Set an ambitious yet achievable goal for test day.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/60 text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Target Score
                </span>
                <div className="text-5xl font-extrabold text-slate-900 dark:text-white font-display">
                  {targetScore}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  +{Math.max(0, targetScore - currentScore)} points improvement needed
                </p>
              </div>

              <input
                type="range"
                min={Math.max(400, currentScore)}
                max="800"
                step="10"
                value={targetScore}
                onChange={(e) => setTargetScore(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
          )}

          {/* STEP 3: EXAM DATE */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                  When is your SAT?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  We calculate pacing so you don't burn out or cram last minute.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                  Select Official Exam Date:
                </label>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0e1424] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-950 dark:text-indigo-200">
                  Countdown to Test Day
                </span>
                <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                  {daysUntilExam} days remaining
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: STUDY DAYS */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                  Which days can you study?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Consistency beats cramming. Select all that fit your schedule.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                  const isSelected = studyDays.includes(day);
                  return (
                    <button
                      key={day}
                      onClick={() => handleToggleDay(day)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: STUDY TIME */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                  How much time on each day?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Different days can have different availability (e.g. 45m weekday, 90m weekend).
                </p>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {studyDays.map((day) => (
                  <div
                    key={day}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 flex items-center justify-between"
                  >
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {day}
                    </span>
                    <select
                      value={dailyMinutes[day] || 45}
                      onChange={(e) => setDailyMinutes({ ...dailyMinutes, [day]: Number(e.target.value) })}
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value={15}>15 min</option>
                      <option value={30}>30 min</option>
                      <option value={45}>45 min</option>
                      <option value={60}>60 min</option>
                      <option value={90}>90 min</option>
                      <option value={120}>120 min</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: EXPERIENCE & CONFIDENCE */}
          {currentStep === 6 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                  How confident are you in Math?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Rate your overall comfort with Digital SAT Math concepts.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setConfidence(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= confidence
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-300 dark:text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                  Prior Preparation Method:
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="I haven't started">I haven't started yet</option>
                  <option value="School classes only">School classes only</option>
                  <option value="Self-study">Self-study with books</option>
                  <option value="Online course">Online course</option>
                  <option value="Practice tests">Practice tests</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 7: SELF-ASSESSMENT & COMPLETION */}
          {currentStep === 7 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                  Which areas feel hardest?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Select your perceived problem areas as a prior for your diagnostic.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Algebra',
                  'Advanced Math',
                  'Problem Solving',
                  'Geometry & Trigonometry',
                  'Quadratics',
                  'Functions'
                ].map((area) => {
                  const isSelected = weakAreas.includes(area);
                  return (
                    <div
                      key={area}
                      onClick={() => handleToggleWeakArea(area)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 font-semibold ring-1 ring-indigo-500'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="text-xs font-semibold">{area}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-900 dark:text-indigo-200">
                ✨ Your personalized roadmap is ready to be generated. Let's find your true strengths and gaps!
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(s => s - 1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : <div />}

          {currentStep < totalSteps ? (
            <button
              onClick={() => setCurrentStep(s => s + 1)}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/25 transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleFinish(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => handleFinish(true)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/30"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start Diagnostic</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
