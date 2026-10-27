import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, BookOpen, Trophy, RotateCcw, Check, X, Sparkles } from 'lucide-react';
import GameMenu from './GameMenu';

interface SynonymChallengeGameProps {
  onBack: () => void;
  onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void;
}

interface Question {
  word: string;
  options: string[];
  correct: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  definition: string;
}

const QUESTIONS: Question[] = [
  // Easy
  { word: 'RAPID', options: ['Quick', 'Heavy', 'Silent', 'Dull'], correct: 'Quick', difficulty: 'Easy', definition: 'Rapid means moving or happening with great speed.' },
  { word: 'GIGANTIC', options: ['Huge', 'Miniature', 'Faint', 'Soft'], correct: 'Huge', difficulty: 'Easy', definition: 'Gigantic means of very great size or extent.' },
  { word: 'COURAGEOUS', options: ['Brave', 'Timid', 'Angry', 'Cautious'], correct: 'Brave', difficulty: 'Easy', definition: 'Courageous means possessing or displaying bravery.' },
  { word: 'START', options: ['Begin', 'Finish', 'Delay', 'Pause'], correct: 'Begin', difficulty: 'Easy', definition: 'Start means to embark on or begin an action.' },
  { word: 'WEALTHY', options: ['Rich', 'Poor', 'Generous', 'Frugal'], correct: 'Rich', difficulty: 'Easy', definition: 'Wealthy means having a large amount of money or resources.' },
  
  // Medium
  { word: 'LUMINOUS', options: ['Radiant', 'Opaque', 'Dim', 'Bleak'], correct: 'Radiant', difficulty: 'Medium', definition: 'Luminous means emitting or reflecting bright light.' },
  { word: 'PRAGMATIC', options: ['Practical', 'Impulsive', 'Theoretical', 'Foolish'], correct: 'Practical', difficulty: 'Medium', definition: 'Pragmatic means dealing with matters realistically and practically.' },
  { word: 'RESILIENT', options: ['Durable', 'Fragile', 'Rigid', 'Weak'], correct: 'Durable', difficulty: 'Medium', definition: 'Resilient means able to withstand or recover quickly from difficult conditions.' },
  { word: 'TRANQUIL', options: ['Serene', 'Chaotic', 'Rowdy', 'Harsh'], correct: 'Serene', difficulty: 'Medium', definition: 'Tranquil means free from disturbance; calm and quiet.' },
  { word: 'AUTHENTIC', options: ['Genuine', 'Counterfeit', 'Dubious', 'Synthetic'], correct: 'Genuine', difficulty: 'Medium', definition: 'Authentic means undisputed origin; genuine and real.' },

  // Hard
  { word: 'METICULOUS', options: ['Diligent', 'Careless', 'Hastened', 'Vague'], correct: 'Diligent', difficulty: 'Hard', definition: 'Meticulous means showing great attention to detail; very careful and precise.' },
  { word: 'EPHEMERAL', options: ['Fleeting', 'Eternal', 'Enduring', 'Substantial'], correct: 'Fleeting', difficulty: 'Hard', definition: 'Ephemeral means lasting for a very short time; transient.' },
  { word: 'SAGACIOUS', options: ['Wise', 'Foolhardy', 'Naive', 'Deceptive'], correct: 'Wise', difficulty: 'Hard', definition: 'Sagacious means having or showing keen mental discernment and good judgment.' },
  { word: 'PERSPICACIOUS', options: ['Insightful', 'Obtuse', 'Gullible', 'Careless'], correct: 'Insightful', difficulty: 'Hard', definition: 'Perspicacious means having ready insight into and understanding of things.' },
  { word: 'UBIQUITOUS', options: ['Omnipresent', 'Rare', 'Secluded', 'Deficient'], correct: 'Omnipresent', difficulty: 'Hard', definition: 'Ubiquitous means present, appearing, or found everywhere.' }
];

export const SynonymChallengeGame: React.FC<SynonymChallengeGameProps> = ({
  onBack,
  onGameComplete
}) => {
  const [gameState, setGameState] = useState<'menu' | 'game' | 'results'>('menu');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);

  const currentQ = QUESTIONS[currentIndex % QUESTIONS.length];

  const handleStart = () => {
    setGameState('game');
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTotalCorrect(0);
  };

  const handleAnswer = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === currentQ.correct;
    if (isCorrect) {
      const difficultyMultiplier = currentQ.difficulty === 'Hard' ? 30 : currentQ.difficulty === 'Medium' ? 20 : 10;
      const streakBonus = streak * 5;
      const points = difficultyMultiplier + streakBonus;
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setTotalCorrect(prev => prev + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentIndex + 1 >= 10) {
        // Complete game after 10 questions
        const finalScore = score + (isCorrect ? (currentQ.difficulty === 'Hard' ? 30 : 20) : 0);
        const finalCorrect = totalCorrect + (isCorrect ? 1 : 0);
        const acc = Math.round((finalCorrect / 10) * 100);
        setGameState('results');
        onGameComplete?.(finalScore, 10, acc);
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
              title="Synonym Challenge"
              description="Identify words with matching meanings across Easy, Medium, and Hard vocabulary tiers."
              icon={<BookOpen className="w-14 h-14 text-indigo-400" />}
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
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${
                    currentQ.difficulty === 'Hard'
                      ? 'border-red-500/30 text-red-400 bg-red-500/10'
                      : currentQ.difficulty === 'Medium'
                      ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10'
                      : 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                  }`}>
                    {currentQ.difficulty}
                  </span>
                  <span className="text-sm font-semibold text-white/60">
                    Round {currentIndex + 1} / 10
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{score} pts</span>
                </div>
              </div>

              {/* Word Display Card */}
              <div className="bg-[#12151D] border border-white/10 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />
                <p className="text-xs font-semibold tracking-wider uppercase text-indigo-400 mb-2">Find the closest synonym for</p>
                <h2 className="text-4xl font-extrabold tracking-wide text-white mb-2">{currentQ.word}</h2>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map(option => {
                  let btnStyle = 'bg-[#12151D] border-white/10 text-white hover:border-indigo-500/50 hover:bg-white/5';
                  if (isAnswered) {
                    if (option === currentQ.correct) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
                    } else if (option === selectedAnswer) {
                      btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                    } else {
                      btnStyle = 'bg-[#12151D]/50 border-white/5 text-white/30';
                    }
                  }

                  return (
                    <button
                      key={option}
                      disabled={isAnswered}
                      onClick={() => handleAnswer(option)}
                      className={`p-4 rounded-xl border font-semibold text-lg transition-all flex items-center justify-between shadow-sm ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswered && option === currentQ.correct && (
                        <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {isAnswered && option === selectedAnswer && option !== currentQ.correct && (
                        <X className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Note after answer */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-indigo-950/30 border border-indigo-500/20 rounded-xl p-3 text-xs text-indigo-300 text-center"
                >
                  <span className="font-bold text-white">{currentQ.correct}</span>: {currentQ.definition}
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
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Challenge Completed!</h2>
                <p className="text-sm text-white/60">Vocabulary Assessment Complete</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Score</div>
                  <div className="text-2xl font-bold text-indigo-400">{score}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Accuracy</div>
                  <div className="text-2xl font-bold text-emerald-400">{Math.round((totalCorrect / 10) * 100)}%</div>
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

export default SynonymChallengeGame;
