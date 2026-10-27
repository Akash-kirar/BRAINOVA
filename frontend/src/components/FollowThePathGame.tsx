import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Route, Trophy, RotateCcw, Sparkles } from 'lucide-react';
import GameMenu from './GameMenu';

type CellPos = [number, number];

export default function FollowThePathGame({ onBack, onGameComplete }: { onBack: () => void; onGameComplete?: (score: number, maxLevel: number) => void }) {
  const [gameState, setGameState] = useState<'menu' | 'showing' | 'input' | 'gameover'>('menu');
  const [level, setLevel] = useState(1);
  const [path, setPath] = useState<CellPos[]>([]);
  const [playerInput, setPlayerInput] = useState<CellPos[]>([]);
  const [score, setScore] = useState(0);

  const gridSize = 4;

  const generatePath = useCallback((lvl: number) => {
    const length = 3 + lvl;
    const newPath: CellPos[] = [[0, 0]];

    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    while (newPath.length < length) {
      const [r, c] = newPath[newPath.length - 1];
      const valid = dirs
        .map(([dr, dc]) => [r + dr, c + dc] as CellPos)
        .filter(([nr, nc]) => nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize)
        .filter(([nr, nc]) => !newPath.some(([pr, pc]) => pr === nr && pc === nc));

      if (valid.length === 0) break;
      const nextStep = valid[Math.floor(Math.random() * valid.length)];
      newPath.push(nextStep);
    }

    setPath(newPath);
    setPlayerInput([]);
    setGameState('showing');
  }, []);

  const startGame = () => {
    setLevel(1);
    setScore(0);
    generatePath(1);
  };

  useEffect(() => {
    if (gameState === 'showing') {
      const showTimer = setTimeout(() => {
        setGameState('input');
      }, 1500 + level * 400);
      return () => clearTimeout(showTimer);
    }
  }, [gameState, level]);

  const handleCellClick = (r: number, c: number) => {
    if (gameState !== 'input') return;

    const nextStepIdx = playerInput.length;
    const expected = path[nextStepIdx];

    if (expected && expected[0] === r && expected[1] === c) {
      const newInput = [...playerInput, [r, c] as CellPos];
      setPlayerInput(newInput);

      if (newInput.length === path.length) {
        // Complete path!
        const nextScore = score + 40 * level;
        setScore(nextScore);

        if (level < 4) {
          setLevel(l => l + 1);
          setTimeout(() => generatePath(level + 1), 600);
        } else {
          setTimeout(() => {
            setGameState('gameover');
            if (onGameComplete) onGameComplete(nextScore, 4);
          }, 600);
        }
      }
    } else {
      // Mistake!
      setTimeout(() => {
        setGameState('gameover');
        if (onGameComplete) onGameComplete(score, level);
      }, 400);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] text-white select-none overflow-hidden font-sans">
      <div className="flex items-center justify-between px-6 py-4 bg-[#0e131f] border-b border-white/5 shrink-0">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5 text-white/80" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <Route className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="font-bold text-base tracking-tight">Follow the Path</span>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Follow the Path"
              description="Memorize the highlighted path before it vanishes, then retrace each step in exact order."
              icon={<Route className="w-14 h-14 text-cyan-400" />}
              iconBgColor="bg-cyan-500/20"
              iconColor="text-cyan-400"
              showDifficulty={false}
              onStart={startGame}
              onBack={onBack}
            />
          )}

          {(gameState === 'showing' || gameState === 'input') && (
            <motion.div key="playing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full flex flex-col items-center flex-1 justify-between py-4">
              <div className="flex items-center justify-between w-full px-2">
                <span className="text-xs font-bold text-white/40 uppercase tracking-wider">LEVEL {level} / 4</span>
                <span className="text-xs font-bold text-cyan-400 font-mono">SCORE: {score}</span>
              </div>

              <div className="text-center my-2">
                <span className={`text-sm font-bold uppercase tracking-wider ${
                  gameState === 'showing' ? 'text-cyan-400 animate-pulse' : 'text-emerald-400'
                }`}>
                  {gameState === 'showing' ? 'MEMORIZE PATH...' : 'RETRACE PATH!'}
                </span>
              </div>

              {/* Grid */}
              <div className="p-3 bg-[#121824] border border-white/10 rounded-3xl shadow-2xl my-auto">
                {Array.from({ length: gridSize }).map((_, r) => (
                  <div key={r} className="flex">
                    {Array.from({ length: gridSize }).map((_, c) => {
                      const isShowingPath = gameState === 'showing' && path.some(([pr, pc]) => pr === r && pc === c);
                      const isInputted = gameState === 'input' && playerInput.some(([pr, pc]) => pr === r && pc === c);
                      const pathIdx = path.findIndex(([pr, pc]) => pr === r && pc === c);

                      return (
                        <button
                          key={c}
                          onClick={() => handleCellClick(r, c)}
                          disabled={gameState !== 'input'}
                          className={`w-14 h-14 sm:w-16 sm:h-16 m-1 rounded-2xl flex items-center justify-center font-black text-lg transition-all cursor-pointer ${
                            isShowingPath
                              ? 'bg-cyan-500 border border-cyan-300 text-black shadow-[0_0_15px_rgba(6,182,212,0.6)]'
                              : isInputted
                              ? 'bg-emerald-500 border border-emerald-300 text-black shadow-[0_0_15px_rgba(0,214,143,0.5)]'
                              : 'bg-white/[0.03] border border-white/5 hover:border-white/20'
                          }`}
                        >
                          {isShowingPath && pathIdx + 1}
                          {isInputted && '✓'}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <span className="text-[11px] text-white/40">Retrace starting from cell #1.</span>
            </motion.div>
          )}

          {gameState === 'gameover' && (
            <motion.div key="gameover" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#121824] border border-white/10 rounded-3xl p-6 text-center max-w-sm w-full space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Route Memory Tested!</h2>
                <p className="text-xs text-white/50">Sequential spatial memory evaluation.</p>
              </div>
              <div className="bg-[#182133] rounded-2xl p-4 border border-white/5 text-center">
                <span className="text-[10px] text-white/40 block mb-0.5">FINAL SCORE</span>
                <span className="text-3xl font-black text-cyan-400 font-mono">{score}</span>
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
