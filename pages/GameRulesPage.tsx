
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { RuleCard } from '../components/RuleCard';
import { ArrowLeft, Play, Pencil } from 'lucide-react';
import { Rule } from '../types';

interface GameRulesPageProps {
  rules: Rule[];
  onToggleRule: (id: string) => void;
  onBack: () => void;
  onQuit: () => void;
  onStartGame: () => void;
  roomCode: string;
}

export function GameRulesPage({ rules, onToggleRule, onBack, onQuit, onStartGame, roomCode }: GameRulesPageProps) {
  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto px-4 py-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-rose-500 text-xs font-bold uppercase tracking-widest mb-1">Sport Rules</p>
          <h1 className="text-4xl font-black italic uppercase tracking-tight leading-none">Settings</h1>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Button variant="secondary" size="sm" onClick={onQuit} className="!px-3 !h-8 text-xs">QUIT</Button>
          <div className="bg-indigo-900/50 px-3 py-1 rounded-lg border border-indigo-500/30">
            <span className="text-[10px] font-bold text-indigo-300 uppercase block leading-none mb-0.5">Room</span>
            <span className="text-sm font-black text-white leading-none">{roomCode}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black italic text-indigo-200">Active Triggers</h2>
        <Button variant="ghost" size="sm" className="!px-3 text-indigo-300 hover:text-white">
          <Pencil className="w-4 h-4 mr-2" />
          Edit List
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-48 scrollbar-hide">
        {rules.map((rule, index) => (
          <motion.div key={rule.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
            <RuleCard
              title={rule.title}
              penalty={rule.penalty}
              isActive={rule.active}
              onToggle={() => onToggleRule(rule.id)}
            />
          </motion.div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent space-y-3">
        <div className="max-w-md mx-auto">
          <Button variant="success" size="xl" fullWidth onClick={onStartGame} className="backdrop-blur-md">
            <Play className="w-5 h-5 mr-2" />
            Launch Session
          </Button>
          <Button variant="outline" size="md" fullWidth onClick={onBack} className="backdrop-blur-md bg-slate-900/50">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Lobby
          </Button>
        </div>
      </div>
    </div>
  );
}
