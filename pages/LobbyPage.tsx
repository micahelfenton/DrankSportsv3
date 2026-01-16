
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { PlayerCard } from '../components/PlayerCard';
import { ArrowRight, Users } from 'lucide-react';
import { Player } from '../types';

interface LobbyPageProps {
  players: Player[];
  onStart: () => void;
  onQuit: () => void;
  roomCode: string;
}

export function LobbyPage({ players, onStart, onQuit, roomCode }: LobbyPageProps) {
  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-10">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">Room Code</span>
          <span className="text-5xl font-black text-white tracking-widest text-shadow-lg leading-none uppercase">{roomCode}</span>
        </div>
        <Button variant="secondary" size="sm" onClick={onQuit} className="!px-3 !h-10 text-xs">
          QUIT
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pb-24 scrollbar-hide">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-900/20 border border-indigo-500/20 rounded-3xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/30">
            <Users className="w-8 h-8 text-indigo-400" />
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2 italic">Lobby Live</h3>
          <p className="text-indigo-300 text-sm font-medium leading-relaxed">
            Share the room code <span className="text-white font-black">{roomCode}</span> with other players to join the match session.
          </p>
        </motion.div>

        <div>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-indigo-200 text-sm font-bold uppercase tracking-widest">
              Players ({players.length})
            </h3>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter">Waiting</span>
            </div>
          </div>
          <div className="space-y-2">
            {players.map((p, i) => (
              <motion.div 
                key={p.id} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: i * 0.1 }}
              >
                <PlayerCard name={p.name} isHost={p.isHost} initial={p.initial} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
        <div className="max-w-md mx-auto">
          <Button variant="success" size="xl" fullWidth onClick={onStart} className="shadow-2xl">
            <span className="mr-2">Setup Game Rules</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
