
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { Leaderboard } from '../components/Leaderboard';
import { ArrowLeft, Trophy } from 'lucide-react';
import { Player } from '../types';

interface LeaderboardPageProps {
  players: Player[];
  onBack: () => void;
}

export function LeaderboardPage({ players, onBack }: LeaderboardPageProps) {
  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-rose-500 flex items-center justify-center shadow-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-rose-400">Live Heat</p>
            <h1 className="text-3xl font-black uppercase text-white">Standings</h1>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1">
        <Leaderboard players={players} title="The Drink Card" isLive />
      </motion.div>

      <div className="mt-8">
        <Button variant="outline" size="lg" fullWidth onClick={onBack} className="backdrop-blur-md bg-slate-900/50">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Action
        </Button>
      </div>
    </div>
  );
}
