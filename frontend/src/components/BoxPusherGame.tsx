import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Box, RotateCcw, Trophy, Undo2, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import GameMenu from './GameMenu';

// 0: floor, 1: wall, 2: goal, 3: box, 4: box on goal, 5: player, 6: player on goal
interface SokobanLevel {
  width: number;
  height: number;
  grid: number[][];
}

const SOKOBAN_LEVELS: SokobanLevel[] = [
  // Level 1: 5x5 simple 1 box
  {
    width: 5,
    height: 5,
    grid: [
      [1, 1, 1, 1, 1],
      [1, 5, 0, 0, 1],
      [1, 0, 3, 0, 1],
      [1, 0, 2, 0, 1],
      [1, 1, 1, 1, 1]
    ]
  },
  // Level 2: 6x6 2 boxes
  {
    width: 6,
    height: 6,
    grid: [
      [1, 1, 1, 1, 1, 1],
      [1, 5, 0, 1, 0, 1],
      [1, 0, 3, 0, 0, 1],
      [1, 0, 0, 3, 0, 1],
      [1, 2, 0, 0, 2, 1],
      [1, 1, 1, 1, 1, 1]
    ]
  }
];

export default function BoxPusherGame({ onBack, onGameComplete }: { onBack: () => void; onGameComplete?: (score: number, maxLevel: number) => void }) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [levelIdx, setLevelIdx] = useState(0);
  const [grid, setGrid] = useState<number[][]>([]);
  const [history, setHistory] = useState<number[][][]>([]);
  const [score, setScore] = useState(0);

  const initLevel = (idx: number) => {
    setLevelIdx(idx);
    const lvl = SOKOBAN_LEVELS[idx] || SOKOBAN_LEVELS[0];
    setGrid(lvl.grid.map(row => [...row]));
    setHistory([]);
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    initLevel(0);
  };

  // Find player position
  const getPlayerPos = (g: number[][]) => {
    for (let r = 0; r < g.length; r++) {
      for (let c = 0; c < g[r].length; c++) {
        if (g[r][c] === 5 || g[r][c] === 6) return { r, c };
      }
    }
    return { r: 1, c: 1 };
  };

  const isLevelCleared = (g: number[][]) => {
    // True if no cell is 3 (unplaced box)
    for (let r = 0; r < g.length; r++) {
      for (let c = 0; c < g[r].length; c++) {
        if (g[r][c] === 3) return false;
      }
    }
    return true;
  };

  const movePlayer = useCallback((dr: number, dc: number) => {
    setGrid(prev => {
      const { r, c } = getPlayerPos(prev);
      const nr = r + dr;
      const nc = c + dc;

      // Bounds
      if (nr < 0 || nr >= prev.length || nc < 0 || nc >= prev[0].length) return prev;
      const targetCell = prev[nr][nc];

      // Wall
      if (targetCell === 1) return prev;

      // Empty floor or goal
      if (targetCell === 0 || targetCell === 2) {
        setHistory(h => [...h, prev.map(row => [...row])]);
        const next = prev.map(row => [...row]);
        next[r][c] = prev[r][c] === 6 ? 2 : 0;
        next[nr][nc] = targetCell === 2 ? 6 : 5;
        return next;
      }

      // Box (3 or 4)
      if (targetCell === 3 || targetCell === 4) {
        const bnr = nr + dr;
        const bnc = nc + dc;

        if (bnr < 0 || bnr >= prev.length || bnc < 0 || bnc >= prev[0].length) return prev;
        const boxTargetCell = prev[bnr][bnc];

        // Box can only move to floor (0) or goal (2)
        if (boxTargetCell === 0 || boxTargetCell === 2) {
          setHistory(h => [...h, prev.map(row => [...row])]);
          const next = prev.map(row => [...row]);
          // Move box
          next[bnr][bnc] = boxTargetCell === 2 ? 4 : 3;
          // Move player
          next[nr][nc] = targetCell === 4 ? 6 : 5;
          next[r][c] = prev[r][c] === 6 ? 2 : 0;

          if (isLevelCleared(next)) {
            const nextScore = score + 120;
            setScore(nextScore);
            setTimeout(() => {
              if (levelIdx < SOKOBAN_LEVELS.length - 1) {
                initLevel(levelIdx + 1);
              } else {
                setGameState('gameover');
                if (onGameComplete) onGameComplete(nextScore, SOKOBAN_LEVELS.length);
              }
            }, 600);
          }

          return next;
        }
      }

      return prev;
    });
  }, [score, levelIdx, onGameComplete]);

  // Keyboard navigation
  useEffect(() => {
    if (gameState !== 'playing') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w') movePlayer(-1, 0);
      else if (e.key === 'ArrowDown' || e.key === 's') movePlayer(1, 0);
      else if (e.key === 'ArrowLeft' || e.key === 'a') movePlayer(0, -1);
      else if (e.key === 'ArrowRight' || e.key === 'd') movePlayer(0, 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, movePlayer]);

  const handleUndo = () => {
    if (history.length > 0) {
      setGrid(history[history.length - 1]);
      setHistory(h => h.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] text-white select-none overflow-hidden font-sans">
      <div className="flex items-center justify-between px-6 py-4 bg-[#0e131f] border-b border-white/5 shrink-0">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5 text-white/80" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
            <Box className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="font-bold text-base tracking-tight">Box Pusher</span>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Box Pusher"
              description="Push all crates into designated target drop zones without getting stuck in corners."
              icon={<Box className="w-14 h-14 text-indigo-400" />}
              iconBgColor="bg-indigo-500/20"
              iconColor="text-indigo-400"
              showDifficulty={false}
              onStart={startGame}
              onBack={onBack}
            />
          )}

          {gameState === 'playing' && (
            <motion.div key="playing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full flex flex-col items-center flex-1 justify-between py-2">
              <div className="flex items-center justify-between w-full px-2">
                <span className="text-xs font-bold text-white/40 uppercase tracking-wider">LEVEL {levelIdx + 1} / {SOKOBAN_LEVELS.length}</span>
                <span className="text-xs font-bold text-indigo-400 font-mono">SCORE: {score}</span>
              </div>

              {/* Grid Display */}
              <div className="p-3 bg-[#121824] border border-white/10 rounded-3xl shadow-2xl my-auto">
                {grid.map((row, r) => (
                  <div key={r} className="flex">
                    {row.map((cell, c) => (
                      <div
                        key={c}
                        className={`w-11 h-11 sm:w-12 sm:h-12 m-0.5 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${
                          cell === 1
                            ? 'bg-[#1e2638] border border-white/10'
                            : cell === 2
                            ? 'bg-emerald-500/20 border-2 border-dashed border-emerald-400'
                            : cell === 3
                            ? 'bg-amber-600 border border-amber-400 text-white shadow-md'
                            : cell === 4
                            ? 'bg-emerald-500 border border-emerald-300 text-black shadow-[0_0_15px_rgba(0,214,143,0.5)]'
                            : cell === 5 || cell === 6
                            ? 'bg-indigo-500 border border-indigo-300 text-white shadow-lg'
                            : 'bg-white/[0.02]'
                        }`}
                      >
                        {cell === 3 && '📦'}
                        {cell === 4 && '✅'}
                        {(cell === 5 || cell === 6) && '🤖'}
                        {cell === 2 && '🎯'}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Directional Keypad for Touch/Mobile */}
              <div className="flex flex-col items-center gap-1.5 my-2">
                <button
                  onClick={() => movePlayer(-1, 0)}
                  className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/15 active:scale-90 flex items-center justify-center transition-all cursor-pointer"
                >
                  <ArrowUp className="w-5 h-5 text-white" />
                </button>
                <div className="flex gap-4">
                  <button
                    onClick={() => movePlayer(0, -1)}
                    className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/15 active:scale-90 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={() => movePlayer(1, 0)}
                    className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/15 active:scale-90 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ArrowDown className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => movePlayer(0, 1)}
                    className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/15 active:scale-90 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={handleUndo}
                  disabled={history.length === 0}
                  className="flex-1 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-1.5 disabled:opacity-30 cursor-pointer"
                >
                  <Undo2 className="w-4 h-4" />
                  <span>Undo</span>
                </button>
                <button
                  onClick={() => initLevel(levelIdx)}
                  className="flex-1 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restart</span>
                </button>
              </div>
            </motion.div>
          )}

          {gameState === 'gameover' && (
            <motion.div key="gameover" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#121824] border border-white/10 rounded-3xl p-6 text-center max-w-sm w-full space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center mx-auto text-indigo-400">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Warehouse Master!</h2>
                <p className="text-xs text-white/50">All crates positioned with optimal routing.</p>
              </div>
              <div className="bg-[#182133] rounded-2xl p-4 border border-white/5 text-center">
                <span className="text-[10px] text-white/40 block mb-0.5">FINAL SCORE</span>
                <span className="text-3xl font-black text-indigo-400 font-mono">{score}</span>
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
