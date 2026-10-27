import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Compass, Trophy, RotateCcw, Sparkles, Check, X, Undo2, ArrowUp, ArrowDown, ArrowLeft as LeftIcon, ArrowRight as RightIcon } from 'lucide-react';
import GameMenu from './GameMenu';

interface PathFinderGameProps {
  onBack: () => void;
  onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void;
}

interface LevelConfig {
  size: number;
  start: [number, number];
  goal: [number, number];
  obstacles: [number, number][];
}

const LEVELS: LevelConfig[] = [
  {
    size: 4,
    start: [0, 0],
    goal: [3, 3],
    obstacles: [[1, 1], [2, 1], [1, 2]]
  },
  {
    size: 5,
    start: [0, 0],
    goal: [4, 4],
    obstacles: [[1, 0], [1, 1], [3, 2], [2, 3], [3, 3]]
  },
  {
    size: 5,
    start: [0, 4],
    goal: [4, 0],
    obstacles: [[1, 3], [2, 3], [2, 1], [3, 1], [1, 1]]
  },
  {
    size: 6,
    start: [0, 0],
    goal: [5, 5],
    obstacles: [[1, 1], [1, 2], [3, 1], [3, 2], [3, 3], [4, 4], [2, 4]]
  },
  {
    size: 6,
    start: [0, 5],
    goal: [5, 0],
    obstacles: [[1, 4], [2, 4], [3, 4], [3, 2], [2, 2], [4, 1], [1, 2]]
  }
];

