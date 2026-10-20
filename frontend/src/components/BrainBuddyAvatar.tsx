import React, { useId } from 'react';

export interface AvatarTheme {
  id: string;
  name: string;
  subtitle: string;
  bgDark: string;
  bgRadial: string;
  bodyTop: string;
  bodyMid: string;
  bodyBottom: string;
  strokeLight: string;
  strokeMain: string;
  strokeAccent1: string;
  strokeAccent2: string;
  blush: string;
  sparkle: string;
  eyeHighlight: string;
}

export const AVATAR_THEMES: AvatarTheme[] = [
  {
    id: 'emerald',
    name: 'Nova Emerald',
    subtitle: 'The Logic Genius',
    bgDark: '#06080c',
    bgRadial: '#0d261e',
    bodyTop: '#00D68F',
    bodyMid: '#00A870',
    bodyBottom: '#1E3A8A',
    strokeLight: '#4EFEB3',
    strokeMain: '#00D68F',
    strokeAccent1: '#38BDF8',
    strokeAccent2: '#3B82F6',
    blush: '#00D68F',
    sparkle: '#4EFEB3',
    eyeHighlight: '#4EFEB3',
  },
  {
    id: 'cobalt',
    name: 'Cyber Cobalt',
    subtitle: 'The Speed Master',
    bgDark: '#050811',
    bgRadial: '#0c1e3d',
    bodyTop: '#38BDF8',
    bodyMid: '#2563EB',
    bodyBottom: '#1D4ED8',
    strokeLight: '#93C5FD',
    strokeMain: '#3B82F6',
    strokeAccent1: '#06B6D4',
    strokeAccent2: '#60A5FA',
    blush: '#38BDF8',
    sparkle: '#93C5FD',
    eyeHighlight: '#60A5FA',
  },
  {
    id: 'violet',
    name: 'Cosmic Violet',
    subtitle: 'The Deep Thinker',
    bgDark: '#090514',
    bgRadial: '#220d3d',
    bodyTop: '#C084FC',
    bodyMid: '#9333EA',
    bodyBottom: '#4C1D95',
    strokeLight: '#E9D5FF',
    strokeMain: '#A855F7',
    strokeAccent1: '#EC4899',
    strokeAccent2: '#8B5CF6',
    blush: '#EC4899',
    sparkle: '#F472B6',
    eyeHighlight: '#E9D5FF',
  },
  {
    id: 'amber',
    name: 'Solar Gold',
    subtitle: 'The Creative Spark',
    bgDark: '#110903',
    bgRadial: '#2e1704',
    bodyTop: '#FBBF24',
    bodyMid: '#D97706',
    bodyBottom: '#9A3412',
    strokeLight: '#FDE68A',
    strokeMain: '#F59E0B',
    strokeAccent1: '#FB923C',
    strokeAccent2: '#EF4444',
    blush: '#F59E0B',
    sparkle: '#FDE68A',
    eyeHighlight: '#FCD34D',
  },
  {
    id: 'rose',
    name: 'Neon Rose',
    subtitle: 'The Intuitive Mind',
    bgDark: '#120409',
    bgRadial: '#330a1c',
    bodyTop: '#FB7185',
    bodyMid: '#E11D48',
    bodyBottom: '#881337',
    strokeLight: '#FECDD3',
    strokeMain: '#F43F5E',
    strokeAccent1: '#F472B6',
    strokeAccent2: '#FB7185',
    blush: '#FB7185',
    sparkle: '#FECDD3',
    eyeHighlight: '#FDA4AF',
  },
  {
    id: 'cyan',
    name: 'Quantum Cyan',
    subtitle: 'The Focus Architect',
    bgDark: '#040f14',
    bgRadial: '#092833',
    bodyTop: '#22D3EE',
    bodyMid: '#0891B2',
    bodyBottom: '#164E63',
    strokeLight: '#A5F3FC',
    strokeMain: '#06B6D4',
    strokeAccent1: '#2DD4BF',
    strokeAccent2: '#0EA5E9',
    blush: '#22D3EE',
    sparkle: '#A5F3FC',
    eyeHighlight: '#67E8F9',
  },
  {
    id: 'blaze',
    name: 'Magma Blaze',
    subtitle: 'The Precision Ace',
    bgDark: '#120703',
    bgRadial: '#331508',
    bodyTop: '#FB923C',
    bodyMid: '#EA580C',
    bodyBottom: '#7C2D12',
    strokeLight: '#FED7AA',
    strokeMain: '#F97316',
    strokeAccent1: '#EF4444',
    strokeAccent2: '#FBBF24',
    blush: '#FB923C',
    sparkle: '#FED7AA',
    eyeHighlight: '#FED7AA',
  },
  {
    id: 'obsidian',
    name: 'Obsidian Platinum',
    subtitle: 'The Grand Master',
    bgDark: '#080b12',
    bgRadial: '#182038',
    bodyTop: '#A5B4FC',
    bodyMid: '#6366F1',
    bodyBottom: '#312E81',
    strokeLight: '#E0E7FF',
    strokeMain: '#818CF8',
    strokeAccent1: '#38BDF8',
    strokeAccent2: '#C084FC',
    blush: '#818CF8',
    sparkle: '#E0E7FF',
    eyeHighlight: '#C7D2FE',
  },
];

