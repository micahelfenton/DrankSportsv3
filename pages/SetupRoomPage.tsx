
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Card } from '../components/Card';
import { ArrowLeft } from 'lucide-react';

interface SetupRoomPageProps {
  onContinue: (nickname: string, sport: string) => void;
  onBack: () => void;
}

export function SetupRoomPage({ onContinue, onBack }: SetupRoomPageProps) {
  const [nickname, setNickname] = useState('');
  const [sport, setSport] = useState('basketball');
  const [mode, setMode] = useState('drinking');

  return (
    <div className="flex flex-col min-h-full w-full max-w-md mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col justify-center">
        <Card title="SETUP ROOM" className="w-full">
          <div className="space-y-8">
            <Input
              label="Your Nickname"
              placeholder="Player 1"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <Select
              label="Select Sport"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              options={[
                { value: 'basketball', label: 'Basketball', icon: '🏀' },
                { value: 'football', label: 'Football', icon: '🏈' },
                { value: 'soccer', label: 'Soccer', icon: '⚽' },
              ]}
            />
            <Select
              label="Game Mode"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              options={[
                { value: 'drinking', label: 'Drinking', icon: '🍺' },
                { value: 'fantasy', label: 'Points Only', icon: '🏆' },
              ]}
            />
            <div className="pt-4">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                disabled={!nickname.trim()}
                onClick={() => onContinue(nickname, sport)}
              >
                Create Room
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
      <div className="mt-8 text-center">
        <button onClick={onBack} className="text-slate-400 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center mx-auto">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </button>
      </div>
    </div>
  );
}
