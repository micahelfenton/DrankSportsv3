
import React from 'react';
import { Crown } from 'lucide-react';

interface PlayerCardProps {
  name: string;
  isHost?: boolean;
  initial: string;
}

export function PlayerCard({ name, isHost, initial }: PlayerCardProps) {
  return (
    <div className="flex items-center bg-indigo-900/30 border border-indigo-500/30 rounded-2xl p-4 mb-3">
      <div className="h-12 w-12 rounded-xl bg-indigo-500 flex items-center justify-center text-xl font-black text-white shadow-lg mr-4">
        {initial}
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <span className="font-bold text-lg text-white mr-2">{name}</span>
          {isHost && <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />}
        </div>
        {isHost && (
          <span className="text-xs text-indigo-300 font-medium uppercase tracking-wider">
            Room Host
          </span>
        )}
      </div>
    </div>
  );
}
