import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Play, 
  Calendar as CalendarIcon,
  Sparkles,
  Award
} from 'lucide-react';
import { DailyPlan, DailyTask, UserProfile } from '../../types';

interface StudyPlanViewProps {
  dailyPlan: DailyPlan;
  userProfile: UserProfile;
  onStartTask: (task: DailyTask) => void;
  onToggleTaskCompleted: (taskId: string) => void;
}

// August 2026 Calendar days matrix (Aug 1, 2026 was a Saturday)
// Matching screenshot calendar days
const calendarDays = [
  { day: 27, isCurrentMonth: false, status: 'rest' },
  { day: 28, isCurrentMonth: false, status: 'rest' },
  { day: 29, isCurrentMonth: false, status: 'rest' },
  { day: 30, isCurrentMonth: false, status: 'rest' },
  { day: 31, isCurrentMonth: false, status: 'rest' },
  { day: 1, isCurrentMonth: true, status: 'completed' },
  { day: 2, isCurrentMonth: true, status: 'rest' },
  { day: 3, isCurrentMonth: true, status: 'completed' },
  { day: 4, isCurrentMonth: true, status: 'completed' },
  { day: 5, isCurrentMonth: true, status: 'missed' },
  { day: 6, isCurrentMonth: true, status: 'completed' },
  { day: 7, isCurrentMonth: true, status: 'completed' },
  { day: 8, isCurrentMonth: true, status: 'rest' },
  { day: 9, isCurrentMonth: true, status: 'rest' },
  { day: 10, isCurrentMonth: true, status: 'completed' },
  { day: 11, isCurrentMonth: true, status: 'completed' },
  { day: 12, isCurrentMonth: true, status: 'completed' },
  { day: 13, isCurrentMonth: true, status: 'completed' },
  { day: 14, isCurrentMonth: true, status: 'completed' },
  { day: 15, isCurrentMonth: true, status: 'completed' },
  { day: 16, isCurrentMonth: true, status: 'exam' },
  { day: 17, isCurrentMonth: true, status: 'completed' },
  { day: 18, isCurrentMonth: true, status: 'active' }, // Today Tuesday Aug 18
  { day: 19, isCurrentMonth: true, status: 'planned' },
  { day: 20, isCurrentMonth: true, status: 'planned' },
  { day: 21, isCurrentMonth: true, status: 'planned' },
  { day: 22, isCurrentMonth: true, status: 'planned' },
  { day: 23, isCurrentMonth: true, status: 'rest' },
  { day: 24, isCurrentMonth: true, status: 'planned' },
  { day: 25, isCurrentMonth: true, status: 'planned' },
  { day: 26, isCurrentMonth: true, status: 'planned' },
  { day: 27, isCurrentMonth: true, status: 'planned' },
  { day: 28, isCurrentMonth: true, status: 'planned' },
  { day: 29, isCurrentMonth: true, status: 'planned' },
  { day: 30, isCurrentMonth: true, status: 'rest' },
  { day: 31, isCurrentMonth: true, status: 'planned' },
  { day: 1, isCurrentMonth: false, status: 'planned' },
  { day: 2, isCurrentMonth: false, status: 'planned' },
  { day: 3, isCurrentMonth: false, status: 'planned' },
  { day: 4, isCurrentMonth: false, status: 'planned' },
  { day: 5, isCurrentMonth: false, status: 'planned' },
  { day: 6, isCurrentMonth: false, status: 'planned' },
];

