import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Target, Trophy, RotateCcw } from 'lucide-react';
import GameMenu from './GameMenu';

const ICONS = ['💎', '⭐', '🍎', '🚀', '⚡', '🔥'];

export default function CountTheObjectsGame({ onBack, onGameComplete }: { onBack: () => void; onGameComplete?: (score: number, maxLevel: number) => void }) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);

  const [items, setItems] = useState<string[]>([]);
  const [targetIcon, setTargetIcon] = useState<string>('💎');
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  const generateRound = useCallback((lvl: number) => {
    const totalItems = Math.min(24, 12 + lvl * 3);
    const chosenTarget = ICONS[Math.floor(Math.random() * ICONS.length)];
    const otherIcons = ICONS.filter(i => i !== chosenTarget);

    const targetCount = Math.floor(Math.random() * (4 + lvl * 2)) + 2;

    const roundItems: string[] = [];
    for (let i = 0; i < targetCount; i++) roundItems.push(chosenTarget);
    for (let i = 0; i < totalItems - targetCount; i++) {
      roundItems.push(otherIcons[Math.floor(Math.random() * otherIcons.length)]);
    }

    roundItems.sort(() => Math.random() - 0.5);

    const opts = new Set<number>([targetCount]);
    while (opts.size < 4) {
      const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
      const val = targetCount + delta;
      if (val >= 0 && val !== targetCount) opts.add(val);
    }

    setItems(roundItems);
    setTargetIcon(chosenTarget);
    setCorrectCount(targetCount);
    setOptions(Array.from(opts).sort((a, b) => a - b));
    setSelectedOpt(null);
  }, []);

  const startGame = () => {
    setLevel(1);
    setScore(0);
    setGameState('playing');
    generateRound(1);
  };

  const handleSelect = (count: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(count);

    if (count === correctCount) {
      const pts = 30 + level * 5;
      setScore(s => s + pts);

      setTimeout(() => {
        if (level < 5) {
          setLevel(l => l + 1);
          generateRound(level + 1);
        } else {
          setGameState('gameover');
          if (onGameComplete) onGameComplete(score + pts, 5);
        }
      }, 700);
    } else {
      setTimeout(() => {
        setGameState('gameover');
        if (onGameComplete) onGameComplete(score, level);
      }, 700);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] text-white select-none overflow-hidden font-sans">
      <div className="flex items-center justify-between px-6 py-4 bg-[#0e131f] border-b border-white/5 shrink-0">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5 text-white/80" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
            <Target className="w-4 h-4 text-purple-400" />
          </div>
          <span className="font-bold text-base tracking-tight">Count the Objects</span>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Count the Objects"
              description="Rapidly count how many designated target symbols are scattered among visual distractors."
              icon={<Target className="w-14 h-14 text-purple-400" />}
              iconBgColor="bg-purple-500/20"
              iconColor="text-purple-400"
              showDifficulty={false}
              onStart={startGame}
              onBack={onBack}
            />
          )}

          {gameState === 'playing' && (
            <motion.div key="playing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full flex flex-col items-center flex-1 justify-between py-2">
              <div className="flex items-center justify-between w-full px-2">
                <span className="text-xs font-bold text-white/40 uppercase">ROUND {level} / 5</span>
                <span className="text-xs font-bold text-purple-400 font-mono">SCORE: {score}</span>
              </div>

              {/* Target Prompt */}
              <div className="text-center my-2">
                <span className="text-xs text-white/50 block font-bold uppercase mb-1">COUNT HOW MANY:</span>
                <span className="text-4xl">{targetIcon}</span>
              </div>

              {/* Field of objects */}
              <div className="p-4 bg-[#121824] border border-white/10 rounded-3xl w-full flex flex-wrap gap-2.5 justify-center items-center my-auto min-h-[220px]">
                {items.map((icon, idx) => (
                  <div key={idx} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-2xl shadow-sm">
                    {icon}
                  </div>
                ))}
              </div>

              {/* Options */}
              <div className="grid grid-cols-4 gap-2.5 w-full my-auto">
                {options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt)}
                    className={`h-14 rounded-2xl border text-xl font-black font-mono transition-all active:scale-95 cursor-pointer ${
                      selectedOpt === opt
                        ? opt === correctCount
                          ? 'bg-emerald-500 border-emerald-400 text-black shadow-lg'
                          : 'bg-rose-500 border-rose-400 text-white'
                        : 'bg-[#141b2b] border-white/10 hover:border-purple-500/40 text-white'
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
              <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mx-auto text-purple-400">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Counting Session Complete!</h2>
                <p className="text-xs text-white/50">Rapid subitizing and object counting evaluated.</p>
              </div>
              <div className="bg-[#182133] rounded-2xl p-4 border border-white/5 text-center">
                <span className="text-[10px] text-white/40 block mb-0.5">FINAL SCORE</span>
                <span className="text-3xl font-black text-purple-400 font-mono">{score}</span>
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
