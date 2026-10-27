import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Layers, Trophy, RotateCcw, Sparkles, Check, X } from 'lucide-react';
import GameMenu from './GameMenu';

interface NumberAndColorGameProps {
  onBack: () => void;
  onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void;
}

type ColorKey = 'Red' | 'Blue' | 'Green' | 'Yellow';

const COLOR_MAP: Record<ColorKey, { hex: string; bg: string; border: string }> = {
  Red: { hex: '#EF4444', bg: 'bg-red-500/20', border: 'border-red-500/40' },
  Blue: { hex: '#3B82F6', bg: 'bg-blue-500/20', border: 'border-blue-500/40' },
  Green: { hex: '#10B981', bg: 'bg-emerald-500/20', border: 'border-emerald-500/40' },
  Yellow: { hex: '#FBBF24', bg: 'bg-amber-500/20', border: 'border-amber-500/40' },
};

interface RoundState {
  task: 'parity' | 'color';
  number: number;
  colorName: ColorKey;
}

export const NumberAndColorGame: React.FC<NumberAndColorGameProps> = ({
  onBack,
  onGameComplete
}) => {
  const [gameState, setGameState] = useState<'menu' | 'game' | 'results'>('menu');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [currentRound, setCurrentRound] = useState<RoundState>({ task: 'parity', number: 8, colorName: 'Blue' });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);

  const startTimeRef = useRef<number>(0);

  const colorsList: ColorKey[] = ['Red', 'Blue', 'Green', 'Yellow'];

  const generateRound = (r: number): RoundState => {
    // Alternate task: parity on odd rounds, color on even rounds (or random)
    const task = r % 2 === 1 ? 'parity' : 'color';
    const num = 1 + Math.floor(Math.random() * 50);
    const col = colorsList[Math.floor(Math.random() * colorsList.length)];

    return { task, number: num, colorName: col };
  };

  const handleStart = () => {
    setGameState('game');
    setRound(1);
    setScore(0);
    setTotalCorrect(0);
    setReactionTimes([]);
    const rState = generateRound(1);
    setCurrentRound(rState);
    setSelectedAnswer(null);
    setIsAnswered(false);
    startTimeRef.current = Date.now();
  };

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    const elapsed = Date.now() - startTimeRef.current;
    setSelectedAnswer(answer);
    setIsAnswered(true);

    let isCorrect = false;
    if (currentRound.task === 'parity') {
      const isEven = currentRound.number % 2 === 0;
      isCorrect = (answer === 'EVEN' && isEven) || (answer === 'ODD' && !isEven);
    } else {
      isCorrect = answer === currentRound.colorName;
    }

    if (isCorrect) {
      setReactionTimes(prev => [...prev, elapsed]);
      const speedBonus = Math.max(5, Math.round(30 - elapsed / 70));
      setScore(prev => prev + speedBonus);
      setTotalCorrect(prev => prev + 1);
    }

    setTimeout(() => {
      if (round >= 12) {
        const finalCorrect = totalCorrect + (isCorrect ? 1 : 0);
        const acc = Math.round((finalCorrect / 12) * 100);
        setGameState('results');
        onGameComplete?.(score, 12, acc);
      } else {
        const nextR = round + 1;
        setRound(nextR);
        setCurrentRound(generateRound(nextR));
        setSelectedAnswer(null);
        setIsAnswered(false);
        startTimeRef.current = Date.now();
      }
    }, 600);
  };

  const avgReaction = reactionTimes.length > 0
    ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
    : 0;

  return (
    <div className="w-full min-h-screen bg-[#090B0F] text-white flex flex-col items-center p-4">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Number & Color"
              description="Multitasking challenge: alternate cognitive focus between numerical parity (Even/Odd) and perceptual color identification."
              icon={<Layers className="w-14 h-14 text-indigo-400" />}
              iconBgColor="bg-indigo-500/20"
              iconColor="text-indigo-400"
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
                <div className="text-sm font-semibold text-white/60">
                  Round {round} / 12
                </div>
                <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{score} pts</span>
                </div>
              </div>

              {/* Dynamic Task Banner */}
              <div className={`p-4 rounded-2xl border text-center transition-all ${
                currentRound.task === 'parity'
                  ? 'bg-indigo-500/20 border-indigo-500/50'
                  : 'bg-emerald-500/20 border-emerald-500/50'
              }`}>
                <p className="text-xs uppercase tracking-wider text-white/60 font-bold mb-1">
                  Active Instruction
                </p>
                <h3 className="text-2xl font-black text-white">
                  {currentRound.task === 'parity' ? 'IS IT EVEN OR ODD?' : 'WHAT COLOR IS THE NUMBER?'}
                </h3>
              </div>

              {/* Central Stimulus Display */}
              <div className="bg-[#12151D] border border-white/10 rounded-2xl p-10 flex items-center justify-center shadow-xl">
                <span
                  style={{ color: COLOR_MAP[currentRound.colorName].hex }}
                  className="text-7xl sm:text-8xl font-black drop-shadow-md select-none transition-transform"
                >
                  {currentRound.number}
                </span>
              </div>

              {/* Action Buttons based on active task */}
              {currentRound.task === 'parity' ? (
                <div className="grid grid-cols-2 gap-4">
                  {['EVEN', 'ODD'].map(parityOption => {
                    const isEven = currentRound.number % 2 === 0;
                    const isCorrect = (parityOption === 'EVEN' && isEven) || (parityOption === 'ODD' && !isEven);

                    let btnStyle = 'bg-[#12151D] border-white/10 hover:border-indigo-500/40 hover:bg-white/5';
                    if (isAnswered) {
                      if (isCorrect) btnStyle = 'bg-emerald-500/25 border-emerald-500 text-emerald-300';
                      else if (parityOption === selectedAnswer) btnStyle = 'bg-rose-500/25 border-rose-500 text-rose-300';
                      else btnStyle = 'bg-[#12151D]/40 border-white/5 opacity-30';
                    }

                    return (
                      <button
                        key={parityOption}
                        disabled={isAnswered}
                        onClick={() => handleAnswer(parityOption)}
                        className={`h-24 rounded-2xl border font-black text-2xl flex items-center justify-center shadow-md active:scale-95 transition ${btnStyle}`}
                      >
                        {parityOption}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {colorsList.map(col => {
                    const isCorrect = col === currentRound.colorName;
                    let btnStyle = 'bg-[#12151D] border-white/10 hover:bg-white/5';
                    if (isAnswered) {
                      if (isCorrect) btnStyle = 'bg-emerald-500/25 border-emerald-500 text-emerald-300';
                      else if (col === selectedAnswer) btnStyle = 'bg-rose-500/25 border-rose-500 text-rose-300';
                      else btnStyle = 'bg-[#12151D]/40 border-white/5 opacity-30';
                    }

                    return (
                      <button
                        key={col}
                        disabled={isAnswered}
                        onClick={() => handleAnswer(col)}
                        className={`h-16 rounded-xl border font-bold text-lg flex items-center justify-center gap-2 shadow transition active:scale-95 ${btnStyle}`}
                      >
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: COLOR_MAP[col].hex }}
                        />
                        <span>{col}</span>
                      </button>
                    );
                  })}
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
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Multitask Sprint Complete!</h2>
                <p className="text-sm text-white/60">Cross-Modal Task Switching Proficiency</p>
              </div>

              <div className="grid grid-cols-3 gap-3 w-full">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Score</div>
                  <div className="text-xl font-bold text-indigo-400">{score}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Avg Speed</div>
                  <div className="text-xl font-bold text-cyan-400">{avgReaction}ms</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Accuracy</div>
                  <div className="text-xl font-bold text-emerald-400">{Math.round((totalCorrect / 12) * 100)}%</div>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={handleStart}
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
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

export default NumberAndColorGame;
