
import React from 'react';
import { motion } from 'framer-motion';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <div className="flex items-center cursor-pointer group" onClick={() => onChange(!checked)}>
      {label && <span className="mr-3 text-sm font-medium text-slate-300">{label}</span>}
      <div className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${checked ? 'bg-indigo-500' : 'bg-slate-700'}`}>
        <motion.div
          className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
          animate={{ x: checked ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
    </div>
  );
}