/**
 * Resolves a seed (theme ID, user ID, or user name) to a deterministic theme
 */
export function getAvatarTheme(seed?: string | null): AvatarTheme {
  if (!seed || !seed.trim()) return AVATAR_THEMES[0];
  const normalized = seed.trim().toLowerCase();

  // Direct match by theme ID
  const directMatch = AVATAR_THEMES.find((t) => t.id === normalized);
  if (directMatch) return directMatch;

  // If prefixed with avatar: (e.g. avatar:cobalt)
  if (normalized.startsWith('avatar:')) {
    const sub = normalized.replace('avatar:', '');
    const m = AVATAR_THEMES.find((t) => t.id === sub);
    if (m) return m;
  }

  // Deterministic hashing based on string seed
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % AVATAR_THEMES.length;
  return AVATAR_THEMES[index];
}

export interface BrainBuddyAvatarProps extends React.SVGProps<SVGSVGElement> {
  variant?: string | null;
  seed?: string | null;
  className?: string;
  size?: number | string;
  alt?: string;
  showBorder?: boolean;
}

/**
 * Brainova Brain Buddy Mascot Avatar
 * 
 * Supports 8 distinctive personality color themes.
 * Can be assigned explicitly or deterministically generated based on user name/ID.
 */
export function BrainBuddyAvatar({
  variant,
  seed,
  className = 'w-full h-full',
  size,
  alt = 'Brainova Brain Buddy',
  showBorder = true,
  ...props
}: BrainBuddyAvatarProps) {
  const uid = useId().replace(/:/g, '');
  const theme = getAvatarTheme(variant || seed);

  const bgGradId = `bb-bg-${uid}`;
  const bodyGradId = `bb-body-${uid}`;
  const strokeGradId = `bb-stroke-${uid}`;
  const foldGradId = `bb-fold-${uid}`;
  const glowFilterId = `bb-glow-${uid}`;

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={`select-none shrink-0 ${className}`}
      role="img"
      aria-label={alt}
      {...props}
    >
      <title>{alt}</title>
      <defs>
        {/* Dark Background Gradient with subtle radiant warmth */}
        <radialGradient id={bgGradId} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={theme.bgRadial} />
          <stop offset="60%" stopColor={theme.bgDark} />
          <stop offset="100%" stopColor="#040608" />
        </radialGradient>

        {/* Brain Body Gradient */}
        <linearGradient id={bodyGradId} x1="50%" y1="15%" x2="50%" y2="85%">
          <stop offset="0%" stopColor={theme.bodyTop} stopOpacity="0.32" />
          <stop offset="45%" stopColor={theme.bodyMid} stopOpacity="0.22" />
          <stop offset="85%" stopColor={theme.bodyBottom} stopOpacity="0.28" />
          <stop offset="100%" stopColor="#040608" stopOpacity="0.45" />
        </linearGradient>

        {/* Main Contour Gradient */}
        <linearGradient id={strokeGradId} x1="20%" y1="10%" x2="80%" y2="90%">
          <stop offset="0%" stopColor={theme.strokeLight} />
          <stop offset="45%" stopColor={theme.strokeMain} />
          <stop offset="80%" stopColor={theme.strokeAccent1} />
          <stop offset="100%" stopColor={theme.strokeAccent2} />
        </linearGradient>

        {/* Brain Fold Sulci Gradient */}
        <linearGradient id={foldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={theme.strokeMain} />
          <stop offset="60%" stopColor={theme.strokeAccent1} />
          <stop offset="100%" stopColor={theme.strokeAccent2} />
        </linearGradient>

        {/* Soft Glow */}
        <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Avatar Circular Background */}
      <circle
        cx="50"
        cy="50"
        r="49"
        fill={`url(#${bgGradId})`}
        stroke={showBorder ? theme.strokeMain : 'none'}
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />

      {/* Subtle Backlight Glows */}
      <circle cx="50" cy="46" r="26" fill={theme.strokeMain} fillOpacity="0.14" filter={`url(#${glowFilterId})`} />
      <circle cx="50" cy="54" r="22" fill={theme.strokeAccent1} fillOpacity="0.1" filter={`url(#${glowFilterId})`} />

      {/* Brain Buddy Character Group */}
      <g id="brain-character">
        {/* Main Symmetrical Silhouette */}
        <path
          d="M 50 20
             C 41 14 26 16 21 27
             C 16 33 14 43 18 51
             C 14 59 18 70 30 73
             C 37 75 44 74 50 69
             C 56 74 63 75 70 73
             C 82 70 86 59 82 51
             C 86 43 84 33 79 27
             C 74 16 59 14 50 20 Z"
          fill={`url(#${bodyGradId})`}
          stroke={`url(#${strokeGradId})`}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Central Cerebral Fissures */}
        <path
          d="M 50 20 C 50 26 49.5 32 49 38"
          stroke={theme.strokeMain}
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 50 65 L 50 69"
          stroke={theme.strokeAccent1}
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Left Hemisphere Folds */}
        <path
          d="M 33 24 C 36 30 42 32 45 35"
          stroke={`url(#${foldGradId})`}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 20 42 C 26 39 31 43 32 47"
          stroke={`url(#${foldGradId})`}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 23 60 C 27 58 31 61 31 64"
          stroke={`url(#${foldGradId})`}
          strokeWidth="1.8"
          strokeOpacity="0.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Right Hemisphere Folds */}
        <path
          d="M 67 24 C 64 30 58 32 55 35"
          stroke={`url(#${foldGradId})`}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 80 42 C 74 39 69 43 68 47"
          stroke={`url(#${foldGradId})`}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 77 60 C 73 58 69 61 69 64"
          stroke={`url(#${foldGradId})`}
          strokeWidth="1.8"
          strokeOpacity="0.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Soft Friendly Cheeks */}
        <ellipse cx="30" cy="57" rx="3.5" ry="2" fill={theme.blush} fillOpacity="0.32" filter={`url(#${glowFilterId})`} />
        <ellipse cx="70" cy="57" rx="3.5" ry="2" fill={theme.blush} fillOpacity="0.32" filter={`url(#${glowFilterId})`} />

        {/* Left Intelligent Eye */}
        <g id="left-eye">
          <ellipse cx="37" cy="51.5" rx="4.5" ry="5.5" fill="#07131B" stroke={theme.strokeMain} strokeWidth="1.5" />
          <ellipse cx="37" cy="51.5" rx="4" ry="5" fill="#03080D" />
          <circle cx="38.5" cy="49.5" r="1.8" fill="#FFFFFF" />
          <circle cx="35.5" cy="54" r="0.9" fill={theme.eyeHighlight} />
        </g>

        {/* Right Intelligent Eye */}
        <g id="right-eye">
          <ellipse cx="63" cy="51.5" rx="4.5" ry="5.5" fill="#07131B" stroke={theme.strokeMain} strokeWidth="1.5" />
          <ellipse cx="63" cy="51.5" rx="4" ry="5" fill="#03080D" />
          <circle cx="64.5" cy="49.5" r="1.8" fill="#FFFFFF" />
          <circle cx="61.5" cy="54" r="0.9" fill={theme.eyeHighlight} />
        </g>

        {/* Eyelash / Brow Arches */}
        <path d="M 32.5 44 C 35.5 42.5 39.5 43 41.5 45" stroke={theme.strokeLight} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M 67.5 44 C 64.5 42.5 60.5 43 58.5 45" stroke={theme.strokeLight} strokeWidth="1.6" strokeLinecap="round" fill="none" />

        {/* Warm Confident Smile */}
        <path
          d="M 44.5 59 C 47.5 63 52.5 63 55.5 59"
          stroke={theme.strokeMain}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Intellect Glint Sparkle */}
        <path
          d="M 73 17 L 74 20 L 77 21 L 74 22 L 73 25 L 72 22 L 69 21 L 72 20 Z"
          fill={theme.sparkle}
          opacity="0.95"
          filter={`url(#${glowFilterId})`}
        />
        <circle cx="73" cy="21" r="1" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

export default BrainBuddyAvatar;
