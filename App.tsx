
import React, { useState } from 'react';
import { Screen, Player, Rule } from './types';
import { HomePage } from './pages/HomePage';
import { SetupRoomPage } from './pages/SetupRoomPage';
import { JoinRoomPage } from './pages/JoinRoomPage';
import { LobbyPage } from './pages/LobbyPage';
import { GameRulesPage } from './pages/GameRulesPage';
import { GamePlayPage } from './pages/GamePlayPage';
import { MiniGamePage } from './pages/MiniGamePage';
import { QuizPage } from './pages/QuizPage';
import { LeaderboardPage } from './pages/LeaderboardPage';

const INITIAL_RULES: Rule[] = [
  { id: '1', title: 'Home Team Scores', penalty: '1 Sip', active: true },
  { id: '2', title: 'Away Team Scores', penalty: '1 Sip', active: true },
  { id: '3', title: 'Highlight Play', penalty: '3 Sips (Mini Game!)', active: true },
  { id: '4', title: 'Commercial Break', penalty: 'Waterfall!', active: false },
  { id: '5', title: 'Upset Play', penalty: 'Pick someone to drink', active: true },
];

export function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [roomCode] = useState('6TPP');
  const [sport, setSport] = useState('basketball');
  const [players, setPlayers] = useState<Player[]>([]);
  const [rules, setRules] = useState<Rule[]>(INITIAL_RULES);
  const [currentTriggerRule, setCurrentTriggerRule] = useState<string>('');

  const handleCreateRoom = (nickname: string, selectedSport: string) => {
    const host: Player = {
      id: 'host',
      name: nickname,
      initial: nickname.charAt(0).toUpperCase(),
      score: 0,
      isHost: true
    };
    setPlayers([host]);
    setSport(selectedSport);
    setCurrentScreen('lobby');
  };

  const handleJoinRoom = (nickname: string, code: string) => {
    const newPlayer: Player = {
      id: `player-${Date.now()}`,
      name: nickname,
      initial: nickname.charAt(0).toUpperCase(),
      score: 0,
      isHost: false
    };
    setPlayers(prev => [...prev, newPlayer]);
    setCurrentScreen('lobby');
  };

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const addRule = (title: string, penalty: string) => {
    const newRule: Rule = {
      id: `rule-${Date.now()}`,
      title: title,
      penalty: penalty,
      active: true,
    };
    setRules(prev => [...prev, newRule]);
  };

  const deleteRule = (id: string) => {
    setRules(prev => prev.filter(r => r.id !== id));
  };

  const handleRuleTap = (ruleId: string) => {
    const rule = rules.find(r => r.id === ruleId);
    if (!rule) return;

    setPlayers(prev => prev.map(p => ({ ...p, score: p.score + 1 })));

    if (rule.title.includes('Mini Game')) {
      setCurrentTriggerRule(rule.title);
      setCurrentScreen('minigame');
    }
  };

  const handleMiniGameComplete = (success: boolean) => {
    if (!success) {
      setPlayers(prev => prev.map(p => ({ ...p, score: p.score + 2 })));
    }
    setCurrentScreen('gameplay');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomePage 
            onHost={() => setCurrentScreen('setup')} 
            onJoin={() => setCurrentScreen('join')} 
          />
        );
      case 'setup':
        return (
          <SetupRoomPage 
            onContinue={handleCreateRoom} 
            onBack={() => setCurrentScreen('home')} 
          />
        );
      case 'join':
        return (
          <JoinRoomPage 
            validRoomCode={roomCode}
            onJoin={handleJoinRoom}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'lobby':
        return (
          <LobbyPage 
            players={players} 
            roomCode={roomCode} 
            onStart={() => setCurrentScreen('rules')} 
            onQuit={() => setCurrentScreen('home')} 
          />
        );
      case 'rules':
        return (
          <GameRulesPage 
            rules={rules} 
            onToggleRule={toggleRule} 
            onAddRule={addRule}
            onDeleteRule={deleteRule}
            roomCode={roomCode} 
            onBack={() => setCurrentScreen('lobby')} 
            onQuit={() => setCurrentScreen('home')} 
            onStartGame={() => setCurrentScreen('gameplay')} 
          />
        );
      case 'gameplay':
        return (
          <GamePlayPage 
            rules={rules} 
            roomCode={roomCode} 
            onQuit={() => setCurrentScreen('home')} 
            onTriggerQuiz={() => setCurrentScreen('quiz')} 
            onRuleTap={handleRuleTap} 
            onViewLeaderboard={() => setCurrentScreen('leaderboard')} 
          />
        );
      case 'minigame':
        return (
          <MiniGamePage 
            ruleName={currentTriggerRule} 
            onComplete={handleMiniGameComplete} 
          />
        );
      case 'quiz':
        return (
          <QuizPage 
            sport={sport} 
            onComplete={(correct) => {
              if (!correct) setPlayers(prev => prev.map(p => ({ ...p, score: p.score + 2 })));
              setCurrentScreen('gameplay');
            }} 
            onQuit={() => setCurrentScreen('gameplay')} 
          />
        );
      case 'leaderboard':
        return (
          <LeaderboardPage 
            players={players} 
            onBack={() => setCurrentScreen('gameplay')} 
          />
        );
      default:
        return <HomePage onHost={() => setCurrentScreen('setup')} onJoin={() => setCurrentScreen('join')} />;
    }
  };

  return (
    <main className="min-h-screen w-full bg-slate-950 relative overflow-hidden font-sans text-white">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900" />
        <div className="absolute top-0 left-0 w-full h-1/2 bg-purple-900/20 blur-[120px] rounded-full transform -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-indigo-900/20 blur-[120px] rounded-full transform translate-y-1/2" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>
      <div className="relative z-10 h-screen w-full overflow-hidden">
        {renderScreen()}
      </div>
    </main>
  );
}
