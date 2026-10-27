import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle, Trophy, RotateCcw, Sparkles, Check, X } from 'lucide-react';
import GameMenu from './GameMenu';

interface BestChoiceGameProps {
  onBack: () => void;
  onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void;
}

interface DecisionScenario {
  situation: string;
  category: string;
  options: { text: string; isBest: boolean; reason: string }[];
}

const SCENARIOS: DecisionScenario[] = [
  {
    category: 'Time & Energy Management',
    situation: 'You have a high-stakes exam tomorrow morning at 8:00 AM, but at 11:00 PM you still have two full chapters unread.',
    options: [
      { text: 'Stay up all night until 6:00 AM cramming both chapters without sleep', isBest: false, reason: 'Severe sleep deprivation degrades memory retrieval, working memory, and exam execution.' },
      { text: 'Review high-yield summaries and key diagrams for 45 minutes, then get 7 hours of restorative sleep', isBest: true, reason: 'Rest consolidates learned memories and preserves peak cognitive focus and problem-solving speed.' },
      { text: 'Drink three energy drinks and scroll through social media to relax', isBest: false, reason: 'High stimulant spikes cause jitters and digital distraction burns valuable review time.' },
      { text: 'Skip the exam entirely because you are unprepared', isBest: false, reason: 'Guarantees failure rather than testing whatever baseline knowledge you currently possess.' }
    ]
  },
  {
    category: 'Workplace Communication',
    situation: 'You discover an unintentional calculation error in a spreadsheet report your colleague already submitted to leadership.',
    options: [
      { text: 'Privately contact your colleague immediately with the exact cell coordinates and a corrected version', isBest: true, reason: 'Respectful, collaborative, and allows the mistake to be corrected promptly with minimal friction.' },
      { text: 'Send a company-wide email exposing the mistake to showcase your superiority', isBest: false, reason: 'Damages professional relationships and team trust without adding constructive value.' },
      { text: 'Ignore the error completely because it is not your responsibility', isBest: false, reason: 'Allows misleading data to reach stakeholders, potentially harming company strategy.' },
      { text: 'Delete the spreadsheet file from the company shared drive secretly', isBest: false, reason: 'Destroys company data and escalates a minor mistake into an operational disruption.' }
    ]
  },
  {
    category: 'Financial Prudence',
    situation: 'You unexpectedly receive a $1,500 tax refund. You have $2,000 on a high-interest 24% credit card debt and want to buy a new gaming console.',
    options: [
      { text: 'Apply the full $1,500 toward paying down the 24% credit card balance', isBest: true, reason: 'Eliminating guaranteed 24% compound interest debt yields an unbeatable, guaranteed return on investment.' },
      { text: 'Spend the entire $1,500 on the gaming console and luxury accessories', isBest: false, reason: 'High-interest debt continues compounding rapidly, multiplying financial stress.' },
      { text: 'Gamble the $1,500 on volatile meme coins hoping to turn it into $10,000', isBest: false, reason: 'High risk of capital loss while high-interest liabilities remain unpaid.' },
      { text: 'Hide the cash under your mattress indefinitely', isBest: false, reason: 'Inflation erodes cash value while 24% APR card debt continues growing.' }
    ]
  },
  {
    category: 'Digital Security',
    situation: 'You receive an urgent SMS claiming to be your bank: "Your account is frozen! Click this link bit.ly/bank-unlock immediately to verify your identity."',
    options: [
      { text: 'Do not click the link; open the official bank app or call the verified number on the back of your debit card', isBest: true, reason: 'Avoids phishing credential theft and verifies legitimate security alerts through verified channels.' },
      { text: 'Click the link and quickly type your card number, PIN, and Social Security Number', isBest: false, reason: 'Directly hands your full financial identity over to malicious phishing scammers.' },
      { text: 'Forward the message to all your family members to warn them to click it too', isBest: false, reason: 'Spreads dangerous phishing vectors to your personal contacts.' },
      { text: 'Reply to the SMS with your online banking password asking if it is real', isBest: false, reason: 'Never transmit authentication credentials over unverified SMS threads.' }
    ]
  },
  {
    category: 'Health & Crisis Triage',
    situation: 'While hiking a wilderness trail with a friend, they suffer a severe bee sting and begin experiencing facial swelling, wheezing, and shortness of breath.',
    options: [
      { text: 'Administer their prescribed epinephrine auto-injector (EpiPen) immediately and call emergency rescue', isBest: true, reason: 'Anaphylaxis is an immediate life-threatening airway obstruction requiring rapid epinephrine intervention.' },
      { text: 'Advise them to walk briskly for 3 miles to "walk it off"', isBest: false, reason: 'Physical exertion accelerates circulatory collapse during severe allergic reactions.' },
      { text: 'Offer them a cup of hot herbal tea and wait 2 hours to see if it clears up', isBest: false, reason: 'Severe airway swelling closes the throat within minutes if untreated.' },
      { text: 'Take photos and post to social media asking for advice', isBest: false, reason: 'Wastes vital emergency response seconds during an acute medical crisis.' }
    ]
  }
];