export const StudyPlanView: React.FC<StudyPlanViewProps> = ({
  dailyPlan,
  userProfile,
  onStartTask,
  onToggleTaskCompleted
}) => {
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [selectedDay, setSelectedDay] = useState(18); // Default August 18

  // Generate mock tasks based on day
  const getTasksForDay = (day: number): DailyTask[] => {
    if (day === 18) return dailyPlan.tasks; // Today
    
    // Mock for other days
    const isPast = day < 18;
    return [
      {
        id: `t1-${day}`,
        number: 1,
        title: isPast ? 'Completed Review' : 'Learn Advanced Math',
        description: isPast ? 'Reviewed 5 missed questions from Algebra.' : 'Focus on nonlinear equations.',
        minutes: 15,
        completed: isPast,
        type: isPast ? 'review' : 'learn',
        topic: 'Advanced Math'
      },
      {
        id: `t2-${day}`,
        number: 2,
        title: 'Practice Set',
        description: 'Complete 10 questions on new topics.',
        minutes: 30,
        completed: isPast,
        type: 'practice',
        topic: 'Advanced Math'
      }
    ];
  };

  const currentTasks = getTasksForDay(selectedDay);
  const currentDayStatus = calendarDays.find(d => d.isCurrentMonth && d.day === selectedDay)?.status || 'rest';

  const renderDayView = () => (
    <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">&lt;</span>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Tuesday, Aug {selectedDay}
          </h2>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
          {currentDayStatus === 'rest' ? 'Rest Day' : currentDayStatus === 'exam' ? 'Exam Day!' : '45 min planned'}
        </span>
      </div>

      {currentDayStatus === 'rest' ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
            <Clock className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Scheduled Rest Day</h3>
          <p className="text-xs text-slate-500 mt-1">Take a break to avoid burnout. Your brain needs time to consolidate learning.</p>
        </div>
      ) : currentDayStatus === 'exam' ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/60 flex items-center justify-center mb-3">
            <Award className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-sm font-bold text-amber-900 dark:text-amber-400">Official Exam Day</h3>
          <p className="text-xs text-slate-500 mt-1">Good luck! You've prepared well for this.</p>
        </div>
      ) : (
        <div className="space-y-3 pt-2 flex-1">
          {currentTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 flex items-center justify-between gap-4 transition-all hover:border-indigo-300 dark:hover:border-indigo-800/60 shadow-2xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  task.completed
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400'
                    : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                }`}>
                  {task.number}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {task.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {task.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-medium text-slate-400">
                  {task.minutes} min
                </span>
                {task.completed ? (
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white" />
                  </div>
                ) : (
                  <button
                    onClick={() => onStartTask(task)}
                    className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
                  >
                    Start
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Adaptive Planner Status</span>
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          Optimal Pacing (100% on target)
        </span>
      </div>
    </div>
  );

  const renderWeekView = () => (
    <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">This Week's Overview</h2>
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Aug 16 - Aug 22</span>
      </div>
      <div className="space-y-3 pt-2">
        {[16, 17, 18, 19, 20, 21, 22].map((day) => {
          const status = calendarDays.find(d => d.isCurrentMonth && d.day === day)?.status;
          return (
            <div key={day} onClick={() => { setSelectedDay(day); setViewMode('day'); }} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/40 cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold w-12 text-slate-500">Aug {day}</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {status === 'exam' ? 'Official SAT Exam' : status === 'rest' ? 'Rest Day' : status === 'completed' ? 'Completed Session' : 'Planned Study'}
                </span>
              </div>
              {status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
              {status === 'active' && <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderMonthView = () => (
    <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-500 rounded-2xl flex items-center justify-center">
        <CalendarIcon className="w-8 h-8" />
      </div>
      <div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Monthly Trajectory</h2>
        <p className="text-xs text-slate-500 mt-2 max-w-sm">
          You are on track to complete 100% of your required MathBook 3.0 syllabus before the exam. Keep following your daily pacing.
        </p>
      </div>
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full mt-4">
        <div className="bg-indigo-600 h-full rounded-full" style={{ width: '68%' }}></div>
      </div>
      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">68% Syllabus Completed</span>
    </div>
  );

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      {/* Top View Mode Tabs (Matching Screenshot: Day | Week | Month) */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            Study Plan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Adaptive daily schedule personalized for {userProfile.name}
          </p>
        </div>

        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs font-semibold">
          {(['day', 'week', 'month'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3.5 py-1.5 rounded-lg capitalize transition-all ${
                viewMode === mode
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Side Tasks & Right Side Calendar (Matching Screenshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tuesday, Aug 18 Tasks or Week/Month overview */}
        {viewMode === 'day' && renderDayView()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'month' && renderMonthView()}

        {/* Right Column: August 2026 Interactive Calendar */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between">
          <div>
            {/* Month Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                August 2026
              </h2>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSelectedDay(18)}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Today
                </button>
                <div className="flex items-center gap-1">
                  <button className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((w, i) => (
                <div key={i} className="py-1">{w}</div>
              ))}
            </div>

            {/* Calendar Days Matrix */}
            <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
              {calendarDays.map((item, idx) => {
                const isSelected = item.isCurrentMonth && item.day === selectedDay;
                let dayBg = "hover:bg-slate-100 dark:hover:bg-slate-800/60";
                let dayText = item.isCurrentMonth ? "text-slate-800 dark:text-slate-200" : "text-slate-300 dark:text-slate-700";

                if (isSelected) {
                  dayBg = "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30 ring-2 ring-indigo-300";
                  dayText = "text-white";
                } else if (item.isCurrentMonth) {
                  if (item.status === 'completed') {
                    dayBg = "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold";
                  } else if (item.status === 'active') {
                    dayBg = "bg-indigo-500 text-white font-bold ring-2 ring-indigo-300";
                    dayText = "text-white";
                  } else if (item.status === 'exam') {
                    dayBg = "bg-amber-500 text-white font-bold";
                    dayText = "text-white";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (item.isCurrentMonth) setSelectedDay(item.day);
                    }}
                    className={`h-9 w-full rounded-xl flex items-center justify-center text-xs transition-all ${dayBg} ${dayText}`}
                  >
                    {item.day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend (Matching Screenshot: Completed, Planned, Missed, Rest Day, Exam Day) */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-5 border-t border-slate-100 dark:border-slate-800/60 text-[11px] text-slate-500 dark:text-slate-400 mt-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <span>Planned</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>Missed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
              <span>Rest Day</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Exam Day</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
