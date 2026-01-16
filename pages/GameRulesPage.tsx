
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/Button';
import { RuleCard } from '../components/RuleCard';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { ArrowLeft, Play, Plus, X, Check } from 'lucide-react';
import { Rule } from '../types';

interface GameRulesPageProps {
  rules: Rule[];
  onToggleRule: (id: string) => void;
  onAddRule: (title: string, penalty: string) => void;
  onDeleteRule: (id: string) => void;
  onBack: () => void;
  onQuit: () => void;
  onStartGame: () => void;
  roomCode: string;
}

const PENALTY_OPTIONS = [
  { value: '1 Sip', label: '1 Sip', icon: '🍺' },
  { value: '2 Sips', label: '2 Sips', icon: '🍻' },
  { value: '3 Sips', label: '3 Sips', icon: '🥃' },
  { value: '4 Sips', label: '4 Sips', icon: '🔥' },
  { value: '5 Sips', label: '5 Sips', icon: '🚀' },
  { value: 'Full Vessel', label: 'Full Vessel', icon: '🌊' },
];

export function GameRulesPage({ 
  rules, 
  onToggleRule, 
  onAddRule,
  onDeleteRule,
  onBack, 
  onQuit, 
  onStartGame, 
  roomCode 
}: GameRulesPageProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPenalty, setNewPenalty] = useState('1 Sip');

  const handleSave = () => {
    if (newTitle.trim() && newPenalty.trim()) {
      onAddRule(newTitle.trim(), newPenalty.trim());
      setNewTitle('');
      setNewPenalty('1 Sip');
      setIsAdding(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto px-4 py-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-rose-500 text-xs font-bold uppercase tracking-widest mb-1">Hydration Penalty</p>
          <h1 className="text-4xl font-black italic uppercase tracking-tight leading-none text-white">Settings</h1>
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
        <h2 className="text-2xl font-black italic text-indigo-200 uppercase tracking-tight">Active Triggers</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-48 scrollbar-hide">
        {rules.map((rule, index) => (
          <motion.div key={rule.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
            <RuleCard
              id={rule.id}
              title={rule.title}
              penalty={rule.penalty}
              isActive={rule.active}
              onToggle={() => onToggleRule(rule.id)}
              onDelete={onDeleteRule}
            />
          </motion.div>
        ))}

        <AnimatePresence mode="wait">
          {!isAdding ? (
            <motion.button 
              key="add-button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setIsAdding(true)}
              className="w-full p-5 rounded-2xl border-2 border-dashed border-indigo-500/30 hover:border-indigo-500/50 bg-indigo-950/10 text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Custom Trigger
            </motion.button>
          ) : (
            <motion.div 
              key="add-form"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="bg-indigo-900/20 border-2 border-indigo-500/50 rounded-2xl p-5 space-y-4"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Create New Trigger</span>
                <button onClick={() => setIsAdding(false)} className="text-slate-500 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <Input
                label="Trigger Event"
                placeholder="e.g. Airball"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                autoFocus
              />
              
              <Select
                label="Penalty Amount"
                value={newPenalty}
                onChange={(e) => setNewPenalty(e.target.value)}
                options={PENALTY_OPTIONS}
              />

              <div className="flex gap-3 pt-2">
                <Button 
                  variant="success" 
                  fullWidth 
                  onClick={handleSave}
                  disabled={!newTitle.trim() || !newPenalty.trim()}
                >
                  <Check className="w-5 h-5 mr-2" />
                  Save Rule
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
