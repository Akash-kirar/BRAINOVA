import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Hash, Trophy, RotateCcw, Sparkles, Check, X } from 'lucide-react';
import GameMenu from './GameMenu';

interface NumberSequenceGameProps {
  onBack: () => void;
  onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void;
}

interface SequenceQuestion {
  sequence: (number | string)[];
  correctAnswer: number;
  options: number[];
  ruleExplanation: string;
}

const SEQUENCE_POOLS: SequenceQuestion[] = [
  {
    sequence: [2, 4, 6, 8, '?'],
    correctAnswer: 10,
    options: [9, 10, 11, 12],
    ruleExplanation: 'Arithmetic progression: Adding 2 at each step (+2).'
  },
  {
    sequence: [3, 7, 11, 15, '?'],
    correctAnswer: 19,
    options: [18, 19, 20, 21],
    ruleExplanation: 'Arithmetic progression: Adding 4 at each step (+4).'
  },
  {
    sequence: [2, 4, 8, 16, '?'],
    correctAnswer: 32,
    options: [24, 30, 32, 64],
    ruleExplanation: 'Geometric progression: Multiplying by 2 each step (×2).'
  },
  {
    sequence: [50, 45, 40, 35, '?'],
    correctAnswer: 30,
    options: [25, 28, 30, 32],
    ruleExplanation: 'Subtraction progression: Subtracting 5 each step (-5).'
  },
  {
    sequence: [1, 4, 9, 16, '?'],
    correctAnswer: 25,
    options: [20, 24, 25, 36],
    ruleExplanation: 'Square numbers sequence: 1², 2², 3², 4², 5² = 25.'
  },
  {
    sequence: [1, 1, 2, 3, 5, '?'],
    correctAnswer: 8,
    options: [6, 7, 8, 9],
    ruleExplanation: 'Fibonacci sequence: Each number is the sum of the two preceding ones (3 + 5 = 8).'
  },
  {
    sequence: [100, 91, 82, 73, '?'],
    correctAnswer: 64,
    options: [62, 63, 64, 65],
    ruleExplanation: 'Decreasing arithmetic progression: Subtracting 9 each step (-9).'
  },
  {
    sequence: [3, 6, 12, 24, '?'],
    correctAnswer: 48,
    options: [36, 42, 48, 52],
    ruleExplanation: 'Geometric doubling: Multiplying previous term by 2 (24 × 2 = 48).'
  },
  {
    sequence: [5, 11, 23, 47, '?'],
    correctAnswer: 95,
    options: [91, 94, 95, 96],
    ruleExplanation: 'Multiply by 2 and add 1: (47 × 2) + 1 = 95.'
  },
  {
    sequence: [1, 8, 27, 64, '?'],
    correctAnswer: 125,
    options: [100, 120, 125, 216],
    ruleExplanation: 'Cube numbers sequence: 1³, 2³, 3³, 4³, 5³ = 125.'
  }
];

export const NumberSequenceGame: React.FC<NumberSequenceGameProps> = ({
  onBack,
  onGameComplete
}) => {
  const [gameState, setGameState] = useState<'menu' | 'game' | 'results'>('menu');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQ = SEQUENCE_POOLS[currentIndex % SEQUENCE_POOLS.length];

  const handleStart = () => {
    setGameState('game');
    setCurrentIndex(0);
    setScore(0);
    setTotalCorrect(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleSelect = (option: number) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === currentQ.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 25);
      setTotalCorrect(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 >= 8) {
        const finalCorrect = totalCorrect + (isCorrect ? 1 : 0);
        const finalScore = score + (isCorrect ? 25 : 0);
        const acc = Math.round((finalCorrect / 8) * 100);
        setGameState('results');
        onGameComplete?.(finalScore, 8, acc);
      } else {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
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
              title="Number Sequence"
              description="Identify arithmetic, geometric, and recursive rules governing numerical patterns to deduce the missing value."
              icon={<Hash className="w-14 h-14 text-indigo-400" />}
              iconBgColor="bg-indigo-500/20"
              iconColor="text-indigo-400"
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
                  Pattern {currentIndex + 1} / 8
                </div>
                <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{score} pts</span>
                </div>
              </div>

              {/* Sequence Display */}
              <div className="bg-[#12151D] border border-indigo-500/20 rounded-2xl p-6 text-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />
                <p className="text-xs uppercase tracking-wider text-indigo-400 font-bold mb-4">
                  What is the next number in the pattern?
                </p>

                <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                  {currentQ.sequence.map((item, idx) => (
                    <div
                      key={idx}
                      className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl flex items-center justify-center font-black text-xl sm:text-2xl shadow-md border ${
                        item === '?'
                          ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300 animate-pulse'
                          : 'bg-[#181B26] border-white/10 text-white'
                      }`}
                    >
                      {item === '?' && isAnswered ? currentQ.correctAnswer : item}
                    </div>
                  ))}
                </div>
              </div>

              {/* 4 Answer Options */}
              <div className="grid grid-cols-2 gap-3">
                {currentQ.options.map((opt) => {
                  let btnStyle = 'bg-[#12151D] border-white/10 text-white hover:border-indigo-500/40 hover:bg-white/5';
                  if (isAnswered) {
                    if (opt === currentQ.correctAnswer) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
                    } else if (opt === selectedOption) {
                      btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                    } else {
                      btnStyle = 'bg-[#12151D]/50 border-white/5 opacity-40';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      disabled={isAnswered}
                      onClick={() => handleSelect(opt)}
                      className={`p-4 rounded-xl border font-black text-2xl transition-all flex items-center justify-center shadow relative ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && opt === currentQ.correctAnswer && (
                        <Check className="w-5 h-5 text-emerald-400 absolute right-4" />
                      )}
                      {isAnswered && opt === selectedOption && opt !== currentQ.correctAnswer && (
                        <X className="w-5 h-5 text-rose-400 absolute right-4" />
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-indigo-950/30 border border-indigo-500/20 rounded-xl p-3 text-xs text-indigo-300 text-center"
                >
                  <span className="font-bold text-white">Rule:</span> {currentQ.ruleExplanation}
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
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Pattern Sequence Complete!</h2>
                <p className="text-sm text-white/60">Numerical Pattern Logic Score</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Score</div>
                  <div className="text-2xl font-bold text-indigo-400">{score}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Accuracy</div>
                  <div className="text-2xl font-bold text-emerald-400">{Math.round((totalCorrect / 8) * 100)}%</div>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={handleStart}
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
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

export default NumberSequenceGame;
