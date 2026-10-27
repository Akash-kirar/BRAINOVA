import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Zap, Trophy, RotateCcw, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';
import GameMenu from './GameMenu';

type TapState = 'idle' | 'waiting' | 'ready' | 'too_early' | 'round_result' | 'game_complete';

interface SpeedTapGameProps {
  onBack: () => void;
  onGameComplete?: (score: number, maxLevel: number, accuracy?: number) => void;
}

export default function SpeedTapGame({ onBack, onGameComplete }: SpeedTapGameProps) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'complete'>('menu');
  const [tapState, setTapState] = useState<TapState>('idle');
  
  const [currentRound, setCurrentRound] = useState(1);
  const totalRounds = 5;
  const [times, setTimes] = useState<number[]>([]);
  const [lastTime, setLastTime] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const startRound = useCallback(() => {
    cleanup();
    setTapState('waiting');
    setLastTime(null);

    // Random delay between 1.5s and 4.5s
    const delay = 1500 + Math.random() * 3000;

    timerRef.current = setTimeout(() => {
      startTimeRef.current = performance.now();
      setTapState('ready');
    }, delay);
  }, [cleanup]);

  const startGame = () => {
    setGameState('playing');
    setCurrentRound(1);
    setTimes([]);
    setLastTime(null);
    startRound();
  };

  const handlePadClick = () => {
    if (tapState === 'waiting') {
      // Early tap penalty!
      cleanup();
      setTapState('too_early');
    } else if (tapState === 'ready') {
      const reactionTime = Math.round(performance.now() - startTimeRef.current);
      setLastTime(reactionTime);
      const updatedTimes = [...times, reactionTime];
      setTimes(updatedTimes);

      if (currentRound < totalRounds) {
        setTapState('round_result');
      } else {
        // Game complete
        const avg = Math.round(updatedTimes.reduce((a, b) => a + b, 0) / updatedTimes.length);
        const score = Math.max(50, Math.round((500 - avg) * 2.5));
        setGameState('complete');
        setTapState('game_complete');
        if (onGameComplete) {
          onGameComplete(score, totalRounds, Math.min(100, Math.round((400 / avg) * 100)));
        }
      }
    }
  };

  const nextRound = () => {
    setCurrentRound(r => r + 1);
    startRound();
  };

  const averageTime = times.length > 0 
    ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) 
    : 0;

  const bestTime = times.length > 0 ? Math.min(...times) : 0;

  const getRank = (ms: number) => {
    if (ms <= 200) return { title: 'Godlike Reflexes', color: 'text-purple-400' };
    if (ms <= 250) return { title: 'Superhuman Speed', color: 'text-emerald-400' };
    if (ms <= 300) return { title: 'Sharp Reflexes', color: 'text-blue-400' };
    if (ms <= 380) return { title: 'Average Human', color: 'text-amber-400' };
    return { title: 'Needs Warming Up', color: 'text-rose-400' };
  };

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
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <span className="font-bold text-base tracking-tight">Speed Tap</span>
        </div>

        <div className="w-10" />
      </div>

      {/* Main Body */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* MENU SCREEN */}
          {gameState === 'menu' && (
            <GameMenu
              title="Speed Tap"
              description="Test your reaction speed down to the millisecond. Wait for the signal and tap as fast as humanly possible!"
              icon={<Zap className="w-14 h-14 text-amber-400" />}
              iconBgColor="bg-amber-500/20"
              iconColor="text-amber-400"
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
              className="w-full flex flex-col items-center flex-1 justify-between py-6"
            >
              {/* Round Progress Tracker */}
              <div className="flex items-center justify-between w-full px-4 mb-4">
                <span className="text-xs font-bold text-white/50 uppercase tracking-wider">
                  ROUND {currentRound} / {totalRounds}
                </span>
                {bestTime > 0 && (
                  <span className="text-xs font-bold text-amber-400 font-mono">
                    BEST: {bestTime}ms
                  </span>
                )}
              </div>

              {/* Central Reaction Sensor Pad */}
              <div
                onClick={handlePadClick}
                className={`w-full max-w-[340px] aspect-square rounded-3xl border flex flex-col items-center justify-center p-6 cursor-pointer transition-all shadow-2xl relative overflow-hidden select-none active:scale-[0.98] ${
                  tapState === 'waiting'
                    ? 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                    : tapState === 'ready'
                    ? 'bg-emerald-500 border-emerald-400 text-black shadow-[0_0_50px_rgba(0,214,143,0.6)] animate-pulse'
                    : tapState === 'too_early'
                    ? 'bg-amber-950/40 border-amber-500/30 text-amber-300'
                    : 'bg-[#121824] border-white/10 text-white'
                }`}
              >
                {tapState === 'waiting' && (
                  <>
                    <div className="w-4 h-4 rounded-full bg-rose-500 animate-ping mb-4" />
                    <span className="text-2xl font-black tracking-wider uppercase mb-1">WAIT FOR GREEN...</span>
                    <span className="text-xs opacity-60 text-center">Do not tap yet or penalty triggers!</span>
                  </>
                )}

                {tapState === 'ready' && (
                  <>
                    <Zap className="w-16 h-16 fill-black mb-2 animate-bounce" />
                    <span className="text-4xl font-black tracking-tight uppercase">TAP NOW!</span>
                  </>
                )}

                {tapState === 'too_early' && (
                  <>
                    <AlertTriangle className="w-12 h-12 text-amber-400 mb-2" />
                    <span className="text-2xl font-black text-amber-400 mb-1">TOO EARLY!</span>
                    <span className="text-xs text-white/60 text-center mb-4">You tapped before the green signal.</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startRound();
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-500 text-black font-extrabold text-xs cursor-pointer shadow-lg"
                    >
                      Try Again
                    </button>
                  </>
                )}

                {tapState === 'round_result' && (
                  <>
                    <span className="text-xs text-white/50 font-bold uppercase tracking-wider mb-1">Reaction Time</span>
                    <span className="text-5xl font-black text-emerald-400 font-mono mb-2">{lastTime} ms</span>
                    <span className={`text-xs font-bold mb-5 ${getRank(lastTime || 0).color}`}>
                      {getRank(lastTime || 0).title}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextRound();
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#00D68F] hover:bg-[#05b378] text-black font-extrabold text-xs cursor-pointer shadow-lg active:scale-95 transition-transform"
                    >
                      Next Round →
                    </button>
                  </>
                )}
              </div>

              {/* Bottom History Pills */}
              <div className="flex gap-2 mt-6">
                {Array.from({ length: totalRounds }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-8 px-2.5 rounded-lg border text-xs font-bold font-mono flex items-center justify-center ${
                      times[idx]
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                        : idx === currentRound - 1
                        ? 'bg-white/10 border-white/20 text-white'
                        : 'bg-white/5 border-white/5 text-white/20'
                    }`}
                  >
                    {times[idx] ? `${times[idx]}ms` : `#${idx + 1}`}
                  </div>
                ))}
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
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-xl font-black text-white">Reaction Test Complete!</h2>
                <p className={`text-sm font-bold mt-1 ${getRank(averageTime).color}`}>
                  {getRank(averageTime).title}
                </p>
              </div>

              <div className="bg-[#182133] rounded-2xl p-4 grid grid-cols-2 gap-2 border border-white/5">
                <div>
                  <span className="text-[10px] text-white/40 block mb-0.5">AVERAGE SPEED</span>
                  <span className="text-2xl font-black text-amber-400 font-mono">{averageTime} ms</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 block mb-0.5">FASTEST TAP</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">{bestTime} ms</span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="bg-[#0e1420] rounded-xl p-3 border border-white/5 space-y-1">
                <span className="text-[10px] text-white/40 uppercase font-bold block mb-1">Round Breakdown</span>
                <div className="grid grid-cols-5 gap-1 text-xs font-mono font-bold">
                  {times.map((t, i) => (
                    <div key={i} className="bg-white/5 py-1 rounded text-white/80">{t}ms</div>
                  ))}
                </div>
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
                  Test Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
