import React from 'react';
import { 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  TrendingUp, 
  Play, 
  BookOpen, 
  AlertCircle,
  BarChart,
  Calendar as CalendarIcon
} from 'lucide-react';
import { UserProfile, DailyPlan, DailyTask } from '../../types';
import { NavTab } from '../layout/Sidebar';

interface DashboardProps {
  userProfile: UserProfile;
  dailyPlan: DailyPlan;
  onSelectTab: (tab: NavTab) => void;
  onStartTask: (task: DailyTask) => void;
  onToggleTaskCompleted: (taskId: string) => void;
  onStartPractice: (topicId?: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  userProfile,
  dailyPlan,
  onSelectTab,
  onStartTask,
  onToggleTaskCompleted,
  onStartPractice
}) => {
  const pointsToTarget = Math.max(0, userProfile.targetScore - userProfile.currentScore);
  const scoreProgressPercent = Math.min(
    100,
    Math.max(10, ((userProfile.currentScore - 200) / (userProfile.targetScore - 200)) * 100)
  );

  const completedTaskCount = dailyPlan.tasks.filter(t => t.completed).length;
  const totalTaskCount = dailyPlan.tasks.length;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Greeting & Goal Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight flex items-center gap-2">
            Good morning, {userProfile.name.split(' ')[0]} <span className="inline-block animate-bounce">👋</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Let's crush your SAT Math goal today.
          </p>
        </div>

        {/* Exam Countdown Badge */}
        <div className="self-start sm:self-auto flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-display leading-none">
            87
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
            <span className="font-semibold text-slate-800 dark:text-slate-200 block">Days until SAT</span>
            <span>Aug 22, 2026</span>
          </div>
        </div>
      </div>

      {/* Top Metric Cards: Your Journey & Focus Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Your Journey Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
              Your Journey
            </h2>
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Current Score
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
                  {userProfile.currentScore}
                </div>
                <span className="text-[11px] text-slate-400">(Self-reported)</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Target Score
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 font-display">
                  {userProfile.targetScore}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2 mt-4">
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${scoreProgressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-indigo-600 dark:text-indigo-400">
                  {pointsToTarget} points to your target
                </span>
                <span className="text-slate-400 font-bold">{userProfile.targetScore}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Areas Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Focus Areas
            </h2>
            <button 
              onClick={() => onSelectTab('topics')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View all
            </button>
          </div>

          <div className="space-y-2.5">
            {[
              { num: 1, name: 'Geometry & Trigonometry', badge: 'Needs more work', badgeColor: 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/50' },
              { num: 2, name: 'Quadratics', badge: 'Needs more work', badgeColor: 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/50' },
              { num: 3, name: 'Functions', badge: 'Keep practicing', badgeColor: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/50' },
              { num: 4, name: 'Linear Equations', badge: 'Strong', badgeColor: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50' },
            ].map((area) => (
              <div
                key={area.num}
                onClick={() => onStartPractice(area.name)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 text-center text-xs font-bold text-slate-400">
                    {area.num}
                  </span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {area.name}
                  </span>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${area.badgeColor}`}>
                  {area.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Section: Today's Plan (Left) & Streak + Weekly Study Time (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Today's Plan - 2 cols on desktop */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Today's Plan
                </h2>
                <span className="text-slate-400">•</span>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {dailyPlan.dayName}
                </span>
              </div>
            </div>
            <div className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              {dailyPlan.totalMinutes} min available
            </div>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {dailyPlan.tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                  task.completed
                    ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/50 opacity-90'
                    : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800/60 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Task number badge */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    task.completed 
                      ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400' 
                      : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                  }`}>
                    {task.completed ? <CheckCircle2 className="w-4 h-4" /> : task.number}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {task.title}
                      </h3>
                      {task.completed && (
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Done</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {task.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap">
                    {task.minutes} min
                  </span>
                  <button
                    onClick={() => onStartTask(task)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      task.completed
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs hover:shadow-indigo-500/25 active:scale-95'
                    }`}
                  >
                    {task.completed ? 'Review' : 'Start'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Tasks Completed Indicator */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Progress today</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {completedTaskCount} / {totalTaskCount} tasks completed
            </span>
          </div>
        </div>

        {/* Right column: Streak & This Week Study Time */}
        <div className="space-y-5">
          {/* Study Streak Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Study Streak
            </span>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                7
              </span>
              <span className="text-base font-semibold text-slate-800 dark:text-slate-200">
                days
              </span>
            </div>
            <p className="text-xs text-amber-500 font-semibold mb-4 flex items-center gap-1">
              Keep it up! 🔥
            </p>

            {/* Streak Dots M T W T F S S */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60">
              {[
                { day: 'M', active: true },
                { day: 'T', active: true },
                { day: 'W', active: true },
                { day: 'T', active: true },
                { day: 'F', active: true },
                { day: 'S', active: false },
                { day: 'S', active: false },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-slate-400">{item.day}</span>
                  <div className={`w-3 h-3 rounded-full ${
                    item.active 
                      ? 'bg-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-950' 
                      : 'border-2 border-slate-300 dark:border-slate-700'
                  }`} />
                </div>
              ))}
            </div>
          </div>

          {/* This Week Study Time Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              This Week
            </span>
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Study Time</div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-display mb-3">
              {Math.floor(userProfile.studyTimeMinutes / 60)}h {userProfile.studyTimeMinutes % 60}m
            </div>

            {/* Mini Bar Chart */}
            <div className="flex items-end justify-between h-16 pt-2">
              {[
                { day: 'M', h: '45%' },
                { day: 'T', h: `${Math.min(100, Math.max(10, (userProfile.studyTimeMinutes / 120) * 100))}%` }, // Dynamic for today (Tuesday)
                { day: 'W', h: '0%' },
                { day: 'T', h: '0%' },
                { day: 'F', h: '0%' },
                { day: 'S', h: '0%' },
                { day: 'S', h: '0%' },
              ].map((bar, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div className="w-2.5 bg-slate-100 dark:bg-slate-800 rounded-t-sm h-12 flex items-end">
                    <div 
                      className={`w-full ${idx === 1 ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700'} rounded-t-sm transition-all duration-300`}
                      style={{ height: bar.h }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Continue Card (Matching Screenshot) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-indigo-600/5 dark:from-indigo-950/60 dark:via-purple-950/40 dark:to-[#0e1322] border border-indigo-200 dark:border-indigo-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 shrink-0">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Continue where you left off
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
              Quadratics — Practice Set
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Question 7 of 10 • In progress
            </p>
          </div>
        </div>

        <button
          onClick={() => onStartPractice('Quadratics')}
          className="px-6 py-2.5 rounded-xl bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white font-semibold text-sm hover:bg-slate-50 dark:hover:bg-indigo-500 border border-slate-200 dark:border-transparent shadow-xs transition-all flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
