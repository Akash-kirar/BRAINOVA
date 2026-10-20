import { supabase } from '@/src/lib/supabase';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Brain, Cpu, Paintbrush, TrendingUp, TrendingDown, ChevronLeft, ChevronRight, ChevronDown, Sparkles, Mail, Lock, User, ArrowLeft, LogOut, Flame, Zap, Target, Activity, Play, Lightbulb, Calculator, Trophy, Star, Grid, RotateCcw, Box, Puzzle, Search, Clock, Type, Shuffle, BookOpen, ListOrdered, Link, Check, CheckCircle, Copy, Bot, Home, Gamepad2, Sparkle, Settings, FileText, Shield, HelpCircle, Download, Trash2, MessageSquare, Sliders, Globe, X, Mic, Send, CircleDollarSign, Heart, Flag, Moon, Crown, Compass, Camera, Images, Edit2, Instagram, Gift, CreditCard, Building, Wallet, Smartphone, Award, MoreVertical, Bell, Gem, Dumbbell, Calendar, Rocket, Sword, Sun, Hexagon, Octagon, Diamond, Triangle, Infinity as InfinityIcon, Orbit, Atom, Filter, RefreshCcw, ScanFace, Cuboid, Route, Layers, Palette, Smile, Brush, Shapes } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

import QuickTestGame from '@/src/features/quickactions/components/QuickTestGame';
import PlacementModeGame from '@/src/features/quickactions/components/PlacementModeGame';
import MemorySprintGame from '@/src/features/quickactions/components/MemorySprintGame';
import MathDrillGame from '@/src/features/quickactions/components/MathDrillGame';
import SmartGame from '@/src/features/quickactions/components/SmartGame';
import GameCarousel from '@/src/components/ui/GameCarousel';
import MemoryGridGame from '@/src/features/memory/components/MemoryGridGame';
import ReactionSpeedGame from '@/src/features/reaction/components/ReactionSpeedGame';
import CardMatchGame from '@/src/features/memory/components/CardMatchGame';
import SequenceRecallGame from '@/src/features/memory/components/SequenceRecallGame';
import PatternRecallGame from '@/src/features/memory/components/PatternRecallGame';
import ImageMemoryGame from '@/src/features/memory/components/ImageMemoryGame';
import ColorMemoryGame from '@/src/features/memory/components/ColorMemoryGame';
import NumberRecallGame from '@/src/features/memory/components/NumberRecallGame';
import WordRecallGame from '@/src/features/memory/components/WordRecallGame';
import OddOneOutGame from '@/src/features/logic/components/OddOneOutGame';
import { OnboardingScreens } from '@/src/features/onboarding/components/OnboardingScreens';
import { SplashAnimation } from '@/src/features/onboarding/components/SplashAnimation';
import FocusTapGame from '@/src/features/reaction/components/FocusTapGame';
import { AuthScreen } from "@/src/features/auth/components/AuthScreen";
import ColorMatchFocusGame from '@/src/features/logic/components/ColorMatchFocusGame';
import SlidingPuzzleGame from '@/src/features/logic/components/SlidingPuzzleGame';
import PatternLogicGame from '@/src/features/logic/components/PatternLogicGame';
import SequenceLogicGame from '@/src/features/logic/components/SequenceLogicGame';
import SmartGridPuzzleGame from '@/src/features/logic/components/SmartGridPuzzleGame';
import CubeRotationPuzzleGame from '@/src/features/logic/components/CubeRotationPuzzleGame';
import PuzzleMatchGame from '@/src/features/logic/components/PuzzleMatchGame';
import HiddenPatternPuzzleGame from '@/src/features/logic/components/HiddenPatternPuzzleGame';
import MathSprintGame from '@/src/features/logic/components/MathSprintGame';
import NumberComparisonGame from '@/src/features/logic/components/NumberComparisonGame';
import EquationBuilderGame from '@/src/features/logic/components/EquationBuilderGame';
import ReactionTapGame from '@/src/features/reaction/components/ReactionTapGame';
import ColorReactionGame from '@/src/features/reaction/components/ColorReactionGame';
import FastButtonGame from '@/src/features/reaction/components/FastButtonGame';
import ReactionLightGame from '@/src/features/reaction/components/ReactionLightGame';
import SpeedCircleGame from '@/src/features/reaction/components/SpeedCircleGame';
import ReactionTimerGame from '@/src/features/reaction/components/ReactionTimerGame';
import TapTheMovingDotGame from '@/src/features/reaction/components/TapTheMovingDotGame';
import FlashTapGame from '@/src/features/reaction/components/FlashTapGame';
import WordBuilderGame from '@/src/features/vocabulary/components/WordBuilderGame';
import VocabularyMatchGame from '@/src/features/vocabulary/components/VocabularyMatchGame';
import MissingLetterGame from '@/src/features/vocabulary/components/MissingLetterGame';
import WordSearchGame from '@/src/features/vocabulary/components/WordSearchGame';
import WordMemoryGame from '@/src/features/memory/components/WordMemoryGame';
import WordSequenceGame from '@/src/features/vocabulary/components/WordSequenceGame';
import WordSpeedGame from '@/src/features/vocabulary/components/WordSpeedGame';
import VocabularyBuilderGame from '@/src/features/vocabulary/components/VocabularyBuilderGame';
import DailyTraining from '@/src/features/training/components/DailyTraining';
import KickOffQuest from '@/src/features/onboarding/components/KickOffQuest';
import AiCoachView from './components/AiCoachView';
import BrainScoreCard from './components/BrainScoreCard';
import TodaysMission from './components/TodaysMission';
import RecommendedTraining from './components/RecommendedTraining';
import QuickActions from './components/QuickActions';
import AiAnalysisPage from './components/AiAnalysisPage';
import PremiumSubscriptionPage from './components/PremiumSubscriptionPage';
import GameDetailsView from './components/GameDetailsView';
import { GameContext } from './contexts/GameContext';
import PersonalizedPlanPage from './components/PersonalizedPlanPage';
import AchievementsPage from './components/AchievementsPage';
import FeedbackPage from './components/FeedbackPage';
import LeaderboardPage from './components/LeaderboardPage';
import { useLeaderboard } from './hooks/useLeaderboard';
import { ChallengesPage } from './components/ChallengesPage';
import ChallengesIcon from './components/ChallengesIcon';
import UserAvatar from './components/UserAvatar';
import { BrainBuddyAvatar, AVATAR_THEMES } from './components/BrainBuddyAvatar';
import { useProgress, GameSession } from './hooks/useProgress';
import { t, Language } from './i18n';
import CelebrationOverlay from '@/src/components/ui/CelebrationOverlay';

import PatternRecognitionGame from '@/src/features/visual/components/PatternRecognitionGame';
import MentalRotationGame from '@/src/features/visual/components/MentalRotationGame';
import SpatialReasoningGame from '@/src/features/visual/components/SpatialReasoningGame';
import SymmetryTestGame from '@/src/features/spatial/components/SymmetryTestGame';
import BlockCountGame from '@/src/features/spatial/components/BlockCountGame';
import PerfectPathGame from '@/src/features/spatial/components/PerfectPathGame';
import LayerLogicGame from '@/src/features/spatial/components/LayerLogicGame';

import SpotTheDifferenceGame from '@/src/features/observation/components/SpotTheDifferenceGame';
import FindHiddenObjectGame from '@/src/features/observation/components/FindHiddenObjectGame';
import VisualSearchGame from '@/src/features/observation/components/VisualSearchGame';
import ShadowMatchGame from '@/src/features/observation/components/ShadowMatchGame';
import FindIdenticalGame from '@/src/features/observation/components/FindIdenticalGame';
import ShapeCountGame from '@/src/features/observation/components/ShapeCountGame';
import ColorAnomalyGame from '@/src/features/observation/components/ColorAnomalyGame';
import PlanningGame from '@/src/features/executive/components/PlanningGame';
import DecisionMakingGame from '@/src/features/executive/components/DecisionMakingGame';
import TaskSwitchingGame from '@/src/features/executive/components/TaskSwitchingGame';
import RuleSorterGame from '@/src/features/executive/components/RuleSorterGame';
import GoNoGoGame from '@/src/features/executive/components/GoNoGoGame';
import SequencePlannerGame from '@/src/features/executive/components/SequencePlannerGame';
import MemoryUpdaterGame from '@/src/features/executive/components/MemoryUpdaterGame';
import PatternCreationGame from '@/src/features/creativity/components/PatternCreationGame';
import CreativeThinkingGame from '@/src/features/creativity/components/CreativeThinkingGame';
import PuzzleDesignGame from '@/src/features/creativity/components/PuzzleDesignGame';
import ColorMixerGame from '@/src/features/creativity/components/ColorMixerGame';
import EmojiStoryGame from '@/src/features/creativity/components/EmojiStoryGame';
import PixelArtGame from '@/src/features/creativity/components/PixelArtGame';
import ShapeBuilderGame from '@/src/features/creativity/components/ShapeBuilderGame';

const mapNodesBase = [
  { id: 25, title: 'Infinite', xp: '106000', maxXP: '1000000', x: 240, y: 150, icon: Atom, color: '#f43f5e', labelColor: '#fb7185', labelPos: 'left' },
  { id: 24, title: 'Pinnacle', xp: '94000', maxXP: '106000', x: 160, y: 310, icon: Orbit, color: '#ec4899', labelColor: '#f472b6', labelPos: 'right' },
  { id: 23, title: 'Zenith', xp: '83000', maxXP: '94000', x: 280, y: 470, icon: InfinityIcon, color: '#d946ef', labelColor: '#f0abfc', labelPos: 'left' },
  { id: 22, title: 'Apex', xp: '73000', maxXP: '83000', x: 180, y: 630, icon: Triangle, color: '#a855f7', labelColor: '#c084fc', labelPos: 'right' },
  { id: 21, title: 'Transcendent', xp: '64000', maxXP: '73000', x: 260, y: 790, icon: Diamond, color: '#8b5cf6', labelColor: '#a78bfa', labelPos: 'left' },
  { id: 20, title: 'Ethereal', xp: '56000', maxXP: '64000', x: 150, y: 950, icon: Octagon, color: '#6366f1', labelColor: '#818cf8', labelPos: 'right' },
  { id: 19, title: 'Omnipotent', xp: '49000', maxXP: '56000', x: 290, y: 1110, icon: Hexagon, color: '#3b82f6', labelColor: '#60a5fa', labelPos: 'left' },
  { id: 18, title: 'Multiversal', xp: '42500', maxXP: '49000', x: 190, y: 1270, icon: Moon, color: '#0ea5e9', labelColor: '#38bdf8', labelPos: 'right' },
  { id: 17, title: 'Universal', xp: '36500', maxXP: '42500', x: 270, y: 1430, icon: Sun, color: '#14b8a6', labelColor: '#2dd4bf', labelPos: 'left' },
  { id: 16, title: 'Galactic', xp: '31000', maxXP: '36500', x: 140, y: 1590, icon: Sword, color: '#10b981', labelColor: '#34d399', labelPos: 'right' },
  { id: 15, title: 'Astral', xp: '26000', maxXP: '31000', x: 260, y: 1750, icon: Rocket, color: '#84cc16', labelColor: '#a3e635', labelPos: 'left' },
  { id: 14, title: 'Celestial', xp: '21500', maxXP: '26000', x: 180, y: 1910, icon: Shield, color: '#eab308', labelColor: '#fde047', labelPos: 'right' },
  { id: 13, title: 'Deity', xp: '17500', maxXP: '21500', x: 280, y: 2070, icon: Gem, color: '#f59e0b', labelColor: '#fbbf24', labelPos: 'left' },
  { id: 12, title: 'Titan', xp: '14000', maxXP: '17500', x: 160, y: 2230, icon: Crown, color: '#f97316', labelColor: '#fb923c', labelPos: 'right' },
  { id: 11, title: 'Ascendant', xp: '11000', maxXP: '14000', x: 250, y: 2390, icon: Star, color: '#ef4444', labelColor: '#f87171', labelPos: 'left' },
  { id: 10, title: 'Mythic', xp: '9000', maxXP: '11000', x: 150, y: 2550, icon: Trophy, color: '#f43f5e', labelColor: '#fb7185', labelPos: 'right' },
  { id: 9, title: 'Legend', xp: '7200', maxXP: '9000', x: 280, y: 2710, icon: Award, color: '#ec4899', labelColor: '#f472b6', labelPos: 'left' },
  { id: 8, title: 'Grandmaster', xp: '5600', maxXP: '7200', x: 180, y: 2870, icon: Flame, color: '#d946ef', labelColor: '#f0abfc', labelPos: 'right' },
  { id: 7, title: 'Master', xp: '4200', maxXP: '5600', x: 260, y: 3030, icon: Compass, color: '#a855f7', labelColor: '#c084fc', labelPos: 'left' },
  { id: 6, title: 'Expert', xp: '3000', maxXP: '4200', x: 140, y: 3190, icon: Lightbulb, color: '#8b5cf6', labelColor: '#a78bfa', labelPos: 'right' },
  { id: 5, title: 'Advanced', xp: '2000', maxXP: '3000', x: 240, y: 3350, icon: Activity, color: '#3b82f6', labelColor: '#60a5fa', labelPos: 'left' },
  { id: 4, title: 'Intermediate', xp: '1200', maxXP: '2000', x: 160, y: 3510, icon: Target, color: '#0ea5e9', labelColor: '#38bdf8', labelPos: 'right' },
  { id: 3, title: 'Novice', xp: '600', maxXP: '1200', x: 280, y: 3670, icon: Zap, color: '#06b6d4', labelColor: '#22d3ee', labelPos: 'left' },
  { id: 2, title: 'Learner', xp: '100', maxXP: '300', x: 180, y: 3830, icon: Gift, color: '#eab308', labelColor: '#fde047', labelPos: 'right' },
  { id: 1, title: 'Beginner', xp: '0', maxXP: '50', x: 240, y: 3990, icon: Flag, color: '#10b981', labelColor: '#34d399', labelPos: 'left' }
];

const games = [
  { id: 'memory-grid', title: "Memory Grid", category: "Memory", icon: <Brain className="w-5 h-5 text-indigo-400" />, color: "bg-indigo-500/10" },
  { id: 'card-match', title: "Card Match", category: "Memory", icon: <Sparkles className="w-5 h-5 text-purple-400" />, color: "bg-purple-500/10" },
  { id: 'sequence-recall', title: "Sequence Recall", category: "Memory", icon: <Target className="w-5 h-5 text-emerald-400" />, color: "bg-emerald-500/10" },
  { id: 'pattern-recall', title: "Pattern Recall", category: "Memory", icon: <Zap className="w-5 h-5 text-amber-400" />, color: "bg-amber-500/10" },
];

export const GAME_CATEGORIES_20 = [
  'Logic',
  'Memory',
  'Focus & Attention',
  'Math',
  'Reaction Speed',
  'Language & Vocabulary',
  'Visual & Spatial',
  'Observation',
  'Pattern Recognition',
  'Problem Solving',
  'Working Memory',
  'Processing Speed',
  'Cognitive Flexibility',
  'Planning & Strategy',
  'Decision Making',
  'Creativity',
  'Auditory Memory',
  'Multitasking',
  'Sudoku & Grid Puzzles',
  'Mazes & Navigation'
] as const;

