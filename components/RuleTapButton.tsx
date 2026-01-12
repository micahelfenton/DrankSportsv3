
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface RuleTapButtonProps {
  title: string;
  isActive?: boolean;
  onTap: () => void;
  disabled?: boolean;
}

export function RuleTapButton({ title, isActive = true, onTap, disabled = false }: RuleTapButtonProps) {
  const [isTapped, setIsTapped] = useState(false);
  
  const handleTap = () => {
    if (disabled || !isActive) return;
    setIsTapped(true);
    onTap();
    setTimeout(() => setIsTapped(false), 300);
  };

  return (
    <motion.button
      onClick={handleTap}
      disabled={disabled || !isActive}
      whileTap={{ scale: 0.95 }}
      className={`relative w-full flex items-center justify-between p-5 rounded-2xl font-black text-lg uppercase tracking-wide transition-all duration-200 ${isActive ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg cursor-pointer' : 'bg-slate-800/50 text-slate-500 cursor-not-allowed'} ${isTapped ? 'ring-4 ring-yellow-400' : ''}`}
    >
      <span className="flex-1 text-left italic">{title}</span>
      <motion.div
        animate={isTapped ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 0.3 }}
        className={`w-12 h-12 rounded-full flex items-center justify-center ${isActive ? 'bg-rose-500' : 'bg-slate-700'}`}
      >
        <Zap className="w-6 h-6 fill-current" />
      </motion.div>
      {isTapped && (
        <motion.div
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-2xl border-4 border-yellow-400"
        />
      )}
    </motion.button>
  );
}
