import React, { useState } from 'react';
import { X, Search, Bookmark, Copy, Check } from 'lucide-react';
import { MATHBOOK_FORMULAS } from '../../data/formulas';
import { MathText } from '../common/MathText';
import { SubjectSection } from '../../types';

interface FormulaDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormulaDrawer: React.FC<FormulaDrawerProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<SubjectSection | 'All'>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredFormulas = MATHBOOK_FORMULAS.filter((formula) => {
    const matchesSection = selectedSection === 'All' || formula.section === selectedSection;
    const matchesSearch =
      formula.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formula.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formula.latex.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formula.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSection && matchesSearch;
  });

  const handleCopy = (latex: string, id: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white dark:bg-[#0e1322] shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                MathBook 3.0 Formulas
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official Digital SAT reference sheet & tested formulas
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search and filters */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800/60 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search formulas (e.g. vertex, slope, circle, cos)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Section tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              {(['All', 'Algebra', 'Advanced Math', 'Problem Solving', 'Geometry & Trigonometry'] as const).map((sec) => (
                <button
                  key={sec}
                  onClick={() => setSelectedSection(sec)}
                  className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedSection === sec
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          {/* Formulas list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {filteredFormulas.length === 0 ? (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm">
                No formulas matching your search.
              </div>
            ) : (
              filteredFormulas.map((f) => (
                <div
                  key={f.id}
                  className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-300 dark:hover:border-indigo-800/60 transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                        {f.topic}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                        {f.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleCopy(f.latex, f.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                      title="Copy LaTeX"
                    >
                      {copiedId === f.id ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Math Equation */}
                  <div className="p-3 rounded-lg bg-white dark:bg-[#0a0d16] border border-slate-200/60 dark:border-slate-800/60 my-2 text-center overflow-x-auto text-slate-900 dark:text-slate-100">
                    <MathText displayMode>{f.latex}</MathText>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line mt-2">
                    <MathText>{f.description}</MathText>
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
