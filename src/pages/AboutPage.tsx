'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight, Target, Eye, Heart, Users, Award, Factory, Microscope,
  Truck, Shield, CheckCircle2, Sparkles, Leaf, Droplet, Wind, Pill,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { company, certifications } from '@/lib/company';
import { categoryOrder, products, type ProductCategory } from '@/lib/products';
import { type Route } from '@/lib/router';

interface AboutPageProps {
  route: Route;
  navigate: (to: string) => void;
}

const milestones = [
  { year: 'Foundation', title: 'Grafian Pharmaceuticals established', text: 'Founded in Hyderabad with a mission to deliver evidence-based formulations across high-need therapeutic areas.', icon: Sparkles },
  { year: 'Quality First', title: 'WHO-GMP & ISO 9001 certifications', text: 'Built our quality systems around WHO Good Manufacturing Practice and ISO 9001:2015 management standards.', icon: Award },
  { year: 'Portfolio Growth', title: 'Launched 30+ formulations', text: 'Expanded into cardiac, diabetic, anti-allergy, PPI, antibiotic, multivitamin and general care segments.', icon: Pill },
  { year: 'Today', title: 'Trusted across India', text: 'A growing network of distributors, doctors and hospitals relies on Grafian for consistent quality and dependable supply.', icon: Truck },
];

const teamValues = [
  { icon: Target, title: 'Mission', text: 'To make evidence-based, quality medicines accessible to every doctor, distributor and patient we serve — backed by transparent processes and dependable supply.' },
  { icon: Eye, title: 'Vision', text: 'To become one of India\u2019s most trusted pharmaceutical companies by combining scientific rigour, manufacturing excellence and a patient-first culture.' },
  { icon: Heart, title: 'Values', text: 'Integrity in every transaction. Quality without compromise. Empathy for patients. And a long-term partnership mindset with every stakeholder.' },
];

const qualityPillars = [
  { icon: Microscope, title: 'In-process Analytics', text: 'Continuous monitoring during manufacturing ensures each batch remains within validated pharmacopoeial specifications throughout production.' },
  { icon: Shield, title: 'Batch Release Testing', text: 'Every batch undergoes final quality control testing for assay, dissolution, impurities and microbial limits before being released for distribution.' },
  { icon: Factory, title: 'GMP Facility', text: 'Manufacturing partners operate under WHO-GMP certified environments with segregated production bays, controlled airflow and rigorous cleaning protocols.' },
  { icon: CheckCircle2, title: 'Stability Studies', text: 'Long-term and accelerated stability data supports the assigned shelf life of every product under varied climatic conditions.' },
];

const categoryIcons: Record<ProductCategory, React.ElementType> = {
  'Cardiac Care': Heart,
  'Diabetic Care': Droplet,
  'Anti Allergy': Wind,
  PPI: Pill,
  Antibiotic: Shield,
  'Multivitamin & Multiminerals': Sparkles,
  'General Care': Leaf,
};

