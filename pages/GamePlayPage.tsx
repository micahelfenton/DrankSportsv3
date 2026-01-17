
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/Button';
import { RuleTapButton } from '../components/RuleTapButton';
import { Sparkles, Trophy, AlertTriangle } from 'lucide-react';
import { Rule } from '../types';

interface GamePlayPageProps {
  rules: Rule[];
  roomCode: string;
  activePenalty: { playerName: string; penalty: string } | null;
  onQuit: () => void;
  onTriggerQuiz: () => void;
  onRuleTap: (ruleId: string) => void;
  onViewLeaderboard: () => void;
}

export function GamePlayPage({ 
  rules, 
  roomCode, 
  activePenalty,
  onQuit, 
  onTriggerQuiz, 
  onRuleTap, 
  onViewLeaderboard 
}: GamePlayPageProps) {
  const activeRules = rules.filter(r => r.active);
  
  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto px-4 py-6 relative">
      {/* Penalty Overlay */}
      <AnimatePresence>
        {activePenalty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-6"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -5, y: 50 }}
              animate={{ scale: 1, rotate: 0, y: 0 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="w-full bg-rose-600 rounded-[2.5rem] p-8 text-center shadow-[0_0_80px_rgba(225,29,72,0.4)] border-4 border-white/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ duration: 0.5, repeat: Infinity }}
                className="mb-6 flex justify-center"
              >
                <AlertTriangle className="w-20 h-20 text-white fill-white/20" />
              </motion.div>
              <h2 className="text-4xl font-black italic uppercase text-white mb-2 tracking-tighter">
                LAST TAP!
              </h2>
              <div className="bg-black/20 rounded-2xl py-4 px-2 mb-4">
                <p className="text-white text-3xl font-black uppercase tracking-tight mb-1 truncate">
                  {activePenalty.playerName}
                </p>
                <div className="h-px bg-white/20 w-12 mx-auto mb-2" />
                <p className="text-rose-100 text-xl font-bold uppercase italic tracking-widest">
                  {activePenalty.penalty}
                </p>
              </div>
              <p className="text-white/60 text-xs font-black uppercase tracking-[0.2em]">Hydrate Immediately</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <RuleTapButton 
                title={rule.title} 
                isActive={rule.active} 
                onTap={() => onRuleTap(rule.id)} 
                disabled={!!activePenalty}
              />
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
