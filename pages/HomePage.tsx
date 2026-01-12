
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';

interface HomePageProps {
  onHost: () => void;
  onJoin: () => void;
}

export function HomePage({ onHost, onJoin }: HomePageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full w-full max-w-md mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 w-full"
      >
        <div className="inline-block px-4 py-1 rounded-full bg-indigo-950/50 border border-indigo-500/30 mb-6">
          <span className="text-xs font-bold tracking-[0.2em] text-indigo-300 uppercase">
            SportMix Engine v2.0
          </span>
        </div>
        <h1 className="text-6xl font-black text-white mb-2 tracking-tighter text-shadow-lg leading-none">
          SPORT<span className="text-rose-500">MIX</span>
        </h1>
        <p className="text-indigo-200 font-bold tracking-[0.3em] text-sm uppercase">
          Live Second-Screen Fun
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full space-y-6 mb-auto"
      >
        <Button variant="primary" size="xl" fullWidth onClick={onHost} className="text-2xl">
          Host Game
        </Button>
        <Button variant="secondary" size="xl" fullWidth onClick={onJoin} className="text-2xl">
          Join Game
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center"
      >
        <p className="text-slate-500 text-xs font-bold tracking-[0.2em] uppercase">
          Couch Mode Activated
        </p>
      </motion.div>
    </div>
  );
}