export function AboutPage({ route, navigate }: AboutPageProps) {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero-radial py-16 md:py-24">
        <div className="absolute inset-0 pattern-grid opacity-50" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-grafian-blue-200/30 blur-3xl animate-blob" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-1.5 text-xs font-semibold text-grafian-blue-deep border border-grafian-blue-200 mb-5"
              >
                About Grafian Pharmaceuticals
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="text-4xl md:text-5xl font-black text-grafian-blue-deep leading-[1.1] mb-5 text-balance"
              >
                A pharmaceutical company built on{' '}
                <span className="text-gradient-pharma">trust, science & quality</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed mb-7"
              >
                {company.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                <button
                  onClick={() => navigate('/products')}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-grafian-blue-deep to-grafian-blue-mid px-6 py-3 text-sm font-semibold text-white shadow-pharma"
                >
                  Browse Our Products <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center gap-2 rounded-full bg-white border border-grafian-blue-200 px-6 py-3 text-sm font-semibold text-grafian-blue-deep hover:bg-grafian-blue-50 transition-colors"
                >
                  Get in Touch
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="relative">
                <Logo className="h-56 md:h-72 w-auto" priority />
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-5 -right-5 rounded-2xl bg-white shadow-pharma px-4 py-3 flex items-center gap-2"
                >
                  <Award className="h-6 w-6 text-grafian-blue-mid" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Certified by</div>
                    <div className="text-sm font-bold text-grafian-blue-deep">WHO-GMP & ISO</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION / VISION / VALUES */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {teamValues.map((v, idx) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-2xl bg-gradient-to-br from-grafian-blue-50/60 to-white p-7 border border-slate-100 shadow-pharma"
                >
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-grafian-blue-deep to-grafian-blue-mid text-white flex items-center justify-center mb-4 shadow-pharma">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{v.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPANY STORY */}
      <section className="bg-gradient-to-b from-grafian-blue-50/40 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-grafian-blue-mid mb-3">
                Our Story
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-5">
                Building a pharma company the right way
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Grafian Pharmaceuticals was founded in Hyderabad with a clear conviction: India&apos;s healthcare ecosystem deserves a pharmaceutical partner that combines scientific rigour with operational reliability. From day one, we have invested in contemporary formulations, validated manufacturing partnerships, and rigorous quality systems rather than chasing scale for its own sake.
                </p>
                <p>
                  Our portfolio has grown organically, with each therapeutic segment entered only after careful clinical and commercial evaluation. Today our range spans cardiac care, diabetic care, anti-allergy therapy, PPIs, antibiotics, multivitamins, and general care — a deliberately diverse mix designed to serve the everyday needs of physicians treating India&apos;s most prevalent chronic and acute conditions.
                </p>
                <p>
                  What sets Grafian apart is not just what we make, but how we work. Doctors, distributors and hospital partners can reach our team directly, expect transparent responses, and rely on consistent supply. We see every prescription written for a Grafian product as a trust to be honoured — and we operate accordingly.
                </p>
              </div>
              <div className="mt-7 grid grid-cols-3 gap-3">
                {[
                  { value: '30+', label: 'Formulations' },
                  { value: '7', label: 'Segments' },
                  { value: '100%', label: 'Quality Assured' },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl bg-white p-4 border border-slate-100 shadow-pharma text-center">
                    <div className="text-2xl font-black text-gradient-pharma">{s.value}</div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {milestones.map((m, idx) => {
                const Icon = m.icon;
                return (
                  <motion.div
                    key={m.title}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative pl-6 pb-6 border-l-2 border-grafian-blue-100 last:border-l-transparent"
                  >
                    <div className="absolute -left-[14px] top-0 h-7 w-7 rounded-full bg-white border-2 border-grafian-blue-mid flex items-center justify-center shadow-pharma">
                      <Icon className="h-3.5 w-3.5 text-grafian-blue-deep" />
                    </div>
                    <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-pharma ml-3">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-grafian-blue-mid mb-1">
                        {m.year}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-1.5">{m.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{m.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* QUALITY PILLARS */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-grafian-blue-mid mb-3">
              Quality at Every Step
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              The four pillars of our quality system
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Quality is not an afterthought — it is engineered into every Grafian product from formulation design through to batch release and stability monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityPillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="rounded-2xl bg-white p-6 border border-slate-100 shadow-pharma hover:shadow-pharma-lg transition-shadow"
                >
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-grafian-blue-deep to-grafian-blue-mid text-white flex items-center justify-center mb-4 shadow-pharma">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* THERAPEUTIC SEGMENTS */}
      <section className="bg-gradient-to-b from-grafian-blue-50/40 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-grafian-blue-mid mb-3">
              Therapeutic Coverage
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Seven specialised segments
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Each segment is built around the prescribing realities of Indian physicians — combining proven molecules with convenient dosing.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryOrder.map((cat, idx) => {
              const Icon = categoryIcons[cat];
              const count = products.filter((p) => p.category === cat).length;
              return (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => navigate(`/products?category=${encodeURIComponent(cat)}`)}
                  className="rounded-2xl bg-white p-5 border border-slate-100 shadow-pharma hover:shadow-pharma-lg transition-shadow text-left group"
                >
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-grafian-blue-deep to-grafian-blue-mid text-white flex items-center justify-center mb-3 shadow-pharma">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-bold text-slate-900 mb-0.5">{cat}</div>
                  <div className="text-[11px] text-slate-500">{count} formulations</div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS STRIP */}
      <section className="bg-white py-14 md:py-16 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
                Validated by international certifications
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Our commitment to manufacturing excellence is independently validated. We operate within WHO-GMP and ISO 9001:2015 frameworks — recognised by doctors, regulators and partners worldwide.
              </p>
              <button
                onClick={() => navigate('/certifications')}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-grafian-blue-deep to-grafian-blue-mid px-5 py-2.5 text-sm font-semibold text-white shadow-pharma"
              >
                View Certifications <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {certifications.map((c) => (
                <div key={c.id} className="rounded-2xl bg-gradient-to-br from-grafian-blue-50 to-white p-5 border border-slate-100 shadow-pharma flex flex-col items-center text-center">
                  <img src={c.image} alt={c.name} className="h-28 w-28 object-contain drop-shadow-md mb-3" />
                  <div className="text-sm font-bold text-slate-900">{c.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-grafian-blue-deep via-grafian-blue to-grafian-blue-mid py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-20" />
        <div className="container mx-auto px-4 relative text-center text-white">
          <Users className="h-10 w-10 text-grafian-blue-light mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-black mb-3">Let&apos;s build something together</h2>
          <p className="max-w-xl mx-auto text-slate-100/90 mb-6">
            Whether you are a doctor seeking product information, a distributor exploring partnership, or a hospital procurement team evaluating supply — we would love to hear from you.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 rounded-full bg-white text-grafian-blue-deep px-6 py-3 text-sm font-semibold shadow-pharma hover:bg-grafian-blue-50 transition-colors"
          >
            Reach Our Team <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
