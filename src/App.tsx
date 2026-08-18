import React, { useState, useEffect } from 'react';
import { Sidebar, NavTab } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { Dashboard } from './components/dashboard/Dashboard';
import { QuestionPracticeView } from './components/practice/QuestionPracticeView';
import { StudyPlanView } from './components/studyplan/StudyPlanView';
import { AITutorView } from './components/aitutor/AITutorView';
import { ProgressView } from './components/progress/ProgressView';
import { TopicBrowserView } from './components/topics/TopicBrowserView';
import { MistakesView } from './components/mistakes/MistakesView';
import { FormulaLibraryView } from './components/formulas/FormulaLibraryView';
import { BookmarksView } from './components/bookmarks/BookmarksView';
import { SettingsView } from './components/settings/SettingsView';
import { LandingPage } from './components/landing/LandingPage';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { DiagnosticTestModal } from './components/diagnostic/DiagnosticTestModal';
import { FormulaDrawer } from './components/formulas/FormulaDrawer';
import { 
  UserProfile, 
  DailyPlan, 
  DailyTask, 
  Question, 
  SubjectSection 
} from './types';
import { 
  getStoredProfile, 
  saveProfile, 
  getStoredDailyPlan, 
  saveDailyPlan, 
  toggleTaskCompleted, 
  DEFAULT_PROFILE,
  DEFAULT_DAILY_PLAN
} from './services/storage';
import { MATHBOOK_QUESTIONS } from './data/questions';

