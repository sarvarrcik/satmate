import React from 'react';
import { 
  LayoutDashboard, 
  CalendarRange, 
  CheckCircle2, 
  Layers, 
  BarChart2, 
  AlertCircle, 
  Sparkles, 
  BookOpen, 
  Calendar as CalendarIcon, 
  Bookmark, 
  Settings,
  X
} from 'lucide-react';
import { UserProfile } from '../../types';

export type NavTab = 
  | 'dashboard'
  | 'study_plan'
  | 'practice'
  | 'topics'
  | 'progress'
  | 'mistakes'
  | 'ai_coach'
  | 'formulas'
  | 'calendar'
  | 'bookmarks'
  | 'settings';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  userProfile: UserProfile;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  userProfile,
  isOpenMobile,
  onCloseMobile
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'study_plan', label: 'Study Plan', icon: <CalendarRange className="w-5 h-5" /> },
    { id: 'practice', label: 'Practice', icon: <CheckCircle2 className="w-5 h-5" /> },
    { id: 'topics', label: 'Topics', icon: <Layers className="w-5 h-5" /> },
    { id: 'progress', label: 'Progress', icon: <BarChart2 className="w-5 h-5" /> },
    { id: 'mistakes', label: 'Mistakes', icon: <AlertCircle className="w-5 h-5" /> },
    { id: 'ai_coach', label: 'AI Coach', icon: <Sparkles className="w-5 h-5 text-indigo-400" /> },
    { id: 'bookmarks', label: 'Bookmarks', icon: <Bookmark className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-[#0e1322] border-r border-slate-200 dark:border-slate-800/80 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo area */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60">
          <div 
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => {
              onSelectTab('dashboard');
              onCloseMobile();
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-md shadow-indigo-500/25">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white font-display">
              SATMATE
            </span>
          </div>

          <button
            onClick={onCloseMobile}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/40'
                }`}
              >
                <span className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* User profile snippet at bottom */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800/60">
          <div 
            onClick={() => onSelectTab('settings')}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 p-[2px] shadow-xs">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
                {userProfile.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {userProfile.name}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                <span>{userProfile.currentScore}</span>
                <span>&rarr;</span>
                <span className="font-bold">{userProfile.targetScore}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
