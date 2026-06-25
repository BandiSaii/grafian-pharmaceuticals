'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight, Heart, Droplet, Wind, Pill, Shield, Sparkles, Leaf, Award,
  CheckCircle2, Microscope, Factory, Truck, Users, Target, Eye, Quote,
  Phone, Mail, MapPin, Stethoscope,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { ProductCard } from '@/components/ProductCard';
import { products, categoryOrder, categoryDescriptions, type ProductCategory } from '@/lib/products';
import { company, certifications } from '@/lib/company';
import { type Route } from '@/lib/router';

interface HomePageProps {
  route: Route;
  navigate: (to: string) => void;
}

const categoryIcons: Record<ProductCategory, React.ElementType> = {
  'Cardiac Care': Heart,
  'Diabetic Care': Droplet,
  'Anti Allergy': Wind,
  PPI: Pill,
  Antibiotic: Shield,
  'Multivitamin & Multiminerals': Sparkles,
  'General Care': Leaf,
};

const stats = [
  { value: '30+', label: 'Premium Formulations', icon: Pill },
  { value: '7', label: 'Therapeutic Segments', icon: Target },
  { value: '2', label: 'Global Certifications', icon: Award },
  { value: '100%', label: 'Quality Assured', icon: CheckCircle2 },
];

const values = [
  {
    icon: Microscope,
    title: 'Scientific Excellence',
    text: 'Every formulation is engineered on contemporary pharmacological evidence, with bioequivalence and stability data to support clinical confidence.',
  },
  {
    icon: Factory,
    title: 'WHO-GMP Manufacturing',
    text: 'Our manufacturing partners operate under WHO Good Manufacturing Practice standards, ensuring consistent quality across every batch.',
  },
  {
    icon: Truck,
    title: 'Reliable Distribution',
    text: 'A robust cold-chain and ambient supply network delivers products promptly to distributors, hospitals, and pharmacies across India.',
  },
  {
    icon: Users,
    title: 'Customer-First Approach',
    text: 'We build long-term partnerships with doctors, distributors, and healthcare professionals by being responsive, transparent, and dependable.',
  },
];

const processSteps = [
  { step: '01', title: 'Research & Formulation', text: 'Identify therapeutic gaps and engineer formulations backed by current clinical evidence.' },
  { step: '02', title: 'Quality Manufacturing', text: 'WHO-GMP compliant manufacturing with rigorous in-process controls and batch release testing.' },
  { step: '03', title: 'Quality Assurance', text: 'Multi-stage QA checks ensure every product meets pharmacopoeial specifications before dispatch.' },
  { step: '04', title: 'Distribution & Support', text: 'Nationwide distribution network with continuing medical education for healthcare partners.' },
];

