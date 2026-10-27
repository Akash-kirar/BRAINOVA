import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Repeat, Trophy, RotateCcw, Sparkles, Check, X, AlertTriangle } from 'lucide-react';
import GameMenu from './GameMenu';

interface RuleSwitchGameProps {
  onBack: () => void;
  onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void;
}

interface Rule {
  id: string;
  label: string;
  predicate: (num: number) => boolean;
  color: string;
}

const RULES: Rule[] = [
  { id: 'even', label: 'Select all EVEN numbers', predicate: (n) => n % 2 === 0, color: 'text-emerald-400' },
  { id: 'odd', label: 'Select all ODD numbers', predicate: (n) => n % 2 !== 0, color: 'text-amber-400' },
  { id: 'gt25', label: 'Select numbers GREATER than 25', predicate: (n) => n > 25, color: 'text-cyan-400' },
  { id: 'lt20', label: 'Select numbers LESS than 20', predicate: (n) => n < 20, color: 'text-purple-400' },
  { id: 'mult5', label: 'Select MULTIPLES of 5', predicate: (n) => n % 5 === 0, color: 'text-rose-400' },
  { id: 'mult3', label: 'Select MULTIPLES of 3', predicate: (n) => n % 3 === 0, color: 'text-blue-400' },
];

export const RuleSwitchGame: React.FC<RuleSwitchGameProps> = ({
  onBack,
  onGameComplete
}) => {
  const [gameState, setGameState] = useState<'menu' | 'game' | 'results'>('menu');
  const [round, setRound] = useState(1);
  const [currentRuleIndex, setCurrentRuleIndex] = useState(0);
  const [ruleSwitched, setRuleSwitched] = useState(false);
  const [score, setScore] = useState(0);
  const [gridNumbers, setGridNumbers] = useState<number[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [correctRounds, setCorrectRounds] = useState(0);

  const currentRule = RULES[currentRuleIndex % RULES.length];

  const generateRoundGrid = (rule: Rule, r: number) => {
    // Generate 9 distinct numbers
    const validNums: number[] = [];
    const invalidNums: number[] = [];

    for (let n = 2; n <= 50; n++) {
      if (rule.predicate(n)) {
        validNums.push(n);
      } else {
        invalidNums.push(n);
      }
    }

    // Pick 3-4 valid numbers, 5-6 invalid
    validNums.sort(() => Math.random() - 0.5);
    invalidNums.sort(() => Math.random() - 0.5);

    const validCount = 3 + (r % 2);
    const chosen = [
      ...validNums.slice(0, validCount),
      ...invalidNums.slice(0, 9 - validCount)
    ];

    setGridNumbers(chosen.sort(() => Math.random() - 0.5));
    setSelectedNumbers([]);
    setIsEvaluated(false);
  };

  const handleStart = () => {
    setGameState('game');
    setRound(1);
    setCurrentRuleIndex(0);
    setRuleSwitched(false);
    setScore(0);
    setCorrectRounds(0);
    generateRoundGrid(RULES[0], 1);
  };

  const toggleSelect = (num: number) => {
    if (isEvaluated) return;
    setSelectedNumbers(prev =>
      prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]
    );
  };

  const handleSubmit = () => {
    if (isEvaluated) return;
    setIsEvaluated(true);

    const targetSet = new Set(gridNumbers.filter(n => currentRule.predicate(n)));
    const userSet = new Set(selectedNumbers);

    // Calculate accuracy for this round
    let allCorrect = true;
    for (const num of targetSet) {
      if (!userSet.has(num)) allCorrect = false;
    }
    for (const num of userSet) {
      if (!targetSet.has(num)) allCorrect = false;
    }

    if (allCorrect) {
      setScore(prev => prev + 50);
      setCorrectRounds(prev => prev + 1);
    } else {
      // Partial credit
      let match = 0;
      userSet.forEach(n => {
        if (targetSet.has(n)) match++;
      });
      setScore(prev => prev + match * 10);
    }

    setTimeout(() => {
      if (round >= 6) {
        const finalCorrect = correctRounds + (allCorrect ? 1 : 0);
        const finalScore = score + (allCorrect ? 50 : 0);
        const acc = Math.round((finalCorrect / 6) * 100);
        setGameState('results');
        onGameComplete?.(finalScore, 6, acc);
      } else {
        const nextRound = round + 1;
        setRound(nextRound);
        // Switch rule every 2 rounds
        let nextRuleIdx = currentRuleIndex;
        if (nextRound % 2 === 1) {
          nextRuleIdx = (currentRuleIndex + 1) % RULES.length;
          setCurrentRuleIndex(nextRuleIdx);
          setRuleSwitched(true);
          setTimeout(() => setRuleSwitched(false), 2000);
        }
        generateRoundGrid(RULES[nextRuleIdx], nextRound);
      }
    }, 1800);
  };

  return (
    <div className="w-full min-h-screen bg-[#090B0F] text-white flex flex-col items-center p-4">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Rule Switch"
              description="Test executive function and mental flexibility: follow the active sorting rule, and quickly adapt when the rule abruptly changes."
              icon={<Repeat className="w-14 h-14 text-amber-400" />}
              iconBgColor="bg-amber-500/20"
              iconColor="text-amber-400"
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
                  Round {round} / 6
                </div>
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{score} pts</span>
                </div>
              </div>

              {/* Active Rule Card */}
              <div className={`p-5 rounded-2xl border transition-all text-center relative overflow-hidden ${
                ruleSwitched
                  ? 'bg-amber-500/20 border-amber-500 animate-pulse'
                  : 'bg-[#12151D] border-white/10'
              }`}>
                {ruleSwitched && (
                  <div className="flex items-center justify-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                    <AlertTriangle className="w-4 h-4" /> RULE CHANGED!
                  </div>
                )}
                {!ruleSwitched && (
                  <p className="text-xs uppercase tracking-wider text-white/50 font-bold mb-1">Current Directive</p>
                )}
                <h2 className={`text-2xl font-extrabold ${currentRule.color}`}>
                  {currentRule.label}
                </h2>
                <p className="text-xs text-white/40 mt-1">Tap all matching numbers and submit</p>
              </div>

              {/* 3x3 Grid of numbers */}
              <div className="grid grid-cols-3 gap-3">
                {gridNumbers.map((num) => {
                  const isSelected = selectedNumbers.includes(num);
                  const isTarget = currentRule.predicate(num);

                  let cellStyle = 'bg-[#12151D] border-white/10 text-white hover:border-white/30';
                  if (isSelected && !isEvaluated) {
                    cellStyle = 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/50';
                  } else if (isEvaluated) {
                    if (isTarget && isSelected) {
                      cellStyle = 'bg-emerald-500/25 border-emerald-500 text-emerald-300';
                    } else if (!isTarget && isSelected) {
                      cellStyle = 'bg-rose-500/25 border-rose-500 text-rose-300';
                    } else if (isTarget && !isSelected) {
                      cellStyle = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400/70 border-dashed';
                    } else {
                      cellStyle = 'bg-[#12151D]/40 border-white/5 text-white/20';
                    }
                  }

                  return (
                    <button
                      key={num}
                      disabled={isEvaluated}
                      onClick={() => toggleSelect(num)}
                      className={`h-20 rounded-2xl border font-black text-2xl flex items-center justify-center transition shadow-md relative ${cellStyle}`}
                    >
                      <span>{num}</span>
                      {isEvaluated && isTarget && (
                        <Check className="w-4 h-4 text-emerald-400 absolute top-2 right-2" />
                      )}
                      {isEvaluated && !isTarget && isSelected && (
                        <X className="w-4 h-4 text-rose-400 absolute top-2 right-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Submit Button */}
              <button
                disabled={isEvaluated || selectedNumbers.length === 0}
                onClick={handleSubmit}
                className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black disabled:opacity-30 disabled:cursor-not-allowed transition shadow-lg"
              >
                Submit Selection ({selectedNumbers.length})
              </button>
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
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Set Shifting Complete!</h2>
                <p className="text-sm text-white/60">Executive Function & Flexibility Metrics</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Score</div>
                  <div className="text-2xl font-bold text-amber-400">{score}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Perfect Rounds</div>
                  <div className="text-2xl font-bold text-emerald-400">{correctRounds} / 6</div>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={handleStart}
                  className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
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

export default RuleSwitchGame;
