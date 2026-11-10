import React from 'react';

interface BrandLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'vertical' | 'horizontal';
  taglineText?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  showTagline = true,
  size = 'md',
  variant = 'vertical',
  taglineText
}) => {
  const iconSizes = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  return (
    <div
      className={`flex ${
        variant === 'vertical' ? 'flex-col items-center text-center' : 'flex-row items-center gap-3'
      } ${className}`}
    >
      {/* SVG Emblem representing two seniors protected by home and caring hands */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center flex-shrink-0`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Circular subtle background glow */}
          <circle cx="50" cy="50" r="48" fill="#F0FDFA" />
          
          {/* Protective Roof Arch */}
          <path
            d="M20 44 L50 20 L80 44"
            stroke="#0D9488"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M30 36 V24 H37 V30"
            stroke="#0D9488"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Elderly Couple Heads */}
          {/* Elder 1 (Female / Bun) */}
          <circle cx="41" cy="42" r="7" fill="#042F2E" />
          {/* Elder 2 (Male) */}
          <circle cx="59" cy="42" r="7.5" fill="#042F2E" />

          {/* Elderly Couple Body Silhouette */}
          <path
            d="M31 62 C31 52, 40 51, 46 54 C46 54, 49 52, 54 52 C62 52, 69 54, 69 62"
            fill="#0F766E"
          />

          {/* Cupping Caring Hands */}
          <path
            d="M18 64 C24 76, 42 82, 54 82 C68 82, 80 74, 84 66 C78 72, 65 76, 52 75 C36 74, 25 68, 18 64 Z"
            fill="#0D9488"
          />

          {/* Green Leaf Accent */}
          <path
            d="M74 65 C78 57, 88 56, 90 56 C90 64, 85 70, 77 71 C75 70, 74 67, 74 65 Z"
            fill="#10B981"
          />
          <path
            d="M76 68 C81 64, 85 61, 88 59"
            stroke="#047857"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className={variant === 'vertical' ? 'mt-2' : ''}>
        <h1 className={`font-bold tracking-tight text-teal-950 font-sans ${titleSizes[size]}`}>
          Senior<span className="text-teal-700">Sphere</span>
        </h1>
        {showTagline && (
          <p className="text-xs sm:text-sm font-medium text-teal-700/90 whitespace-pre-line leading-snug mt-0.5">
            {taglineText || 'Connected Care. Comfortable Living.'}
          </p>
        )}
      </div>
    </div>
  );
};
