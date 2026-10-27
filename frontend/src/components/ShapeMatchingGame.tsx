import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ScanLine, Trophy, RotateCcw, Sparkles, Check, X } from 'lucide-react';
import GameMenu from './GameMenu';

interface ShapeMatchingGameProps {
  onBack: () => void;
  onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void;
}

interface ShapeConfig {
  name: string;
  render: (rotation: number, scale: number, color: string) => React.ReactNode;
}

const BASE_SHAPES: ShapeConfig[] = [
  {
    name: 'Asymmetric L-Hexagon',
    render: (rot, scale, col) => (
      <svg viewBox="0 0 40 40" className="w-full h-full" style={{ transform: `rotate(${rot}deg) scale(${scale})` }}>
        <polygon points="10,5 30,5 30,20 20,20 20,35 10,35" fill={col} stroke="#ffffff" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    name: 'Notched Triangle',
    render: (rot, scale, col) => (
      <svg viewBox="0 0 40 40" className="w-full h-full" style={{ transform: `rotate(${rot}deg) scale(${scale})` }}>
        <polygon points="20,5 35,35 25,35 20,25 15,35 5,35" fill={col} stroke="#ffffff" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    name: 'Cross Star',
    render: (rot, scale, col) => (
      <svg viewBox="0 0 40 40" className="w-full h-full" style={{ transform: `rotate(${rot}deg) scale(${scale})` }}>
        <polygon points="16,4 24,4 24,16 36,16 36,24 24,24 24,36 16,36 16,24 4,24 4,16 16,16" fill={col} stroke="#ffffff" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    name: 'Corner Crescent',
    render: (rot, scale, col) => (
      <svg viewBox="0 0 40 40" className="w-full h-full" style={{ transform: `rotate(${rot}deg) scale(${scale})` }}>
        <path d="M 10 10 A 15 15 0 0 0 30 30 L 10 30 Z" fill={col} stroke="#ffffff" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    name: 'Arrow Chevron',
    render: (rot, scale, col) => (
      <svg viewBox="0 0 40 40" className="w-full h-full" style={{ transform: `rotate(${rot}deg) scale(${scale})` }}>
        <polygon points="20,4 36,20 28,20 28,36 12,36 12,20 4,20" fill={col} stroke="#ffffff" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    name: 'Diamond Key',
    render: (rot, scale, col) => (
      <svg viewBox="0 0 40 40" className="w-full h-full" style={{ transform: `rotate(${rot}deg) scale(${scale})` }}>
        <polygon points="20,4 32,16 26,16 26,34 14,34 14,16 8,16" fill={col} stroke="#ffffff" strokeWidth="1.5" />
        <circle cx="20" cy="25" r="3" fill="#090B0F" />
      </svg>
    )
  }
];

export const ShapeMatchingGame: React.FC<ShapeMatchingGameProps> = ({
  onBack,
  onGameComplete
}) => {
  const [gameState, setGameState] = useState<'menu' | 'game' | 'results'>('menu');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Target shape & options
  const [targetShapeIdx, setTargetShapeIdx] = useState(0);
  const [targetRotation, setTargetRotation] = useState(0);
  const [correctOptionIdx, setCorrectOptionIdx] = useState(0);
  const [candidates, setCandidates] = useState<{ shapeIdx: number; rotation: number; scale: number; color: string }[]>([]);

  const generateRound = (r: number) => {
    const shapeIdx = Math.floor(Math.random() * BASE_SHAPES.length);
    setTargetShapeIdx(shapeIdx);
    setTargetRotation(0);

    const correctSlot = Math.floor(Math.random() * 4);
    setCorrectOptionIdx(correctSlot);

    // Color palette
    const colors = ['#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899', '#10B981'];
    const baseColor = colors[Math.floor(Math.random() * colors.length)];

    const newCandidates: { shapeIdx: number; rotation: number; scale: number; color: string }[] = [];
    const possibleAngles = [45, 90, 135, 180, 225, 270, 315];

    for (let i = 0; i < 4; i++) {
      if (i === correctSlot) {
        // True match: same shape, but rotated and slightly scaled
        const rot = possibleAngles[Math.floor(Math.random() * possibleAngles.length)];
        const scale = 0.85 + Math.random() * 0.3; // size difference
        newCandidates.push({ shapeIdx, rotation: rot, scale, color: baseColor });
      } else {
        // Distractor: either different shape OR modified
        let distractorIdx = Math.floor(Math.random() * BASE_SHAPES.length);
        if (distractorIdx === shapeIdx) {
          distractorIdx = (shapeIdx + 1) % BASE_SHAPES.length;
        }
        const rot = possibleAngles[Math.floor(Math.random() * possibleAngles.length)];
        const scale = 0.85 + Math.random() * 0.3;
        newCandidates.push({ shapeIdx: distractorIdx, rotation: rot, scale, color: baseColor });
      }
    }

    setCandidates(newCandidates);
    setSelectedIdx(null);
    setIsAnswered(false);
  };

  const handleStart = () => {
    setGameState('game');
    setRound(1);
    setScore(0);
    setTotalCorrect(0);
    generateRound(1);
  };

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);

    const isCorrect = idx === correctOptionIdx;
    if (isCorrect) {
      setScore(prev => prev + 30 + round * 5);
      setTotalCorrect(prev => prev + 1);
    }

    setTimeout(() => {
      if (round >= 8) {
        const finalScore = score + (isCorrect ? (30 + round * 5) : 0);
        const finalCorrect = totalCorrect + (isCorrect ? 1 : 0);
        const acc = Math.round((finalCorrect / 8) * 100);
        setGameState('results');
        onGameComplete?.(finalScore, 8, acc);
      } else {
        const nextRound = round + 1;
        setRound(nextRound);
        generateRound(nextRound);
      }
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-[#090B0F] text-white flex flex-col items-center p-4">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Shape Matching"
              description="Identify the exact match of the target shape among rotated and scaled candidates. Mental rotation and spatial invariance testing."
              icon={<ScanLine className="w-14 h-14 text-teal-400" />}
              iconBgColor="bg-teal-500/20"
              iconColor="text-teal-400"
              showDifficulty={false}
              onStart={handleStart}
              onBack={onBack}
            />
          )}

          {gameState === 'game' && (
            <motion.div
              key="gameplay"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={onBack}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="text-sm font-semibold text-white/60">
                  Round {round} / 8
                </div>
                <div className="flex items-center gap-1.5 text-teal-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{score} pts</span>
                </div>
              </div>

              {/* Target Shape Banner */}
              <div className="bg-[#12151D] border border-teal-500/20 rounded-2xl p-6 text-center flex flex-col items-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 pointer-events-none" />
                <p className="text-xs uppercase tracking-wider text-teal-400 font-bold mb-3">Target Shape</p>
                <div className="w-24 h-24 p-2 bg-[#0d1017] border border-white/10 rounded-xl flex items-center justify-center">
                  {BASE_SHAPES[targetShapeIdx].render(targetRotation, 1, '#14B8A6')}
                </div>
                <p className="text-xs text-white/50 mt-3">Find the identical shape below (may be rotated or resized)</p>
              </div>

              {/* 4 Candidate Options */}
              <div className="grid grid-cols-2 gap-4">
                {candidates.map((c, idx) => {
                  let borderStyle = 'border-white/10 hover:border-teal-500/40 bg-[#12151D] hover:bg-white/5';
                  if (isAnswered) {
                    if (idx === correctOptionIdx) {
                      borderStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
                    } else if (idx === selectedIdx) {
                      borderStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                    } else {
                      borderStyle = 'bg-[#12151D]/50 border-white/5 opacity-40';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelect(idx)}
                      className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center aspect-square shadow relative ${borderStyle}`}
                    >
                      <div className="w-20 h-20 flex items-center justify-center">
                        {BASE_SHAPES[c.shapeIdx].render(c.rotation, c.scale, c.color)}
                      </div>
                      {isAnswered && idx === correctOptionIdx && (
                        <div className="absolute top-2 right-2 p-1 rounded-full bg-emerald-500/30 text-emerald-400">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                      {isAnswered && idx === selectedIdx && idx !== correctOptionIdx && (
                        <div className="absolute top-2 right-2 p-1 rounded-full bg-rose-500/30 text-rose-400">
                          <X className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {gameState === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#12151D] border border-white/10 rounded-2xl p-6 text-center flex flex-col items-center gap-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-teal-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Rotation Complete!</h2>
                <p className="text-sm text-white/60">Spatial Invariance Mastery</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Score</div>
                  <div className="text-2xl font-bold text-teal-400">{score}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Accuracy</div>
                  <div className="text-2xl font-bold text-emerald-400">{Math.round((totalCorrect / 8) * 100)}%</div>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={handleStart}
                  className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
                >
                  <RotateCcw className="w-4 h-4" /> Play Again
                </button>
                <button
                  onClick={onBack}
                  className="py-3 px-6 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition"
                >
                  Exit
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ShapeMatchingGame;