export function App() {
  // Main view: 'landing' or 'app'
  const [appMode, setAppMode] = useState<'landing' | 'app'>('app');
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');

  // Modals & Drawers
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [showDiagnostic, setShowDiagnostic] = useState<boolean>(false);
  const [showFormulaDrawer, setShowFormulaDrawer] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Persistent user state
  const [userProfile, setUserProfile] = useState<UserProfile>(getStoredProfile);
  const [dailyPlan, setDailyPlan] = useState<DailyPlan>(getStoredDailyPlan);

  // Context passing for Practice and AI Tutor
  const [activePracticeTopic, setActivePracticeTopic] = useState<string | undefined>(undefined);
  const [activePracticeQuestionId, setActivePracticeQuestionId] = useState<string | undefined>(undefined);
  const [tutorContextQuestion, setTutorContextQuestion] = useState<Question | undefined>(undefined);
  const [tutorInitialPrompt, setTutorInitialPrompt] = useState<string | undefined>(undefined);

  // Dark / Light Theme
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const stored = localStorage.getItem('satmate_theme');
      return (stored as 'dark' | 'light') || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('satmate_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  };

  // Handlers
  const handleStartTask = (task: DailyTask) => {
    if (task.type === 'learn') {
      // Switch to AI Tutor
      setTutorContextQuestion(MATHBOOK_QUESTIONS[0]);
      setTutorInitialPrompt(`Let's study ${task.topic || 'Quadratics: Number of solutions'}`);
      setCurrentTab('ai_coach');
    } else if (task.questionIds && task.questionIds.length > 0) {
      setActivePracticeQuestionId(task.questionIds[0]);
      setActivePracticeTopic(task.topic);
      setCurrentTab('practice');
    } else {
      setActivePracticeTopic(task.topic);
      setCurrentTab('practice');
    }
  };

  const handleStartPracticeWithTopic = (topicName?: string) => {
    setActivePracticeTopic(topicName);
    setActivePracticeQuestionId(undefined);
    setCurrentTab('practice');
  };

  const handleStartPracticeQuestion = (questionId: string) => {
    setActivePracticeQuestionId(questionId);
    setActivePracticeTopic(undefined);
    setCurrentTab('practice');
  };

  const handleOpenAITutorWithContext = (question: Question, userMsg?: string) => {
    setTutorContextQuestion(question);
    setTutorInitialPrompt(userMsg || `I need help understanding this ${question.topic} question.`);
    setCurrentTab('ai_coach');
  };

  const handleToggleTask = (taskId: string) => {
    const updatedPlan = toggleTaskCompleted(taskId);
    setDailyPlan(updatedPlan);

    // Sync with User Profile Progress
    const task = updatedPlan.tasks.find(t => t.id === taskId);
    if (task && task.completed) {
      const updatedProfile = {
        ...userProfile,
        studyTimeMinutes: userProfile.studyTimeMinutes + task.minutes,
        totalQuestionsPracticed: userProfile.totalQuestionsPracticed + (task.type === 'practice' ? 10 : 0)
      };
      saveProfile(updatedProfile);
      setUserProfile(updatedProfile);
    } else if (task && !task.completed) {
      const updatedProfile = {
        ...userProfile,
        studyTimeMinutes: Math.max(0, userProfile.studyTimeMinutes - task.minutes),
        totalQuestionsPracticed: Math.max(0, userProfile.totalQuestionsPracticed - (task.type === 'practice' ? 10 : 0))
      };
      saveProfile(updatedProfile);
      setUserProfile(updatedProfile);
    }
  };

  const handleCompleteOnboarding = (newProfile: UserProfile, launchDiagnostic: boolean) => {
    setUserProfile(newProfile);
    setShowOnboarding(false);
    setAppMode('app');
    if (launchDiagnostic) {
      setShowDiagnostic(true);
    } else {
      setCurrentTab('dashboard');
    }
  };

  const handleCompleteDiagnostic = (scores: Record<SubjectSection, number>) => {
    const updated: UserProfile = {
      ...userProfile,
      completedDiagnostic: true,
      diagnosticScores: scores,
    };
    saveProfile(updated);
    setUserProfile(updated);
    setCurrentTab('study_plan');
  };

  // If on landing page
  if (appMode === 'landing') {
    return (
      <>
        <LandingPage
          onStartOnboarding={() => setShowOnboarding(true)}
          onExploreApp={() => {
            setAppMode('app');
            setCurrentTab('dashboard');
          }}
          onOpenSignIn={() => {
            setAppMode('app');
            setCurrentTab('dashboard');
          }}
        />

        <OnboardingModal
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          onComplete={handleCompleteOnboarding}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070a13] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Sidebar (Desktop + Mobile slide-over) */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'calendar') {
            setCurrentTab('study_plan');
          } else {
            setCurrentTab(tab);
          }
        }}
        userProfile={userProfile}
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Layout Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Sticky Top Header */}
        <Header
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
          userProfile={userProfile}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenFormulas={() => setShowFormulaDrawer(true)}
          onStartDiagnostic={() => setShowDiagnostic(true)}
          onOpenSettings={() => setCurrentTab('settings')}
        />

        {/* Dynamic Main Body Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <Dashboard
              userProfile={userProfile}
              dailyPlan={dailyPlan}
              onSelectTab={setCurrentTab}
              onStartTask={handleStartTask}
              onToggleTaskCompleted={handleToggleTask}
              onStartPractice={handleStartPracticeWithTopic}
            />
          )}

          {currentTab === 'study_plan' && (
            <StudyPlanView
              dailyPlan={dailyPlan}
              userProfile={userProfile}
              onStartTask={handleStartTask}
              onToggleTaskCompleted={handleToggleTask}
            />
          )}

          {currentTab === 'practice' && (
            <QuestionPracticeView
              initialQuestionId={activePracticeQuestionId}
              topicFilter={activePracticeTopic}
              onBackToDashboard={() => setCurrentTab('dashboard')}
              onOpenAITutorWithContext={handleOpenAITutorWithContext}
              onOpenFormulas={() => setShowFormulaDrawer(true)}
            />
          )}

          {currentTab === 'ai_coach' && (
            <AITutorView
              currentQuestion={tutorContextQuestion}
              initialPrompt={tutorInitialPrompt}
              onOpenFormulas={() => setShowFormulaDrawer(true)}
            />
          )}

          {currentTab === 'progress' && (
            <ProgressView
              userProfile={userProfile}
              onStartPracticeTopic={handleStartPracticeWithTopic}
            />
          )}

          {currentTab === 'topics' && (
            <TopicBrowserView
              onStartPracticeTopic={handleStartPracticeWithTopic}
            />
          )}

          {currentTab === 'mistakes' && (
            <MistakesView
              onStartPracticeQuestion={handleStartPracticeQuestion}
              onOpenAITutorWithContext={(q) => handleOpenAITutorWithContext(q)}
            />
          )}

          {currentTab === 'formulas' && (
            <FormulaLibraryView />
          )}

          {currentTab === 'bookmarks' && (
            <BookmarksView
              onStartPracticeQuestion={handleStartPracticeQuestion}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              userProfile={userProfile}
              onUpdateProfile={setUserProfile}
              onResetOnboarding={() => setShowOnboarding(true)}
              onRetakeDiagnostic={() => setShowDiagnostic(true)}
            />
          )}
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <MobileNav
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onOpenMoreMenu={() => setMobileSidebarOpen(true)}
        />
      </div>

      {/* Global Modals and Drawers */}
      <FormulaDrawer
        isOpen={showFormulaDrawer}
        onClose={() => setShowFormulaDrawer(false)}
      />

      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleCompleteOnboarding}
      />

      <DiagnosticTestModal
        isOpen={showDiagnostic}
        onClose={() => setShowDiagnostic(false)}
        onCompleteDiagnostic={handleCompleteDiagnostic}
      />
    </div>
  );
}
export default App;
