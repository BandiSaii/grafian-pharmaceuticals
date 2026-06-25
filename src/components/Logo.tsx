'use client';

import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  priority?: boolean;
}

/**
 * Grafian Pharmaceuticals logo.
 * Uses the transparent PNG (alpha channel) — just the green tree icon
 * and orange "Grafian Pharmaceuticals™" text, no background fill.
 * Sits naturally on any background color (white nav, dark footer, gradient hero, etc.).
 */
export function Logo({ variant = 'light', className = '', priority = false }: LogoProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ aspectRatio: '585 / 348' }}
    >
      <Image
        src="/logo-white.png"
        alt="Grafian Pharmaceuticals"
        fill
        priority={priority}
        sizes="(max-width: 768px) 500px, 700px"
        quality={100}
        className="object-contain drop-shadow-[0_20px_60px_rgba(15,23,42,0.16)]"
      />
    </div>
  );
}
