import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  BarChart2, 
  Calendar, 
  BrainCircuit, 
  ShieldCheck, 
  Star,
  Play,
  RotateCcw,
  Zap
} from 'lucide-react';
import { MathText } from '../common/MathText';

interface LandingPageProps {
  onStartOnboarding: () => void;
  onExploreApp: () => void;
  onOpenSignIn: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartOnboarding,
  onExploreApp,
  onOpenSignIn
}) => {
  return (
    <div className="min-h-screen bg-[#070a13] text-white selection:bg-indigo-500 selection:text-white flex flex-col justify-between">
      {/* Top Navbar (Matching Screenshot) */}
      <header className="max-w-7xl w-full mx-auto px-6 sm:px-8 py-5 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={onExploreApp}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white font-display">
            SATMATE
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>

        {/* Sign In Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSignIn}
            className="px-5 py-2 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold transition-all hover:bg-slate-800/60"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section (Matching Screenshot) */}
      <main className="max-w-7xl w-full mx-auto px-6 sm:px-8 py-8 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1">
        {/* Left Hero Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-xs font-semibold text-indigo-300 shadow-sm shadow-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI-Powered SAT Math Coach</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white leading-[1.1]">
            Stop wondering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
              what to study for
            </span> <br />
            SAT Math.
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
            Tell us your score, your goal, your exam date, and your schedule. SATMate builds your personalized path to test day — and adapts as you improve.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onStartOnboarding}
              id="hero-cta-build-plan"
              className="px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/40 transition-all active:scale-95 flex items-center gap-2.5"
            >
              <span>Build My Study Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreApp}
              id="hero-cta-explore"
              className="px-6 sm:px-7 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white font-semibold text-sm sm:text-base transition-all"
            >
              Explore SAT Math
            </button>
          </div>
        </div>

        {/* Right Hero Preview Card (Matching Screenshot: Today's Plan, 2/4 tasks completed, Mini calendar) */}
        <div className="lg:col-span-5">
          <div className="relative p-6 sm:p-7 rounded-3xl bg-[#0e1424]/90 border border-slate-800/90 shadow-2xl backdrop-blur-xl space-y-5">
            {/* Ambient glow */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Today's Plan</h3>
                <p className="text-xs text-slate-400">Tuesday, Aug 18 • 45 min available</p>
              </div>

              {/* Progress ring badge */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-indigo-950/60 border border-indigo-800/60 text-xs font-bold text-indigo-300">
                <span>2/4</span>
                <span className="text-[10px] text-slate-400 font-normal">tasks completed</span>
              </div>
            </div>

            {/* 4 Preview Task Rows */}
            <div className="space-y-2.5">
              {[
                { num: 1, title: 'Review mistakes', desc: '10 min', done: true },
                { num: 2, title: 'Learn Quadratics', desc: '10 min', done: true },
                { num: 3, title: 'Practice 8 questions', desc: '20 min', done: false },
                { num: 4, title: 'Quick review 3 questions', desc: '5 min', done: false },
              ].map((task) => (
                <div
                  key={task.num}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs transition-all ${
                    task.done
                      ? 'bg-slate-900/40 border-slate-800/60 text-slate-400'
                      : 'bg-slate-900/90 border-slate-700/80 text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                      task.done ? 'bg-emerald-950 text-emerald-400' : 'bg-indigo-950 text-indigo-400'
                    }`}>
                      {task.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : task.num}
                    </div>
                    <span className="font-semibold">{task.title}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px]">{task.desc}</span>
                    <button 
                      onClick={onExploreApp}
                      className="px-2.5 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-semibold"
                    >
                      {task.done ? 'Done' : 'Start'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini Calendar Preview (August 2026) */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold text-slate-300">&lt; August 2026 &gt;</span>
                <span className="text-[10px] text-emerald-400">7-day streak 🔥</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-500">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d, i) => (
                  <div key={i} className="py-0.5">{d}</div>
                ))}
                {[27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].slice(14, 28).map((d, idx) => (
                  <div 
                    key={idx} 
                    className={`py-1 rounded-md ${
                      d === 18 ? 'bg-indigo-600 text-white font-bold' : d < 18 ? 'text-emerald-400 bg-emerald-950/30' : 'text-slate-400'
                    }`}
                  >
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 4 Feature Pillars (Matching Screenshot: Personalized Plan, AI Tutor, Adaptive Practice, Track Progress) */}
      <section id="features" className="max-w-7xl w-full mx-auto px-6 sm:px-8 py-10 border-t border-slate-800/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Personalized Plan</h4>
            <p className="text-xs text-slate-400">Built for you</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">AI Tutor</h4>
            <p className="text-xs text-slate-400">Explains everything</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Adaptive Practice</h4>
            <p className="text-xs text-slate-400">Focus on weak areas</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center">
              <BarChart2 className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">Track Progress</h4>
            <p className="text-xs text-slate-400">See real improvement</p>
          </div>
        </div>
      </section>

      {/* Social Proof Footer Bar (Matching Screenshot) */}
      <footer className="max-w-7xl w-full mx-auto px-6 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400 border-t border-slate-800/40">
        <div className="flex items-center gap-3">
          {/* Avatar stack */}
          <div className="flex -space-x-2 overflow-hidden">
            {['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces',
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces',
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces',
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces'
            ].map((imgUrl, i) => (
              <img key={i} className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src={imgUrl} alt="User" />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-slate-200">4.9/5</span>
            <span>from 1,250+ students</span>
          </div>
        </div>

        <div className="text-slate-500 text-[11px]">
          Questions verified from MathBook 3.0. Digital SAT is a registered trademark of the College Board.
        </div>
      </footer>
    </div>
  );
};
