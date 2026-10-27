import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Eye, Heart, Trophy, RotateCcw, Sparkles } from 'lucide-react';
import GameMenu from './GameMenu';

const PALETTES = [
  { name: 'Emerald', hex: '#00D68F', bgClass: 'bg-[#00D68F]' },
  { name: 'Electric Blue', hex: '#3B82F6', bgClass: 'bg-[#3B82F6]' },
  { name: 'Crimson Rose', hex: '#F43F5E', bgClass: 'bg-[#F43F5E]' },
  { name: 'Golden Amber', hex: '#F59E0B', bgClass: 'bg-[#F59E0B]' },
  { name: 'Cyber Purple', hex: '#A855F7', bgClass: 'bg-[#A855F7]' },
  { name: 'Neon Cyan', hex: '#06B6D4', bgClass: 'bg-[#06B6D4]' },
  { name: 'Sunset Orange', hex: '#F97316', bgClass: 'bg-[#F97316]' },
  { name: 'Lime Green', hex: '#84CC16', bgClass: 'bg-[#84CC16]' },
  { name: 'Hot Pink', hex: '#EC4899', bgClass: 'bg-[#EC4899]' },
  { name: 'Deep Indigo', hex: '#6366F1', bgClass: 'bg-[#6366F1]' },
  { name: 'Teal', hex: '#14B8A6', bgClass: 'bg-[#14B8A6]' },
  { name: 'Coral Red', hex: '#EF4444', bgClass: 'bg-[#EF4444]' }
];

export default function ColorFinderGame({ onBack, onGameComplete }: { onBack: () => void; onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void }) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(8);

  const [targetColor, setTargetColor] = useState(PALETTES[0]);
  const [tiles, setTiles] = useState<typeof PALETTES>([]);
  const startTimeRef = useRef<number>(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);

  const generateLevel = useCallback((lvl: number) => {
    // Tile count increases: 4 -> 6 -> 8 -> 9 -> 12
    const tileCount = Math.min(12, 4 + Math.floor(lvl / 2) * 2);
    const shuffled = [...PALETTES].sort(() => Math.random() - 0.5).slice(0, tileCount);
    const chosen = shuffled[Math.floor(Math.random() * shuffled.length)];

    setTiles(shuffled);
    setTargetColor(chosen);
    setTimeLeft(Math.max(3, 8 - Math.floor(lvl / 4)));
    startTimeRef.current = performance.now();
  }, []);

  const startGame = () => {
    setScore(0);
    setLevel(1);
    setLives(3);
    setReactionTimes([]);
    setGameState('playing');
    generateLevel(1);
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
      generateLevel(level);
      return l - 1;
    });
  };

  const handleTileClick = (color: typeof PALETTES[0]) => {
    if (gameState !== 'playing') return;
    const rt = Math.round(performance.now() - startTimeRef.current);
    setReactionTimes(prev => [...prev, rt]);

    if (color.name === targetColor.name) {
      const speedBonus = Math.max(5, Math.floor((3000 - rt) / 100));
      const pts = 20 + speedBonus + level * 5;
      setScore(s => s + pts);

      setLevel(lvl => {
        const next = lvl + 1;
        generateLevel(next);
        return next;
      });
    } else {
      handleWrong();
    }
  };

  const avgSpeed = reactionTimes.length > 0 
    ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length) 
    : 0;

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] text-white select-none overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#0e131f] border-b border-white/5 shrink-0">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white/80" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <Eye className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="font-bold text-base tracking-tight">Color Finder</span>
        </div>

        <div className="w-10" />
      </div>

      {/* Main Body */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* MENU SCREEN */}
          {gameState === 'menu' && (
            <GameMenu
              title="Color Finder"
              description="Identify the target color shade rapidly among distractors before the countdown runs out."
              icon={<Eye className="w-14 h-14 text-cyan-400" />}
              iconBgColor="bg-cyan-500/20"
              iconColor="text-cyan-400"
              showDifficulty={false}
              onStart={startGame}
              onBack={onBack}
            />
          )}

          {/* ACTIVE PLAYING SCREEN */}
          {gameState === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex flex-col items-center flex-1 justify-between py-4"
            >
              {/* Header stats */}
              <div className="flex items-center justify-between w-full px-2">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-white/40 font-bold uppercase">LEVEL</span>
                  <span className="text-xl font-bold text-cyan-400">{level}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-white/40 font-bold uppercase">TIME</span>
                  <span className={`text-xl font-bold font-mono ${timeLeft <= 2 ? 'text-rose-400 animate-pulse' : 'text-white'}`}>
                    {timeLeft}s
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-white/40 font-bold uppercase">SCORE</span>
                  <span className="text-xl font-bold text-white">{score}</span>
                </div>
              </div>

              {/* Lives */}
              <div className="flex gap-1.5 my-2">
                {[...Array(3)].map((_, i) => (
                  <Heart
                    key={i}
                    className={`w-5 h-5 transition-colors ${
                      i < lives ? 'fill-rose-500 text-rose-500' : 'text-white/10'
                    }`}
                  />
                ))}
              </div>

              {/* Target Prompt Box */}
              <div className="text-center my-3">
                <span className="text-xs text-white/50 block font-bold uppercase tracking-wider mb-1.5">
                  TAP THIS COLOR:
                </span>
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-[#141b2b] border border-white/10 shadow-lg">
                  <div
                    className="w-5 h-5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                    style={{ backgroundColor: targetColor.hex }}
                  />
                  <span className="text-lg font-black text-white">{targetColor.name}</span>
                </div>
              </div>

              {/* Color Tiles Grid */}
              <div className={`grid gap-3 w-full max-w-[340px] my-auto ${
                tiles.length <= 4 ? 'grid-cols-2' : tiles.length <= 8 ? 'grid-cols-3' : 'grid-cols-4'
              }`}>
                {tiles.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTileClick(color)}
                    style={{ backgroundColor: color.hex }}
                    className="aspect-square rounded-2xl border-2 border-white/20 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                    title={color.name}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* GAMEOVER SCREEN */}
          {gameState === 'gameover' && (
            <motion.div
              key="gameover"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#121824] border border-white/10 rounded-3xl p-6 text-center max-w-sm w-full space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-xl font-black text-white">Observation Complete!</h2>
                <p className="text-xs text-white/50">Your visual color recognition speed</p>
              </div>

              <div className="bg-[#182133] rounded-2xl p-4 grid grid-cols-2 gap-2 border border-white/5">
                <div>
                  <span className="text-[10px] text-white/40 block mb-0.5">FINAL SCORE</span>
                  <span className="text-2xl font-black text-cyan-400 font-mono">{score}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 block mb-0.5">AVG REACTION</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">{avgSpeed}ms</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={onBack}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors"
                >
                  Exit
                </button>
                <button
                  onClick={startGame}
                  className="flex-1 py-3 rounded-xl bg-[#00D68F] hover:bg-[#05b378] text-black font-extrabold text-xs shadow-lg transition-transform active:scale-95"
                >
                  Play Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
