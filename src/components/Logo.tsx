'use client';

import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  priority?: boolean;
}

/**
 * Grafian Pharmaceuticals logo.
 * Uses the processed PNG on white background.
 * `variant="dark"` -> for dark backgrounds (we still use the white-bg PNG, since the logo itself
 * has a green tree + orange text that pops on dark backgrounds too).
 */
export function Logo({ variant = 'light', className = '', priority = false }: LogoProps) {
  // The processed logo has a white background — visible on both light and dark surfaces.
  // For dark backgrounds we wrap it in a small white rounded card to maintain brand consistency.
  if (variant === 'dark') {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-white shadow-pharma ${className}`}
        style={{ aspectRatio: '1280 / 853' }}
      >
        <Image
          src="/logo-white.png"
          alt="Grafian Pharmaceuticals"
          fill
          priority={priority}
          sizes="(max-width: 768px) 160px, 200px"
          className="object-contain p-1"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative ${className}`}
      style={{ aspectRatio: '1280 / 853' }}
    >
      <Image
        src="/logo-white.png"
        alt="Grafian Pharmaceuticals"
        fill
        priority={priority}
        sizes="(max-width: 768px) 180px, 220px"
        className="object-contain"
      />
    </div>
  );
}
