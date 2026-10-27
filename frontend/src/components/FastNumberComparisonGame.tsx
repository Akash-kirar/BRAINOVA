import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Zap, Trophy, RotateCcw, Sparkles, Check, X, Clock } from 'lucide-react';
import GameMenu from './GameMenu';

interface FastNumberComparisonGameProps {
  onBack: () => void;
  onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void;
}

interface NumberPair {
  leftDisplay: string;
  leftVal: number;
  rightDisplay: string;
  rightVal: number;
}

export const FastNumberComparisonGame: React.FC<FastNumberComparisonGameProps> = ({
  onBack,
  onGameComplete
}) => {
  const [gameState, setGameState] = useState<'menu' | 'game' | 'results'>('menu');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [currentPair, setCurrentPair] = useState<NumberPair>({ leftDisplay: '42', leftVal: 42, rightDisplay: '24', rightVal: 24 });
  const [timeLeft, setTimeLeft] = useState(4);
  const [selectedSide, setSelectedSide] = useState<'left' | 'right' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generatePair = (r: number): NumberPair => {
    if (r <= 5) {
      // Level 1: 2-digit close numbers
      const a = 20 + Math.floor(Math.random() * 70);
      const diff = (Math.random() > 0.5 ? 1 : -1) * (1 + Math.floor(Math.random() * 8));
      const b = a + diff;
      return { leftDisplay: String(a), leftVal: a, rightDisplay: String(b), rightVal: b };
    } else if (r <= 10) {
      // Level 2: 3-digit tricky numbers
      const base = 100 + Math.floor(Math.random() * 800);
      const diff = (Math.random() > 0.5 ? 1 : -1) * (2 + Math.floor(Math.random() * 15));
      const b = base + diff;
      return { leftDisplay: String(base), leftVal: base, rightDisplay: String(b), rightVal: b };
    } else {
      // Level 3: Mental math expressions
      const op1 = Math.floor(Math.random() * 3);
      let aVal = 0, aText = '';
      if (op1 === 0) {
        const x = 12 + Math.floor(Math.random() * 20);
        const y = 8 + Math.floor(Math.random() * 15);
        aVal = x + y;
        aText = `${x} + ${y}`;
      } else {
        const x = 4 + Math.floor(Math.random() * 7);
        const y = 6 + Math.floor(Math.random() * 8);
        aVal = x * y;
        aText = `${x} × ${y}`;
      }

      const delta = (Math.random() > 0.5 ? 1 : -1) * (1 + Math.floor(Math.random() * 4));
      const bVal = aVal + delta;
      const bText = String(bVal);

      return Math.random() > 0.5
        ? { leftDisplay: aText, leftVal: aVal, rightDisplay: bText, rightVal: bVal }
        : { leftDisplay: bText, leftVal: bVal, rightDisplay: aText, rightVal: aVal };
    }
  };

  const handleStart = () => {
    setGameState('game');
    setRound(1);
    setScore(0);
    setStreak(0);
    setTotalCorrect(0);
    const p = generatePair(1);
    setCurrentPair(p);
    setTimeLeft(4);
    setSelectedSide(null);
    setIsAnswered(false);
  };

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'game' || isAnswered) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, round, isAnswered]);

  const handleTimeOut = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setStreak(0);

    setTimeout(() => {
      advanceRound(false);
    }, 1200);
  };

  const handleChoose = (side: 'left' | 'right') => {
    if (isAnswered) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedSide(side);
    setIsAnswered(true);

    const isLeftLarger = currentPair.leftVal > currentPair.rightVal;
    const isCorrect = (side === 'left' && isLeftLarger) || (side === 'right' && !isLeftLarger);

    if (isCorrect) {
      const speedBonus = timeLeft * 5;
      const streakBonus = streak * 3;
      const points = 20 + speedBonus + streakBonus;
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setTotalCorrect(prev => prev + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      advanceRound(isCorrect);
    }, 1200);
  };

  const advanceRound = (wasCorrect: boolean) => {
    if (round >= 12) {
      const finalCorrect = totalCorrect + (wasCorrect ? 1 : 0);
      const acc = Math.round((finalCorrect / 12) * 100);
      setGameState('results');
      onGameComplete?.(score, 12, acc);
    } else {
      const nextR = round + 1;
      setRound(nextR);
      setCurrentPair(generatePair(nextR));
      setTimeLeft(Math.max(2, 4 - Math.floor(nextR / 5)));
      setSelectedSide(null);
      setIsAnswered(false);
    }
  };

  const isLeftLarger = currentPair.leftVal > currentPair.rightVal;

  return (
    <div className="w-full min-h-screen bg-[#090B0F] text-white flex flex-col items-center p-4">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Fast Number Comparison"
              description="Rapidly compare two values and tap the larger quantity before the timer runs out. Speed, mental estimation, and numerical agility."
              icon={<Zap className="w-14 h-14 text-yellow-400" />}
              iconBgColor="bg-yellow-500/20"
              iconColor="text-yellow-400"
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
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={onBack}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  <Clock className={`w-4 h-4 ${timeLeft <= 1 ? 'text-rose-400 animate-bounce' : 'text-yellow-400'}`} />
                  <span className={`font-mono font-bold ${timeLeft <= 1 ? 'text-rose-400' : 'text-white'}`}>
                    {timeLeft}s
                  </span>
                  <span className="text-white/40 text-xs ml-2">Round {round} / 12</span>
                </div>
                <div className="flex items-center gap-1.5 text-yellow-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{score} pts</span>
                </div>
              </div>

              {/* Directive banner */}
              <div className="bg-[#12151D] border border-yellow-500/20 rounded-2xl p-4 text-center">
                <p className="text-xs uppercase tracking-wider text-yellow-400 font-bold mb-1">Directive</p>
                <h3 className="text-2xl font-black text-white">TAP THE LARGER VALUE</h3>
              </div>

              {/* Side by side comparison buttons */}
              <div className="grid grid-cols-2 gap-4">
                {/* Left Card */}
                <button
                  disabled={isAnswered}
                  onClick={() => handleChoose('left')}
                  className={`h-48 rounded-2xl border font-black text-3xl sm:text-4xl flex flex-col items-center justify-center transition-all shadow-xl relative ${
                    isAnswered
                      ? isLeftLarger
                        ? 'bg-emerald-500/25 border-emerald-500 text-emerald-300'
                        : selectedSide === 'left'
                        ? 'bg-rose-500/25 border-rose-500 text-rose-300'
                        : 'bg-[#12151D]/40 border-white/5 text-white/30'
                      : 'bg-[#12151D] border-white/10 text-white hover:border-yellow-500/50 hover:bg-white/5 active:scale-95'
                  }`}
                >
                  <span>{currentPair.leftDisplay}</span>
                  {isAnswered && isLeftLarger && (
                    <div className="absolute top-3 right-3 p-1 rounded-full bg-emerald-500/30 text-emerald-400">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                  {isAnswered && selectedSide === 'left' && !isLeftLarger && (
                    <div className="absolute top-3 right-3 p-1 rounded-full bg-rose-500/30 text-rose-400">
                      <X className="w-5 h-5" />
                    </div>
                  )}
                </button>

                {/* Right Card */}
                <button
                  disabled={isAnswered}
                  onClick={() => handleChoose('right')}
                  className={`h-48 rounded-2xl border font-black text-3xl sm:text-4xl flex flex-col items-center justify-center transition-all shadow-xl relative ${
                    isAnswered
                      ? !isLeftLarger
                        ? 'bg-emerald-500/25 border-emerald-500 text-emerald-300'
                        : selectedSide === 'right'
                        ? 'bg-rose-500/25 border-rose-500 text-rose-300'
                        : 'bg-[#12151D]/40 border-white/5 text-white/30'
                      : 'bg-[#12151D] border-white/10 text-white hover:border-yellow-500/50 hover:bg-white/5 active:scale-95'
                  }`}
                >
                  <span>{currentPair.rightDisplay}</span>
                  {isAnswered && !isLeftLarger && (
                    <div className="absolute top-3 right-3 p-1 rounded-full bg-emerald-500/30 text-emerald-400">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                  {isAnswered && selectedSide === 'right' && isLeftLarger && (
                    <div className="absolute top-3 right-3 p-1 rounded-full bg-rose-500/30 text-rose-400">
                      <X className="w-5 h-5" />
                    </div>
                  )}
                </button>
              </div>

              {streak > 1 && (
                <div className="text-center text-xs font-bold text-amber-400 animate-pulse">
                  🔥 {streak} STREAK COMBO (+{streak * 3} bonus)
                </div>
              )}
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
              <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Sprint Complete!</h2>
                <p className="text-sm text-white/60">Processing Speed & Numerical Acuity</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Score</div>
                  <div className="text-2xl font-bold text-yellow-400">{score}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Accuracy</div>
                  <div className="text-2xl font-bold text-emerald-400">{Math.round((totalCorrect / 12) * 100)}%</div>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={handleStart}
                  className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
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

export default FastNumberComparisonGame;
