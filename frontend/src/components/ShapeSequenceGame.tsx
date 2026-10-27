import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Shapes, Trophy, RotateCcw, Sparkles, Check, X } from 'lucide-react';
import GameMenu from './GameMenu';

interface ShapeSequenceGameProps {
  onBack: () => void;
  onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void;
}

interface ShapeItem {
  id: string;
  render: () => React.ReactNode;
}

interface ShapePattern {
  name: string;
  sequence: (ShapeItem | null)[];
  options: ShapeItem[];
  correctId: string;
  explanation: string;
}

const renderCircle = (color: string) => (
  <svg viewBox="0 0 32 32" className="w-8 h-8">
    <circle cx="16" cy="16" r="12" fill={color} />
  </svg>
);

const renderSquare = (color: string) => (
  <svg viewBox="0 0 32 32" className="w-8 h-8">
    <rect x="5" y="5" width="22" height="22" rx="3" fill={color} />
  </svg>
);

const renderTriangle = (color: string) => (
  <svg viewBox="0 0 32 32" className="w-8 h-8">
    <polygon points="16,4 28,26 4,26" fill={color} />
  </svg>
);

const renderDiamond = (color: string) => (
  <svg viewBox="0 0 32 32" className="w-8 h-8">
    <polygon points="16,3 28,16 16,29 4,16" fill={color} />
  </svg>
);

const renderStar = (color: string) => (
  <svg viewBox="0 0 32 32" className="w-8 h-8">
    <polygon points="16,2 20,11 29,12 23,18 25,28 16,22 7,28 9,18 3,12 12,11" fill={color} />
  </svg>
);

const renderRotatedArrow = (deg: number, color: string) => (
  <svg viewBox="0 0 32 32" className="w-8 h-8" style={{ transform: `rotate(${deg}deg)` }}>
    <polygon points="16,3 27,15 20,15 20,29 12,29 12,15 5,15" fill={color} />
  </svg>
);

const PATTERNS: ShapePattern[] = [
  {
    name: 'Alternating Circle & Square',
    sequence: [
      { id: 'c1', render: () => renderCircle('#3B82F6') },
      { id: 's1', render: () => renderSquare('#EC4899') },
      { id: 'c2', render: () => renderCircle('#3B82F6') },
      { id: 's2', render: () => renderSquare('#EC4899') },
      null
    ],
    options: [
      { id: 'opt_circle_blue', render: () => renderCircle('#3B82F6') },
      { id: 'opt_square_pink', render: () => renderSquare('#EC4899') },
      { id: 'opt_tri_green', render: () => renderTriangle('#10B981') },
      { id: 'opt_diamond_yellow', render: () => renderDiamond('#F59E0B') }
    ],
    correctId: 'opt_circle_blue',
    explanation: 'Alternating ABABA sequence (Circle -> Square -> Circle -> Square -> Circle).'
  },
  {
    name: 'Progressive Polygon Sides (3 -> 4 -> 5 -> 6)',
    sequence: [
      { id: 'tri', render: () => renderTriangle('#10B981') },
      { id: 'sq', render: () => renderSquare('#10B981') },
      { id: 'dia', render: () => renderDiamond('#10B981') },
      null
    ],
    options: [
      { id: 'opt_star', render: () => renderStar('#10B981') },
      { id: 'opt_circle', render: () => renderCircle('#10B981') },
      { id: 'opt_sq_pink', render: () => renderSquare('#EC4899') },
      { id: 'opt_tri_blue', render: () => renderTriangle('#3B82F6') }
    ],
    correctId: 'opt_star',
    explanation: 'Progressive point/side complexity: 3 sides -> 4 sides -> 4 points -> 5-pointed star.'
  },
  {
    name: 'Clockwise Rotational Arrow (0° -> 90° -> 180° -> 270°)',
    sequence: [
      { id: 'a0', render: () => renderRotatedArrow(0, '#06B6D4') },
      { id: 'a90', render: () => renderRotatedArrow(90, '#06B6D4') },
      { id: 'a180', render: () => renderRotatedArrow(180, '#06B6D4') },
      null
    ],
    options: [
      { id: 'opt_a270', render: () => renderRotatedArrow(270, '#06B6D4') },
      { id: 'opt_a0', render: () => renderRotatedArrow(0, '#06B6D4') },
      { id: 'opt_a45', render: () => renderRotatedArrow(45, '#06B6D4') },
      { id: 'opt_a135', render: () => renderRotatedArrow(135, '#06B6D4') }
    ],
    correctId: 'opt_a270',
    explanation: 'Arrow rotates 90 degrees clockwise at each step (Up -> Right -> Down -> Left).'
  },
  {
    name: 'Triple Cycle (Square -> Circle -> Triangle)',
    sequence: [
      { id: 'sq1', render: () => renderSquare('#F59E0B') },
      { id: 'ci1', render: () => renderCircle('#8B5CF6') },
      { id: 'tr1', render: () => renderTriangle('#10B981') },
      { id: 'sq2', render: () => renderSquare('#F59E0B') },
      null
    ],
    options: [
      { id: 'opt_circle_purple', render: () => renderCircle('#8B5CF6') },
      { id: 'opt_tri_green', render: () => renderTriangle('#10B981') },
      { id: 'opt_square_gold', render: () => renderSquare('#F59E0B') },
      { id: 'opt_star_cyan', render: () => renderStar('#06B6D4') }
    ],
    correctId: 'opt_circle_purple',
    explanation: 'Three-state recurring sequence: Square, Circle, Triangle, Square, Circle.'
  },
  {
    name: 'Color Shift Cycle',
    sequence: [
      { id: 'd_blue', render: () => renderDiamond('#3B82F6') },
      { id: 'd_rose', render: () => renderDiamond('#F43F5E') },
      { id: 'd_emerald', render: () => renderDiamond('#10B981') },
      { id: 'd_blue2', render: () => renderDiamond('#3B82F6') },
      null
    ],
    options: [
      { id: 'opt_rose', render: () => renderDiamond('#F43F5E') },
      { id: 'opt_emerald', render: () => renderDiamond('#10B981') },
      { id: 'opt_amber', render: () => renderDiamond('#F59E0B') },
      { id: 'opt_purple', render: () => renderDiamond('#8B5CF6') }
    ],
    correctId: 'opt_rose',
    explanation: 'Shape remains constant while color cycles: Blue -> Rose -> Emerald -> Blue -> Rose.'
  }
];

