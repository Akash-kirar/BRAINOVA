import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Compass, Trophy, RotateCcw, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import GameMenu from './GameMenu';

// 0: path, 1: wall, 2: start, 3: exit
interface MazeConfig {
  grid: number[][];
  start: [number, number];
  exit: [number, number];
}

const MAZES: MazeConfig[] = [
  // 6x6 Maze
  {
    start: [1, 1],
    exit: [4, 4],
    grid: [
      [1, 1, 1, 1, 1, 1],
      [1, 2, 0, 1, 0, 1],
      [1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 3, 1],
      [1, 1, 1, 1, 1, 1]
    ]
  },
  // 7x7 Maze
  {
    start: [1, 1],
    exit: [5, 5],
    grid: [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 2, 0, 0, 1, 0, 1],
      [1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 3, 1],
      [1, 1, 1, 1, 1, 1, 1]
    ]
  }
];

export default function SimpleMazeGame({ onBack, onGameComplete }: { onBack: () => void; onGameComplete?: (score: number, maxLevel: number) => void }) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [levelIdx, setLevelIdx] = useState(0);
  const [playerPos, setPlayerPos] = useState<[number, number]>([1, 1]);
  const [score, setScore] = useState(0);

  const maze = MAZES[levelIdx] || MAZES[0];

  const initLevel = (idx: number) => {
    setLevelIdx(idx);
    const m = MAZES[idx] || MAZES[0];
    setPlayerPos([...m.start]);
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    initLevel(0);
  };

  const move = useCallback((dr: number, dc: number) => {
    setPlayerPos(([r, c]) => {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= maze.grid.length || nc < 0 || nc >= maze.grid[0].length) return [r, c];
      if (maze.grid[nr][nc] === 1) return [r, c]; // Wall

      // Check exit
      if (nr === maze.exit[0] && nc === maze.exit[1]) {
        const nextScore = score + 80;
        setScore(nextScore);
        setTimeout(() => {
          if (levelIdx < MAZES.length - 1) {
            initLevel(levelIdx + 1);
          } else {
            setGameState('gameover');
            if (onGameComplete) onGameComplete(nextScore, MAZES.length);
          }
        }, 400);
      }

      return [nr, nc];
    });
  }, [maze, score, levelIdx, onGameComplete]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w') move(-1, 0);
      else if (e.key === 'ArrowDown' || e.key === 's') move(1, 0);
      else if (e.key === 'ArrowLeft' || e.key === 'a') move(0, -1);
      else if (e.key === 'ArrowRight' || e.key === 'd') move(0, 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState, move]);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] text-white select-none overflow-hidden font-sans">
      <div className="flex items-center justify-between px-6 py-4 bg-[#0e131f] border-b border-white/5 shrink-0">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5 text-white/80" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
            <Compass className="w-4 h-4 text-rose-400" />
          </div>
          <span className="font-bold text-base tracking-tight">Simple Maze</span>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Simple Maze"
              description="Navigate through maze corridors from the starting node to the exit gate."
              icon={<Compass className="w-14 h-14 text-rose-400" />}
              iconBgColor="bg-rose-500/20"
              iconColor="text-rose-400"
              showDifficulty={false}
              onStart={startGame}
              onBack={onBack}
            />
          )}

          {gameState === 'playing' && (
            <motion.div key="playing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full flex flex-col items-center flex-1 justify-between py-2">
              <div className="flex items-center justify-between w-full px-2">
                <span className="text-xs font-bold text-white/40 uppercase tracking-wider">MAZE {levelIdx + 1} / {MAZES.length}</span>
                <span className="text-xs font-bold text-rose-400 font-mono">SCORE: {score}</span>
              </div>

              {/* Maze Grid */}
              <div className="p-3 bg-[#121824] border border-white/10 rounded-3xl shadow-2xl my-auto">
                {maze.grid.map((row, r) => (
                  <div key={r} className="flex">
                    {row.map((cell, c) => {
                      const isPlayer = playerPos[0] === r && playerPos[1] === c;
                      const isExit = maze.exit[0] === r && maze.exit[1] === c;
                      return (
                        <div
                          key={c}
                          className={`w-10 h-10 sm:w-11 sm:h-11 m-0.5 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                            cell === 1
                              ? 'bg-[#1b2234] border border-white/5'
                              : isPlayer
                              ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.6)]'
                              : isExit
                              ? 'bg-emerald-500/30 border border-emerald-400 text-emerald-300 animate-pulse'
                              : 'bg-white/[0.02]'
                          }`}
                        >
                          {isPlayer && '⚡'}
                          {!isPlayer && isExit && '🏁'}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* D-Pad Controls for Touch */}
              <div className="flex flex-col items-center gap-1.5 my-2">
                <button onClick={() => move(-1, 0)} className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/15 active:scale-90 flex items-center justify-center transition-all cursor-pointer">
                  <ArrowUp className="w-5 h-5 text-white" />
                </button>
                <div className="flex gap-4">
                  <button onClick={() => move(0, -1)} className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/15 active:scale-90 flex items-center justify-center transition-all cursor-pointer">
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button onClick={() => move(1, 0)} className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/15 active:scale-90 flex items-center justify-center transition-all cursor-pointer">
                    <ArrowDown className="w-5 h-5 text-white" />
                  </button>
                  <button onClick={() => move(0, 1)} className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/15 active:scale-90 flex items-center justify-center transition-all cursor-pointer">
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              <span className="text-[11px] text-white/40">Use arrow keys or keypad to reach the flag 🏁.</span>
            </motion.div>
          )}

          {gameState === 'gameover' && (
            <motion.div key="gameover" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#121824] border border-white/10 rounded-3xl p-6 text-center max-w-sm w-full space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mx-auto text-rose-400">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Maze Cleared!</h2>
                <p className="text-xs text-white/50">Spatial navigation paths successfully resolved.</p>
              </div>
              <div className="bg-[#182133] rounded-2xl p-4 border border-white/5 text-center">
                <span className="text-[10px] text-white/40 block mb-0.5">FINAL SCORE</span>
                <span className="text-3xl font-black text-rose-400 font-mono">{score}</span>
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
