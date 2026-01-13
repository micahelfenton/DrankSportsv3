
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { ArrowLeft, Hash } from 'lucide-react';

interface JoinRoomPageProps {
  onJoin: (nickname: string, roomCode: string) => void;
  onBack: () => void;
  validRoomCode: string;
}

export function JoinRoomPage({ onJoin, onBack, validRoomCode }: JoinRoomPageProps) {
  const [nickname, setNickname] = useState('');
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [error, setError] = useState('');

  const handleJoin = () => {
    if (!nickname.trim()) {
      setError('Please enter a nickname');
      return;
    }
    if (roomCodeInput.toUpperCase() !== validRoomCode) {
      setError(`Room ${roomCodeInput} not found. Try ${validRoomCode}`);
      return;
    }
    onJoin(nickname, roomCodeInput.toUpperCase());
  };

  return (
    <div className="flex flex-col min-h-full w-full max-w-md mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex-1 flex flex-col justify-center"
      >
        <Card title="JOIN GAME" subtitle="Enter your details" className="w-full">
          <div className="space-y-6">
            <div className="relative">
              <Input
                label="Room Code"
                placeholder="E.G. 6TPP"
                value={roomCodeInput}
                onChange={(e) => {
                  setRoomCodeInput(e.target.value.toUpperCase());
                  setError('');
                }}
                className="text-center text-2xl font-black tracking-widest uppercase"
              />
              <Hash className="absolute right-4 bottom-4 w-5 h-5 text-indigo-500/50" />
            </div>

            <Input
              label="Your Nickname"
              placeholder="Player 2"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setError('');
              }}
            />

            {error && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-rose-400 text-sm font-bold text-center bg-rose-500/10 py-2 rounded-lg border border-rose-500/20"
              >
                {error}
              </motion.p>
            )}

            <div className="pt-4">
              <Button
                variant="secondary"
                size="lg"
                fullWidth
                disabled={!nickname.trim() || !roomCodeInput.trim()}
                onClick={handleJoin}
              >
                Join Lobby
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="mt-8 text-center">
        <button 
          onClick={onBack} 
          className="text-slate-400 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center mx-auto"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </button>
      </div>
    </div>
  );
}
