import React from 'react';

interface ChallengesIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

export function ChallengesIcon({ className = 'w-6 h-6', size, ...props }: ChallengesIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      {/* 
        Trophy Logo matching the user's design:
        - Cup with curved bowl and rounded rim
        - Symmetrical left and right handles with inner cutouts
        - Center circular cutout emblem in the cup
        - Stem column
        - Flared rounded base plate
      */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 3.2C5.45 3.2 5 3.65 5 4.2v.3h-.5C2.8 4.5 1.5 5.8 1.5 7.5c0 1.7 1.3 3 3 3h1c.7 2.3 2.6 4 5 4.4v3.1H8c-.8 0-1.5.7-1.5 1.5v1c0 .3.2.5.5.5h10c.3 0 .5-.2.5-.5v-1c0-.8-.7-1.5-1.5-1.5h-2.5v-3.1c2.4-.4 4.3-2.1 5-4.4h1c1.7 0 3-1.3 3-3 0-1.7-1.3-3-3-3h-.5v-.3c0-.55-.45-1-1-1H6zm-1.5 3H5v2.6h-.5c-.7 0-1.3-.6-1.3-1.3 0-.7.6-1.3 1.3-1.3zm14.5 0h.5c.7 0 1.3.6 1.3 1.3 0 .7-.6 1.3-1.3 1.3H19V6.2zm-7 .8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
      />
    </svg>
  );
}

export default ChallengesIcon;
