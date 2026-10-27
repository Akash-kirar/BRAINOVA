import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Split, Trophy, RotateCcw, Sparkles, Check, X, Layers } from 'lucide-react';
import GameMenu from './GameMenu';

interface SortByCategoryGameProps {
  onBack: () => void;
  onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void;
}

interface SortItem {
  id: string;
  name: string;
  icon: string;
  category: 'A' | 'B';
}

interface SortRoundConfig {
  title: string;
  ruleDescription: string;
  categoryAName: string;
  categoryBName: string;
  items: SortItem[];
}

const ROUNDS: SortRoundConfig[] = [
  {
    title: 'Round 1: Living Kingdoms',
    ruleDescription: 'Sort items into Animals or Plants',
    categoryAName: 'Animals 🐾',
    categoryBName: 'Plants 🌿',
    items: [
      { id: '1', name: 'Lion', icon: '🦁', category: 'A' },
      { id: '2', name: 'Oak Tree', icon: '🌳', category: 'B' },
      { id: '3', name: 'Dolphin', icon: '🐬', category: 'A' },
      { id: '4', name: 'Rose', icon: '🌹', category: 'B' },
      { id: '5', name: 'Eagle', icon: '🦅', category: 'A' },
      { id: '6', name: 'Cactus', icon: '🌵', category: 'B' }
    ]
  },
  {
    title: 'Round 2: Numerical Parity',
    ruleDescription: 'Sort numbers into Even or Odd',
    categoryAName: 'Even Numbers',
    categoryBName: 'Odd Numbers',
    items: [
      { id: '1', name: '24', icon: '24', category: 'A' },
      { id: '2', name: '17', icon: '17', category: 'B' },
      { id: '3', name: '88', icon: '88', category: 'A' },
      { id: '4', name: '39', icon: '39', category: 'B' },
      { id: '5', name: '52', icon: '52', category: 'A' },
      { id: '6', name: '91', icon: '91', category: 'B' }
    ]
  },
  {
    title: 'Round 3: Color Temperature',
    ruleDescription: 'Sort colors into Warm or Cool Tones',
    categoryAName: 'Warm Tones 🔥',
    categoryBName: 'Cool Tones ❄️',
    items: [
      { id: '1', name: 'Crimson Red', icon: '🟥', category: 'A' },
      { id: '2', name: 'Ocean Blue', icon: '🟦', category: 'B' },
      { id: '3', name: 'Sun Yellow', icon: '🟨', category: 'A' },
      { id: '4', name: 'Forest Green', icon: '🟩', category: 'B' },
      { id: '5', name: 'Amber Orange', icon: '🟧', category: 'A' },
      { id: '6', name: 'Deep Violet', icon: '🟪', category: 'B' }
    ]
  },
  {
    title: 'Round 4: Food Type',
    ruleDescription: 'Sort items into Fresh Fruits or Vegetables',
    categoryAName: 'Fruits 🍎',
    categoryBName: 'Vegetables 🥕',
    items: [
      { id: '1', name: 'Strawberry', icon: '🍓', category: 'A' },
      { id: '2', name: 'Broccoli', icon: '🥦', category: 'B' },
      { id: '3', name: 'Banana', icon: '🍌', category: 'A' },
      { id: '4', name: 'Carrot', icon: '🥕', category: 'B' },
      { id: '5', name: 'Watermelon', icon: '🍉', category: 'A' },
      { id: '6', name: 'Corn', icon: '🌽', category: 'B' }
    ]
  },
  {
    title: 'Round 5: Transportation Realm',
    ruleDescription: 'Sort into Land Vehicles or Sky / Air Transport',
    categoryAName: 'Land 🚗',
    categoryBName: 'Air / Sky ✈️',
    items: [
      { id: '1', name: 'Sports Car', icon: '🏎️', category: 'A' },
      { id: '2', name: 'Jet Airplane', icon: '✈️', category: 'B' },
      { id: '3', name: 'Locomotive', icon: '🚂', category: 'A' },
      { id: '4', name: 'Helicopter', icon: '🚁', category: 'B' },
      { id: '5', name: 'Bicycle', icon: '🚲', category: 'A' },
      { id: '6', name: 'Hot Air Balloon', icon: '🎈', category: 'B' }
    ]
  }
];

