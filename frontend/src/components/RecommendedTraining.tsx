import React, { useMemo } from 'react';
import { Grid3X3, Brain, Play, Zap, Sparkles, Crown, Target, Calculator } from 'lucide-react';
import { allGames } from '../App';

interface Session {
  gameType: string;
  score: number;
}

interface RecommendedTrainingProps {
  onPlay?: (gameId: string) => void;
  sessions?: Session[];
}

export default function RecommendedTraining({ onPlay, sessions = [] }: RecommendedTrainingProps) {
  // Determine weakest category
  const getWeakestCategory = () => {
    if (!sessions || sessions.length === 0) {
      // Default fallback
      return 'Logic';
    }

    const categoryStats: Record<string, { totalScore: number; count: number }> = {};
    
    sessions.forEach(session => {
      // Map session gameType (e.g., 'memory') to allGames category (e.g., 'Memory')
      const cat = session.gameType.charAt(0).toUpperCase() + session.gameType.slice(1);
      
      if (!categoryStats[cat]) {
        categoryStats[cat] = { totalScore: 0, count: 0 };
      }
      categoryStats[cat].totalScore += session.score;
      categoryStats[cat].count += 1;
    });

    let weakestCategory = 'Logic';
    let lowestAvg = Infinity;

    Object.keys(categoryStats).forEach(cat => {
      const avg = categoryStats[cat].totalScore / categoryStats[cat].count;
      if (avg < lowestAvg) {
        lowestAvg = avg;
        weakestCategory = cat;
      }
    });

    return weakestCategory;
  };

  const weakestCategory = getWeakestCategory();

  // Pick 3 games from the weakest category
  const recommendations = useMemo(() => {
    // Filter allGames by the weakest category
    const categoryGames = allGames.filter(g => g.category === weakestCategory);
    
    // If we don't have enough games in that category, just mix with allGames
    let pool = categoryGames.length >= 3 ? categoryGames : allGames;

    // Use a simple seed based on the current day to keep recommendations stable for the day
    const today = new Date();
    const seed = today.getDate() + today.getMonth();
    
    // Shuffle pool with seed
    const shuffled = [...pool].sort((a, b) => {
      const hashA = (a.id.charCodeAt(0) + seed) % 10;
      const hashB = (b.id.charCodeAt(0) + seed) % 10;
      return hashA - hashB;
    });

    return shuffled.slice(0, 3).map(game => ({
      id: game.id,
      gameId: game.id,
      name: game.title,
      category: game.category,
      icon: (game as any).icon,
      iconBg: `${(game as any).color} border ${(game as any).border || 'border-white/10'}`,
      isPremium: (game as any).isPremium
    }));
  }, [weakestCategory]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-[#a855f7]" />
        <h3 className="text-lg font-bold text-white">Ai Recommended Training</h3>
      </div>
      
      <div className="space-y-3">
        {recommendations.map((item) => (
          <div 
            key={item.id}
            onClick={() => onPlay && onPlay(item.gameId)}
            className="flex justify-between items-center bg-[#252528] rounded-2xl p-4 cursor-pointer hover:bg-[#2d2d30] transition-colors shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
                {item.icon}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-[18px] text-white tracking-tight mb-0.5">{item.name}</h4>
                  {item.isPremium && (
                    <Crown className="w-5 h-5 text-[#f59e0b]" />
                  )}
                </div>
                <p className="text-[13px] text-white/50">{item.category} • Area for improvement</p>
              </div>
            </div>
            <div className="shrink-0 flex items-center justify-center mr-1">
              <Play className="w-6 h-6 text-white/40 group-hover:text-white transition-colors pl-1" strokeWidth={1.5} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

