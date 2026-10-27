import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Brain, Check, X, HelpCircle, Clock, 
  RotateCcw, Sparkles, Lightbulb, ChevronRight, AlertTriangle, 
  ShieldAlert, UserCheck, UserX, Eye, BookOpen, Trophy
} from 'lucide-react';
import GameMenu from './GameMenu';

export type TruthGameMode = 'who_is_lying' | 'truth_chain' | 'contradiction_hunter' | 'logical_verdict' | 'master_investigation';
export type TruthDifficulty = 'easy' | 'medium' | 'hard' | 'expert' | 'master';

interface TruthScenario {
  id: string;
  mode: TruthGameMode;
  difficulty: TruthDifficulty;
  title: string;
  context: string;
  prompt: string;
  statements: {
    id: string;
    speaker?: string;
    avatar?: string;
    text: string;
    isTruth?: boolean;
    isContradictionPair?: boolean;
  }[];
  options?: string[];
  correctAnswer: any; // string, string[], or Record<string, boolean>
  hint: string;
  explanation: string;
}

const TRUTH_SCENARIOS: TruthScenario[] = [
  // MODE 1: WHO IS LYING (Easy)
  {
    id: 'wil_easy',
    mode: 'who_is_lying',
    difficulty: 'easy',
    title: 'The Stolen Data Chip',
    context: 'A prototype chip disappeared from the lab. Exactly ONE of the three technicians is lying.',
    prompt: 'Analyze their testimonies and identify the single liar.',
    statements: [
      { id: 'tech_a', speaker: 'Leo', avatar: '👨‍💻', text: 'Marcus is lying about his whereabouts.' },
      { id: 'tech_b', speaker: 'Marcus', avatar: '🧑‍🔬', text: 'I was in the server room all afternoon.' },
      { id: 'tech_c', speaker: 'Tara', avatar: '👩‍💼', text: 'Leo is telling the absolute truth.' }
    ],
    options: ['Leo', 'Marcus', 'Tara'],
    correctAnswer: 'Marcus',
    hint: 'Notice that Tara validates Leo. If Leo is lying, Tara would also be lying (meaning two liars). But there is strictly only one liar!',
    explanation: 'Since exactly one person is lying, Tara and Leo cannot be lying because if Leo were lying, Tara\'s claim ("Leo is telling the truth") would also be a lie—producing two liars. Therefore, Leo and Tara must both be truthful. This leaves Marcus as the sole liar, confirming Leo\'s testimony.'
  },
  // MODE 1: WHO IS LYING (Medium)
  {
    id: 'wil_med',
    mode: 'who_is_lying',
    difficulty: 'medium',
    title: 'The Vault Alarm Incident',
    context: 'Four guards were on duty when the silent alarm triggered. Exactly TWO guards are telling the truth, and TWO are lying.',
    prompt: 'Determine which guards are lying.',
    statements: [
      { id: 'guard_1', speaker: 'Jax', avatar: '👮‍♂️', text: 'Neither Cole nor Dane was near the vault.' },
      { id: 'guard_2', speaker: 'Cole', avatar: '👮', text: 'Dane is lying.' },
      { id: 'guard_3', speaker: 'Dane', avatar: '🕵️', text: 'Bryn was stationed inside the control room.' },
      { id: 'guard_4', speaker: 'Bryn', avatar: '👮‍♀️', text: 'I was never in the control room; Dane is fabricating.' }
    ],
    options: ['Jax & Cole', 'Cole & Bryn', 'Jax & Dane', 'Dane & Bryn'],
    correctAnswer: 'Jax & Dane',
    hint: 'Look at Dane and Bryn: Dane says Bryn was in the control room, Bryn says she was never there. They directly contradict each other! Exactly one of them must be lying and one telling the truth.',
    explanation: 'Dane and Bryn make mutually exclusive claims ("Bryn was in control room" vs "I was never in control room"), meaning exactly one of {Dane, Bryn} is truthful and one is a liar. That accounts for 1 truth and 1 lie. For the remaining two guards {Jax, Cole}, one must be truthful and one a liar. Since Cole says "Dane is lying" and Dane is indeed lying (as verified when Jax\'s blanket statement fails), Jax and Dane are the two liars.'
  },
  // MODE 2: TRUTH CHAIN (Knights and Knaves)
  {
    id: 'tc_hard',
    mode: 'truth_chain',
    difficulty: 'hard',
    title: 'The Island of Knights & Knaves',
    context: 'On a cyber island, Knights always tell the truth and Knaves always lie. You meet three inhabitants: A, B, and C.',
    prompt: 'Identify the exact identity of all three inhabitants.',
    statements: [
      { id: 'tc_a', speaker: 'Inhabitant A', avatar: '🤖', text: 'B is a Knave.' },
      { id: 'tc_b', speaker: 'Inhabitant B', avatar: '👾', text: 'A and C are of the same type.' },
      { id: 'tc_c', speaker: 'Inhabitant C', avatar: '👽', text: 'At least one of us is a Knight.' }
    ],
    options: [
      'A: Knight, B: Knave, C: Knight',
      'A: Knave, B: Knight, C: Knave',
      'A: Knight, B: Knave, C: Knave',
      'All are Knaves'
    ],
    correctAnswer: 'A: Knight, B: Knave, C: Knight',
    hint: 'Consider Inhabitant C: If C were a Knave, his statement ("At least one of us is a Knight") would have to be false, meaning NONE are Knights. But that would mean C told a lie that matches reality! Can a Knave say "at least one is a Knight"?',
    explanation: 'Could C be a Knave? If C is a Knave, then "at least one of us is a Knight" must be false, meaning none are Knights (all are Knaves). But if C is a Knave, his statement being false is consistent only if no Knights exist. However, if C is a Knight, his statement is true. Now consider A: If A is a Knight, B is a Knave. If B is a Knave, B\'s claim ("A and C are same type") must be false. Since A is a Knight, C must also be a Knight (so A and C are both Knights, which makes B\'s claim false). Everything holds with zero contradictions!'
  },
  // MODE 3: CONTRADICTION HUNTER
  {
    id: 'ch_med',
    mode: 'contradiction_hunter',
    difficulty: 'medium',
    title: 'The AI Log Anomaly',
    context: 'Security telemetry recorded six timestamped events during a network breach. Two statements are strictly logically incompatible.',
    prompt: 'Select the TWO statements that cannot both be true at the same time.',
    statements: [
      { id: 'stmt_1', text: '1. Firewall perimeter was completely breached at 03:14 AM.', isContradictionPair: false },
      { id: 'stmt_2', text: '2. All outgoing encrypted traffic requires an active satellite handshake.', isContradictionPair: true },
      { id: 'stmt_3', text: '3. Backup servers initiated automatic mirroring at 03:20 AM.', isContradictionPair: false },
      { id: 'stmt_4', text: '4. Satellite communications were severed at 02:50 AM and remained offline all night.', isContradictionPair: true },
      { id: 'stmt_5', text: '5. Over 500GB of encrypted data was transmitted outside the facility at 03:30 AM.', isContradictionPair: true },
      { id: 'stmt_6', text: '6. Ground personnel detected no physical intrusion at any entry point.', isContradictionPair: false }
    ],
    options: ['Statement 2 & 4 & 5', 'Statement 1 & 6', 'Statement 3 & 4', 'Statement 1 & 5'],
    correctAnswer: 'Statement 2 & 4 & 5', // Pair 2 and 4+5
    hint: 'Check statements mentioning satellite communications and outgoing encrypted traffic.',
    explanation: 'Statement 2 states all outgoing encrypted traffic requires satellite handshake. Statement 4 states satellite communications were totally offline at 02:50 AM. Yet Statement 5 claims encrypted data was transmitted outbound at 03:30 AM without satellite link. They cannot both be true simultaneously.'
  },
  // MODE 4: LOGICAL VERDICT (Deductive Syllogism)
  {
    id: 'lv_hard',
    mode: 'logical_verdict',
    difficulty: 'hard',
    title: 'The Quantum Syndicate Verdict',
    context: 'The following three premises are established as irrefutable facts:\n1. All certified neural engineers understand quantum tensor calculus.\n2. No researcher who understands quantum tensor calculus publishes flawed cryptosystems.\n3. Dr. Aris published a flawed cryptosystem yesterday.',
    prompt: 'Which of the following conclusions is LOGICALLY GUARANTEED to be true?',
    statements: [
      { id: 'prem_1', text: 'Premise 1: All certified neural engineers understand quantum tensor calculus.' },
      { id: 'prem_2', text: 'Premise 2: No researcher who understands quantum tensor calculus publishes flawed cryptosystems.' },
      { id: 'prem_3', text: 'Premise 3: Dr. Aris published a flawed cryptosystem yesterday.' }
    ],
    options: [
      'Dr. Aris is not a certified neural engineer.',
      'Dr. Aris will have his credentials revoked.',
      'The cryptosystem was sabotaged by an outsider.',
      'Quantum tensor calculus is flawed.'
    ],
    correctAnswer: 'Dr. Aris is not a certified neural engineer.',
    hint: 'Apply Modus Tollens: If A implies B, and B implies Not C, then C implies Not A.',
    explanation: 'By Premise 1, Neural Engineer -> Understands Calculus. By Premise 2, Understands Calculus -> Does NOT publish flawed cryptosystems. Therefore, Neural Engineer -> Does NOT publish flawed cryptosystems. By Modus Tollens: Since Dr. Aris DID publish a flawed cryptosystem, Dr. Aris CANNOT be a certified neural engineer. This conclusion is 100% deductively valid.'
  },
  // MODE 5: MASTER INVESTIGATION (Expert/Master)
  {
    id: 'mi_expert',
    mode: 'master_investigation',
    difficulty: 'master',
    title: 'The High Council Inquest',
    context: 'Five council members are questioned regarding a classified leak. Some are corrupt (always lie), others are loyal (always tell truth).',
    prompt: 'Unmask the exact allegiance (Truth vs Lie) of all five members.',
    statements: [
      { id: 'm_1', speaker: 'Vance', avatar: '🧙‍♂️', text: 'Lyra is lying.' },
      { id: 'm_2', speaker: 'Lyra', avatar: '🧝‍♀️', text: 'Both Kael and Soren are loyal truth-tellers.' },
      { id: 'm_3', speaker: 'Kael', avatar: '🧛‍♂️', text: 'Vance and Mira have opposite allegiances (one lies, one truths).' },
      { id: 'm_4', speaker: 'Mira', avatar: '👸', text: 'Soren is corrupt and always lies.' },
      { id: 'm_5', speaker: 'Soren', avatar: '🥷', text: 'At least three of us are loyal truth-tellers.' }
    ],
    options: [
      'Vance: Truth, Lyra: Lie, Kael: Truth, Mira: Truth, Soren: Lie',
      'Vance: Lie, Lyra: Truth, Kael: Truth, Mira: Lie, Soren: Truth',
      'Vance: Truth, Lyra: Lie, Kael: Lie, Mira: Truth, Soren: Lie',
      'All are corrupt'
    ],
    correctAnswer: 'Vance: Truth, Lyra: Lie, Kael: Truth, Mira: Truth, Soren: Lie',
    hint: 'If Lyra is telling the truth, both Kael and Soren are loyal. But Mira says Soren lies, so Mira and Soren would be in conflict. Test the hypothesis that Vance is telling the truth (so Lyra is lying).',
    explanation: 'If Vance tells the truth, Lyra lies. If Lyra lies, the conjunction "Kael AND Soren are both loyal" is false. If Soren is lying, his statement ("At least 3 are loyal") is false, meaning at most 2 are loyal. If Mira tells the truth ("Soren lies"), that gives Vance, Mira, and Kael as truth-tellers, which confirms Kael\'s statement that Vance and Mira have different allegiances... wait: Vance (Truth) and Mira (Truth) would have SAME allegiance, making Kael lie! Thus: Vance=Truth, Lyra=Lie, Kael=Lie, Mira=Truth, Soren=Lie. Only 2 are loyal {Vance, Mira}, perfectly consistent with Soren lying!'
  }
];

