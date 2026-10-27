import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Crosshair, Trophy, RotateCcw, Sparkles, Check, X } from 'lucide-react';
import GameMenu from './GameMenu';

interface DualTargetGameProps {
  onBack: () => void;
  onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void;
}

type ShapeType = 'circle' | 'square' | 'triangle' | 'star';

interface DualItem {
  id: string;
  kind: 'shape' | 'number';
  shape?: ShapeType;
  color?: string;
  colorName?: string;
  number?: number;
  isTarget1?: boolean;
  isTarget2?: boolean;
}

interface DualTargetRound {
  target1Desc: string;
  target2Desc: string;
  items: DualItem[];
}

export const DualTargetGame: React.FC<DualTargetGameProps> = ({
  onBack,
  onGameComplete
}) => {
  const [gameState, setGameState] = useState<'menu' | 'game' | 'results'>('menu');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [currentRoundData, setCurrentRoundData] = useState<DualTargetRound>({
    target1Desc: '',
    target2Desc: '',
    items: []
  });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const generateRound = (r: number): DualTargetRound => {
    const itemCount = 6 + Math.min(6, (r - 1) * 2); // 6, 8, 10, 12 items

    const colors = [
      { name: 'Red', hex: '#EF4444' },
      { name: 'Blue', hex: '#3B82F6' },
      { name: 'Green', hex: '#10B981' },
      { name: 'Yellow', hex: '#FBBF24' }
    ];
    const shapes: ShapeType[] = ['circle', 'square', 'triangle', 'star'];

    // Pick target 1: a colored shape
    const targetColor = colors[Math.floor(Math.random() * colors.length)];
    const targetShape = shapes[Math.floor(Math.random() * shapes.length)];
    const target1Desc = `${targetColor.name} ${targetShape.charAt(0).toUpperCase() + targetShape.slice(1)}`;

    // Pick target 2: a specific distinct number
    const targetNum = 10 + Math.floor(Math.random() * 80);
    const target2Desc = `Number ${targetNum}`;

    const items: DualItem[] = [];

    // Add target 1
    items.push({
      id: 'target-1',
      kind: 'shape',
      shape: targetShape,
      color: targetColor.hex,
      colorName: targetColor.name,
      isTarget1: true
    });

    // Add target 2
    items.push({
      id: 'target-2',
      kind: 'number',
      number: targetNum,
      color: '#ffffff',
      isTarget2: true
    });

    // Add distractors
    for (let i = 2; i < itemCount; i++) {
      if (i % 2 === 0) {
        // Distractor shape
        let s = shapes[Math.floor(Math.random() * shapes.length)];
        let c = colors[Math.floor(Math.random() * colors.length)];
        // Prevent accidental duplicate target
        if (s === targetShape && c.name === targetColor.name) {
          s = shapes.find(x => x !== targetShape) || 'circle';
        }
        items.push({
          id: `distractor-${i}`,
          kind: 'shape',
          shape: s,
          color: c.hex,
          colorName: c.name
        });
      } else {
        // Distractor number
        let n = 10 + Math.floor(Math.random() * 80);
        if (n === targetNum) n = targetNum + 5;
        items.push({
          id: `distractor-${i}`,
          kind: 'number',
          number: n,
          color: '#ffffff'
        });
      }
    }

    return {
      target1Desc,
      target2Desc,
      items: items.sort(() => Math.random() - 0.5)
    };
  };

  const handleStart = () => {
    setGameState('game');
    setRound(1);
    setScore(0);
    setTotalCorrect(0);
    setSelectedIds([]);
    setIsEvaluating(false);
    setCurrentRoundData(generateRound(1));
  };

  const toggleSelect = (id: string) => {
    if (isEvaluating) return;

    let updated: string[];
    if (selectedIds.includes(id)) {
      updated = selectedIds.filter(i => i !== id);
    } else {
      if (selectedIds.length >= 2) return;
      updated = [...selectedIds, id];
    }
    setSelectedIds(updated);

    if (updated.length === 2) {
      // Both selected, evaluate immediately
      setIsEvaluating(true);
      const isTarget1Found = updated.includes('target-1');
      const isTarget2Found = updated.includes('target-2');
      const allCorrect = isTarget1Found && isTarget2Found;

      if (allCorrect) {
        setScore(prev => prev + 40 + round * 5);
        setTotalCorrect(prev => prev + 1);
      }

      setTimeout(() => {
        if (round >= 6) {
          const finalCorrect = totalCorrect + (allCorrect ? 1 : 0);
          const finalScore = score + (allCorrect ? 40 + round * 5 : 0);
          const acc = Math.round((finalCorrect / 6) * 100);
          setGameState('results');
          onGameComplete?.(finalScore, 6, acc);
        } else {
          const nextR = round + 1;
          setRound(nextR);
          setSelectedIds([]);
          setIsEvaluating(false);
          setCurrentRoundData(generateRound(nextR));
        }
      }, 1200);
    }
  };

  const renderShapeSvg = (shape: ShapeType, color: string) => {
    switch (shape) {
      case 'circle':
        return <circle cx="20" cy="20" r="15" fill={color} />;
      case 'square':
        return <rect x="6" y="6" width="28" height="28" rx="4" fill={color} />;
      case 'triangle':
        return <polygon points="20,4 36,34 4,34" fill={color} />;
      case 'star':
        return <polygon points="20,2 25,14 38,15 28,23 31,36 20,28 9,36 12,23 2,15 15,14" fill={color} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#090B0F] text-white flex flex-col items-center p-4">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Dual Target"
              description="Divided attention & visual search: track and select two simultaneous disparate targets (e.g. colored shape + distinct number)."
              icon={<Crosshair className="w-14 h-14 text-cyan-400" />}
              iconBgColor="bg-cyan-500/20"
              iconColor="text-cyan-400"
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
              className="flex flex-col gap-5"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={onBack}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="text-sm font-semibold text-white/60">
                  Round {round} / 6 • Selected: {selectedIds.length}/2
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{score} pts</span>
                </div>
              </div>

              {/* Dual Target Banner */}
              <div className="bg-[#12151D] border border-cyan-500/30 rounded-2xl p-4 text-center shadow-lg">
                <p className="text-xs uppercase tracking-wider text-cyan-400 font-bold mb-2">Find Both Targets</p>
                <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
                  <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-bold text-sm sm:text-base">
                    1️⃣ {currentRoundData.target1Desc}
                  </span>
                  <span className="text-white/40 font-bold">&</span>
                  <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/40 text-purple-300 font-bold text-sm sm:text-base">
                    2️⃣ {currentRoundData.target2Desc}
                  </span>
                </div>
              </div>

              {/* Items Grid */}
              <div className={`grid gap-3 ${
                currentRoundData.items.length <= 6 ? 'grid-cols-3' : 'grid-cols-3 sm:grid-cols-4'
              }`}>
                {currentRoundData.items.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  const isCorrectTarget = item.isTarget1 || item.isTarget2;

                  let cellStyle = 'bg-[#12151D] border-white/10 hover:border-cyan-500/40 hover:bg-white/5';
                  if (isSelected && !isEvaluating) {
                    cellStyle = 'bg-cyan-500/20 border-cyan-400 ring-2 ring-cyan-400/50';
                  } else if (isEvaluating) {
                    if (isSelected && isCorrectTarget) {
                      cellStyle = 'bg-emerald-500/25 border-emerald-500 text-emerald-300';
                    } else if (isSelected && !isCorrectTarget) {
                      cellStyle = 'bg-rose-500/25 border-rose-500 text-rose-300';
                    } else if (!isSelected && isCorrectTarget) {
                      cellStyle = 'bg-emerald-500/10 border-emerald-500/40 border-dashed';
                    }
                  }

                  return (
                    <button
                      key={item.id}
                      disabled={isEvaluating}
                      onClick={() => toggleSelect(item.id)}
                      className={`h-24 rounded-2xl border flex items-center justify-center transition-all shadow relative active:scale-95 ${cellStyle}`}
                    >
                      {item.kind === 'shape' && item.shape && item.color && (
                        <svg viewBox="0 0 40 40" className="w-12 h-12 drop-shadow">
                          {renderShapeSvg(item.shape, item.color)}
                        </svg>
                      )}
                      {item.kind === 'number' && (
                        <span className="text-3xl font-black text-white">{item.number}</span>
                      )}
                      {isSelected && isEvaluating && isCorrectTarget && (
                        <Check className="w-4 h-4 text-emerald-400 absolute top-2 right-2" />
                      )}
                      {isSelected && isEvaluating && !isCorrectTarget && (
                        <X className="w-4 h-4 text-rose-400 absolute top-2 right-2" />
                      )}
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
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Dual Target Complete!</h2>
                <p className="text-sm text-white/60">Divided Attention & Visual Search</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Score</div>
                  <div className="text-2xl font-bold text-cyan-400">{score}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Accuracy</div>
                  <div className="text-2xl font-bold text-emerald-400">{Math.round((totalCorrect / 6) * 100)}%</div>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={handleStart}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
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

export default DualTargetGame;
