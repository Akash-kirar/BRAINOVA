import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Grid, Trophy } from 'lucide-react';
import GameMenu from './GameMenu';

interface GridQuestion {
  id: number;
  matrix: (number | string)[][];
  ruleHint: string;
  missingValue: number;
  options: number[];
}

const QUESTIONS: GridQuestion[] = [
  {
    id: 1,
    matrix: [
      [2, 4, 6],
      [3, 6, 9],
      [4, 8, '?']
    ],
    ruleHint: 'Each row multiplies the first column by 1, 2, and 3.',
    missingValue: 12,
    options: [10, 12, 14, 16]
  },
  {
    id: 2,
    matrix: [
      [5, 10, 15],
      [7, 14, 21],
      [9, '?', 27]
    ],
    ruleHint: 'Each row follows a multiplication table pattern.',
    missingValue: 18,
    options: [16, 18, 20, 22]
  },
  {
    id: 3,
    matrix: [
      [1, 4, 5],
      [2, 3, 5],
      [4, 5, '?']
    ],
    ruleHint: 'The third column is the sum of the first two columns.',
    missingValue: 9,
    options: [8, 9, 10, 11]
  }
];

export default function NumberGridGame({ onBack, onGameComplete }: { onBack: () => void; onGameComplete?: (score: number, maxLevel: number) => void }) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  const q = QUESTIONS[qIdx];

  const startGame = () => {
    setGameState('playing');
    setQIdx(0);
    setScore(0);
    setSelectedOpt(null);
  };

  const handleSelect = (opt: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(opt);

    if (opt === q.missingValue) {
      setScore(s => s + 40);
      setTimeout(() => {
        if (qIdx < QUESTIONS.length - 1) {
          setQIdx(i => i + 1);
          setSelectedOpt(null);
        } else {
          setGameState('gameover');
          if (onGameComplete) onGameComplete(score + 40, QUESTIONS.length);
        }
      }, 700);
    } else {
      setTimeout(() => setSelectedOpt(null), 700);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] text-white select-none overflow-hidden font-sans">
      <div className="flex items-center justify-between px-6 py-4 bg-[#0e131f] border-b border-white/5 shrink-0">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5 text-white/80" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
            <Grid className="w-4 h-4 text-blue-400" />
          </div>
          <span className="font-bold text-base tracking-tight">Number Grid</span>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Number Grid"
              description="Deduce mathematical row and column relationships to find the missing grid number."
              icon={<Grid className="w-14 h-14 text-blue-400" />}
              iconBgColor="bg-blue-500/20"
              iconColor="text-blue-400"
              showDifficulty={false}
              onStart={startGame}
              onBack={onBack}
            />
          )}

          {gameState === 'playing' && (
            <motion.div key="playing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full flex flex-col items-center flex-1 justify-between py-4">
              <div className="flex items-center justify-between w-full px-2">
                <span className="text-xs font-bold text-white/40 uppercase tracking-wider">GRID {qIdx + 1} / {QUESTIONS.length}</span>
                <span className="text-xs font-bold text-blue-400 font-mono">SCORE: {score}</span>
              </div>

              {/* 3x3 Matrix Card */}
              <div className="p-4 bg-[#121824] border border-white/10 rounded-3xl shadow-2xl my-auto">
                <div className="grid grid-cols-3 gap-2">
                  {q.matrix.map((row, r) =>
                    row.map((val, c) => (
                      <div
                        key={`${r}-${c}`}
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black font-mono border transition-all ${
                          val === '?'
                            ? 'bg-blue-500/20 border-blue-400 text-blue-300 animate-pulse'
                            : 'bg-[#182133] border-white/10 text-white'
                        }`}
                      >
                        {val}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <span className="text-xs text-white/50 text-center my-2 max-w-xs">{q.ruleHint}</span>

              {/* Options */}
              <div className="grid grid-cols-2 gap-3 w-full">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt)}
                    className={`h-14 rounded-2xl border text-xl font-black font-mono transition-all active:scale-95 cursor-pointer ${
                      selectedOpt === opt
                        ? opt === q.missingValue
                          ? 'bg-emerald-500 border-emerald-400 text-black shadow-lg'
                          : 'bg-rose-500 border-rose-400 text-white'
                        : 'bg-[#151c2c] border-white/10 hover:border-blue-400/40 text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {gameState === 'gameover' && (
            <motion.div key="gameover" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#121824] border border-white/10 rounded-3xl p-6 text-center max-w-sm w-full space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center mx-auto text-blue-400">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Grid Patterns Decoded!</h2>
                <p className="text-xs text-white/50">Mathematical relational intelligence validated.</p>
              </div>
              <div className="bg-[#182133] rounded-2xl p-4 border border-white/5 text-center">
                <span className="text-[10px] text-white/40 block mb-0.5">FINAL SCORE</span>
                <span className="text-3xl font-black text-blue-400 font-mono">{score}</span>
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={onBack} className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors">Exit</button>
                <button onClick={startGame} className="flex-1 py-3 rounded-xl bg-[#00D68F] hover:bg-[#05b378] text-black font-extrabold text-xs shadow-lg transition-transform active:scale-95">Play Again</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
