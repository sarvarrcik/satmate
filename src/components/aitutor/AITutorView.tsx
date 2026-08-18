import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Trash2, HelpCircle, ChevronRight, BookOpen, Lightbulb, User, Bot } from 'lucide-react';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

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
        text: `Hi Alex! I'm your SAT Math AI Coach. We are focusing on **${activeQuestion.topic}**. What part of this question would you like to explore together?`,
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
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8.5rem)] min-h-[600px] bg-white dark:bg-[#0e1322] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-xs overflow-hidden animate-in fade-in duration-200">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-[1px] shadow-sm">
            <div className="w-full h-full rounded-[15px] bg-[#0e1322] flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Socratic AI Coach
              <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                GPT-4 Turbo
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Guiding you through • {activeQuestion.topic}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenFormulas}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            <span>Formulas</span>
          </button>
          <button
            onClick={handleClearChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/30 dark:bg-transparent">
        {/* Context banner for active question */}
        <div className="mx-auto max-w-3xl p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 shrink-0">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider block mb-1">Active Question</span>
            <MathText>{activeQuestion.text}</MathText>
          </div>
        </div>

        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2.5 max-w-3xl mx-auto ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                isUser ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-2xs ${
                  isUser
                    ? 'bg-indigo-600 text-white font-medium rounded-br-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 rounded-bl-sm'
                }`}
              >
                <MathText>{msg.text}</MathText>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-end gap-2.5 max-w-3xl mx-auto">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="px-5 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-bl-sm flex items-center gap-2 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts & Socratic Hints */}
      <div className="px-4 pt-3 pb-2 bg-slate-50 dark:bg-[#0b0f19] border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto flex flex-wrap gap-2 mb-2">
          {suggestedPrompts.map(prompt => (
            <button
              key={prompt}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="max-w-3xl mx-auto flex gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => handleTriggerHint(1)}
            className="flex flex-1 items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
          >
            <span>Hint 1: Concept</span>
          </button>
          <button
            onClick={() => handleTriggerHint(2)}
            className="flex flex-1 items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
          >
            <span>Hint 2: Strategy</span>
          </button>
          <button
            onClick={() => handleTriggerHint(3)}
            className="flex flex-1 items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
          >
            <span>Hint 3: Almost there</span>
          </button>
        </div>
      </div>

      {/* Input box */}
      <div className="p-4 bg-white dark:bg-[#0e1322]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="max-w-3xl mx-auto flex items-center gap-2 relative"
        >
          <input
            type="text"
            placeholder="Type your answer or ask for an explanation..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 px-5 py-3.5 pr-12 text-sm rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-2 p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