export const ShapeSequenceGame: React.FC<ShapeSequenceGameProps> = ({
  onBack,
  onGameComplete
}) => {
  const [gameState, setGameState] = useState<'menu' | 'game' | 'results'>('menu');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentPattern = PATTERNS[currentIndex % PATTERNS.length];

  const handleStart = () => {
    setGameState('game');
    setCurrentIndex(0);
    setScore(0);
    setTotalCorrect(0);
    setSelectedId(null);
    setIsAnswered(false);
  };

  const handleSelect = (id: string) => {
    if (isAnswered) return;
    setSelectedId(id);
    setIsAnswered(true);

    const isCorrect = id === currentPattern.correctId;
    if (isCorrect) {
      setScore(prev => prev + 25);
      setTotalCorrect(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 >= PATTERNS.length) {
        const finalCorrect = totalCorrect + (isCorrect ? 1 : 0);
        const finalScore = score + (isCorrect ? 25 : 0);
        const acc = Math.round((finalCorrect / PATTERNS.length) * 100);
        setGameState('results');
        onGameComplete?.(finalScore, PATTERNS.length, acc);
      } else {
        setCurrentIndex(prev => prev + 1);
        setSelectedId(null);
        setIsAnswered(false);
      }
    }, 1700);
  };

  return (
    <div className="w-full min-h-screen bg-[#090B0F] text-white flex flex-col items-center p-4">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Shape Sequence"
              description="Identify the transformation rule across geometric shapes and choose the missing shape that completes the sequence."
              icon={<Shapes className="w-14 h-14 text-purple-400" />}
              iconBgColor="bg-purple-500/20"
              iconColor="text-purple-400"
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
                  Pattern {currentIndex + 1} / {PATTERNS.length}
                </div>
                <div className="flex items-center gap-1.5 text-purple-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{score} pts</span>
                </div>
              </div>

              {/* Sequence Display Box */}
              <div className="bg-[#12151D] border border-purple-500/20 rounded-2xl p-6 text-center shadow-lg relative overflow-hidden">
                <p className="text-xs uppercase tracking-wider text-purple-400 font-bold mb-4">
                  Which shape completes the sequence?
                </p>

                <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
                  {currentPattern.sequence.map((item, idx) => (
                    <div
                      key={idx}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center border shadow-md ${
                        item === null
                          ? 'bg-purple-500/20 border-purple-400 border-dashed animate-pulse'
                          : 'bg-[#181B26] border-white/10'
                      }`}
                    >
                      {item ? (
                        item.render()
                      ) : isAnswered ? (
                        currentPattern.options.find(o => o.id === currentPattern.correctId)?.render()
                      ) : (
                        <span className="text-xl font-bold text-purple-400">?</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 4 Options Grid */}
              <div className="grid grid-cols-2 gap-3">
                {currentPattern.options.map((opt) => {
                  let btnStyle = 'bg-[#12151D] border-white/10 hover:border-purple-500/40 hover:bg-white/5';
                  if (isAnswered) {
                    if (opt.id === currentPattern.correctId) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
                    } else if (opt.id === selectedId) {
                      btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                    } else {
                      btnStyle = 'bg-[#12151D]/50 border-white/5 opacity-40';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={isAnswered}
                      onClick={() => handleSelect(opt.id)}
                      className={`h-24 rounded-xl border flex items-center justify-center transition-all shadow relative ${btnStyle}`}
                    >
                      <div className="w-10 h-10 flex items-center justify-center">
                        {opt.render()}
                      </div>
                      {isAnswered && opt.id === currentPattern.correctId && (
                        <Check className="w-5 h-5 text-emerald-400 absolute right-3" />
                      )}
                      {isAnswered && opt.id === selectedId && opt.id !== currentPattern.correctId && (
                        <X className="w-5 h-5 text-rose-400 absolute right-3" />
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-purple-950/30 border border-purple-500/20 rounded-xl p-3 text-xs text-purple-300 text-center"
                >
                  <span className="font-bold text-white">Rule:</span> {currentPattern.explanation}
                </motion.div>
              )}
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
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Visual Pattern Mastery!</h2>
                <p className="text-sm text-white/60">Shape Progression Completed</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Score</div>
                  <div className="text-2xl font-bold text-purple-400">{score}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Accuracy</div>
                  <div className="text-2xl font-bold text-emerald-400">{Math.round((totalCorrect / PATTERNS.length) * 100)}%</div>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={handleStart}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
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

export default ShapeSequenceGame;
