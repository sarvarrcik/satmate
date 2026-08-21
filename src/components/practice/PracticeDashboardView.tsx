import React from 'react';
import { 
  CalendarRange, 
  BookOpen, 
  Target, 
  AlertCircle, 
  Shuffle, 
  Clock, 
  ClipboardList, 
  Bookmark,
  Play,
  Layers,
  ArrowRight
} from 'lucide-react';
import { NavTab } from '../layout/Sidebar';

interface PracticeDashboardViewProps {
  onStartPractice: (mode: string) => void;
  onSelectTab: (tab: NavTab) => void;
}

export const PracticeDashboardView: React.FC<PracticeDashboardViewProps> = ({
  onStartPractice,
  onSelectTab
}) => {
  const practiceModes = [
    { id: 'today', label: "Today's Plan", desc: 'Follow your daily study plan', icon: <CalendarRange className="w-5 h-5 text-indigo-500" />, color: 'bg-indigo-50 dark:bg-indigo-950/50' },
    { id: 'topic', label: 'Topic Practice', desc: 'Practice specific topics', icon: <BookOpen className="w-5 h-5 text-emerald-500" />, color: 'bg-emerald-50 dark:bg-emerald-950/50' },
    { id: 'weak', label: 'Weak Areas', desc: 'Focus on your weak topics', icon: <Target className="w-5 h-5 text-rose-500" />, color: 'bg-rose-50 dark:bg-rose-950/50' },
    { id: 'mistake', label: 'Mistake Review', desc: 'Review questions you got wrong', icon: <AlertCircle className="w-5 h-5 text-amber-500" />, color: 'bg-amber-50 dark:bg-amber-950/50' },
    { id: 'random', label: 'Random Practice', desc: 'Random questions from all topics', icon: <Shuffle className="w-5 h-5 text-purple-500" />, color: 'bg-purple-50 dark:bg-purple-950/50' },
    { id: 'timed', label: 'Timed Practice', desc: 'Practice with a time limit', icon: <Clock className="w-5 h-5 text-blue-500" />, color: 'bg-blue-50 dark:bg-blue-950/50' },
    { id: 'test', label: 'Test Mode', desc: 'Simulate real SAT experience', icon: <ClipboardList className="w-5 h-5 text-indigo-500" />, color: 'bg-indigo-50 dark:bg-indigo-950/50' },
    { id: 'bookmarks', label: 'Bookmarks', desc: 'Practice your bookmarked questions', icon: <Bookmark className="w-5 h-5 text-orange-500" />, color: 'bg-orange-50 dark:bg-orange-950/50' },
  ];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight mb-1">
            Practice
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Choose a mode and start practicing
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search topics..." 
              className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1322] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1322] text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-xs">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">Practice Modes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {practiceModes.map(mode => (
            <button 
              key={mode.id}
              onClick={() => onStartPractice(mode.id)}
              className="p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all text-left flex flex-col h-full group"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${mode.color} transition-transform group-hover:scale-110`}>
                {mode.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                {mode.label}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {mode.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">Continue Practicing</h2>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex items-center justify-between gap-4 flex-1">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center shrink-0">
                <Layers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">Quadratics</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 truncate">Solving equations</p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-semibold text-slate-500">6 / 15 questions</span>
                  <div className="w-32 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <button 
              onClick={() => onStartPractice('topic')}
              className="px-6 py-2 rounded-xl border border-indigo-200 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors shrink-0"
            >
              Continue
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Recent Sessions</h2>
            <button className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white">View all &gt;</button>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex-1 space-y-4">
            {[
              { title: 'Quadratics Practice', date: 'May 14, 2024', score: '72%', icon: <Layers className="w-3.5 h-3.5 text-indigo-500" />, color: 'bg-indigo-50 dark:bg-indigo-950/40' },
              { title: 'Geometry - Triangles', date: 'May 13, 2024', score: '45%', icon: <BookOpen className="w-3.5 h-3.5 text-emerald-500" />, color: 'bg-emerald-50 dark:bg-emerald-950/40' },
              { title: 'Mixed Practice', date: 'May 12, 2024', score: '76%', icon: <Shuffle className="w-3.5 h-3.5 text-rose-500" />, color: 'bg-rose-50 dark:bg-rose-950/40' },
            ].map((session, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${session.color}`}>
                    {session.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{session.title}</h4>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block mb-0.5">{session.date}</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{session.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
