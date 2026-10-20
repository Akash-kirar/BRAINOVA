import React, { useState, useEffect } from 'react';
import BrainBuddyAvatar, { getAvatarTheme } from './BrainBuddyAvatar';

export interface UserAvatarProps {
  src?: string | null;
  name?: string;
  userId?: string;
  variant?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
  className?: string;
  imgStyle?: React.CSSProperties;
  showBorder?: boolean;
}

const sizeClassMap: Record<string, string> = {
  xs: 'w-6 h-6 min-w-[24px] min-h-[24px]',       // 24px
  sm: 'w-10 h-10 min-w-[40px] min-h-[40px]',     // 40px
  md: 'w-16 h-16 min-w-[64px] min-h-[64px]',     // 64px
  lg: 'w-20 h-20 min-w-[80px] min-h-[80px]',     // 80px
  xl: 'w-24 h-24 min-w-[96px] min-h-[96px]',     // 96px
  '2xl': 'w-36 h-36 min-w-[144px] min-h-[144px]', // 144px
};

export function UserAvatar({
  src,
  name,
  userId,
  variant,
  size,
  className = '',
  imgStyle,
  showBorder = false,
}: UserAvatarProps) {
  const [hasError, setHasError] = useState(false);

  // Reset error if the source URL changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  // Check if src is an explicit Brain Buddy avatar selection (e.g. "avatar:cobalt")
  const isMascotAvatarSelection = Boolean(src && typeof src === 'string' && src.startsWith('avatar:'));
  const mascotThemeId = isMascotAvatarSelection ? src!.replace('avatar:', '') : null;

  // Real image URL or base64 data
  const hasCustomPhoto = Boolean(src && src.trim() && !isMascotAvatarSelection && !hasError);

  // Seed for deterministic distinct avatar per user
  const effectiveSeed = variant || mascotThemeId || userId || name || 'default';
  const theme = getAvatarTheme(effectiveSeed);

  let dimensionStyle: React.CSSProperties | undefined;
  let dimensionClasses = 'w-full h-full';

  if (typeof size === 'number') {
    dimensionStyle = { width: size, height: size, minWidth: size, minHeight: size };
    dimensionClasses = '';
  } else if (size && sizeClassMap[size]) {
    dimensionClasses = sizeClassMap[size];
  }

  return (
    <div
      className={`relative rounded-full overflow-hidden flex items-center justify-center shrink-0 bg-[#06080c] select-none ${
        showBorder ? 'border' : ''
      } ${dimensionClasses} ${className}`}
      style={{
        ...dimensionStyle,
        borderColor: showBorder ? `${theme.strokeMain}40` : undefined,
      }}
    >
      {hasCustomPhoto ? (
        <img
          src={src!}
          alt={name ? `${name}'s profile photo` : 'User profile photo'}
          className="w-full h-full object-cover"
          style={imgStyle}
          onError={() => setHasError(true)}
          loading="lazy"
        />
      ) : (
        <BrainBuddyAvatar
          variant={mascotThemeId || variant}
          seed={effectiveSeed}
          alt={name ? `${name} (${theme.name})` : `Brainova Brain Buddy (${theme.name})`}
          className="w-full h-full"
          showBorder={false}
        />
      )}
    </div>
  );
}

export default UserAvatar;
