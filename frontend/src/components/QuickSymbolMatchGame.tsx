import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Target, Trophy, RotateCcw, Sparkles, Check, X, Timer } from 'lucide-react';
import GameMenu from './GameMenu';

interface QuickSymbolMatchGameProps {
  onBack: () => void;
  onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void;
}

const SYMBOLS = [
  '⚡', '⭐', '▲', '◆', '●', '■', '★', '✿', '✦', '✪', '✖', '✚', '☯', '♠', '♣', '♥', '♦', '☂'
];

export const QuickSymbolMatchGame: React.FC<QuickSymbolMatchGameProps> = ({
  onBack,
  onGameComplete
}) => {
  const [gameState, setGameState] = useState<'menu' | 'game' | 'results'>('menu');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [targetSymbol, setTargetSymbol] = useState('⚡');
  const [candidates, setCandidates] = useState<string[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const startTimeRef = useRef<number>(0);

  const generateRound = (r: number) => {
    // Pick target symbol
    const chosen = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    setTargetSymbol(chosen);

    // Number of candidates: 6 in early rounds, 9 in later rounds
    const totalCount = r <= 5 ? 6 : 9;
    const pool = SYMBOLS.filter(s => s !== chosen).sort(() => Math.random() - 0.5);
    const distractors = pool.slice(0, totalCount - 1);
    const combined = [...distractors, chosen].sort(() => Math.random() - 0.5);

    setCandidates(combined);
    setSelectedSymbol(null);
    setIsAnswered(false);
    startTimeRef.current = Date.now();
  };

  const handleStart = () => {
    setGameState('game');
    setRound(1);
    setScore(0);
    setTotalCorrect(0);
    setReactionTimes([]);
    generateRound(1);
  };

  const handleSelect = (sym: string) => {
    if (isAnswered) return;
    const elapsed = Date.now() - startTimeRef.current;
    setSelectedSymbol(sym);
    setIsAnswered(true);

    const isCorrect = sym === targetSymbol;
    if (isCorrect) {
      setReactionTimes(prev => [...prev, elapsed]);
      // Speed bonus: faster than 1200ms gives up to 50 pts
      const speedScore = Math.max(10, Math.round(50 - elapsed / 50));
      setScore(prev => prev + speedScore);
      setTotalCorrect(prev => prev + 1);
    }

    setTimeout(() => {
      if (round >= 10) {
        const finalCorrect = totalCorrect + (isCorrect ? 1 : 0);
        const acc = Math.round((finalCorrect / 10) * 100);
        setGameState('results');
        onGameComplete?.(score, 10, acc);
      } else {
        const nextR = round + 1;
        setRound(nextR);
        generateRound(nextR);
      }
    }, 800);
  };

  const avgReaction = reactionTimes.length > 0
    ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
    : 0;

  return (
    <div className="w-full min-h-screen bg-[#090B0F] text-white flex flex-col items-center p-4">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Quick Symbol Match"
              description="Rapid visual processing: locate the matching target symbol from the grid below with maximum speed and precision."
              icon={<Target className="w-14 h-14 text-emerald-400" />}
              iconBgColor="bg-emerald-500/20"
              iconColor="text-emerald-400"
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
                  Round {round} / 10
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{score} pts</span>
                </div>
              </div>

              {/* Target Symbol Box */}
              <div className="bg-[#12151D] border border-emerald-500/30 rounded-2xl p-6 text-center shadow-lg relative overflow-hidden flex flex-col items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 pointer-events-none" />
                <p className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-2">Find Matching Symbol</p>
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl shadow-inner animate-pulse">
                  {targetSymbol}
                </div>
              </div>

              {/* Symbol Grid */}
              <div className={`grid gap-3 ${candidates.length === 6 ? 'grid-cols-3' : 'grid-cols-3'}`}>
                {candidates.map((sym, idx) => {
                  let btnStyle = 'bg-[#12151D] border-white/10 hover:border-emerald-500/40 hover:bg-white/5';
                  if (isAnswered) {
                    if (sym === targetSymbol) {
                      btnStyle = 'bg-emerald-500/25 border-emerald-500 text-emerald-300';
                    } else if (sym === selectedSymbol) {
                      btnStyle = 'bg-rose-500/25 border-rose-500 text-rose-300';
                    } else {
                      btnStyle = 'bg-[#12151D]/40 border-white/5 opacity-30';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelect(sym)}
                      className={`h-24 rounded-2xl border text-3xl flex items-center justify-center transition-all shadow-md active:scale-95 ${btnStyle}`}
                    >
                      <span>{sym}</span>
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
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Visual Search Complete!</h2>
                <p className="text-sm text-white/60">Symbol Discrimination & Processing Speed</p>
              </div>

              <div className="grid grid-cols-3 gap-3 w-full">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Score</div>
                  <div className="text-xl font-bold text-emerald-400">{score}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Avg Speed</div>
                  <div className="text-xl font-bold text-cyan-400">{avgReaction}ms</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Accuracy</div>
                  <div className="text-xl font-bold text-emerald-400">{Math.round((totalCorrect / 10) * 100)}%</div>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={handleStart}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
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

export default QuickSymbolMatchGame;
