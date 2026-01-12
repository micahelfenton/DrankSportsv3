
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown } from 'lucide-react';
import { Player } from '../types';

interface LeaderboardProps {
  players: Player[];
  title?: string;
  isLive?: boolean;
}

export function Leaderboard({ players, title = 'Penalty Leaderboard', isLive = false }: LeaderboardProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  
  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-rose-500/30 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <TrendingDown className="w-6 h-6 text-rose-500" />
          <h3 className="text-xl font-black uppercase tracking-wide text-rose-500">
            {title}
          </h3>
        </div>
        {isLive && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Live</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {sortedPlayers.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 bg-slate-800/50 rounded-xl p-4"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-700 text-slate-300 font-black text-sm">
              {index + 1}
            </div>
            <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-black text-lg">
              {player.initial}
            </div>
            <div className="flex-1">
              <p className="font-bold text-white">{player.name}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-rose-400">{player.score}</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider">pts</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
