import React, { useState } from 'react';
import { Layers, ArrowRight, ChevronDown, ChevronRight, Play } from 'lucide-react';
import { MATHBOOK_TOPICS, MATHBOOK_QUESTIONS } from '../../data/questions';
import { SubjectSection } from '../../types';

interface TopicBrowserViewProps {
  onStartPracticeTopic: (topicName: string) => void;
}

export const TopicBrowserView: React.FC<TopicBrowserViewProps> = ({ onStartPracticeTopic }) => {
  const [expandedSection, setExpandedSection] = useState<SubjectSection | null>(null);

  const sections: SubjectSection[] = [
    'Algebra',
    'Advanced Math',
    'Problem Solving',
    'Geometry & Trigonometry'
  ];

  const toggleSection = (sec: SubjectSection) => {
    setExpandedSection(prev => prev === sec ? null : sec);
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            MathBook 3.0 Topics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            21 Digital SAT Math categories verified from real exam question sets
          </p>
        </div>
      </div>

      {/* Main Topics Accordion */}
      <div className="space-y-4">
        {sections.map((sec) => {
          const isExpanded = expandedSection === sec;
          const sectionTopics = MATHBOOK_TOPICS.filter(t => t.section === sec);
          const totalQuestions = sectionTopics.reduce((sum, t) => sum + t.count, 0);

          return (
            <div key={sec} className="rounded-3xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs overflow-hidden transition-all">
              <button
                onClick={() => toggleSection(sec)}
                className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isExpanded ? 'bg-indigo-600 text-white' : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                  }`}>
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {sec}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {sectionTopics.length} Subtopics • {totalQuestions} Questions
                    </p>
                  </div>
                </div>
                <div className="text-slate-400">
                  {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </div>
              </button>

              {isExpanded && (
                <div className="p-5 sm:p-6 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sectionTopics.map((topic) => {
                      const loadedCount = MATHBOOK_QUESTIONS.filter(q => q.topic.toLowerCase() === topic.name.toLowerCase()).length;

                      return (
                        <div
                          key={topic.id}
                          className="p-5 rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800 transition-all flex flex-col justify-between group"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-400">
                                {topic.count} questions
                              </span>
                            </div>

                            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {topic.name}
                            </h3>
                          </div>

                          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                            <span className="text-xs text-slate-400">
                              {loadedCount > 0 ? `${loadedCount} verified active` : 'Ready in bank'}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onStartPracticeTopic(topic.name);
                              }}
                              className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform"
                            >
                              <span>Practice</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
