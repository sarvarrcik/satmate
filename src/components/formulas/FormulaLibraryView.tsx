import React, { useState } from 'react';
import { Search, BookOpen, Copy, Check, Filter } from 'lucide-react';
import { MATHBOOK_FORMULAS } from '../../data/formulas';
import { MathText } from '../common/MathText';
import { SubjectSection } from '../../types';

export const FormulaLibraryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<SubjectSection | 'All'>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sections: (SubjectSection | 'All')[] = [
    'All',
    'Algebra',
    'Advanced Math',
    'Problem Solving',
    'Geometry & Trigonometry'
  ];

  const filtered = MATHBOOK_FORMULAS.filter(f => {
    const matchesSec = selectedSection === 'All' || f.section === selectedSection;
    const matchesSearch = 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.latex.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSec && matchesSearch;
  });

  const handleCopy = (latex: string, id: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            MathBook 3.0 Formula Library
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Essential formulas, rules, and theorems for Digital SAT Math
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs font-semibold scrollbar-none">
          {sections.map(sec => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                selectedSection === sec
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-[#0e1322] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search formulas (e.g. discriminant, circle, special right triangles)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-white dark:bg-[#0e1322] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
        />
      </div>

      {/* Formulas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(item => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-800/80 transition-all space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  {item.section} • {item.topic}
                </span>
                <button
                  onClick={() => handleCopy(item.latex, item.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Copy LaTeX"
                >
                  {copiedId === item.id ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {item.name}
              </h3>
            </div>

            {/* LaTeX Display */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 text-center overflow-x-auto text-slate-900 dark:text-slate-100">
              <MathText displayMode>{item.latex}</MathText>
            </div>

            {/* Description with KaTeX */}
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
              <MathText>{item.description}</MathText>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
