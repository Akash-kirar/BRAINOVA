import React from 'react';
import { Check, Grid, Sparkles, Puzzle, ArrowLeft, Play } from 'lucide-react';

interface TodaysMissionProps {
  onPlay?: (gameId: string) => void;
  onBack?: () => void;
  sessions?: any[];
}

export default function TodaysMission({ onPlay, onBack, sessions = [] }: TodaysMissionProps) {
  const dayOfWeek = new Date().getDay();

  const missionSets = [
    // Sunday
    [
      { id: 'm1', gameId: 'memory-grid', gameType: 'memory', name: 'Memory Grid', duration: '5 min', icon: <Grid className="w-5 h-5 text-[#3b82f6]" />, iconBg: 'bg-[#1e293b]' },
      { id: 'm2', gameId: 'math-drill', gameType: 'math', name: 'Speed Math', duration: '3 min', icon: <Sparkles className="w-5 h-5 text-[#ec4899]" />, iconBg: 'bg-[#311b2b]' },
      { id: 'm3', gameId: 'pattern-logic', gameType: 'logic', name: 'Pattern Logic', duration: '4 min', icon: <Puzzle className="w-5 h-5 text-[#a855f7]" />, iconBg: 'bg-[#2a1b3d]' }
    ],
    // Monday
    [
      { id: 'm1', gameId: 'card-match', gameType: 'memory', name: 'Card Match', duration: '4 min', icon: <Grid className="w-5 h-5 text-[#3b82f6]" />, iconBg: 'bg-[#1e293b]' },
      { id: 'm2', gameId: 'quick-addition', gameType: 'math', name: 'Quick Addition', duration: '3 min', icon: <Sparkles className="w-5 h-5 text-[#ec4899]" />, iconBg: 'bg-[#311b2b]' },
      { id: 'm3', gameId: 'sequence-logic', gameType: 'logic', name: 'Sequence Logic', duration: '5 min', icon: <Puzzle className="w-5 h-5 text-[#a855f7]" />, iconBg: 'bg-[#2a1b3d]' }
    ],
    // Tuesday
    [
      { id: 'm1', gameId: 'sequence-recall', gameType: 'memory', name: 'Sequence Recall', duration: '5 min', icon: <Grid className="w-5 h-5 text-[#3b82f6]" />, iconBg: 'bg-[#1e293b]' },
      { id: 'm2', gameId: 'fast-subtraction', gameType: 'math', name: 'Fast Subtraction', duration: '3 min', icon: <Sparkles className="w-5 h-5 text-[#ec4899]" />, iconBg: 'bg-[#311b2b]' },
      { id: 'm3', gameId: 'smart-grid', gameType: 'logic', name: 'Smart Grid', duration: '4 min', icon: <Puzzle className="w-5 h-5 text-[#a855f7]" />, iconBg: 'bg-[#2a1b3d]' }
    ],
    // Wednesday
    [
      { id: 'm1', gameId: 'pattern-recall', gameType: 'memory', name: 'Pattern Recall', duration: '4 min', icon: <Grid className="w-5 h-5 text-[#3b82f6]" />, iconBg: 'bg-[#1e293b]' },
      { id: 'm2', gameId: 'mental-math', gameType: 'math', name: 'Mental Math', duration: '4 min', icon: <Sparkles className="w-5 h-5 text-[#ec4899]" />, iconBg: 'bg-[#311b2b]' },
      { id: 'm3', gameId: 'cube-rotation', gameType: 'logic', name: 'Cube Rotation', duration: '5 min', icon: <Puzzle className="w-5 h-5 text-[#a855f7]" />, iconBg: 'bg-[#2a1b3d]' }
    ],
    // Thursday
    [
      { id: 'm1', gameId: 'image-memory', gameType: 'memory', name: 'Image Memory', duration: '5 min', icon: <Grid className="w-5 h-5 text-[#3b82f6]" />, iconBg: 'bg-[#1e293b]' },
      { id: 'm2', gameId: 'division-master', gameType: 'math', name: 'Division Master', duration: '3 min', icon: <Sparkles className="w-5 h-5 text-[#ec4899]" />, iconBg: 'bg-[#311b2b]' },
      { id: 'm3', gameId: 'puzzle-match', gameType: 'logic', name: 'Puzzle Match', duration: '4 min', icon: <Puzzle className="w-5 h-5 text-[#a855f7]" />, iconBg: 'bg-[#2a1b3d]' }
    ],
    // Friday
    [
      { id: 'm1', gameId: 'color-memory', gameType: 'memory', name: 'Color Memory', duration: '4 min', icon: <Grid className="w-5 h-5 text-[#3b82f6]" />, iconBg: 'bg-[#1e293b]' },
      { id: 'm2', gameId: 'equation-builder', gameType: 'math', name: 'Equation Builder', duration: '5 min', icon: <Sparkles className="w-5 h-5 text-[#ec4899]" />, iconBg: 'bg-[#311b2b]' },
      { id: 'm3', gameId: 'hidden-pattern', gameType: 'logic', name: 'Hidden Pattern', duration: '5 min', icon: <Puzzle className="w-5 h-5 text-[#a855f7]" />, iconBg: 'bg-[#2a1b3d]' }
    ],
    // Saturday
    [
      { id: 'm1', gameId: 'memory-sprint', gameType: 'memory', name: 'Memory Sprint', duration: '3 min', icon: <Grid className="w-5 h-5 text-[#3b82f6]" />, iconBg: 'bg-[#1e293b]' },
      { id: 'm2', gameId: 'multiplication-sprint', gameType: 'math', name: 'Multiplication Sprint', duration: '3 min', icon: <Sparkles className="w-5 h-5 text-[#ec4899]" />, iconBg: 'bg-[#311b2b]' },
      { id: 'm3', gameId: 'pattern-logic', gameType: 'logic', name: 'Pattern Logic', duration: '4 min', icon: <Puzzle className="w-5 h-5 text-[#a855f7]" />, iconBg: 'bg-[#2a1b3d]' }
    ]
  ];

  const missions = missionSets[dayOfWeek];

  // Get today's start timestamp
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTimestamp = today.getTime();

  // Find completed mission types
  const completedTypes = new Set(
    sessions
      .filter(s => s.timestamp >= todayTimestamp)
      .map(s => s.gameType)
  );

  const completedCount = missions.filter(m => completedTypes.has(m.gameType)).length;

  return (
    <div className="flex flex-col h-[100vh] bg-[#0a0a0c] text-white">
      <div className="flex items-center gap-4 p-6 shrink-0">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-lg">Today's Mission</span>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-20">
        <div className="flex justify-between items-end mb-6 mt-4">
          <h3 className="text-[28px] font-bold text-white leading-none tracking-tight">Today's Mission</h3>
          <p className="text-white/50 text-[14px] font-medium mb-1">{completedCount}/3 completed</p>
        </div>

        <div className="space-y-4">
          {missions.map((mission) => {
            const isCompleted = completedTypes.has(mission.gameType);
            
            return (
              <div 
                key={mission.id}
                onClick={() => onPlay && onPlay(mission.gameId)}
                className={`flex justify-between items-center bg-[#121215] rounded-[24px] p-5 border ${isCompleted ? 'border-[#2edd70]/30 bg-[#2edd70]/5' : 'border-white/5'} ${onPlay ? 'cursor-pointer hover:bg-white/5 transition-colors' : ''}`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-[52px] h-[52px] rounded-[16px] flex items-center justify-center shrink-0 ${mission.iconBg}`}>
                    {mission.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-[18px] text-white/90 leading-tight mb-1">{mission.name}</h4>
                    <p className="text-[14px] text-white/40 font-medium">{mission.duration}</p>
                  </div>
                </div>
                
                <div className="shrink-0 ml-2">
                  {isCompleted ? (
                    <div className="w-8 h-8 rounded-full bg-[#2edd70] flex items-center justify-center shadow-[0_0_15px_rgba(46,221,112,0.3)]">
                      <Check className="w-[18px] h-[18px] text-black stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <Play className="w-[14px] h-[14px] text-white/50 ml-0.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