export const PathFinderGame: React.FC<PathFinderGameProps> = ({
  onBack,
  onGameComplete
}) => {
  const [gameState, setGameState] = useState<'menu' | 'game' | 'results'>('menu');
  const [levelIdx, setLevelIdx] = useState(0);
  const [playerPos, setPlayerPos] = useState<[number, number]>([0, 0]);
  const [pathHistory, setPathHistory] = useState<[number, number][]>([[0, 0]]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [levelSolved, setLevelSolved] = useState(false);

  const currentLevel = LEVELS[levelIdx % LEVELS.length];

  const handleStart = () => {
    setGameState('game');
    setLevelIdx(0);
    setScore(0);
    loadLevel(0);
  };

  const loadLevel = (idx: number) => {
    const lvl = LEVELS[idx % LEVELS.length];
    setPlayerPos(lvl.start);
    setPathHistory([lvl.start]);
    setMoves(0);
    setLevelSolved(false);
  };

  const movePlayer = (dr: number, dc: number) => {
    if (levelSolved) return;
    const [r, c] = playerPos;
    const nr = r + dr;
    const nc = c + dc;

    // Boundary check
    if (nr < 0 || nr >= currentLevel.size || nc < 0 || nc >= currentLevel.size) return;

    // Obstacle check
    const isObstacle = currentLevel.obstacles.some(([or, oc]) => or === nr && oc === nc);
    if (isObstacle) return;

    const newPos: [number, number] = [nr, nc];
    setPlayerPos(newPos);
    setPathHistory(prev => [...prev, newPos]);
    setMoves(prev => prev + 1);

    // Goal check
    if (nr === currentLevel.goal[0] && nc === currentLevel.goal[1]) {
      setLevelSolved(true);
      const points = Math.max(20, 60 - moves * 2);
      setScore(prev => prev + points);

      setTimeout(() => {
        if (levelIdx + 1 >= LEVELS.length) {
          const finalScore = score + points;
          setGameState('results');
          onGameComplete?.(finalScore, LEVELS.length, 100);
        } else {
          const nextLvl = levelIdx + 1;
          setLevelIdx(nextLvl);
          loadLevel(nextLvl);
        }
      }, 1200);
    }
  };

  const handleCellClick = (r: number, c: number) => {
    // If adjacent to current player, allow tap move
    const [pr, pc] = playerPos;
    if (Math.abs(pr - r) + Math.abs(pc - c) === 1) {
      movePlayer(r - pr, c - pc);
    }
  };

  const handleUndo = () => {
    if (pathHistory.length <= 1 || levelSolved) return;
    const newHistory = [...pathHistory];
    newHistory.pop();
    const prevPos = newHistory[newHistory.length - 1];
    setPathHistory(newHistory);
    setPlayerPos(prevPos);
  };

  return (
    <div className="w-full min-h-screen bg-[#090B0F] text-white flex flex-col items-center p-4">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Path Finder"
              description="Plan optimal routes through obstacle-laden grids from origin to destination without stepping on barriers."
              icon={<Compass className="w-14 h-14 text-blue-400" />}
              iconBgColor="bg-blue-500/20"
              iconColor="text-blue-400"
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
              className="flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={onBack}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="text-sm font-semibold text-white/60">
                  Grid Level {levelIdx + 1} / {LEVELS.length} • Moves: {moves}
                </div>
                <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{score} pts</span>
                </div>
              </div>

              {/* Grid Container */}
              <div className="bg-[#12151D] border border-blue-500/20 rounded-2xl p-4 flex flex-col items-center shadow-lg relative">
                <div
                  className="grid gap-1.5 sm:gap-2 p-2 bg-[#0c1017] rounded-xl border border-white/5"
                  style={{
                    gridTemplateColumns: `repeat(${currentLevel.size}, minmax(0, 1fr))`,
                    width: '100%',
                    maxWidth: '360px',
                    aspectRatio: '1/1'
                  }}
                >
                  {Array.from({ length: currentLevel.size }).map((_, r) =>
                    Array.from({ length: currentLevel.size }).map((_, c) => {
                      const isPlayer = playerPos[0] === r && playerPos[1] === c;
                      const isGoal = currentLevel.goal[0] === r && currentLevel.goal[1] === c;
                      const isObstacle = currentLevel.obstacles.some(([or, oc]) => or === r && oc === c);
                      const isPath = pathHistory.some(([pr, pc]) => pr === r && pc === c);

                      let bg = 'bg-[#181B26]/60 border-white/5';
                      if (isObstacle) bg = 'bg-stone-800 border-stone-700';
                      else if (isGoal) bg = 'bg-emerald-500/30 border-emerald-400/80 animate-pulse';
                      else if (isPlayer) bg = 'bg-blue-500 border-blue-400 ring-2 ring-blue-300';
                      else if (isPath) bg = 'bg-blue-500/20 border-blue-500/30';

                      return (
                        <button
                          key={`${r}-${c}`}
                          onClick={() => handleCellClick(r, c)}
                          disabled={isObstacle || levelSolved}
                          className={`rounded-lg border flex items-center justify-center font-bold transition-all relative ${bg}`}
                        >
                          {isPlayer && <span className="text-2xl drop-shadow">🤖</span>}
                          {isGoal && !isPlayer && <span className="text-xl">🏁</span>}
                          {isObstacle && <span className="text-base opacity-75">🧱</span>}
                          {isPath && !isPlayer && !isGoal && !isObstacle && (
                            <div className="w-2 h-2 rounded-full bg-blue-400/70" />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>

                {levelSolved && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center gap-2"
                  >
                    <Check className="w-12 h-12 text-emerald-400" />
                    <span className="text-xl font-bold text-white">Destination Reached!</span>
                  </motion.div>
                )}
              </div>

              {/* D-Pad Controls */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => movePlayer(-1, 0)}
                  disabled={levelSolved}
                  className="p-3 bg-white/10 hover:bg-white/20 active:scale-95 rounded-xl border border-white/10"
                >
                  <ArrowUp className="w-6 h-6" />
                </button>
                <div className="flex gap-4">
                  <button
                    onClick={() => movePlayer(0, -1)}
                    disabled={levelSolved}
                    className="p-3 bg-white/10 hover:bg-white/20 active:scale-95 rounded-xl border border-white/10"
                  >
                    <LeftIcon className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleUndo}
                    disabled={pathHistory.length <= 1 || levelSolved}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 active:scale-95 rounded-xl border border-white/5 text-xs font-semibold flex items-center gap-1.5 text-white/70"
                  >
                    <Undo2 className="w-4 h-4" /> Undo
                  </button>
                  <button
                    onClick={() => movePlayer(0, 1)}
                    disabled={levelSolved}
                    className="p-3 bg-white/10 hover:bg-white/20 active:scale-95 rounded-xl border border-white/10"
                  >
                    <RightIcon className="w-6 h-6" />
                  </button>
                </div>
                <button
                  onClick={() => movePlayer(1, 0)}
                  disabled={levelSolved}
                  className="p-3 bg-white/10 hover:bg-white/20 active:scale-95 rounded-xl border border-white/10"
                >
                  <ArrowDown className="w-6 h-6" />
                </button>
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
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Path Planning Complete!</h2>
                <p className="text-sm text-white/60">Spatial Navigation & Strategy Mastery</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Score</div>
                  <div className="text-2xl font-bold text-blue-400">{score}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Levels Cleared</div>
                  <div className="text-2xl font-bold text-emerald-400">{LEVELS.length} / {LEVELS.length}</div>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={handleStart}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
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

export default PathFinderGame;
