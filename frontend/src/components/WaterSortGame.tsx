import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, RotateCcw, Trophy, Sparkles, Undo2 } from 'lucide-react';
import GameMenu from './GameMenu';

const COLORS = [
  '#3B82F6', // Blue
  '#00D68F', // Emerald
  '#F43F5E', // Rose
  '#A855F7', // Purple
  '#F59E0B'  // Amber
];

interface LevelConfig {
  tubes: string[][];
  maxCapacity: number;
}

const LEVELS: LevelConfig[] = [
  // Level 1: 3 colors, 4 tubes
  {
    maxCapacity: 4,
    tubes: [
      ['#3B82F6', '#00D68F', '#F43F5E', '#3B82F6'],
      ['#F43F5E', '#3B82F6', '#00D68F', '#F43F5E'],
      ['#00D68F', '#F43F5E', '#3B82F6', '#00D68F'],
      [] // empty tube
    ]
  },
  // Level 2: 4 colors, 5 tubes
  {
    maxCapacity: 4,
    tubes: [
      ['#A855F7', '#3B82F6', '#00D68F', '#F43F5E'],
      ['#F43F5E', '#00D68F', '#A855F7', '#3B82F6'],
      ['#00D68F', '#A855F7', '#3B82F6', '#F43F5E'],
      ['#3B82F6', '#F43F5E', '#00D68F', '#A855F7'],
      [] // empty tube
    ]
  }
];

export default function WaterSortGame({ onBack, onGameComplete }: { onBack: () => void; onGameComplete?: (score: number, maxLevel: number) => void }) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [levelIdx, setLevelIdx] = useState(0);
  const [tubes, setTubes] = useState<string[][]>([]);
  const [selectedTube, setSelectedTube] = useState<number | null>(null);
  const [history, setHistory] = useState<string[][][]>([]);
  const [score, setScore] = useState(0);

  const currentLevel = LEVELS[levelIdx] || LEVELS[0];

  const initLevel = (idx: number) => {
    setLevelIdx(idx);
    const lvl = LEVELS[idx] || LEVELS[0];
    setTubes(lvl.tubes.map(t => [...t]));
    setSelectedTube(null);
    setHistory([]);
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    initLevel(0);
  };

  const isLevelComplete = (tubeState: string[][]) => {
    return tubeState.every(tube => {
      if (tube.length === 0) return true;
      if (tube.length !== currentLevel.maxCapacity) return false;
      return tube.every(c => c === tube[0]);
    });
  };

  const handleTubeClick = (idx: number) => {
    if (selectedTube === null) {
      // Pick up from tube if it has liquid
      if (tubes[idx].length > 0) {
        setSelectedTube(idx);
      }
    } else if (selectedTube === idx) {
      // Deselect
      setSelectedTube(null);
    } else {
      // Attempt pour from selectedTube to idx
      const source = tubes[selectedTube];
      const target = tubes[idx];

      if (target.length < currentLevel.maxCapacity) {
        const topColor = source[source.length - 1];
        if (target.length === 0 || target[target.length - 1] === topColor) {
          // Valid pour!
          setHistory(prev => [...prev, tubes.map(t => [...t])]);

          const newSource = [...source];
          const newTarget = [...target];

          // Pour matching consecutive colors
          while (
            newSource.length > 0 &&
            newTarget.length < currentLevel.maxCapacity &&
            newSource[newSource.length - 1] === topColor
          ) {
            newTarget.push(newSource.pop()!);
          }

          const nextTubes = tubes.map((t, i) => {
            if (i === selectedTube) return newSource;
            if (i === idx) return newTarget;
            return t;
          });

          setTubes(nextTubes);
          setSelectedTube(null);

          if (isLevelComplete(nextTubes)) {
            const nextScore = score + 100;
            setScore(nextScore);
            setTimeout(() => {
              if (levelIdx < LEVELS.length - 1) {
                initLevel(levelIdx + 1);
              } else {
                setGameState('gameover');
                if (onGameComplete) onGameComplete(nextScore, LEVELS.length);
              }
            }, 800);
          }
          return;
        }
      }
      // Invalid, select new tube
      if (tubes[idx].length > 0) {
        setSelectedTube(idx);
      } else {
        setSelectedTube(null);
      }
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setTubes(prev);
      setHistory(h => h.slice(0, -1));
      setSelectedTube(null);
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
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="font-bold text-base tracking-tight">Water Sort Puzzle</span>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Water Sort Puzzle"
              description="Sort the colored liquid layers by pouring between vials until every vial holds one uniform color."
              icon={<Sparkles className="w-14 h-14 text-cyan-400" />}
              iconBgColor="bg-cyan-500/20"
              iconColor="text-cyan-400"
              showDifficulty={false}
              onStart={startGame}
              onBack={onBack}
            />
          )}

          {gameState === 'playing' && (
            <motion.div key="playing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full flex flex-col items-center flex-1 justify-between py-4">
              <div className="flex items-center justify-between w-full px-2">
                <span className="text-xs font-bold text-white/40 uppercase tracking-wider">LEVEL {levelIdx + 1} / {LEVELS.length}</span>
                <span className="text-xs font-bold text-cyan-400 font-mono">SCORE: {score}</span>
              </div>

              {/* Tubes Display */}
              <div className="flex items-end justify-center gap-4 w-full my-auto px-2">
                {tubes.map((tube, tIdx) => {
                  const isSelected = selectedTube === tIdx;
                  return (
                    <div
                      key={tIdx}
                      onClick={() => handleTubeClick(tIdx)}
                      className={`relative w-14 sm:w-16 h-48 rounded-b-3xl border-2 transition-all cursor-pointer flex flex-col-reverse p-1 overflow-hidden ${
                        isSelected
                          ? 'border-cyan-400 -translate-y-3 shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                          : 'border-white/20 bg-white/[0.03] hover:border-white/40'
                      }`}
                    >
                      {tube.map((color, cIdx) => (
                        <div
                          key={cIdx}
                          style={{ backgroundColor: color }}
                          className="w-full h-10 rounded-sm transition-all border-t border-white/20"
                        />
                      ))}
                    </div>
                  );
                })}
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
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">All Liquids Sorted!</h2>
                <p className="text-xs text-white/50">Fluid mechanics masterclass completed.</p>
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
