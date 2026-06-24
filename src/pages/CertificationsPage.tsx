'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Award, Shield, CheckCircle2, Factory, Globe2, BadgeCheck } from 'lucide-react';
import { certifications, company } from '@/lib/company';
import { type Route } from '@/lib/router';

interface CertificationsPageProps {
  route: Route;
  navigate: (to: string) => void;
}

const commitments = [
  { icon: Factory, title: 'Manufacturing Excellence', text: 'Our products are manufactured at WHO-GMP compliant facilities equipped with modern, validated equipment and rigorous in-process controls. Every batch follows documented standard operating procedures audited by our quality team.' },
  { icon: Shield, title: 'Quality Management System', text: 'An ISO 9001:2015 certified quality management system governs every operational process — from supplier qualification and raw material testing to finished product release and complaint handling.' },
  { icon: CheckCircle2, title: 'Pharmacopoeial Compliance', text: 'Every Grafian product is tested against Indian Pharmacopoeia (IP) and other applicable standards, with stability data supporting the assigned shelf-life under varied climatic conditions.' },
  { icon: Globe2, title: 'International Recognition', text: 'Our certifications are recognised by doctors, regulators, and procurement partners worldwide — supporting our mission to make quality Indian pharmaceuticals accessible globally.' },
];

export function CertificationsPage({ route, navigate }: CertificationsPageProps) {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero-radial py-16 md:py-24">
        <div className="absolute inset-0 pattern-grid opacity-50" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-grafian-blue-200/30 blur-3xl animate-blob" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-1.5 text-xs font-semibold text-grafian-blue-deep border border-grafian-blue-200 mb-4"
            >
              <BadgeCheck className="h-3.5 w-3.5" /> Quality & Compliance
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-4xl md:text-5xl font-black text-grafian-blue-deep leading-[1.1] mb-4 text-balance"
            >
              Certifications that <span className="text-gradient-pharma">validate our quality</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed"
            >
              Every Grafian Pharmaceuticals formulation is manufactured under internationally recognised quality frameworks. Our certifications are not just badges — they reflect a culture of consistent, measurable quality across every batch.
            </motion.p>
          </div>
        </div>
      </section>

      {/* CERTIFICATION BADGES — simplified per user requirements */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-grafian-blue-mid mb-3">
              Our Certifications
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Recognised quality, every batch
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We hold certifications from internationally respected quality frameworks — a assurance to doctors, distributors and patients that our products meet rigorous global standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {certifications.map((c, idx) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl bg-gradient-to-br from-grafian-blue-50/60 via-white to-grafian-blue-50/40 p-8 border border-grafian-blue-100 shadow-pharma-lg text-center relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-grafian-blue-200/30 blur-3xl" />
                <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-grafian-blue-100/40 blur-3xl" />

                <div className="relative">
                  {/* Certification logo/badge */}
                  <div className="inline-flex items-center justify-center mb-4">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="h-32 w-32 object-contain rounded-full bg-white p-1 shadow-pharma"
                    />
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2">
                    {c.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                    {c.description}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white border border-grafian-blue-200 px-3 py-1 text-[11px] font-semibold text-grafian-blue-deep">
                    <CheckCircle2 className="h-3 w-3" /> Certified
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust badges strip */}
          <div className="mt-14 flex flex-wrap justify-center items-center gap-3">
            {['WHO-GMP Certified', 'ISO 9001:2015 Certified', 'Made in India', 'Quality Assured'].map((t) => (
              <div
                key={t}
                className="inline-flex items-center gap-2 rounded-full bg-grafian-blue-50 border border-grafian-blue-100 px-4 py-2 text-xs font-semibold text-grafian-blue-deep"
              >
                <Award className="h-3.5 w-3.5" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY COMMITMENTS */}
      <section className="bg-gradient-to-b from-grafian-blue-50/40 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-grafian-blue-mid mb-3">
              Beyond the Badge
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              How we live quality every day
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Certifications are the floor, not the ceiling. Our daily operations are governed by four foundational commitments that go beyond compliance to deliver consistent product quality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {commitments.map((c, idx) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="rounded-2xl bg-white p-6 border border-slate-100 shadow-pharma hover:shadow-pharma-lg transition-shadow"
                >
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-grafian-blue-deep to-grafian-blue-mid text-white flex items-center justify-center mb-4 shadow-pharma">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{c.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{c.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-grafian-blue-deep via-grafian-blue to-grafian-blue-mid py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-20" />
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-grafian-blue-light/20 blur-3xl" />
        <div className="container mx-auto px-4 relative text-center text-white">
          <Shield className="h-10 w-10 text-grafian-blue-light mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-black mb-3">Have a quality-related query?</h2>
          <p className="max-w-xl mx-auto text-slate-100/90 mb-6">
            Our quality team is happy to address questions from healthcare professionals, regulators, distributors, and procurement partners about our manufacturing standards and quality systems.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 rounded-full bg-white text-grafian-blue-deep px-6 py-3 text-sm font-semibold shadow-pharma hover:bg-grafian-blue-50 transition-colors"
          >
            Contact Our Quality Team <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
