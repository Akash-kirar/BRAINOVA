import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Palette, Trophy, RotateCcw, Sparkles, Check, X } from 'lucide-react';
import GameMenu from './GameMenu';

interface CompleteTheDrawingGameProps {
  onBack: () => void;
  onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void;
}

interface DrawingPuzzle {
  title: string;
  renderIncomplete: () => React.ReactNode;
  options: {
    id: number;
    render: () => React.ReactNode;
  }[];
  correctId: number;
  explanation: string;
}

const PUZZLES: DrawingPuzzle[] = [
  {
    title: 'Symmetric Mandala Crest',
    renderIncomplete: () => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Top-left */}
        <circle cx="35" cy="35" r="14" fill="#3B82F6" />
        <rect x="25" y="25" width="20" height="20" fill="#60A5FA" />
        {/* Top-right */}
        <circle cx="65" cy="35" r="14" fill="#3B82F6" />
        <rect x="55" y="25" width="20" height="20" fill="#60A5FA" />
        {/* Bottom-left */}
        <circle cx="35" cy="65" r="14" fill="#3B82F6" />
        <rect x="25" y="55" width="20" height="20" fill="#60A5FA" />
        {/* Missing Bottom-right quadrant with dashed placeholder */}
        <rect x="50" y="50" width="40" height="40" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" rx="4" />
        <text x="70" y="73" fill="#F59E0B" fontSize="16" textAnchor="middle" fontWeight="bold">?</text>
      </svg>
    ),
    options: [
      {
        id: 1,
        render: () => (
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <circle cx="25" cy="25" r="14" fill="#3B82F6" />
            <rect x="15" y="15" width="20" height="20" fill="#60A5FA" />
          </svg>
        )
      },
      {
        id: 2,
        render: () => (
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <polygon points="25,10 40,40 10,40" fill="#EC4899" />
          </svg>
        )
      },
      {
        id: 3,
        render: () => (
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <circle cx="25" cy="25" r="18" fill="none" stroke="#10B981" strokeWidth="3" />
          </svg>
        )
      },
      {
        id: 4,
        render: () => (
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <rect x="10" y="10" width="30" height="30" fill="#8B5CF6" />
          </svg>
        )
      }
    ],
    correctId: 1,
    explanation: 'Four-fold rotational symmetry requires the blue circle and square in the bottom-right quadrant.'
  },
  {
    title: 'Segmented Hexagon Ring',
    renderIncomplete: () => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Hexagonal wedge segments */}
        <path d="M 50 50 L 50 15 A 35 35 0 0 1 80 32 Z" fill="#10B981" stroke="#090B0F" strokeWidth="2" />
        <path d="M 50 50 L 80 32 A 35 35 0 0 1 80 68 Z" fill="#14B8A6" stroke="#090B0F" strokeWidth="2" />
        <path d="M 50 50 L 80 68 A 35 35 0 0 1 50 85 Z" fill="#06B6D4" stroke="#090B0F" strokeWidth="2" />
        <path d="M 50 50 L 50 85 A 35 35 0 0 1 20 68 Z" fill="#0EA5E9" stroke="#090B0F" strokeWidth="2" />
        <path d="M 50 50 L 20 68 A 35 35 0 0 1 20 32 Z" fill="#3B82F6" stroke="#090B0F" strokeWidth="2" />
        {/* Missing top-left wedge */}
        <path d="M 50 50 L 20 32 A 35 35 0 0 1 50 15 Z" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />
        <text x="38" y="38" fill="#F59E0B" fontSize="14" fontWeight="bold">?</text>
      </svg>
    ),
    options: [
      {
        id: 1,
        render: () => (
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <rect x="10" y="10" width="30" height="30" fill="#F43F5E" />
          </svg>
        )
      },
      {
        id: 2,
        render: () => (
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <path d="M 35 35 L 10 20 A 25 25 0 0 1 35 10 Z" fill="#6366F1" stroke="#ffffff" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 3,
        render: () => (
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <circle cx="25" cy="25" r="16" fill="#A855F7" />
          </svg>
        )
      },
      {
        id: 4,
        render: () => (
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <polygon points="25,5 45,40 5,40" fill="#EAB308" />
          </svg>
        )
      }
    ],
    correctId: 2,
    explanation: 'The matching wedge sector closes the 360-degree radial rosette.'
  },
  {
    title: 'Chevron Ribbon Arrow',
    renderIncomplete: () => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Repeating chevron bands */}
        <polyline points="15,20 50,55 85,20" fill="none" stroke="#A855F7" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="15,38 50,73 85,38" fill="none" stroke="#8B5CF6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Missing 3rd chevron */}
        <polyline points="15,56 50,91 85,56" fill="none" stroke="#F59E0B" strokeWidth="4" strokeDasharray="4 4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="50" y="80" fill="#F59E0B" fontSize="14" textAnchor="middle" fontWeight="bold">?</text>
      </svg>
    ),
    options: [
      {
        id: 1,
        render: () => (
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <circle cx="25" cy="25" r="14" fill="none" stroke="#3B82F6" strokeWidth="4" />
          </svg>
        )
      },
      {
        id: 2,
        render: () => (
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <line x1="10" y1="25" x2="40" y2="25" stroke="#10B981" strokeWidth="6" strokeLinecap="round" />
          </svg>
        )
      },
      {
        id: 3,
        render: () => (
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <polyline points="8,18 25,35 42,18" fill="none" stroke="#7C3AED" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      },
      {
        id: 4,
        render: () => (
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <polygon points="25,10 40,40 10,40" fill="#EC4899" />
          </svg>
        )
      }
    ],
    correctId: 3,
    explanation: 'The downward pointing V-chevron completes the rhythmic triple-chevron sequence.'
  },
  {
    title: 'Star Polygon Diamond Core',
    renderIncomplete: () => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* 4 outer star vertices */}
        <polygon points="50,5 58,35 42,35" fill="#EC4899" />
        <polygon points="95,50 65,58 65,42" fill="#EC4899" />
        <polygon points="50,95 42,65 58,65" fill="#EC4899" />
        <polygon points="5,50 35,42 35,58" fill="#EC4899" />
        {/* Missing center core */}
        <rect x="36" y="36" width="28" height="28" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />
        <text x="50" y="55" fill="#F59E0B" fontSize="14" textAnchor="middle" fontWeight="bold">?</text>
      </svg>
    ),
    options: [
      {
        id: 1,
        render: () => (
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <polygon points="25,8 42,25 25,42 8,25" fill="#F43F5E" />
          </svg>
        )
      },
      {
        id: 2,
        render: () => (
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <circle cx="25" cy="25" r="10" fill="#10B981" />
          </svg>
        )
      },
      {
        id: 3,
        render: () => (
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <polyline points="10,40 25,10 40,40" stroke="#06B6D4" strokeWidth="4" fill="none" />
          </svg>
        )
      },
      {
        id: 4,
        render: () => (
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <line x1="8" y1="8" x2="42" y2="42" stroke="#EAB308" strokeWidth="4" />
          </svg>
        )
      }
    ],
    correctId: 1,
    explanation: 'The central diamond connects all four outer vertices into a unified geometric star.'
  },
  {
    title: 'Concentric Nested Arcs',
    renderIncomplete: () => (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Left half arcs */}
        <path d="M 50 15 A 35 35 0 0 0 50 85" fill="none" stroke="#06B6D4" strokeWidth="5" strokeLinecap="round" />
        <path d="M 50 25 A 25 25 0 0 0 50 75" fill="none" stroke="#0EA5E9" strokeWidth="5" strokeLinecap="round" />
        <path d="M 50 35 A 15 15 0 0 0 50 65" fill="none" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" />
        {/* Missing right side arcs */}
        <path d="M 50 15 A 35 35 0 0 1 50 85" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
        <text x="68" y="54" fill="#F59E0B" fontSize="16" fontWeight="bold">?</text>
      </svg>
    ),
    options: [
      {
        id: 1,
        render: () => (
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <rect x="15" y="15" width="20" height="20" fill="#EC4899" />
          </svg>
        )
      },
      {
        id: 2,
        render: () => (
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <path d="M 15 10 A 20 20 0 0 1 15 40" fill="none" stroke="#06B6D4" strokeWidth="4" strokeLinecap="round" />
            <path d="M 15 17 A 13 13 0 0 1 15 33" fill="none" stroke="#0EA5E9" strokeWidth="4" strokeLinecap="round" />
          </svg>
        )
      },
      {
        id: 3,
        render: () => (
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <polygon points="10,25 40,10 40,40" fill="#EAB308" />
          </svg>
        )
      },
      {
        id: 4,
        render: () => (
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <line x1="25" y1="5" x2="25" y2="45" stroke="#10B981" strokeWidth="5" />
          </svg>
        )
      }
    ],
    correctId: 2,
    explanation: 'Mirrored concentric arcs complete the circular resonance pattern.'
  }
];