export function HomePage({ route, navigate }: HomePageProps) {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="flex flex-col">
      {/* ============ HERO ============ */}
      <section
        className="relative overflow-hidden gradient-hero-radial"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 35%, rgba(255,255,255,0.6) 45%, rgba(255,255,255,0.15) 55%, rgba(255,255,255,0) 65%), url(/uploads/manifact.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 pattern-grid opacity-60" />
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-grafian-blue-200/30 blur-3xl animate-blob" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-grafian-blue-100/40 blur-3xl animate-blob" style={{ animationDelay: '3s' }} />

        <div className="container mx-auto px-4 pt-6 md:pt-10 pb-16 md:pb-24 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left: Logo + headline */}
            <div className="flex flex-col items-start text-left">
              {/* Logo prominent display - per user request: only display the company logo in hero */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative mb-8"
              >
                <Logo className="h-64 md:h-80 w-auto" priority />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-1.5 text-xs font-semibold text-grafian-blue-deep border border-grafian-blue-200 mb-5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                WHO-GMP & ISO 9001:2015 Certified Manufacturer
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7 }}
                className="text-3xl md:text-4xl lg:text-5xl font-black text-grafian-blue-deep leading-[1.1] mb-4 text-balance"
              >
                Premium pharmaceuticals for{' '}
                <span className="text-gradient-pharma">cardiac, diabetic & general care</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed mb-7"
              >
                Grafian Pharmaceuticals formulates evidence-based medicines that doctors trust and patients rely on. Built on rigorous quality standards, our growing portfolio spans seven therapeutic segments.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.7 }}
                className="flex flex-wrap gap-3"
              >
                <button
                  onClick={() => navigate('/products')}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-grafian-blue-deep to-grafian-blue-mid px-6 py-3 text-sm font-semibold text-white shadow-pharma hover:shadow-pharma-lg hover:-translate-y-0.5 transition-all"
                >
                  Explore Products
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate('/about')}
                  className="inline-flex items-center gap-2 rounded-full bg-white border border-grafian-blue-200 px-6 py-3 text-sm font-semibold text-grafian-blue-deep hover:bg-grafian-blue-50 transition-all"
                >
                  About Grafian
                </button>
              </motion.div>

              {/* Stats inline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.7 }}
                className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-xl"
              >
                {stats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-grafian-blue-deep">
                        <Icon className="h-4 w-4 opacity-60" />
                        <span className="text-2xl md:text-3xl font-black">{s.value}</span>
                      </div>
                      <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide leading-tight">
                        {s.label}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Right: Floating cards composition with background image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.9 }}
              className="relative hidden lg:block h-[520px]"
            >

              {/* Main floating card 1 - Cardiac Care - Left Column */}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-20 left-4 w-70 rounded-2xl bg-white shadow-pharma-lg p-5 border border-grafian-blue-100 z-10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <Heart className="h-5 w-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Cardiac Care</div>
                    <div className="font-bold text-slate-900">16 Formulations</div>
                  </div>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Complete anti-hypertensive & lipid-lowering portfolio covering TERYN & ROJUTRI ranges.
                </div>
              </motion.div>

              {/* Floating card 2 - Diabetic Care - Right Column Below WHO-GMP */}
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-[220px] right-0 w-72 rounded-2xl bg-white shadow-pharma-lg p-5 border border-grafian-blue-100 z-10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
                    <Droplet className="h-5 w-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Diabetic Care</div>
                    <div className="font-bold text-slate-900">8 Formulations</div>
                  </div>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  GUNAA & SIPIN ranges combining glimepiride, sitagliptin, metformin and voglibose.
                </div>
              </motion.div>

              {/* Floating card 3 - Multivitamins - Left Column Below Cardiac Care */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute top-[400px] left-4 w-72 rounded-2xl bg-white shadow-pharma-lg p-5 border border-grafian-blue-100 z-10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Multivitamins</div>
                    <div className="font-bold text-slate-900">STROBIC Range</div>
                  </div>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Neuro-nutrient complexes, 4G vitality blend and high-strength Vitamin D3.
                </div>
              </motion.div>

              {/* Trust badge floating - WHO-GMP Certified - Right Column Top */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 right-25 rounded-2xl bg-white shadow-pharma-lg px-4 py-3 flex items-center gap-3 border border-grafian-blue-100 z-10"
              >
                <div className="h-12 w-12 rounded-full bg-white p-1 shadow-pharma flex items-center justify-center shrink-0">
                  <img src="/certificates/who-gmp.png" alt="WHO-GMP" className="h-full w-full object-contain" />
                </div>
                <div className="text-[11px] font-bold text-grafian-blue-deep leading-tight pr-1">
                  WHO-GMP<br />Certified
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div className="relative">
          <svg viewBox="0 0 1440 80" className="w-full h-[40px] md:h-[60px] block" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ============ THERAPEUTIC SEGMENTS ============ */}
      <section className="bg-white py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-grafian-blue-mid mb-3"
            >
              Our Therapeutic Expertise
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Seven specialised segments, one promise of quality
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Our portfolio addresses India&apos;s most prevalent chronic and acute care needs, with each segment built on contemporary clinical evidence and rigorous quality controls.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categoryOrder.map((cat, idx) => {
              const Icon = categoryIcons[cat];
              const count = products.filter((p) => p.category === cat).length;
              return (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  onClick={() => navigate(`/products?category=${encodeURIComponent(cat)}`)}
                  className="group relative text-left rounded-2xl bg-gradient-to-br from-white to-grafian-blue-50/40 p-6 border border-slate-100 shadow-pharma hover:shadow-pharma-lg transition-shadow overflow-hidden"
                >
                  <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-grafian-blue-100/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-start gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-grafian-blue-deep to-grafian-blue-mid text-white flex items-center justify-center shadow-pharma">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-bold text-slate-900">{cat}</h3>
                        <span className="rounded-full bg-grafian-blue-100 text-grafian-blue-deep text-[11px] font-semibold px-2 py-0.5">
                          {count} items
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {categoryDescriptions[cat]}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-grafian-blue-deep group-hover:gap-2 transition-all">
                        View range <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="rounded-2xl bg-gradient-to-br from-grafian-blue-deep via-grafian-blue to-grafian-blue-mid p-6 text-white shadow-pharma-lg flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-grafian-blue-light/20 blur-2xl" />
              <div className="relative">
                <Stethoscope className="h-8 w-8 text-grafian-blue-light mb-3" />
                <h3 className="text-lg font-bold mb-2">For Doctors & Distributors</h3>
                <p className="text-sm text-slate-100/90 leading-relaxed">
                  Get our complete product catalogue with composition, indications, and prescribing information.
                </p>
              </div>
              <button
                onClick={() => navigate('/contact')}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white text-grafian-blue-deep px-5 py-2.5 text-sm font-semibold self-start hover:bg-grafian-blue-50 transition-colors"
              >
                Request Catalogue
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="bg-gradient-to-b from-grafian-blue-50/40 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <div className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-grafian-blue-mid mb-2">
                Featured Formulations
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">
                Trusted by healthcare professionals
              </h2>
              <p className="text-slate-600 mt-2 max-w-2xl">
                A snapshot of our most prescribed cardiac and diabetic care formulations. Click any product for the complete prescribing information.
              </p>
            </div>
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 rounded-full border border-grafian-blue-200 px-5 py-2.5 text-sm font-semibold text-grafian-blue-deep hover:bg-grafian-blue-50 transition-colors self-start"
            >
              View All Products
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((p, i) => (
              <ProductCard
                key={p.slug}
                product={p}
                index={i}
                onClick={() => navigate(`/product/${p.slug}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US / VALUES ============ */}
      <section className="bg-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-50" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-grafian-blue-mid mb-3">
              The Grafian Difference
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Why healthcare professionals choose Grafian
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We are not just a manufacturer — we are a long-term partner for doctors, distributors, and patients, built on four foundational commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group relative rounded-2xl bg-white p-7 border border-slate-100 shadow-pharma hover:shadow-pharma-lg transition-all overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-grafian-blue-100/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-grafian-blue-deep to-grafian-blue-mid text-white flex items-center justify-center mb-5 shadow-pharma">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2.5">{v.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{v.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PROCESS / QUALITY PIPELINE ============ */}
      <section className="bg-gradient-to-b from-grafian-blue-50/40 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-grafian-blue-mid mb-3">
              From Molecule to Medicine
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Our four-step quality pipeline
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Every Grafian product passes through a structured research-to-distribution lifecycle designed to safeguard quality at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {/* Connecting line for large screens */}
            <div className="hidden lg:block absolute left-0 right-0 top-[60px] h-0.5 bg-gradient-to-r from-grafian-blue-200 via-grafian-blue-300 to-grafian-blue-200" />

            {processSteps.map((s, idx) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-pharma"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative h-12 w-12 rounded-full bg-white border-2 border-grafian-blue-mid flex items-center justify-center text-base font-black text-grafian-blue-deep shadow-pharma">
                    {s.step}
                  </div>
                  {idx < processSteps.length - 1 && (
                    <ArrowRight className="hidden lg:block h-4 w-4 text-grafian-blue-300 absolute right-[-22px] top-[42px]" />
                  )}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRUST / CERTIFICATIONS STRIP ============ */}
      <section className="bg-white py-14 md:py-16 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-grafian-blue-mid mb-3">
                Quality You Can Trust
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
                Globally recognised certifications
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5">
                Our commitment to quality is validated by internationally recognised certifications. Every batch is manufactured under WHO-GMP guidelines and within an ISO 9001:2015 certified quality management system.
              </p>
              <button
                onClick={() => navigate('/certifications')}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-grafian-blue-deep to-grafian-blue-mid px-5 py-2.5 text-sm font-semibold text-white shadow-pharma"
              >
                View Certifications
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {certifications.map((c) => (
                <div key={c.id} className="group relative rounded-2xl bg-gradient-to-br from-grafian-blue-50 to-white p-6 border border-slate-100 shadow-pharma hover:shadow-pharma-lg transition-shadow flex flex-col items-center text-center overflow-hidden">
                  <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-grafian-blue-100/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative h-24 w-24 rounded-full bg-white shadow-pharma p-2 mb-4 flex items-center justify-center">
                    <img src={c.image} alt={c.name} className="h-full w-full object-contain drop-shadow-md" />
                  </div>
                  <div className="text-sm font-bold text-slate-900">{c.name}</div>
                  <div className="text-[10px] text-grafian-blue-mid font-semibold uppercase tracking-wider mt-1">Certified</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIAL / QUOTE ============ */}
      <section className="bg-gradient-to-br from-grafian-blue-deep via-grafian-blue to-grafian-blue-mid py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-20" />
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-grafian-blue-light/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-grafian-blue-light/10 blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Quote className="h-10 w-10 text-grafian-blue-light mx-auto mb-5" />
            <p className="text-xl md:text-2xl font-medium leading-relaxed mb-6 text-balance">
              &ldquo;At Grafian Pharmaceuticals, we believe accessible, evidence-based medicine is the foundation of equitable healthcare. Every formulation we manufacture is a promise to the doctor who prescribes it and the patient who trusts it.&rdquo;
            </p>
            <div className="inline-flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center font-bold text-lg text-white">
                G
              </div>
              <div className="text-left">
                <div className="font-semibold">Grafian Pharmaceuticals</div>
                <div className="text-xs text-slate-300/90 uppercase tracking-wider">Management Statement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA / CONTACT ============ */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-gradient-to-br from-grafian-blue-50 via-white to-grafian-blue-50/40 p-8 md:p-12 border border-grafian-blue-100 shadow-pharma-lg relative overflow-hidden">
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-grafian-blue-200/30 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-grafian-blue-100/40 blur-3xl" />
            <div className="grid md:grid-cols-2 gap-8 items-center relative">
              <div>
                <div className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-grafian-blue-mid mb-3">
                  Partner With Us
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                  Become a Grafian distributor
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  We are expanding our network of trusted distributors, stockists, and hospital partners across India. Reach out to discuss how we can grow together.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate('/contact')}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-grafian-blue-deep to-grafian-blue-mid px-6 py-3 text-sm font-semibold text-white shadow-pharma hover:shadow-pharma-lg transition-shadow"
                  >
                    Contact Sales Team
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <a
                    href={`tel:${company.phones[0].replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 rounded-full border border-grafian-blue-200 px-6 py-3 text-sm font-semibold text-grafian-blue-deep hover:bg-grafian-blue-50 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    {company.phones[0]}
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: MapPin, label: 'Headquarters', value: 'Hyderabad, India' },
                  { icon: Phone, label: 'Phone', value: company.phones.join(' / ') },
                  { icon: Mail, label: 'Email', value: company.emails[0] },
                  { icon: Award, label: 'Certifications', value: 'WHO-GMP, ISO 9001' },
                ].map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.label} className="rounded-2xl bg-white p-4 border border-slate-100 shadow-pharma">
                      <Icon className="h-5 w-5 text-grafian-blue-mid mb-2" />
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-0.5">
                        {c.label}
                      </div>
                      <div className="text-sm font-semibold text-slate-900">{c.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
