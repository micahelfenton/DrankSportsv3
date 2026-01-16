
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Toggle } from './Toggle';

interface RuleCardProps {
  id: string;
  title: string;
  penalty: string;
  isActive: boolean;
  onToggle: () => void;
  onDelete?: (id: string) => void;
}

export function RuleCard({ id, title, penalty, isActive, onToggle, onDelete }: RuleCardProps) {
  return (
    <div className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-200 ${isActive ? 'bg-indigo-900/40 border-indigo-500/50' : 'bg-slate-800/40 border-slate-700/50 opacity-80'}`}>
      <div className="flex-1 pr-4">
        <h3 className="font-black text-lg text-white uppercase tracking-wide mb-1">
          {title}
        </h3>
        <p className="text-rose-400 font-bold text-sm italic">{penalty}</p>
      </div>
      
      <div className="flex items-center gap-4">
        <Toggle checked={isActive} onChange={onToggle} />
        {onDelete && (
          <button 
            onClick={() => onDelete(id)}
            className="p-2 text-slate-500 hover:text-rose-500 transition-colors"
            title="Delete Rule"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
