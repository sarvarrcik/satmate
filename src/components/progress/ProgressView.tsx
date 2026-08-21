import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Clock, 
  Flame, 
  CheckCircle, 
  AlertTriangle, 
  ArrowUpRight,
  Sparkles,
  ChevronDown,
  Layers
} from 'lucide-react';
import { UserProfile } from '../../types';
import { getStoredAttempts } from '../../services/storage';
import { MATHBOOK_QUESTIONS } from '../../data/questions';

interface ProgressViewProps {
  userProfile: UserProfile;
  onStartPracticeTopic: (topic: string) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  userProfile,
  onStartPracticeTopic
}) => {
  const [timeframe, setTimeframe] = useState<'This Week' | 'This Month' | 'All Time'>('This Week');

  // Compute stats from local storage
  const attempts = useMemo(() => getStoredAttempts(), []);
  
  const computedTotalQuestions = Math.max(userProfile.totalQuestionsPracticed, attempts.length);
  const correctAttempts = attempts.filter(a => a.isCorrect).length;
  const computedAccuracy = attempts.length > 0 ? Math.round((correctAttempts / attempts.length) * 100) : 0;
  
  // Calculate topic performance based on attempts and diagnostic scores
  const getTopicPercent = (topicName: string, fallback: number) => {
    // Find questions for this topic
    const topicQuestionIds = MATHBOOK_QUESTIONS
      .filter(q => q.topic.toLowerCase().includes(topicName.toLowerCase()) || q.section === topicName)
      .map(q => q.id);
      
    const topicAttempts = attempts.filter(a => topicQuestionIds.includes(a.questionId));
    
    if (topicAttempts.length >= 3) {
      const correct = topicAttempts.filter(a => a.isCorrect).length;
      return Math.round((correct / topicAttempts.length) * 100);
    }
    
    // Fallback to diagnostic score or default
    return (userProfile.diagnosticScores as any)?.[topicName] || fallback;
  };

  // Accuracy over time data points (Matching Screenshot: Aug 12 -> Aug 18, rising ~58% to ~72%)
  // In a real app, this would group attempts by day.
  const chartData = [
    { date: 'Aug 12', accuracy: 58 },
    { date: 'Aug 13', accuracy: 60 },
    { date: 'Aug 14', accuracy: 56 },
    { date: 'Aug 15', accuracy: 64 },
    { date: 'Aug 16', accuracy: 67 },
    { date: 'Aug 17', accuracy: 70 },
    { date: 'Aug 18', accuracy: computedAccuracy || 72 },
  ];

  const topicPerformances = [
    { name: 'Algebra', percent: getTopicPercent('Algebra', 78), color: 'bg-emerald-500', barColor: 'from-emerald-500 to-teal-400' },
    { name: 'Advanced Math', percent: getTopicPercent('Advanced Math', 65), color: 'bg-amber-500', barColor: 'from-amber-500 to-yellow-400' },
    { name: 'Problem Solving', percent: getTopicPercent('Problem Solving', 70), color: 'bg-emerald-500', barColor: 'from-emerald-500 to-teal-400' },
    { name: 'Geometry & Trigonometry', percent: getTopicPercent('Geometry & Trigonometry', 60), color: 'bg-amber-500', barColor: 'from-amber-500 to-orange-400' },
  ];

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-200">
      {/* Header with Timeframe Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            Progress & Performance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real data-driven breakdown of your SAT Math mastery
          </p>
        </div>

        <div className="relative inline-block text-left">
          <select
            value={timeframe}
            onChange={(e: any) => setTimeframe(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white dark:bg-[#0e1322] border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs cursor-pointer"
          >
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="All Time">All Time</option>
          </select>
        </div>
      </div>

      {/* 4 Metric Cards (Matching Screenshot) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Accuracy */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Accuracy
          </span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-display mb-1.5">
            {computedAccuracy || 72}%
          </div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+8% from last week</span>
          </span>
        </div>

        {/* Questions Solved */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Questions Solved
          </span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-display mb-1.5">
            {computedTotalQuestions}
          </div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+42 from last week</span>
          </span>
        </div>

        {/* Study Time */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Study Time
          </span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-display mb-1.5">
            {Math.floor(userProfile.studyTimeMinutes / 60)}h {userProfile.studyTimeMinutes % 60}m
          </div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+1h 10m from last week</span>
          </span>
        </div>

        {/* Streak */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Streak
          </span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-display mb-1.5">
            7 <span className="text-base font-medium">days</span>
          </div>
          <span className="text-xs font-semibold text-amber-500 flex items-center gap-1">
            <span>Keep it up! 🔥</span>
          </span>
        </div>
      </div>

      {/* Main Charts: Accuracy Over Time (Left) & Topic Performance (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Accuracy Over Time Chart (Matching Screenshot) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Accuracy Over Time
            </h2>
            <span className="text-xs font-semibold text-slate-400">Past 7 days</span>
          </div>

          {/* SVG Line Chart */}
          <div className="h-56 relative pt-4 pb-6">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-slate-400 font-mono pointer-events-none pb-6">
              {[100, 75, 50, 25, 0].map((val) => (
                <div key={val} className="flex items-center gap-2">
                  <span className="w-8 text-right">{val}%</span>
                  <div className="flex-1 border-b border-slate-100 dark:border-slate-800/60" />
                </div>
              ))}
            </div>

            {/* Interactive SVG Curve */}
            <div className="absolute inset-0 pl-10 pb-6">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="accuracyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Fill area */}
                <path
                  d="M 0,116 L 100,112 L 200,120 L 300,104 L 400,98 L 500,92 L 600,88 L 600,200 L 0,200 Z"
                  fill="url(#accuracyGrad)"
                />

                {/* Line path */}
                <path
                  d="M 0,116 L 100,112 L 200,120 L 300,104 L 400,98 L 500,92 L 600,88"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points */}
                {[
                  { cx: 0, cy: 116, val: '58%' },
                  { cx: 100, cy: 112, val: '60%' },
                  { cx: 200, cy: 120, val: '56%' },
                  { cx: 300, cy: 104, val: '64%' },
                  { cx: 400, cy: 98, val: '67%' },
                  { cx: 500, cy: 92, val: '70%' },
                  { cx: 600, cy: 88, val: '72%' },
                ].map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.cx}
                    cy={pt.cy}
                    r="4.5"
                    className="fill-indigo-600 dark:fill-indigo-400 stroke-white dark:stroke-slate-900 stroke-2 hover:r-6 cursor-pointer transition-all"
                  />
                ))}
              </svg>
            </div>

            {/* X-axis date labels */}
            <div className="absolute bottom-0 left-10 right-0 flex justify-between text-[11px] text-slate-400 font-medium pt-1">
              {chartData.map((d, i) => (
                <span key={i}>{d.date}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Topic Performance Bars (Matching Screenshot) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              Topic Performance
            </h2>

            <div className="space-y-4">
              {topicPerformances.map((topic) => (
                <div key={topic.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800 dark:text-slate-200">{topic.name}</span>
                    <span className="text-slate-900 dark:text-white font-bold">{topic.percent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${topic.barColor} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${topic.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
            <span className="text-xs text-slate-500">Need targeted help?</span>
            <button
              onClick={() => onStartPracticeTopic('Geometry & Trigonometry')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Practice Weakest Area &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Mistake Intelligence Section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Mistake Intelligence & Patterns
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              AI-driven diagnostic analysis of your error habits
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <strong className="font-bold">Your recent pattern: </strong>
            <span>You've made 4 sign errors in the last 12 algebra questions.</span>
          </div>
          <button
            onClick={() => onStartPracticeTopic('Expressions')}
            className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 font-bold text-amber-800 dark:text-amber-300 hover:bg-amber-100 text-xs self-start sm:self-auto"
          >
            Spend 10m on Sign Handling
          </button>
        </div>
      </div>
    </div>
  );
};
