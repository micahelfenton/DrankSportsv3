
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { PlayerCard } from '../components/PlayerCard';
import { Card } from '../components/Card';
import { ArrowRight } from 'lucide-react';
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
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Room Code</span>
          <span className="text-4xl font-black text-white tracking-widest">{roomCode}</span>
        </div>
        <Button variant="secondary" size="sm" onClick={onQuit} className="!px-3">
          <span className="text-xs font-bold">QUIT</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pb-24">
        <Card className="text-center py-8">
          <div className="bg-white p-4 rounded-xl inline-block mb-6 shadow-inner">
            <div className="w-48 h-48 bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-white p-2">
                <div className="w-full h-full border-4 border-black border-dashed rounded flex items-center justify-center">
                  <span className="text-black font-bold text-xs">SCAN TO JOIN</span>
                </div>
              </div>
              <div className="absolute inset-4 grid grid-cols-6 grid-rows-6 gap-1">
                {[...Array(36)].map((_, i) => (
                  <div key={i} className={`bg-black ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`} />
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black uppercase tracking-wide">drnkly sports room</h3>
            <p className="text-indigo-300 text-sm font-medium">Waiting for players...</p>
          </div>
        </Card>

        <div>
          <h3 className="text-indigo-200 text-sm font-bold uppercase tracking-wider mb-4 pl-2">
            Players ({players.length})
          </h3>
          <div className="space-y-2">
            {players.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <PlayerCard name={p.name} isHost={p.isHost} initial={p.initial} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 to-transparent">
        <div className="max-w-md mx-auto">
          <Button variant="success" size="xl" fullWidth onClick={onStart} className="shadow-lg">
            <span className="mr-2">Setup Game Rules</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