export const allGames = [
  { id: 'memory-grid', title: 'Memory Grid', category: 'Memory', description: 'Remember highlighted squares', icon: <Brain className="w-8 h-8 text-indigo-400" />, color: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { id: 'card-match', title: 'Card Match', category: 'Memory', description: 'Match identical cards', icon: <Sparkles className="w-8 h-8 text-purple-400" />, color: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'sequence-recall', title: 'Sequence Recall', category: 'Working Memory', description: 'Remember number sequence', icon: <Target className="w-8 h-8 text-emerald-400" />, color: 'bg-emerald-500/10', border: 'border-emerald-500/20', isPremium: true },
  { id: 'pattern-recall', title: 'Pattern Recall', category: 'Pattern Recognition', description: 'Remember shapes pattern', icon: <Zap className="w-8 h-8 text-amber-400" />, color: 'bg-amber-500/10', border: 'border-amber-500/20', isPremium: true },
  { id: 'image-memory', title: 'Image Memory', category: 'Memory', description: 'Remember pictures', icon: <Lightbulb className="w-8 h-8 text-rose-400" />, color: 'bg-rose-500/10', border: 'border-rose-500/20', isPremium: true },
  { id: 'color-memory', title: 'Color Memory', category: 'Memory', description: 'Remember color order', icon: <Brain className="w-8 h-8 text-cyan-400" />, color: 'bg-cyan-500/10', border: 'border-cyan-500/20', isPremium: true },
  { id: 'number-recall', title: 'Number Recall', category: 'Working Memory', description: 'Remember numbers quickly', icon: <Calculator className="w-8 h-8 text-blue-400" />, color: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'word-recall', title: 'Word Recall', category: 'Working Memory', description: 'Remember word list', icon: <Sparkles className="w-8 h-8 text-pink-400" />, color: 'bg-pink-500/10', border: 'border-pink-500/20', isPremium: true },
  { id: 'flash-memory', title: 'Flash Memory', category: 'Memory', description: 'Memorize items in seconds', icon: <Zap className="w-8 h-8 text-yellow-400" />, color: 'bg-yellow-500/10', border: 'border-yellow-500/20', isPremium: true },
  { id: 'object-position', title: 'Object Position', category: 'Memory', description: 'Remember object positions', icon: <Target className="w-8 h-8 text-green-400" />, color: 'bg-green-500/10', border: 'border-green-500/20' },
  { id: 'sound-memory', title: 'Sound Memory', category: 'Auditory Memory', description: 'Remember sound order', icon: <Activity className="w-8 h-8 text-purple-400" />, color: 'bg-purple-500/10', border: 'border-purple-500/20', isPremium: true },
  { id: 'memory-path', title: 'Memory Path', category: 'Mazes & Navigation', description: 'Remember a path on grid', icon: <Brain className="w-8 h-8 text-indigo-400" />, color: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { id: 'memory-tiles', title: 'Memory Tiles', category: 'Memory', description: 'Tap tiles in correct order', icon: <Sparkles className="w-8 h-8 text-rose-400" />, color: 'bg-rose-500/10', border: 'border-rose-500/20' },
  { id: 'symbol-match', title: 'Symbol Match', category: 'Memory', description: 'Match symbol pairs', icon: <Lightbulb className="w-8 h-8 text-amber-400" />, color: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { id: 'memory-matrix', title: 'Memory Matrix', category: 'Working Memory', description: 'Remember large grid pattern', icon: <Target className="w-8 h-8 text-emerald-400" />, color: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'fast-recall', title: 'Fast Recall', category: 'Working Memory', description: 'Quick memory test', icon: <Zap className="w-8 h-8 text-orange-400" />, color: 'bg-orange-500/10', border: 'border-orange-500/20', isPremium: true },
  { id: 'picture-recall', title: 'Picture Recall', category: 'Memory', description: 'Remember picture details', icon: <Brain className="w-8 h-8 text-cyan-400" />, color: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { id: 'number-pattern', title: 'Number Pattern Memory', category: 'Pattern Recognition', description: 'Remember number patterns', icon: <Calculator className="w-8 h-8 text-blue-400" />, color: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'memory-flip', title: 'Memory Flip Challenge', category: 'Memory', description: 'Flip and remember', icon: <Sparkles className="w-8 h-8 text-pink-400" />, color: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { id: 'speed-memory', title: 'Speed Memory Challenge', category: 'Processing Speed', description: 'Fast-paced memory', icon: <Zap className="w-8 h-8 text-yellow-400" />, color: 'bg-yellow-500/10', border: 'border-yellow-500/20', isPremium: true },
  // Focus & Attention Games
  { id: 'find-different-shape', title: 'Find the Different Shape', category: 'Focus & Attention', description: 'Spot the unique shape', icon: <Target className="w-8 h-8 text-emerald-400" />, color: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'odd-one-out', title: 'Odd One Out', category: 'Focus & Attention', description: 'Find the odd item out', icon: <Lightbulb className="w-8 h-8 text-amber-400" />, color: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { id: 'focus-tap', title: 'Focus Tap', category: 'Focus & Attention', description: 'Tap target quickly', icon: <Zap className="w-8 h-8 text-rose-400" />, color: 'bg-rose-500/10', border: 'border-rose-500/20' },
  { id: 'moving-target-tap', title: 'Moving Target Tap', category: 'Multitasking', description: 'Tap moving targets', icon: <Activity className="w-8 h-8 text-blue-400" />, color: 'bg-blue-500/10', border: 'border-blue-500/20', isPremium: true },
  { id: 'color-match-focus', title: 'Color Match Focus', category: 'Cognitive Flexibility', description: 'Match word and color', icon: <Brain className="w-8 h-8 text-purple-400" />, color: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'find-hidden-object', title: 'Find Hidden Object', category: 'Observation', description: 'Spot hidden items', icon: <Target className="w-8 h-8 text-cyan-400" />, color: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { id: 'distraction-filter', title: 'Distraction Filter', category: 'Focus & Attention', description: 'Ignore wrong objects', icon: <Sparkles className="w-8 h-8 text-pink-400" />, color: 'bg-pink-500/10', border: 'border-pink-500/20', isPremium: true },
  { id: 'focus-circle', title: 'Focus Circle', category: 'Focus & Attention', description: 'Track moving circle', icon: <Activity className="w-8 h-8 text-indigo-400" />, color: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { id: 'visual-search', title: 'Visual Search', category: 'Observation', description: 'Search for specific items', icon: <Lightbulb className="w-8 h-8 text-yellow-400" />, color: 'bg-yellow-500/10', border: 'border-yellow-500/20', isPremium: true },
  { id: 'target-finder', title: 'Target Finder', category: 'Focus & Attention', description: 'Find the specific target', icon: <Target className="w-8 h-8 text-emerald-400" />, color: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'focus-lines', title: 'Focus Lines', category: 'Focus & Attention', description: 'Follow correct path', icon: <Zap className="w-8 h-8 text-amber-400" />, color: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { id: 'quick-select', title: 'Quick Select', category: 'Processing Speed', description: 'Select items quickly', icon: <Activity className="w-8 h-8 text-rose-400" />, color: 'bg-rose-500/10', border: 'border-rose-500/20' },
  { id: 'spot-difference', title: 'Spot the Difference', category: 'Observation', description: 'Find differences in images', icon: <Brain className="w-8 h-8 text-blue-400" />, color: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'multi-object-tracking', title: 'Multi Object Tracking', category: 'Multitasking', description: 'Track multiple objects', icon: <Target className="w-8 h-8 text-purple-400" />, color: 'bg-purple-500/10', border: 'border-purple-500/20', isPremium: true },
  { id: 'attention-grid', title: 'Attention Grid', category: 'Focus & Attention', description: 'Focus on grid patterns', icon: <Sparkles className="w-8 h-8 text-cyan-400" />, color: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  
    { id: 'shadow-match', title: 'Shadow Match', category: 'Observation', description: 'Match item to shadow', icon: <Search className="w-8 h-8 text-violet-400" />, color: 'bg-violet-500/10', border: 'border-violet-500/20' },
  { id: 'find-identical', title: 'Find Identical', category: 'Observation', description: 'Find the exact match', icon: <Target className="w-8 h-8 text-fuchsia-400" />, color: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/20' },
  { id: 'shape-count', title: 'Shape Count', category: 'Observation', description: 'Count specific shapes', icon: <Box className="w-8 h-8 text-rose-400" />, color: 'bg-rose-500/10', border: 'border-rose-500/20' },
  { id: 'color-anomaly', title: 'Color Anomaly', category: 'Observation', description: 'Spot the odd color', icon: <Sparkle className="w-8 h-8 text-sky-400" />, color: 'bg-sky-500/10', border: 'border-sky-500/20', isPremium: true },
  // Logic & Puzzle Games
  { id: 'sudoku-lite', title: 'Sudoku Lite', category: 'Sudoku & Grid Puzzles', description: 'Mini 4x4 Sudoku', icon: <Grid className="w-8 h-8 text-amber-400" />, color: 'bg-amber-500/10', border: 'border-amber-500/20', isPremium: true },
  { id: 'pattern-logic', title: 'Pattern Logic', category: 'Logic', description: 'Find the next pattern', icon: <Brain className="w-8 h-8 text-indigo-400" />, color: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { id: 'sequence-logic', title: 'Sequence Logic', category: 'Logic', description: 'Find the next number', icon: <Calculator className="w-8 h-8 text-blue-400" />, color: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'smart-grid', title: 'Smart Grid Puzzle', category: 'Sudoku & Grid Puzzles', description: 'Turn off all lights', icon: <Lightbulb className="w-8 h-8 text-cyan-400" />, color: 'bg-cyan-500/10', border: 'border-cyan-500/20', isPremium: true },
  { id: 'cube-rotation', title: 'Cube Rotation Puzzle', category: 'Problem Solving', description: 'Match the target grid', icon: <Box className="w-8 h-8 text-purple-400" />, color: 'bg-purple-500/10', border: 'border-purple-500/20', isPremium: true },
  { id: 'puzzle-match', title: 'Puzzle Match', category: 'Problem Solving', description: 'Match logical pairs', icon: <Puzzle className="w-8 h-8 text-emerald-400" />, color: 'bg-emerald-500/10', border: 'border-emerald-500/20', isPremium: true },
  { id: 'hidden-pattern', title: 'Hidden Pattern Puzzle', category: 'Pattern Recognition', description: 'Find the missing piece', icon: <Search className="w-8 h-8 text-amber-400" />, color: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { id: 'block-puzzle', title: 'Block Puzzle', category: 'Problem Solving', description: 'Fit blocks in grid', icon: <Cpu className="w-8 h-8 text-purple-400" />, color: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'shape-fit', title: 'Shape Fit Puzzle', category: 'Problem Solving', description: 'Fit shapes together', icon: <Target className="w-8 h-8 text-emerald-400" />, color: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'number-puzzle', title: 'Number Puzzle', category: 'Logic', description: 'Solve number logic', icon: <Calculator className="w-8 h-8 text-blue-400" />, color: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'grid-logic', title: 'Grid Logic', category: 'Sudoku & Grid Puzzles', description: 'Solve grid puzzles', icon: <Grid className="w-8 h-8 text-cyan-400" />, color: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { id: 'maze-solver', title: 'Maze Solver', category: 'Mazes & Navigation', description: 'Find the exit', icon: <Activity className="w-8 h-8 text-rose-400" />, color: 'bg-rose-500/10', border: 'border-rose-500/20', isPremium: true },
  { id: 'rotate-puzzle', title: 'Rotate Puzzle', category: 'Logic', description: 'Rotate to solve', icon: <RotateCcw className="w-8 h-8 text-amber-400" />, color: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { id: 'pattern-builder', title: 'Pattern Builder', category: 'Pattern Recognition', description: 'Build the pattern', icon: <Sparkles className="w-8 h-8 text-pink-400" />, color: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { id: 'shape-logic', title: 'Shape Logic', category: 'Logic', description: 'Shape-based logic', icon: <Target className="w-8 h-8 text-emerald-400" />, color: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'connect-lines', title: 'Connect Lines Puzzle', category: 'Planning & Strategy', description: 'Connect matching dots', icon: <Activity className="w-8 h-8 text-blue-400" />, color: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'sliding-puzzle', title: 'Sliding Puzzle', category: 'Problem Solving', description: 'Slide tiles to order', icon: <Grid className="w-8 h-8 text-indigo-400" />, color: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { id: 'puzzle-grid', title: 'Puzzle Grid', category: 'Sudoku & Grid Puzzles', description: 'Grid-based puzzles', icon: <Cpu className="w-8 h-8 text-purple-400" />, color: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'brain-blocks', title: 'Brain Blocks', category: 'Problem Solving', description: 'Block logic puzzles', icon: <Brain className="w-8 h-8 text-rose-400" />, color: 'bg-rose-500/10', border: 'border-rose-500/20' },
  { id: 'logic-path', title: 'Logic Path', category: 'Mazes & Navigation', description: 'Find the logical path', icon: <Target className="w-8 h-8 text-cyan-400" />, color: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  
  // Math & Calculation Games
  { id: 'quick-addition', title: 'Quick Addition', category: 'Math', description: 'Fast addition problems', icon: <Calculator className="w-8 h-8 text-blue-400" />, color: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'fast-subtraction', title: 'Fast Subtraction', category: 'Math', description: 'Quick subtraction', icon: <Calculator className="w-8 h-8 text-rose-400" />, color: 'bg-rose-500/10', border: 'border-rose-500/20' },
  { id: 'multiplication-sprint', title: 'Multiplication Sprint', category: 'Math', description: 'Speed multiplication', icon: <Calculator className="w-8 h-8 text-emerald-400" />, color: 'bg-emerald-500/10', border: 'border-emerald-500/20', isPremium: true },
  { id: 'division-master', title: 'Division Master', category: 'Math', description: 'Master division', icon: <Calculator className="w-8 h-8 text-amber-400" />, color: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { id: 'number-comparison', title: 'Number Comparison', category: 'Math', description: 'Which is larger?', icon: <Calculator className="w-8 h-8 text-purple-400" />, color: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'mental-math', title: 'Mental Math Challenge', category: 'Math', description: 'Mixed operations', icon: <Brain className="w-8 h-8 text-indigo-400" />, color: 'bg-indigo-500/10', border: 'border-indigo-500/20', isPremium: true },
  { id: 'equation-builder', title: 'Equation Builder', category: 'Math', description: 'Build the target number', icon: <Calculator className="w-8 h-8 text-cyan-400" />, color: 'bg-cyan-500/10', border: 'border-cyan-500/20', isPremium: true },
  { id: 'math-sequence', title: 'Math Sequence', category: 'Math', description: 'Find the missing number', icon: <Calculator className="w-8 h-8 text-pink-400" />, color: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { id: 'speed-calculation', title: 'Speed Calculation', category: 'Math', description: 'Calculate quickly', icon: <Zap className="w-8 h-8 text-yellow-400" />, color: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { id: 'missing-number', title: 'Missing Number', category: 'Math', description: 'Find the missing part', icon: <Search className="w-8 h-8 text-emerald-400" />, color: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'math-grid', title: 'Math Grid', category: 'Math', description: 'Grid-based math', icon: <Grid className="w-8 h-8 text-blue-400" />, color: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'arithmetic-race', title: 'Arithmetic Race', category: 'Math', description: 'Race against time', icon: <Activity className="w-8 h-8 text-rose-400" />, color: 'bg-rose-500/10', border: 'border-rose-500/20' },
  { id: 'calculation-memory', title: 'Calculation Memory', category: 'Math', description: 'Remember calculations', icon: <Brain className="w-8 h-8 text-purple-400" />, color: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'math-duel', title: 'Math Duel', category: 'Math', description: 'Duel with math', icon: <Target className="w-8 h-8 text-amber-400" />, color: 'bg-amber-500/10', border: 'border-amber-500/20', isPremium: true },
  // Reaction Speed Games
  { id: 'reaction-tap', title: 'Reaction Tap', category: 'Reaction Speed', description: 'Tap when green', icon: <Zap className="w-8 h-8 text-rose-400" />, color: 'bg-rose-500/10', border: 'border-rose-500/20', isPremium: true },
  { id: 'color-reaction', title: 'Color Reaction', category: 'Reaction Speed', description: 'Match color and word', icon: <Activity className="w-8 h-8 text-blue-400" />, color: 'bg-blue-500/10', border: 'border-blue-500/20', isPremium: true },
  { id: 'tap-the-target', title: 'Tap the Target', category: 'Reaction Speed', description: 'Tap targets quickly', icon: <Target className="w-8 h-8 text-emerald-400" />, color: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'fast-button', title: 'Fast Button', category: 'Processing Speed', description: 'Tap as fast as possible', icon: <Zap className="w-8 h-8 text-amber-400" />, color: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { id: 'reaction-light', title: 'Reaction Light', category: 'Reaction Speed', description: 'Traffic light reaction', icon: <Lightbulb className="w-8 h-8 text-cyan-400" />, color: 'bg-cyan-500/10', border: 'border-cyan-500/20', isPremium: true },
  { id: 'tap-when-green', title: 'Tap When Green', category: 'Reaction Speed', description: 'Wait for green', icon: <Target className="w-8 h-8 text-green-400" />, color: 'bg-green-500/10', border: 'border-green-500/20' },
  { id: 'speed-circle', title: 'Speed Circle', category: 'Reaction Speed', description: 'Tap shrinking circles', icon: <Activity className="w-8 h-8 text-purple-400" />, color: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'quick-reflex', title: 'Quick Reflex', category: 'Reaction Speed', description: 'Test your reflexes', icon: <Zap className="w-8 h-8 text-pink-400" />, color: 'bg-pink-500/10', border: 'border-pink-500/20', isPremium: true },
  { id: 'reaction-timer', title: 'Reaction Timer', category: 'Reaction Speed', description: 'Measure reaction time', icon: <Clock className="w-8 h-8 text-yellow-400" />, color: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { id: 'tap-the-moving-dot', title: 'Tap the Moving Dot', category: 'Processing Speed', description: 'Track and tap', icon: <Target className="w-8 h-8 text-emerald-400" />, color: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'reflex-challenge', title: 'Reflex Challenge', category: 'Reaction Speed', description: 'Ultimate reflex test', icon: <Zap className="w-8 h-8 text-rose-400" />, color: 'bg-rose-500/10', border: 'border-rose-500/20', isPremium: true },
  { id: 'speed-match', title: 'Speed Match', category: 'Reaction Speed', description: 'Match quickly', icon: <Activity className="w-8 h-8 text-blue-400" />, color: 'bg-blue-500/10', border: 'border-blue-500/20', isPremium: true },
  { id: 'flash-tap', title: 'Flash Tap', category: 'Reaction Speed', description: 'Tap flashing items', icon: <Lightbulb className="w-8 h-8 text-amber-400" />, color: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { id: 'quick-click', title: 'Quick Click', category: 'Processing Speed', description: 'Click as fast as you can', icon: <Target className="w-8 h-8 text-cyan-400" />, color: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { id: 'lightning-reaction', title: 'Lightning Reaction', category: 'Reaction Speed', description: 'Lightning fast taps', icon: <Zap className="w-8 h-8 text-purple-400" />, color: 'bg-purple-500/10', border: 'border-purple-500/20', isPremium: true },
  { id: 'word-builder', title: 'Word Builder', category: 'Language & Vocabulary', description: 'Build words from letters', icon: <Type className="w-8 h-8 text-indigo-400" />, color: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { id: 'word-scramble', title: 'Word Scramble', category: 'Language & Vocabulary', description: 'Unscramble the letters', icon: <Shuffle className="w-8 h-8 text-purple-400" />, color: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'vocabulary-match', title: 'Vocabulary Match', category: 'Language & Vocabulary', description: 'Match words to meanings', icon: <BookOpen className="w-8 h-8 text-emerald-400" />, color: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'letter-sequence', title: 'Letter Sequence', category: 'Language & Vocabulary', description: 'Find the next letter', icon: <ListOrdered className="w-8 h-8 text-amber-400" />, color: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { id: 'word-memory', title: 'Word Memory', category: 'Memory', description: 'Remember the words', icon: <Brain className="w-8 h-8 text-rose-400" />, color: 'bg-rose-500/10', border: 'border-rose-500/20' },
  { id: 'find-the-word', title: 'Find the Word', category: 'Language & Vocabulary', description: 'Find hidden words', icon: <Search className="w-8 h-8 text-cyan-400" />, color: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { id: 'missing-letter', title: 'Missing Letter', category: 'Language & Vocabulary', description: 'Fill in the blank', icon: <Type className="w-8 h-8 text-blue-400" />, color: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'word-puzzle', title: 'Word Puzzle', category: 'Language & Vocabulary', description: 'Solve word puzzles', icon: <Puzzle className="w-8 h-8 text-pink-400" />, color: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { id: 'word-association', title: 'Word Association', category: 'Language & Vocabulary', description: 'Link related words', icon: <Link className="w-8 h-8 text-yellow-400" />, color: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { id: 'spelling-challenge', title: 'Spelling Challenge', category: 'Language & Vocabulary', description: 'Spell correctly', icon: <CheckCircle className="w-8 h-8 text-green-400" />, color: 'bg-green-500/10', border: 'border-green-500/20', isPremium: true },
  { id: 'word-speed-test', title: 'Word Speed Test', category: 'Processing Speed', description: 'Fast word recognition', icon: <Zap className="w-8 h-8 text-orange-400" />, color: 'bg-orange-500/10', border: 'border-orange-500/20', isPremium: true },
  { id: 'letter-grid-search', title: 'Letter Grid Search', category: 'Language & Vocabulary', description: 'Search in grid', icon: <Grid className="w-8 h-8 text-purple-400" />, color: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'synonym-match', title: 'Synonym Match', category: 'Language & Vocabulary', description: 'Match synonyms', icon: <Copy className="w-8 h-8 text-indigo-400" />, color: 'bg-indigo-500/10', border: 'border-indigo-500/20', isPremium: true },
  { id: 'word-pattern', title: 'Word Pattern', category: 'Language & Vocabulary', description: 'Find word patterns', icon: <Activity className="w-8 h-8 text-rose-400" />, color: 'bg-rose-500/10', border: 'border-rose-500/20' },
  { id: 'vocabulary-builder', title: 'Vocabulary Builder', category: 'Language & Vocabulary', description: 'Learn new words', icon: <BookOpen className="w-8 h-8 text-emerald-400" />, color: 'bg-emerald-500/10', border: 'border-emerald-500/20', isPremium: true },
  // Visual & Spatial Games
  { id: 'pattern-recognition', title: 'Pattern Recognition', category: 'Pattern Recognition', description: 'Identify visual patterns', icon: <Grid className="w-8 h-8 text-indigo-400" />, color: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { id: 'mental-rotation', title: 'Mental Rotation', category: 'Visual & Spatial', description: 'Rotate objects mentally', icon: <RotateCcw className="w-8 h-8 text-rose-400" />, color: 'bg-rose-500/10', border: 'border-rose-500/20', isPremium: true },
  { id: 'spatial-reasoning', title: 'Spatial Reasoning', category: 'Visual & Spatial', description: 'Solve spatial puzzles', icon: <Box className="w-8 h-8 text-cyan-400" />, color: 'bg-cyan-500/10', border: 'border-cyan-500/20', isPremium: true },
  { id: 'symmetry-test', title: 'Symmetry Test', category: 'Visual & Spatial', description: 'Create mirror images', icon: <ScanFace className="w-8 h-8 text-blue-400" />, color: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'block-count', title: 'Block Count', category: 'Visual & Spatial', description: 'Count 3D blocks', icon: <Cuboid className="w-8 h-8 text-purple-400" />, color: 'bg-purple-500/10', border: 'border-purple-500/20', isPremium: true },
  { id: 'perfect-path', title: 'Perfect Path', category: 'Mazes & Navigation', description: 'Trace a path in grid', icon: <Route className="w-8 h-8 text-green-400" />, color: 'bg-green-500/10', border: 'border-green-500/20' },
  { id: 'layer-logic', title: 'Layer Logic', category: 'Visual & Spatial', description: 'Combine overlapping layers', icon: <Layers className="w-8 h-8 text-yellow-400" />, color: 'bg-yellow-500/10', border: 'border-yellow-500/20', isPremium: true },
  // Executive Function
  { id: 'planning', title: 'Planning', category: 'Planning & Strategy', description: 'Plan your route', icon: <Grid className="w-8 h-8 text-indigo-400" />, color: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { id: 'decision-making', title: 'Decision Making', category: 'Decision Making', description: 'Quick optimal choices', icon: <TrendingUp className="w-8 h-8 text-rose-400" />, color: 'bg-rose-500/10', border: 'border-rose-500/20', isPremium: true },
  { id: 'task-switching', title: 'Task Switching', category: 'Cognitive Flexibility', description: 'Switch contexts quickly', icon: <Activity className="w-8 h-8 text-violet-400" />, color: 'bg-violet-500/10', border: 'border-violet-500/20', isPremium: true },
  { id: 'rule-sorter', title: 'Rule Sorter', category: 'Cognitive Flexibility', description: 'Sort by changing rules', icon: <Filter className="w-8 h-8 text-cyan-400" />, color: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { id: 'go-no-go', title: 'Impulse Control', category: 'Decision Making', description: 'Go or No-Go', icon: <Target className="w-8 h-8 text-red-400" />, color: 'bg-red-500/10', border: 'border-red-500/20', isPremium: true },
  { id: 'sequence-planner', title: 'Sequence Planner', category: 'Planning & Strategy', description: 'Alternate item types', icon: <ListOrdered className="w-8 h-8 text-yellow-400" />, color: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { id: 'memory-updater', title: 'Memory Updater', category: 'Working Memory', description: 'Update memory states', icon: <RefreshCcw className="w-8 h-8 text-blue-400" />, color: 'bg-blue-500/10', border: 'border-blue-500/20', isPremium: true },
  // Creativity
  { id: 'pattern-creation', title: 'Pattern Creation', category: 'Creativity', description: 'Design symmetries', icon: <Paintbrush className="w-8 h-8 text-pink-400" />, color: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { id: 'creative-thinking', title: 'Creative Thinking', category: 'Creativity', description: 'Alternative uses', icon: <Sparkles className="w-8 h-8 text-amber-400" />, color: 'bg-amber-500/10', border: 'border-amber-500/20', isPremium: true },
  { id: 'puzzle-design', title: 'Puzzle Design', category: 'Creativity', description: 'Design paths', icon: <Box className="w-8 h-8 text-cyan-400" />, color: 'bg-cyan-500/10', border: 'border-cyan-500/20', isPremium: true },
  { id: 'color-mixer', title: 'Color Mixer', category: 'Creativity', description: 'Mix colors precisely', icon: <Palette className="w-8 h-8 text-rose-400" />, color: 'bg-rose-500/10', border: 'border-rose-500/20' },
  { id: 'emoji-story', title: 'Emoji Story', category: 'Creativity', description: 'Tell story via emoji', icon: <Smile className="w-8 h-8 text-yellow-400" />, color: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { id: 'pixel-art', title: 'Pixel Art', category: 'Creativity', description: 'Draw pixel creations', icon: <Brush className="w-8 h-8 text-indigo-400" />, color: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { id: 'shape-builder', title: 'Shape Builder', category: 'Creativity', description: 'Combine basic shapes', icon: <Shapes className="w-8 h-8 text-green-400" />, color: 'bg-green-500/10', border: 'border-green-500/20', isPremium: true },,
  // Additional Auditory Memory & Multitasking & Strategy Games
  { id: 'tone-sequence', title: 'Tone Sequence', category: 'Auditory Memory', description: 'Remember sound sequences', icon: <Activity className="w-8 h-8 text-purple-400" />, color: 'bg-purple-500/10', border: 'border-purple-500/20', isPremium: true },
  { id: 'audio-recall', title: 'Audio Recall', category: 'Auditory Memory', description: 'Recall acoustic cues', icon: <Mic className="w-8 h-8 text-cyan-400" />, color: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { id: 'dual-task', title: 'Dual Task Challenge', category: 'Multitasking', description: 'Split attention across tasks', icon: <Shuffle className="w-8 h-8 text-rose-400" />, color: 'bg-rose-500/10', border: 'border-rose-500/20', isPremium: true },
  { id: 'risk-assessment', title: 'Risk Assessment', category: 'Decision Making', description: 'Weigh odds under pressure', icon: <Target className="w-8 h-8 text-amber-400" />, color: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { id: 'strategy-quest', title: 'Strategy Quest', category: 'Planning & Strategy', description: 'Think three steps ahead', icon: <Route className="w-8 h-8 text-emerald-400" />, color: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'set-shifter', title: 'Set Shifter', category: 'Cognitive Flexibility', description: 'Adapt to rapid rule shifts', icon: <Filter className="w-8 h-8 text-violet-400" />, color: 'bg-violet-500/10', border: 'border-violet-500/20' },
];

const gameCategories = [
  { id: 'memory', title: 'Memory', description: 'Enhance recall & retention', icon: <Brain className="w-8 h-8 text-indigo-400" />, color: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { id: 'logic', title: 'Logic', description: 'Boost problem solving', icon: <Lightbulb className="w-8 h-8 text-amber-400" />, color: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { id: 'focus', title: 'Focus', description: 'Improve attention span', icon: <Target className="w-8 h-8 text-emerald-400" />, color: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'math', title: 'Math', description: 'Improve calculation speed', icon: <Calculator className="w-8 h-8 text-blue-400" />, color: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'speed', title: 'Reaction Speed', description: 'Lightning fast reflexes', icon: <Zap className="w-8 h-8 text-rose-400" />, color: 'bg-rose-500/10', border: 'border-rose-500/20' },
  { id: 'language', title: 'Language & Vocabulary', description: 'Expand vocabulary', icon: <Type className="w-8 h-8 text-cyan-400" />, color: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { id: 'visual', title: 'Visual & Spatial', description: 'Enhance spatial logic', icon: <Box className="w-8 h-8 text-indigo-400" />, color: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { id: 'observation', title: 'Observation', description: 'Sharpen your perception', icon: <Search className="w-8 h-8 text-pink-400" />, color: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { id: 'executive', title: 'Executive Function', description: 'Plan & decide', icon: <Compass className="w-8 h-8 text-violet-400" />, color: 'bg-violet-500/10', border: 'border-violet-500/20' },
  { id: 'creativity', title: 'Creativity', description: 'Express yourself', icon: <Paintbrush className="w-8 h-8 text-pink-400" />, color: 'bg-pink-500/10', border: 'border-pink-500/20' },
];

const planQuestions = [
  { id: 1, question: "q1", options: ["q1o1", "q1o2", "q1o3", "q1o4"] },
  { id: 2, question: "q2", options: ["q2o1", "q2o2", "q2o3", "q2o4"] },
  { id: 3, question: "q3", options: ["q3o1", "q3o2", "q3o3", "q3o4"] },
  { id: 4, question: "q4", options: ["q4o1", "q4o2", "q4o3", "q4o4"] },
  { id: 5, question: "q5", options: ["q5o1", "q5o2", "q5o3", "q5o4"] },
  { id: 6, question: "q6", options: ["q6o1", "q6o2", "q6o3", "q6o4"] },
  { id: 7, question: "q7", options: ["q7o1", "q7o2", "q7o3", "q7o4"] },
  { id: 8, question: "q8", options: ["q8o1", "q8o2", "q8o3", "q8o4"] },
  { id: 9, question: "q9", options: ["q9o1", "q9o2", "q9o3", "q9o4"] },
  { id: 10, question: "q10", options: ["q10o1", "q10o2", "q10o3", "q10o4"] },
];

const MOCK_USERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active', subscription: 'premium', joinDate: '2026-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'active', subscription: 'free', joinDate: '2026-02-20' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', status: 'banned', subscription: 'free', joinDate: '2026-03-05' },
  { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', status: 'active', subscription: 'pro', joinDate: '2026-03-10' },
  { id: '5', name: 'Alex Brown', email: 'alex@example.com', status: 'active', subscription: 'premium', joinDate: '2026-04-01' },
];

const MOCK_SUBSCRIPTIONS = [
  { id: 'sub_1', user: 'John Doe', plan: 'Premium', amount: '$9.99/mo', status: 'active', nextBilling: '2026-05-15' },
  { id: 'sub_2', user: 'Sarah Williams', plan: 'Pro', amount: '$19.99/mo', status: 'active', nextBilling: '2026-05-10' },
  { id: 'sub_3', user: 'Alex Brown', plan: 'Premium', amount: '$99.99/yr', status: 'active', nextBilling: '2027-04-01' },
  { id: 'sub_4', user: 'Emily Davis', plan: 'Premium', amount: '$9.99/mo', status: 'cancelled', nextBilling: '-' },
];

const MOCK_NOTIFICATIONS = [
  { id: '1', title: 'Welcome to Brainova!', message: 'Start your cognitive journey with us. Explore personalized workouts, diverse mini-games, and track your daily progress to enhance your brain health.', time: '2m ago', isRead: false },
  { id: '2', title: 'Achievement Unlocked: Early Bird', message: 'Congratulations! You have completed a workout before 8 AM. Keep up the great morning routines to stay sharp all day.', time: '1h ago', isRead: false },
  { id: '3', title: 'New Rank: Focus Novice', message: 'You have reached a new rank! Your focus and attention span are improving. Keep playing Focus games to reach the next tier.', time: '1d ago', isRead: true },
  { id: '4', title: 'Daily Streak Maintained', message: 'Awesome job maintaining your 3-day streak! Consistency is the key to cognitive improvement.', time: '2d ago', isRead: true },
];

export default function App() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    if (hour < 22) return 'Good Evening';
    return 'Good Night';
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authReady, setAuthReady] = useState(!supabase);

  const loadSessionProfile = async (session: any) => {
    if (!supabase || !session?.user) return;

    setProfileEmail(session.user.email || '');

    const { data, error } = await supabase
      .from('profiles')
      .select('name, email, language, avatar_url')
      .eq('id', session.user.id)
      .maybeSingle();

    if (error) {
      console.warn('Unable to load profile:', error.message);
      return;
    }

    if (data?.name) setProfileName(data.name);
    if (data?.email) setProfileEmail(data.email);
    if (data?.language) setLanguage(data.language as Language);
    if (data?.avatar_url) setProfilePhoto(data.avatar_url);
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setIsLoggedIn(false);
    setOnboardingStep(0);
    setProfileName('');
    setProfileEmail('');
    setProfilePhoto(null);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmationText.toLowerCase() === 'delete') {
      setIsDeleteAccountPromptOpen(false);
      setIsAccountOpen(false);
      setDeleteConfirmationText('');
      
      // Attempt to clean up Supabase if possible. Usually needs an edge function or admin token.
      if (supabase) {
        const { data } = await supabase.auth.getSession();
        if (data?.session?.user?.id) {
           // A real app would call supabase.rpc('delete_user') here or similar
        }
      }
      
      await handleLogout();
    }
  };

  useEffect(() => {
    if (!supabase) {
      setAuthReady(true);
      return;
    }

    let ignore = false;

    const applySession = async (session: any) => {
      if (ignore) return;

      if (session?.user) {
        setIsLoggedIn(true);
        setOnboardingStep(0);
        await loadSessionProfile(session);
        return;
      }

      setIsLoggedIn(false);
      setProfileName('');
      setProfileEmail('');
    };

    supabase.auth.getSession()
      .then(({ data: { session } }) => applySession(session))
      .finally(() => {
        if (!ignore) setAuthReady(true);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      void applySession(session);
    });

    return () => {
      ignore = true;
      subscription.unsubscribe();
    };
  }, []);
  const [authMode, setAuthMode] = useState<'select' | 'login' | 'signup'>('select');
  const [currentTab, setCurrentTab] = useState<'home' | 'games' | 'coach' | 'stats' | 'profile' | 'challenges'>('home');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [activeGameDetails, setActiveGameDetails] = useState<string | null>(null);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [celebrationData, setCelebrationData] = useState<{score: number, coins: number, streak?: number} | null>(null);
  const [gameSource, setGameSource] = useState<string | null>(null);

  const handleGameCompleteWrapper = (session: Omit<GameSession, 'id' | 'timestamp'>) => {
    const prevDate = stats.lastPlayedDate;
    const today = new Date().toISOString().split('T')[0];
    const isNewStreak = prevDate !== today;

    recordGame({
      ...session,
      gameId: activeGame || undefined
    });
    
    if (session.score >= 30) { // Set threshold for high score
      setCelebrationData({
        score: session.score,
        coins: Math.max(10, Math.floor(session.score / 5)),
        streak: isNewStreak ? 1 : 0
      });
    }
  };
  const [gameDifficulty, setGameDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [transitioningGame, setTransitioningGame] = useState<string | null>(null);

  const handleBackFromGame = () => {
    if (gameSource) {
      setActiveGame(gameSource);
      setGameSource(null);
    } else {
      setActiveGame(null);
    }
  };


  const handlePlayGame = (gameId: string) => {
    setActiveGameDetails(gameId);
  };

  const [likedGames, setLikedGames] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileTab, setProfileTab] = useState<'performance' | 'achievements'>('performance');
  const [activityDuration, setActivityDuration] = useState<'daily'|'monthly'|'yearly'>('daily');
  const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [adminView, setAdminView] = useState<'dashboard' | 'users' | 'subscriptions' | 'analytics' | 'settings'>('dashboard');
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isStarredGamesOpen, setIsStarredGamesOpen] = useState(false);
  const [isMyInfoOpen, setIsMyInfoOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddNewGamesOpen, setIsAddNewGamesOpen] = useState(false);
  const [showLevelUpPopup, setShowLevelUpPopup] = useState(false);
  const [leveledUpTo, setLeveledUpTo] = useState<any>(null);
  const [isModeModalOpen, setIsModeModalOpen] = useState(false);
  const [isXpRoadmapOpen, setIsXpRoadmapOpen] = useState(false);
  const [isQuestPageOpen, setIsQuestPageOpen] = useState(false);
  const [isTrainingHistoryOpen, setIsTrainingHistoryOpen] = useState(false);
  const [calendarViewDate, setCalendarViewDate] = useState(new Date());
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (dir: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = 250;
      categoryScrollRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isXpRoadmapOpen && mapContainerRef.current) {
      // Scroll to the bottom where the current level is
      mapContainerRef.current.scrollTop = mapContainerRef.current.scrollHeight;
    }
  }, [isXpRoadmapOpen]);
  const [displayMode, setDisplayMode] = useState<'light' | 'dark' | 'reading' | 'high-contrast' | 'night-light'>('dark');
  const [showAllQuickTraining, setShowAllQuickTraining] = useState(false);
  const [mixedGames, setMixedGames] = useState<typeof allGames>([]);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isRewardsHistoryOpen, setIsRewardsHistoryOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isDeleteAccountPromptOpen, setIsDeleteAccountPromptOpen] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isLpiModalOpen, setIsLpiModalOpen] = useState(false);
  const [isPlanGeneratorOpen, setIsPlanGeneratorOpen] = useState(false);
  const [planStep, setPlanStep] = useState(0);
  const [planAnswers, setPlanAnswers] = useState<Record<number, string>>({});
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<{ title: string, description: string, games: typeof allGames } | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  
  const [selectedPlan, setSelectedPlan] = useState<'1month' | '6months' | '1year' | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState<string | false>(false);

  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [signupName, setSignupName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [selectedNotification, setSelectedNotification] = useState<{id: string, title: string, message: string, time: string, isRead: boolean} | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  
  
  
  const [isEditNameOpen, setIsEditNameOpen] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [isHighScoresOpen, setIsHighScoresOpen] = useState(false);
  const [isAiAnalysisOpen, setIsAiAnalysisOpen] = useState(false);
  const [isPremiumSubscriptionOpen, setIsPremiumSubscriptionOpen] = useState(false);
  const [isPro, setIsPro] = useState(localStorage.getItem('brainova_is_pro') === 'true');
  const [isPersonalizedPlanOpen, setIsPersonalizedPlanOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isPhotoOptionsOpen, setIsPhotoOptionsOpen] = useState(false);
  const cameraInputRef = React.useRef<HTMLInputElement>(null);
  const galleryInputRef = React.useRef<HTMLInputElement>(null);

    const handleSelectMascotTheme = async (themeId: string) => {
    const avatarKey = 'avatar:' + themeId;
    setProfilePhoto(avatarKey);
    if (supabase) {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await supabase.from('profiles').update({ avatar_url: avatarKey }).eq('id', session.user.id);
      }
    }
    setIsPhotoOptionsOpen(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 150;
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
            setProfilePhoto(compressedBase64);
            
            if (supabase) {
              const { data: { session } } = await supabase.auth.getSession();
              if (session) {
                await supabase.from('profiles').update({ avatar_url: compressedBase64 }).eq('id', session.user.id);
              }
            }
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
    setIsProfileSettingsOpen(false);
    setIsPhotoOptionsOpen(false);
  };

  const handleNameSave = async () => {
    const newName = tempName.trim();
    const newEmail = tempEmail.trim();

    if (newName) setProfileName(newName);
    if (newEmail) setProfileEmail(newEmail);

    if (supabase) {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { error } = await supabase.from('profiles').upsert({
          id: session.user.id,
          name: newName || profileName,
          email: newEmail || session.user.email,
        });
        if (error) console.error('Unable to save profile:', error);
      }
    }

    setIsEditNameOpen(false);
  };
  
  const { stats, sessions, recordGame } = useProgress();
  const { entries, currentUserId, loading } = useLeaderboard();
  
  const actualUserRank = entries.findIndex(e => e.id === currentUserId) + 1;
  const displayRank = actualUserRank > 0 ? actualUserRank : '--';

  const getCategoryRank = (score: number) => {
    if (score === 0) return { level: 1, rank: 'BEGINNER', filled: 0, partial: false };
    if (score < 100) return { level: 1, rank: 'BEGINNER', filled: 0, partial: true };
    if (score < 300) return { level: 2, rank: 'BEGINNER', filled: 1, partial: true };
    if (score < 600) return { level: 3, rank: 'INTERMEDIATE', filled: 2, partial: true };
    if (score < 1000) return { level: 4, rank: 'ADVANCED', filled: 3, partial: true };
    if (score < 1500) return { level: 5, rank: 'EXPERT', filled: 4, partial: true };
    return { level: 6, rank: 'MASTER', filled: 5, partial: false };
  };

  const getUnlockedCount = () => {
    let count = 0;
    if (stats.totalGamesPlayed > 0) count++;
    if (stats.longestStreak >= 7) count++;
    if (stats.highScores?.focus >= 80) count++;
    if (stats.totalGamesPlayed > 5) count++;
    return count;
  };
  const unlockedAchievementsCount = getUnlockedCount();
  const CategoryScoreCard = ({ title, score, icon: Icon, iconColor, iconBgColor, barColor }: any) => {
    const { level, rank, filled, partial } = getCategoryRank(score);
    
    


  return (
      <div className="bg-[#1c1c1e] rounded-[20px] p-5 shadow-lg relative overflow-hidden border border-white/5 border-t-white/10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-[14px] ${iconBgColor} flex items-center justify-center`}>
              <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <span className="font-bold text-[17px] text-white">{title}</span>
          </div>
          <span className="font-bold text-[20px] text-white">{score || 0}</span>
        </div>
        <div className="flex justify-between items-end mb-2.5 px-0.5">
          <span className={`text-[11px] font-bold tracking-[0.1em] uppercase ${iconColor}`}>{t('level', language)} {level}</span>
          <span className="text-[11px] font-bold tracking-[0.1em] text-[#8a8a93] uppercase">{rank}</span>
        </div>
        <div className="h-1.5 bg-[#2a2a2c] flex rounded-md overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i} 
              className={`h-full flex-1 border-r-2 border-[#1c1c1e] last:border-r-0 ${i < filled ? barColor : (i === filled && partial ? `${barColor}/30` : 'bg-transparent')}`} 
            />
          ))}
        </div>
      </div>
    );
  };

  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const thisWeekSessions = sessions.filter(s => s.timestamp >= oneWeekAgo.getTime());
  const lastWeekSessions = sessions.filter(s => s.timestamp >= twoWeeksAgo.getTime() && s.timestamp < oneWeekAgo.getTime());

  const gamesPlayedThisWeek = thisWeekSessions.length;
  const gamesPlayedLastWeek = lastWeekSessions.length;
  const gamesPlayedDiff = gamesPlayedThisWeek - gamesPlayedLastWeek;

  const totalTimeThisWeekMs = thisWeekSessions.length * 90000; // 1.5 mins per game
  const totalTimeLastWeekMs = lastWeekSessions.length * 90000;
  const totalTimeDiffMs = totalTimeThisWeekMs - totalTimeLastWeekMs;

  const formatTime = (ms: number) => {
    if (ms === 0) return '0m';
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const formatTimeDiff = (ms: number) => {
    if (ms === 0) return '+ 0m';
    const prefix = ms > 0 ? '+ ' : '- ';
    const absMs = Math.abs(ms);
    const hours = Math.floor(absMs / (1000 * 60 * 60));
    const minutes = Math.floor((absMs % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 0) return `${prefix}${hours}h ${minutes}m`;
    return `${prefix}${minutes}m`;
  };

  const calculateAvgAccuracy = (sessionsList: any[]) => {
    const accuracyValues = sessionsList.filter(s => s.accuracy !== undefined).map(s => s.accuracy as number);
    if (accuracyValues.length === 0) return 0;
    return Math.round(accuracyValues.reduce((a, b) => a + b, 0) / accuracyValues.length);
  };

  const accuracyThisWeek = calculateAvgAccuracy(thisWeekSessions);
  const accuracyLastWeek = calculateAvgAccuracy(lastWeekSessions);
  const accuracyDiff = accuracyThisWeek - accuracyLastWeek;

  const scoreThisWeek = thisWeekSessions.length > 0 ? Math.round(thisWeekSessions.reduce((sum, s) => sum + s.score, 0) / thisWeekSessions.length) : 0;
  const scoreLastWeek = lastWeekSessions.length > 0 ? Math.round(lastWeekSessions.reduce((sum, s) => sum + s.score, 0) / lastWeekSessions.length) : 0;
  
  const scoreDiff = scoreThisWeek - scoreLastWeek;
  const scoreDiffPercent = scoreLastWeek > 0 ? Math.round((scoreDiff / scoreLastWeek) * 100) : (scoreThisWeek > 0 ? 100 : 0);

  const getActivityData = (duration: 'daily' | 'monthly' | 'yearly') => {
    const dNow = new Date();
    
    if (duration === 'daily') {
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(dNow.getTime() - i * 24 * 60 * 60 * 1000);
        days.push({
          label: d.toLocaleDateString('en-US', { weekday: 'short' }),
          dateString: d.toISOString().split('T')[0],
          xp: 0
        });
      }
      
      sessions.forEach(s => {
        const sDate = new Date(s.timestamp).toISOString().split('T')[0];
        const dayMatch = days.find(d => d.dateString === sDate);
        if (dayMatch) {
          dayMatch.xp += s.score;
        }
      });
      return days.map(d => ({ label: d.label, xp: d.xp }));
    } 
    
    if (duration === 'monthly') {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((label, i) => ({
        label,
        month: i,
        xp: 0
      }));
      
      const currentYear = dNow.getFullYear();
      sessions.forEach(s => {
        const d = new Date(s.timestamp);
        if (d.getFullYear() === currentYear) {
          months[d.getMonth()].xp += s.score;
        }
      });
      return months.map(m => ({ label: m.label, xp: m.xp }));
    }
    
    const currentYear = dNow.getFullYear();
    const years = [];
    for (let i = currentYear - 4; i <= currentYear; i++) {
      years.push({ label: String(i), year: i, xp: 0 });
    }
    
    sessions.forEach(s => {
      const d = new Date(s.timestamp);
      const yearMatch = years.find(y => y.year === d.getFullYear());
      if (yearMatch) {
        yearMatch.xp += s.score;
      }
    });
    return years.map(y => ({ label: y.label, xp: y.xp }));
  };

  const getGameStats = (gameId: string) => {
    const gameSessions = sessions.filter(s => s.gameId === gameId);
    if (gameSessions.length === 0) {
      return { bestScore: 0, avgScore: 0, accuracy: '0%' };
    }
    const bestScore = Math.max(...gameSessions.map(s => s.score));
    const avgScore = Math.round(gameSessions.reduce((sum, s) => sum + s.score, 0) / gameSessions.length);
    const accuracyValues = gameSessions.filter(s => s.accuracy !== undefined).map(s => s.accuracy!);
    const avgAccuracy = accuracyValues.length > 0
      ? Math.round(accuracyValues.reduce((sum, val) => sum + val, 0) / accuracyValues.length) + '%'
      : '0%';
    return { bestScore, avgScore, accuracy: avgAccuracy };
  };

  const currentLpi = {
    overall: Math.round(
      (Object.values(stats.highScores) as number[]).reduce((sum, score) => sum + (score || 0), 0) / 10
    ) || 0,
    speed: stats.highScores.speed || 0,
    memory: stats.highScores.memory || 0,
    focus: stats.highScores.focus || 0,
    logic: stats.highScores.logic || 0,
    math: stats.highScores.math || 0,
    language: stats.highScores.language || 0,
    visual: stats.highScores.visual || 0,
    observation: stats.highScores.observation || 0,
    executive: stats.highScores.executive || 0,
    creativity: stats.highScores.creativity || 0
  };


  const getTodayCompletedMissions = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();
    const completedTypes = new Set(
      sessions
        .filter(s => s.timestamp >= todayTimestamp)
        .map(s => s.gameType)
    );
    return ['memory', 'math', 'logic'].filter(t => completedTypes.has(t as any)).length;
  };
  const completedMissionsCount = getTodayCompletedMissions();

  const totalXP = sessions.reduce((acc, curr) => acc + curr.score, 0);

  const levelThresholds = [
    { level: 1, title: 'Beginner', maxXP: 50 },
    { level: 2, title: 'Learner', maxXP: 300 },
    { level: 3, title: 'Novice', maxXP: 1200 },
    { level: 4, title: 'Intermediate', maxXP: 2000 },
    { level: 5, title: 'Advanced', maxXP: 3000 },
    { level: 6, title: 'Expert', maxXP: 4200 },
    { level: 7, title: 'Master', maxXP: 5600 },
    { level: 8, title: 'Grandmaster', maxXP: 7200 },
    { level: 9, title: 'Legend', maxXP: 9000 },
    { level: 10, title: 'Mythic', maxXP: 11000 },
    { level: 11, title: 'Ascendant', maxXP: 14000 },
    { level: 12, title: 'Titan', maxXP: 17500 },
    { level: 13, title: 'Deity', maxXP: 21500 },
    { level: 14, title: 'Celestial', maxXP: 26000 },
    { level: 15, title: 'Astral', maxXP: 31000 },
    { level: 16, title: 'Galactic', maxXP: 36500 },
    { level: 17, title: 'Universal', maxXP: 42500 },
    { level: 18, title: 'Multiversal', maxXP: 49000 },
    { level: 19, title: 'Omnipotent', maxXP: 56000 },
    { level: 20, title: 'Ethereal', maxXP: 64000 },
    { level: 21, title: 'Transcendent', maxXP: 73000 },
    { level: 22, title: 'Apex', maxXP: 83000 },
    { level: 23, title: 'Zenith', maxXP: 94000 },
    { level: 24, title: 'Pinnacle', maxXP: 106000 },
    { level: 25, title: 'Infinite', maxXP: 1000000 }
  ];

  let currentLevelData = levelThresholds[0];
  for (let i = 0; i < levelThresholds.length; i++) {
    if (totalXP < levelThresholds[i].maxXP) {
      currentLevelData = levelThresholds[i];
      break;
    }
  }
  if (totalXP >= levelThresholds[levelThresholds.length - 1].maxXP) {
     currentLevelData = levelThresholds[levelThresholds.length - 1];
  }

  const levelProgress = Math.min(100, (totalXP / currentLevelData.maxXP) * 100);

  useEffect(() => {
    const lastSeenStr = localStorage.getItem('brainova_last_seen_level');
    const lastSeenLevel = lastSeenStr ? parseInt(lastSeenStr, 10) : 1;
    
    if (currentLevelData.level > lastSeenLevel) {
      setLeveledUpTo(currentLevelData);
      setShowLevelUpPopup(true);
      localStorage.setItem('brainova_last_seen_level', currentLevelData.level.toString());
    } else if (!lastSeenStr) {
      localStorage.setItem('brainova_last_seen_level', currentLevelData.level.toString());
    }
  }, [currentLevelData.level, currentLevelData]);
  
  const mapNodes = mapNodesBase.map((node, index) => {
    const requiredXP = parseInt(node.xp) || 0;
    const nextNode = mapNodesBase[index - 1]; // Array is sorted descending
    const nextRequiredXP = nextNode ? parseInt(nextNode.xp) || 0 : Number.POSITIVE_INFINITY;
    
    let status = 'locked';
    let progress = 0;
    
    const isFirstNode = index === mapNodesBase.length - 1;

    if (totalXP >= nextRequiredXP) {
      status = 'completed';
    } else if (totalXP >= requiredXP && totalXP < nextRequiredXP) {
      if (isFirstNode && totalXP < 100) {
        status = 'locked';
        progress = (totalXP / 100) * 100;
      } else {
        status = 'current';
        progress = ((totalXP - requiredXP) / (nextRequiredXP - requiredXP)) * 100;
      }
    } else {
      status = 'locked';
    }

    if (index === 0 && totalXP >= requiredXP) {
       status = 'current';
       progress = 100;
    }

    return { ...node, status, progress, xp: requiredXP >= 1000000 ? '1M+' : requiredXP.toString() };
  });

  const mapSegments = [];
  for (let i = mapNodes.length - 1; i > 0; i--) {
    const start = mapNodes[i];
    const end = mapNodes[i - 1];
    const midY = (start.y + end.y) / 2;
    const path = `M ${start.x} ${start.y} C ${start.x} ${midY}, ${end.x} ${midY}, ${end.x} ${end.y}`;
    
    let status = 'locked';
    let progress = 0;
    let currentPoint = null;
    let topPercent = 100;

    if (start.status === 'completed' && (end.status === 'completed' || end.status === 'current')) {
      status = 'completed';
      progress = 100;
    } else if (start.status === 'current') {
      status = 'current';
      progress = start.progress || 0;
      
      const t = progress / 100;
      const mt = 1 - t;
      const x = mt*mt*mt * start.x + 3*mt*mt*t * start.x + 3*mt*t*t * end.x + t*t*t * end.x;
      const y = mt*mt*mt * start.y + 3*mt*mt*t * midY + 3*mt*t*t * midY + t*t*t * end.y;
      currentPoint = { x, y };
      
      const totalSegments = mapNodes.length - 1;
      const currentSegmentIndex = start.id - 1;
      const overallProgress = ((currentSegmentIndex * 100) + progress) / totalSegments;
      topPercent = Math.max(1, Math.floor(100 - overallProgress));
    }

    mapSegments.push({ 
      id: i,
      path, 
      status, 
      progress, 
      currentPoint, 
      topPercent, 
      color: end.color,
      startColor: start.color,
      endColor: end.color,
      startX: start.x,
      startY: start.y,
      endX: end.x,
      endY: end.y
    });
  }

  useEffect(() => {
    // Splash logic is now handled inside the SplashAnimation component
  }, []);

  const toggleLikedGame = (gameId: string) => {
    setLikedGames(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );
  };

  // Format weekly performance for the chart
  const chartData = (() => {
    const days = [];
    const dNow = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(dNow.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = d.toISOString().split('T')[0];
      const perf = stats.weeklyPerformance.find(p => p.date === dateStr);
      days.push({
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        score: perf ? perf.score : 0
      });
    }
    return days;
  })();



  const getModeStyles = () => {
    switch (displayMode) {
      case 'light':
        return { filter: 'invert(1) hue-rotate(180deg)' };
      case 'reading':
        return { filter: 'sepia(0.6) contrast(0.9) brightness(0.9)' };
      case 'high-contrast':
        return { filter: 'contrast(1.4) saturate(1.5)' };
      case 'night-light':
        return { filter: 'sepia(0.6) hue-rotate(-30deg) saturate(1.8) brightness(0.85) contrast(0.95)' };
      default:
        return {};
    }
  };

  if (showSplash) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center relative overflow-hidden">
        <SplashAnimation onComplete={() => setShowSplash(false)} />
      </div>
    );
  }

  if (!authReady) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center font-sans">
        <div className="text-sm text-white/60">Checking your session...</div>
      </div>
    );
  }
  if (isAiAnalysisOpen) {
    return (
      <div className="flex flex-col h-[100dvh] bg-[#0a0a0c] font-sans text-white relative overflow-hidden" style={getModeStyles()}>
        <AiAnalysisPage onBack={() => setIsAiAnalysisOpen(false)} />
      </div>
    );
  }

  if (isPremiumSubscriptionOpen) {
    return (
      <div className="flex flex-col h-[100dvh] bg-[#0a0a0c] font-sans text-white relative overflow-hidden" style={getModeStyles()}>
        <PremiumSubscriptionPage 
          onBack={() => setIsPremiumSubscriptionOpen(false)} 
          onSkip={() => {
            setIsPremiumSubscriptionOpen(false);
            setIsPersonalizedPlanOpen(true);
          }} 
          onSuccess={() => {
            setIsPro(true);
            setIsPremiumSubscriptionOpen(false);
          }}
        />
      </div>
    );
  }

  if (isPersonalizedPlanOpen) {
    return (
      <div className="flex flex-col h-[100dvh] bg-[#0a0a0c] font-sans text-white relative overflow-hidden" style={getModeStyles()}>
        <PersonalizedPlanPage onBack={() => setIsPersonalizedPlanOpen(false)} />
      </div>
    );
  }


  if (isFeedbackOpen) {
    return (
      <div className="flex flex-col h-[100dvh] bg-[#0a0a0c] font-sans text-white relative overflow-hidden" style={getModeStyles()}>
        <FeedbackPage onBack={() => setIsFeedbackOpen(false)} language={language} />
      </div>
    );
  }

  if (isAchievementsOpen) {
    return (
      <div className="flex flex-col h-[100dvh] bg-[#0a0a0c] font-sans text-white relative overflow-hidden" style={getModeStyles()}>
        <AchievementsPage onBack={() => setIsAchievementsOpen(false)} stats={stats} />
      </div>
    );
  }

  if (isLeaderboardOpen) {
    return (
      <div className="flex flex-col h-[100dvh] bg-[#0a0a0c] font-sans text-white relative overflow-hidden" style={getModeStyles()}>
        <LeaderboardPage 
          onBack={() => setIsLeaderboardOpen(false)} 
          profileName={profileName} 
          entries={entries}
          loading={loading}
          currentUserId={currentUserId}
        />
      </div>
    );
  }

  if (activeGameDetails) {
    const gameInfo = allGames.find(g => g.id === activeGameDetails);
    if (gameInfo) {
      return (
        <div className="flex flex-col h-[100dvh] bg-[#0a0a0c] font-sans text-white relative overflow-hidden" style={getModeStyles()}>
          <GameDetailsView 
            game={gameInfo} 
            stats={getGameStats(gameInfo.id)}
            isLocked={(gameInfo as any).isPremium && !isPro}
            onClose={() => setActiveGameDetails(null)} 
            onPlay={(difficulty) => {
              if ((gameInfo as any).isPremium && !isPro) {
                setIsPremiumSubscriptionOpen(true);
                return;
              }
              setGameDifficulty(difficulty as 'easy' | 'medium' | 'hard');
              setActiveGameDetails(null);
              setTransitioningGame(gameInfo.id);
              setTimeout(() => {
                setActiveGame(gameInfo.id);
                setTransitioningGame(null);
              }, 400);
            }} 
            isFavorite={likedGames.includes(gameInfo.id)}
            onToggleFavorite={() => toggleLikedGame(gameInfo.id)}
          />
        </div>
      );
    }
  }

  if (isLoggedIn) {
    return (
      <GameContext.Provider value={{ gameId: activeGame, stats: activeGame ? getGameStats(activeGame) : { bestScore: 0, avgScore: 0, accuracy: '0%' } }}>
        <div className="flex flex-col h-[100dvh] bg-[#0a0a0c] font-sans text-white relative overflow-hidden" style={getModeStyles()}>
          
          {activeGame === 'todays-mission' ? (
            <TodaysMission 
              onPlay={(gameId) => {
                setGameSource('todays-mission');
                setActiveGame(gameId);
              }} 
              onBack={handleBackFromGame} 
              sessions={sessions}
            />
                    ) : activeGame === 'quick-test' ? (
            <QuickTestGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'logic', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'placement-mode' ? (
            <PlacementModeGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'logic', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'memory-sprint' ? (
            <MemorySprintGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'memory', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'math-drill' ? (
            <MathDrillGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'math', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'smart-game' ? (
            <SmartGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'logic', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'memory-grid' ? (
            <MemoryGridGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'memory', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'card-match' ? (
            <CardMatchGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'memory', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'sequence-recall' ? (
            <SequenceRecallGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'memory', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'pattern-recall' ? (
            <PatternRecallGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'memory', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'image-memory' ? (
            <ImageMemoryGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'memory', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'color-memory' ? (
            <ColorMemoryGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'memory', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'number-recall' ? (
            <NumberRecallGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'memory', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'word-recall' ? (
            <WordRecallGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'memory', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'odd-one-out' ? (
            <OddOneOutGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'focus', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'focus-tap' ? (
            <FocusTapGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'focus', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'color-match-focus' ? (
            <ColorMatchFocusGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'focus', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'sliding-puzzle' ? (
            <SlidingPuzzleGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'logic', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'pattern-logic' ? (
            <PatternLogicGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'logic', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'sequence-logic' ? (
            <SequenceLogicGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'logic', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'smart-grid' || activeGame === 'sudoku-lite' ? (
            <SmartGridPuzzleGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'logic', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'cube-rotation' ? (
            <CubeRotationPuzzleGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'logic', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'puzzle-match' ? (
            <PuzzleMatchGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'logic', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'hidden-pattern' ? (
            <HiddenPatternPuzzleGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'logic', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'quick-addition' ? (
            <MathSprintGame difficulty={gameDifficulty}  
              operation="addition"
              title="Quick Addition"
              description="Solve as many addition problems as you can in 60 seconds."
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'math', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'fast-subtraction' ? (
            <MathSprintGame difficulty={gameDifficulty}  
              operation="subtraction"
              title="Fast Subtraction"
              description="Solve as many subtraction problems as you can in 60 seconds."
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'math', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'multiplication-sprint' ? (
            <MathSprintGame difficulty={gameDifficulty}  
              operation="multiplication"
              title="Multiplication Sprint"
              description="Solve as many multiplication problems as you can in 60 seconds."
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'math', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'division-master' ? (
            <MathSprintGame difficulty={gameDifficulty}  
              operation="division"
              title="Division Master"
              description="Solve as many division problems as you can in 60 seconds."
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'math', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'mental-math' ? (
            <MathSprintGame difficulty={gameDifficulty}  
              operation="mixed"
              title="Mental Math Challenge"
              description="Solve mixed arithmetic problems as fast as you can."
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'math', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'number-comparison' ? (
            <NumberComparisonGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'math', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'equation-builder' ? (
            <EquationBuilderGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'math', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'reaction-tap' ? (
            <ReactionTapGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, reactionTime) => handleGameCompleteWrapper({ gameType: 'speed', score, difficulty: 'normal', reactionTime })}
            />
          ) : activeGame === 'color-reaction' ? (
            <ColorReactionGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'speed', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'tap-the-target' ? (
            <ReactionSpeedGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, reactionTime) => handleGameCompleteWrapper({ gameType: 'speed', score, difficulty: 'normal', reactionTime })}
            />
          ) : activeGame === 'fast-button' ? (
            <FastButtonGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'speed', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'reaction-light' ? (
            <ReactionLightGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, reactionTime) => handleGameCompleteWrapper({ gameType: 'speed', score, difficulty: 'normal', reactionTime })}
            />
          ) : activeGame === 'speed-circle' ? (
            <SpeedCircleGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'speed', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'tap-when-green' || activeGame === 'lightning-reaction' ? (
            <ReactionTapGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, reactionTime) => handleGameCompleteWrapper({ gameType: 'speed', score, difficulty: 'normal', reactionTime })}
            />
          ) : activeGame === 'quick-reflex' || activeGame === 'reflex-challenge' ? (
            <ReactionSpeedGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, reactionTime) => handleGameCompleteWrapper({ gameType: 'speed', score, difficulty: 'normal', reactionTime })}
            />
          ) : activeGame === 'reaction-timer' ? (
            <ReactionTimerGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, reactionTime) => handleGameCompleteWrapper({ gameType: 'speed', score, difficulty: 'normal', reactionTime })}
            />
          ) : activeGame === 'tap-the-moving-dot' ? (
            <TapTheMovingDotGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, reactionTime) => handleGameCompleteWrapper({ gameType: 'speed', score, difficulty: 'normal', reactionTime })}
            />
          ) : activeGame === 'speed-match' ? (
            <ColorReactionGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'speed', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'flash-tap' ? (
            <FlashTapGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, reactionTime) => handleGameCompleteWrapper({ gameType: 'speed', score, difficulty: 'normal', reactionTime })}
            />
          ) : activeGame === 'quick-click' ? (
            <FastButtonGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'speed', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'word-builder' ? (
            <WordBuilderGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'language', score, difficulty: 'normal', maxLevel })}
              gameType="builder"
            />
          ) : activeGame === 'word-scramble' ? (
            <WordBuilderGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'language', score, difficulty: 'normal', maxLevel })}
              gameType="scramble"
            />
          ) : activeGame === 'word-puzzle' ? (
            <WordBuilderGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'language', score, difficulty: 'normal', maxLevel })}
              gameType="puzzle"
            />
          ) : activeGame === 'vocabulary-match' ? (
            <VocabularyMatchGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'language', score, difficulty: 'normal', maxLevel })}
              gameType="vocabulary"
            />
          ) : activeGame === 'synonym-match' ? (
            <VocabularyMatchGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'language', score, difficulty: 'normal', maxLevel })}
              gameType="synonym"
            />
          ) : activeGame === 'word-association' ? (
            <VocabularyMatchGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'language', score, difficulty: 'normal', maxLevel })}
              gameType="association"
            />
          ) : activeGame === 'missing-letter' ? (
            <MissingLetterGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'language', score, difficulty: 'normal', maxLevel })}
              gameType="missing"
            />
          ) : activeGame === 'spelling-challenge' ? (
            <MissingLetterGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'language', score, difficulty: 'normal', maxLevel })}
              gameType="spelling"
            />
          ) : activeGame === 'find-the-word' ? (
            <WordSearchGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'language', score, difficulty: 'normal', maxLevel })}
              gameType="find"
            />
          ) : activeGame === 'letter-grid-search' ? (
            <WordSearchGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'language', score, difficulty: 'normal', maxLevel })}
              gameType="grid"
            />
          ) : activeGame === 'word-memory' ? (
            <WordMemoryGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'language', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'letter-sequence' ? (
            <WordSequenceGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'language', score, difficulty: 'normal', maxLevel })}
              gameType="sequence"
            />
          ) : activeGame === 'word-pattern' ? (
            <WordSequenceGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'language', score, difficulty: 'normal', maxLevel })}
              gameType="pattern"
            />
          ) : activeGame === 'word-speed-test' ? (
            <WordSpeedGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'language', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'vocabulary-builder' ? (
            <VocabularyBuilderGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'language', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'pattern-recognition' ? (
            <PatternRecognitionGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'visual', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'mental-rotation' ? (
            <MentalRotationGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'visual', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'spatial-reasoning' ? (
            <SpatialReasoningGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'visual', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'symmetry-test' ? (
            <SymmetryTestGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'visual', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'block-count' ? (
            <BlockCountGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'visual', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'perfect-path' ? (
            <PerfectPathGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'visual', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'layer-logic' ? (
            <LayerLogicGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'visual', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'planning' ? (
            <PlanningGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'executive', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'decision-making' ? (
            <DecisionMakingGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'executive', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'pattern-creation' ? (
            <PatternCreationGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'creativity', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'creative-thinking' ? (
            <CreativeThinkingGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'creativity', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'puzzle-design' ? (
            <PuzzleDesignGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'creativity', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'color-mixer' ? (
            <ColorMixerGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'creativity', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'emoji-story' ? (
            <EmojiStoryGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'creativity', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'pixel-art' ? (
            <PixelArtGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'creativity', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'shape-builder' ? (
            <ShapeBuilderGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'creativity', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'task-switching' ? (
            <TaskSwitchingGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'executive', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'rule-sorter' ? (
            <RuleSorterGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'executive', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'go-no-go' ? (
            <GoNoGoGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'executive', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'sequence-planner' ? (
            <SequencePlannerGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'executive', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'memory-updater' ? (
            <MemoryUpdaterGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'executive', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'spot-difference' ? (
            <SpotTheDifferenceGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'observation', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'find-hidden-object' ? (
            <FindHiddenObjectGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'observation', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'visual-search' ? (
            <VisualSearchGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'observation', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'shadow-match' ? (
            <ShadowMatchGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'observation', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'find-identical' ? (
            <FindIdenticalGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'observation', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'shape-count' ? (
            <ShapeCountGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'observation', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'color-anomaly' ? (
            <ColorAnomalyGame difficulty={gameDifficulty}
              onBack={handleBackFromGame}
              onGameComplete={(score, maxLevel) => handleGameCompleteWrapper({ gameType: 'observation', score, difficulty: 'normal', maxLevel })}
            />
          ) : activeGame === 'speed' ? (
            <ReactionSpeedGame difficulty={gameDifficulty}  
              onBack={handleBackFromGame} 
              onTrainingComplete={(score) => handleGameCompleteWrapper({ gameType: 'speed', score, difficulty: 'normal' })}
            />
          ) : activeGame === 'daily-training' ? (
            <DailyTraining 
              onBack={handleBackFromGame} 
            />
          ) : activeGame ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6">
                <Lock className="w-10 h-10 text-white/40" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{t('comingSoon', language)}</h2>
              <p className="text-white/60 mb-8">{t('inDevelopment', language)}</p>
              <button 
                onClick={() => setActiveGame(null)}
                className="bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
              >
                Go Back
              </button>
            </div>
          ) : (
            <>
              {/* Main Content Area */}
              <div className="flex-1 overflow-y-auto hide-scrollbar pb-24 relative">
                {/* Global Header Actions (Mobile-Optimized Clean Stats Pills) */}
                {currentTab !== 'profile' && (
                  <div className="px-5 pt-12 pb-2 sticky top-0 bg-[#07090e]/95 backdrop-blur-md z-30 border-b border-white/[0.04]">
                    <div className="flex justify-between items-center w-full max-w-md mx-auto">
                      <button 
                        onClick={() => setIsTrainingHistoryOpen(true)}
                        className="flex items-center gap-2 bg-[#1a120b] border border-[#cc5500]/60 px-3.5 py-1.5 rounded-full hover:bg-[#2a1b12] transition-colors cursor-pointer shadow-sm active:scale-95"
                        title="Daily Streak"
                      >
                        <Flame className="w-4 h-4 text-[#ff7a00]" strokeWidth={2.5} />
                        <span className="text-white font-bold text-sm">{stats.dailyStreak}</span>
                      </button>
                      <button 
                        onClick={() => setIsLpiModalOpen(true)}
                        className="flex items-center gap-2 bg-[#c084fc]/10 border border-[#c084fc]/30 px-3.5 py-1.5 rounded-full hover:bg-[#c084fc]/20 transition-colors cursor-pointer shadow-sm active:scale-95"
                        title="Brain Tokens"
                      >
                        <Brain className="w-4 h-4 text-[#c084fc]" />
                        <span className="text-[#c084fc] font-bold text-sm">{stats.novaCoins || 0}</span>
                      </button>
                      <button 
                        onClick={() => setIsXpRoadmapOpen(true)}
                        className="flex items-center gap-2 bg-[#3b82f6]/10 border border-[#3b82f6]/30 px-3.5 py-1.5 rounded-full hover:bg-[#3b82f6]/20 transition-colors cursor-pointer shadow-sm active:scale-95"
                        title="XP Progress"
                      >
                        <div className="w-4 h-4 bg-[#3b82f6] rounded-full flex items-center justify-center">
                          <span className="text-white font-black text-[8px]">XP</span>
                        </div>
                        <span className="text-[#3b82f6] font-bold text-sm">{totalXP}</span>
                      </button>
                    </div>
                  </div>
                )}
            
            {currentTab === 'home' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Header */}
                <div className="px-6 pt-6 pb-6 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white mb-0.5">
                      {(() => {
                        const hour = new Date().getHours();
                        let greeting = '';
                        if (hour >= 5 && hour < 12) greeting = t('goodMorning', language) === 'goodMorning' ? 'Good morning' : t('goodMorning', language);
                        else if (hour >= 12 && hour < 17) greeting = t('goodAfternoon', language) === 'goodAfternoon' ? 'Good afternoon' : t('goodAfternoon', language);
                        else if (hour >= 17 && hour < 21) greeting = t('goodEvening', language) === 'goodEvening' ? 'Good evening' : t('goodEvening', language);
                        else greeting = t('goodNight', language) === 'goodNight' ? 'Good night' : t('goodNight', language);
                        return `${greeting}, ${profileName.split(" ")[0]} 👋`;
                      })()}
                    </span>
                  </div>
                </div>

                {/* Brain Score Section removed per user request */}
                {/* Combined Daily Workout & Exercises Card */}
                <div className="px-6 mb-8">
                  <div className="relative">
                    

                    {/* Main Target Card */}
                    <div className="bg-[#0f1f1a] rounded-[24px] p-5 mb-3 border border-[#10b981]/20 flex flex-col sm:flex-row justify-between items-center gap-4 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-[#10b981]/20 blur-[50px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"></div>
                      
                      <div className="flex flex-col gap-1 z-10 w-full sm:w-auto self-start sm:self-center">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-[#10b981]/10 flex items-center justify-center border border-[#10b981]/30 relative shrink-0">
                            <div className="absolute inset-0 bg-[#10b981]/20 rounded-full animate-pulse blur-sm"></div>
                            <Target className="w-8 h-8 text-[#10b981] relative z-10" />
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-[#10b981] mb-1 leading-none">{completedMissionsCount}/3</div>
                            <p className="text-white/70 text-sm mb-2">Games Completed</p>
                            <div className="flex gap-1.5">
                              {[1, 2, 3].map((step) => (
                                <div key={step} className={`w-8 h-1.5 rounded-full ${step <= completedMissionsCount ? 'bg-[#10b981]' : 'bg-white/10'}`}></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => setActiveGame('todays-mission')}
                        className="w-full sm:w-auto bg-gradient-to-r from-[#fb923c] to-[#ea580c] text-white font-bold py-4 px-6 rounded-2xl shadow-[0_4px_16px_rgba(234,88,12,0.4)] hover:shadow-[0_6px_20px_rgba(234,88,12,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 z-10"
                      >
                        Start Workout <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                  </div>
                </div>

                {/* Challenges */}
                <div className="px-6 mb-8 mt-2">
                  <button 
                    onClick={() => setCurrentTab('challenges')}
                    className="w-full flex items-center justify-between p-4 bg-[#1a1130] border border-[#2a1b4a] rounded-[24px] hover:bg-[#231740] transition-colors group relative overflow-hidden"
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-[#1e293b] flex items-center justify-center shrink-0 border border-blue-500/20">
                        <ChallengesIcon className="w-7 h-7 text-blue-400" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-[19px] font-bold text-white mb-0.5 tracking-wide">Challenges</h3>
                        <p className="text-[15px] text-[#9ca3af]">View your cognitive overview</p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-[#4b5563] group-hover:text-white transition-colors relative z-10" />
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="px-6 mt-8">
                  <QuickActions onPlay={handlePlayGame} />
                </div>

                {/* Recommended Training */}
                <div className="px-6 mb-8 mt-8">
                  <RecommendedTraining onPlay={handlePlayGame} sessions={sessions} />
                </div>


              </motion.div>
            )}

            {currentTab === 'games' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="px-6 pt-6 pb-6">
                  <h2 className="text-3xl font-bold mb-2">{t('allGames', language)}</h2>
                  <p className="text-white/60 text-sm mb-6">{t('selectGame', language)}</p>
                  
                  <div className="flex overflow-x-auto hide-scrollbar scroll-smooth gap-4 pb-6 pt-2 -mx-6 px-6 items-center">
                    {['All', ...GAME_CATEGORIES_20].map(category => (
                      <button
                        key={category}
                        onClick={() => setActiveCategoryFilter(category)}
                        className={`whitespace-nowrap px-7 py-3 rounded-3xl font-extrabold text-[17px] transition-all duration-75 leading-none shrink-0 ${
                          activeCategoryFilter === category 
                            ? 'bg-[#10b981] text-white shadow-[0_4px_0_#059669] active:shadow-[0_0px_0_#059669] active:translate-y-[4px] -translate-y-[4px]' 
                            : 'bg-white text-[#1a1a1c] shadow-[0_4px_0_#e2e8f0] active:shadow-[0_0px_0_#e2e8f0] active:translate-y-[4px] -translate-y-[4px]'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-8 pb-24">
                  {activeCategoryFilter === 'AI Recommended' && (
                    <div key="ai-recommended">
                      <h3 className="text-xl font-bold mb-4 text-[#10b981] px-6 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        AI Recommended For You
                      </h3>
                      <GameCarousel className="flex gap-4 pb-4 px-6 hide-scrollbar">
                        {allGames.slice(0, 4).map(game => (
                          <button 
                            key={`ai-${game.id}`} 
                            onClick={() => handlePlayGame(game.id)}
                            className={`w-[calc(40vw-22px)] sm:w-[160px] shrink-0 bg-[#1a1a1c] border border-white/5 rounded-3xl p-5 flex flex-col items-start hover:bg-[#2a2a2c] transition-all duration-300 ease-in-out group text-left relative overflow-hidden snap-start ${
                              transitioningGame === game.id ? 'transform -translate-x-[200vw] opacity-0 z-50 pointer-events-none' : ''
                            }`}
                          >
                            <div 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLikedGame(game.id);
                              }}
                              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 transition-colors z-20"
                            >
                              <Heart className={`w-5 h-5 ${likedGames.includes(game.id) ? 'fill-[#ff7b54] text-[#ff7b54]' : 'text-white/40'}`} />
                            </div>
                            <div className={`w-14 h-14 rounded-2xl ${game.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${game.border} border`}>
                              {game.icon}
                            </div>
                            <h3 className="text-white font-bold mb-1 truncate w-full">{game.title}</h3>
                            <p className="text-white/50 text-xs w-full line-clamp-2">{game.description}</p>
                            {(game as any).isPremium && (
                               <div className="absolute bottom-4 right-4 z-20 opacity-60">
                                 {!isPro ? <Lock className="w-5 h-5 text-white/50" /> : <Crown className="w-5 h-5 text-[#f59e0b]" />}
                               </div>
                            )}
                          </button>
                        ))}
                      </GameCarousel>
                    </div>
                  )}

                  {activeCategoryFilter !== 'AI Recommended' && GAME_CATEGORIES_20
                    .filter(category => {
                      if (activeCategoryFilter === 'All') return true;
                      return category === activeCategoryFilter;
                    })
                    .map(category => {
                      const categoryGames = allGames.filter(g => g.category === category);
                      if (categoryGames.length === 0) return null;
                      return (
                    <div key={category}>
                      <h3 className="text-xl font-bold mb-4 text-white/80 px-6 flex items-center justify-between">
                        <span>{category} Games</span>
                        <span className="text-xs font-normal text-white/40">{categoryGames.length} games</span>
                      </h3>
                      <GameCarousel className="flex gap-4 pb-4 px-6 hide-scrollbar">
                        {allGames.filter(g => g.category === category).map(game => (
                          <button 
                            key={game.id} 
                            onClick={() => handlePlayGame(game.id)}
                            className={`w-[calc(40vw-22px)] sm:w-[160px] shrink-0 bg-[#1a1a1c] border border-white/5 rounded-3xl p-5 flex flex-col items-start hover:bg-[#2a2a2c] transition-all duration-300 ease-in-out group text-left relative overflow-hidden snap-start ${
                              transitioningGame === game.id ? 'transform -translate-x-[200vw] opacity-0 z-50 pointer-events-none' : ''
                            }`}
                          >
                            <div 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLikedGame(game.id);
                              }}
                              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 transition-colors z-20"
                            >
                              <Star className={`w-5 h-5 ${likedGames.includes(game.id) ? 'fill-yellow-400 text-yellow-400' : 'text-white/40'}`} />
                            </div>
                            <div className={`absolute top-0 right-0 w-24 h-24 ${game.color} rounded-full blur-2xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity`} />
                            <div className={`w-12 h-12 rounded-2xl ${game.color} border ${game.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative z-10`}>
                              {game.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-1 relative z-10">{game.title}</h3>
                            <p className="text-xs text-white/50 leading-relaxed relative z-10">{game.description}</p>
                            {(game as any).isPremium && (
                               <div className="absolute bottom-4 right-4 z-20 opacity-60">
                                 {!isPro ? <Lock className="w-5 h-5 text-white/50" /> : <Crown className="w-5 h-5 text-[#f59e0b]" />}
                               </div>
                            )}
                          </button>
                        ))}
                      </GameCarousel>
                    </div>
                  );})}
                </div>
              </motion.div>
            )}

            {currentTab === 'coach' && (
              <AiCoachView
                onPlayGame={handlePlayGame} 
                profileName={profileName || 'Player'} 
                onSend={() => setIsPremiumSubscriptionOpen(true)}
                onOpenProfile={() => setIsMyInfoOpen(true)}
              />
            )}

            {currentTab === 'challenges' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <ChallengesPage 
                  onBack={() => setCurrentTab('home')} 
                  onPlay={handlePlayGame} 
                  sessions={sessions}
                  stats={stats}
                  totalXP={totalXP}
                  onOpenCategories={() => setCurrentTab('games')}
                  onOpenAchievements={() => {
                    setProfileTab('achievements');
                    setCurrentTab('profile');
                  }}
                  onOpenPremium={() => setIsAdminPanelOpen(true)}
                />
              </motion.div>
            )}

            {currentTab === 'stats' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="px-6 pt-6 pb-6">
                  <h2 className="text-3xl font-bold mb-2">{t('yourProgress', language) || 'Your Progress'}</h2>
                </div>

                {/* AI Analysis Entry Card */}
                <div className="px-6 mb-6">
                  <button 
                    onClick={() => setIsAiAnalysisOpen(true)}
                    className="w-full bg-gradient-to-r from-[#4c1d95]/40 to-[#1e1b4b]/40 border border-purple-500/20 rounded-3xl p-5 flex items-center justify-between hover:bg-[#4c1d95]/50 transition-all text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                        <Brain className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">AI Analysis</h3>
                        <p className="text-sm text-white/50">View your cognitive overview</p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-white/40" />
                  </button>
                </div>

                <div className="px-6 mb-8 grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setIsTrainingHistoryOpen(true)}
                    className="bg-[#1a1a1c] rounded-3xl p-5 border border-white/5 text-left hover:bg-[#2a2a2c] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-rose-400 mb-2">
                      <Flame className="w-5 h-5" />
                      <span className="font-medium">{t('dailyStreak', language) === 'dailyStreak' ? 'Daily Streak' : t('dailyStreak', language)}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{stats.dailyStreak}</span>
                      <span className="text-white/50 text-sm">{t('days', language)}</span>
                    </div>
                  </button>
                  <div className="bg-[#1a1a1c] rounded-3xl p-5 border border-white/5">
                    <div className="flex items-center gap-2 text-indigo-400 mb-2">
                      <Trophy className="w-5 h-5" />
                      <span className="font-medium">{t('gamesPlayed', language)}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{stats.totalGamesPlayed}</span>
                    </div>
                  </div>
                </div>

                {/* Progress Chart */}
                <div className="px-6 mb-8">
                  <div className="flex items-center justify-between mb-6 relative z-20">
                    <h3 className="text-[22px] font-bold text-white tracking-tight leading-none">{t('activity', language) || 'Activity'}</h3>
                    <div className="relative">
                      <button 
                        onClick={() => setIsActivityDropdownOpen(!isActivityDropdownOpen)}
                        className="flex items-center gap-2 bg-[#121213] border border-white/5 hover:bg-[#1a1a1c] px-4 py-2 rounded-xl text-sm font-bold text-white shadow-sm transition-colors"
                      >
                        {activityDuration === 'daily' ? 'Day' : activityDuration === 'monthly' ? 'Month' : 'Year'}
                        <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-200 ${isActivityDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {isActivityDropdownOpen && (
                          <>
                            <div 
                              className="fixed inset-0 z-40" 
                              onClick={() => setIsActivityDropdownOpen(false)}
                            />
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.15 }}
                              className="absolute right-0 top-full mt-2 w-32 bg-[#1a1a1c] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 origin-top-right"
                            >
                              <div className="p-1">
                                <button 
                                  onClick={() => { setActivityDuration('daily'); setIsActivityDropdownOpen(false); }}
                                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold rounded-lg transition-colors ${activityDuration === 'daily' ? 'bg-[#2a2a2c] text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                                >
                                  Day
                                  {activityDuration === 'daily' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                                </button>
                                <button 
                                  onClick={() => { setActivityDuration('monthly'); setIsActivityDropdownOpen(false); }}
                                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold rounded-lg transition-colors ${activityDuration === 'monthly' ? 'bg-[#2a2a2c] text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                                >
                                  Month
                                  {activityDuration === 'monthly' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                                </button>
                                <button 
                                  onClick={() => { setActivityDuration('yearly'); setIsActivityDropdownOpen(false); }}
                                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold rounded-lg transition-colors ${activityDuration === 'yearly' ? 'bg-[#2a2a2c] text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                                >
                                  Year
                                  {activityDuration === 'yearly' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                                </button>
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="bg-[#121213] rounded-[24px] p-6 h-64 flex relative z-10 w-full pl-14 pt-8">
                    {/* Y-axis grid lines */}
                    {(() => {
                      const chartData = getActivityData(activityDuration);

                      const maxXP = Math.max(...chartData.map(d => d.xp), 100);

                      return (
                        <div className="relative w-full h-full flex flex-col">
                          <div className="absolute left-0 right-0 top-6 bottom-7 flex flex-col justify-between pointer-events-none z-0">
                            {[1, 0.5, 0].map((step, i) => {
                              const value = maxXP * step;
                              const displayValue = value === 0 ? '0' : (value >= 1000 ? (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : Math.round(value));
                              return (
                                <div key={i} className="relative w-full border-t border-white/5">
                                  <span className="absolute -left-12 -top-[9px] text-[10px] text-white/30 font-bold font-mono tracking-tighter w-10 text-right pr-2">
                                    {displayValue}
                                  </span>
                                </div>
                              );
                            })}
                          </div>

                          <div 
                            className="flex items-end justify-between gap-3 h-full relative z-10 w-full overflow-x-auto snap-x pb-0 pt-6"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                          >
                            <style>{`
                              div::-webkit-scrollbar {
                                display: none;
                              }
                            `}</style>
                            {chartData.map((data, i) => {
                              const heightPercent = (data.xp / maxXP) * 100;
                              return (
                                <div key={i} className="flex flex-col items-center gap-2 h-full min-w-[40px] flex-1 snap-start group cursor-pointer">
                                  <div className="w-full rounded-t-md relative flex-1 flex items-end overflow-visible">
                                    <motion.div 
                                      initial={{ height: 0 }}
                                      animate={{ height: `${heightPercent}%` }}
                                      transition={{ duration: 0.6, delay: i * 0.03, type: 'spring', bounce: 0.3 }}
                                      className="w-full rounded-t-md bg-gradient-to-t from-indigo-900/40 to-indigo-500/50 group-hover:from-indigo-600 group-hover:to-indigo-400 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-300 relative"
                                    >
                                      {/* Tooltip */}
                                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold py-1 px-2 rounded opactiy-0 scale-95 origin-bottom pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 shadow-xl z-50 shadow-black/50 invisible group-hover:visible whitespace-nowrap">
                                        {data.xp} XP
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
                                      </div>
                                    </motion.div>
                                  </div>
                                  <span className="text-[11px] text-white/30 font-bold uppercase tracking-wider h-5 flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:text-indigo-400">
                                    {data.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Circular Brain Score */}
                <div className="px-6 mb-8 mt-4">
                  <div className="bg-[#0b0b10] rounded-[24px] p-5 relative overflow-hidden border border-white/5 shadow-xl">
                    <h3 className="text-[15px] text-white font-medium mb-3 relative z-10">Brain Score</h3>
                    <div className="flex flex-col items-center justify-center relative z-10">
                      <div className="relative w-[130px] h-[130px] flex items-center justify-center mb-4 mt-0">
                        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <defs>
                            <linearGradient id="scoreGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#d946ef" />
                              <stop offset="50%" stopColor="#8b5cf6" />
                              <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                            <filter id="glow">
                              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          <circle cx="50" cy="50" r="42" fill="none" stroke="#2a2a35" strokeWidth="6" />
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="42" 
                            fill="none" 
                            stroke="url(#scoreGradient)" 
                            strokeWidth="6" 
                            strokeLinecap="round"
                            strokeDasharray="263.89" 
                            strokeDashoffset={263.89 - (263.89 * Math.min(1, currentLpi.overall / 1500))}
                            filter="url(#glow)"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-[34px] font-bold text-white leading-none tracking-tight">{currentLpi.overall}</span>
                          <span className="text-[14px] font-medium text-[#a855f7] mt-1">
                            {currentLpi.overall > 1000 ? 'Expert' : currentLpi.overall > 500 ? 'Great' : currentLpi.overall > 200 ? 'Good' : 'Beginner'}
                          </span>
                        </div>
                      </div>
                      {scoreDiff > 0 ? (
                        <div className="flex items-center gap-1.5 text-[#22c55e] font-medium text-[13px]">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>+{scoreDiff} this week</span>
                          <TrendingUp className="w-3.5 h-3.5" />
                        </div>
                      ) : scoreDiff < 0 ? (
                        <div className="flex items-center gap-1.5 text-rose-500 font-medium text-[13px]">
                          <TrendingDown className="w-3.5 h-3.5" />
                          <span>{scoreDiff} this week</span>
                          <TrendingDown className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-white/40 font-medium text-[13px]">
                          <span>No change this week</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Weekly Suggestion */}
                <div className="px-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[16px] text-white font-medium tracking-wide">Weekly Suggestion</h3>
                    <div className="bg-[#a855f7]/20 text-[#c084fc] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">AI Generated</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#1a1a1c] to-[#121213] rounded-3xl p-5 border border-white/5 relative overflow-hidden">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-[#a855f7]/10 rounded-2xl flex items-center justify-center shrink-0">
                        <Sparkles className="w-6 h-6 text-[#c084fc]" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1">Nova's Advice</h4>
                        <p className="text-sm text-white/60 leading-relaxed mb-4">Your visual scores are great, but logic is lagging slightly. I suggest focusing on problem-solving this week to balance your profile.</p>
                        <button 
                          onClick={() => setCurrentTab('coach')}
                          className="text-sm font-bold text-white bg-[#6d28d9] hover:bg-[#5b21b6] px-5 py-2.5 rounded-full transition-colors inline-flex items-center gap-2 shadow-[0_0_15px_rgba(109,40,217,0.3)]"
                        >
                          <Brain className="w-4 h-4" /> Get a Training Plan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Brain Score Trend */}
                <div className="px-6 mb-8">
                  <h3 className="text-[16px] text-white font-medium tracking-wide mb-4">Score Trend</h3>
                  <div className="bg-[#141416] rounded-3xl p-6 pb-2 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
                    <div className="flex items-baseline gap-2 mb-6 relative z-10">
                      <span className="text-[44px] font-bold text-white leading-none tracking-tight">{currentLpi.overall}</span>
                      {scoreDiffPercent > 0 ? (
                        <span className="text-emerald-400 font-bold text-[16px]">+{scoreDiffPercent}%</span>
                      ) : scoreDiffPercent < 0 ? (
                        <span className="text-rose-400 font-bold text-[16px]">{scoreDiffPercent}%</span>
                      ) : (
                        <span className="text-white/40 font-bold text-[16px]">0%</span>
                      )}
                    </div>
                    <div className="h-[120px] -mx-4 relative z-10">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData.length > 0 ? chartData : [{ day: "M", score: 0 }]}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                              <stop offset="100%" stopColor="#141416" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis 
                            dataKey="day" 
                            axisLine={{ stroke: '#ffffff', strokeOpacity: 0.1 }} 
                            tickLine={false} 
                            tick={{ fill: '#71717a', fontSize: 13, dy: 10 }} 
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#71717a', fontSize: 13, dx: -5 }} 
                            ticks={[0, 100]} 
                          />
                          <Area 
                            type="monotone" 
                            dataKey="score" 
                            stroke="#a855f7" 
                            strokeWidth={3} 
                            fillOpacity={1}
                            fill="url(#colorScore)" 
                            activeDot={{ r: 6, fill: '#a855f7', strokeWidth: 0 }} 
                            dot={{ r: 4, fill: '#141416', stroke: '#a855f7', strokeWidth: 2 }} 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Activity This Week */}
                <div className="px-6 mb-8">
                  <h3 className="text-[16px] text-white font-medium tracking-wide mb-4">Activity This Week</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {/* Games Played */}
                    <div className="bg-[#121217] border border-indigo-500/20 rounded-[20px] p-4 flex flex-col items-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-indigo-500/5" />
                      <div className="flex items-center gap-1 mb-3 w-full justify-center relative z-10">
                        <div className="w-7 h-7 rounded-full bg-indigo-500/10 flex items-center justify-center relative flex-shrink-0">
                          <Gamepad2 className="w-3.5 h-3.5 text-indigo-400 relative z-10" />
                        </div>
                        <span className="text-[10px] text-white/50 font-medium">Games Played</span>
                      </div>
                      <span className="text-[26px] font-bold text-white mt-1 mb-1 leading-none tracking-tight relative z-10">{gamesPlayedThisWeek}</span>
                      <span className={`${gamesPlayedDiff >= 0 ? 'text-emerald-400' : 'text-rose-400'} text-[13px] font-bold relative z-10`}>
                        {gamesPlayedDiff > 0 ? '+' : ''}{gamesPlayedDiff}
                      </span>
                    </div>
                    
                    {/* Total Time */}
                    <div className="bg-[#121614] border border-emerald-500/20 rounded-[20px] p-4 flex flex-col items-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-emerald-500/5" />
                      <div className="flex items-center gap-1.5 mb-3 w-full justify-center relative z-10">
                        <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center relative flex-shrink-0">
                          <Clock className="w-3.5 h-3.5 text-emerald-400 relative z-10" />
                        </div>
                        <span className="text-[11px] text-white/50 font-medium">Total Time</span>
                      </div>
                      <span className="text-[26px] font-bold text-white mt-1 mb-1 leading-none tracking-tight relative z-10">{formatTime(totalTimeThisWeekMs)}</span>
                      <span className={`${totalTimeDiffMs >= 0 ? 'text-emerald-400' : 'text-rose-400'} text-[13px] font-bold relative z-10`}>
                        {formatTimeDiff(totalTimeDiffMs)}
                      </span>
                    </div>

                    {/* Accuracy */}
                    <div className="bg-[#161311] border border-orange-500/20 rounded-[20px] p-4 flex flex-col items-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-orange-500/5" />
                      <div className="flex items-center gap-1.5 mb-3 w-full justify-center relative z-10">
                        <div className="w-7 h-7 rounded-full bg-orange-500/10 flex items-center justify-center relative flex-shrink-0">
                          <Target className="w-3.5 h-3.5 text-orange-400 relative z-10" />
                        </div>
                        <span className="text-[11px] text-white/50 font-medium whitespace-nowrap">Accuracy</span>
                      </div>
                      <span className="text-[26px] font-bold text-white mt-1 mb-1 leading-none tracking-tight relative z-10">{accuracyThisWeek}%</span>
                      <span className={`${accuracyDiff >= 0 ? 'text-emerald-400' : 'text-rose-400'} text-[13px] font-bold relative z-10`}>
                        {accuracyDiff > 0 ? '+' : ''}{accuracyDiff}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 mb-6">
                  <button 
                    onClick={() => setIsHighScoresOpen(!isHighScoresOpen)}
                    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-[#1e1536] to-[#2a1635] border border-purple-500/20 rounded-2xl mb-4 hover:from-[#251a42] hover:to-[#351c42] transition-colors shadow-[0_4px_20px_rgba(168,85,247,0.15)] group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center xl:py-2 px-2">
                        <span className="text-[18px] font-bold tracking-wide bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">{t('highScores', language)}</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-purple-400/70 group-hover:text-purple-300 transition-transform ${isHighScoresOpen ? 'rotate-90' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isHighScoresOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden space-y-4"
                      >
                        <CategoryScoreCard title={t('memoryGames', language)} score={stats.highScores.memory} icon={Brain} iconColor="text-[#818cf8]" iconBgColor="bg-[#6366f1]/10" barColor="bg-[#6366f1]" />
                        <CategoryScoreCard title={t('focusGames', language)} score={stats.highScores.focus} icon={Target} iconColor="text-[#34d399]" iconBgColor="bg-[#10b981]/10" barColor="bg-[#10b981]" />
                        <CategoryScoreCard title={t('logicGames', language)} score={stats.highScores.logic} icon={Lightbulb} iconColor="text-[#fbbf24]" iconBgColor="bg-[#f59e0b]/10" barColor="bg-[#f59e0b]" />
                        <CategoryScoreCard title={t('mathGames', language)} score={stats.highScores.math} icon={Calculator} iconColor="text-[#60a5fa]" iconBgColor="bg-[#3b82f6]/10" barColor="bg-[#3b82f6]" />
                        <CategoryScoreCard title={t('reactionSpeed', language)} score={stats.highScores.speed} icon={Zap} iconColor="text-[#fb7185]" iconBgColor="bg-[#f43f5e]/10" barColor="bg-[#f43f5e]" />
                        <CategoryScoreCard title={t('languageWord', language)} score={stats.highScores.language} icon={Type} iconColor="text-[#22d3ee]" iconBgColor="bg-[#06b6d4]/10" barColor="bg-[#06b6d4]" />
                        <CategoryScoreCard title="Visual & Spatial" score={stats.highScores.visual} icon={Box} iconColor="text-[#818cf8]" iconBgColor="bg-[#6366f1]/10" barColor="bg-[#6366f1]" />
                        <CategoryScoreCard title="Observation" score={stats.highScores.observation} icon={Search} iconColor="text-[#f472b6]" iconBgColor="bg-[#ec4899]/10" barColor="bg-[#ec4899]" />
                        <CategoryScoreCard title="Executive Function" score={stats.highScores.executive} icon={Compass} iconColor="text-[#a78bfa]" iconBgColor="bg-[#8b5cf6]/10" barColor="bg-[#8b5cf6]" />
                        <CategoryScoreCard title={t('creativity', language)} score={stats.highScores.creativity} icon={Paintbrush} iconColor="text-[#f472b6]" iconBgColor="bg-[#ec4899]/10" barColor="bg-[#ec4899]" />
                      </motion.div>
                    )}
                                    </AnimatePresence>
                </div>

                {/* Achievements Button on Progress Tab */}
                <div className="px-6 mb-6">
                  <button 
                    onClick={() => setIsAchievementsOpen(true)}
                    className="w-full flex items-center justify-between p-5 rounded-[24px] bg-[#121217] border border-white/5 hover:bg-white/5 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center">
                        <Award className="w-7 h-7 text-[#f59e0b]" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-white text-[16px] tracking-wide mb-1">Your Achievements</h3>
                        <div className="flex items-center gap-1.5 text-[14px]">
                          <span className="text-[#a855f7] font-bold">{unlockedAchievementsCount} / 34</span>
                          <span className="text-white/50 font-medium">unlocked</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/30" />
                  </button>
                </div>
              </motion.div>
            )}
            {currentTab === 'profile' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="pb-24 pt-6"
              >
                {/* Avatar & Basic Stats design update */}
                <div className="flex flex-col px-4 pt-8 pb-6 w-full border-b border-white/5">
                  <div className="bg-[#0b101a] border border-white/5 rounded-[24px] p-5 w-full">
                    {/* Top row: Avatar & details */}
                    <div className="flex justify-between items-start mb-6 w-full relative">
                      <div className="flex items-center gap-4 w-full">
                        <div 
                          className="relative w-[76px] h-[76px] shrink-0 cursor-pointer group"
                          onClick={() => {
                            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                            if (isMobile) {
                              setIsPhotoOptionsOpen(true);
                            } else {
                              galleryInputRef.current?.click();
                            }
                          }}
                        >
                          {/* Gradient Ring */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-purple-500 to-transparent rounded-full p-[2px]">
                            <div className="w-full h-full bg-[#0b101a] rounded-full overflow-hidden flex items-center justify-center p-[3px] relative">
                              <div className="w-full h-full bg-[#1b2532] rounded-full overflow-hidden shadow-inner">
                                <UserAvatar 
                                  src={profilePhoto} 
                                  name={profileName} 
                                  className="w-full h-full object-cover" 
                                  imgStyle={{ filter: displayMode === 'light' ? 'invert(1) hue-rotate(180deg)' : 'none' }} 
                                />
                              </div>
                            </div>
                          </div>
                          {/* Pencil Edit Badge */}
                          <div className="absolute bottom-0 right-0 w-7 h-7 bg-[#1b2532] border-2 border-[#0b101a] rounded-full flex items-center justify-center shadow-lg group-hover:bg-[#2c3b50] transition-colors z-20">
                            <Edit2 className="w-3.5 h-3.5 text-white/80" />
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-start pt-1 flex-1">
                          <div className="flex items-center gap-3">
                            <h2 className="text-[26px] font-bold text-white tracking-tight leading-none mb-1">{profileName}</h2>
                            <button 
                              onClick={() => {
                                setTempName(profileName);
                                setIsEditNameOpen(true);
                              }}
                              className="w-[30px] h-[30px] rounded-lg bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 text-white/70 mt-[-2px] transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="text-white/60 text-[15px]">{profileEmail || 'Not Provided'}</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => setIsProfileSettingsOpen(true)}
                        className="absolute -right-1 -top-1 p-2 text-white/50 hover:text-white transition-colors"
                      >
                        <Settings className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Badge Box */}
                    <div className="bg-gradient-to-r from-[#0d1726] to-[#0d1720] border border-white/5 rounded-[20px] p-5 relative overflow-hidden flex flex-col justify-between h-[126px]">
                       <div className="flex justify-between items-start z-10 w-full relative">
                         <div>
                           <h3 className="text-[24px] font-bold text-white mb-0.5 leading-none">Level {currentLevelData.level}</h3>
                           <p className="text-white/60 text-[15px] p-0 m-0">{currentLevelData.title}</p>
                         </div>
                         {/* Badge rendering */}
                         <div className="absolute right-0 top-0 w-20 flex items-center justify-center pointer-events-none -mt-3 mr-1">
                            {/* Glow */}
                            <div className="absolute w-[80px] h-[80px] bg-gradient-to-tr from-[#10b981]/30 to-[#34d399]/10 blur-xl rounded-full"></div>
                            
                            {/* Hexagon Shield */}
                            <div className="relative mt-1">
                                <div className="w-[60px] h-[68px] bg-gradient-to-b from-[#34d399] to-[#047857] flex justify-center items-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', padding: '2px' }}>
                                    <div className="w-full h-full bg-[#022c22] flex flex-col justify-center items-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                                        <Star className="w-6 h-6 text-white fill-white mt-0.5 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                                        <div className="w-2 h-2 rotate-45 bg-[#34d399] mt-1 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                                    </div>
                                </div>
                                <div className="absolute -left-1.5 -right-1.5 bottom-1 h-3 border-b-2 border-white/20 rounded-[50%] blur-[1px]"></div>
                            </div>
                         </div>
                       </div>

                       <div className="relative z-10 w-full mt-auto pt-4">
                         <div className="flex justify-end pr-1 text-[13px] text-white/80 font-medium mb-1.5 leading-none">
                           {totalXP} / {currentLevelData.maxXP} XP
                         </div>
                         <div className="w-full h-[6px] bg-[#1e293b] rounded-full overflow-hidden">
                            <div className="h-full bg-[#3b82f6] rounded-full shadow-[0_0_10px_rgb(59,130,246,0.5)]" style={{ width: `${levelProgress}%` }}></div>
                         </div>
                       </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-0 w-full relative mt-2">
                    <div className="absolute top-2 bottom-2 left-1/3 w-[1px] bg-white/5"></div>
                    <div className="absolute top-2 bottom-2 left-2/3 w-[1px] bg-white/5"></div>
                    
                    <button 
                      onClick={() => setIsTrainingHistoryOpen(true)}
                      className="flex flex-col items-center justify-center py-4 hover:bg-white/5 transition-colors rounded-l-xl cursor-pointer"
                    >
                      <div className="flex flex-col items-center justify-center mb-1.5">
                        <div className="flex items-center justify-center mb-1.5">
                          <Flame className="w-6 h-6 text-[#f97316] fill-[#f97316] drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                        </div>
                        <span className="text-[24px] text-[#f97316] font-bold leading-none" style={{ textShadow: '0 0 10px rgba(249,115,22,0.5)' }}>{stats.dailyStreak}</span>
                      </div>
                      <span className="text-[14px] text-[#9ca3af] font-medium">Day Streak</span>
                    </button>

                    <button 
                      onClick={() => setIsLpiModalOpen(true)}
                      className="flex flex-col items-center justify-center py-4 hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className="flex flex-col items-center justify-center mb-1.5">
                        <div className="flex items-center justify-center mb-1.5 drop-shadow-[0_0_8px_rgba(192,132,252,0.3)]">
                          <img src="/logo.png" alt="Brainova" className="w-6 h-6 brightness-0" style={{ filter: 'invert(64%) sepia(51%) saturate(2371%) hue-rotate(227deg) brightness(101%) contrast(97%)' }} onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden') }} />
                          <Brain className="w-6 h-6 text-[#c084fc] hidden" />
                        </div>
                        <span className="text-[24px] text-[#c084fc] font-bold leading-none" style={{ textShadow: '0 0 10px rgba(192,132,252,0.5)' }}>{stats.novaCoins || 0}</span>
                      </div>
                      <span className="text-[14px] text-[#9ca3af] font-medium">Nova Coins</span>
                    </button>

                    <button 
                      onClick={() => setIsXpRoadmapOpen(true)}
                      className="flex flex-col items-center justify-center py-4 hover:bg-white/5 transition-colors rounded-r-xl cursor-pointer"
                    >
                      <div className="flex flex-col items-center justify-center mb-1.5">
                        <div className="flex items-center justify-center mb-1.5 opacity-90 drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]">
                          <div className="bg-[#60a5fa] text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider text-black">XP</div>
                        </div>
                        <span className="text-[24px] text-[#60a5fa] font-bold leading-none" style={{ textShadow: '0 0 10px rgba(96,165,250,0.5)' }}>{sessions.reduce((acc, curr) => acc + curr.score, 0)}</span>
                      </div>
                      <span className="text-[14px] text-[#9ca3af] font-medium">Total XP</span>
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="px-6 mb-8">
                  <div className="flex border-b border-white/10">
                    <button 
                      onClick={() => setProfileTab('performance')}
                      className={`flex-1 pb-4 text-sm font-medium transition-colors ${profileTab === 'performance' ? 'text-white border-b-2 border-white' : 'text-white/40 hover:text-white/60'}`}
                    >
                      Leaderboard
                    </button>
                    <button 
                      onClick={() => setProfileTab('achievements')}
                      className={`flex-1 pb-4 text-sm font-medium transition-colors ${profileTab === 'achievements' ? 'text-white border-b-2 border-white' : 'text-white/40 hover:text-white/60'}`}
                    >
                      {t('Achievements', language) || 'Achievements'}
                    </button>
                  </div>
                </div>

                {/* Performance Content */}
                {profileTab === 'performance' && (
                  <div className="px-6 mb-8">
                    {/* Rankings Card */}
                    <div className="bg-[#121124] rounded-[32px] p-8 relative overflow-hidden border border-[#2a1b4a] shadow-[0_10px_40px_rgba(0,0,0,0.5)] text-center">
                      {/* Confetti / Sparkles */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-[20%] left-[20%] w-2 h-2 bg-purple-500 rotate-45 opacity-80" />
                        <div className="absolute top-[30%] left-[10%] w-1.5 h-3 bg-blue-500 -rotate-12 opacity-70" />
                        <div className="absolute top-[50%] left-[15%] w-2 h-1 bg-orange-400 rotate-45 opacity-90" />
                        <div className="absolute top-[60%] left-[25%] w-1.5 h-1.5 bg-purple-400 opacity-60" />
                        
                        <div className="absolute top-[25%] right-[20%] w-2 h-1 bg-purple-500 -rotate-45 opacity-80" />
                        <div className="absolute top-[40%] right-[10%] w-1.5 h-3 bg-purple-400 rotate-12 opacity-70" />
                        <div className="absolute top-[55%] right-[15%] w-2 h-1.5 bg-orange-400 -rotate-45 opacity-90" />
                        <div className="absolute top-[70%] right-[25%] w-2 h-2 bg-purple-600 opacity-60" />
                        
                        <div className="absolute top-[80%] left-[30%] w-1 h-2 bg-blue-400 rotate-45 opacity-50" />
                        <div className="absolute top-[75%] right-[35%] w-2 h-1 bg-purple-300 -rotate-12 opacity-50" />
                        
                        {/* Glow Behind Circle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-600/20 blur-[40px] rounded-full" />
                      </div>

                      <h3 className="text-3xl font-semibold mb-8 text-white relative z-10 tracking-tight">{t('Rankings', language) || 'Rankings'}</h3>
                      
                      <div className="flex justify-center mb-8 relative z-10">
                        {(() => {
                          return (
                            <div className="flex flex-col items-center">
                              <div className="relative w-[140px] h-[140px] flex items-center justify-center">
                                {/* Outer Glow Ring */}
                                <div className="absolute inset-0 rounded-full border-[2px] border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.4)] blur-[1px]"></div>
                                {/* Main Thick Ring */}
                                <div className="absolute inset-2 rounded-full border-[6px] border-[#a855f7] shadow-inner"></div>
                                {/* Inner Thin Ring */}
                                <div className="absolute inset-5 rounded-full border-[1px] border-cyan-400/30"></div>
                                
                                <span className="text-white font-bold text-5xl tracking-tight drop-shadow-md relative z-10">{displayRank}</span>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                      
                      <button 
                        onClick={() => setIsLeaderboardOpen(true)}
                        className="font-bold text-[13px] tracking-widest text-[#00e5ff] hover:text-white transition-colors uppercase flex items-center gap-2 justify-center w-full relative z-10 group"
                      >
                        GO TO RANKING
                        <div className="w-5 h-5 rounded-full border border-[#00e5ff] flex items-center justify-center group-hover:bg-[#00e5ff] group-hover:text-[#121124] transition-colors">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </button>
                    </div>
                  </div>
                )}
                
                {profileTab === 'achievements' && (
                  <div className="flex flex-col items-center text-center py-6 px-6">
                    <button 
                      onClick={() => setIsAchievementsOpen(true)}
                      className="w-full flex items-center justify-between p-5 rounded-[24px] bg-[#121217] border border-white/5 hover:bg-white/5 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center">
                          <Award className="w-7 h-7 text-[#f59e0b]" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-white text-[16px] tracking-wide mb-1">Your Achievements</h3>
                          <div className="flex items-center gap-1.5 text-[14px]">
                            <span className="text-[#a855f7] font-bold">{unlockedAchievementsCount} / 34</span>
                            <span className="text-white/50 font-medium">unlocked</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/30" />
                    </button>
                  </div>
                )}
                
                {/* Starred Games & Benefits at the bottom of profile */}
                <div className="px-4 mt-8 mb-4 flex flex-col gap-2">
                  <button 
                    onClick={() => setIsStarredGamesOpen(true)}
                    className="w-full flex items-center gap-4 text-left px-4 py-4 text-base text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Star className="w-5 h-5 text-white/90" />
                    </div>
                    <span className="font-medium">{t('favoriteGames', language) || 'Starred Games'}</span>
                  </button>

                  <button 
                    onClick={() => setIsMyInfoOpen(true)}
                    className="w-full flex items-center gap-4 text-left px-4 py-4 text-base text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="font-medium">Personalized Training</span>
                  </button>

                  <button 
                    onClick={() => setIsAddNewGamesOpen(true)}
                    className="w-full flex items-center gap-4 text-left px-4 py-4 text-base text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Gamepad2 className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="font-medium">Add New Games</span>
                  </button>
                  


                  <button 
                    onClick={() => setIsRewardsHistoryOpen(true)}
                    className="w-full flex items-center gap-4 text-left px-4 py-4 text-base text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Award className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="font-medium">Rewards History</span>
                  </button>

                  <button 
                    onClick={() => setIsAccountOpen(true)}
                    className="w-full flex items-center gap-4 text-left px-4 py-4 text-base text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="font-medium">Account</span>
                  </button>
                  <button 
                    onClick={() => setIsProfileSettingsOpen(true)}
                    className="w-full flex items-center gap-4 text-left px-4 py-4 text-base text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Settings className="w-5 h-5 text-white/90" />
                    </div>
                    <span className="font-medium">App Settings</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 text-left px-4 py-4 text-base text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all duration-300 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <LogOut className="w-5 h-5 text-red-400" />
                    </div>
                    <span className="font-medium">Log Out</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Training History Modal */}
            <AnimatePresence>
              {isTrainingHistoryOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                  onClick={() => setIsTrainingHistoryOpen(false)}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-[#2a3441] rounded-3xl w-full max-w-sm shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setIsTrainingHistoryOpen(false)}
                      className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
                    >
                      <X className="w-6 h-6" />
                    </button>

                    <div className="p-6 pt-8 overflow-y-auto hide-scrollbar flex-1 relative scroll-smooth">
                      <h2 className="text-2xl font-medium text-white text-center mb-6">Training History</h2>

                      <div className="flex items-center justify-between mb-6 px-2">
                        <button 
                          onClick={() => setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 1))}
                          className="p-1.5 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5 text-white/60" />
                        </button>
                        <span className="text-white font-medium text-[15px]">
                          {calendarViewDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                        </span>
                        <button 
                          onClick={() => setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 1))}
                          disabled={calendarViewDate.getMonth() === new Date().getMonth() && calendarViewDate.getFullYear() === new Date().getFullYear()}
                          className="p-1.5 bg-white/5 hover:bg-white/10 rounded-xl transition-colors disabled:opacity-30 disabled:hover:bg-white/5"
                        >
                          <ChevronRight className="w-5 h-5 text-white/60" />
                        </button>
                      </div>

                      {/* Calendar Grid */}
                      <div className="mb-8">
                        <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center mb-4">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                            <div key={i} className="text-[10px] font-bold text-white/50 uppercase tracking-wider">{day}</div>
                          ))}
                          
                          {(() => {
                            const todayDate = new Date();
                            const currentMonth = calendarViewDate.getMonth();
                            const currentYear = calendarViewDate.getFullYear();
                            
                            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
                            const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
                            
                            const calendarDays = [];
                            for (let i = 0; i < firstDayOfMonth; i++) {
                              calendarDays.push(null);
                            }
                            for (let i = 1; i <= daysInMonth; i++) {
                              const m = String(currentMonth + 1).padStart(2, '0');
                              const d = String(i).padStart(2, '0');
                              calendarDays.push(`${currentYear}-${m}-${d}`);
                            }
                            while (calendarDays.length % 7 !== 0) {
                              calendarDays.push(null);
                            }
                            
                            const todayStrLocal = todayDate.toLocaleDateString('en-CA'); // Gets YYYY-MM-DD
                            
                            // Pre-calculate streak map for the history
                            const streakMap = new Map<string, number>();
                            if (stats.streakHistory) {
                              const sorted = [...new Set(stats.streakHistory)].sort();
                              let currentStreak = 1;
                              for (let i = 0; i < sorted.length; i++) {
                                if (i === 0) {
                                  streakMap.set(sorted[i], currentStreak);
                                  continue;
                                }
                                const [y1, m1, d1] = sorted[i-1].split('-').map(Number);
                                const [y2, m2, d2] = sorted[i].split('-').map(Number);
                                const diffDays = Math.round((new Date(y2, m2 - 1, d2).getTime() - new Date(y1, m1 - 1, d1).getTime()) / 86400000);
                                
                                if (diffDays === 1) {
                                  currentStreak++;
                                } else {
                                  currentStreak = 1;
                                }
                                streakMap.set(sorted[i], currentStreak);
                              }
                            }
                            
                            return calendarDays.map((dateStr, i) => {
                              if (!dateStr) {
                                return <div key={i} className="h-8"></div>;
                              }
                              
                              const isCurrentDay = dateStr === todayStrLocal;
                              const isPastDay = dateStr < todayStrLocal;
                              const hasPlayed = stats.streakHistory && stats.streakHistory.includes(dateStr);
                              const streakAtDate = streakMap.get(dateStr) || 0;
                              const isFire = streakAtDate >= 3;
                              
                              let iconContent;
                              if (hasPlayed) {
                                iconContent = <Flame className="w-5 h-5 text-orange-500" />;
                              } else {
                                iconContent = <Flame className="w-5 h-5 text-white/30" />;
                              }
                              
                              return (
                                <div key={i} className="flex flex-col items-center justify-center h-8 relative">
                                  {iconContent}
                                  {isCurrentDay && (
                                    <div className="absolute -bottom-2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[4px] border-b-white"></div>
                                  )}
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex justify-between items-center mb-8 px-4">
                        <div className="text-center">
                          <div className={stats.dailyStreak > 0 ? "text-3xl font-light text-white mb-1" : "text-3xl font-light text-white/50 mb-1"}>{stats.dailyStreak}</div>
                          <div className="text-[10px] font-bold text-white/50 tracking-wider uppercase">CURRENT STREAK</div>
                        </div>
                        <div className="text-center">
                          <div className={stats.longestStreak > 0 ? "text-3xl font-light text-white mb-1" : "text-3xl font-light text-white/50 mb-1"}>{stats.longestStreak || stats.dailyStreak}</div>
                          <div className="text-[10px] font-bold text-white/50 tracking-wider uppercase">LONGEST STREAK</div>
                        </div>
                      </div>

                      {/* Button */}
                      <button 
                        onClick={() => {
                          setIsTrainingHistoryOpen(false);
                          setCurrentTab('stats');
                        }}
                        className="w-full py-4 bg-[#ff7b54] hover:bg-[#ff8f6e] text-white font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 mb-4"
                      >
                        More in {t('stats', language)} <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Current Date & Time */}
                      <div className="text-center text-white/40 text-[12px] font-medium tracking-wide">
                        {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* XP Roadmap Modal */}
            <AnimatePresence>
              {isXpRoadmapOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: '100%' }}
                  className="fixed inset-0 z-50 bg-[#02020a] flex flex-col"
                >
                  <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-start px-4 pt-4 pb-2 pointer-events-none">
                    <div className="flex items-center pointer-events-auto drop-shadow-md">
                      <button 
                        onClick={() => setIsXpRoadmapOpen(false)}
                        className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-black/20 hover:bg-white/10 transition-colors backdrop-blur-sm"
                      >
                        <ArrowLeft className="w-5 h-5 text-white" />
                        <span className="text-white text-sm font-medium">Back</span>
                      </button>
                    </div>
                  </div>
                  <div ref={mapContainerRef} className="flex-1 overflow-y-auto hide-scrollbar relative bg-[#02020a]">
                    <div className="relative w-full h-[4050px] max-w-md mx-auto">
                      {/* Space to Earth Background */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 400 4050" style={{ zIndex: 0 }}>
                        <defs>
                          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                            {/* Deep Space */}
                            <stop offset="0%" stopColor="#050117" />
                            <stop offset="10%" stopColor="#080226" />
                            <stop offset="20%" stopColor="#020108" />
                            {/* Transition */}
                            <stop offset="25%" stopColor="#1e1b4b" />
                            <stop offset="35%" stopColor="#1e3a8a" />
                            {/* Atmosphere to Premium Dark */}
                            <stop offset="45%" stopColor="#0c1122" />
                            <stop offset="65%" stopColor="#070a14" />
                            <stop offset="85%" stopColor="#04060d" />
                            <stop offset="100%" stopColor="#020306" />
                          </linearGradient>
                          <linearGradient id="mntBack" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#100b33" />
                            <stop offset="100%" stopColor="#060317" />
                          </linearGradient>
                          <linearGradient id="mntMid" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0b1136" />
                            <stop offset="100%" stopColor="#030412" />
                          </linearGradient>
                          <radialGradient id="groundGlow" cx="50%" cy="100%" r="50%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.05" />
                            <stop offset="100%" stopColor="#010208" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient id="greenGlow" cx="50%" cy="100%" r="50%">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                          </radialGradient>
                        </defs>

                        {/* Sky Background */}
                        <rect width="400" height="4050" fill="url(#skyGrad)" />
                        
                        {/* Stars (Only in top ~25%) */}
                        <g fill="#ffffff" opacity="0.4">
                          <circle cx="30" cy="50" r="1.5" opacity="0.8" />
                          <circle cx="80" cy="150" r="1" opacity="0.6" />
                          <circle cx="150" cy="60" r="2" opacity="0.9" />
                          <circle cx="210" cy="100" r="1" opacity="0.5" />
                          <circle cx="280" cy="40" r="1.5" opacity="0.7" />
                          <circle cx="350" cy="120" r="2" opacity="0.8" />
                          <circle cx="380" cy="200" r="1" opacity="0.4" />
                          <circle cx="50" cy="280" r="1.5" opacity="0.8" />
                          <circle cx="120" cy="350" r="1" opacity="0.5" />
                          <circle cx="250" cy="420" r="2" opacity="0.9" />
                          <circle cx="330" cy="300" r="1.5" opacity="0.6" />
                          <circle cx="180" cy="500" r="1" opacity="0.4" />
                          <circle cx="80" cy="580" r="1.5" opacity="0.7" />
                          <circle cx="290" cy="650" r="1" opacity="0.5" />
                          <circle cx="360" cy="550" r="1.5" opacity="0.8" />
                          <circle cx="140" cy="720" r="1" opacity="0.6" />
                          <circle cx="220" cy="850" r="1.5" opacity="0.5" />
                          <circle cx="310" cy="780" r="1" opacity="0.4" />
                        </g>

                        {/* Shooting stars */}
                        <path d="M50,150 L100,180" stroke="#ffffff" strokeWidth="1" opacity="0.8" strokeDasharray="1 3" />
                        <path d="M300,80 L250,110" stroke="#c084fc" strokeWidth="1.5" opacity="0.6" />

                        {/* Distant Mountains - Top */}
                        <path d="M-20,500 L60,320 L120,440 L180,280 L250,410 L330,250 L400,380 L440,290 L440,4050 L-20,4050 Z" fill="url(#mntBack)" stroke="#1e1b4b" strokeWidth="1" opacity="0.3" />
                        <path d="M-20,800 L40,650 L100,740 L160,590 L240,730 L310,610 L380,720 L440,620 L440,4050 L-20,4050 Z" fill="url(#mntMid)" stroke="#0f172a" strokeWidth="1" opacity="0.4" />
                        
                        {/* Distant Mountains - Upper Mid */}
                        <path d="M-20,1200 L50,1020 L110,1130 L190,950 L270,1100 L340,980 L410,1110 L440,1010 L440,4050 L-20,4050 Z" fill="url(#mntBack)" stroke="#1e1b4b" strokeWidth="1" opacity="0.5" />
                        
                        {/* Earthy Mountains Transition */}
                        <path d="M-20,1600 L70,1410 L130,1540 L210,1360 L290,1490 L360,1380 L430,1520 L440,1440 L440,4050 L-20,4050 Z" fill="#080b14" stroke="#080b14" strokeWidth="1" opacity="0.9" />
                        <path d="M-20,1800 L40,1620 L100,1730 L170,1560 L250,1710 L320,1590 L390,1740 L440,1630 L440,4050 L-20,4050 Z" fill="#0a0e1c" stroke="#0a0e1c" strokeWidth="1" />

                        {/* Lush Green Hills - Grasslands */}
                        <path d="M-20,2000 C 150,1800 300,2200 440,2050 L 440,4050 L -20,4050 Z" fill="#0c1224" />
                        <path d="M-20,2300 C 150,2500 300,2100 440,2350 L 440,4050 L -20,4050 Z" fill="#0e152a" />
                        <path d="M-20,2600 C 100,2400 250,2800 440,2550 L 440,4050 L -20,4050 Z" fill="#101830" />
                        <path d="M-20,2900 C 150,3100 300,2700 440,3050 L 440,4050 L -20,4050 Z" fill="#121b36" />
                        <path d="M-20,3200 C 100,3000 250,3400 440,3250 L 440,4050 L -20,4050 Z" fill="#141e3c" />
                        <path d="M-20,3500 C 150,3700 300,3300 440,3650 L 440,4050 L -20,4050 Z" fill="#162142" />
                        
                        {/* Foreground base */}
                        <path d="M-20,3800 C 100,3600 250,4000 440,3850 L 440,4050 L -20,4050 Z" fill="#182448" />
                        <path d="M-20,4100 C 150,4300 300,3900 440,4150 L 440,4050 L -20,4050 Z" fill="#1a274e" />
                        <rect width="400" height="400" y="3800" fill="url(#greenGlow)" />

                      </svg>

                      {/* SVG Paths */}
                      <svg viewBox="0 0 400 4050" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" style={{ zIndex: 10 }}>
                        <defs>
                          {mapSegments.map((segment) => (
                            <React.Fragment key={`grads-${segment.id}`}>
                              <linearGradient id={`grad-${segment.id}`} x1={segment.startX} y1={segment.startY} x2={segment.endX} y2={segment.endY} gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor={segment.startColor} />
                                <stop offset="100%" stopColor={segment.endColor} />
                              </linearGradient>
                              {segment.status === 'current' && (
                                <linearGradient id={`grad-partial-${segment.id}`} x1={segment.startX} y1={segment.startY} x2={segment.endX} y2={segment.endY} gradientUnits="userSpaceOnUse">
                                  <stop offset="0%" stopColor={segment.startColor} />
                                  <stop offset={`${segment.progress}%`} stopColor={segment.startColor} />
                                  <stop offset={`${segment.progress}%`} stopColor="transparent" />
                                  <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                              )}
                            </React.Fragment>
                          ))}
                        </defs>
                        {mapSegments.map((segment, index) => {
                          const isEarthPath = segment.endY > 1800; // Earth path vs Space path styling
                          return (
                            <g key={segment.id}>
                              {/* Background path */}
                              {(segment.status === 'locked' || segment.status === 'current') && (
                                <path
                                  d={segment.path}
                                  fill="none"
                                  stroke={isEarthPath ? "#ffffff" : `url(#grad-${segment.id})`}
                                  strokeWidth={isEarthPath ? "6" : "6"}
                                  strokeDasharray="0 20"
                                  strokeLinecap="round"
                                  opacity={isEarthPath ? "0.2" : "0.25"}
                                />
                              )}
                              
                              {/* Foreground path */}
                              {(segment.status === 'completed' || segment.status === 'current') && (
                                <path
                                  d={segment.path}
                                  fill="none"
                                  stroke={segment.status === 'current' ? `url(#grad-partial-${segment.id})` : `url(#grad-${segment.id})`}
                                  strokeWidth="6"
                                  strokeLinecap="round"
                                  style={!isEarthPath ? {
                                    filter: segment.status === 'current' ? `drop-shadow(0 0 6px ${segment.startColor})` : `drop-shadow(0 0 6px ${segment.startColor}) drop-shadow(0 0 6px ${segment.endColor})`
                                  } : {
                                    filter: `drop-shadow(0 0 6px ${segment.startColor})`
                                  }}
                                />
                              )}
                            </g>
                          )
                        })}
                      </svg>

                      {/* Brainova Marker removed */}

                      {/* Nodes */}
                      {mapNodes.map((node) => {
                        const Icon = node.icon;
                        const isCompleted = node.status === 'completed';
                        const isCurrent = node.status === 'current';
                        const isLocked = node.status === 'locked';
                        const isLeft = node.x > 200;

                        return (
                          <div
                            key={node.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center"
                            style={{ left: `${(node.x / 400) * 100}%`, top: `${(node.y / 4050) * 100}%`, zIndex: 10 }}
                          >
                            
                            <div className="relative">
                              <AnimatePresence>
                                {activeTooltip === node.id && isLocked && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-max max-w-[200px] bg-[#1c1c24] border border-white/10 rounded-xl p-3 shadow-xl z-50 pointer-events-none"
                                  >
                                    <div className="flex items-center gap-2 mb-1">
                                      <Lock className="w-4 h-4 text-white/60" />
                                      <span className="font-bold text-sm text-white">Locked</span>
                                    </div>
                                    <p className="text-xs text-white/70">
                                      You need <span className="font-bold" style={{ color: node.color }}>{node.id === 1 ? '100' : node.xp} XP</span> to unlock this level.
                                    </p>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-8 border-transparent border-t-[#1c1c24]"></div>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white/10 -z-10 mt-[1px]"></div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                              
                              {(node.id === 25 || node.id === 20 || node.id === 15 || node.id === 10 || node.id === 5) && (
                                <motion.div
                                  animate={{ y: [0, -8, 0] }}
                                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                  className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none z-30"
                                >
                                  {node.id === 25 ? (
                                    <Crown className="w-10 h-10 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] fill-yellow-400" strokeWidth={1.5} />
                                  ) : node.id === 20 ? (
                                    <Gem className="w-10 h-10 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] fill-yellow-400" strokeWidth={1.5} />
                                  ) : node.id === 15 ? (
                                    <Rocket className="w-10 h-10 text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,0.8)] fill-orange-400" strokeWidth={1.5} />
                                  ) : node.id === 10 ? (
                                    <Trophy className="w-10 h-10 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)] fill-yellow-500" strokeWidth={1.5} />
                                  ) : (
                                    <Star className="w-10 h-10 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] fill-yellow-400" strokeWidth={1.5} />
                                  )}
                                </motion.div>
                              )}
                              
                              <button
                                onMouseEnter={() => isLocked && setActiveTooltip(node.id)}
                                onMouseLeave={() => setActiveTooltip(null)}
                                onClick={() => isLocked ? setActiveTooltip(node.id === activeTooltip ? null : node.id) : setSelectedLevel(node)}
                                className={`
                                  relative rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg border-[3px] border-transparent
                                `}
                                style={{
                                  width: isCurrent ? '64px' : isCompleted ? '56px' : '48px',
                                  height: isCurrent ? '64px' : isCompleted ? '56px' : '48px',
                                  backgroundColor: isCompleted ? node.color : '#0A0A10',
                                  borderColor: isCurrent ? '#ffffff' : node.color,
                                  boxShadow: isCompleted || isCurrent ? `0 0 25px ${node.color}` : `0 0 10px ${node.color}40`,
                                  zIndex: isCurrent ? 20 : 10
                                }}
                              >
                                {isCompleted ? (
                                  <Icon className="w-8 h-8 text-white drop-shadow-md" style={{ filter: `drop-shadow(0 0 8px ${node.color})` }} strokeWidth={2.5} />
                                ) : isCurrent ? (
                                  <div className="absolute inset-[3px] rounded-full flex items-center justify-center bg-[#0a0a10]">
                                    <Icon className="w-7 h-7" style={{ color: node.color, filter: `drop-shadow(0 0 10px ${node.color})` }} strokeWidth={2.5} />
                                  </div>
                                ) : (
                                  <Lock className="w-5 h-5" style={{ color: '#ffffff' }} />
                                )}
                              </button>
                            </div>
                            
                            {/* Label */}
                            <div className={`absolute whitespace-nowrap flex flex-col ${node.labelPos === 'left' ? 'right-full mr-5 items-end' : 'left-full ml-5 items-start'}`}>
                              <span className="font-bold text-[17px] drop-shadow-md" style={{ color: node.labelColor || node.color }}>
                                {node.id} {node.title}
                              </span>
                              <span className="text-[13px] font-medium text-white/60 drop-shadow-md">
                                {isCurrent || (isLocked && node.id === 1 && totalXP < 50) ? (node.id === 1 && totalXP < 50 ? `${totalXP} / 50 XP` : `${totalXP - (parseInt(node.xp) || 0)} / ${parseInt(node.maxXP || node.xp) - (parseInt(node.xp) || 0)} XP`) : node.status === 'completed' ? '' : `${node.xp} XP`}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mode Modal */}
            <AnimatePresence>
              {isModeModalOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: '100%' }}
                  className="fixed inset-0 z-50 bg-[#0a0a0c] flex flex-col"
                >
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <Moon className="w-6 h-6 text-indigo-400" />
                      <h2 className="text-xl font-bold text-indigo-400">{t('changeMode', language)}</h2>
                    </div>
                    <button 
                      onClick={() => setIsModeModalOpen(false)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 gap-4">
                      <button 
                        onClick={() => {
                          setDisplayMode('light');
                          setIsModeModalOpen(false);
                        }}
                        className={`flex items-center gap-4 p-4 rounded-2xl border ${displayMode === 'light' ? 'bg-indigo-500/20 border-indigo-500' : 'bg-[#1a1a1c] border-white/5 hover:bg-[#2a2a2c]'} transition-colors text-left`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${displayMode === 'light' ? 'bg-indigo-500 text-white' : 'bg-white/10 text-white/60'}`}>
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">Light Mode</h3>
                          <p className="text-sm text-white/60">Standard bright mode for well-lit environments.</p>
                        </div>
                      </button>
                      
                      <button 
                        onClick={() => {
                          setDisplayMode('dark');
                          setIsModeModalOpen(false);
                        }}
                        className={`flex items-center gap-4 p-4 rounded-2xl border ${displayMode === 'dark' ? 'bg-indigo-500/20 border-indigo-500' : 'bg-[#1a1a1c] border-white/5 hover:bg-[#2a2a2c]'} transition-colors text-left`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${displayMode === 'dark' ? 'bg-indigo-500 text-white' : 'bg-white/10 text-white/60'}`}>
                          <Moon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold flex items-center gap-2 mb-1 text-white">
                            Dark Mode
                            <span className="px-2 py-0.5 rounded border border-indigo-500/30 bg-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
                              Recommended
                            </span>
                          </h3>
                          <p className="text-sm text-white/60">Dark theme for low-light environments and eye comfort.</p>
                        </div>
                      </button>

                      <button 
                        onClick={() => {
                          setDisplayMode('reading');
                          setIsModeModalOpen(false);
                        }}
                        className={`flex items-center gap-4 p-4 rounded-2xl border ${displayMode === 'reading' ? 'bg-indigo-500/20 border-indigo-500' : 'bg-[#1a1a1c] border-white/5 hover:bg-[#2a2a2c]'} transition-colors text-left`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${displayMode === 'reading' ? 'bg-indigo-500 text-white' : 'bg-white/10 text-white/60'}`}>
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">Reading Mode</h3>
                          <p className="text-sm text-white/60">Warmer, sepia-like tone to reduce blue light and eye strain.</p>
                        </div>
                      </button>

                      <button 
                        onClick={() => {
                          setDisplayMode('high-contrast');
                          setIsModeModalOpen(false);
                        }}
                        className={`flex items-center gap-4 p-4 rounded-2xl border ${displayMode === 'high-contrast' ? 'bg-indigo-500/20 border-indigo-500' : 'bg-[#1a1a1c] border-white/5 hover:bg-[#2a2a2c]'} transition-colors text-left`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${displayMode === 'high-contrast' ? 'bg-indigo-500 text-white' : 'bg-white/10 text-white/60'}`}>
                          <Activity className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">High Contrast / Vivid</h3>
                          <p className="text-sm text-white/60">Maximizes visibility and productivity with distinct colors.</p>
                        </div>
                      </button>

                      <button 
                        onClick={() => {
                          setDisplayMode('night-light');
                          setIsModeModalOpen(false);
                        }}
                        className={`flex items-center gap-4 p-4 rounded-2xl border ${displayMode === 'night-light' ? 'bg-indigo-500/20 border-indigo-500' : 'bg-[#1a1a1c] border-white/5 hover:bg-[#2a2a2c]'} transition-colors text-left`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${displayMode === 'night-light' ? 'bg-indigo-500 text-white' : 'bg-white/10 text-white/60'}`}>
                          <Lightbulb className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">Night Light</h3>
                          <p className="text-sm text-white/60">Warmer screen colors to help you fall asleep easier.</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Starred Games Modal */}
            <AnimatePresence>
              {isStarredGamesOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: '100%' }}
                  className="fixed inset-0 z-50 bg-[#0a0a0c] flex flex-col"
                >
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                      <h2 className="text-xl font-bold text-yellow-400">{t('favoriteGames', language)}</h2>
                    </div>
                    <button 
                      onClick={() => setIsStarredGamesOpen(false)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6">
                    {likedGames.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <Star className="w-16 h-16 text-white/20 mb-4" />
                        <h3 className="text-xl font-bold mb-2">{t('favoriteGames', language)}</h3>
                        <p className="text-white/60 max-w-xs">{t('noStarredGames', language) || 'You have not starred any games yet. Star games to see them here.'}</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {allGames.filter(g => likedGames.includes(g.id)).map((game, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => {
                              setIsStarredGamesOpen(false);
                              handlePlayGame(game.id);
                            }}
                            className="bg-[#1a1a1c] rounded-2xl p-4 border border-white/5 hover:bg-[#2a2a2c] transition-colors cursor-pointer group relative"
                          >
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLikedGame(game.id);
                              }}
                              className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white/10 transition-colors z-10"
                            >
                              <Star className={`w-4 h-4 ${likedGames.includes(game.id) ? 'fill-yellow-400 text-yellow-400' : 'text-white/40'}`} />
                            </button>
                            {(game as any).isPremium && (
                              <div className="absolute bottom-4 right-4 z-20 opacity-60">
                                {!isPro ? <Lock className="w-5 h-5 text-white/50" /> : <Crown className="w-5 h-5 text-[#f59e0b]" />}
                              </div>
                            )}
                            <div className={`w-12 h-12 rounded-xl ${game.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                              {game.icon}
                            </div>
                            <h4 className="font-bold mb-1 truncate">{game.title}</h4>
                            <p className="text-xs text-white/60 truncate">{game.category}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Rewards History Modal */}
            <AnimatePresence>
              {isRewardsHistoryOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: '100%' }}
                  className="fixed inset-0 z-50 bg-[#0a0a0c] flex flex-col"
                >
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a0c]">
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-purple-400" />
                      <h2 className="text-xl font-bold text-white">Rewards History</h2>
                    </div>
                    <button 
                      onClick={() => setIsRewardsHistoryOpen(false)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto px-6 py-8 hide-scrollbar">
                    <div className="max-w-md mx-auto w-full space-y-4">
                      {stats.rewardsHistory && stats.rewardsHistory.length > 0 ? (
                        stats.rewardsHistory.map((reward) => (
                          <div key={reward.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-white font-bold text-[17px]">{reward.title}</span>
                              <span className="text-white/60 text-sm">
                                {new Date(reward.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-green-400 font-bold">+{reward.amount}</span>
                              <Gem className="w-5 h-5 text-[#8b5cf6]" />
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center pt-8 pb-4">
                          <p className="text-white/60 text-sm">No rewards yet. Play games to earn gems!</p>
                        </div>
                      )}

                      {stats.rewardsHistory && stats.rewardsHistory.length > 0 && (
                        <div className="mt-8 text-center pt-4">
                          <p className="text-white/40 text-sm">That's all your rewards so far!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Personalized Training Modal */}
            <AnimatePresence>
              {isMyInfoOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: '100%' }}
                  className="fixed inset-0 z-50 bg-[#0a0a0c] flex flex-col"
                >
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <User className="w-6 h-6 text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Personalized Training</h2>
                    </div>
                    <button 
                      onClick={() => setIsMyInfoOpen(false)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                    

                    <div className="bg-[#1a1a1c] border border-white/10 rounded-2xl p-6 relative">
                      <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Personalized Training Profile</h3>
                        <button 
                          onClick={() => {
                            setIsEditingProfile(!isEditingProfile);
                          }}
                          className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 rounded-xl transition-colors flex items-center gap-2 text-sm font-semibold"
                        >
                          <Edit2 className="w-4 h-4" /> {isEditingProfile ? "Save Changes" : "Edit Info"}
                        </button>
                      </div>
                      
                      {Object.keys(planAnswers).length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center bg-white/5 rounded-xl border border-white/10">
                          <Brain className="w-12 h-12 text-indigo-400 mb-4 opacity-50" />
                          <h4 className="text-lg font-bold text-white mb-2">No Training Profile Found</h4>
                          <p className="text-white/60 mb-6 max-w-sm mx-auto">Take our 10-question assessment so Brainova AI can design a personalized cognitive training program just for you.</p>
                          <button 
                            onClick={() => {
                              setPlanStep(0);
                              setIsPlanGeneratorOpen(true);
                              setIsMyInfoOpen(false);
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2"
                          >
                            <Bot className="w-5 h-5" /> Start AI Assessment
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div onClick={() => setIsPlanGeneratorOpen(true)} className="mb-6 p-5 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-purple-500/20 border border-indigo-500/20 rounded-2xl flex items-center gap-4 cursor-pointer transition-colors">
                            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                               <Sparkles className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div>
                               <h4 className="font-bold text-indigo-300">AI Recommendation Active</h4>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {planQuestions.map((q, idx) => {
                               if (!planAnswers[idx]) return null;
                               return (
                                <div key={q.id} className="bg-[#2a2a2c] p-4 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-colors flex flex-col justify-center">
                                  <p className="text-xs text-white/50 mb-1.5 line-clamp-1">{t(q.question, language)}</p>
                                  {isEditingProfile ? (
                                    <select 
                                      value={planAnswers[idx]} 
                                      onChange={(e) => setPlanAnswers({ ...planAnswers, [idx]: e.target.value })}
                                      className="w-full bg-[#1a1a1c] border border-white/10 rounded-lg p-2 text-white outline-none focus:border-indigo-500 text-[15px] mt-1"
                                    >
                                      {q.options.map(opt => (
                                        <option key={opt} value={opt}>{t(opt, language)}</option>
                                      ))}
                                    </select>
                                  ) : (
                                    <p className="text-[15px] font-semibold text-white/90">
                                      {t(planAnswers[idx], language)}
                                    </p>
                                  )}
                                </div>
                               )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Add New Games Modal */}
            <AnimatePresence>
              {isAddNewGamesOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: '100%' }}
                  className="fixed inset-0 z-50 bg-[#0a0a0c] flex flex-col"
                >
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <Gamepad2 className="w-6 h-6 text-green-400" />
                      <h2 className="text-xl font-bold text-white">Add New Games</h2>
                    </div>
                    <button 
                      onClick={() => setIsAddNewGamesOpen(false)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center flex-start pt-12 text-center gap-6">
                    <h3 className="text-xl font-bold text-white mb-2 px-4 leading-relaxed">What kind of brain game do you want next? Tell us on Instagram</h3>
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center my-4">
                      <Gamepad2 className="w-12 h-12 text-white/50" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-white">Coming Soon</h3>
                      <p className="text-white/60 max-w-sm">We are working hard to bring you more exciting games. Stay tuned!</p>
                    </div>
                    <a 
                      href="https://instagram.com/brainova.in" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-6 flex items-center gap-2 px-6 py-3 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 rounded-full text-white font-bold hover:shadow-lg transition-all transform hover:scale-105"
                    >
                      <Instagram className="w-5 h-5" />
                      brainova.in Profile
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Admin Panel Modal */}
            <AnimatePresence>
              {isAdminPanelOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: '100%' }}
                  className="fixed inset-0 z-50 bg-[#0a0a0c] flex flex-col"
                >
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      {adminView !== 'dashboard' && (
                        <button 
                          onClick={() => setAdminView('dashboard')}
                          className="p-1 rounded-full hover:bg-white/10 transition-colors mr-2"
                        >
                          <ArrowLeft className="w-5 h-5 text-white/70" />
                        </button>
                      )}
                      <Lock className="w-6 h-6 text-emerald-400" />
                      <h2 className="text-xl font-bold text-emerald-400">
                        {adminView === 'dashboard' ? t('adminPanel', language) : 
                         adminView === 'users' ? 'Manage Users' : 
                         adminView === 'subscriptions' ? 'Subscriptions' : 
                         adminView === 'analytics' ? 'Analytics' : 'System Config'}
                      </h2>
                    </div>
                    <button 
                      onClick={() => {
                        setIsAdminPanelOpen(false);
                        setTimeout(() => setAdminView('dashboard'), 300);
                      }}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6">
                    {adminView === 'dashboard' && (
                      <>
                        <div className="bg-[#1a1a1c] border border-white/10 rounded-2xl p-6 mb-6">
                          <h3 className="text-lg font-bold mb-4">{t('systemStatus', language)}</h3>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-white/60">{t('server', language)}</span>
                              <span className="text-emerald-400 font-medium flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                Online
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-white/60">{t('activeUsers', language)}</span>
                              <span className="font-medium">1,248</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-white/60">{t('databaseLoad', language)}</span>
                              <span className="font-medium text-yellow-400">42%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-[#1a1a1c] border border-white/10 rounded-2xl p-6">
                          <h3 className="text-lg font-bold mb-4">{t('quickActions', language)}</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <button 
                              onClick={() => setAdminView('users')}
                              className="bg-white/5 hover:bg-white/10 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors"
                            >
                              <User className="w-6 h-6 text-cyan-400" />
                              <span className="text-sm font-medium">{t('manageUsers', language)}</span>
                            </button>
                            <button 
                              onClick={() => setAdminView('subscriptions')}
                              className="bg-white/5 hover:bg-white/10 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors"
                            >
                              <CircleDollarSign className="w-6 h-6 text-green-400" />
                              <span className="text-sm font-medium">Subscriptions</span>
                            </button>
                            <button 
                              onClick={() => setAdminView('analytics')}
                              className="bg-white/5 hover:bg-white/10 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors"
                            >
                              <Activity className="w-6 h-6 text-orange-400" />
                              <span className="text-sm font-medium">{t('analytics', language)}</span>
                            </button>
                            <button 
                              onClick={() => setAdminView('settings')}
                              className="bg-white/5 hover:bg-white/10 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors"
                            >
                              <Settings className="w-6 h-6 text-white" />
                              <span className="text-sm font-medium">{t('systemConfig', language)}</span>
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {adminView === 'users' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-6">
                          <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                            <input 
                              type="text" 
                              placeholder="Search users..." 
                              className="w-full bg-[#1a1a1c] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                            />
                          </div>
                          <button className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-500/30 transition-colors ml-4">
                            Export CSV
                          </button>
                        </div>
                        
                        <div className="bg-[#1a1a1c] border border-white/10 rounded-2xl overflow-hidden">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-white/5 border-b border-white/10">
                              <tr>
                                <th className="px-6 py-4 font-medium text-white/60">Name</th>
                                <th className="px-6 py-4 font-medium text-white/60">Email</th>
                                <th className="px-6 py-4 font-medium text-white/60">Status</th>
                                <th className="px-6 py-4 font-medium text-white/60">Plan</th>
                                <th className="px-6 py-4 font-medium text-white/60">Joined</th>
                                <th className="px-6 py-4 font-medium text-white/60 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                              {MOCK_USERS.map(user => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                  <td className="px-6 py-4 font-medium">{user.name}</td>
                                  <td className="px-6 py-4 text-white/60">{user.email}</td>
                                  <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                      {user.status}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 capitalize">{user.subscription}</td>
                                  <td className="px-6 py-4 text-white/60">{user.joinDate}</td>
                                  <td className="px-6 py-4 text-right">
                                    <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                                      <Edit2 className="w-4 h-4 text-white/60" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {adminView === 'subscriptions' && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="bg-[#1a1a1c] border border-white/10 rounded-2xl p-4">
                            <h4 className="text-white/60 text-sm mb-1">Total Revenue</h4>
                            <p className="text-2xl font-bold text-emerald-400">$12,450</p>
                          </div>
                          <div className="bg-[#1a1a1c] border border-white/10 rounded-2xl p-4">
                            <h4 className="text-white/60 text-sm mb-1">Active Subs</h4>
                            <p className="text-2xl font-bold text-blue-400">842</p>
                          </div>
                          <div className="bg-[#1a1a1c] border border-white/10 rounded-2xl p-4">
                            <h4 className="text-white/60 text-sm mb-1">Churn Rate</h4>
                            <p className="text-2xl font-bold text-red-400">2.4%</p>
                          </div>
                        </div>

                        <div className="bg-[#1a1a1c] border border-white/10 rounded-2xl overflow-hidden">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-white/5 border-b border-white/10">
                              <tr>
                                <th className="px-6 py-4 font-medium text-white/60">User</th>
                                <th className="px-6 py-4 font-medium text-white/60">Plan</th>
                                <th className="px-6 py-4 font-medium text-white/60">Amount</th>
                                <th className="px-6 py-4 font-medium text-white/60">Status</th>
                                <th className="px-6 py-4 font-medium text-white/60">Next Billing</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                              {MOCK_SUBSCRIPTIONS.map(sub => (
                                <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                                  <td className="px-6 py-4 font-medium">{sub.user}</td>
                                  <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${sub.plan === 'Pro' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                      {sub.plan}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-white/80">{sub.amount}</td>
                                  <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${sub.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/60'}`}>
                                      {sub.status}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-white/60">{sub.nextBilling}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {(adminView === 'analytics' || adminView === 'settings') && (
                      <div className="flex flex-col items-center justify-center h-64 text-center">
                        <Settings className="w-16 h-16 text-white/20 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
                        <p className="text-white/60 max-w-xs">This section is currently under development. Please check back later.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Plan Generator Modal */}
            <AnimatePresence>
              {isPlanGeneratorOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm"
                  onClick={() => setIsPlanGeneratorOpen(false)}
                >
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#1a1a1c] border border-white/10 rounded-3xl p-6 max-w-md w-full shadow-2xl relative flex flex-col max-h-[90vh]"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-6 shrink-0">
                      <h3 className="font-bold text-xl">{t('novaPlanGenerator', language)}</h3>
                      <button 
                        onClick={() => setIsPlanGeneratorOpen(false)}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/50 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="overflow-y-auto flex-1 pr-2 -mr-2">
                      {isGeneratingPlan ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <div className="w-20 h-20 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6 relative">
                            <div className="absolute inset-0 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
                            <Bot className="w-10 h-10 text-indigo-400" />
                          </div>
                          <h4 className="text-2xl font-bold mb-3">{t('analyzingProfile', language)}</h4>
                          <p className="text-white/60 text-base">{t('novaCrafting', language)}</p>
                        </div>
                      ) : generatedPlan ? (
                        <div className="space-y-8 py-4">
                          <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                              <CheckCircle className="w-10 h-10 text-emerald-400" />
                            </div>
                            <h4 className="text-3xl font-bold mb-3">{t(generatedPlan.title, language)}</h4>
                            <p className="text-white/60 text-base leading-relaxed">{t(generatedPlan.description, language)}</p>
                          </div>
                          
                          <div className="space-y-4">
                            <h5 className="font-bold text-sm text-white/80 uppercase tracking-wider mb-2">{t('yourCustomRoutine', language)}</h5>
                            {generatedPlan.games.map(game => (
                              <button 
                                key={game.id}
                                onClick={() => {
                                  setIsPlanGeneratorOpen(false);
                                  handlePlayGame(game.id);
                                }}
                                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-[#2a2a2c] hover:bg-[#3a3a3c] transition-colors text-left relative"
                              >
                                <div className={`w-14 h-14 rounded-xl ${game.color} flex items-center justify-center shrink-0`}>
                                  {game.icon}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-bold text-lg">{game.title}</h4>
                                  <p className="text-sm text-white/50">{game.category}</p>
                                </div>
                                {(game as any).isPremium && (
                                  !isPro ? <Lock className="w-5 h-5 text-white/50 mr-2" /> : <Crown className="w-5 h-5 text-[#f59e0b] mr-2" />
                                )}
                                <Play className="w-6 h-6 text-white/30" />
                              </button>
                            ))}
                          </div>
                          
                          
                        </div>
                      ) : (
                        <div className="py-2">
                          <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                              {planStep > 0 && (
                                <button
                                  onClick={() => setPlanStep(planStep - 1)}
                                  className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors text-white/50 hover:text-white"
                                >
                                  <ChevronRight className="w-5 h-5 rotate-180" />
                                </button>
                              )}
                              <span className="text-sm font-medium text-indigo-400">{t('question', language)} {planStep + 1} {t('of', language)} {planQuestions.length}</span>
                            </div>
                            <div className="flex gap-1">
                              {planQuestions.map((_, i) => (
                                <div key={i} className={`h-1.5 w-3 sm:w-4 rounded-full ${i <= planStep ? 'bg-indigo-500' : 'bg-white/10'}`} />
                              ))}
                            </div>
                          </div>
                          
                          <h4 className="text-2xl font-bold mb-8 leading-tight">{t(planQuestions[planStep].question, language)}</h4>
                          
                          <div className="space-y-3">
                            {planQuestions[planStep].options.map((option, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  const newAnswers = { ...planAnswers, [planStep]: option };
                                  setPlanAnswers(newAnswers);
                                  
                                  if (planStep < planQuestions.length - 1) {
                                    setPlanStep(planStep + 1);
                                  } else {
                                    // Generate plan
                                    setIsGeneratingPlan(true);
                                    setTimeout(() => {
                                      setIsGeneratingPlan(false);
                                      let recTitle = "Cognitive Booster";
                                      let recDesc = "A balanced training plan tailored to your profile and answers.";
                                      let recGames = ['memory-grid', 'reaction-tap', 'sudoku-lite'];
                                      const goal = newAnswers[1];
                                      if (goal === "q2o1") {
                                        recTitle = "Memory Master";
                                        recDesc = "A specialized plan designed to enhance your short-term and working memory.";
                                        recGames = ['memory-grid', 'card-match', 'sequence-recall'];
                                      } else if (goal === "q2o2") {
                                        recTitle = "Focus & Attention";
                                        recDesc = "High-intensity exercises to improve your sustained attention and concentration.";
                                        recGames = ['focus-tap', 'reaction-tap', 'mental-math'];
                                      } else if (goal === "q2o3") {
                                        recTitle = "Logic & Problem Solving";
                                        recDesc = "Advanced puzzles and analytical games to sharpen your logical reasoning.";
                                        recGames = ['sudoku-lite', 'smart-grid', 'sliding-puzzle'];
                                      } else if (goal === "q2o4") {
                                        recTitle = "Overall Brain Health";
                                        recDesc = "A well-rounded routine touching on memory, logic, vocabulary, and speed.";
                                        recGames = ['word-builder', 'focus-tap', 'card-match'];
                                      }
                                      
                                      setGeneratedPlan({
                                        title: recTitle,
                                        description: recDesc,
                                        games: recGames.map(id => allGames.find(g => g.id === id) || allGames[0])
                                      });
                                    }, 2500);
                                  }
                                }}
                                className="w-full p-5 rounded-2xl bg-[#2a2a2c] hover:bg-indigo-500/20 border border-transparent hover:border-indigo-500/50 transition-all text-left font-medium text-lg"
                              >
                                {t(option, language)}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* LPI Modal */}
            <AnimatePresence>
              {isLpiModalOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6 backdrop-blur-sm"
                  onClick={() => setIsLpiModalOpen(false)}
                >
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#1e2330] rounded-2xl p-6 max-w-sm w-full shadow-2xl relative max-h-[90vh] overflow-y-auto scroll-smooth hide-scrollbar"
                    onClick={e => e.stopPropagation()}
                  >
                    <button 
                      onClick={() => setIsLpiModalOpen(false)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-3 mb-8 mt-2">
                      <div className="flex items-center justify-center drop-shadow-[0_0_8px_rgba(192,132,252,0.3)]">
                        <img src="/logo.png" alt="Brainova" className="w-7 h-7 brightness-0" style={{ filter: 'invert(64%) sepia(51%) saturate(2371%) hue-rotate(227deg) brightness(101%) contrast(97%)' }} onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden') }} />
                        <Brain className="w-7 h-7 text-[#c084fc] hidden" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">Current Nova Coin</h2>
                    </div>

                    <div className="relative pl-6 space-y-7 pb-2">
                      {/* Vertical Line */}
                      <div className="absolute left-[1px] top-3 bottom-4 w-[1px] bg-slate-600/60"></div>

                      {/* Overall LPI */}
                      <div className="relative">
                        <div className="absolute -left-[25px] top-4 w-6 h-[1px] bg-slate-600/60"></div>
                        <h3 className="text-sm font-bold text-white mb-2">Overall Nova Coin</h3>
                        <div className="flex items-center gap-4">
                          <div className="h-[22px] bg-[#c084fc] rounded-sm shadow-[0_0_12px_rgba(192,132,252,0.4)]" style={{ width: `${Math.max(4, (currentLpi.overall / 1000) * 100)}%` }}></div>
                          <span className="text-xl font-bold text-white">{currentLpi.overall}</span>
                        </div>
                      </div>

                      {Object.entries(currentLpi)
                        .filter(([key]) => key !== 'overall')
                        .map(([key, value]) => {
                          const labels = {
                            speed: 'Reaction Speed',
                            memory: 'Memory',
                            focus: 'Focus',
                            logic: 'Logic',
                            math: 'Math',
                            language: 'Language & Vocabulary',
                            visual: 'Visual & Spatial',
                            observation: 'Observation',
                            executive: 'Executive Function',
                            creativity: 'Creativity'
                          };
                          return (
                            <div key={key} className="relative">
                              <div className="absolute -left-[25px] top-4 w-6 h-[1px] bg-slate-600/60"></div>
                              <h3 className="text-[13px] font-medium text-slate-300 mb-2">{labels[key] || key}</h3>
                              <div className="flex items-center gap-4">
                                <div className="h-[18px] bg-[#c084fc] rounded-sm shadow-[0_0_12px_rgba(192,132,252,0.3)]" style={{ width: `${Math.max(4, (value / 1000) * 100)}%` }}></div>
                                <span className="text-white font-bold">{value}</span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pro Modal */}
            <AnimatePresence>
              {isProModalOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm"
                  onClick={() => setIsProModalOpen(false)}
                >
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#2c1b00] border border-[#ff9900]/20 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative max-h-[90vh] overflow-y-auto scroll-smooth hide-scrollbar"
                    onClick={e => e.stopPropagation()}
                  >
                    <button 
                      onClick={() => setIsProModalOpen(false)}
                      className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3 mb-4">
                      <Star className="w-7 h-7 text-[#ff9900] fill-[#ff9900]" />
                      <h2 className="text-2xl font-bold text-[#ff9900]">{t('brainovaPro', language)}</h2>
                    </div>
                    <p className="text-white/90 mb-8 leading-relaxed text-lg">
                      {t('unlockAllGames', language)}
                    </p>
                    <div className="space-y-3">
                      <button 
                        onClick={() => {
                          setIsProModalOpen(false);
                          setIsSubscriptionModalOpen(true);
                        }}
                        className="w-full py-4 bg-[#ff9900] hover:bg-[#e68a00] text-black font-bold rounded-2xl transition-colors text-lg"
                      >
                        Upgrade Now
                      </button>
                      <button 
                        onClick={() => setIsProModalOpen(false)}
                        className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-2xl transition-colors text-lg flex items-center justify-center gap-2"
                      >
                        <Play className="w-5 h-5" />
                        Watch Ad to Unlock
                      </button>
                      <button 
                        onClick={() => {
                          setIsProModalOpen(false);
                          setCurrentTab('coach');
                        }}
                        className="w-full py-2 text-white/50 hover:text-white font-medium transition-colors text-sm"
                      >
                        {t('skipForNow', language)}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subscription Modal */}
            <AnimatePresence>
              {isSubscriptionModalOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed inset-0 z-50 bg-[#0f111a] flex flex-col overflow-y-auto"
                >
                  <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white">Pick The Best Plan</h2>
                    <button onClick={() => setIsSubscriptionModalOpen(false)} className="text-white/60 hover:text-white">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="p-6 flex-1 flex flex-col items-center justify-start sm:justify-center overflow-y-auto">
                    <div className="max-w-md w-full">
                      <div className="space-y-4">
                        {/* 1 Month Plan */}
                        <div 
                          onClick={() => {
                            setSelectedPlan('1month');
                          }}
                          className={`bg-[#1a1b26] border rounded-[24px] p-6 flex items-center justify-between cursor-pointer transition-colors ${selectedPlan === '1month' ? 'border-white bg-white/10' : 'border-[#2a2b36] hover:border-[#3a3b46]'}`}
                        >
                          <div>
                            <h4 className="font-bold text-white text-[22px] mb-1">1 Month</h4>
                            <p className="text-[12px] text-gray-400 uppercase tracking-[0.2em] font-medium">SUBSCRIPTION</p>
                          </div>
                          <div className="text-right">
                            <span className="text-3xl font-bold text-white">₹199</span>
                          </div>
                        </div>

                        {/* 3 Month Plan */}
                        <div 
                          onClick={() => {
                            setSelectedPlan('6months');
                          }}
                          className={`bg-[#1a1b26] border rounded-[24px] p-6 flex items-center justify-between cursor-pointer relative transition-colors ${selectedPlan === '6months' ? 'border-pink-500 bg-pink-500/10' : 'border-[#3b1722] hover:border-[#4b2732]'}`}
                        >
                          <div>
                            <h4 className="font-bold text-white text-[22px] mb-1">3 Months</h4>
                            <p className="text-[12px] text-gray-400 uppercase tracking-[0.2em] font-medium">SUBSCRIPTION</p>
                          </div>
                          <div className="text-right">
                            <span className="text-3xl font-bold text-white">₹99</span>
                          </div>
                        </div>

                        {/* 1 Year Plan */}
                        <div 
                          onClick={() => {
                            setSelectedPlan('1year');
                          }}
                          className={`bg-[#1a1b26] border rounded-[24px] p-6 flex items-center justify-between cursor-pointer transition-colors ${selectedPlan === '1year' ? 'border-[#fbbf24] bg-[#fbbf24]/10' : 'border-[#f59e0b] hover:border-[#fbbf24]'}`}
                        >
                          <div>
                            <h4 className="font-bold text-white text-[22px] mb-1">1 Year</h4>
                            <p className="text-[12px] text-gray-400 uppercase tracking-[0.2em] font-medium">SUBSCRIPTION</p>
                          </div>
                          <div className="text-right">
                            <span className="text-3xl font-bold text-white">₹1,999</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 space-y-4">
                        {selectedPlan && (
                          <button
                            onClick={() => {
                              setIsSubscriptionModalOpen(false);
                              setIsCheckoutModalOpen(true);
                            }}
                            className="w-full py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg hover:from-indigo-400 hover:to-purple-400 transition-all shadow-lg shadow-indigo-500/25"
                          >
                            Proceed
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedPlan(null);
                            setIsSubscriptionModalOpen(false);
                            setIsCheckoutModalOpen(true);
                          }}
                          className="w-full py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg hover:from-purple-400 hover:to-pink-400 transition-all shadow-lg shadow-pink-500/25"
                        >
                          Start 7-Day Free Trial
                        </button>
                        <p className="text-center text-white/50 text-sm font-medium cursor-pointer hover:text-white/80" onClick={() => setIsSubscriptionModalOpen(false)}>
                          Cancel anytime
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Checkout / Promo Code Modal */}
            <AnimatePresence>
              {isCheckoutModalOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed inset-0 z-50 bg-[#0a0a0c] flex items-center justify-center p-4"
                >
                  <div className="bg-[#1c1c24] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full relative">
                    <button 
                      onClick={() => setIsCheckoutModalOpen(false)} 
                      className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    
                    <h3 className="text-2xl font-bold text-white mb-6">Checkout</h3>
                    
                    <div className="bg-[#0a0a0c] rounded-2xl p-5 mb-6 border border-white/5 text-white shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-white/60">Selected Plan</span>
                        <span className="font-bold text-white">
                          {selectedPlan === '1month' ? '1 Month' : selectedPlan === '6months' ? '3 Months' : '1 Year'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-lg">
                        <span className="font-semibold text-white/60">Price</span>
                        <span className={`font-bold ${promoApplied ? 'line-through text-white/40' : 'text-white'}`}>
                          ₹{selectedPlan === '1month' ? '199' : selectedPlan === '6months' ? '99' : '1,999'}
                        </span>
                      </div>
                      {promoApplied && (
                        <div className="flex justify-between items-center text-lg mt-1 text-green-400">
                          <span className="font-semibold">Discounted Price</span>
                          <span className="font-bold">
                            ₹{promoApplied === 'INDIA' 
                                ? (selectedPlan === '1month' ? '99' : selectedPlan === '6months' ? '49' : '999')
                                : (selectedPlan === '1month' ? '159' : selectedPlan === '6months' ? '79' : '1,599')}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-white mb-3">Promo code</h4>
                      <div className="flex gap-3 mb-2">
                        <input 
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                          placeholder="NEW20 or INDIA"
                          className="flex-1 bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-white/30"
                        />
                        <button 
                          onClick={() => {
                            if (promoCode === 'NEW20' || promoCode === 'INDIA') {
                              setPromoApplied(promoCode);
                            } else {
                              setPromoApplied(false);
                            }
                          }}
                          className="px-6 py-3 bg-[#0a0a0c] border border-white/10 rounded-xl font-semibold text-white hover:bg-white/5 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      <p className="text-sm text-white/40 font-medium ml-1">One code per order</p>
                    </div>

                    <button 
                      onClick={() => {
                        setIsCheckoutModalOpen(false);
                        setIsPaymentModalOpen(true);
                      }}
                      className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-bold rounded-xl transition-colors uppercase tracking-wider text-sm shadow-lg shadow-purple-500/20"
                    >
                      Confirm Purchase
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Payment Modal */}
            <AnimatePresence>
              {isPaymentModalOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed inset-0 z-50 bg-[#0f111a] flex items-center justify-center p-4"
                >
                  <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full relative">
                    <button 
                      onClick={() => setIsPaymentModalOpen(false)} 
                      className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h3>
                    
                    <div className="space-y-3 mb-8">
                      {/* UPI */}
                      <div 
                        onClick={() => setSelectedPayment('upi')}
                        className={`border-2 rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-colors ${selectedPayment === 'upi' ? 'border-[#00c853] bg-[#00c853]/5' : 'border-gray-200 hover:border-[#00c853]/50'}`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedPayment === 'upi' ? 'bg-[#00c853]/20 text-[#00c853]' : 'bg-gray-100 text-gray-500'}`}>
                          <Smartphone className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">UPI</h4>
                          <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm</p>
                        </div>
                      </div>

                      {/* Card */}
                      <div 
                        onClick={() => setSelectedPayment('card')}
                        className={`border-2 rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-colors ${selectedPayment === 'card' ? 'border-[#00c853] bg-[#00c853]/5' : 'border-gray-200 hover:border-[#00c853]/50'}`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedPayment === 'card' ? 'bg-[#00c853]/20 text-[#00c853]' : 'bg-gray-100 text-gray-500'}`}>
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">Credit / Debit Card</h4>
                          <p className="text-xs text-gray-500">Visa, Mastercard, RuPay</p>
                        </div>
                      </div>

                      {/* Net Banking */}
                      <div 
                        onClick={() => setSelectedPayment('netbanking')}
                        className={`border-2 rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-colors ${selectedPayment === 'netbanking' ? 'border-[#00c853] bg-[#00c853]/5' : 'border-gray-200 hover:border-[#00c853]/50'}`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedPayment === 'netbanking' ? 'bg-[#00c853]/20 text-[#00c853]' : 'bg-gray-100 text-gray-500'}`}>
                          <Building className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">Net Banking</h4>
                          <p className="text-xs text-gray-500">All major banks supported</p>
                        </div>
                      </div>

                      {/* Wallet */}
                      <div 
                        onClick={() => setSelectedPayment('wallet')}
                        className={`border-2 rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-colors ${selectedPayment === 'wallet' ? 'border-[#00c853] bg-[#00c853]/5' : 'border-gray-200 hover:border-[#00c853]/50'}`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedPayment === 'wallet' ? 'bg-[#00c853]/20 text-[#00c853]' : 'bg-gray-100 text-gray-500'}`}>
                          <Wallet className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">Wallets</h4>
                          <p className="text-xs text-gray-500">Amazon Pay, Mobikwik</p>
                        </div>
                      </div>
                    </div>

                    <button 
                      disabled={!selectedPayment}
                      onClick={() => {
                        setIsPaymentModalOpen(false);
                        setSelectedPlan(null);
                        setPromoCode('');
                        setPromoApplied(false);
                        setSelectedPayment(null);
                        alert('Payment Successful!');
                      }}
                      className={`w-full py-4 font-bold rounded-xl transition-colors uppercase tracking-wider text-sm shadow-lg ${selectedPayment ? 'bg-[#00c853] hover:bg-[#00e676] text-white shadow-[#00c853]/30' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`}
                    >
                      Pay Now
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Edit Name Modal */}
            <AnimatePresence>
              {isEditNameOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    className="bg-[#1a1a1c] border border-white/10 rounded-3xl p-6 w-full max-w-sm"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Edit Profile</h3>
                      <button onClick={() => setIsEditNameOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-sm text-white/50 mb-1">Name</p>
                        <input
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                          placeholder="Enter your name"
                        />
                      </div>
                      
                      <div>
                        <p className="text-sm text-white/50 mb-1">Email</p>
                        <input
                          type="email"
                          value={tempEmail}
                          onChange={(e) => setTempEmail(e.target.value)}
                          className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setIsEditNameOpen(false)}
                        className="flex-1 py-3 rounded-xl font-bold bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleNameSave}
                        className="flex-1 py-3 rounded-xl font-bold bg-indigo-500 hover:bg-indigo-600 transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hidden File Inputs */}
            <input 
              type="file" 
              ref={cameraInputRef} 
              onChange={handlePhotoUpload} 
              accept="image/*" 
              capture="environment"
              className="hidden" 
            />
            <input 
              type="file" 
              ref={galleryInputRef} 
              onChange={handlePhotoUpload} 
              accept="image/*" 
              className="hidden" 
            />

            <AnimatePresence>
              {isPhotoOptionsOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex items-end justify-center sm:items-center p-0 sm:p-4"
                  onClick={() => setIsPhotoOptionsOpen(false)}
                >
                  <motion.div 
                    initial={{ y: 300, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 300, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#121124] w-full sm:w-[480px] rounded-t-3xl sm:rounded-3xl p-6 pb-8 sm:pb-6 shadow-2xl border border-white/10 max-h-[85vh] flex flex-col"
                  >
                    <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-4 sm:hidden"></div>
                    <div className="flex justify-between items-center mb-5">
                      <div>
                        <h3 className="text-xl font-bold text-white">Choose Profile Avatar</h3>
                        <p className="text-xs text-white/50 mt-0.5">Select a Brain Buddy theme or upload your photo</p>
                      </div>
                      <button 
                        onClick={() => setIsPhotoOptionsOpen(false)}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="overflow-y-auto hide-scrollbar space-y-6 pr-1">
                      {/* Brain Buddy Collection Grid */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Brain Buddy Collection</span>
                          <span className="text-[11px] text-white/40">8 Unique Themes</span>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-3">
                          {AVATAR_THEMES.map((theme) => {
                            const isSelected = profilePhoto === 'avatar:' + theme.id || (!profilePhoto && theme.id === 'emerald');
                            return (
                              <button
                                key={theme.id}
                                onClick={() => handleSelectMascotTheme(theme.id)}
                                className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all duration-200 group relative ${
                                  isSelected 
                                    ? 'bg-emerald-500/15 border-2 border-[#00D68F] shadow-[0_0_15px_rgba(0,214,143,0.35)] scale-105' 
                                    : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                                }`}
                              >
                                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 relative">
                                  <BrainBuddyAvatar variant={theme.id} className="w-full h-full" showBorder={false} />
                                </div>
                                <span className="text-[11px] font-semibold text-white/90 truncate w-full text-center leading-tight">
                                  {theme.name.split(' ')[1] || theme.name}
                                </span>
                                {isSelected && (
                                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#00D68F] flex items-center justify-center shadow-md">
                                    <Check className="w-3.5 h-3.5 text-[#06080c]" strokeWidth={3} />
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Upload Personal Photo */}
                      <div>
                        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-3">Or Upload Custom Photo</span>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => {
                              setIsPhotoOptionsOpen(false);
                              cameraInputRef.current?.click();
                            }}
                            className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white font-medium text-sm"
                          >
                            <Camera className="w-5 h-5 text-blue-400" />
                            Take Photo
                          </button>
                          
                          <button
                            onClick={() => {
                              setIsPhotoOptionsOpen(false);
                              galleryInputRef.current?.click();
                            }}
                            className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white font-medium text-sm"
                          >
                            <Images className="w-5 h-5 text-purple-400" />
                            From Gallery
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>            {/* Account Modal */}
            <AnimatePresence>
              {isAccountOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="w-full max-w-md bg-[#1c1c1e] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
                  >
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <User className="w-6 h-6 text-cyan-400" /> Account
                      </h2>
                      <button onClick={() => setIsAccountOpen(false)} className="text-white/60 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="p-6 overflow-y-auto max-h-[70vh]">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center overflow-hidden border-2 border-blue-500/50">
                          <UserAvatar src={profilePhoto} name={profileName} className="w-full h-full" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{profileName || 'User'}</h3>
                          <p className="text-white/50 text-sm">{profileEmail || 'Not Provided'}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                         <button 
                            onClick={() => { setIsAccountOpen(false); setIsMyInfoOpen(true); }}
                            className="w-full flex items-center gap-4 text-left px-4 py-4 text-base text-white hover:bg-white/5 transition-colors rounded-xl"
                         >
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                              <Edit2 className="w-5 h-5 text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <span className="font-medium">Personal Information</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-white/40" />
                         </button>
                         
                         <button 
                            onClick={() => { setIsAccountOpen(false); setIsPremiumSubscriptionOpen(true); }}
                            className="w-full flex items-center gap-4 text-left px-4 py-4 text-base text-white hover:bg-white/5 transition-colors rounded-xl"
                         >
                            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                              <Crown className="w-5 h-5 text-purple-400" />
                            </div>
                            <div className="flex-1">
                              <span className="font-medium">Subscription</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-white/40" />
                         </button>

                         <button 
                            onClick={() => setIsDeleteAccountPromptOpen(true)}
                            className="w-full flex items-center gap-4 text-left px-4 py-4 text-base text-white hover:bg-white/5 transition-colors rounded-xl mt-4 border border-transparent hover:border-red-500/20"
                         >
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                              <Trash2 className="w-5 h-5 text-red-400" />
                            </div>
                            <div className="flex-1">
                              <span className="font-medium text-red-400">Delete Account</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-white/40" />
                         </button>
                         
                         <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 text-left px-4 py-4 text-base text-white/70 hover:bg-white/5 transition-colors rounded-xl border border-transparent hover:border-white/10"
                         >
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                              <LogOut className="w-5 h-5 text-white/70" />
                            </div>
                            <span className="font-medium">Sign Out</span>
                         </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Delete Account Prompt Modal */}
            <AnimatePresence>
              {isDeleteAccountPromptOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="w-full max-w-md bg-[#1e1e24] rounded-2xl overflow-hidden shadow-2xl border border-red-500/30 flex flex-col p-6"
                  >
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4 border border-red-500/30">
                        <Trash2 className="w-8 h-8 text-red-500" />
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-2">Delete Account?</h2>
                      <p className="text-white/60 text-sm">
                        This action is permanent and cannot be undone. All your progress, scores, and subscriptions will be lost.
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Type <span className="font-bold text-red-400">delete</span> to confirm:
                      </label>
                      <input 
                        type="text"
                        value={deleteConfirmationText}
                        onChange={(e) => setDeleteConfirmationText(e.target.value)}
                        placeholder="delete"
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50 transition-colors"
                      />
                    </div>
                    
                    <div className="flex gap-4">
                      <button
                        onClick={() => { setIsDeleteAccountPromptOpen(false); setDeleteConfirmationText(''); }}
                        className="flex-1 py-3 px-4 rounded-xl font-bold text-white/70 bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDeleteAccount}
                        disabled={deleteConfirmationText.toLowerCase() !== 'delete'}
                        className={`flex-1 py-3 px-4 rounded-xl font-bold text-white transition-colors ${
                          deleteConfirmationText.toLowerCase() === 'delete' 
                            ? 'bg-red-600 hover:bg-red-700' 
                            : 'bg-red-900/50 cursor-not-allowed opacity-50'
                        }`}
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isProfileSettingsOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-[#0f111a] z-[9999] flex flex-col overflow-y-auto scroll-smooth hide-scrollbar"
                >
                  <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white">Settings</h2>
                    <button onClick={() => setIsProfileSettingsOpen(false)} className="text-white/60 hover:text-white">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <button 
                      onClick={() => {
                        setIsProfileSettingsOpen(false);
                        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                        if (isMobile) {
                          setIsPhotoOptionsOpen(true);
                        } else {
                          galleryInputRef.current?.click();
                        }
                      }}
                      className="w-full flex items-center gap-4 text-left px-4 py-4 text-base text-white hover:bg-white/5 transition-colors rounded-xl"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <Camera className="w-5 h-5 text-white/70" />
                      </div>
                      <span className="font-medium">{t('changeProfilePhoto', language) || 'Change Profile Photo'}</span>
                    </button>
                    <button 
                      onClick={() => {
                        setTempName(profileName);
                        setIsEditNameOpen(true);
                        setIsProfileSettingsOpen(false);
                      }}
                      className="w-full flex items-center gap-4 text-left px-4 py-4 text-base text-white hover:bg-white/5 transition-colors rounded-xl"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <Edit2 className="w-5 h-5 text-white/70" />
                      </div>
                      <span className="font-medium">{t('changeName', language) || 'Change Name'}</span>
                    </button>
                    <button 
                      onClick={() => {
                        setIsProfileSettingsOpen(false);
                        setIsModeModalOpen(true);
                      }}
                      className="w-full flex items-center gap-4 text-left px-4 py-4 text-base text-white hover:bg-white/5 transition-colors rounded-xl"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <Moon className="w-5 h-5 text-white/70" />
                      </div>
                      <span className="font-medium">{t('changeMode', language) || 'Change Mode'}</span>
                    </button>
                    <button 
                      onClick={() => {
                        setIsProfileSettingsOpen(false);
                        setIsLanguageModalOpen(true);
                      }}
                      className="w-full flex items-center gap-4 text-left px-4 py-4 text-base text-white hover:bg-white/5 transition-colors rounded-xl"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white/70" />
                      </div>
                      <span className="font-medium">{t('changeLanguage', language) || 'Change Language'}</span>
                    </button>
                  </div>
                  
                  <div className="px-6 py-2 mt-2">
                    <h3 className="text-white/80 font-medium text-sm">{t('supportInformation', language)}</h3>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <a 
                      href="mailto:brainova.in@gmail.com"
                      className="w-full flex items-center gap-4 text-left px-4 py-4 text-base text-white hover:bg-white/5 transition-colors rounded-xl"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <HelpCircle className="w-5 h-5 text-white/70" />
                      </div>
                      <span className="font-medium">{t('help', language)}</span>
                    </a>
                    <button 
                      onClick={() => {
                        setIsProfileSettingsOpen(false);
                        setIsFeedbackOpen(true);
                      }}
                      className="relative w-full flex items-center justify-between p-1 mt-4 mb-2 text-left transition-all rounded-2xl group overflow-hidden"
                      style={{
                        background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        boxShadow: '0 0 20px rgba(168, 85, 247, 0.1)',
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="flex items-center gap-4 relative z-10 p-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                          <MessageSquare className="w-6 h-6 text-white animate-pulse" />
                        </div>
                        <div>
                          <span className="block font-bold text-white text-[16px]">{t('yourFeedback', language) || "Your Feedback"}</span>
                          <span className="block text-[13px] text-purple-300">We'd love to hear from you!</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/50 mr-4 relative z-10" />
                    </button>
                    
                  </div>
                  
                  <div className="px-6 py-2 mt-2">
                    <h3 className="text-white/80 font-medium text-sm">Social</h3>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <a 
                      href="https://instagram.com/brainova.in" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full flex items-center gap-4 text-left px-4 py-4 text-base text-white hover:bg-white/5 transition-colors rounded-xl"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <Instagram className="w-5 h-5 text-[#E1306C]" />
                      </div>
                      <span className="font-medium text-white">Instagram</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isQuestPageOpen && <KickOffQuest onBack={() => setPlanStep(0)} />}
            </AnimatePresence>

            {/* Level Up Modal */}
            <AnimatePresence>
              {selectedLevel && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                  onClick={() => setSelectedLevel(null)}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="w-full max-w-sm bg-[#0a0a14] border border-white/10 rounded-[32px] p-6 flex flex-col items-center relative overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Confetti - simple CSS dots / decorative */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
                       <div className="absolute top-[10%] left-[20%] w-2 h-2 bg-pink-500 rounded-sm rotate-45"></div>
                       <div className="absolute top-[30%] left-[10%] w-1.5 h-1.5 bg-blue-500 rounded-sm"></div>
                       <div className="absolute top-[15%] right-[20%] w-2 h-2 bg-yellow-500 rounded-sm rotate-12"></div>
                       <div className="absolute top-[40%] right-[10%] w-2 h-2 bg-green-500 rounded-sm -rotate-12"></div>
                       <div className="absolute top-[60%] left-[15%] w-1.5 h-1.5 bg-purple-500 rounded-sm"></div>
                       <div className="absolute top-[70%] right-[15%] w-2 h-2 bg-red-500 rounded-sm rotate-45"></div>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-2 relative z-10">Level Up!</h2>
                    <p className="text-white/80 mb-1 text-sm relative z-10">You've reached</p>
                    <h3 className="text-[32px] font-bold relative z-10" style={{ color: selectedLevel.color || '#22c55e' }}>{selectedLevel.title}</h3>
                    
                    <div className="relative my-8 flex flex-col items-center justify-center min-h-[140px] w-full">
                      {/* Sunburst background effect */}
                      <div className="absolute inset-0 flex items-center justify-center mix-blend-screen opacity-60">
                        <div className="w-[300px] h-[300px] rounded-full" style={{ background: `radial-gradient(circle, ${selectedLevel.color || '#22c55e'}40 0%, transparent 70%)` }}></div>
                        <div className="absolute w-[2px] h-[200px] bg-gradient-to-t from-transparent via-blue-500 to-transparent rotate-0 blur-[1px] opacity-70"></div>
                        <div className="absolute w-[2px] h-[200px] bg-gradient-to-t from-transparent via-purple-500 to-transparent rotate-45 blur-[1px] opacity-70"></div>
                        <div className="absolute w-[2px] h-[200px] bg-gradient-to-t from-transparent via-pink-500 to-transparent rotate-90 blur-[1px] opacity-70"></div>
                        <div className="absolute w-[2px] h-[200px] bg-gradient-to-t from-transparent via-blue-500 to-transparent -rotate-45 blur-[1px] opacity-70"></div>
                      </div>

                      {/* Bot Image Substitute */}
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="relative z-10 mb-8"
                      >
                         <div className="w-24 h-24 rounded-[32px] bg-gradient-to-b from-[#6366f1] to-[#4f46e5] flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.6)]">
                            <Bot className="w-14 h-14 text-white" />
                         </div>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, type: "spring", bounce: 0.5 }}
                        className="absolute bottom-[-10px] z-20"
                      >
                         <div className="relative">
                            <Shield className="w-16 h-16" style={{ color: selectedLevel.color || '#22c55e', fill: `${selectedLevel.color || '#22c55e'}20` }} />
                            <div className="absolute inset-0 flex items-center justify-center mb-1">
                               <span className="text-2xl font-bold text-white">{selectedLevel.id}</span>
                            </div>
                            {/* Decorative laurels */}
                            <svg className="absolute -left-6 top-1/2 -translate-y-1/2 w-8 h-12" viewBox="0 0 24 36" fill="none" stroke={selectedLevel.color || '#22c55e'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 30 C10 24, 10 12, 18 6 M18 30 Q12 30, 8 26 M16 24 Q10 24, 6 20 M14 18 Q8 18, 4 14" />
                            </svg>
                            <svg className="absolute -right-6 top-1/2 -translate-y-1/2 w-8 h-12" viewBox="0 0 24 36" fill="none" stroke={selectedLevel.color || '#22c55e'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M6 30 C14 24, 14 12, 6 6 M6 30 Q12 30, 16 26 M8 24 Q14 24, 18 20 M10 18 Q16 18, 20 14" />
                            </svg>
                         </div>
                      </motion.div>
                    </div>

                    <p className="text-white font-bold text-sm mb-4 relative z-10 mt-4">Rewards Unlocked</p>
                    
                    <div className="grid grid-cols-3 gap-3 w-full mb-6 relative z-10">
                      <div className="bg-[#12121e] border border-[#2a2a3e] rounded-2xl p-4 flex flex-col items-center justify-center">
                         <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                           <span className="text-white font-bold text-[10px]">XP</span>
                         </div>
                         <span className="text-white font-bold text-sm">+{selectedLevel.maxXP || selectedLevel.xp}</span>
                         <span className="text-white/50 text-[11px] font-medium">XP</span>
                      </div>
                      <div className="bg-[#12121e] border border-[#2a2a3e] rounded-2xl p-4 flex flex-col items-center justify-center">
                         <div className="w-8 h-8 mb-2 flex items-center justify-center drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                           <Gem className="w-6 h-6 text-purple-400 fill-purple-400/20" />
                         </div>
                         <span className="text-white font-bold text-sm">+{selectedLevel.id * 5}</span>
                         <span className="text-white/50 text-[11px] font-medium">Gems</span>
                      </div>
                      <div className="bg-[#12121e] border border-[#2a2a3e] rounded-2xl p-4 flex flex-col items-center justify-center">
                         <div className="w-8 h-8 mb-2 flex items-center justify-center drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
                           <Zap className="w-6 h-6 text-green-400 fill-green-400/20" />
                         </div>
                         <span className="text-white font-bold text-sm">+1</span>
                         <span className="text-white/50 text-[10px] font-medium text-center leading-tight">Streak Slot</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedLevel(null)}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#4f46e5] hover:to-[#7c3aed] text-white font-bold text-[15px] transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] relative z-10"
                    >
                      Continue Your Journey
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Language Modal */}
            <AnimatePresence>
              {isLanguageModalOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm"
                  onClick={() => setIsLanguageModalOpen(false)}
                >
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#1a1a1c] border border-white/10 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative max-h-[90vh] overflow-y-auto scroll-smooth hide-scrollbar"
                    onClick={e => e.stopPropagation()}
                  >
                    <button 
                      onClick={() => setIsLanguageModalOpen(false)}
                      className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3 mb-6">
                      <Globe className="w-7 h-7 text-indigo-400" />
                      <h2 className="text-2xl font-bold text-white">{t('selectLanguage', language) || "Select Language"}</h2>
                    </div>
                    <div className="w-full space-y-3 max-h-[50vh] overflow-y-auto hide-scrollbar pb-4 px-2 -mx-2">
                      {[
                        { code: 'en', name: 'English' },
                        { code: 'hi', name: 'हिंदी (Hindi)' },
                        { code: 'bn', name: 'বাংলা (Bengali)' },
                        { code: 'mr', name: 'मराठी (Marathi)' },
                        { code: 'te', name: 'తెలుగు (Telugu)' },
                        { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
                        { code: 'ta', name: 'தமிழ் (Tamil)' }
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as Language);
                            setIsLanguageModalOpen(false);
                          }}
                          className={`w-full p-4 rounded-2xl border transition-all text-lg font-medium ${
                            language === lang.code 
                              ? 'bg-indigo-500/20 border-indigo-500/50 text-white' 
                              : 'bg-[#2a2a2c] border-white/5 text-white/70 hover:bg-[#3a3a3c] hover:text-white'
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Bottom Navigation */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-[#0a0a0c]/90 backdrop-blur-md border-t border-white/5 flex justify-around items-center px-4 z-20">
            <button 
              onClick={() => setCurrentTab('home')}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                currentTab === 'home' 
                  ? 'text-blue-500 bg-blue-500/10 border border-blue-500/30 shadow-[0_0_16px_rgba(59,130,246,0.25)]' 
                  : 'text-white/40 hover:text-white border border-transparent'
              }`}
            >
              <Home className={`w-6 h-6 transition-all duration-200 ${currentTab === 'home' ? 'text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.85)]' : ''}`} />
              <span className={`text-[10px] transition-colors ${currentTab === 'home' ? 'font-semibold text-blue-400' : 'font-medium'}`}>{t('home', language)}</span>
            </button>
            <button 
              onClick={() => setCurrentTab('games')}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                currentTab === 'games' 
                  ? 'text-blue-500 bg-blue-500/10 border border-blue-500/30 shadow-[0_0_16px_rgba(59,130,246,0.25)]' 
                  : 'text-white/40 hover:text-white border border-transparent'
              }`}
            >
              <Gamepad2 className={`w-6 h-6 transition-all duration-200 ${currentTab === 'games' ? 'text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.85)]' : ''}`} />
              <span className={`text-[10px] transition-colors ${currentTab === 'games' ? 'font-semibold text-blue-400' : 'font-medium'}`}>{t('games', language)}</span>
            </button>
            <button 
              onClick={() => setCurrentTab('challenges')}
              className={`flex flex-col items-center justify-center gap-1 px-3.5 py-1.5 rounded-[18px] transition-all duration-200 cursor-pointer ${
                currentTab === 'challenges' 
                  ? 'text-blue-400 bg-[#0b1730]/95 border border-[#3b82f6]/50 shadow-[0_0_18px_rgba(59,130,246,0.35)]' 
                  : 'text-white/40 hover:text-white border border-transparent'
              }`}
            >
              <ChallengesIcon className={`w-6 h-6 transition-all duration-200 ${currentTab === 'challenges' ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.9)]' : ''}`} />
              <span className={`text-[10px] tracking-wide transition-colors ${currentTab === 'challenges' ? 'font-bold text-blue-400' : 'font-medium'}`}>{t('challenges', language) || 'Challenges'}</span>
            </button>
            <button 
              onClick={() => setCurrentTab('stats')}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                currentTab === 'stats' 
                  ? 'text-blue-500 bg-blue-500/10 border border-blue-500/30 shadow-[0_0_16px_rgba(59,130,246,0.25)]' 
                  : 'text-white/40 hover:text-white border border-transparent'
              }`}
            >
              <TrendingUp className={`w-6 h-6 transition-all duration-200 ${currentTab === 'stats' ? 'text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.85)]' : ''}`} />
              <span className={`text-[10px] transition-colors ${currentTab === 'stats' ? 'font-semibold text-blue-400' : 'font-medium'}`}>{t('stats', language)}</span>
            </button>
            <button 
              onClick={() => setCurrentTab('profile')}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                currentTab === 'profile' 
                  ? 'text-blue-500 bg-blue-500/10 border border-blue-500/30 shadow-[0_0_16px_rgba(59,130,246,0.25)]' 
                  : 'text-white/40 hover:text-white border border-transparent'
              }`}
            >
              <User className={`w-6 h-6 transition-all duration-200 ${currentTab === 'profile' ? 'text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.85)]' : ''}`} />
              <span className={`text-[10px] transition-colors ${currentTab === 'profile' ? 'font-semibold text-blue-400' : 'font-medium'}`}>{t('profile', language)}</span>
            </button>
          </div>
          </>
          )}
        </div>
      </GameContext.Provider>
    );
  }

  if (onboardingStep > 0) {
    return (
      <OnboardingScreens 
        onLogin={() => setIsLoggedIn(true)} 
      />
    );
  }

  if (isCompleted) {
    return (
      <AuthScreen 
        language={language} 
        onLogin={(name) => { if(name) setProfileName(name); setOnboardingStep(1); }} 
        onBack={() => setIsCompleted(false)} 
      />
    );
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-[#0a0a0c] font-sans text-white relative overflow-hidden" style={getModeStyles()}>
        
        {/* Dynamic Background Gradient Removed */}

        {/* Content Area */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key="language"
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center text-center w-full max-w-md"
            >
              <div className="w-24 h-24 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-8 mt-12">
                <Globe className="w-12 h-12 text-indigo-400" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-4 leading-tight">
                {t('selectLanguage', language) || "Select Language"}
              </h2>
              <p className="text-[15px] text-white/60 leading-relaxed font-medium mb-8">
                {t('chooseLanguageDesc', language) || "Choose your preferred language to continue."}
              </p>
              
              <div className="w-full space-y-3 max-h-[40vh] overflow-y-auto hide-scrollbar pb-4 px-2 -mx-2">
                {[
                  { code: 'en', name: 'English' },
                  { code: 'hi', name: 'हिंदी (Hindi)' },
                  { code: 'bn', name: 'বাংলা (Bengali)' },
                  { code: 'mr', name: 'मराठी (Marathi)' },
                  { code: 'te', name: 'తెలుగు (Telugu)' },
                  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
                  { code: 'ta', name: 'தமிழ் (Tamil)' }
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as Language);
                    }}
                    className={`w-full p-4 rounded-2xl border transition-all text-lg font-medium ${
                      language === lang.code 
                        ? 'bg-indigo-500/20 border-indigo-500/50 text-white' 
                        : 'bg-[#1a1a1c] border-white/5 text-white/70 hover:bg-[#2a2a2c] hover:text-white'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsCompleted(true)}
                className="w-full mt-4 h-14 rounded-2xl bg-white text-black font-semibold text-lg flex items-center justify-center gap-2 hover:scale-[0.98] active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              >
                {t('continue', language) || "Continue"}
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Notifications Modal */}
        <AnimatePresence>
          {isNotificationsOpen && (
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              className="fixed inset-0 z-[10000] bg-[#0a0a0c] flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a0c]">
                {selectedNotification ? (
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setSelectedNotification(null)}
                      className="p-2 rounded-full hover:bg-white/10 transition-colors -ml-2"
                    >
                      <ArrowLeft className="w-5 h-5 text-white" />
                    </button>
                    <h2 className="text-xl font-bold text-white">Message</h2>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Bell className="w-6 h-6 text-rose-400" />
                    <h2 className="text-xl font-bold text-white">Notifications</h2>
                  </div>
                )}
                <button
                  onClick={() => {
                    setIsNotificationsOpen(false);
                    setSelectedNotification(null);
                  }}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <AnimatePresence mode="wait">
                  {selectedNotification ? (
                    <motion.div 
                      key="notification-details"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="h-full flex flex-col"
                    >
                      <div className="mb-6 mt-2">
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                          {selectedNotification.title}
                        </h3>
                        <div className="text-sm text-white/40 font-medium">
                          {selectedNotification.time}
                        </div>
                      </div>
                      
                      <div className="bg-[#1a1a1c] border border-white/5 rounded-3xl p-6 shadow-xl flex-1 flex flex-col">
                        <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center mb-6">
                          <Bell className="w-8 h-8 text-rose-400" />
                        </div>
                        <p className="text-white/80 text-lg leading-relaxed whitespace-pre-wrap">
                          {selectedNotification.message}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="notifications-list"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {notifications.length > 0 ? (
                        <div className="space-y-4">
                          {notifications.map((notification) => (
                            <div 
                              key={notification.id}
                              onClick={() => {
                                setNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n));
                                setSelectedNotification(notification as any);
                              }}
                              className={`p-4 rounded-2xl border cursor-pointer hover:bg-white/5 transition-colors ${notification.isRead ? 'bg-[#1a1a1c] border-white/5' : 'bg-rose-500/10 border-rose-500/30'}`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h3 className={`font-bold ${notification.isRead ? 'text-white/80' : 'text-white'}`}>
                                  {notification.title}
                                </h3>
                                <span className="text-xs text-white/40">{notification.time}</span>
                              </div>
                              <p className="text-sm text-white/60 leading-relaxed line-clamp-2">
                                {notification.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-[50vh] text-white/50">
                          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                            <Bell className="w-8 h-8 text-white/30" />
                          </div>
                          <p className="text-lg font-medium">No notifications yet</p>
                          <p className="text-sm text-white/40 mt-1">We'll let you know when something comes up</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {celebrationData && (
          <CelebrationOverlay
            score={celebrationData.score}
            coins={celebrationData.coins}
            streak={celebrationData.streak}
            onClose={() => setCelebrationData(null)}
          />
        )}
        {showLevelUpPopup && leveledUpTo && (
          <div className="fixed inset-0 bg-[#0a0a0c]/95 backdrop-blur-sm z-[100] flex flex-col items-center justify-center p-6 text-white text-center">
            <motion.div initial={{ scale: 0.8, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="max-w-sm w-full bg-[#121215] rounded-[32px] p-8 border border-white/5 shadow-2xl relative overflow-hidden flex flex-col items-center">
              <h2 className="text-3xl font-black mb-2">Level Up!</h2>
              <p className="text-white/60 mb-6 font-medium">You've reached</p>
              
              <h3 className="text-4xl font-black text-[#00e5ff] tracking-tight mb-8 drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                {leveledUpTo.title}
              </h3>
              
              <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-indigo-500 rounded-[2.5rem] blur-xl opacity-40 animate-pulse"></div>
                <div className="relative w-28 h-28 bg-gradient-to-br from-[#6b4eff] to-[#4c35e6] rounded-[2.2rem] flex items-center justify-center shadow-lg border-[3px] border-[#8168ff]/50 z-10">
                   <svg className="w-14 h-14 text-white drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                   <div className="absolute -bottom-4 bg-[#0a0a0c] px-4 py-1.5 rounded-b-2xl border-b-[3px] border-l-[3px] border-r-[3px] border-[#00e5ff] shadow-[0_4px_10px_rgba(0,229,255,0.3)]">
                     <span className="text-xl font-bold text-white">{leveledUpTo.level}</span>
                   </div>
                </div>
              </div>
              
              <p className="text-white font-bold mb-4 text-sm">Rewards Unlocked</p>
              
              <div className="flex gap-3 w-full mb-8">
                <div className="flex-1 bg-white/[0.03] rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <span className="text-xs font-black text-white">XP</span>
                  </div>
                  <span className="font-bold text-lg text-white">+{leveledUpTo.maxXP}</span>
                  <span className="text-[10px] text-white/40 uppercase font-bold">XP</span>
                </div>
                <div className="flex-1 bg-white/[0.03] rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/50 flex items-center justify-center mb-2">
                    <Diamond className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="font-bold text-lg text-white">+{leveledUpTo.level * 5}</span>
                  <span className="text-[10px] text-white/40 uppercase font-bold">Gems</span>
                </div>
                <div className="flex-1 bg-white/[0.03] rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/50 flex items-center justify-center mb-2">
                    <Zap className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="font-bold text-lg text-white">+1</span>
                  <span className="text-[10px] text-white/40 uppercase font-bold leading-tight">Streak<br/>Slot</span>
                </div>
              </div>
              
              <button 
                onClick={() => setShowLevelUpPopup(false)}
                className="w-full bg-[#7c5cff] hover:bg-[#6848e8] text-white font-bold py-4 rounded-[16px] text-[16px] transition-colors shadow-[0_0_20px_rgba(124,92,255,0.4)]"
              >
                Continue Your Journey
              </button>
            </motion.div>
          </div>
        )}
    </div>
  );
}










