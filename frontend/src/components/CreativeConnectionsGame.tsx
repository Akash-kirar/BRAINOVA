import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Lightbulb, Trophy, RotateCcw, Sparkles, Check, X } from 'lucide-react';
import GameMenu from './GameMenu';

interface CreativeConnectionsGameProps {
  onBack: () => void;
  onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void;
}

interface ConnectionTriad {
  words: [string, string, string];
  options: string[];
  correct: string;
  explanation: string;
}

const TRIADS: ConnectionTriad[] = [
  {
    words: ['Lock', 'Piano', 'Board'],
    options: ['Key', 'Note', 'Wood', 'Tune'],
    correct: 'Key',
    explanation: 'A key unlocks a lock, keys play notes on a piano, and keys form a keyboard.'
  },
  {
    words: ['Sleeping', 'Sand', 'Tea'],
    options: ['Bag', 'Bed', 'Cup', 'Dune'],
    correct: 'Bag',
    explanation: 'Sleeping bag, sandbag, and teabag are all compound nouns formed with "bag".'
  },
  {
    words: ['Swiss', 'Cake', 'Cottage'],
    options: ['Cheese', 'Cream', 'Sugar', 'Bake'],
    correct: 'Cheese',
    explanation: 'Swiss cheese, cheesecake, and cottage cheese are all common food pairings.'
  },
  {
    words: ['River', 'Money', 'Blood'],
    options: ['Bank', 'Flow', 'Safe', 'Vault'],
    correct: 'Bank',
    explanation: 'River bank, money bank, and blood bank all share the word "bank".'
  },
  {
    words: ['Cannon', 'Eye', 'Beach'],
    options: ['Ball', 'Wave', 'Sand', 'Glass'],
    correct: 'Ball',
    explanation: 'Cannonball, eyeball, and beach ball all connect with "ball".'
  },
  {
    words: ['Rocking', 'High', 'Wheel'],
    options: ['Chair', 'Horse', 'Table', 'Bench'],
    correct: 'Chair',
    explanation: 'Rocking chair, high chair, and wheelchair are types of chairs.'
  },
  {
    words: ['Pine', 'Crab', 'Sauce'],
    options: ['Apple', 'Cone', 'Juice', 'Fish'],
    correct: 'Apple',
    explanation: 'Pineapple, crabapple, and applesauce all center around "apple".'
  },
  {
    words: ['Rain', 'Snow', 'Trench'],
    options: ['Coat', 'Storm', 'Water', 'Boot'],
    correct: 'Coat',
    explanation: 'Raincoat, snow coat, and trenchcoat are all outer garments.'
  },
  {
    words: ['Fish', 'Mine', 'Rush'],
    options: ['Gold', 'Silver', 'Water', 'Net'],
    correct: 'Gold',
    explanation: 'Goldfish, gold mine, and gold rush all pair with "gold".'
  },
  {
    words: ['Camp', 'Wild', 'Back'],
    options: ['Fire', 'Tent', 'Pack', 'Woods'],
    correct: 'Fire',
    explanation: 'Campfire, wildfire, and backfire all finish with "fire".'
  }
];

export const CreativeConnectionsGame: React.FC<CreativeConnectionsGameProps> = ({
  onBack,
  onGameComplete
}) => {
  const [gameState, setGameState] = useState<'menu' | 'game' | 'results'>('menu');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentTriad = TRIADS[currentIndex % TRIADS.length];

  const handleStart = () => {
    setGameState('game');
    setCurrentIndex(0);
    setScore(0);
    setTotalCorrect(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === currentTriad.correct;
    if (isCorrect) {
      setScore(prev => prev + 25);
      setTotalCorrect(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 >= 8) {
        const finalCorrect = totalCorrect + (isCorrect ? 1 : 0);
        const finalScore = score + (isCorrect ? 25 : 0);
        const acc = Math.round((finalCorrect / 8) * 100);
        setGameState('results');
        onGameComplete?.(finalScore, 8, acc);
      } else {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      }
    }, 1800);
  };

  return (
    <div className="w-full min-h-screen bg-[#090B0F] text-white flex flex-col items-center p-4">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Creative Connections"
              description="Discover the single common thread connecting three seemingly unrelated words. Remote association and associative fluency training."
              icon={<Lightbulb className="w-14 h-14 text-yellow-400" />}
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
                <div className="text-sm font-semibold text-white/60">
                  Triad {currentIndex + 1} / 8
                </div>
                <div className="flex items-center gap-1.5 text-yellow-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{score} pts</span>
                </div>
              </div>

              {/* 3 Clue Words Display */}
              <div className="bg-[#12151D] border border-yellow-500/20 rounded-2xl p-6 text-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 pointer-events-none" />
                <p className="text-xs uppercase tracking-wider text-yellow-400 font-bold mb-4">
                  Which one word connects all three?
                </p>

                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {currentTriad.words.map((w, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-lg font-bold text-white shadow"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              {/* 4 Options */}
              <div className="grid grid-cols-2 gap-3">
                {currentTriad.options.map((opt) => {
                  let btnStyle = 'bg-[#12151D] border-white/10 text-white hover:border-yellow-500/40 hover:bg-white/5';
                  if (isAnswered) {
                    if (opt === currentTriad.correct) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
                    } else if (opt === selectedAnswer) {
                      btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                    } else {
                      btnStyle = 'bg-[#12151D]/50 border-white/5 opacity-40';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      disabled={isAnswered}
                      onClick={() => handleSelect(opt)}
                      className={`p-4 rounded-xl border font-bold text-lg transition-all flex items-center justify-between shadow ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && opt === currentTriad.correct && (
                        <Check className="w-5 h-5 text-emerald-400" />
                      )}
                      {isAnswered && opt === selectedAnswer && opt !== currentTriad.correct && (
                        <X className="w-5 h-5 text-rose-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-yellow-950/30 border border-yellow-500/20 rounded-xl p-3 text-xs text-yellow-300 text-center"
                >
                  <span className="font-bold text-white">{currentTriad.correct}</span>: {currentTriad.explanation}
                </motion.div>
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
                <h2 className="text-2xl font-bold text-white mb-1">Associative Fluency Complete!</h2>
                <p className="text-sm text-white/60">Creative Synthesis Score</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Score</div>
                  <div className="text-2xl font-bold text-yellow-400">{score}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Accuracy</div>
                  <div className="text-2xl font-bold text-emerald-400">{Math.round((totalCorrect / 8) * 100)}%</div>
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

export default CreativeConnectionsGame;
