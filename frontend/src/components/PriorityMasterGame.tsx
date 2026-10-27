import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, Trophy, RotateCcw, AlertCircle, Check, X } from 'lucide-react';
import GameMenu from './GameMenu';

interface PriorityScenario {
  scenario: string;
  options: string[];
  correct: string;
  explanation: string;
}

const SCENARIOS: PriorityScenario[] = [
  {
    scenario: 'You arrive at your home and notice smoke billowing under the kitchen door, your phone rings, the dog barks, and you have groceries in hand.',
    options: [
      'Answer the phone call immediately',
      'Put the groceries into the refrigerator',
      'Evacuate immediately and call emergency services',
      'Pet the barking dog to calm it'
    ],
    correct: 'Evacuate immediately and call emergency services',
    explanation: 'Life safety and immediate hazard mitigation always precede routine administrative or domestic tasks.'
  },
  {
    scenario: 'You have a project due in 2 hours, an email from a newsletter, low phone battery (5%), and your boss asks for an urgent 1-minute status update.',
    options: [
      'Provide the urgent 1-minute status update to your boss',
      'Read the newsletter email',
      'Browse social media while charging your phone',
      'Re-organize your desktop folders'
    ],
    correct: 'Provide the urgent 1-minute status update to your boss',
    explanation: 'Quick blockers that enable organizational workflow take immediate precedence over non-urgent reading.'
  },
  {
    scenario: 'Before operating heavy machinery or driving on a long highway trip, you feel extreme drowsiness, your favorite podcast is starting, and the gas tank is full.',
    options: [
      'Drink an energy drink and speed up',
      'Pull over safely or rest before operating the vehicle',
      'Turn the podcast volume up to stay awake',
      'Check your navigation app while moving'
    ],
    correct: 'Pull over safely or rest before operating the vehicle',
    explanation: 'Preventative risk management eliminates catastrophic accidents before they can occur.'
  }
];

export default function PriorityMasterGame({ onBack, onGameComplete }: { onBack: () => void; onGameComplete?: (score: number, maxLevel: number) => void }) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [idx, setIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const scenario = SCENARIOS[idx];

  const startGame = () => {
    setGameState('playing');
    setIdx(0);
    setScore(0);
    setSelectedOpt(null);
  };

  const handleSelect = (opt: string) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(opt);

    const isCorrect = opt === scenario.correct;
    if (isCorrect) setScore(s => s + 40);

    setTimeout(() => {
      if (idx < SCENARIOS.length - 1) {
        setIdx(i => i + 1);
        setSelectedOpt(null);
      } else {
        setGameState('gameover');
        if (onGameComplete) onGameComplete(isCorrect ? score + 40 : score, SCENARIOS.length);
      }
    }, 1300);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] text-white select-none overflow-hidden font-sans">
      <div className="flex items-center justify-between px-6 py-4 bg-[#0e131f] border-b border-white/5 shrink-0">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5 text-white/80" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="font-bold text-base tracking-tight">Priority Master</span>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Priority Master"
              description="Analyze high-stakes situations and determine which action must be executed first according to executive triage principles."
              icon={<CheckCircle2 className="w-14 h-14 text-emerald-400" />}
              iconBgColor="bg-emerald-500/20"
              iconColor="text-emerald-400"
              showDifficulty={false}
              onStart={startGame}
              onBack={onBack}
            />
          )}

          {gameState === 'playing' && (
            <motion.div key="playing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full flex flex-col items-center flex-1 justify-between py-2">
              <div className="flex items-center justify-between w-full px-2">
                <span className="text-xs font-bold text-white/40 uppercase">CASE {idx + 1} / {SCENARIOS.length}</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">SCORE: {score}</span>
              </div>

              {/* Scenario Box */}
              <div className="w-full p-6 bg-[#121824] border border-white/10 rounded-3xl my-auto text-center space-y-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
                  Executive Triage
                </span>
                <p className="text-sm font-semibold text-white/90 leading-relaxed">
                  {scenario.scenario}
                </p>
                <div className="text-xs font-bold text-emerald-400 pt-1">
                  Which action takes highest immediate priority?
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2.5 w-full my-auto">
                {scenario.options.map((opt, i) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrect = opt === scenario.correct;

                  let style = 'bg-[#151c2c] border-white/10 hover:border-emerald-500/40 text-white/90';
                  if (selectedOpt !== null) {
                    if (isCorrect) style = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
                    else if (isSelected) style = 'bg-rose-500/20 border-rose-500 text-rose-300';
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(opt)}
                      disabled={selectedOpt !== null}
                      className={`p-3.5 rounded-2xl border text-xs font-bold text-left transition-all active:scale-95 cursor-pointer flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {selectedOpt !== null && isCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                      {selectedOpt !== null && isSelected && !isCorrect && <X className="w-4 h-4 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {selectedOpt && (
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/80 w-full text-center">
                  💡 {scenario.explanation}
                </div>
              )}
            </motion.div>
          )}

          {gameState === 'gameover' && (
            <motion.div key="gameover" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#121824] border border-white/10 rounded-3xl p-6 text-center max-w-sm w-full space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Triage Assessment Completed!</h2>
                <p className="text-xs text-white/50">Executive prioritization rating recorded.</p>
              </div>
              <div className="bg-[#182133] rounded-2xl p-4 border border-white/5 text-center">
                <span className="text-[10px] text-white/40 block mb-0.5">FINAL SCORE</span>
                <span className="text-3xl font-black text-emerald-400 font-mono">{score}</span>
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