export const BestChoiceGame: React.FC<BestChoiceGameProps> = ({
  onBack,
  onGameComplete
}) => {
  const [gameState, setGameState] = useState<'menu' | 'game' | 'results'>('menu');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentScenario = SCENARIOS[currentIndex % SCENARIOS.length];

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

    const isCorrect = currentScenario.options[idx].isBest;
    if (isCorrect) {
      setScore(prev => prev + 30);
      setTotalCorrect(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 >= SCENARIOS.length) {
        const finalScore = score + (isCorrect ? 30 : 0);
        const finalCorrect = totalCorrect + (isCorrect ? 1 : 0);
        const acc = Math.round((finalCorrect / SCENARIOS.length) * 100);
        setGameState('results');
        onGameComplete?.(finalScore, SCENARIOS.length, acc);
      } else {
        setCurrentIndex(prev => prev + 1);
        setSelectedIdx(null);
        setIsAnswered(false);
      }
    }, 2200);
  };

  return (
    <div className="w-full min-h-screen bg-[#090B0F] text-white flex flex-col items-center p-4">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <GameMenu
              title="Best Choice"
              description="Analyze real-world situations, evaluate trade-offs, and identify the optimal decision according to critical thinking and consequence modeling."
              icon={<CheckCircle className="w-14 h-14 text-emerald-400" />}
              iconBgColor="bg-emerald-500/20"
              iconColor="text-emerald-400"
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
                  Scenario {currentIndex + 1} / {SCENARIOS.length}
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{score} pts</span>
                </div>
              </div>

              {/* Scenario Display Card */}
              <div className="bg-[#12151D] border border-emerald-500/30 rounded-2xl p-6 shadow-lg relative overflow-hidden">
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase tracking-wider mb-3 inline-block">
                  {currentScenario.category}
                </span>
                <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                  {currentScenario.situation}
                </p>
              </div>

              {/* 4 Decision Options */}
              <div className="flex flex-col gap-3">
                {currentScenario.options.map((opt, idx) => {
                  let btnStyle = 'bg-[#12151D] border-white/10 text-white hover:border-emerald-500/40 hover:bg-white/5';
                  if (isAnswered) {
                    if (opt.isBest) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200';
                    } else if (idx === selectedIdx) {
                      btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200';
                    } else {
                      btnStyle = 'bg-[#12151D]/40 border-white/5 text-white/30';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelect(idx)}
                      className={`p-4 rounded-xl border text-left font-medium text-sm sm:text-base transition-all flex items-start gap-3 shadow ${btnStyle}`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isAnswered && opt.isBest ? (
                          <Check className="w-5 h-5 text-emerald-400" />
                        ) : isAnswered && idx === selectedIdx && !opt.isBest ? (
                          <X className="w-5 h-5 text-rose-400" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center text-xs text-white/60">
                            {String.fromCharCode(65 + idx)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div>{opt.text}</div>
                        {isAnswered && (idx === selectedIdx || opt.isBest) && (
                          <div className={`mt-1.5 text-xs ${opt.isBest ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {opt.reason}
                          </div>
                        )}
                      </div>
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
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Decision Analysis Complete!</h2>
                <p className="text-sm text-white/60">Strategic Judgment & Consequence Modeling</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Score</div>
                  <div className="text-2xl font-bold text-emerald-400">{score}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xs text-white/50">Optimal Decisions</div>
                  <div className="text-2xl font-bold text-emerald-400">{totalCorrect} / {SCENARIOS.length}</div>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={handleStart}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
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

export default BestChoiceGame;