export const CompleteTheDrawingGame: React.FC<CompleteTheDrawingGameProps> = ({
  onBack,
  onGameComplete
}) => {
  const [gameState, setGameState] = useState<'menu' | 'game' | 'results'>('menu');
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentPuzzle = PUZZLES[round % PUZZLES.length];

  const handleStart = () => {
    setGameState('game');
    setRound(0);
    setScore(0);
    setTotalCorrect(0);
    setSelectedId(null);
    setIsAnswered(false);
  };

  const handleSelectOption = (id: number) => {
    if (isAnswered) return;
    setSelectedId(id);
    setIsAnswered(true);

    const isCorrect = id === currentPuzzle.correctId;
    if (isCorrect) {
      setScore(prev => prev + 35);
      setTotalCorrect(prev => prev + 1);
    }

    setTimeout(() => {
      if (round + 1 >= PUZZLES.length) {
        const finalCorrect = totalCorrect + (isCorrect ? 1 : 0);
        const finalScore = score + (isCorrect ? 35 : 0);
        const acc = Math.round((finalCorrect / PUZZLES.length) * 100);
        setGameState('results');
        onGameComplete?.(finalScore, PUZZLES.length, acc);
      } else {
        setRound(prev => prev + 1);
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
              title="Complete the Drawing"
              description="Analyze incomplete visual figures and select the missing geometric component that restores balance, pattern, and closure."
              icon={<Palette className="w-14 h-14 text-pink-400" />}
              iconBgColor="bg-pink-500/20"
              iconColor="text-pink-400"
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
              className="flex flex-col gap-5"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={onBack}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="text-sm font-semibold text-white/60">
                  Pattern {round + 1} / {PUZZLES.length}
                </div>
                <div className="flex items-center gap-1.5 text-pink-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{score} pts</span>
                </div>
              </div>

              {/* Main Incomplete Drawing Display */}
              <div className="bg-[#12151D] border border-white/10 rounded-2xl p-6 flex flex-col items-center shadow-lg relative overflow-hidden">
                <p className="text-xs uppercase tracking-wider text-pink-400 font-bold mb-2">
                  {currentPuzzle.title}
                </p>
                <div className="w-52 h-52 bg-[#0a0d14] rounded-2xl p-3 border border-white/10 shadow-inner flex items-center justify-center">
                  {currentPuzzle.renderIncomplete()}
                </div>
                <p className="text-xs text-white/50 mt-3">Select the matching piece to complete the composition</p>
              </div>

              {/* 4 Pieces Options */}
              <div className="grid grid-cols-2 gap-3">
                {currentPuzzle.options.map((opt) => {
                  let btnStyle = 'bg-[#12151D] border-white/10 hover:border-pink-500/40 hover:bg-white/5';
                  if (isAnswered) {
                    if (opt.id === currentPuzzle.correctId) {
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
                      onClick={() => handleSelectOption(opt.id)}
                      className={`p-4 rounded-xl border flex items-center justify-center h-28 transition-all shadow relative ${btnStyle}`}
                    >
                      <div className="w-16 h-16 flex items-center justify-center">
                        {opt.render()}
                      </div>
                      {isAnswered && opt.id === currentPuzzle.correctId && (
                        <div className="absolute top-2 right-2 p-1 rounded-full bg-emerald-500/30 text-emerald-400">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                      {isAnswered && opt.id === selectedId && opt.id !== currentPuzzle.correctId && (
                        <div className="absolute top-2 right-2 p-1 rounded-full bg-rose-500/30 text-rose-400">
                          <X className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-pink-950/30 border border-pink-500/20 rounded-xl p-3 text-xs text-pink-300 text-center"
                >
                  {currentPuzzle.explanation}
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
              <div className="w-16 h-16 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-pink-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Visual Synthesis Complete!</h2>
                <p className="text-sm text-white/60">Creativity & Gestalt Closure Score</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Score</div>
                  <div className="text-2xl font-bold text-pink-400">{score}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Accuracy</div>
                  <div className="text-2xl font-bold text-emerald-400">{Math.round((totalCorrect / PUZZLES.length) * 100)}%</div>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={handleStart}
                  className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
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

export default CompleteTheDrawingGame;
