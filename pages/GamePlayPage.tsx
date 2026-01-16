
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { RuleTapButton } from '../components/RuleTapButton';
import { Sparkles, Trophy } from 'lucide-react';
import { Rule } from '../types';

interface GamePlayPageProps {
  rules: Rule[];
  roomCode: string;
  onQuit: () => void;
  onTriggerQuiz: () => void;
  onRuleTap: (ruleId: string) => void;
  onViewLeaderboard: () => void;
}

export function GamePlayPage({ rules, roomCode, onQuit, onTriggerQuiz, onRuleTap, onViewLeaderboard }: GamePlayPageProps) {
  const activeRules = rules.filter(r => r.active);
  
  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto px-4 py-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-rose-500 text-xs font-bold uppercase tracking-widest mb-1">Match Live</p>
          <h1 className="text-3xl font-black italic uppercase tracking-tight leading-none text-white">PLAYING</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-indigo-900/50 px-4 py-2 rounded-xl border border-indigo-500/30">
            <span className="text-[10px] font-bold text-indigo-300 uppercase block leading-none mb-0.5">Room</span>
            <span className="text-base font-black text-white leading-none">{roomCode}</span>
          </div>
          <Button variant="secondary" size="sm" onClick={onQuit} className="!px-3 !h-10 text-xs">QUIT</Button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black italic text-rose-400 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Triggers
          </h2>
          <Button
            variant="success"
            size="md"
            onClick={onTriggerQuiz}
            className="!bg-amber-500 hover:!bg-amber-400 !shadow-[0_4px_0_rgb(146,64,14)]"
          >
            Gemini Quiz
          </Button>
        </div>
      </motion.div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-6 pr-1">
        {activeRules.length > 0 ? (
          activeRules.map((rule, index) => (
            <motion.div key={rule.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
              <RuleTapButton title={rule.title} isActive={rule.active} onTap={() => onRuleTap(rule.id)} />
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 px-6 border-2 border-dashed border-slate-800 rounded-2xl">
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm italic">
              No active triggers selected.<br/>Check settings!
            </p>
          </div>
        )}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6">
        <Button variant="outline" size="lg" fullWidth onClick={onViewLeaderboard} className="backdrop-blur-md bg-rose-900/30 border-rose-500/30">
          <Trophy className="w-5 h-5 mr-2" />
          Live Standings
        </Button>
      </motion.div>
    </div>
  );
}
