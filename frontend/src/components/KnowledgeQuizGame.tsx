import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, BookOpen, Trophy, Sparkles, Check, X } from 'lucide-react';
import GameMenu from './GameMenu';

interface QuizQuestion {
  question: string;
  category: string;
  options: string[];
  answer: string;
  explanation: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    category: 'Science',
    question: 'Which subatomic particle carries a negative electric charge?',
    options: ['Proton', 'Neutron', 'Electron', 'Photon'],
    answer: 'Electron',
    explanation: 'Electrons have a negative charge of -1e, while protons have +1e and neutrons are neutral.'
  },
  {
    category: 'Astronomy',
    question: 'Which planet in our solar system has the highest number of confirmed moons?',
    options: ['Jupiter', 'Saturn', 'Mars', 'Neptune'],
    answer: 'Saturn',
    explanation: 'Saturn has over 140 confirmed natural satellites, currently surpassing Jupiter.'
  },
  {
    category: 'Technology',
    question: 'What does "CPU" stand for in computing architectures?',
    options: ['Central Processing Unit', 'Core Programming Utility', 'Central Performance User', 'Control Protocol Unit'],
    answer: 'Central Processing Unit',
    explanation: 'The CPU (Central Processing Unit) acts as the primary computational processor of a computer.'
  },
  {
    category: 'Geography',
    question: 'What is the largest desert on Earth by total surface area?',
    options: ['Sahara Desert', 'Gobi Desert', 'Antarctic Desert', 'Arabian Desert'],
    answer: 'Antarctic Desert',
    explanation: 'Antarctica is classified as a polar desert and is the largest desert in the world at ~14.2 million km².'
  },
  {
    category: 'Nature',
    question: 'Which gas is most abundant in Earth\'s atmosphere?',
    options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Argon'],
    answer: 'Nitrogen',
    explanation: 'Nitrogen makes up approximately 78% of Earth\'s atmosphere, followed by oxygen at ~21%.'
  }
];

export default function KnowledgeQuizGame({ onBack, onGameComplete }: { onBack: () => void; onGameComplete?: (score: number, maxLevel: number) => void }) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [qIdx, setQIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const q = QUESTIONS[qIdx];

  const startGame = () => {
    setGameState('playing');
    setQIdx(0);
    setScore(0);
    setSelectedOpt(null);
  };

  const handleSelect = (opt: string) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(opt);

    const isCorrect = opt === q.answer;
    if (isCorrect) {
      setScore(s => s + 30);
    }

    setTimeout(() => {
      if (qIdx < QUESTIONS.length - 1) {
        setQIdx(i => i + 1);
        setSelectedOpt(null);
      } else {
        setGameState('gameover');
        if (onGameComplete) onGameComplete(isCorrect ? score + 30 : score, QUESTIONS.length);
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] text-white select-none overflow-hidden font-sans">
      <div className="flex items-center justify-between px-6 py-4 bg-[#0e131f] border-b border-white/5 shrink-0">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5 text-white/80" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-purple-400" />
          </div>
          <span className="font-bold text-base tracking-tight">Knowledge Quiz</span>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Knowledge Quiz"
              description="Test your general knowledge across science, geography, space, and modern technology."
              icon={<BookOpen className="w-14 h-14 text-purple-400" />}
              iconBgColor="bg-purple-500/20"
              iconColor="text-purple-400"
              showDifficulty={false}
              onStart={startGame}
              onBack={onBack}
            />
          )}

          {gameState === 'playing' && (
            <motion.div key="playing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full flex flex-col items-center flex-1 justify-between py-4">
              <div className="flex items-center justify-between w-full px-2">
                <span className="text-xs font-bold text-white/40 uppercase tracking-wider">QUESTION {qIdx + 1} / {QUESTIONS.length}</span>
                <span className="text-xs font-bold text-purple-400 font-mono">SCORE: {score}</span>
              </div>

              {/* Question Card */}
              <div className="w-full p-6 bg-[#121824] border border-white/10 rounded-3xl shadow-xl my-auto text-center space-y-3">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-bold uppercase tracking-wider">
                  {q.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                  {q.question}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2.5 w-full my-auto">
                {q.options.map((opt, i) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrect = opt === q.answer;

                  let style = 'bg-[#151c2c] border-white/10 hover:border-purple-500/40 text-white/90';
                  if (selectedOpt !== null) {
                    if (isCorrect) style = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
                    else if (isSelected) style = 'bg-rose-500/20 border-rose-500 text-rose-300';
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(opt)}
                      disabled={selectedOpt !== null}
                      className={`p-4 rounded-2xl border text-sm font-bold text-left transition-all active:scale-95 cursor-pointer flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {selectedOpt !== null && isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                      {selectedOpt !== null && isSelected && !isCorrect && <X className="w-4 h-4 text-rose-400" />}
                    </button>
                  );
                })}
              </div>

              {selectedOpt && (
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/70 w-full text-center">
                  💡 {q.explanation}
                </div>
              )}
            </motion.div>
          )}

          {gameState === 'gameover' && (
            <motion.div key="gameover" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#121824] border border-white/10 rounded-3xl p-6 text-center max-w-sm w-full space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mx-auto text-purple-400">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Quiz Completed!</h2>
                <p className="text-xs text-white/50">Broad spectrum trivia mastery demonstrated.</p>
              </div>
              <div className="bg-[#182133] rounded-2xl p-4 border border-white/5 text-center">
                <span className="text-[10px] text-white/40 block mb-0.5">FINAL SCORE</span>
                <span className="text-3xl font-black text-purple-400 font-mono">{score}</span>
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
