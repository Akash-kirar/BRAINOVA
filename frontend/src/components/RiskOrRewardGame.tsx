import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Shield, Flame, Trophy, RotateCcw, Sparkles, Check, X, Scale } from 'lucide-react';
import GameMenu from './GameMenu';

interface RiskOrRewardGameProps {
  onBack: () => void;
  onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void;
}

interface RoundScenario {
  title: string;
  safeReward: number;
  riskyReward: number;
  riskySuccessRate: number; // percentage display
  riskySucceeds: boolean; // predefined fair outcome
  lore: string;
}

const ROUNDS: RoundScenario[] = [
  {
    title: 'Round 1: Low-Stake Scout',
    safeReward: 20,
    riskyReward: 50,
    riskySuccessRate: 75,
    riskySucceeds: true,
    lore: 'A scout detects two supply crates on the perimeter.'
  },
  {
    title: 'Round 2: Foggy Valley',
    safeReward: 25,
    riskyReward: 70,
    riskySuccessRate: 60,
    riskySucceeds: true,
    lore: 'Navigate a clear highway or risk a shortcut through the mist.'
  },
  {
    title: 'Round 3: Volatile Rift',
    safeReward: 30,
    riskyReward: 85,
    riskySuccessRate: 50,
    riskySucceeds: false, // realistic risk failure
    lore: 'Extract stable crystals or attempt harvesting unstable plasma.'
  },
  {
    title: 'Round 4: Orbital Probe',
    safeReward: 25,
    riskyReward: 80,
    riskySuccessRate: 65,
    riskySucceeds: true,
    lore: 'Transmit data via standard relay or attempt satellite burst.'
  },
  {
    title: 'Round 5: Asteroid Surge',
    safeReward: 30,
    riskyReward: 100,
    riskySuccessRate: 45,
    riskySucceeds: false, // risk failure
    lore: 'Mine outer rim debris or enter dense asteroid core.'
  },
  {
    title: 'Round 6: Quantum Core',
    safeReward: 35,
    riskyReward: 95,
    riskySuccessRate: 60,
    riskySucceeds: true,
    lore: 'Standard coolant injection vs supercharged reaction.'
  },
  {
    title: 'Round 7: Nebula Crossing',
    safeReward: 40,
    riskyReward: 120,
    riskySuccessRate: 50,
    riskySucceeds: true,
    lore: 'Follow marked trade beacons or plunge through the ionized storm.'
  },
  {
    title: 'Round 8: Final Apex',
    safeReward: 50,
    riskyReward: 150,
    riskySuccessRate: 40,
    riskySucceeds: false, // final temptation risk
    lore: 'Secure existing findings or risk it all for double discovery.'
  }
];

