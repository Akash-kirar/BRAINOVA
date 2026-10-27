import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Heart, Play, RotateCcw, Trophy, Calculator, HelpCircle, Check, X } from 'lucide-react';
import GameMenu from './GameMenu';

type GameState = 'menu' | 'playing' | 'gameover';

interface MissingNumberGameProps {
  onBack: () => void;
  onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void;
}

interface Question {
  display: string;
  missingAnswer: number;
  options: number[];
}

export default function MissingNumberGame({ onBack, onGameComplete }: MissingNumberGameProps) {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(15);
  const [combo, setCombo] = useState(0);
  
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const generateQuestion = useCallback((lvl: number): Question => {
    // Operations expand with level
    // lvl 1-2: simple + and -
    // lvl 3-5: multiplication and division
    // lvl 6+: two-step equations
    const opType = lvl <= 2 
      ? (Math.random() > 0.5 ? 'add' : 'sub') 
      : lvl <= 5 
      ? ['add', 'sub', 'mult'][Math.floor(Math.random() * 3)] 
      : ['add', 'sub', 'mult', 'div', 'two_step'][Math.floor(Math.random() * 5)];

    let display = '';
    let missingAnswer = 0;

    if (opType === 'add') {
      const a = Math.floor(Math.random() * (10 + lvl * 5)) + 1;
      const b = Math.floor(Math.random() * (10 + lvl * 5)) + 1;
      const c = a + b;
      // Missing position: either first, second, or third
      const pos = Math.floor(Math.random() * 2);
      if (pos === 0) {
        missingAnswer = a;
        display = `? + ${b} = ${c}`;
      } else {
        missingAnswer = b;
        display = `${a} + ? = ${c}`;
      }
    } else if (opType === 'sub') {
      const b = Math.floor(Math.random() * (10 + lvl * 4)) + 1;
      const c = Math.floor(Math.random() * (10 + lvl * 4)) + 1;
      const a = b + c;
      const pos = Math.floor(Math.random() * 2);
      if (pos === 0) {
        missingAnswer = a;
        display = `? - ${b} = ${c}`;
      } else {
        missingAnswer = b;
        display = `${a} - ? = ${c}`;
      }
    } else if (opType === 'mult') {
      const a = Math.floor(Math.random() * (4 + Math.floor(lvl / 2))) + 2;
      const b = Math.floor(Math.random() * (5 + Math.floor(lvl / 2))) + 2;
      const c = a * b;
      const pos = Math.floor(Math.random() * 2);
      if (pos === 0) {
        missingAnswer = a;
        display = `? × ${b} = ${c}`;
      } else {
        missingAnswer = b;
        display = `${a} × ? = ${c}`;
      }
    } else if (opType === 'div') {
      const b = Math.floor(Math.random() * 8) + 2;
      const c = Math.floor(Math.random() * 8) + 2;
      const a = b * c;
      missingAnswer = b;
      display = `${a} ÷ ? = ${c}`;
    } else {
      // Two-step: (a + ?) * b = c
      const a = Math.floor(Math.random() * 6) + 1;
      const missing = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 3) + 2;
      const c = (a + missing) * b;
      missingAnswer = missing;
      display = `(${a} + ?) × ${b} = ${c}`;
    }

    // Generate 4 plausible distinct options
    const optionsSet = new Set<number>([missingAnswer]);
    const offsets = [-3, -2, -1, 1, 2, 3, 5, -5, 10];
    while (optionsSet.size < 4) {
      const offset = offsets[Math.floor(Math.random() * offsets.length)];
      const candidate = missingAnswer + offset;
      if (candidate > 0 && candidate !== missingAnswer) {
        optionsSet.add(candidate);
      }
    }

    const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

    return { display, missingAnswer, options };
  }, []);

  const startGame = () => {
    setScore(0);
    setLevel(1);
    setLives(3);
    setCombo(0);
    setGameState('playing');
    setTimeLeft(12);
    setCurrentQuestion(generateQuestion(1));
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
    setFeedback('wrong');
    setCombo(0);
    setTimeout(() => {
      setFeedback(null);
      setSelectedOption(null);
      setLives(l => {
        if (l <= 1) {
          setGameState('gameover');
          if (onGameComplete) onGameComplete(score, level);
          return 0;
        }
        setCurrentQuestion(generateQuestion(level));
        setTimeLeft(Math.max(6, 12 - Math.floor(level / 3)));
        return l - 1;
      });
    }, 600);
  };

  const handleOptionSelect = (option: number) => {
    if (selectedOption !== null || !currentQuestion) return;
    setSelectedOption(option);

    if (option === currentQuestion.missingAnswer) {
      setFeedback('correct');
      const comboBonus = combo * 5;
      const timeBonus = timeLeft * 3;
      const pts = 15 + comboBonus + timeBonus;

      setScore(s => s + pts);
      setCombo(c => c + 1);

      setTimeout(() => {
        setFeedback(null);
        setSelectedOption(null);
        setLevel(lvl => {
          const nextLvl = lvl + 1;
          setCurrentQuestion(generateQuestion(nextLvl));
          setTimeLeft(Math.max(6, 12 - Math.floor(nextLvl / 3)));
          return nextLvl;
        });
      }, 500);
    } else {
      handleWrong();
    }
  };

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
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <Calculator className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="font-bold text-base tracking-tight">Missing Number</span>
        </div>

        <div className="w-10" />
      </div>

      {/* Main Body */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* MENU SCREEN */}
          {gameState === 'menu' && (
            <GameMenu
              title="Missing Number"
              description="Calculate and identify the missing number in mathematical equations under time pressure."
              icon={<Calculator className="w-14 h-14 text-emerald-400" />}
              iconBgColor="bg-emerald-500/20"
              iconColor="text-emerald-400"
              showDifficulty={false}
              onStart={startGame}
              onBack={onBack}
            />
          )}

          {/* PLAYING SCREEN */}
          {gameState === 'playing' && currentQuestion && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex flex-col items-center"
            >
              {/* Stats Bar */}
              <div className="flex justify-between w-full mb-6 px-2">
                <div className="flex flex-col items-center">
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-0.5">LEVEL</span>
                  <span className="text-xl font-bold text-emerald-400">{level}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-0.5">TIME</span>
                  <span className={`text-xl font-bold font-mono ${timeLeft <= 3 ? 'text-rose-400 animate-pulse' : 'text-white'}`}>
                    {timeLeft}s
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-0.5">SCORE</span>
                  <span className="text-xl font-bold text-white">{score}</span>
                </div>
              </div>

              {/* Lives */}
              <div className="flex gap-1.5 mb-8">
                {[...Array(3)].map((_, i) => (
                  <Heart
                    key={i}
                    className={`w-5 h-5 transition-colors ${
                      i < lives ? 'fill-rose-500 text-rose-500' : 'text-white/10'
                    }`}
                  />
                ))}
              </div>

              {/* Equation Display Box */}
              <div className={`w-full py-8 px-6 rounded-3xl border transition-all mb-8 text-center flex items-center justify-center ${
                feedback === 'correct'
                  ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_30px_rgba(0,214,143,0.3)]'
                  : feedback === 'wrong'
                  ? 'bg-rose-500/20 border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.3)]'
                  : 'bg-[#121824] border-white/10'
              }`}>
                <span className="text-3xl sm:text-4xl font-black text-white tracking-wider font-mono">
                  {currentQuestion.display}
                </span>
              </div>

              {/* 4 Options Grid */}
              <div className="grid grid-cols-2 gap-3.5 w-full">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === option;
                  const isCorrect = option === currentQuestion.missingAnswer;

                  let btnStyle = 'bg-[#151c2c] border-white/10 hover:border-emerald-500/40 text-white';
                  if (isSelected) {
                    btnStyle = isCorrect
                      ? 'bg-emerald-500 border-emerald-400 text-black shadow-[0_0_15px_rgba(0,214,143,0.5)]'
                      : 'bg-rose-500 border-rose-400 text-white';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(option)}
                      disabled={selectedOption !== null}
                      className={`h-16 rounded-2xl border text-xl font-black font-mono transition-all active:scale-95 cursor-pointer flex items-center justify-center ${btnStyle}`}
                    >
                      {option}
                    </button>
                  );
                })}
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
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-xl font-black text-white">Math Challenge Complete!</h2>
                <p className="text-xs text-white/50">Great job solving equations on the fly.</p>
              </div>

              <div className="bg-[#182133] rounded-2xl p-4 grid grid-cols-2 gap-2 border border-white/5">
                <div>
                  <span className="text-[10px] text-white/40 block mb-0.5">FINAL SCORE</span>
                  <span className="text-2xl font-black text-emerald-400">{score}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 block mb-0.5">LEVEL REACHED</span>
                  <span className="text-2xl font-black text-white">{level}</span>
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
