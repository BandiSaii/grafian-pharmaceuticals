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
      style={{ aspectRatio: '1152 / 864' }}
    >
      <Image
        src="/logo.png"
        alt="Grafian Pharmaceuticals"
        fill
        priority={priority}
        sizes="(max-width: 768px) 280px, 400px"
        className="object-contain"
      />
    </div>
  );
}
