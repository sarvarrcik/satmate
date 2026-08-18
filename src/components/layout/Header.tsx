import React from 'react';
import { Menu, Moon, Sun, BookOpen, Clock, Sparkles } from 'lucide-react';
import { UserProfile } from '../../types';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  userProfile: UserProfile;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenFormulas: () => void;
  onStartDiagnostic: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  userProfile,
  theme,
  onToggleTheme,
  onOpenFormulas,
  onStartDiagnostic,
  onOpenSettings
}) => {
  // Calculate days until exam (e.g. Aug 22, 2026)
  const daysUntilExam = React.useMemo(() => {
    try {
      const exam = new Date(userProfile.examDate || '2026-08-22');
      const now = new Date();
      const diffTime = exam.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 87;
    } catch {
      return 87;
    }
  }, [userProfile.examDate]);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Adaptive Model Active
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Diagnostic CTA button if not taken or for retake */}
        <button
          onClick={onStartDiagnostic}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/60 dark:border-indigo-800/60 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Diagnostic Test</span>
        </button>

        {/* Formula drawer shortcut */}
        <button
          onClick={onOpenFormulas}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-medium"
          title="Formula Reference Drawer"
        >
          <BookOpen className="w-4 h-4 text-indigo-500" />
          <span className="hidden sm:inline">Formulas</span>
        </button>

        {/* Exam Countdown Badge (Matching Screenshot: 87 Days until SAT Aug 22, 2026) */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/90 shadow-2xs">
          <div className="text-xl sm:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-display leading-none">
            {daysUntilExam}
          </div>
          <div className="text-[10px] leading-tight text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300 block">Days until SAT</span>
            <span>Aug 22, 2026</span>
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle dark/light theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>

        {/* User Profile / Settings */}
        <button
          onClick={onOpenSettings}
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 p-[2px] shadow-sm ml-1 transition-transform hover:scale-105"
        >
          <div className="w-full h-full rounded-full bg-white dark:bg-[#0b0f19] flex items-center justify-center text-[10px] font-bold text-slate-900 dark:text-white">
            {userProfile.name.split(' ').map(n => n[0]).slice(0,2).join('')}
          </div>
        </button>
      </div>
    </header>
  );
};
