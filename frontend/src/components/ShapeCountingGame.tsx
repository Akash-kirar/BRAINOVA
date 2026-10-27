import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Shapes, Trophy, RotateCcw, Sparkles, Check, X } from 'lucide-react';
import GameMenu from './GameMenu';

interface ShapeCountingGameProps {
  onBack: () => void;
  onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void;
}

type ShapeType = 'circle' | 'square' | 'triangle' | 'diamond' | 'star';

interface PlacedShape {
  id: number;
  type: ShapeType;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

const SHAPE_NAMES: Record<ShapeType, string> = {
  circle: 'Circles',
  square: 'Squares',
  triangle: 'Triangles',
  diamond: 'Diamonds',
  star: 'Stars'
};

const COLORS = ['#38BDF8', '#F43F5E', '#10B981', '#FBBF24', '#A855F7', '#EC4899'];

export const ShapeCountingGame: React.FC<ShapeCountingGameProps> = ({
  onBack,
  onGameComplete
}) => {
  const [gameState, setGameState] = useState<'menu' | 'game' | 'results'>('menu');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [targetType, setTargetType] = useState<ShapeType>('triangle');
  const [shapes, setShapes] = useState<PlacedShape[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Generate shapes for the round
  const generateLevel = (currentRound: number) => {
    const totalCount = 10 + currentRound * 4; // 14 to 42 shapes
    const types: ShapeType[] = ['circle', 'square', 'triangle', 'diamond', 'star'];
    const chosenTarget = types[Math.floor(Math.random() * types.length)];
    setTargetType(chosenTarget);

    // Target count between 3 and 6 + round
    const targetCount = 3 + Math.floor(Math.random() * (2 + Math.min(currentRound, 5)));
    const otherCount = totalCount - targetCount;

    const newShapes: PlacedShape[] = [];

    // Place target shapes
    for (let i = 0; i < targetCount; i++) {
      newShapes.push({
        id: i,
        type: chosenTarget,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        size: 16 + Math.random() * 14,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.floor(Math.random() * 360)
      });
    }

    // Place distractor shapes
    const otherTypes = types.filter(t => t !== chosenTarget);
    for (let i = 0; i < otherCount; i++) {
      newShapes.push({
        id: targetCount + i,
        type: otherTypes[Math.floor(Math.random() * otherTypes.length)],
        x: 8 + Math.random() * 84,
        y: 8 + Math.random() * 84,
        size: 16 + Math.random() * 14,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.floor(Math.random() * 360)
      });
    }

    // Shuffle shapes
    setShapes(newShapes.sort(() => Math.random() - 0.5));
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const actualTargetCount = useMemo(() => {
    return shapes.filter(s => s.type === targetType).length;
  }, [shapes, targetType]);

  const options = useMemo(() => {
    if (actualTargetCount === 0) return [2, 3, 4, 5];
    const set = new Set<number>([actualTargetCount]);
    while (set.size < 4) {
      const delta = (Math.random() > 0.5 ? 1 : -1) * (1 + Math.floor(Math.random() * 3));
      const val = actualTargetCount + delta;
      if (val > 0) set.add(val);
    }
    return Array.from(set).sort((a, b) => a - b);
  }, [actualTargetCount]);

  const handleStart = () => {
    setGameState('game');
    setRound(1);
    setScore(0);
    setTotalCorrect(0);
    generateLevel(1);
  };

  const handleSelectOption = (opt: number) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === actualTargetCount;
    if (isCorrect) {
      setScore(prev => prev + 25 + round * 5);
      setTotalCorrect(prev => prev + 1);
    }

    setTimeout(() => {
      if (round >= 8) {
        const finalScore = score + (isCorrect ? (25 + round * 5) : 0);
        const finalCorrect = totalCorrect + (isCorrect ? 1 : 0);
        const acc = Math.round((finalCorrect / 8) * 100);
        setGameState('results');
        onGameComplete?.(finalScore, 8, acc);
      } else {
        const nextRound = round + 1;
        setRound(nextRound);
        generateLevel(nextRound);
      }
    }, 1500);
  };

  const renderShapeSvg = (shape: PlacedShape) => {
    const half = shape.size / 2;
    switch (shape.type) {
      case 'circle':
        return <circle cx="16" cy="16" r="14" fill={shape.color} />;
      case 'square':
        return <rect x="3" y="3" width="26" height="26" rx="3" fill={shape.color} />;
      case 'triangle':
        return <polygon points="16,3 29,28 3,28" fill={shape.color} />;
      case 'diamond':
        return <polygon points="16,2 29,16 16,30 3,16" fill={shape.color} />;
      case 'star':
        return <polygon points="16,2 20,11 29,12 23,18 25,28 16,22 7,28 9,18 3,12 12,11" fill={shape.color} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#090B0F] text-white flex flex-col items-center p-4">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Shape Counting"
              description="Quickly scan the visual canvas and count how many of the specified shape are scattered across the scene."
              icon={<Shapes className="w-14 h-14 text-cyan-400" />}
              iconBgColor="bg-cyan-500/20"
              iconColor="text-cyan-400"
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
              className="flex flex-col gap-4"
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
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{score} pts</span>
                </div>
              </div>

              {/* Instruction banner */}
              <div className="bg-[#12151D] border border-cyan-500/20 rounded-2xl p-4 text-center">
                <p className="text-xs uppercase tracking-wider text-cyan-400 font-bold mb-1">Visual Target</p>
                <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                  How many <span className="text-cyan-300 capitalize">{SHAPE_NAMES[targetType]}</span> can you see?
                </h3>
              </div>

              {/* Shapes Canvas Container */}
              <div className="relative w-full aspect-square bg-[#0c1017] border border-white/10 rounded-2xl overflow-hidden shadow-inner">
                {shapes.map(s => (
                  <div
                    key={s.id}
                    style={{
                      position: 'absolute',
                      left: `${s.x}%`,
                      top: `${s.y}%`,
                      width: `${s.size}px`,
                      height: `${s.size}px`,
                      transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
                      opacity: isAnswered && s.type === targetType ? 1 : 0.85
                    }}
                    className={`transition-all duration-300 ${
                      isAnswered && s.type === targetType ? 'ring-2 ring-white scale-125 z-10' : ''
                    }`}
                  >
                    <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow">
                      {renderShapeSvg(s)}
                    </svg>
                  </div>
                ))}
              </div>

              {/* 4 Options Grid */}
              <div className="grid grid-cols-4 gap-3">
                {options.map(opt => {
                  let btnStyle = 'bg-[#12151D] border-white/10 text-white hover:border-cyan-500/50 hover:bg-cyan-500/10';
                  if (isAnswered) {
                    if (opt === actualTargetCount) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
                    } else if (opt === selectedOption) {
                      btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                    } else {
                      btnStyle = 'bg-[#12151D]/50 border-white/5 text-white/30';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(opt)}
                      className={`py-4 rounded-xl border text-xl font-bold transition-all shadow flex flex-col items-center justify-center ${btnStyle}`}
                    >
                      <span>{opt}</span>
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
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Visual Search Complete!</h2>
                <p className="text-sm text-white/60">Spatial Counting & Focus Metrics</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Score</div>
                  <div className="text-2xl font-bold text-cyan-400">{score}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Accuracy</div>
                  <div className="text-2xl font-bold text-emerald-400">{Math.round((totalCorrect / 8) * 100)}%</div>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={handleStart}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
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

export default ShapeCountingGame;
