import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle, Trophy, Sparkles, Check, X } from 'lucide-react';
import GameMenu from './GameMenu';

interface Statement {
  text: string;
  isTrue: boolean;
  explanation: string;
}

const STATEMENTS: Statement[] = [
  {
    text: 'Light travels faster in water than in a vacuum.',
    isTrue: false,
    explanation: 'Light travels fastest in a vacuum (300,000 km/s). It slows down when passing through denser media like water.'
  },
  {
    text: 'The human brain comprises approximately 60% fat.',
    isTrue: true,
    explanation: 'The human brain is roughly 60% fat, making it the fattiest organ in the human body.'
  },
  {
    text: 'Sound waves can travel through empty outer space.',
    isTrue: false,
    explanation: 'Sound requires a physical medium (gas, liquid, or solid) to travel. A vacuum contains no particles to transmit sound.'
  },
  {
    text: 'Octopuses have three hearts.',
    isTrue: true,
    explanation: 'Octopuses have three hearts: two pump blood to the gills, while the third pumps it through the rest of the body.'
  },
  {
    text: 'Venus is the hottest planet in the Solar System.',
    isTrue: true,
    explanation: 'Despite Mercury being closer to the Sun, Venus has a thick carbon dioxide greenhouse atmosphere reaching ~465°C.'
  }
];

export default function TrueOrFalseGame({ onBack, onGameComplete }: { onBack: () => void; onGameComplete?: (score: number, maxLevel: number) => void }) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const stmt = STATEMENTS[idx];

  const startGame = () => {
    setGameState('playing');
    setIdx(0);
    setScore(0);
    setFeedback(null);
  };

  const handleAnswer = (choice: boolean) => {
    if (feedback !== null) return;
    const isCorrect = choice === stmt.isTrue;
    setFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setScore(s => s + 25);
    }

    setTimeout(() => {
      if (idx < STATEMENTS.length - 1) {
        setIdx(i => i + 1);
        setFeedback(null);
      } else {
        setGameState('gameover');
        if (onGameComplete) onGameComplete(isCorrect ? score + 25 : score, STATEMENTS.length);
      }
    }, 1100);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] text-white select-none overflow-hidden font-sans">
      <div className="flex items-center justify-between px-6 py-4 bg-[#0e131f] border-b border-white/5 shrink-0">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5 text-white/80" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="font-bold text-base tracking-tight">True or False</span>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="True or False"
              description="Rapidly verify scientific facts and global knowledge statements under pressure."
              icon={<CheckCircle className="w-14 h-14 text-emerald-400" />}
              iconBgColor="bg-emerald-500/20"
              iconColor="text-emerald-400"
              showDifficulty={false}
              onStart={startGame}
              onBack={onBack}
            />
          )}

          {gameState === 'playing' && (
            <motion.div key="playing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full flex flex-col items-center flex-1 justify-between py-4">
              <div className="flex items-center justify-between w-full px-2">
                <span className="text-xs font-bold text-white/40 uppercase tracking-wider">STATEMENT {idx + 1} / {STATEMENTS.length}</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">SCORE: {score}</span>
              </div>

              {/* Statement Display Box */}
              <div className={`w-full p-8 rounded-3xl border transition-all text-center my-auto flex flex-col items-center justify-center ${
                feedback === 'correct'
                  ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_20px_rgba(0,214,143,0.3)]'
                  : feedback === 'wrong'
                  ? 'bg-rose-500/20 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                  : 'bg-[#121824] border-white/10'
              }`}>
                <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                  "{stmt.text}"
                </p>
              </div>

              {/* True / False Buttons */}
              <div className="grid grid-cols-2 gap-4 w-full my-auto">
                <button
                  onClick={() => handleAnswer(true)}
                  disabled={feedback !== null}
                  className="h-20 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500 hover:bg-emerald-500 hover:text-black text-emerald-300 font-black text-xl transition-all active:scale-95 cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  <Check className="w-6 h-6 stroke-[3]" />
                  <span>TRUE</span>
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  disabled={feedback !== null}
                  className="h-20 rounded-2xl bg-rose-500/15 border-2 border-rose-500 hover:bg-rose-500 hover:text-white text-rose-300 font-black text-xl transition-all active:scale-95 cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  <X className="w-6 h-6 stroke-[3]" />
                  <span>FALSE</span>
                </button>
              </div>

              {feedback && (
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/80 w-full text-center">
                  💡 {stmt.explanation}
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
                <h2 className="text-xl font-black text-white">Fact Verification Complete!</h2>
                <p className="text-xs text-white/50">Scientific fact check score recorded.</p>
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