export const RiskOrRewardGame: React.FC<RiskOrRewardGameProps> = ({
  onBack,
  onGameComplete
}) => {
  const [gameState, setGameState] = useState<'menu' | 'game' | 'results'>('menu');
  const [roundIdx, setRoundIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [riskyChoicesCount, setRiskyChoicesCount] = useState(0);
  const [safeChoicesCount, setSafeChoicesCount] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<'safe' | 'risky' | null>(null);
  const [isResolved, setIsResolved] = useState(false);
  const [outcomeMessage, setOutcomeMessage] = useState('');

  const currentRound = ROUNDS[roundIdx % ROUNDS.length];

  const handleStart = () => {
    setGameState('game');
    setRoundIdx(0);
    setScore(0);
    setRiskyChoicesCount(0);
    setSafeChoicesCount(0);
    setSelectedChoice(null);
    setIsResolved(false);
    setOutcomeMessage('');
  };

  const handleChoose = (choice: 'safe' | 'risky') => {
    if (isResolved) return;
    setSelectedChoice(choice);
    setIsResolved(true);

    let roundGain = 0;
    if (choice === 'safe') {
      roundGain = currentRound.safeReward;
      setSafeChoicesCount(prev => prev + 1);
      setOutcomeMessage(`Guaranteed +${roundGain} points secured!`);
    } else {
      setRiskyChoicesCount(prev => prev + 1);
      if (currentRound.riskySucceeds) {
        roundGain = currentRound.riskyReward;
        setOutcomeMessage(`HIGH RISK PAID OFF! +${roundGain} points!`);
      } else {
        roundGain = 0;
        setOutcomeMessage('RISK FAILED! 0 points awarded this round.');
      }
    }

    setScore(prev => prev + roundGain);

    setTimeout(() => {
      if (roundIdx + 1 >= ROUNDS.length) {
        const finalScore = score + roundGain;
        setGameState('results');
        onGameComplete?.(finalScore, ROUNDS.length, 100);
      } else {
        setRoundIdx(prev => prev + 1);
        setSelectedChoice(null);
        setIsResolved(false);
        setOutcomeMessage('');
      }
    }, 2000);
  };

  const riskArchetype = riskyChoicesCount >= 5
    ? 'High-Risk Pioneer'
    : riskyChoicesCount >= 3
    ? 'Calculated Strategist'
    : 'Prudent Guardian';

  return (
    <div className="w-full min-h-screen bg-[#090B0F] text-white flex flex-col items-center p-4">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Risk or Reward"
              description="Balance guaranteed security against high-upside volatility. Test risk tolerance, expected value calculations, and decision under uncertainty."
              icon={<Scale className="w-14 h-14 text-orange-400" />}
              iconBgColor="bg-orange-500/20"
              iconColor="text-orange-400"
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
                  {currentRound.title} ({roundIdx + 1}/{ROUNDS.length})
                </div>
                <div className="flex items-center gap-1.5 text-orange-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{score} pts</span>
                </div>
              </div>

              {/* Scenario Context Card */}
              <div className="bg-[#12151D] border border-orange-500/30 rounded-2xl p-6 text-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 pointer-events-none" />
                <p className="text-xs uppercase tracking-wider text-orange-400 font-bold mb-2">Decision Dilemma</p>
                <h3 className="text-xl font-bold text-white mb-2">{currentRound.lore}</h3>
                <p className="text-xs text-white/50">Choose between guaranteed return or volatile higher yield</p>
              </div>

              {/* 2 Choices: Safe vs Risky */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Safe Option */}
                <button
                  disabled={isResolved}
                  onClick={() => handleChoose('safe')}
                  className={`p-6 rounded-2xl border transition-all text-left flex flex-col justify-between shadow-xl relative ${
                    isResolved
                      ? selectedChoice === 'safe'
                        ? 'bg-blue-500/25 border-blue-400 text-blue-200 ring-2 ring-blue-400'
                        : 'bg-[#12151D]/40 border-white/5 opacity-30'
                      : 'bg-[#12151D] border-blue-500/40 hover:border-blue-400 hover:bg-blue-500/10 active:scale-98'
                  }`}
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">Guaranteed Vault</h4>
                    <p className="text-xs text-white/60 mb-4">100% certainty, zero risk of loss.</p>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs uppercase text-blue-400 font-bold">Reward</span>
                    <span className="text-2xl font-black text-blue-300">+{currentRound.safeReward} pts</span>
                  </div>
                </button>

                {/* Risky Option */}
                <button
                  disabled={isResolved}
                  onClick={() => handleChoose('risky')}
                  className={`p-6 rounded-2xl border transition-all text-left flex flex-col justify-between shadow-xl relative ${
                    isResolved
                      ? selectedChoice === 'risky'
                        ? currentRound.riskySucceeds
                          ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400'
                          : 'bg-rose-500/25 border-rose-400 text-rose-200 ring-2 ring-rose-400'
                        : 'bg-[#12151D]/40 border-white/5 opacity-30'
                      : 'bg-[#12151D] border-orange-500/40 hover:border-orange-400 hover:bg-orange-500/10 active:scale-98'
                  }`}
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-3">
                      <Flame className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-lg font-bold text-white">High Yield Venture</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 font-bold">
                        {currentRound.riskySuccessRate}% Win Rate
                      </span>
                    </div>
                    <p className="text-xs text-white/60 mb-4">Higher reward, but chance of yielding 0.</p>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs uppercase text-orange-400 font-bold">Max Reward</span>
                    <span className="text-2xl font-black text-orange-300">+{currentRound.riskyReward} pts</span>
                  </div>
                </button>
              </div>

              {/* Resolution Banner */}
              {isResolved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-xl border text-center font-bold text-sm ${
                    selectedChoice === 'safe' || currentRound.riskySucceeds
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-rose-500/20 border-rose-500 text-rose-300'
                  }`}
                >
                  {outcomeMessage}
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
              <div className="w-16 h-16 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-orange-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Risk Evaluation Complete!</h2>
                <p className="text-sm text-orange-400 font-semibold">Archetype: {riskArchetype}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 w-full">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Score</div>
                  <div className="text-xl font-bold text-orange-400">{score}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Safe Picks</div>
                  <div className="text-xl font-bold text-blue-400">{safeChoicesCount}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Risky Picks</div>
                  <div className="text-xl font-bold text-rose-400">{riskyChoicesCount}</div>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={handleStart}
                  className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
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

export default RiskOrRewardGame;
