import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, RefreshCw, Trophy, RotateCcw, Sparkles, Check, X, ArrowUp, ArrowDown, ArrowLeft as LeftIcon, ArrowRight as RightIcon } from 'lucide-react';
import GameMenu from './GameMenu';

interface OppositeAnswerGameProps {
  onBack: () => void;
  onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void;
}

interface Question {
  instruction: string;
  stimulusDisplay: React.ReactNode;
  options: { label: string; icon?: React.ReactNode; isCorrect: boolean }[];
}

const QUESTIONS: Question[] = [
  {
    instruction: 'Select the OPPOSITE direction of the arrow',
    stimulusDisplay: <LeftIcon className="w-16 h-16 text-cyan-400" />,
    options: [
      { label: 'Right', icon: <RightIcon className="w-6 h-6" />, isCorrect: true },
      { label: 'Left', icon: <LeftIcon className="w-6 h-6" />, isCorrect: false },
      { label: 'Up', icon: <ArrowUp className="w-6 h-6" />, isCorrect: false },
      { label: 'Down', icon: <ArrowDown className="w-6 h-6" />, isCorrect: false }
    ]
  },
  {
    instruction: 'Select the OPPOSITE direction of the arrow',
    stimulusDisplay: <ArrowUp className="w-16 h-16 text-emerald-400" />,
    options: [
      { label: 'Down', icon: <ArrowDown className="w-6 h-6" />, isCorrect: true },
      { label: 'Up', icon: <ArrowUp className="w-6 h-6" />, isCorrect: false },
      { label: 'Left', icon: <LeftIcon className="w-6 h-6" />, isCorrect: false },
      { label: 'Right', icon: <RightIcon className="w-6 h-6" />, isCorrect: false }
    ]
  },
  {
    instruction: 'Select the OPPOSITE antonym',
    stimulusDisplay: <span className="text-4xl font-black text-rose-400 tracking-wider">HOT</span>,
    options: [
      { label: 'Cold', isCorrect: true },
      { label: 'Warm', isCorrect: false },
      { label: 'Boiling', isCorrect: false },
      { label: 'Spicy', isCorrect: false }
    ]
  },
  {
    instruction: 'Select the OPPOSITE state',
    stimulusDisplay: <span className="text-4xl font-black text-amber-400 tracking-wider">DAY</span>,
    options: [
      { label: 'Night', isCorrect: true },
      { label: 'Dawn', isCorrect: false },
      { label: 'Sun', isCorrect: false },
      { label: 'Morning', isCorrect: false }
    ]
  },
  {
    instruction: 'Select the OPPOSITE direction of the arrow',
    stimulusDisplay: <RightIcon className="w-16 h-16 text-purple-400" />,
    options: [
      { label: 'Left', icon: <LeftIcon className="w-6 h-6" />, isCorrect: true },
      { label: 'Right', icon: <RightIcon className="w-6 h-6" />, isCorrect: false },
      { label: 'Down', icon: <ArrowDown className="w-6 h-6" />, isCorrect: false },
      { label: 'Up', icon: <ArrowUp className="w-6 h-6" />, isCorrect: false }
    ]
  },
  {
    instruction: 'Select the OPPOSITE direction of the arrow',
    stimulusDisplay: <ArrowDown className="w-16 h-16 text-yellow-400" />,
    options: [
      { label: 'Up', icon: <ArrowUp className="w-6 h-6" />, isCorrect: true },
      { label: 'Down', icon: <ArrowDown className="w-6 h-6" />, isCorrect: false },
      { label: 'Left', icon: <LeftIcon className="w-6 h-6" />, isCorrect: false },
      { label: 'Right', icon: <RightIcon className="w-6 h-6" />, isCorrect: false }
    ]
  },
  {
    instruction: 'Select the OPPOSITE truth value',
    stimulusDisplay: <span className="text-4xl font-black text-emerald-400 tracking-wider">TRUE</span>,
    options: [
      { label: 'False', isCorrect: true },
      { label: 'True', isCorrect: false },
      { label: 'Correct', isCorrect: false },
      { label: 'Valid', isCorrect: false }
    ]
  },
  {
    instruction: 'Select the OPPOSITE antonym',
    stimulusDisplay: <span className="text-4xl font-black text-blue-400 tracking-wider">FULL</span>,
    options: [
      { label: 'Empty', isCorrect: true },
      { label: 'Packed', isCorrect: false },
      { label: 'Heavy', isCorrect: false },
      { label: 'Solid', isCorrect: false }
    ]
  },
  {
    instruction: 'Select the OPPOSITE antonym',
    stimulusDisplay: <span className="text-4xl font-black text-purple-400 tracking-wider">EXPAND</span>,
    options: [
      { label: 'Shrink', isCorrect: true },
      { label: 'Grow', isCorrect: false },
      { label: 'Enlarge', isCorrect: false },
      { label: 'Stretch', isCorrect: false }
    ]
  },
  {
    instruction: 'Select the OPPOSITE direction of the arrow',
    stimulusDisplay: <LeftIcon className="w-16 h-16 text-teal-400" />,
    options: [
      { label: 'Right', icon: <RightIcon className="w-6 h-6" />, isCorrect: true },
      { label: 'Left', icon: <LeftIcon className="w-6 h-6" />, isCorrect: false },
      { label: 'Down', icon: <ArrowDown className="w-6 h-6" />, isCorrect: false },
      { label: 'Up', icon: <ArrowUp className="w-6 h-6" />, isCorrect: false }
    ]
  }
];