// Correct Master Investigation answer in DB
TRUTH_SCENARIOS[4].options = [
  'Vance: Truth, Lyra: Lie, Kael: Lie, Mira: Truth, Soren: Lie',
  'Vance: Lie, Lyra: Truth, Kael: Truth, Mira: Lie, Soren: Truth',
  'Vance: Truth, Lyra: Truth, Kael: Truth, Mira: Lie, Soren: Lie',
  'All 5 members are corrupt liars'
];
TRUTH_SCENARIOS[4].correctAnswer = 'Vance: Truth, Lyra: Lie, Kael: Lie, Mira: Truth, Soren: Lie';

export default function TruthOrTrapGame({ onBack, onGameComplete }: { onBack: () => void; onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void }) {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'solved' | 'failed'>('menu');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // Interactive tags for statements: [stmtId]: 'truth' | 'lie' | null
  const [statementTags, setStatementTags] = useState<Record<string, 'truth' | 'lie' | null>>({});
  
  // Highlighted statements for deep focus
  const [highlightedStmts, setHighlightedStmts] = useState<Record<string, boolean>>({});

  // Timer & Score
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const scenario = TRUTH_SCENARIOS[activeScenarioIdx];

  const startInvestigation = (scenarioIdx: number = 0) => {
    setActiveScenarioIdx(scenarioIdx);
    setGameState('playing');
    setSelectedOption(null);
    setStatementTags({});
    setHighlightedStmts({});
    setHintsUsed(0);
    setShowHint(false);
    setShowExplanation(false);
    setFeedbackMsg(null);
    setSecondsLeft(150);
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('failed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  // Toggle Truth / Lie tag on a statement
  const cycleStatementTag = (id: string) => {
    setStatementTags(prev => {
      const current = prev[id];
      if (!current) return { ...prev, [id]: 'truth' };
      if (current === 'truth') return { ...prev, [id]: 'lie' };
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  // Toggle highlight
  const toggleHighlight = (id: string) => {
    setHighlightedStmts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Submit Answer
  const handleAnswerSubmit = () => {
    if (!selectedOption) {
      setFeedbackMsg({ type: 'error', text: 'Select your conclusion before submitting.' });
      return;
    }

    if (selectedOption === scenario.correctAnswer) {
      const basePoints = 150 + (activeScenarioIdx + 1) * 30;
      const timeBonus = Math.floor(secondsLeft * 0.4);
      const hintCost = hintsUsed * 20;
      const finalScore = Math.max(50, basePoints + timeBonus - hintCost);

      setScore(s => s + finalScore);
      setGameState('solved');

      if (onGameComplete) {
        onGameComplete(finalScore, activeScenarioIdx + 1, 100);
      }
    } else {
      setFeedbackMsg({
        type: 'error',
        text: 'Logical fallacy! Your conclusion produces a contradiction. Examine the statements carefully.'
      });
    }
  };

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="flex flex-col h-full bg-[#090B0F] text-white font-sans overflow-hidden select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0c111c] border-b border-white/10 shrink-0">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-transform active:scale-90"
        >
          <ArrowLeft className="w-5 h-5 text-white/80" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
            <Brain className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight">Truth or Trap</h1>
            <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">
              {scenario.difficulty.toUpperCase()} • {scenario.mode.replace(/_/g, ' ').toUpperCase()}
            </span>
          </div>
        </div>

        {gameState === 'playing' ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold">
            <Clock className={`w-3.5 h-3.5 ${secondsLeft <= 30 ? 'text-rose-400 animate-pulse' : 'text-blue-400'}`} />
            <span className={secondsLeft <= 30 ? 'text-rose-400' : 'text-white'}>{formatTime(secondsLeft)}</span>
          </div>
        ) : (
          <div className="w-9" />
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* MENU SCREEN */}
          {gameState === 'menu' && (
            <GameMenu
              title="Truth or Trap"
              description="Investigate complex statements, uncover liars, spot fatal contradictions, and deduce mathematically consistent truths."
              icon={<ShieldAlert className="w-14 h-14 text-blue-400" />}
              iconBgColor="bg-blue-500/20"
              iconColor="text-blue-400"
              showDifficulty={false}
              onStart={() => startInvestigation(0)}
              onBack={onBack}
            />
          )}

          {/* ACTIVE PLAYING SCREEN */}
          {gameState === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 pb-12"
            >
              {/* Mission Case File */}
              <div className="bg-gradient-to-br from-[#11192e] to-[#0c1221] border border-blue-500/25 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 uppercase tracking-wider">
                    Inquest #{activeScenarioIdx + 1} of {TRUTH_SCENARIOS.length}
                  </span>
                  <span className="text-[10px] text-white/50">Mode: {scenario.mode.replace(/_/g, ' ')}</span>
                </div>
                <h2 className="text-base font-black text-white mb-1">{scenario.title}</h2>
                <p className="text-xs text-white/70 leading-relaxed mb-2">{scenario.context}</p>
                <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs font-bold text-blue-300">
                  🎯 Objective: {scenario.prompt}
                </div>
              </div>

              {/* STATEMENTS CAROUSEL / LIST */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-white/70 uppercase tracking-wider">
                    Testimonies & Evidence
                  </span>
                  <span className="text-[10px] text-white/40">Tap badge to mark Truth/Lie</span>
                </div>

                {scenario.statements.map((stmt) => {
                  const tag = statementTags[stmt.id];
                  const isHighlighted = highlightedStmts[stmt.id];

                  return (
                    <div
                      key={stmt.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isHighlighted
                          ? 'bg-[#18233c] border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                          : 'bg-[#0e1422] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          {stmt.avatar && (
                            <span className="text-xl" role="img" aria-label="avatar">
                              {stmt.avatar}
                            </span>
                          )}
                          <span className="text-xs font-bold text-white tracking-wide">
                            {stmt.speaker || 'Statement'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* Tag Button (Truth / Lie / None) */}
                          <button
                            onClick={() => cycleStatementTag(stmt.id)}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors flex items-center gap-1 cursor-pointer ${
                              tag === 'truth'
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                                : tag === 'lie'
                                ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                                : 'bg-white/5 border-white/10 text-white/40 hover:text-white/70'
                            }`}
                            title="Click to toggle Truth / Lie hypothesis"
                          >
                            {tag === 'truth' && <Check className="w-2.5 h-2.5" />}
                            {tag === 'lie' && <X className="w-2.5 h-2.5" />}
                            <span>{tag ? tag.toUpperCase() : 'TAG'}</span>
                          </button>

                          {/* Focus Highlight Button */}
                          <button
                            onClick={() => toggleHighlight(stmt.id)}
                            className={`p-1 rounded-lg border text-xs transition-colors ${
                              isHighlighted
                                ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                                : 'bg-white/5 border-white/10 text-white/30 hover:text-white'
                            }`}
                            title="Highlight statement"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-white/90 leading-relaxed font-mono pl-1">
                        "{stmt.text}"
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* MULTIPLE CHOICE / CONCLUSION OPTIONS */}
              {scenario.options && (
                <div className="bg-[#0e1422] border border-white/10 rounded-2xl p-4 space-y-2">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    Select Your Verdict:
                  </h3>

                  <div className="grid grid-cols-1 gap-2">
                    {scenario.options.map((option, idx) => {
                      const isSelected = selectedOption === option;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedOption(option);
                            setFeedbackMsg(null);
                          }}
                          className={`p-3 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-blue-500/20 border-blue-400 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                              : 'bg-[#141b2b] border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          <span>{option}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-blue-400 bg-blue-500 text-black' : 'border-white/20'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Feedback messages */}
              {feedbackMsg && (
                <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                  feedbackMsg.type === 'error'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                }`}>
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{feedbackMsg.text}</span>
                </div>
              )}

              {/* Hint banner */}
              {showHint && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-2 text-amber-200 text-xs">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Investigator's Lead: </span>
                    <span>{scenario.hint}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowHint(true);
                    setHintsUsed(h => h + 1);
                  }}
                  disabled={showHint}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-40 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span>{showHint ? 'Hint Revealed' : 'Ask for Hint'}</span>
                </button>

                <button
                  onClick={handleAnswerSubmit}
                  className="flex-[2] py-3 px-4 rounded-xl bg-[#00D68F] hover:bg-[#05b378] text-black font-extrabold text-xs shadow-[0_0_20px_rgba(0,214,143,0.3)] flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Confirm Verdict</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* SOLVED SCREEN */}
          {gameState === 'solved' && (
            <motion.div
              key="solved"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0e1422] border border-emerald-500/30 rounded-2xl p-6 text-center shadow-2xl space-y-4 my-auto"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-xl font-black text-white mb-1">Deduction Verified!</h2>
                <p className="text-xs text-white/60">
                  Your reasoning was rigorous and completely free of contradiction.
                </p>
              </div>

              {/* Stats */}
              <div className="bg-[#141b2b] rounded-xl p-4 grid grid-cols-2 gap-2 border border-white/5 text-center">
                <div>
                  <span className="text-[10px] text-white/50 block mb-0.5">POINTS EARNED</span>
                  <span className="text-lg font-black text-emerald-400">+{score}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/50 block mb-0.5">TIME REMAINING</span>
                  <span className="text-lg font-black text-white">{formatTime(secondsLeft)}</span>
                </div>
              </div>

              {/* Formal Logic Explanation */}
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 font-bold flex items-center justify-between transition-colors"
              >
                <span>Read Complete Formal Logic Proof</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${showExplanation ? 'rotate-90' : ''}`} />
              </button>

              {showExplanation && (
                <div className="bg-[#0a0f18] p-4 rounded-xl text-left border border-white/10 text-xs text-white/80 leading-relaxed space-y-2">
                  <div className="font-bold text-emerald-400">Mathematical Proof:</div>
                  <p>{scenario.explanation}</p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setGameState('menu')}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors"
                >
                  Case Menu
                </button>
                <button
                  onClick={() => {
                    if (activeScenarioIdx < TRUTH_SCENARIOS.length - 1) {
                      startInvestigation(activeScenarioIdx + 1);
                    } else {
                      startInvestigation(0);
                    }
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#00D68F] hover:bg-[#05b378] text-black font-extrabold text-xs shadow-lg transition-transform active:scale-95"
                >
                  {activeScenarioIdx < TRUTH_SCENARIOS.length - 1 ? 'Next Inquest' : 'Replay All'}
                </button>
              </div>
            </motion.div>
          )}

          {/* FAILED SCREEN */}
          {gameState === 'failed' && (
            <motion.div
              key="failed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0e1422] border border-rose-500/30 rounded-2xl p-6 text-center shadow-2xl space-y-4 my-auto"
            >
              <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mx-auto text-rose-400">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-xl font-black text-white mb-1">Time Elapsed!</h2>
                <p className="text-xs text-white/60">
                  The witness testimonies could not be resolved in time. Try the case again.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={onBack}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => startInvestigation(activeScenarioIdx)}
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs shadow-lg transition-transform active:scale-95"
                >
                  Retry Case
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