export const SortByCategoryGame: React.FC<SortByCategoryGameProps> = ({
  onBack,
  onGameComplete
}) => {
  const [gameState, setGameState] = useState<'menu' | 'game' | 'results'>('menu');
  const [roundIdx, setRoundIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<'correct' | 'wrong' | null>(null);

  const currentRound = ROUNDS[roundIdx % ROUNDS.length];
  const currentItem = currentRound.items[itemIdx];

  const handleStart = () => {
    setGameState('game');
    setRoundIdx(0);
    setItemIdx(0);
    setScore(0);
    setTotalAttempts(0);
    setTotalCorrect(0);
    setLastFeedback(null);
  };

  const handleSortChoice = (choice: 'A' | 'B') => {
    if (lastFeedback !== null) return;

    const isCorrect = choice === currentItem.category;
    setTotalAttempts(prev => prev + 1);

    if (isCorrect) {
      setScore(prev => prev + 20);
      setTotalCorrect(prev => prev + 1);
      setLastFeedback('correct');
    } else {
      setLastFeedback('wrong');
    }

    setTimeout(() => {
      setLastFeedback(null);
      if (itemIdx + 1 < currentRound.items.length) {
        setItemIdx(prev => prev + 1);
      } else {
        // Next round
        if (roundIdx + 1 >= ROUNDS.length) {
          const finalScore = score + (isCorrect ? 20 : 0);
          const finalCorrect = totalCorrect + (isCorrect ? 1 : 0);
          const acc = Math.round((finalCorrect / (totalAttempts + 1)) * 100);
          setGameState('results');
          onGameComplete?.(finalScore, ROUNDS.length, acc);
        } else {
          setRoundIdx(prev => prev + 1);
          setItemIdx(0);
        }
      }
    }, 450);
  };

  return (
    <div className="w-full min-h-screen bg-[#090B0F] text-white flex flex-col items-center p-4">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Sort by Category"
              description="Rapidly classify items into dynamic categories as sorting rules shift across rounds. Cognitive flexibility and task switching."
              icon={<Split className="w-14 h-14 text-teal-400" />}
              iconBgColor="bg-teal-500/20"
              iconColor="text-teal-400"
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
                  {currentRound.title} • Item {itemIdx + 1}/{currentRound.items.length}
                </div>
                <div className="flex items-center gap-1.5 text-teal-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{score} pts</span>
                </div>
              </div>

              {/* Rule Card */}
              <div className="bg-[#12151D] border border-teal-500/30 rounded-2xl p-4 text-center">
                <p className="text-xs uppercase tracking-wider text-teal-400 font-bold mb-1">Sorting Directive</p>
                <h3 className="text-xl font-bold text-white">{currentRound.ruleDescription}</h3>
              </div>

              {/* Active Item to Sort */}
              <div className={`bg-[#12151D] border rounded-2xl p-8 text-center flex flex-col items-center shadow-xl relative transition-all duration-300 ${
                lastFeedback === 'correct'
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : lastFeedback === 'wrong'
                  ? 'border-rose-500 bg-rose-500/10'
                  : 'border-white/10'
              }`}>
                <div className="text-6xl mb-3 drop-shadow">
                  {currentItem.icon}
                </div>
                <h2 className="text-2xl font-black text-white">{currentItem.name}</h2>
                <p className="text-xs text-white/40 mt-1">Tap which category this belongs to</p>

                {lastFeedback === 'correct' && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 right-3 text-emerald-400">
                    <Check className="w-6 h-6" />
                  </motion.div>
                )}
                {lastFeedback === 'wrong' && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 right-3 text-rose-400">
                    <X className="w-6 h-6" />
                  </motion.div>
                )}
              </div>

              {/* 2 Category Classification Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  disabled={lastFeedback !== null}
                  onClick={() => handleSortChoice('A')}
                  className="py-5 px-4 rounded-2xl border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 active:scale-95 text-cyan-300 font-extrabold text-lg transition flex flex-col items-center justify-center shadow-lg"
                >
                  <span className="text-xs uppercase tracking-wider text-cyan-400/70 mb-1">Category A</span>
                  <span>{currentRound.categoryAName}</span>
                </button>

                <button
                  disabled={lastFeedback !== null}
                  onClick={() => handleSortChoice('B')}
                  className="py-5 px-4 rounded-2xl border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 active:scale-95 text-purple-300 font-extrabold text-lg transition flex flex-col items-center justify-center shadow-lg"
                >
                  <span className="text-xs uppercase tracking-wider text-purple-400/70 mb-1">Category B</span>
                  <span>{currentRound.categoryBName}</span>
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
              <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-teal-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Sorting Completed!</h2>
                <p className="text-sm text-white/60">Category Flexibility & Speed</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Score</div>
                  <div className="text-2xl font-bold text-teal-400">{score}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Accuracy</div>
                  <div className="text-2xl font-bold text-emerald-400">
                    {totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 100}%
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={handleStart}
                  className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
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

export default SortByCategoryGame;