export const OppositeAnswerGame: React.FC<OppositeAnswerGameProps> = ({
  onBack,
  onGameComplete
}) => {
  const [gameState, setGameState] = useState<'menu' | 'game' | 'results'>('menu');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQ = QUESTIONS[currentIndex % QUESTIONS.length];

  const handleStart = () => {
    setGameState('game');
    setCurrentIndex(0);
    setScore(0);
    setTotalCorrect(0);
    setSelectedIdx(null);
    setIsAnswered(false);
  };

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
    setIsAnswered(true);

    const isCorrect = currentQ.options[idx].isCorrect;
    if (isCorrect) {
      setScore(prev => prev + 25);
      setTotalCorrect(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 >= QUESTIONS.length) {
        const finalScore = score + (isCorrect ? 25 : 0);
        const finalCorrect = totalCorrect + (isCorrect ? 1 : 0);
        const acc = Math.round((finalCorrect / QUESTIONS.length) * 100);
        setGameState('results');
        onGameComplete?.(finalScore, QUESTIONS.length, acc);
      } else {
        setCurrentIndex(prev => prev + 1);
        setSelectedIdx(null);
        setIsAnswered(false);
      }
    }, 700);
  };

  return (
    <div className="w-full min-h-screen bg-[#090B0F] text-white flex flex-col items-center p-4">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Opposite Answer"
              description="Overcome automatic instincts: ignore direct visual cues and choose the exact opposite response. Inhibitory control & executive agility."
              icon={<RefreshCw className="w-14 h-14 text-rose-400" />}
              iconBgColor="bg-rose-500/20"
              iconColor="text-rose-400"
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
                  Round {currentIndex + 1} / {QUESTIONS.length}
                </div>
                <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{score} pts</span>
                </div>
              </div>

              {/* Instruction Banner */}
              <div className="bg-[#12151D] border border-rose-500/30 rounded-2xl p-4 text-center shadow-lg">
                <p className="text-xs uppercase tracking-wider text-rose-400 font-bold mb-1">Inhibition Directive</p>
                <h3 className="text-xl font-bold text-white">{currentQ.instruction}</h3>
              </div>

              {/* Stimulus Presentation */}
              <div className="bg-[#12151D] border border-white/10 rounded-2xl p-8 flex items-center justify-center shadow-xl min-h-[160px]">
                {currentQ.stimulusDisplay}
              </div>

              {/* 4 Candidate Answer Buttons */}
              <div className="grid grid-cols-2 gap-3">
                {currentQ.options.map((opt, idx) => {
                  let btnStyle = 'bg-[#12151D] border-white/10 text-white hover:border-rose-500/40 hover:bg-white/5';
                  if (isAnswered) {
                    if (opt.isCorrect) {
                      btnStyle = 'bg-emerald-500/25 border-emerald-500 text-emerald-300';
                    } else if (idx === selectedIdx) {
                      btnStyle = 'bg-rose-500/25 border-rose-500 text-rose-300';
                    } else {
                      btnStyle = 'bg-[#12151D]/40 border-white/5 opacity-30';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelect(idx)}
                      className={`h-20 rounded-2xl border font-black text-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${btnStyle}`}
                    >
                      {opt.icon && <span>{opt.icon}</span>}
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
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
              <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-rose-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Inhibition Challenge Complete!</h2>
                <p className="text-sm text-white/60">Cognitive Flexibility Score</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Score</div>
                  <div className="text-2xl font-bold text-rose-400">{score}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Accuracy</div>
                  <div className="text-2xl font-bold text-emerald-400">{Math.round((totalCorrect / QUESTIONS.length) * 100)}%</div>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={handleStart}
                  className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
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

export default OppositeAnswerGame;
