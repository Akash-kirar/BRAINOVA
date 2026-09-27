-- Migration: Add total_xp to user_stats
ALTER TABLE public.user_stats ADD COLUMN IF NOT EXISTS total_xp BIGINT NOT NULL DEFAULT 0;

-- Backfill total_xp from existing JSONB
UPDATE public.user_stats
SET total_xp = (
  CASE 
    WHEN (stats->>'totalXp') ~ '^[0-9]+$' THEN (stats->>'totalXp')::bigint 
    ELSE 0 
  END
)
WHERE stats ? 'totalXp';

-- Create index
CREATE INDEX IF NOT EXISTS user_stats_total_xp_idx ON public.user_stats (total_xp DESC);
