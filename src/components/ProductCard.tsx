'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Pill, Heart, Droplet, Wind, Shield, Sparkles, Leaf, PackageCheck } from 'lucide-react';
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
 * strength badge, and a category icon. When the user uploads real medicine box photos
 * later, we can swap this CSS design for the actual <Image> component.
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
      {/* Medicine box preview area */}
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${product.cardColor} 0%, ${product.cardColor2} 100%)`,
        }}
      >
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #ffffff 1px, transparent 1.5px)',
            backgroundSize: '14px 14px',
          }}
        />
        {/* Glare */}
        <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-white/20 blur-2xl" />

        {/* Category pill */}
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-grafian-blue-deep shadow-sm">
          <Icon className="h-3 w-3" />
          {product.category}
        </div>

        {/* Prescription badge */}
        {product.prescriptionRequired && (
          <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-red-500/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
            Rx
          </div>
        )}

        {/* Box content - mock medicine packaging design */}
        <div className="absolute inset-x-5 bottom-5 text-white">
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-80 mb-1">
            {product.genericName.split(' ')[0]}
          </div>
          <div className="text-2xl font-black leading-none drop-shadow-sm">
            {product.brandName}
          </div>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-white/15 backdrop-blur px-2 py-0.5 text-xs font-semibold">
            <PackageCheck className="h-3 w-3" />
            {product.strength}
          </div>
        </div>

        {/* Hover arrow */}
        <div className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-grafian-blue-deep opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 shadow-pharma">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>

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
