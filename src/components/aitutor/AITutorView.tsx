import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Trash2, HelpCircle, ChevronRight, BookOpen, Lightbulb, User, Bot, GraduationCap, X, Target, CheckCircle2 } from 'lucide-react';
import { Question, ChatMessage } from '../../types';
import { MathText } from '../common/MathText';
import { chatWithAITutor, getAIHint } from '../../services/aiService';
import { MATHBOOK_QUESTIONS } from '../../data/questions';

interface AITutorViewProps {
  currentQuestion?: Question;
  initialPrompt?: string;
  onOpenFormulas: () => void;
}

export const AITutorView: React.FC<AITutorViewProps> = ({
  currentQuestion: propQuestion,
  initialPrompt,
  onOpenFormulas
}) => {
  // Default to screenshot's quadratic question if none provided
  const activeQuestion = propQuestion || MATHBOOK_QUESTIONS[0];

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg-1',
        sender: 'user',
        text: initialPrompt || "I don't understand why B is correct.",
        timestamp: Date.now() - 60000
      },
      {
        id: 'msg-2',
        sender: 'tutor',
        text: `Let's start with the concept rather than the calculation.

This question is testing the relationship between the discriminant ($b^2 - 4ac$) and the number of real solutions.

Before I show you the next step:

What must be true about $b^2 - 4ac$ when a quadratic has exactly one real solution?`,
        timestamp: Date.now() - 30000
      }
    ];
  });

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuestionContext, setShowQuestionContext] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, showQuestionContext]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const tutorReply = await chatWithAITutor(
        messages.map(m => ({ sender: m.sender, text: m.text })),
        activeQuestion,
        text
      );

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'tutor',
        text: tutorReply.message,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTriggerHint = async (level: 1 | 2 | 3) => {
    const hintText = await getAIHint(activeQuestion, level);
    const hintTitles = ['Conceptual Clue', 'Strategic Clue', 'Almost-Solution'];
    
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: `Can you give me Hint ${level} (${hintTitles[level - 1]})?`,
      timestamp: Date.now()
    };

    const aiMsg: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      sender: 'tutor',
      text: `**Hint ${level}: ${hintTitles[level - 1]}**\n\n${hintText}`,
      timestamp: Date.now() + 2,
      hintLevel: level
    };

    setMessages(prev => [...prev, userMsg, aiMsg]);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'tutor',
        text: `Hi! I'm your SAT Math AI Coach. We are focusing on **${activeQuestion.topic}**. What part of this question would you like to explore together?`,
        timestamp: Date.now()
      }
    ]);
  };

  const suggestedPrompts = [
    "Explain the first step.",
    "Show me the formula.",
    "Can you give me a similar example?",
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-[calc(100vh-8.5rem)] min-h-[600px] bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-xs overflow-hidden animate-in fade-in duration-200">
      
      {/* Premium Header */}
      <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-[#0e1322] sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h1 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                SATMATE AI Coach
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-[10px] font-bold text-white uppercase tracking-wider">
                Plus
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Socratic Tutor Active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenFormulas}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all shadow-2xs"
          >
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>Formulas</span>
          </button>
          <button
            onClick={handleClearChat}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title="Reset Chat"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 bg-slate-50/50 dark:bg-transparent">
        
        {/* Toggleable Context Banner */}
        {showQuestionContext ? (
          <div className="mx-auto max-w-3xl p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 flex gap-4 relative group">
            <button 
              onClick={() => setShowQuestionContext(false)}
              className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-colors opacity-0 group-hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-indigo-900/40 border border-indigo-100 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 shadow-2xs">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div className="pr-6">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 text-xs uppercase tracking-wider block mb-2">
                Active Question Context
              </span>
              <div className="text-sm text-slate-800 dark:text-slate-200">
                <MathText>{activeQuestion.text}</MathText>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl flex justify-center">
             <button 
                onClick={() => setShowQuestionContext(true)}
                className="px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors shadow-2xs"
             >
               Show Question Context
             </button>
          </div>
        )}

        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-4 max-w-3xl mx-auto ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                isUser ? 'bg-indigo-600 text-white' : 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white'
              }`}>
                {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div
                className={`px-6 py-4 rounded-3xl text-[15px] leading-relaxed shadow-sm max-w-[85%] ${
                  isUser
                    ? 'bg-indigo-600 text-white font-medium rounded-tr-sm'
                    : 'bg-white dark:bg-[#1a1f2e] text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800 rounded-tl-sm'
                }`}
              >
                <MathText>{msg.text}</MathText>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-4 max-w-3xl mx-auto">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div className="px-6 py-5 rounded-3xl rounded-tl-sm bg-white dark:bg-[#1a1f2e] border border-slate-100 dark:border-slate-800 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-500/80 animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-indigo-500/80 animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-indigo-500/80 animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts & Socratic Hints */}
      <div className="bg-white dark:bg-[#0e1322] border-t border-slate-100 dark:border-slate-800 pt-4 pb-2 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {suggestedPrompts.map(prompt => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                className="px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:border-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
            {[
              { level: 1, label: 'Concept Clue', icon: <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> },
              { level: 2, label: 'Strategy Clue', icon: <Target className="w-3.5 h-3.5 text-purple-500" /> },
              { level: 3, label: 'Almost-Solution', icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> }
            ].map(hint => (
              <button
                key={hint.level}
                onClick={() => handleTriggerHint(hint.level as 1|2|3)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#0e1322] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-2xs whitespace-nowrap"
              >
                {hint.icon}
                <span>Hint {hint.level}: {hint.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Input Area */}
      <div className="p-4 sm:p-6 bg-white dark:bg-[#0e1322] pt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="max-w-3xl mx-auto relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-md opacity-0 group-focus-within:opacity-20 transition-opacity duration-500"></div>
          <div className="relative flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 rounded-3xl p-2 shadow-inner focus-within:border-indigo-400 dark:focus-within:border-indigo-500 transition-colors">
            <button type="button" className="p-3 text-slate-400 hover:text-indigo-600 transition-colors shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            
            <input
              type="text"
              placeholder="Ask the AI Coach..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-transparent border-none text-[15px] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-0 px-2"
            />
            
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shrink-0 ml-2"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
