import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Search, Trophy, RotateCcw, Heart } from 'lucide-react';
import GameMenu from './GameMenu';

export default function FindTheNumberGame({ onBack, onGameComplete }: { onBack: () => void; onGameComplete?: (score: number, maxLevel: number) => void }) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(10);
  
  const [numbers, setNumbers] = useState<number[]>([]);
  const [targetNumber, setTargetNumber] = useState<number>(0);

  const generateGrid = useCallback((lvl: number) => {
    const count = 16; // 4x4
    const set = new Set<number>();
    while (set.size < count) {
      set.add(Math.floor(Math.random() * (50 + lvl * 20)) + 1);
    }
    const arr = Array.from(set).sort(() => Math.random() - 0.5);
    const target = arr[Math.floor(Math.random() * arr.length)];
    setNumbers(arr);
    setTargetNumber(target);
    setTimeLeft(Math.max(4, 10 - Math.floor(lvl / 3)));
  }, []);

  const startGame = () => {
    setLevel(1);
    setScore(0);
    setLives(3);
    setGameState('playing');
    generateGrid(1);
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    if (timeLeft <= 0) {
      handleWrong();
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleWrong = () => {
    setLives(l => {
      if (l <= 1) {
        setGameState('gameover');
        if (onGameComplete) onGameComplete(score, level);
        return 0;
      }
      generateGrid(level);
      return l - 1;
    });
  };

  const handleCellClick = (num: number) => {
    if (gameState !== 'playing') return;
    if (num === targetNumber) {
      const pts = 20 + level * 5 + timeLeft * 2;
      setScore(s => s + pts);
      setLevel(lvl => {
        const next = lvl + 1;
        generateGrid(next);
        return next;
      });
    } else {
      handleWrong();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] text-white select-none overflow-hidden font-sans">
      <div className="flex items-center justify-between px-6 py-4 bg-[#0e131f] border-b border-white/5 shrink-0">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5 text-white/80" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Search className="w-4 h-4 text-amber-400" />
          </div>
          <span className="font-bold text-base tracking-tight">Find the Number</span>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Find the Number"
              description="Locate the target number inside the randomized grid as fast as your eyes can scan."
              icon={<Search className="w-14 h-14 text-amber-400" />}
              iconBgColor="bg-amber-500/20"
              iconColor="text-amber-400"
              showDifficulty={false}
              onStart={startGame}
              onBack={onBack}
            />
          )}

          {gameState === 'playing' && (
            <motion.div key="playing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full flex flex-col items-center flex-1 justify-between py-2">
              <div className="flex items-center justify-between w-full px-2">
                <span className="text-xs font-bold text-white/40 uppercase">LEVEL {level}</span>
                <span className={`text-base font-bold font-mono ${timeLeft <= 2 ? 'text-rose-400 animate-pulse' : 'text-white'}`}>{timeLeft}s</span>
                <span className="text-xs font-bold text-amber-400 font-mono">SCORE: {score}</span>
              </div>

              <div className="flex gap-1.5 my-2">
                {[...Array(3)].map((_, i) => (
                  <Heart key={i} className={`w-5 h-5 ${i < lives ? 'fill-rose-500 text-rose-500' : 'text-white/10'}`} />
                ))}
              </div>

              {/* Target Prompt */}
              <div className="text-center my-2">
                <span className="text-xs text-white/50 block font-bold uppercase mb-1">FIND THIS NUMBER:</span>
                <div className="inline-block px-6 py-2 rounded-2xl bg-amber-500/20 border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                  <span className="text-3xl font-black text-amber-300 font-mono">{targetNumber}</span>
                </div>
              </div>

              {/* 4x4 Grid */}
              <div className="grid grid-cols-4 gap-2.5 w-full my-auto">
                {numbers.map((num, i) => (
                  <button
                    key={i}
                    onClick={() => handleCellClick(num)}
                    className="h-14 rounded-2xl bg-[#141b2b] border border-white/10 hover:border-amber-400/50 text-xl font-black font-mono text-white active:scale-95 cursor-pointer transition-transform"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {gameState === 'gameover' && (
            <motion.div key="gameover" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#121824] border border-white/10 rounded-3xl p-6 text-center max-w-sm w-full space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Visual Scan Complete!</h2>
                <p className="text-xs text-white/50">Rapid numerical identification rating recorded.</p>
              </div>
              <div className="bg-[#182133] rounded-2xl p-4 border border-white/5 text-center">
                <span className="text-[10px] text-white/40 block mb-0.5">FINAL SCORE</span>
                <span className="text-3xl font-black text-amber-400 font-mono">{score}</span>
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
