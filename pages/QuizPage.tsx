
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { QuizQuestion } from '../components/QuizQuestion';
import { Trophy, X, Loader2 } from 'lucide-react';
import { generateSportsQuiz } from '../services/geminiService';
import { QuizQuestionData } from '../types';

interface QuizPageProps {
  sport: string;
  onComplete: (correct: boolean) => void;
  onQuit: () => void;
}

export function QuizPage({ sport, onComplete, onQuit }: QuizPageProps) {
  const [question, setQuestion] = useState<QuizQuestionData | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>();
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      const q = await generateSportsQuiz(sport);
      setQuestion(q);
      setLoading(false);
    };
    fetchQuestion();
  }, [sport]);

  const handleSubmit = () => {
    if (selectedAnswer === undefined) return;
    setShowResult(true);
    setTimeout(() => {
      onComplete(selectedAnswer === question?.correctAnswer);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
        <h2 className="text-2xl font-black text-white uppercase italic">Gemini is drafting...</h2>
        <p className="text-indigo-300">Generating dynamic {sport} trivia</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto">
      <div className="flex-shrink-0 px-4 pt-6 pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Gemini Quiz</p>
              <h1 className="text-2xl font-black uppercase text-white">TRIVIA</h1>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onQuit} className="!px-2">
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-32">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-amber-600 to-amber-500 rounded-2xl p-4 text-center mb-6 shadow-lg">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-100 mb-1">Wrong Answer Penalty</p>
          <p className="text-3xl font-black text-white">{question?.penalty || '2 SIPS'}</p>
        </motion.div>

        {question && (
          <QuizQuestion
            question={question.text}
            options={question.options}
            onAnswer={setSelectedAnswer}
            selectedAnswer={selectedAnswer}
            correctAnswer={question.correctAnswer}
            showResult={showResult}
          />
        )}

        {showResult && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-6">
            <div className={`p-6 rounded-2xl text-center ${selectedAnswer === question?.correctAnswer ? 'bg-emerald-600' : 'bg-rose-600'}`}>
              <p className="text-2xl font-black uppercase text-white">
                {selectedAnswer === question?.correctAnswer ? '🎉 LEGEND!' : '❌ REJECTED!'}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {!showResult && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent">
          <div className="max-w-md mx-auto">
            <Button
              variant="success"
              size="xl"
              fullWidth
              onClick={handleSubmit}
              disabled={selectedAnswer === undefined}
              className="!bg-amber-500 hover:!bg-amber-400 shadow-[0_4px_0_rgb(146,64,14)]"
            >
              LOCK IN
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
