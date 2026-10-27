import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Flame, 
  Gamepad2, 
  Brain, 
  Sparkles, 
  Check, 
  Trophy, 
  Target, 
  Zap, 
  Calendar, 
  Play, 
  ArrowRight, 
  Gift, 
  Layers, 
  Puzzle, 
  Calculator, 
  AlertCircle,
  Search,
  Eye,
  SlidersHorizontal
} from 'lucide-react';

export interface ChallengesPageProps {
  onBack: () => void;
  onPlay: (gameId: string) => void;
  sessions?: any[];
  stats?: {
    dailyStreak?: number;
    novaCoins?: number;
    totalXP?: number;
  };
  totalXP?: number;
  onOpenCategories?: () => void;
  onOpenAchievements?: () => void;
  onOpenPremium?: () => void;
}

type ChallengeFilter = 'all' | 'popular' | 'new' | 'daily' | 'focus-plan' | 'premium';

export function ChallengesPage({ 
  onBack, 
  onPlay, 
  sessions = [],
  stats = { dailyStreak: 7, novaCoins: 148, totalXP: 740 },
  totalXP = 740,
  onOpenCategories,
  onOpenAchievements,
}: ChallengesPageProps) {
  const [activeFilter, setActiveFilter] = useState<ChallengeFilter>('all');
  const [subView, setSubView] = useState<'hub' | 'focus-plan' | 'all-recommended'>('hub');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [countdown, setCountdown] = useState('24m 50s');

  // Slider State for the Bottom Sliding Deck
  const [sliderIndex, setSliderIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const touchStartRef = useRef<number>(0);
  const touchEndRef = useRef<number>(0);

  // Dynamic countdown in the 15m to 30m range with live seconds
  useEffect(() => {
    const key = 'brainova_challenge_timer_30m';
    const getChallengeExpiry = () => {
      const now = Date.now();
      const stored = localStorage.getItem(key);
      if (stored) {
        const exp = parseInt(stored, 10);
        const remaining = exp - now;
        // Keep within 15m to 30m window
        if (remaining > 0 && remaining <= 30 * 60 * 1000) {
          return exp;
        }
      }
      // Start a fresh ~25m countdown (between 15m and 30m)
      const newExpiry = now + (24 * 60 + 50) * 1000;
      localStorage.setItem(key, newExpiry.toString());
      return newExpiry;
    };

    let expiry = getChallengeExpiry();

    const updateCountdown = () => {
      const now = Date.now();
      let diffMs = expiry - now;
      if (diffMs <= 0) {
        // Reset to fresh 25m cycle
        expiry = now + (25 * 60) * 1000;
        localStorage.setItem(key, expiry.toString());
        diffMs = 25 * 60 * 1000;
      }
      const minutes = Math.floor(diffMs / 60000);
      const seconds = Math.floor((diffMs % 60000) / 1000);
      setCountdown(`${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute focus stats from sessions
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }, []);

  const todaySessions = useMemo(() => {
    return sessions.filter(s => (s.timestamp || 0) >= today);
  }, [sessions, today]);

  const focusScores = useMemo(() => {
    return todaySessions.filter(s => s.gameType === 'focus' || s.category === 'Focus & Attention').map(s => s.score || 0);
  }, [todaySessions]);

  const focusGamesCount = focusScores.length;
  const focusTimeMinutes = focusGamesCount * 2;
  const maxFocusScore = focusScores.length > 0 ? Math.max(...focusScores) : 0;

  const focusTimeProgress = Math.min(100, (focusTimeMinutes / 20) * 100);
  const gamesProgress = Math.min(100, (focusGamesCount / 3) * 100);
  const focusScoreProgress = Math.min(100, (maxFocusScore / 80) * 100);

  // Dynamic 7-Day Active Plan Tracking (Persisted in localStorage)
  const [activePlanDay, setActivePlanDay] = useState<number>(() => {
    const saved = localStorage.getItem('brainova_focus_plan_day');
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (parsed >= 1 && parsed <= 7) return parsed;
    }
    if (stats?.dailyStreak && stats.dailyStreak > 1) {
      return Math.min(7, (stats.dailyStreak % 7) || 7);
    }
    return 1;
  });

  const [completedPlanDays, setCompletedPlanDays] = useState<number[]>(() => {
    const saved = localStorage.getItem('brainova_focus_plan_completed_days');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    const days: number[] = [];
    for (let i = 1; i < activePlanDay; i++) {
      days.push(i);
    }
    return days;
  });

  // Goal completion calculations
  const isGoal1Done = focusTimeMinutes >= 20;
  const isGoal2Done = focusGamesCount >= 3;
  const isGoal3Done = maxFocusScore >= 80;
  const completedTodayGoalsCount = (isGoal1Done ? 1 : 0) + (isGoal2Done ? 1 : 0) + (isGoal3Done ? 1 : 0);

  // Dynamic percentage calculation (14% base per completed day + progress of current day)
  const planProgressPercent = useMemo(() => {
    const count = completedPlanDays.length;
    const base = (count / 7) * 100;
    const currentBonus = !completedPlanDays.includes(activePlanDay)
      ? (completedTodayGoalsCount / 3) * (100 / 7)
      : (100 / 7);
    return Math.min(100, Math.max(14, Math.round(base + currentBonus)));
  }, [completedPlanDays, activePlanDay, completedTodayGoalsCount]);

  const circleRadius = 14;
  const circleCircumference = 2 * Math.PI * circleRadius; // ~87.96
  const strokeDashoffset = circleCircumference - (planProgressPercent / 100) * circleCircumference;

  const advancePlanDay = () => {
    let updated = completedPlanDays;
    if (!completedPlanDays.includes(activePlanDay)) {
      updated = [...completedPlanDays, activePlanDay];
      setCompletedPlanDays(updated);
      localStorage.setItem('brainova_focus_plan_completed_days', JSON.stringify(updated));
    }
    const next = activePlanDay >= 7 ? 1 : activePlanDay + 1;
    if (activePlanDay >= 7) {
      // Cycle restart
      setCompletedPlanDays([]);
      localStorage.setItem('brainova_focus_plan_completed_days', JSON.stringify([]));
    }
    setActivePlanDay(next);
    localStorage.setItem('brainova_focus_plan_day', next.toString());
  };

  // Full Recommended Challenge Games Library (16 curated games)
  const allChallengeCards = [
    {
      id: 'memory-grid',
      gameId: 'memory-grid',
      title: 'Memory Grid',
      category: 'Memory',
      subtitle: 'Improve short term memory',
      badge: '🔥 Popular',
      badgeColor: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
      theme: 'purple',
      bgCard: 'bg-[#18112c]/90 border-purple-500/20 hover:border-purple-500/40',
      iconBg: 'bg-[#2d1b4e] border-purple-500/30 text-purple-300',
      buttonBg: 'bg-[#7c3aed] hover:bg-[#6d28d9] text-white',
      type: 'popular',
      icon: (
        <div className="grid grid-cols-3 gap-0.5 w-5 h-5 sm:w-6 sm:h-6">
          {[...Array(9)].map((_, i) => (
            <div 
              key={i} 
              className={`rounded-[1px] ${[1, 3, 4, 7].includes(i) ? 'bg-purple-300 shadow-[0_0_4px_#c084fc]' : 'bg-purple-300/20'}`} 
            />
          ))}
        </div>
      )
    },
    {
      id: 'focus-tap',
      gameId: 'focus-tap',
      title: 'Focus Tap',
      category: 'Focus',
      subtitle: 'Enhance target precision',
      badge: '⭐ New',
      badgeColor: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
      theme: 'emerald',
      bgCard: 'bg-[#0a1e17]/90 border-emerald-500/20 hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
      buttonBg: 'bg-[#00D68F] hover:bg-[#05b378] text-black font-bold shadow-[0_0_15px_rgba(0,214,143,0.3)]',
      type: 'new',
      icon: (
        <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-400/40 animate-ping opacity-30" />
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-emerald-400 flex items-center justify-center">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#00D68F]" />
          </div>
        </div>
      )
    },
    {
      id: 'color-match',
      gameId: 'color-match-focus',
      title: 'Color Match',
      category: 'Focus',
      subtitle: 'Train attention & quick thinking',
      badge: '🔥 Popular',
      badgeColor: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
      theme: 'blue',
      bgCard: 'bg-[#0c1a2e]/90 border-blue-500/20 hover:border-blue-500/40',
      iconBg: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
      buttonBg: 'bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold shadow-[0_0_15px_rgba(59,130,246,0.3)]',
      type: 'popular',
      icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
    },
    {
      id: 'speed-math',
      gameId: 'number-recall',
      title: 'Math Speed',
      category: 'Math',
      subtitle: 'Sharpen arithmetic under time',
      badge: '⚡ Fast',
      badgeColor: 'text-orange-400 bg-orange-500/15 border-orange-500/30',
      theme: 'orange',
      bgCard: 'bg-[#20150c]/90 border-orange-500/20 hover:border-orange-500/40',
      iconBg: 'bg-orange-500/15 border-orange-500/30 text-orange-400',
      buttonBg: 'bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold shadow-[0_0_15px_rgba(249,115,22,0.3)]',
      type: 'popular',
      icon: <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
    },
    {
      id: 'pattern-puzzle',
      gameId: 'pattern-logic',
      title: 'Pattern Logic',
      category: 'Logic',
      subtitle: 'Find sequential connections',
      badge: '⭐ New',
      badgeColor: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30',
      theme: 'cyan',
      bgCard: 'bg-[#081e26]/90 border-cyan-500/20 hover:border-cyan-500/40',
      iconBg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400',
      buttonBg: 'bg-[#06b6d4] hover:bg-[#0891b2] text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]',
      type: 'new',
      icon: <Puzzle className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
    },
    {
      id: 'card-match',
      gameId: 'card-match',
      title: 'Card Match',
      category: 'Memory',
      subtitle: 'Match identical card pairs',
      badge: '🔥 Popular',
      badgeColor: 'text-purple-400 bg-purple-500/15 border-purple-500/30',
      theme: 'indigo',
      bgCard: 'bg-[#15132c]/90 border-indigo-500/20 hover:border-indigo-500/40',
      iconBg: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400',
      buttonBg: 'bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold shadow-[0_0_15px_rgba(99,102,241,0.3)]',
      type: 'popular',
      icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" />
    },
    {
      id: 'odd-one-out',
      gameId: 'odd-one-out',
      title: 'Odd One Out',
      category: 'Focus',
      subtitle: 'Spot the anomaly quickly',
      badge: '⭐ New',
      badgeColor: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
      theme: 'amber',
      bgCard: 'bg-[#1f160a]/90 border-amber-500/20 hover:border-amber-500/40',
      iconBg: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
      buttonBg: 'bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)]',
      type: 'new',
      icon: <Target className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
    },
    {
      id: 'sudoku-lite',
      gameId: 'sudoku-lite',
      title: 'Sudoku Lite',
      category: 'Logic',
      subtitle: '4x4 grid deduction challenge',
      badge: '🧠 Logic',
      badgeColor: 'text-yellow-400 bg-yellow-500/15 border-yellow-500/30',
      theme: 'yellow',
      bgCard: 'bg-[#1e1b09]/90 border-yellow-500/20 hover:border-yellow-500/40',
      iconBg: 'bg-yellow-500/15 border-yellow-500/30 text-yellow-400',
      buttonBg: 'bg-[#eab308] hover:bg-[#ca8a04] text-black font-bold shadow-[0_0_15px_rgba(234,179,8,0.3)]',
      type: 'popular',
      icon: <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
    },
    {
      id: 'spot-difference',
      gameId: 'spot-difference',
      title: 'Spot Differences',
      category: 'Observation',
      subtitle: 'Find subtle visual anomalies',
      badge: '🔥 Popular',
      badgeColor: 'text-rose-400 bg-rose-500/15 border-rose-500/30',
      theme: 'rose',
      bgCard: 'bg-[#1f0d14]/90 border-rose-500/20 hover:border-rose-500/40',
      iconBg: 'bg-rose-500/15 border-rose-500/30 text-rose-400',
      buttonBg: 'bg-[#f43f5e] hover:bg-[#e11d48] text-white font-semibold shadow-[0_0_15px_rgba(244,63,94,0.3)]',
      type: 'popular',
      icon: <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400" />
    },
    {
      id: 'fast-recall',
      gameId: 'fast-recall',
      title: 'Fast Recall',
      category: 'Memory',
      subtitle: 'Quick working memory recall',
      badge: '⚡ Fast',
      badgeColor: 'text-teal-400 bg-teal-500/15 border-teal-500/30',
      theme: 'teal',
      bgCard: 'bg-[#081a17]/90 border-teal-500/20 hover:border-teal-500/40',
      iconBg: 'bg-teal-500/15 border-teal-500/30 text-teal-400',
      buttonBg: 'bg-[#14b8a6] hover:bg-[#0d9488] text-black font-bold shadow-[0_0_15px_rgba(20,184,166,0.3)]',
      type: 'popular',
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" />
    },
    {
      id: 'find-different-shape',
      gameId: 'find-different-shape',
      title: 'Unique Shape',
      category: 'Focus',
      subtitle: 'Spot unique geometry shapes',
      badge: '⭐ New',
      badgeColor: 'text-fuchsia-400 bg-fuchsia-500/15 border-fuchsia-500/30',
      theme: 'fuchsia',
      bgCard: 'bg-[#1c0c20]/90 border-fuchsia-500/20 hover:border-fuchsia-500/40',
      iconBg: 'bg-fuchsia-500/15 border-fuchsia-500/30 text-fuchsia-400',
      buttonBg: 'bg-[#d946ef] hover:bg-[#c026d3] text-white font-semibold shadow-[0_0_15px_rgba(217,70,239,0.3)]',
      type: 'new',
      icon: <Target className="w-5 h-5 sm:w-6 sm:h-6 text-fuchsia-400" />
    },
    {
      id: 'sequence-logic',
      gameId: 'sequence-logic',
      title: 'Sequence Logic',
      category: 'Logic',
      subtitle: 'Deduce numeric progression',
      badge: '🧠 Logic',
      badgeColor: 'text-sky-400 bg-sky-500/15 border-sky-500/30',
      theme: 'sky',
      bgCard: 'bg-[#081726]/90 border-sky-500/20 hover:border-sky-500/40',
      iconBg: 'bg-sky-500/15 border-sky-500/30 text-sky-400',
      buttonBg: 'bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold shadow-[0_0_15px_rgba(14,165,233,0.3)]',
      type: 'popular',
      icon: <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />
    },
    {
      id: 'shape-count',
      gameId: 'shape-count',
      title: 'Shape Count',
      category: 'Observation',
      subtitle: 'Count target shapes swiftly',
      badge: '⭐ New',
      badgeColor: 'text-violet-400 bg-violet-500/15 border-violet-500/30',
      theme: 'violet',
      bgCard: 'bg-[#140e26]/90 border-violet-500/20 hover:border-violet-500/40',
      iconBg: 'bg-violet-500/15 border-violet-500/30 text-violet-400',
      buttonBg: 'bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.3)]',
      type: 'new',
      icon: <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
    },
    {
      id: 'color-anomaly',
      gameId: 'color-anomaly',
      title: 'Color Anomaly',
      category: 'Observation',
      subtitle: 'Detect odd color gradients',
      badge: '🔥 Popular',
      badgeColor: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/30',
      theme: 'cyan',
      bgCard: 'bg-[#061922]/90 border-cyan-500/20 hover:border-cyan-500/40',
      iconBg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400',
      buttonBg: 'bg-[#06b6d4] hover:bg-[#0891b2] text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]',
      type: 'popular',
      icon: <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
    },
    {
      id: 'puzzle-match',
      gameId: 'puzzle-match',
      title: 'Puzzle Match',
      category: 'Logic',
      subtitle: 'Match logical puzzle pairs',
      badge: '🧠 Logic',
      badgeColor: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
      theme: 'emerald',
      bgCard: 'bg-[#081a12]/90 border-emerald-500/20 hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
      buttonBg: 'bg-[#10b981] hover:bg-[#059669] text-white font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)]',
      type: 'new',
      icon: <Puzzle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
    },
    {
      id: 'speed-memory',
      gameId: 'speed-memory',
      title: 'Speed Memory',
      category: 'Memory',
      subtitle: 'Memorize visual items in seconds',
      badge: '⚡ Fast',
      badgeColor: 'text-pink-400 bg-pink-500/15 border-pink-500/30',
      theme: 'pink',
      bgCard: 'bg-[#1d0a18]/90 border-pink-500/20 hover:border-pink-500/40',
      iconBg: 'bg-pink-500/15 border-pink-500/30 text-pink-400',
      buttonBg: 'bg-[#ec4899] hover:bg-[#db2777] text-white font-semibold shadow-[0_0_15px_rgba(236,72,153,0.3)]',
      type: 'popular',
      icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
    }
  ];

  // 15 Distinct Sliding Challenge Cards for the Bottom Slider (Image 1 Format)
  const slidingChallenges = useMemo(() => [
    {
      id: 'slide-1',
      gameId: 'pattern-logic',
      title: 'Pattern Puzzle',
      subtitle: 'Find the missing pattern',
      category: '⚙️ Logic',
      difficulty: '📶 Medium',
      xpReward: '💎 +50 XP',
      thumbBorder: 'border-cyan-500/30 bg-gradient-to-br from-[#072422] to-[#041615]',
      catTagStyle: 'bg-[#1e2638] text-slate-300',
      diffTagStyle: 'bg-amber-950/60 text-amber-400 border border-amber-500/30',
      thumbnail: (
        <svg viewBox="0 0 40 40" className="w-8 h-8 sm:w-9 sm:h-9 relative z-10">
          <polygon points="20,5 30,11 30,23 20,29 10,23 10,11" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.4" />
          <polygon points="20,13 26,17 26,23 20,27 14,23 14,17" fill="#0e7490" stroke="#06b6d4" strokeWidth="1.5" />
          <text x="20" y="24" textAnchor="middle" fill="#a5f3fc" fontSize="11" fontWeight="bold">?</text>
          <circle cx="10" cy="11" r="1.5" fill="#38bdf8" />
          <circle cx="30" cy="11" r="1.5" fill="#38bdf8" />
          <circle cx="20" cy="5" r="1.5" fill="#38bdf8" />
        </svg>
      )
    },
    {
      id: 'slide-2',
      gameId: 'memory-grid',
      title: 'Memory Grid',
      subtitle: 'Recall illuminated matrix tiles',
      category: '🧠 Memory',
      difficulty: '📶 Easy',
      xpReward: '💎 +40 XP',
      thumbBorder: 'border-purple-500/30 bg-gradient-to-br from-[#1d1136] to-[#0c0717]',
      catTagStyle: 'bg-purple-950/60 text-purple-300 border border-purple-500/30',
      diffTagStyle: 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30',
      thumbnail: (
        <div className="grid grid-cols-3 gap-0.5 w-6 h-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className={`rounded-[1.5px] ${[0, 2, 4, 8].includes(i) ? 'bg-purple-400 shadow-[0_0_5px_#c084fc]' : 'bg-purple-900/40'}`} />
          ))}
        </div>
      )
    },
    {
      id: 'slide-3',
      gameId: 'focus-tap',
      title: 'Focus Tap',
      subtitle: 'Target bullseye precision reaction',
      category: '🎯 Focus',
      difficulty: '📶 Medium',
      xpReward: '💎 +50 XP',
      thumbBorder: 'border-emerald-500/30 bg-gradient-to-br from-[#06241a] to-[#03130d]',
      catTagStyle: 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30',
      diffTagStyle: 'bg-amber-950/60 text-amber-400 border border-amber-500/30',
      thumbnail: (
        <div className="relative w-7 h-7 flex items-center justify-center">
          <div className="w-7 h-7 rounded-full border border-emerald-500/40 flex items-center justify-center animate-pulse">
            <div className="w-4 h-4 rounded-full border border-emerald-400 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_6px_#00D68F]" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'slide-4',
      gameId: 'color-match-focus',
      title: 'Color Match',
      subtitle: 'Resolve cognitive word conflicts',
      category: '⚡ Attention',
      difficulty: '🔥 Hard',
      xpReward: '💎 +65 XP',
      thumbBorder: 'border-blue-500/30 bg-gradient-to-br from-[#0a1e38] to-[#040e1a]',
      catTagStyle: 'bg-blue-950/60 text-blue-300 border border-blue-500/30',
      diffTagStyle: 'bg-rose-950/60 text-rose-400 border border-rose-500/30',
      thumbnail: (
        <div className="flex items-center justify-center gap-1">
          <Brain className="w-6 h-6 text-blue-400 drop-shadow-[0_0_8px_#3b82f6]" />
        </div>
      )
    },
    {
      id: 'slide-5',
      gameId: 'number-recall',
      title: 'Math Speed Rush',
      subtitle: 'Solve lightning arithmetic challenges',
      category: '🔢 Math',
      difficulty: '⚡ Fast',
      xpReward: '💎 +45 XP',
      thumbBorder: 'border-orange-500/30 bg-gradient-to-br from-[#2a1708] to-[#140b04]',
      catTagStyle: 'bg-orange-950/60 text-orange-300 border border-orange-500/30',
      diffTagStyle: 'bg-yellow-950/60 text-yellow-400 border border-yellow-500/30',
      thumbnail: (
        <div className="flex flex-col items-center justify-center">
          <span className="text-[11px] font-black tracking-widest text-orange-400 leading-none mb-0.5">1 2 3</span>
          <Calculator className="w-4 h-4 text-orange-300" />
        </div>
      )
    },
    {
      id: 'slide-6',
      gameId: 'sudoku-lite',
      title: 'Sudoku Lite',
      subtitle: 'Deduce unique 4x4 row numbers',
      category: '🧩 Logic',
      difficulty: '🔥 Hard',
      xpReward: '💎 +75 XP',
      thumbBorder: 'border-yellow-500/30 bg-gradient-to-br from-[#262208] to-[#131104]',
      catTagStyle: 'bg-yellow-950/60 text-yellow-300 border border-yellow-500/30',
      diffTagStyle: 'bg-rose-950/60 text-rose-400 border border-rose-500/30',
      thumbnail: (
        <div className="grid grid-cols-2 gap-1 w-6 h-6 border border-yellow-500/40 p-0.5 rounded">
          <span className="text-[8px] font-bold text-yellow-300 text-center leading-none">1</span>
          <span className="text-[8px] font-bold text-yellow-500 text-center leading-none">4</span>
          <span className="text-[8px] font-bold text-yellow-500 text-center leading-none">3</span>
          <span className="text-[8px] font-bold text-yellow-300 text-center leading-none">2</span>
        </div>
      )
    },
    {
      id: 'slide-7',
      gameId: 'odd-one-out',
      title: 'Odd One Out',
      subtitle: 'Spot the outlier amongst shapes',
      category: '🎯 Focus',
      difficulty: '📶 Easy',
      xpReward: '💎 +35 XP',
      thumbBorder: 'border-amber-500/30 bg-gradient-to-br from-[#291e0a] to-[#120d04]',
      catTagStyle: 'bg-amber-950/60 text-amber-300 border border-amber-500/30',
      diffTagStyle: 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30',
      thumbnail: (
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-[1px] bg-rose-400 shadow-[0_0_5px_#f43f5e]" />
        </div>
      )
    },
    {
      id: 'slide-8',
      gameId: 'spot-difference',
      title: 'Spot Differences',
      category: '👁️ Observation',
      subtitle: 'Locate minute visual variations',
      difficulty: '📶 Medium',
      xpReward: '💎 +55 XP',
      thumbBorder: 'border-rose-500/30 bg-gradient-to-br from-[#280c16] to-[#14060b]',
      catTagStyle: 'bg-rose-950/60 text-rose-300 border border-rose-500/30',
      diffTagStyle: 'bg-amber-950/60 text-amber-400 border border-amber-500/30',
      thumbnail: (
        <div className="relative w-7 h-7 flex items-center justify-center">
          <Eye className="w-5 h-5 text-rose-400" />
          <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1" />
        </div>
      )
    },
    {
      id: 'slide-9',
      gameId: 'card-match',
      title: 'Card Match Frenzy',
      subtitle: 'Flip and match card pairs swiftly',
      category: '🧠 Memory',
      difficulty: '📶 Medium',
      xpReward: '💎 +50 XP',
      thumbBorder: 'border-indigo-500/30 bg-gradient-to-br from-[#1a1738] to-[#0c0b1c]',
      catTagStyle: 'bg-indigo-950/60 text-indigo-300 border border-indigo-500/30',
      diffTagStyle: 'bg-amber-950/60 text-amber-400 border border-amber-500/30',
      thumbnail: (
        <div className="relative w-6 h-6 flex items-center justify-center">
          <div className="w-4 h-5 rounded-[3px] bg-indigo-500 border border-indigo-300 rotate-[-8deg] absolute shadow-sm" />
          <div className="w-4 h-5 rounded-[3px] bg-indigo-600 border border-indigo-200 rotate-[8deg] relative flex items-center justify-center shadow-md">
            <span className="text-[7px] text-white font-bold">★</span>
          </div>
        </div>
      )
    },
    {
      id: 'slide-10',
      gameId: 'shape-count',
      title: 'Shape Count Blitz',
      subtitle: 'Tally specified moving targets',
      category: '⚡ Speed',
      difficulty: '⚡ Fast',
      xpReward: '💎 +45 XP',
      thumbBorder: 'border-violet-500/30 bg-gradient-to-br from-[#1d1238] to-[#0e081c]',
      catTagStyle: 'bg-violet-950/60 text-violet-300 border border-violet-500/30',
      diffTagStyle: 'bg-yellow-950/60 text-yellow-400 border border-yellow-500/30',
      thumbnail: (
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 border border-violet-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-violet-400" />
          <span className="text-[9px] font-black text-violet-300">#3</span>
        </div>
      )
    },
    {
      id: 'slide-11',
      gameId: 'color-anomaly',
      title: 'Color Anomaly',
      subtitle: 'Detect slight hue tint variations',
      category: '👁️ Visual',
      difficulty: '🔥 Hard',
      xpReward: '💎 +65 XP',
      thumbBorder: 'border-cyan-500/30 bg-gradient-to-br from-[#08242c] to-[#041216]',
      catTagStyle: 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30',
      diffTagStyle: 'bg-rose-950/60 text-rose-400 border border-rose-500/30',
      thumbnail: (
        <div className="grid grid-cols-2 gap-1 w-6 h-6">
          <div className="rounded-sm bg-cyan-500" />
          <div className="rounded-sm bg-cyan-500" />
          <div className="rounded-sm bg-cyan-400" />
          <div className="rounded-sm bg-cyan-500" />
        </div>
      )
    },
    {
      id: 'slide-12',
      gameId: 'fast-recall',
      title: 'Fast Recall Matrix',
      subtitle: 'Retain rapid visual item bursts',
      category: '🧠 Memory',
      difficulty: '👑 Master',
      xpReward: '💎 +80 XP',
      thumbBorder: 'border-teal-500/30 bg-gradient-to-br from-[#092621] to-[#041310]',
      catTagStyle: 'bg-teal-950/60 text-teal-300 border border-teal-500/30',
      diffTagStyle: 'bg-purple-950/60 text-purple-400 border border-purple-500/30',
      thumbnail: (
        <div className="flex items-center justify-center">
          <Zap className="w-6 h-6 text-teal-400 animate-pulse drop-shadow-[0_0_8px_#14b8a6]" />
        </div>
      )
    },
    {
      id: 'slide-13',
      gameId: 'sequence-logic',
      title: 'Sequence Logic',
      subtitle: 'Solve ascending numeric curves',
      category: '⚙️ Logic',
      difficulty: '📶 Medium',
      xpReward: '💎 +50 XP',
      thumbBorder: 'border-sky-500/30 bg-gradient-to-br from-[#092238] to-[#04101c]',
      catTagStyle: 'bg-sky-950/60 text-sky-300 border border-sky-500/30',
      diffTagStyle: 'bg-amber-950/60 text-amber-400 border border-amber-500/30',
      thumbnail: (
        <div className="flex items-center gap-0.5">
          <span className="text-[9px] font-bold text-sky-400">2</span>
          <span className="text-[9px] text-sky-600">→</span>
          <span className="text-[9px] font-bold text-sky-400">4</span>
          <span className="text-[9px] text-sky-600">→</span>
          <span className="text-[9px] font-black text-sky-300">?</span>
        </div>
      )
    },
    {
      id: 'slide-14',
      gameId: 'find-different-shape',
      title: 'Unique Shape Finder',
      subtitle: 'Locate distinct polygon symmetries',
      category: '🎯 Focus',
      difficulty: '📶 Medium',
      xpReward: '💎 +45 XP',
      thumbBorder: 'border-fuchsia-500/30 bg-gradient-to-br from-[#280c2c] to-[#140616]',
      catTagStyle: 'bg-fuchsia-950/60 text-fuchsia-300 border border-fuchsia-500/30',
      diffTagStyle: 'bg-amber-950/60 text-amber-400 border border-amber-500/30',
      thumbnail: (
        <div className="relative w-6 h-6 flex items-center justify-center">
          <polygon points="12,2 22,22 2,22" fill="#d946ef" opacity="0.6" />
          <circle cx="12" cy="14" r="3" fill="#fae8ff" />
        </div>
      )
    },
    {
      id: 'slide-15',
      gameId: 'speed-memory',
      title: 'Speed Memory Blitz',
      subtitle: 'Remember high-speed flashing items',
      category: '🧠 Memory',
      difficulty: '🔥 Hard',
      xpReward: '💎 +70 XP',
      thumbBorder: 'border-pink-500/30 bg-gradient-to-br from-[#2b0c24] to-[#150612]',
      catTagStyle: 'bg-pink-950/60 text-pink-300 border border-pink-500/30',
      diffTagStyle: 'bg-rose-950/60 text-rose-400 border border-rose-500/30',
      thumbnail: (
        <div className="flex flex-col items-center justify-center">
          <Sparkles className="w-5 h-5 text-pink-400" />
          <div className="w-4 h-0.5 bg-pink-500 rounded-full mt-0.5" />
        </div>
      )
    }
  ], []);

  // Slide navigation handlers
  const nextSlide = () => {
    setSlideDirection('right');
    setSliderIndex((prev) => (prev + 1) % slidingChallenges.length);
  };

  const prevSlide = () => {
    setSlideDirection('left');
    setSliderIndex((prev) => (prev - 1 + slidingChallenges.length) % slidingChallenges.length);
  };

  // Auto-play sliding interval (4.5s)
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setSlideDirection('right');
      setSliderIndex((prev) => (prev + 1) % slidingChallenges.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlay, slidingChallenges.length]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartRef.current - touchEndRef.current > 45 && touchEndRef.current !== 0) {
      nextSlide();
    }
    if (touchEndRef.current - touchStartRef.current > 45 && touchEndRef.current !== 0) {
      prevSlide();
    }
    touchStartRef.current = 0;
    touchEndRef.current = 0;
  };

  // Carousel list for Hub (first 7 items)
  const carouselCards = useMemo(() => {
    if (activeFilter === 'popular') {
      return allChallengeCards.filter(c => c.badge.includes('Popular'));
    }
    if (activeFilter === 'new') {
      return allChallengeCards.filter(c => c.badge.includes('New'));
    }
    return allChallengeCards.slice(0, 7);
  }, [activeFilter, allChallengeCards]);

  // Filtered list for "All Recommended" view
  const allFilteredViewCards = useMemo(() => {
    return allChallengeCards.filter((card) => {
      const matchesSearch = 
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCat = 
        categoryFilter === 'all' || 
        card.category.toLowerCase() === categoryFilter.toLowerCase();

      return matchesSearch && matchesCat;
    });
  }, [allChallengeCards, searchQuery, categoryFilter]);

  // Categories list
  const categories = [
    {
      id: 'memory',
      name: 'Memory',
      count: '12 Games',
      iconBg: 'bg-gradient-to-br from-[#be185d]/30 to-[#831843]/10 border-pink-500/30 text-pink-400',
      icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    {
      id: 'focus',
      name: 'Focus',
      count: '10 Games',
      iconBg: 'bg-gradient-to-br from-emerald-500/30 to-emerald-950/20 border-emerald-500/30 text-emerald-400',
      icon: (
        <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-emerald-400 flex items-center justify-center">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400" />
          </div>
        </div>
      )
    },
    {
      id: 'logic',
      name: 'Logic',
      count: '15 Games',
      iconBg: 'bg-gradient-to-br from-blue-500/30 to-blue-950/20 border-blue-500/30 text-blue-400',
      icon: <Puzzle className="w-5 h-5 sm:w-6 sm:h-6" />
    },
    {
      id: 'math',
      name: 'Math',
      count: '8 Games',
      iconBg: 'bg-gradient-to-br from-amber-500/30 to-amber-950/20 border-amber-500/30 text-amber-400',
      icon: <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
    }
  ];

  // Active current slide
  const currentSlide = slidingChallenges[sliderIndex];

  // =========================================================================
  // SUB-VIEW 1: ALL RECOMMENDED CHALLENGES (Opened by "See All >")
  // =========================================================================
  if (subView === 'all-recommended') {
    return (
      <div className="bg-[#07090e] text-white">
        <div className="max-w-md mx-auto px-4 pt-4 sm:px-6">
          {/* Header */}
          <div className="flex items-center mb-4 relative">
            <button 
              onClick={() => {
                setSubView('hub');
                setSearchQuery('');
                setCategoryFilter('all');
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors absolute left-0 active:scale-95 cursor-pointer z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <div className="text-center w-full">
              <h1 className="text-[17px] sm:text-[18px] font-bold text-white leading-tight">
                Recommended Challenges
              </h1>
              <p className="text-[11px] sm:text-[12px] text-white/50">
                {allFilteredViewCards.length} of {allChallengeCards.length} challenges available
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3.5">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search challenges by name or skill..."
              className="w-full bg-[#101520] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-[13px] text-white placeholder-white/40 focus:outline-none focus:border-[#00D68F]/50 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-1 mb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: 'all', label: 'All' },
              { id: 'memory', label: 'Memory' },
              { id: 'focus', label: 'Focus' },
              { id: 'logic', label: 'Logic' },
              { id: 'math', label: 'Math' },
              { id: 'observation', label: 'Observation' },
            ].map((pill) => {
              const isActive = categoryFilter === pill.id;
              return (
                <button
                  key={pill.id}
                  onClick={() => setCategoryFilter(pill.id)}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] sm:text-[12px] font-bold tracking-wide transition-all shrink-0 cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-[#00D68F] text-black shadow-[0_0_12px_rgba(0,214,143,0.35)]'
                      : 'bg-[#101520] text-white/60 hover:text-white border border-white/5'
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>

          {/* 2-Column Mobile Grid of ALL Recommended Games */}
          {allFilteredViewCards.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 mb-6">
              {allFilteredViewCards.map((card) => (
                <div
                  key={card.id}
                  className={`rounded-2xl p-3 sm:p-3.5 border flex flex-col justify-between transition-all hover:scale-[1.02] active:scale-[0.98] ${card.bgCard}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border ${card.iconBg}`}>
                        {card.icon}
                      </div>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${card.badgeColor}`}>
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-[13px] sm:text-[14px] font-bold text-white mb-0.5 tracking-tight truncate">
                      {card.title}
                    </h3>
                    <p className="text-[10px] text-white/50 leading-tight mb-3 line-clamp-2 h-6">
                      {card.subtitle}
                    </p>
                  </div>

                  <button
                    onClick={() => onPlay(card.gameId)}
                    className={`w-full py-2 rounded-xl text-[11px] sm:text-[12px] font-bold transition-all text-center cursor-pointer active:scale-95 shadow-sm ${card.buttonBg}`}
                  >
                    Play
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#0e141e]/50 rounded-3xl border border-white/5 mb-6">
              <Search className="w-8 h-8 text-white/30 mx-auto mb-2" />
              <p className="text-white/70 font-bold text-[14px] mb-1">No challenges found</p>
              <p className="text-white/40 text-[12px] mb-4">Try clearing filters or search terms</p>
              <button 
                onClick={() => { setSearchQuery(''); setCategoryFilter('all'); }}
                className="px-4 py-2 rounded-xl bg-[#00D68F] text-black font-bold text-xs"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Quick return button */}
          <button 
            onClick={() => setSubView('hub')}
            className="w-full py-3 rounded-2xl bg-[#101520] hover:bg-[#161d2d] border border-white/10 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Challenges Hub
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SUB-VIEW 2: 7-DAY FOCUS PLAN DETAIL SCREEN (Matching Image 4)
  // =========================================================================
  if (subView === 'focus-plan') {
    return (
      <div className="bg-[#07090e] text-white">
        <div className="max-w-md mx-auto px-4 pt-4 sm:px-6">
          {/* Header */}
          <div className="flex items-center mb-5 relative">
            <button 
              onClick={() => setSubView('hub')}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors absolute left-0 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-[17px] sm:text-[18px] font-bold text-center w-full">7-Day Focus Plan</h1>
          </div>

          {/* Progress Card (Dynamic Day & Stepper) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-b from-[#0c161d] to-[#091017] rounded-3xl p-5 sm:p-6 border border-emerald-500/20 shadow-[0_0_35px_rgba(0,214,143,0.08)] mb-5"
          >
            <div className="flex items-center gap-3.5 mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-emerald-500/30 flex items-center justify-center relative shrink-0">
                <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full" />
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#00D68F] flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(0,214,143,0.5)]">
                  {completedPlanDays.includes(activePlanDay) ? (
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 text-black" strokeWidth={3} />
                  ) : (
                    <span className="text-black font-black text-sm sm:text-base">{activePlanDay}</span>
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-[#00D68F] text-[17px] sm:text-[18px] font-bold mb-0.5">
                    Day {activePlanDay} of 7
                  </h2>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#00D68F]/15 text-[#00D68F] border border-[#00D68F]/30">
                    {planProgressPercent}% Plan Done
                  </span>
                </div>
                <p className="text-[#9ca3af] text-[13px] sm:text-[14px] truncate">
                  {completedPlanDays.includes(activePlanDay)
                    ? 'Day goals completed! Great work!'
                    : completedTodayGoalsCount > 0
                      ? `${completedTodayGoalsCount} of 3 goals finished today`
                      : "You're off to a great start!"}
                </p>
              </div>
            </div>

            {/* Stepper with Dynamic Progress Line */}
            <div className="flex items-center justify-between relative px-1 sm:px-2">
              <div className="absolute top-1/2 left-3 right-3 h-0.5 bg-[#1f2937] -translate-y-1/2" />
              <div 
                className="absolute top-1/2 left-3 h-0.5 bg-[#00D68F] -translate-y-1/2 transition-all duration-700" 
                style={{ width: `${Math.round(((activePlanDay - 1) / 6) * 100)}%` }}
              />
              
              {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                const isDone = completedPlanDays.includes(day);
                const isCurrent = day === activePlanDay;
                return (
                  <button 
                    key={day}
                    onClick={() => {
                      setActivePlanDay(day);
                      localStorage.setItem('brainova_focus_plan_day', day.toString());
                    }}
                    className="relative z-10 flex flex-col items-center gap-2 cursor-pointer group"
                    title={`Day ${day}${isDone ? ' (Completed)' : isCurrent ? ' (Active)' : ''}`}
                  >
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                      isDone 
                        ? 'bg-[#00D68F] border-[#00D68F] shadow-[0_0_8px_#00D68F]' 
                        : isCurrent 
                          ? 'bg-[#00D68F]/25 border-[#00D68F] shadow-[0_0_8px_rgba(0,214,143,0.5)]' 
                          : 'bg-[#1a2230] border-[#2b3548]'
                    }`}>
                      {isDone ? (
                        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-black" strokeWidth={3} />
                      ) : isCurrent ? (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00D68F]" />
                      ) : null}
                    </div>
                    <span className={`text-[11px] sm:text-[12px] font-semibold transition-colors ${
                      isDone || isCurrent ? 'text-[#00D68F]' : 'text-[#6b7280]'
                    }`}>{day}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Dynamic Day Advancement Action Button */}
          <div className="mb-5">
            <button
              onClick={advancePlanDay}
              className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-[#00D68F] to-[#05b378] hover:from-[#05b378] hover:to-[#04885a] text-black font-extrabold text-[12px] sm:text-[13px] shadow-[0_0_15px_rgba(0,214,143,0.3)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>
                {activePlanDay >= 7 
                  ? 'Complete 7-Day Cycle & Restart (+200 XP)' 
                  : `Mark Day ${activePlanDay} Done & Advance to Day ${activePlanDay + 1} (+100 XP)`}
              </span>
            </button>
          </div>

          {/* Today's Goal */}
          <div className="bg-[#0f141d] rounded-3xl p-5 sm:p-6 border border-white/5 mb-5">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                <Target className="w-4 h-4 text-purple-400" />
              </div>
              <h2 className="text-[16px] sm:text-[17px] font-bold text-white tracking-wide">Today's Goal</h2>
            </div>

            <div className="space-y-5">
              {/* Focus Time */}
              <div 
                className="cursor-pointer group active:scale-[0.99]" 
                onClick={() => onPlay('focus-tap')}
              >
                <div className="flex items-center gap-3.5 mb-2.5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] sm:text-[13px] text-[#9ca3af] font-medium mb-0.5 group-hover:text-white transition-colors">Focus Time</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[18px] sm:text-[20px] font-bold text-white">{focusTimeMinutes}</span>
                      <span className="text-[13px] text-[#9ca3af]">/ 20 min</span>
                    </div>
                  </div>
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 ${focusTimeMinutes >= 20 ? 'border-emerald-500 bg-emerald-500' : 'border-[#263143]'} flex items-center justify-center`}>
                    {focusTimeMinutes >= 20 && <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />}
                  </div>
                </div>
                <div className="h-2 bg-[#192231] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00D68F] rounded-full transition-all duration-1000" style={{ width: `${Math.max(5, focusTimeProgress)}%` }} />
                </div>
              </div>

              {/* Focus Games */}
              <div 
                className="cursor-pointer group active:scale-[0.99]"
                onClick={() => onPlay('memory-grid')}
              >
                <div className="flex items-center gap-3.5 mb-2.5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] sm:text-[13px] text-[#9ca3af] font-medium mb-0.5 group-hover:text-white transition-colors">Focus Games</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[18px] sm:text-[20px] font-bold text-white">{focusGamesCount}</span>
                      <span className="text-[13px] text-[#9ca3af]">/ 3</span>
                    </div>
                  </div>
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 ${focusGamesCount >= 3 ? 'border-emerald-500 bg-emerald-500' : 'border-[#263143]'} flex items-center justify-center`}>
                    {focusGamesCount >= 3 && <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />}
                  </div>
                </div>
                <div className="h-2 bg-[#192231] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00D68F] rounded-full transition-all duration-1000" style={{ width: `${Math.max(5, gamesProgress)}%` }} />
                </div>
              </div>

              {/* Focus Score */}
              <div 
                className="cursor-pointer group active:scale-[0.99]"
                onClick={() => onPlay('color-match-focus')}
              >
                <div className="flex items-center gap-3.5 mb-2.5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] sm:text-[13px] text-[#9ca3af] font-medium mb-0.5 group-hover:text-white transition-colors">Focus Score</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[18px] sm:text-[20px] font-bold text-blue-400">{maxFocusScore}</span>
                      <span className="text-[13px] text-[#9ca3af]">/ 80 target</span>
                    </div>
                  </div>
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 ${maxFocusScore >= 80 ? 'border-blue-500 bg-blue-500' : 'border-[#263143]'} flex items-center justify-center`}>
                    {maxFocusScore >= 80 ? <Check className="w-3.5 h-3.5 text-white" /> : <AlertCircle className="w-4 h-4 text-blue-400/50" />}
                  </div>
                </div>
                <div className="h-2 bg-[#192231] rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${Math.max(5, focusScoreProgress)}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Focus Games */}
          <div className="bg-[#0f141d] rounded-3xl p-5 sm:p-6 border border-white/5 mb-5">
            <div className="flex items-center gap-2.5 mb-5">
              <Sparkles className="w-5 h-5 text-purple-400 fill-purple-400/20" />
              <h2 className="text-[16px] sm:text-[17px] font-bold text-white tracking-wide">Recommended Focus Games</h2>
            </div>

            <div className="space-y-3">
              {allChallengeCards.slice(0, 3).map((item) => (
                <div key={item.id} className="bg-[#141b27] rounded-2xl p-3 sm:p-4 border border-white/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 border ${item.iconBg}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold text-white mb-0.5">{item.title}</h3>
                      <p className="text-[11px] text-[#9ca3af]">{item.subtitle}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onPlay(item.gameId)}
                    className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer active:scale-95 ${item.buttonBg}`}
                  >
                    Play
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN VIEW: CHALLENGES HUB (Mobile-First Layout)
  // =========================================================================
  return (
    <div className="bg-[#07090e] text-white select-none">
      <div className="max-w-md mx-auto px-4 pt-3 sm:px-6 sm:pt-4">

        {/* 1. Page Title Header & Concentric Target Logo */}
        <div className="flex items-center justify-between mb-3.5 mt-1">
          <div>
            <h1 className="text-[28px] sm:text-[32px] font-black text-white tracking-tight leading-none mb-1">
              Challenges
            </h1>
            <p className="text-[13px] sm:text-[14px] text-white/60 font-medium">
              Train your brain. Be a better you.
            </p>
          </div>

          {/* Glowing Concentric Target Emblem */}
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-[#00D68F]/20 rounded-full blur-md animate-pulse" />
            <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-11 sm:h-11 relative z-10 drop-shadow-[0_0_10px_rgba(0,214,143,0.6)]">
              <circle cx="24" cy="24" r="21" fill="none" stroke="#00D68F" strokeWidth="2.5" opacity="0.35" />
              <circle cx="24" cy="24" r="15" fill="none" stroke="#00D68F" strokeWidth="2.5" opacity="0.75" />
              <circle cx="24" cy="24" r="9" fill="none" stroke="#00D68F" strokeWidth="2.5" />
              <circle cx="24" cy="24" r="3.5" fill="#00D68F" />
            </svg>
          </div>
        </div>

        {/* 2. Filter Pills Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-1.5 mb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            { id: 'all', label: 'All' },
            { id: 'popular', label: 'Popular' },
            { id: 'new', label: 'New' },
            { id: 'daily', label: 'Daily' },
            { id: 'focus-plan', label: 'Focus Plan' },
          ].map((pill) => {
            const isActive = activeFilter === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => {
                  if (pill.id === 'focus-plan') {
                    setSubView('focus-plan');
                  } else {
                    setActiveFilter(pill.id as ChallengeFilter);
                  }
                }}
                className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-[12px] sm:text-[13px] font-bold tracking-wide transition-all duration-200 shrink-0 cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-[#00D68F] text-black shadow-[0_0_16px_rgba(0,214,143,0.4)]'
                    : 'bg-[#101520] text-white/60 hover:text-white border border-white/5'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* 3. Featured Hero Card: 7-Day Focus Plan */}
        {activeFilter !== 'daily' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 mb-6 overflow-hidden border border-[#00D68F]/30 bg-gradient-to-r from-[#041713] via-[#08221b] to-[#041510] shadow-[0_0_30px_rgba(0,214,143,0.12)] group"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#00D68F]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-6 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Top Right Duration Pill */}
            <div className="flex justify-end mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-black/50 border border-[#00D68F]/30 text-white/90 backdrop-blur-md">
                <Calendar className="w-3 h-3 text-[#00D68F]" />
                Day {activePlanDay} of 7
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 z-10 min-w-0">
                <h2 className="text-[20px] sm:text-[24px] font-black tracking-tight leading-tight mb-1.5">
                  <span className="text-white">7-Day </span>
                  <span className="text-[#00D68F] drop-shadow-[0_0_12px_rgba(0,214,143,0.4)]">Focus Plan</span>
                </h2>
                <p className="text-[12px] sm:text-[13px] text-white/70 leading-relaxed mb-4 line-clamp-2 max-w-[200px]">
                  Build better focus with daily challenges and track your progress.
                </p>

                <button 
                  onClick={() => setSubView('focus-plan')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#00D68F] hover:bg-[#05b378] text-black font-extrabold text-[12px] sm:text-[13px] shadow-[0_0_16px_rgba(0,214,143,0.35)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>{completedPlanDays.length > 0 || activePlanDay > 1 ? `Continue Day ${activePlanDay}` : 'Start Plan'}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>

              {/* Glowing 3D Brain Graphic with Upward Bar Chart & Arrow */}
              <div className="w-[95px] h-[90px] sm:w-[120px] sm:h-[105px] relative shrink-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#00D68F]/20 rounded-full blur-xl" />
                <svg viewBox="0 0 140 120" className="w-full h-full relative z-10 drop-shadow-[0_0_12px_rgba(0,214,143,0.45)]">
                  <defs>
                    <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#064e3b" />
                    </linearGradient>
                    <linearGradient id="arrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00D68F" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>

                  {/* Stylized Glowing Brain Silhouette */}
                  <g opacity="0.95">
                    <path
                      d="M62 25 C50 20, 32 26, 32 42 C24 45, 20 56, 23 66 C20 76, 26 88, 38 90 C45 92, 54 88, 62 82 Z"
                      fill="url(#brainGrad)"
                      stroke="#00D68F"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M68 25 C80 20, 98 26, 98 42 C106 45, 110 56, 107 66 C110 76, 104 88, 92 90 C85 92, 76 88, 68 82 Z"
                      fill="url(#brainGrad)"
                      stroke="#00D68F"
                      strokeWidth="1.5"
                    />
                    <path d="M42 38 Q52 44 48 56 Q44 68 56 74" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                    <path d="M88 38 Q78 44 82 56 Q86 68 74 74" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                  </g>

                  {/* 3D Ascending Green Bar Chart in Front of Brain */}
                  <g transform="translate(68, 65)">
                    <rect x="0" y="24" width="8" height="18" rx="2" fill="#047857" stroke="#10b981" strokeWidth="1" />
                    <rect x="12" y="16" width="8" height="26" rx="2" fill="#059669" stroke="#34d399" strokeWidth="1" />
                    <rect x="24" y="8" width="8" height="34" rx="2" fill="#10b981" stroke="#00D68F" strokeWidth="1" />
                    <rect x="36" y="0" width="8" height="42" rx="2" fill="#00D68F" stroke="#a7f3d0" strokeWidth="1" />
                  </g>

                  {/* Upward Curved Bright Growth Arrow */}
                  <path
                    d="M 68 96 Q 95 90 115 52"
                    fill="none"
                    stroke="url(#arrowGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <polygon
                    points="115,44 122,54 110,56"
                    fill="#34d399"
                    filter="drop-shadow(0 0 6px #00D68F)"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Today's Challenge Hero Card when Daily filter is active */
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 mb-6 overflow-hidden border border-purple-500/30 bg-gradient-to-r from-[#170e2b] via-[#1f123d] to-[#120a24] shadow-[0_0_30px_rgba(168,85,247,0.12)]"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/20 border border-purple-500/30 text-purple-300">
                <Zap className="w-3 h-3" />
                DAILY CHALLENGE
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 border border-amber-500/30 text-amber-300">
                <Clock className="w-3 h-3" />
                {countdown}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h2 className="text-[20px] sm:text-[22px] font-black text-white tracking-tight mb-1">
                  Today's Challenge
                </h2>
                <p className="text-[12px] sm:text-[13px] text-white/70 mb-3.5 max-w-[200px]">
                  Complete today's challenge and earn bonus XP!
                </p>
                <button 
                  onClick={() => onPlay('pattern-logic')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#00D68F] hover:bg-[#05b378] text-black font-extrabold text-[12px] sm:text-[13px] shadow-[0_0_16px_rgba(0,214,143,0.35)] transition-all active:scale-95 cursor-pointer"
                >
                  <span>Play Now</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>

              <div className="w-[90px] h-[85px] relative shrink-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-lg" />
                <div className="relative z-10 flex items-center gap-1">
                  <div className="w-10 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-700 p-1.5 shadow-lg flex flex-col items-center justify-center border border-purple-400/30">
                    <Calendar className="w-4 h-4 text-white mb-0.5" />
                    <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-[0_0_12px_rgba(0,214,143,0.5)] border border-emerald-300/40 -ml-2 mb-1.5">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 4. Section: Recommended for You Carousel with WORKING "See All >" */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h2 className="text-[17px] sm:text-[18px] font-bold text-white tracking-tight">
                Recommended for You
              </h2>
            </div>
            {/* WORKING "See All >" BUTTON */}
            <button 
              onClick={() => {
                setSubView('all-recommended');
                setSearchQuery('');
                setCategoryFilter('all');
              }}
              className="text-[12px] sm:text-[13px] font-semibold text-[#00D68F] hover:text-[#34d399] transition-colors inline-flex items-center gap-0.5 cursor-pointer active:scale-95"
            >
              See All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Horizontal Snap Scroll Cards (bleed to mobile screen edge) */}
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1.5 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x">
            {carouselCards.map((card) => (
              <div
                key={card.id}
                className={`w-[138px] sm:w-[146px] shrink-0 rounded-2xl p-3 sm:p-3.5 border flex flex-col justify-between snap-start transition-all hover:scale-[1.02] active:scale-[0.98] ${card.bgCard}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border ${card.iconBg}`}>
                      {card.icon}
                    </div>
                    <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-[13px] sm:text-[14px] font-bold text-white mb-0.5 tracking-tight truncate">
                    {card.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-white/55 leading-tight mb-3 line-clamp-2 h-6">
                    {card.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => onPlay(card.gameId)}
                  className={`w-full py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-[12px] font-bold transition-all text-center cursor-pointer active:scale-95 ${card.buttonBg}`}
                >
                  Play
                </button>
              </div>
            ))}

            {/* "View All (16)" Card at the end of Carousel */}
            <div
              onClick={() => {
                setSubView('all-recommended');
                setSearchQuery('');
                setCategoryFilter('all');
              }}
              className="w-[124px] sm:w-[136px] shrink-0 rounded-2xl p-3 sm:p-3.5 border border-[#00D68F]/30 bg-gradient-to-b from-[#0a1e17]/90 to-[#05110d] flex flex-col items-center justify-center text-center snap-start transition-all hover:scale-[1.02] active:scale-95 cursor-pointer shadow-lg group"
            >
              <div className="w-10 h-10 rounded-full bg-[#00D68F]/15 border border-[#00D68F]/40 flex items-center justify-center mb-2 text-[#00D68F] group-hover:scale-110 transition-transform">
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-[13px] font-bold text-white mb-0.5">View All</span>
              <span className="text-[10px] text-[#00D68F] font-semibold">{allChallengeCards.length} Challenges</span>
            </div>
          </div>
        </div>

        {/* 5. Section: Today's Challenge (Pattern Puzzle) */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <h2 className="text-[17px] sm:text-[18px] font-bold text-white tracking-tight">
                Today's Challenge
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300">
              <Clock className="w-3 h-3" />
              {countdown}
            </span>
          </div>
          <p className="text-[11px] sm:text-[12px] text-white/60 mb-3">
            Complete today's challenge and earn bonus XP!
          </p>

          <div className="bg-[#0e141e]/90 rounded-2xl p-3 sm:p-4 border border-white/5 hover:border-emerald-500/30 transition-all flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3 min-w-0">
              {/* Pattern Puzzle Thumbnail */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#072422] to-[#041615] border border-cyan-500/30 flex items-center justify-center shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-500/10 blur-sm" />
                <svg viewBox="0 0 40 40" className="w-8 h-8 sm:w-9 sm:h-9 relative z-10">
                  <polygon points="20,5 30,11 30,23 20,29 10,23 10,11" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.4" />
                  <polygon points="20,13 26,17 26,23 20,27 14,23 14,17" fill="#0e7490" stroke="#06b6d4" strokeWidth="1.5" />
                  <text x="20" y="24" textAnchor="middle" fill="#a5f3fc" fontSize="11" fontWeight="bold">?</text>
                  <circle cx="10" cy="11" r="1.5" fill="#38bdf8" />
                  <circle cx="30" cy="11" r="1.5" fill="#38bdf8" />
                  <circle cx="20" cy="5" r="1.5" fill="#38bdf8" />
                </svg>
              </div>

              {/* Title & Tags */}
              <div className="min-w-0">
                <h3 className="text-[14px] sm:text-[15px] font-bold text-white tracking-tight truncate mb-0.5">
                  Pattern Puzzle
                </h3>
                <p className="text-[11px] sm:text-[12px] text-white/55 truncate mb-1.5">
                  Find the missing pattern
                </p>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#1e2638] text-slate-300">
                    ⚙️ Logic
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-400 border border-amber-500/30">
                    📶 Medium
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-950/60 text-blue-400 border border-blue-500/30">
                    💎 +50 XP
                  </span>
                </div>
              </div>
            </div>

            {/* Play Now Button */}
            <button
              onClick={() => onPlay('pattern-logic')}
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#00D68F] hover:bg-[#05b378] text-black font-extrabold text-[12px] sm:text-[13px] shadow-[0_0_15px_rgba(0,214,143,0.35)] shrink-0 transition-transform active:scale-95 cursor-pointer"
            >
              Play Now
            </button>
          </div>
        </div>

        {/* 6. Section: Your Active Challenges */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-emerald-400" />
              <h2 className="text-[17px] sm:text-[18px] font-bold text-white tracking-tight">
                Your Active Challenges
              </h2>
            </div>
            <button 
              onClick={() => setSubView('focus-plan')}
              className="text-[12px] sm:text-[13px] font-semibold text-[#00D68F] hover:text-[#34d399] transition-colors inline-flex items-center gap-0.5 cursor-pointer"
            >
              See All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Active 7-Day Focus Plan Card */}
          <div 
            onClick={() => setSubView('focus-plan')}
            className="bg-[#0e141e]/90 hover:bg-[#111927] rounded-2xl p-3 sm:p-4 border border-white/5 hover:border-emerald-500/30 transition-all flex items-center justify-between gap-2.5 shadow-lg cursor-pointer group"
          >
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Target className="w-6 h-6 sm:w-7 sm:h-7 text-[#00D68F]" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-[14px] sm:text-[15px] font-bold text-white tracking-tight truncate">
                    7-Day Focus Plan
                  </h3>
                  {completedPlanDays.includes(activePlanDay) && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-[#00D68F] border border-emerald-500/30">
                      Done
                    </span>
                  )}
                </div>
                <p className="text-[11px] sm:text-[12px] text-white/50 mb-1.5 flex items-center gap-1.5">
                  <span>Day {activePlanDay} of 7</span>
                  <span className="text-white/20">•</span>
                  <span className="text-[#00D68F] font-semibold">{planProgressPercent}% Done</span>
                </p>

                {/* 7 Stepper Dots */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((d) => {
                    const isDone = completedPlanDays.includes(d);
                    const isCurrent = d === activePlanDay;
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePlanDay(d);
                          localStorage.setItem('brainova_focus_plan_day', d.toString());
                        }}
                        title={`Day ${d}${isDone ? ' (Completed)' : isCurrent ? ' (Active Today)' : ' (Upcoming)'}`}
                        className="flex flex-col items-center cursor-pointer group/dot focus:outline-none"
                      >
                        <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center transition-all ${
                          isDone 
                            ? 'bg-[#00D68F] text-black shadow-[0_0_6px_#00D68F]' 
                            : isCurrent 
                              ? 'bg-[#00D68F]/25 border-2 border-[#00D68F] shadow-[0_0_8px_rgba(0,214,143,0.6)]' 
                              : 'bg-[#20293a] border border-white/5 group-hover/dot:border-white/20'
                        }`}>
                          {isDone ? (
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          ) : isCurrent ? (
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00D68F] animate-pulse" />
                          ) : null}
                        </div>
                        <span className={`text-[8px] sm:text-[9px] mt-0.5 font-bold transition-colors ${
                          isDone || isCurrent ? 'text-[#00D68F]' : 'text-white/40'
                        }`}>{d}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Circular Progress & Continue Button */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
                <svg className="w-9 h-9 sm:w-10 sm:h-10 -rotate-90">
                  <circle cx="18" cy="18" r="14" stroke="#1f293d" strokeWidth="2.5" fill="none" />
                  <circle 
                    cx="18" 
                    cy="18" 
                    r="14" 
                    stroke="#00D68F" 
                    strokeWidth="2.5" 
                    fill="none" 
                    strokeDasharray={circleCircumference} 
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round" 
                    className="transition-all duration-500 ease-out"
                  />
                </svg>
                <span className="absolute text-[9px] sm:text-[10px] font-black text-white">{planProgressPercent}%</span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSubView('focus-plan');
                }}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#00D68F] hover:bg-[#05b378] text-black font-extrabold text-[11px] sm:text-[12px] shadow-[0_0_12px_rgba(0,214,143,0.3)] transition-all cursor-pointer active:scale-95"
              >
                Continue
              </button>
            </div>
          </div>
        </div>

        {/* 7. Section: Challenge Categories */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <h2 className="text-[17px] sm:text-[18px] font-bold text-white tracking-tight">
                Categories
              </h2>
            </div>
            <button 
              onClick={onOpenCategories}
              className="text-[12px] sm:text-[13px] font-semibold text-[#00D68F] hover:text-[#34d399] transition-colors inline-flex items-center gap-0.5 cursor-pointer"
            >
              See All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4 Category Cards in Mobile 2x2 Grid */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={onOpenCategories}
                className="bg-[#0e141e]/90 hover:bg-[#131b28] border border-white/5 hover:border-white/15 rounded-2xl p-3 sm:p-3.5 flex items-center gap-2.5 sm:gap-3 transition-all cursor-pointer group active:scale-[0.98]"
              >
                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 ${cat.iconBg}`}>
                  {cat.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-[13px] sm:text-[14px] font-bold text-white tracking-tight leading-tight truncate">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-white/50 truncate">
                    {cat.count}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8. NEW: 15 Sliding Challenges Deck (Image 1 Style Carousel at Bottom) */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#00D68F]" />
              <h2 className="text-[17px] sm:text-[18px] font-bold text-white tracking-tight">
                Challenge Missions
              </h2>
            </div>

            {/* Slide Index Pill & Nav Controls */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-white/60 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                {sliderIndex + 1} / {slidingChallenges.length}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={prevSlide}
                  className="w-7 h-7 rounded-full bg-[#101520] hover:bg-[#182133] active:scale-90 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
                  title="Previous challenge"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-7 h-7 rounded-full bg-[#101520] hover:bg-[#182133] active:scale-90 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
                  title="Next challenge"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <p className="text-[11px] sm:text-[12px] text-white/55 mb-3">
            Swipe or slide through 15 daily cognitive app missions
          </p>

          {/* Sliding Card Frame */}
          <div 
            className="relative overflow-hidden rounded-2xl min-h-[92px]"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={currentSlide.id}
                custom={slideDirection}
                initial={{ opacity: 0, x: slideDirection === 'right' ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideDirection === 'right' ? -50 : 50 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="bg-[#0e141e]/95 rounded-2xl p-3 sm:p-4 border border-white/10 hover:border-emerald-500/30 transition-all flex items-center justify-between gap-3 shadow-xl"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Custom Vector Thumbnail Icon in Themed Box */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 relative overflow-hidden border ${currentSlide.thumbBorder}`}>
                    <div className="absolute inset-0 bg-white/5 blur-[2px]" />
                    {currentSlide.thumbnail}
                  </div>

                  {/* Title & Metadata Badges */}
                  <div className="min-w-0">
                    <h3 className="text-[14px] sm:text-[15px] font-bold text-white tracking-tight truncate mb-0.5">
                      {currentSlide.title}
                    </h3>
                    <p className="text-[11px] sm:text-[12px] text-white/55 truncate mb-1.5">
                      {currentSlide.subtitle}
                    </p>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full ${currentSlide.catTagStyle}`}>
                        {currentSlide.category}
                      </span>
                      <span className={`text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full ${currentSlide.diffTagStyle}`}>
                        {currentSlide.difficulty}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-950/60 text-blue-400 border border-blue-500/30">
                        {currentSlide.xpReward}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Play Now Button (Launches the specific game) */}
                <button
                  onClick={() => onPlay(currentSlide.gameId)}
                  className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#00D68F] hover:bg-[#05b378] text-black font-extrabold text-[12px] sm:text-[13px] shadow-[0_0_15px_rgba(0,214,143,0.35)] shrink-0 transition-transform active:scale-95 cursor-pointer"
                >
                  Play Now
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 15 Pagination Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3 px-2 overflow-x-auto hide-scrollbar">
            {slidingChallenges.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSlideDirection(idx > sliderIndex ? 'right' : 'left');
                  setSliderIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === sliderIndex 
                    ? 'w-5 bg-[#00D68F] shadow-[0_0_8px_#00D68F]' 
                    : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
                title={`Challenge ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ChallengesPage;
