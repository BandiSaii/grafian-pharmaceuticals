'use client';

import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  priority?: boolean;
}

/**
 * Grafian Pharmaceuticals logo.
 * Uses the transparent `logo-white.png` asset from the public folder.
 * The logo image itself retains its original colors and typography with no white background fill.
 * Sits naturally on any background color (white nav, dark footer, gradient hero, etc.).
 */
export function Logo({ variant = 'light', className = '', priority = false }: LogoProps) {
  return (
    <div
      className={`relative ${className} bg-transparent border-none shadow-none p-0`}
      style={{ aspectRatio: '585 / 348', backgroundColor: 'transparent' }}
    >
      <Image
        src="/logo-white.png"
        alt="Grafian Pharmaceuticals"
        fill
        priority={priority}
        sizes="(max-width: 768px) 500px, 700px"
        quality={100}
        className="object-contain"
        style={{ backgroundColor: 'transparent' }}
      />
    </div>
  );
}
