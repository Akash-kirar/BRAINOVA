import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, Trophy, RotateCcw, Target, Sparkles } from 'lucide-react';
import GameMenu from './GameMenu';

interface RoundResult {
  target: number;
  stoppedAt: number;
  errorMs: number;
  points: number;
}

export default function StopAtRightTimeGame({ onBack, onGameComplete }: { onBack: () => void; onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void }) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'complete'>('menu');
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const rounds = [3.00, 5.00, 6.50, 8.00]; // Targets in seconds
  const [roundIdx, setRoundIdx] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [currentResult, setCurrentResult] = useState<RoundResult | null>(null);

  const startTimestampRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  const target = rounds[roundIdx] || 5.00;
  // Blind phase begins halfway through the target
  const blindThreshold = target * 0.55;

  const updateTimer = () => {
    const now = performance.now();
    const currElapsed = (now - startTimestampRef.current) / 1000;
    setElapsed(currElapsed);
    animFrameRef.current = requestAnimationFrame(updateTimer);
  };

  const startRound = () => {
    setIsRunning(true);
    setCurrentResult(null);
    setElapsed(0);
    startTimestampRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(updateTimer);
  };

  const stopTimer = () => {
    if (!isRunning) return;
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    const finalElapsed = (performance.now() - startTimestampRef.current) / 1000;
    setIsRunning(false);
    setElapsed(finalElapsed);

    const errorMs = Math.round(Math.abs(finalElapsed - target) * 1000);
    
    // Points based on precision:
    // <= 30ms: 100 pts (PERFECT)
    // <= 100ms: 80 pts
    // <= 250ms: 60 pts
    // <= 500ms: 40 pts
    // > 500ms: max(10, 30 - Math.floor(errorMs / 50))
    let points = 10;
    if (errorMs <= 30) points = 100;
    else if (errorMs <= 100) points = 80;
    else if (errorMs <= 250) points = 60;
    else if (errorMs <= 500) points = 40;
    else points = Math.max(5, 30 - Math.floor((errorMs - 500) / 100));

    const result: RoundResult = {
      target,
      stoppedAt: finalElapsed,
      errorMs,
      points
    };

    setCurrentResult(result);
    setResults(prev => [...prev, result]);
  };

  const nextRound = () => {
    if (roundIdx < rounds.length - 1) {
      setRoundIdx(r => r + 1);
      setCurrentResult(null);
      setElapsed(0);
    } else {
      // Completed all rounds
      const totalScore = [...results, currentResult!].reduce((sum, r) => sum + (r?.points || 0), 0);
      const avgError = Math.round([...results, currentResult!].reduce((sum, r) => sum + (r?.errorMs || 0), 0) / rounds.length);
      const accuracy = Math.max(0, Math.min(100, Math.round(100 - avgError / 10)));

      setGameState('complete');
      if (onGameComplete) {
        onGameComplete(totalScore, rounds.length, accuracy);
      }
    }
  };

  const startGame = () => {
    setGameState('playing');
    setRoundIdx(0);
    setResults([]);
    setCurrentResult(null);
    setElapsed(0);
    setIsRunning(false);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const totalScore = results.reduce((sum, r) => sum + r.points, 0) + (currentResult ? currentResult.points : 0);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] text-white select-none overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#0e131f] border-b border-white/5 shrink-0">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white/80" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <span className="font-bold text-base tracking-tight">Stop at the Right Time</span>
        </div>

        <div className="w-10" />
      </div>

      {/* Main Body */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* MENU SCREEN */}
          {gameState === 'menu' && (
            <GameMenu
              title="Stop at the Right Time"
              description="Test your internal clock and precision timing. Stop the counter at the exact target second as the timer blinds out!"
              icon={<Clock className="w-14 h-14 text-purple-400" />}
              iconBgColor="bg-purple-500/20"
              iconColor="text-purple-400"
              showDifficulty={false}
              onStart={startGame}
              onBack={onBack}
            />
          )}

          {/* ACTIVE PLAYING SCREEN */}
          {gameState === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex flex-col items-center flex-1 justify-between py-4"
            >
              {/* Header stats */}
              <div className="flex items-center justify-between w-full px-2">
                <span className="text-xs font-bold text-white/50 uppercase tracking-wider">
                  ROUND {roundIdx + 1} / {rounds.length}
                </span>
                <span className="text-xs font-bold text-purple-400 font-mono">
                  SCORE: {totalScore} PTS
                </span>
              </div>

              {/* Target Banner */}
              <div className="text-center">
                <span className="text-xs text-white/50 block font-bold uppercase tracking-wider mb-1">
                  TARGET TIME
                </span>
                <span className="text-4xl font-black text-purple-400 font-mono tracking-tight">
                  {target.toFixed(2)}s
                </span>
              </div>

              {/* Circular / Box Timer Dial */}
              <div className="relative w-64 h-64 rounded-full border-4 border-white/10 bg-[#121824] flex flex-col items-center justify-center shadow-2xl overflow-hidden">
                {/* Visual pulse glow when running */}
                {isRunning && (
                  <div className="absolute inset-0 bg-purple-500/10 animate-pulse" />
                )}

                {/* Counter text */}
                {!isRunning && !currentResult && (
                  <span className="text-sm font-bold text-white/60">Press START below</span>
                )}

                {isRunning && (
                  <div className="text-center z-10">
                    {elapsed < blindThreshold ? (
                      <span className="text-5xl font-black font-mono tracking-tight text-white">
                        {elapsed.toFixed(2)}s
                      </span>
                    ) : (
                      <div className="flex flex-col items-center">
                        <span className="text-5xl font-black font-mono tracking-wider text-purple-400 animate-pulse">
                          ??.??s
                        </span>
                        <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-1">
                          TRUST YOUR RHYTHM!
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {currentResult && (
                  <div className="text-center z-10 space-y-1">
                    <span className="text-4xl font-black font-mono text-white">
                      {currentResult.stoppedAt.toFixed(3)}s
                    </span>
                    <div className="text-xs font-bold text-purple-400">
                      Error: ±{currentResult.errorMs} ms
                    </div>
                    <div className="text-sm font-black text-emerald-400">
                      +{currentResult.points} PTS
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="w-full space-y-3">
                {!isRunning && !currentResult && (
                  <button
                    onClick={startRound}
                    className="w-full py-4 rounded-2xl bg-[#00D68F] hover:bg-[#05b378] text-black font-extrabold text-sm shadow-[0_0_20px_rgba(0,214,143,0.3)] transition-transform active:scale-95 cursor-pointer uppercase tracking-wider"
                  >
                    Start Stopwatch
                  </button>
                )}

                {isRunning && (
                  <button
                    onClick={stopTimer}
                    className="w-full py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-sm shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-transform active:scale-95 cursor-pointer uppercase tracking-wider"
                  >
                    STOP NOW!
                  </button>
                )}

                {currentResult && (
                  <button
                    onClick={nextRound}
                    className="w-full py-4 rounded-2xl bg-purple-500 hover:bg-purple-600 text-white font-extrabold text-sm shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-transform active:scale-95 cursor-pointer uppercase tracking-wider"
                  >
                    {roundIdx < rounds.length - 1 ? 'Next Target →' : 'See Final Results 🏆'}
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* GAME COMPLETE SCREEN */}
          {gameState === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#121824] border border-white/10 rounded-3xl p-6 text-center max-w-sm w-full space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mx-auto text-purple-400">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-xl font-black text-white">Timing Challenge Complete!</h2>
                <p className="text-xs text-white/50">Your internal cognitive clock performance</p>
              </div>

              <div className="bg-[#182133] rounded-2xl p-4 grid grid-cols-2 gap-2 border border-white/5">
                <div>
                  <span className="text-[10px] text-white/40 block mb-0.5">FINAL SCORE</span>
                  <span className="text-2xl font-black text-purple-400 font-mono">{totalScore}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 block mb-0.5">AVG PRECISION</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">
                    ±{Math.round(results.reduce((a, b) => a + b.errorMs, 0) / results.length)}ms
                  </span>
                </div>
              </div>

              <div className="bg-[#0e1420] rounded-xl p-3 border border-white/5 space-y-1 text-xs">
                {results.map((r, i) => (
                  <div key={i} className="flex justify-between items-center text-white/70 py-0.5">
                    <span>Target {r.target.toFixed(2)}s:</span>
                    <span className="font-mono font-bold text-white">
                      {r.stoppedAt.toFixed(2)}s (±{r.errorMs}ms)
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={onBack}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors"
                >
                  Exit
                </button>
                <button
                  onClick={startGame}
                  className="flex-1 py-3 rounded-xl bg-[#00D68F] hover:bg-[#05b378] text-black font-extrabold text-xs shadow-lg transition-transform active:scale-95"
                >
                  Play Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
