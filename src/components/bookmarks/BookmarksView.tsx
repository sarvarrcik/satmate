import React from 'react';
import { Bookmark, Play, Trash2, ArrowRight } from 'lucide-react';
import { MATHBOOK_QUESTIONS } from '../../data/questions';
import { MathText } from '../common/MathText';
import { getStoredBookmarks, toggleBookmark } from '../../services/storage';

interface BookmarksViewProps {
  onStartPracticeQuestion: (questionId: string) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({ onStartPracticeQuestion }) => {
  const [bookmarkedIds, setBookmarkedIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    setBookmarkedIds(getStoredBookmarks());
  }, []);

  const bookmarkedQuestions = MATHBOOK_QUESTIONS.filter(q => bookmarkedIds.includes(q.id));

  const handleRemoveBookmark = (id: string) => {
    toggleBookmark(id);
    setBookmarkedIds(getStoredBookmarks());
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
          Bookmarked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Questions you saved for deeper review and spaced repetition
        </p>
      </div>

      {bookmarkedQuestions.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 space-y-3">
          <Bookmark className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
            No bookmarks yet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Save difficult or high-yield questions while solving to review them here anytime.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarkedQuestions.map((q) => (
            <div
              key={q.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4 hover:border-indigo-300 dark:hover:border-indigo-800/80 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-lg">
                  {q.section} • {q.topic}
                </span>
                <button
                  onClick={() => handleRemoveBookmark(q.id)}
                  className="text-xs font-semibold text-slate-400 hover:text-rose-500 transition-colors"
                >
                  Remove
                </button>
              </div>

              <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                <MathText>{q.text}</MathText>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60">
                <span className="text-xs text-slate-400">
                  Correct answer: <strong className="font-bold text-slate-700 dark:text-slate-300">{q.correctAnswer}</strong>
                </span>

                <button
                  onClick={() => onStartPracticeQuestion(q.id)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xs transition-all"
                >
                  <span>Practice Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
