
import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/Button';
import { Circle, Square, Triangle, Star, CheckCircle2 } from 'lucide-react';

interface MiniGamePageProps {
  ruleName: string;
  onComplete: (success: boolean) => void;
}

const shapes = [
  { icon: Circle, color: 'bg-emerald-500', name: 'circle' },
  { icon: Square, color: 'bg-blue-500', name: 'square' },
  { icon: Triangle, color: 'bg-rose-500', name: 'triangle' },
  { icon: Star, color: 'bg-amber-500', name: 'star' },
];

export function MiniGamePage({ ruleName, onComplete }: MiniGamePageProps) {
  const [timeLeft, setTimeLeft] = useState(8);
  const [gameStarted, setGameStarted] = useState(false);
  const [tappedIndices, setTappedIndices] = useState<Set<number>>(new Set());
  const [gameOver, setGameOver] = useState(false);

  const { grid, targetIndices } = useMemo(() => {
    const gridSize = 16;
    const items = [];
    const numTargets = 4;
    const targets = new Set<number>();
    while (targets.size < numTargets) targets.add(Math.floor(Math.random() * gridSize));
    for (let i = 0; i < gridSize; i++) {
      if (targets.has(i)) items.push({ ...shapes[0], isTarget: true });
      else items.push({ ...shapes[Math.floor(Math.random() * (shapes.length - 1)) + 1], isTarget: false });
    }
    return { grid: items, targetIndices: targets };
  }, []);

  const totalTargets = targetIndices.size;
  const foundTargets = Array.from(tappedIndices).filter(i => targetIndices.has(i)).length;

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setGameOver(true);
      setTimeout(() => onComplete(false), 1500);
    }
  }, [timeLeft, gameStarted, gameOver, onComplete]);

  useEffect(() => {
    if (gameStarted && foundTargets === totalTargets && !gameOver) {
      setGameOver(true);
      setTimeout(() => onComplete(true), 1500);
    }
  }, [foundTargets, totalTargets, gameStarted, gameOver, onComplete]);

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto px-4 py-6">
      {!gameStarted ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-black uppercase text-white">Quick Trigger!</h1>
            <p className="text-xl text-indigo-300 font-bold">Penalty Event: {ruleName}</p>
          </div>
          <div className="bg-indigo-900/50 border border-indigo-500/30 rounded-2xl p-8 space-y-4">
            <p className="text-lg font-bold text-white">Find {totalTargets} GREEN CIRCLES</p>
            <p className="text-xs text-indigo-300 italic">Be fast - last person drinks!</p>
          </div>
          <Button variant="success" size="xl" onClick={() => setGameStarted(true)} className="w-full">Ready!</Button>
        </motion.div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-rose-500 text-white text-3xl font-black shadow-lg">{timeLeft}</div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-lg ${foundTargets === totalTargets ? 'bg-emerald-500' : 'bg-indigo-900/50 border border-indigo-500/30'} text-white`}>
              <CheckCircle2 className="w-5 h-5" /> {foundTargets}/{totalTargets}
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
              {grid.map((item, index) => {
                const Icon = item.icon;
                const isTapped = tappedIndices.has(index);
                const isTarget = targetIndices.has(index);
                return (
                  <motion.button
                    key={index}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      if (gameOver || isTapped) return;
                      setTappedIndices(prev => new Set([...prev, index]));
                    }}
                    className={`aspect-square rounded-xl ${item.color} flex items-center justify-center relative ${isTapped && isTarget ? 'ring-4 ring-white opacity-60' : ''}`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.button>
                );
              })}
            </div>
          </div>
          <AnimatePresence>
            {gameOver && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm z-50">
                <div className={`p-8 rounded-3xl text-center max-w-sm mx-4 ${foundTargets === totalTargets ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                  <p className="text-4xl font-black uppercase text-white mb-2">{foundTargets === totalTargets ? 'SAVED!' : 'PENALTY!'}</p>
                  <p className="text-xl font-bold text-white">Score: {foundTargets}/{totalTargets}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
