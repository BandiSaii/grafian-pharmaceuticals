'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Pill, Heart, Droplet, Wind, Shield, Sparkles, Leaf } from 'lucide-react';
import type { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  index?: number;
}

const categoryIcons: Record<string, React.ElementType> = {
  'Cardiac Care': Heart,
  'Diabetic Care': Droplet,
  'Anti Allergy': Wind,
  PPI: Pill,
  Antibiotic: Shield,
  'Multivitamin & Multiminerals': Sparkles,
  'General Care': Leaf,
};

/**
 * Product card with CSS-rendered "medicine box" preview.
 * Each product gets a unique color identity derived from its category / strength.
 * The box design mimics a real pharmaceutical package — front face with brand name,
 * strength badge, and a category icon.
 *
 * When product.image is set, the entire top area is replaced with the real medicine
 * photo: white background, object-fit: contain, centered with equal padding, no
 * overlays of any kind.
 */
export function ProductCard({ product, onClick, index = 0 }: ProductCardProps) {
  const Icon = categoryIcons[product.category] || Pill;

  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.4), ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col rounded-2xl bg-white border border-slate-100 shadow-pharma hover:shadow-pharma-lg transition-shadow text-left overflow-hidden"
    >
      {product.image ? (
        /* ── Real medicine photo: white container with image only, no overlays ── */
        <div className="relative aspect-[4/3] overflow-hidden bg-white">
          <Image
            src={product.image}
            alt={product.imageAlt ?? product.brandName}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        /* ── CSS-rendered gradient card (no photo uploaded yet) ── */
        <div
          className="relative aspect-[4/3] overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${product.cardColor} 0%, ${product.cardColor2} 100%)`,
          }}
        >
          {/* subtle pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1.5px)', backgroundSize: '14px 14px' }} />

          {/* top-left category pill */}
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-grafian-blue-deep shadow-sm">
            <Icon className="h-3 w-3" />
            {product.category}
          </div>

          {/* Rx badge */}
          {product.prescriptionRequired && (
            <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-red-500/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
              Rx
            </div>
          )}

          {/* large brand heading (bottom-aligned with safe top spacing) */}
          <div className="absolute inset-x-5 bottom-5 top-20 flex flex-col justify-end gap-3 text-white">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-90 leading-snug line-clamp-2">
              {product.genericName}
            </div>
            <div className="text-2xl md:text-3xl lg:text-3xl font-black leading-snug tracking-tight break-words line-clamp-3">
              {product.brandName}
            </div>
            <div className="inline-flex items-center gap-2 text-[12px] bg-white/10 px-2 py-1 rounded-full font-semibold">
              <span className="font-bold">{product.strength}</span>
            </div>
          </div>

          {/* Hover arrow */}
          <div className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-grafian-blue-deep opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 shadow-pharma">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      )}

      {/* Card body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-grafian-blue-mid mb-1">
          {product.genericName}
        </div>
        <h3 className="text-base font-bold text-slate-900 leading-snug mb-1.5 line-clamp-2">
          {product.brandName}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed flex-1">
          {product.composition}
        </p>
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-[11px] font-medium text-slate-400">Strength: {product.strength}</span>
          <span className="text-[11px] font-semibold text-grafian-blue-deep inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
            View details <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
