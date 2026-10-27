import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Grid, Trophy, RotateCcw, Sparkles, Check, Eraser } from 'lucide-react';
import GameMenu from './GameMenu';

interface SudokuPuzzle {
  initial: (number | null)[][];
  solution: number[][];
}

const PUZZLES: SudokuPuzzle[] = [
  {
    initial: [
      [1, null, null, 4],
      [null, 2, 3, null],
      [null, 3, 2, null],
      [4, null, null, 1]
    ],
    solution: [
      [1, 3, 2, 4],
      [4, 2, 3, 1],
      [3, 4, 1, 2],
      [4, 1, 4, 1] // wait, let's verify exact 4x4 sudoku:
      // Row 1: 1, 3, 2, 4
      // Row 2: 4, 2, 1, 3
      // Row 3: 2, 4, 3, 1
      // Row 4: 3, 1, 4, 2
    ]
  }
];

// Perfectly verified 4x4 Sudoku:
PUZZLES[0].solution = [
  [1, 3, 2, 4],
  [4, 2, 1, 3],
  [2, 4, 3, 1],
  [3, 1, 4, 2]
];
PUZZLES[0].initial = [
  [1, null, 2, null],
  [null, 2, null, 3],
  [2, null, 3, null],
  [null, 1, null, 2]
];

export default function MiniSudokuGame({ onBack, onGameComplete }: { onBack: () => void; onGameComplete?: (score: number, maxLevel: number) => void }) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [grid, setGrid] = useState<(number | null)[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [score, setScore] = useState(0);

  const puzzle = PUZZLES[0];

  const startGame = () => {
    setGameState('playing');
    setGrid(puzzle.initial.map(r => [...r]));
    setSelectedCell(null);
    setScore(0);
  };

  const handleCellClick = (r: number, c: number) => {
    // Only allow selecting cells that are not pre-filled in puzzle.initial
    if (puzzle.initial[r][c] === null) {
      setSelectedCell({ r, c });
    }
  };

  const enterNumber = (num: number | null) => {
    if (!selectedCell) return;
    const { r, c } = selectedCell;

    const nextGrid = grid.map(row => [...row]);
    nextGrid[r][c] = num;
    setGrid(nextGrid);

    // Check if fully and correctly solved
    let isFull = true;
    let isCorrect = true;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (nextGrid[i][j] === null) isFull = false;
        else if (nextGrid[i][j] !== puzzle.solution[i][j]) isCorrect = false;
      }
    }

    if (isFull && isCorrect) {
      setScore(150);
      setTimeout(() => {
        setGameState('gameover');
        if (onGameComplete) onGameComplete(150, 1);
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
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Grid className="w-4 h-4 text-amber-400" />
          </div>
          <span className="font-bold text-base tracking-tight">Mini Sudoku</span>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Mini Sudoku"
              description="Fill the 4x4 grid so every row, column, and 2x2 quadrant contains digits 1 to 4 with no duplicates."
              icon={<Grid className="w-14 h-14 text-amber-400" />}
              iconBgColor="bg-amber-500/20"
              iconColor="text-amber-400"
              showDifficulty={false}
              onStart={startGame}
              onBack={onBack}
            />
          )}

          {gameState === 'playing' && (
            <motion.div key="playing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full flex flex-col items-center flex-1 justify-between py-4">
              <div className="flex items-center justify-between w-full px-2">
                <span className="text-xs font-bold text-white/40 uppercase tracking-wider">PUZZLE 1 (4×4)</span>
                <span className="text-xs font-bold text-amber-400 font-mono">GOAL: 1-4 IN EACH BOX</span>
              </div>

              {/* 4x4 Sudoku Board */}
              <div className="p-3 bg-[#121824] border-2 border-white/20 rounded-3xl shadow-2xl my-auto">
                <div className="grid grid-cols-4 gap-1">
                  {grid.map((row, r) =>
                    row.map((val, c) => {
                      const isPreFilled = puzzle.initial[r][c] !== null;
                      const isSelected = selectedCell?.r === r && selectedCell?.c === c;

                      // Border styling to mark 2x2 sub-boxes
                      const borderRight = c === 1 ? 'border-r-2 border-r-white/30' : '';
                      const borderBottom = r === 1 ? 'border-b-2 border-b-white/30' : '';

                      return (
                        <button
                          key={`${r}-${c}`}
                          onClick={() => handleCellClick(r, c)}
                          className={`w-14 h-14 sm:w-16 sm:h-16 m-0.5 rounded-xl flex items-center justify-center text-xl font-black font-mono transition-all cursor-pointer ${borderRight} ${borderBottom} ${
                            isSelected
                              ? 'bg-amber-500/20 border-2 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                              : isPreFilled
                              ? 'bg-white/10 text-white cursor-default'
                              : val !== null
                              ? 'bg-[#182133] border border-white/10 text-emerald-400'
                              : 'bg-white/[0.03] border border-white/5 hover:bg-white/[0.06]'
                          }`}
                        >
                          {val}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Number Input Keypad */}
              <div className="flex items-center justify-center gap-3 w-full my-2">
                {[1, 2, 3, 4].map(num => (
                  <button
                    key={num}
                    onClick={() => enterNumber(num)}
                    disabled={!selectedCell}
                    className="w-14 h-14 rounded-2xl bg-[#182133] border border-white/10 hover:border-amber-400/50 text-2xl font-black font-mono text-white active:scale-95 disabled:opacity-30 cursor-pointer shadow-lg transition-transform"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => enterNumber(null)}
                  disabled={!selectedCell}
                  className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 text-white active:scale-95 disabled:opacity-30 flex items-center justify-center cursor-pointer shadow-lg transition-transform"
                  title="Erase"
                >
                  <Eraser className="w-6 h-6 text-white/70" />
                </button>
              </div>

              <span className="text-[11px] text-white/40">Select an empty cell, then tap a digit 1-4.</span>
            </motion.div>
          )}

          {gameState === 'gameover' && (
            <motion.div key="gameover" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#121824] border border-white/10 rounded-3xl p-6 text-center max-w-sm w-full space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Sudoku Mastered!</h2>
                <p className="text-xs text-white/50">Every row, column, and box correctly aligned.</p>
              </div>
              <div className="bg-[#182133] rounded-2xl p-4 border border-white/5 text-center">
                <span className="text-[10px] text-white/40 block mb-0.5">FINAL SCORE</span>
                <span className="text-3xl font-black text-amber-400 font-mono">150</span>
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
