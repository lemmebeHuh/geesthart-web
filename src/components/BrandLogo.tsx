import React from 'react';
import Image from 'next/image';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function BrandLogo({
  variant = 'dark',
  size = 'md',
  className = '',
}: BrandLogoProps) {
  const dimensions = {
    sm: { width: 110, height: 34, boxClass: 'h-7 w-[110px]' },
    md: { width: 145, height: 44, boxClass: 'h-9 w-[145px]' },
    lg: { width: 200, height: 60, boxClass: 'h-12 w-[200px]' },
    xl: { width: 280, height: 84, boxClass: 'h-16 w-[240px] sm:w-[290px]' },
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden select-none ${dimensions.boxClass} ${className}`}
    >
      <Image
        src="/images/brand/geesthart-logo.png"
        alt="GEESTHART Bandung"
        width={dimensions.width * 2}
        height={dimensions.height * 2}
        priority
        className={`h-full w-full object-contain scale-[1.65] transition-transform duration-300 ${
          variant === 'light'
            ? 'invert mix-blend-screen brightness-110 contrast-125'
            : 'mix-blend-multiply contrast-125'
        }`}
      />
    </div>
  );
}
