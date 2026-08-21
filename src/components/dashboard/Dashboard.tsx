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
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Target,
  Bot,
  Layers
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
    <div className="flex flex-col xl:flex-row gap-6 pb-12 animate-in fade-in duration-300">
      
      {/* Main Left Column */}
      <div className="flex-1 space-y-6 min-w-0">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight flex items-center gap-2 mb-1">
            Good morning, {userProfile.name.split(' ')[0]}! <span className="inline-block animate-bounce">👋</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Ready to crush your SAT Math goal today?
          </p>
        </div>

        {/* Top Metric Cards: Your Journey, Accuracy, Weakest Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Your Journey Card */}
          <div className="md:col-span-1 p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
              Your Journey
            </h2>
            <div className="flex items-end justify-between mb-4">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Current Score
                </span>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                  {userProfile.currentScore}
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">(Self-reported)</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Target Score
                </span>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                  {userProfile.targetScore}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2 mt-auto">
              <div className="w-full bg-indigo-50 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${scoreProgressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-indigo-600 dark:text-indigo-400">
                  {pointsToTarget} points to go
                </span>
                <span className="text-slate-400">{userProfile.targetScore}</span>
              </div>
            </div>
          </div>

          {/* Accuracy Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col items-center justify-center text-center">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white self-start w-full text-left mb-2">
              Accuracy
            </h2>
            <div className="relative w-24 h-24 mb-3">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="10" fill="none" />
                <circle cx="50" cy="50" r="40" className="stroke-indigo-600 dark:stroke-indigo-500" strokeWidth="10" fill="none" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * 72) / 100} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">72%</span>
                <span className="text-[10px] text-slate-500">Overall</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <ArrowRight className="w-3 h-3 -rotate-45" />
              <span>8% from last week</span>
            </span>
          </div>

          {/* Weakest Area Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                Weakest Area
              </h2>
              <div className="text-lg font-bold text-orange-500 dark:text-orange-400 mb-1">
                Geometry
              </div>
              <div className="text-xs font-semibold text-slate-500 mb-3 flex items-center gap-2">
                <span>43% Accuracy</span>
              </div>
              <div className="flex gap-1 mb-4">
                <div className="h-1.5 w-6 rounded-full bg-orange-500"></div>
                <div className="h-1.5 w-6 rounded-full bg-orange-400"></div>
                <div className="h-1.5 w-6 rounded-full bg-orange-300"></div>
                <div className="h-1.5 w-6 rounded-full bg-orange-200 dark:bg-orange-900/50"></div>
                <div className="h-1.5 w-6 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                <div className="h-1.5 w-6 rounded-full bg-slate-100 dark:bg-slate-800"></div>
              </div>
            </div>
            <button 
              onClick={() => onStartPractice('Geometry')}
              className="w-full py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Focus more
            </button>
          </div>
        </div>

        {/* Middle Section: Today's Plan & Weekly Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Today's Plan */}
          <div className="lg:col-span-3 p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Today's Plan
                </h2>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500">
                  <CalendarIcon className="w-3 h-3" />
                  <span>Tuesday, Aug 18</span>
                </div>
              </div>
              <span className="text-xs text-slate-500">
                45 min total
              </span>
            </div>

            <div className="space-y-3">
              {dailyPlan.tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0e1322] flex items-center justify-between gap-3 shadow-2xs hover:border-indigo-200 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-[11px] font-bold shrink-0">
                      {task.number}
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {task.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {task.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      {task.minutes} min
                    </span>
                    <button
                      onClick={() => onStartTask(task)}
                      className="w-16 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
                    >
                      Start
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <span className="text-[11px] text-slate-500 shrink-0">0 of 4 tasks completed</span>
              <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <span className="text-[11px] text-slate-500 shrink-0">0%</span>
            </div>
          </div>

          {/* Weekly Progress & Continue */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Weekly Progress */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Weekly Progress
                </h2>
                <span className="text-xs text-slate-500 border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5">This Week</span>
              </div>
              
              <div className="h-24 flex items-end justify-between gap-1.5 mb-4">
                {[
                  { d: 'M', h: '30px' },
                  { d: 'T', h: '80px' },
                  { d: 'W', h: '20px' },
                  { d: 'T', h: '50px' },
                  { d: 'F', h: '40px' },
                  { d: 'S', h: '10px' },
                  { d: 'S', h: '60px' }
                ].map((bar, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 w-full">
                    <div className="w-full bg-indigo-400 rounded-t-sm transition-all" style={{ height: bar.h }}></div>
                    <span className="text-[10px] font-semibold text-slate-400">{bar.d}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <div className="text-[10px] text-slate-500 mb-0.5">Study Time</div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">5h 30m</span>
                    <span className="text-[10px] text-emerald-500 flex items-center"><ArrowRight className="w-2.5 h-2.5 -rotate-90" /> 1h 10m</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 mb-0.5">Questions Solved</div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">156</span>
                    <span className="text-[10px] text-emerald-500 flex items-center"><ArrowRight className="w-2.5 h-2.5 -rotate-90" /> 42</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/20 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs shrink-0">
                  <Play className="w-4 h-4 fill-indigo-600 text-indigo-600 ml-1" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Continue where you left off</h3>
                  <p className="text-xs text-indigo-100">Quadratics - Practice Set</p>
                  <p className="text-[10px] text-indigo-200">Question 7 of 10</p>
                </div>
              </div>
              <button 
                onClick={() => onStartPractice('Quadratics')}
                className="w-full py-2 bg-white text-indigo-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row: Topic Performance, Recent Mistakes, Quick Practice */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Topic Performance */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Topic Performance</h2>
              <button className="text-xs text-slate-500 border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5">View all</button>
            </div>
            <div className="space-y-4 flex-1">
              {[
                { name: 'Algebra', val: 84, color: 'bg-emerald-500', icon: <Layers className="w-4 h-4 text-emerald-500" /> },
                { name: 'Advanced Math', val: 63, color: 'bg-blue-500', icon: <BarChart className="w-4 h-4 text-blue-500" /> },
                { name: 'Problem Solving', val: 76, color: 'bg-amber-500', icon: <Target className="w-4 h-4 text-amber-500" /> },
                { name: 'Geometry', val: 43, color: 'bg-rose-500', icon: <AlertCircle className="w-4 h-4 text-rose-500" /> },
              ].map(topic => (
                <div key={topic.name}>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      {topic.icon}
                      <span>{topic.name}</span>
                    </div>
                    <span>{topic.val}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className={`${topic.color} h-full rounded-full`} style={{ width: `${topic.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Mistakes */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Recent Mistakes</h2>
              <button className="text-xs text-slate-500 border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5">View all</button>
            </div>
            <div className="space-y-3 flex-1">
              {[
                { topic: 'Quadratics', sub: 'Solving equations', time: 'Aug 18, 10:30 AM', icon: <span className="text-rose-500">✕</span> },
                { topic: 'Geometry', sub: 'Triangles', time: 'Aug 17, 4:20 PM', icon: <span className="text-emerald-500 flex items-center justify-center">⟳</span> },
                { topic: 'Functions', sub: 'Function notation', time: 'Aug 17, 11:15 AM', icon: <span className="text-slate-500 text-lg">ƒ</span> }
              ].map((mistake, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700 text-sm font-bold">
                      {mistake.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{mistake.topic}</h4>
                      <p className="text-[10px] text-slate-500">{mistake.sub}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <div>
                      <span className="text-[10px] text-rose-500 font-semibold block">Incorrect</span>
                      <span className="text-[9px] text-slate-400">{mistake.time}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Practice */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Quick Practice</h2>
              <button className="text-xs text-slate-500 border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5">Start</button>
            </div>
            <div className="space-y-2 flex-1">
              {[
                { name: '10 Random Questions', min: '10 min', icon: '✨', color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50' },
                { name: 'Mixed Practice', min: '20 min', icon: '🔄', color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/50' },
                { name: 'Weak Areas', min: '20 min', icon: '🎯', color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50' },
                { name: 'Mistake Review', min: '15 min', icon: '📝', color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/50' }
              ].map((prac, i) => (
                <button key={i} onClick={() => onStartPractice()} className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${prac.color}`}>
                      {prac.icon}
                    </div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{prac.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">{prac.min}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar Column */}
      <div className="w-full xl:w-[280px] shrink-0 space-y-5">
        
        {/* Date Badge */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center">
            <CalendarIcon className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-slate-900 dark:text-white font-display leading-none">87</div>
            <div className="text-[10px] text-slate-500 font-semibold mt-1">Days until SAT<br/>Aug 22, 2026</div>
          </div>
        </div>

        {/* Study Streak */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Study Streak</h2>
          </div>
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">7</span>
            <span className="text-sm font-semibold text-slate-500">days</span>
          </div>
          <p className="text-[11px] text-slate-500 mb-4">Keep it up! 🔥</p>
          
          <div className="flex items-center justify-between">
            {[
              { d: 'M', active: true }, { d: 'T', active: true }, { d: 'W', active: true },
              { d: 'T', active: true }, { d: 'F', active: true }, { d: 'S', active: false }, { d: 'S', active: false }
            ].map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-semibold text-slate-400">{day.d}</span>
                {day.active ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mini Calendar */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">August 2026</h2>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded bg-slate-50 dark:bg-slate-800 text-slate-500"><ChevronLeft className="w-3.5 h-3.5" /></button>
              <button className="p-1 rounded bg-slate-50 dark:bg-slate-800 text-slate-500"><ChevronRight className="w-3.5 h-3.5" /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d} className="text-[9px] font-semibold text-slate-400">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {[26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29].map((day, i) => {
              const isToday = day === 18 && i >= 6 && i <= 36;
              return (
                <div key={i} className={`text-xs py-1.5 rounded-full ${isToday ? 'bg-indigo-600 text-white font-bold' : (i < 6) ? 'text-slate-300 dark:text-slate-600' : 'text-slate-600 dark:text-slate-300'}`}>
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Test */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-indigo-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Upcoming Test</h2>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-500 block mb-0.5 text-[10px]">SAT Test Date</span>
              <span className="font-bold text-slate-900 dark:text-white">Aug 22, 2026</span>
            </div>
            <span className="text-[10px] text-slate-400">87 days to go</span>
          </div>
        </div>

        {/* AI Coach snippet */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-indigo-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">AI Coach</h2>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Need help with a question?<br/>Ask our AI tutor anything.
          </p>
          <button 
            onClick={() => onSelectTab('ai_coach')}
            className="w-full mt-1 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Ask AI Coach &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};
