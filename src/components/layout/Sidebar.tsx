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
  X,
  ChevronRight,
  Crown,
  Check
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
  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'study_plan', label: 'Study Plan', icon: <CalendarRange className="w-5 h-5" /> },
    { id: 'practice', label: 'Practice', icon: <CheckCircle2 className="w-5 h-5" /> },
    { id: 'topics', label: 'Topics', icon: <Layers className="w-5 h-5" /> },
    { id: 'mistakes', label: 'Mistakes', icon: <AlertCircle className="w-5 h-5" /> },
    { id: 'bookmarks', label: 'Bookmarks', icon: <Bookmark className="w-5 h-5" /> },
    { id: 'ai_coach', label: 'AI Coach', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'progress', label: 'Progress', icon: <BarChart2 className="w-5 h-5" /> },
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
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-[#0e1322] border-r border-slate-200 dark:border-slate-800/80 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 overflow-hidden ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo area */}
        <div className="h-16 px-6 flex items-center justify-between">
          <div 
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => {
              onSelectTab('dashboard');
              onCloseMobile();
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-red-500 flex items-center justify-center shadow-md shadow-orange-500/25">
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
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scrollbar-hide">
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
                className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left ${
                  isActive
                    ? 'bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Upgrade to Premium Card */}
          <div className="mt-8 mb-4 p-5 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 mx-1">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-indigo-200" />
              <h3 className="font-bold text-sm">Upgrade to Premium</h3>
            </div>
            <ul className="space-y-1.5 mb-4 mt-3">
              <li className="flex items-center gap-1.5 text-xs text-indigo-100">
                <Check className="w-3.5 h-3.5 text-indigo-200 shrink-0" />
                <span>Access full question bank</span>
              </li>
              <li className="flex items-center gap-1.5 text-xs text-indigo-100">
                <Check className="w-3.5 h-3.5 text-indigo-200 shrink-0" />
                <span>AI explanations</span>
              </li>
              <li className="flex items-center gap-1.5 text-xs text-indigo-100">
                <Check className="w-3.5 h-3.5 text-indigo-200 shrink-0" />
                <span>Advanced analytics</span>
              </li>
            </ul>
            <button className="w-full py-2 bg-white text-indigo-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shadow-xs">
              Upgrade Now
            </button>
          </div>
        </div>

        {/* User profile snippet at bottom */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/60">
          <div 
            onClick={() => onSelectTab('settings')}
            className="flex items-center gap-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100">
              <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${userProfile.name}`} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate leading-tight">
                {userProfile.name}
              </p>
              <p className="text-xs text-slate-500 truncate leading-tight mt-0.5">
                {userProfile.name.toLowerCase().replace(' ', '')}@email.com
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
};
