
import React from 'react';
import { motion } from 'framer-motion';

interface QuizQuestionProps {
  question: string;
  options: string[];
  onAnswer: (index: number) => void;
  selectedAnswer?: number;
  correctAnswer?: number;
  showResult?: boolean;
}

export function QuizQuestion({
  question,
  options,
  onAnswer,
  selectedAnswer,
  correctAnswer,
  showResult = false,
}: QuizQuestionProps) {
  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index
        ? 'bg-indigo-600 border-indigo-400'
        : 'bg-slate-800/80 border-slate-700 hover:border-indigo-500';
    }
    if (index === correctAnswer) return 'bg-emerald-600 border-emerald-400';
    if (index === selectedAnswer && index !== correctAnswer) return 'bg-rose-600 border-rose-400';
    return 'bg-slate-800/50 border-slate-700 opacity-50';
  };

  return (
    <div className="w-full space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-indigo-900/50 border border-indigo-500/30 rounded-2xl p-6 text-center"
      >
        <p className="text-xl font-bold text-white leading-relaxed">{question}</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {options.map((option, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => !showResult && onAnswer(index)}
            disabled={showResult}
            className={`p-5 rounded-xl border-2 transition-all duration-200 text-left font-bold text-white ${getOptionStyle(index)} ${!showResult ? 'cursor-pointer active:scale-95' : 'cursor-not-allowed'}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-black">
                {String.fromCharCode(65 + index)}
              </div>
              <span className="flex-1">{option}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
