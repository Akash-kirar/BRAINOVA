import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/src/lib/supabase';

export interface LeaderboardEntry {
  id: string;
  name: string;
  xp: number;
  avatarUrl: string | null;
}

interface LeaderboardRow {
  id: string;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
  xp: number | string | null;
}

function getDisplayName(name: string | null, email: string | null, id: string): string {
  if (name?.trim()) return name.trim();
  if (email?.trim()) return email.split('@')[0];
  return `Player ${id.slice(0, 6)}`;
}

export function getLeaderboardAvatar(avatarUrl: string | null, id: string): string | null {
  if (avatarUrl?.trim()) return avatarUrl.trim();
  return null;
}

function mapRows(rows: LeaderboardRow[]): LeaderboardEntry[] {
  return rows
    .map((row) => ({
      id: row.id,
      name: getDisplayName(row.name, row.email, row.id),
      xp: Number(row.xp || 0),
      avatarUrl: row.avatar_url,
    }))
    .sort((a, b) => b.xp - a.xp || a.name.localeCompare(b.name));
}

export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    if (!supabase || !isSupabaseConfigured) {
      setEntries([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const { data: rpcData, error: rpcError } = await supabase.rpc('get_leaderboard');

      if (!rpcError && Array.isArray(rpcData)) {
        setEntries(mapRows(rpcData as LeaderboardRow[]));
        return;
      }

      if (rpcError) {
        console.warn('Leaderboard RPC unavailable, falling back to table queries:', rpcError.message);
      }

      const [{ data: profiles, error: profilesError }, { data: stats, error: statsError }] =
        await Promise.all([
          supabase.from('profiles').select('id, name, email, avatar_url'),
          supabase.from('user_stats').select('user_id, stats'),
        ]);

      if (profilesError) throw profilesError;
      if (statsError) throw statsError;

      const statsMap = new Map(
        (stats || []).map((row) => [
          row.user_id,
          Number((row.stats as { totalXp?: number })?.totalXp || 0),
        ])
      );

      const merged: LeaderboardEntry[] = (profiles || []).map((profile) => ({
        id: profile.id,
        name: getDisplayName(profile.name, profile.email, profile.id),
        xp: statsMap.get(profile.id) ?? 0,
        avatarUrl: profile.avatar_url,
      }));

      merged.sort((a, b) => b.xp - a.xp || a.name.localeCompare(b.name));
      setEntries(merged);
    } catch (e) {
      console.error('Failed to load leaderboard', e);
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUserId(session?.user?.id ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUserId(session?.user?.id ?? null);
    });

    void fetchLeaderboard();

    const channel = supabase
      .channel('leaderboard-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        void fetchLeaderboard();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_stats' }, () => {
        void fetchLeaderboard();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, [fetchLeaderboard]);

  return { entries, loading, currentUserId, refetch: fetchLeaderboard };
}
