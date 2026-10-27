import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Flame, Trophy, HelpCircle, Check, X, RotateCcw } from 'lucide-react';
import GameMenu from './GameMenu';

interface MatchstickPuzzle {
  id: number;
  initialEquation: string;
  instruction: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const PUZZLES: MatchstickPuzzle[] = [
  {
    id: 1,
    initialEquation: '6 + 4 = 4',
    instruction: 'Move 1 matchstick to make the equation true.',
    options: ['0 + 4 = 4', '5 + 4 = 9', '6 - 4 = 2', '8 - 4 = 4'],
    correctAnswer: '0 + 4 = 4',
    explanation: 'Move the middle horizontal matchstick of the 6 to make it a 0: 0 + 4 = 4.'
  },
  {
    id: 2,
    initialEquation: '8 + 3 = 3',
    instruction: 'Move 1 matchstick to make the equation true.',
    options: ['9 - 6 = 3', '6 + 3 = 9', '8 - 5 = 3', '9 - 3 = 6'],
    correctAnswer: '6 + 3 = 9', // wait: 8 + 3 = 3 -> move 1 matchstick from 8 to make 6, add to 3 to make 9: 6 + 3 = 9!
    explanation: 'Take one matchstick from the top-right of 8 to turn it into 6, and place it on the right side of the result 3 to turn it into 9: 6 + 3 = 9.'
  },
  {
    id: 3,
    initialEquation: '5 + 7 = 2',
    instruction: 'Move 1 matchstick to make the equation true.',
    options: ['9 - 7 = 2', '5 - 3 = 2', '6 - 4 = 2', '5 + 2 = 7'],
    correctAnswer: '9 - 7 = 2',
    explanation: 'Take the vertical matchstick from the + sign to make it -, and add it to 5 to turn it into 9: 9 - 7 = 2.'
  },
  {
    id: 4,
    initialEquation: '9 - 3 = 8',
    instruction: 'Move 1 matchstick to make the equation true.',
    options: ['9 - 3 = 6', '5 + 3 = 8', '9 - 1 = 8', '8 - 0 = 8'],
    correctAnswer: '5 + 3 = 8',
    explanation: 'Move the top-left matchstick of the 9 to turn it into a 5, and place it vertically across the - sign to make it +: 5 + 3 = 8.'
  },
  {
    id: 5,
    initialEquation: '3 + 5 = 2',
    instruction: 'Move 1 matchstick to make the equation true.',
    options: ['3 - 1 = 2', '7 - 5 = 2', '8 - 6 = 2', '3 + 2 = 5'],
    correctAnswer: '7 - 5 = 2',
    explanation: 'Take the vertical bar of the + sign to make it a -, and use it to complete the 3 into a 7: 7 - 5 = 2.'
  }
];

export default function MatchstickPuzzleGame({ onBack, onGameComplete }: { onBack: () => void; onGameComplete?: (score: number, maxLevel: number) => void }) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const currentPuzzle = PUZZLES[puzzleIdx];

  const startGame = () => {
    setGameState('playing');
    setPuzzleIdx(0);
    setScore(0);
    setSelectedOption(null);
    setFeedback(null);
    setShowHint(false);
  };

  const handleSelect = (option: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);

    if (option === currentPuzzle.correctAnswer) {
      setFeedback('correct');
      setScore(s => s + 30);
      setTimeout(() => {
        if (puzzleIdx < PUZZLES.length - 1) {
          setPuzzleIdx(i => i + 1);
          setSelectedOption(null);
          setFeedback(null);
          setShowHint(false);
        } else {
          setGameState('gameover');
          if (onGameComplete) onGameComplete(score + 30, PUZZLES.length);
        }
      }, 900);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setSelectedOption(null);
        setFeedback(null);
      }, 800);
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
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <span className="font-bold text-base tracking-tight">Matchstick Puzzle</span>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Matchstick Puzzle"
              description="Move exactly one matchstick to correct flawed mathematical equations."
              icon={<Flame className="w-14 h-14 text-amber-400" />}
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
                <span className="text-xs font-bold text-white/40 uppercase tracking-wider">PUZZLE {puzzleIdx + 1} / {PUZZLES.length}</span>
                <span className="text-xs font-bold text-amber-400 font-mono">SCORE: {score}</span>
              </div>

              <div className="text-center my-3">
                <span className="text-xs text-white/60 block mb-2">{currentPuzzle.instruction}</span>
                <div className={`py-6 px-8 rounded-3xl border transition-all text-center ${
                  feedback === 'correct' ? 'bg-emerald-500/20 border-emerald-500' : 'bg-[#121824] border-white/10'
                }`}>
                  <span className="text-4xl sm:text-5xl font-black font-mono tracking-widest text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                    {currentPuzzle.initialEquation}
                  </span>
                </div>
              </div>

              {showHint && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs w-full text-center">
                  💡 Hint: Look closely at the digits that can transform into others with 1 stick change (like 6 to 0, 9 to 5, + to -).
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 w-full my-auto">
                {currentPuzzle.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt)}
                    className={`p-4 rounded-2xl border text-base font-black font-mono transition-all active:scale-95 cursor-pointer ${
                      selectedOption === opt
                        ? opt === currentPuzzle.correctAnswer
                          ? 'bg-emerald-500 border-emerald-400 text-black shadow-lg'
                          : 'bg-rose-500 border-rose-400 text-white'
                        : 'bg-[#141b2b] border-white/10 hover:border-amber-500/40 text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowHint(true)}
                disabled={showHint}
                className="py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/60 font-bold hover:text-white transition-colors disabled:opacity-40"
              >
                {showHint ? 'Hint Active' : 'Need a Hint?'}
              </button>
            </motion.div>
          )}

          {gameState === 'gameover' && (
            <motion.div key="gameover" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#121824] border border-white/10 rounded-3xl p-6 text-center max-w-sm w-full space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Matchstick Genius!</h2>
                <p className="text-xs text-white/50">You mastered lateral equation transformation.</p>
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
