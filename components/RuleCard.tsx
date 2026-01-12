
import React from 'react';
import { Toggle } from './Toggle';

interface RuleCardProps {
  title: string;
  penalty: string;
  isActive: boolean;
  onToggle: () => void;
}

export function RuleCard({ title, penalty, isActive, onToggle }: RuleCardProps) {
  return (
    <div className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-200 ${isActive ? 'bg-indigo-900/40 border-indigo-500/50' : 'bg-slate-800/40 border-slate-700/50 opacity-80'}`}>
      <div className="flex-1 pr-4">
        <h3 className="font-black text-lg text-white uppercase tracking-wide mb-1">
          {title}
        </h3>
        <p className="text-rose-400 font-bold text-sm italic">{penalty}</p>
      </div>
      <Toggle checked={isActive} onChange={onToggle} />
    </div>
  );
}
