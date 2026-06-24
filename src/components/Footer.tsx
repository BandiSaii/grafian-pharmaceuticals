'use client';

import { motion } from 'framer-motion';
import { Heart, Droplet, Wind, Pill, Shield, Sparkles, Leaf, ArrowRight, MapPin, Phone, Mail, ShieldCheck, Stethoscope } from 'lucide-react';
import { Logo } from './Logo';
import { company } from '@/lib/company';
import { categoryOrder, type ProductCategory } from '@/lib/products';
import { type Route } from '@/lib/router';

interface FooterProps {
  route: Route;
  navigate: (to: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  heart: Heart,
  droplet: Droplet,
  wind: Wind,
  pill: Pill,
  shield: Shield,
  sparkles: Sparkles,
  leaf: Leaf,
};

const categoryIcons: Record<ProductCategory, string> = {
  'Cardiac Care': 'heart',
  'Diabetic Care': 'droplet',
  'Anti Allergy': 'wind',
  PPI: 'pill',
  Antibiotic: 'shield',
  'Multivitamin & Multiminerals': 'sparkles',
  'General Care': 'leaf',
};

export function Footer({ route, navigate }: FooterProps) {
  return (
    <footer className="mt-auto bg-gradient-to-br from-grafian-blue-deep via-grafian-blue to-grafian-blue-mid text-slate-100 relative overflow-hidden">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-grafian-blue-light/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-grafian-blue-light/10 blur-3xl" />

      <div className="container mx-auto px-4 py-14 md:py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand — large logo */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl bg-white/95 p-5 inline-block shadow-pharma-lg">
              <Logo className="h-48 md:h-56 w-auto" />
            </div>
            <p className="mt-5 text-[13px] leading-relaxed text-slate-200/90 max-w-sm">
              {company.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['WHO-GMP', 'ISO 9001:2015', 'Made in India'].map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 rounded-full bg-white/10 backdrop-blur px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white border border-white/10"
                >
                  <ShieldCheck className="h-3 w-3" />
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Quick links — larger icons & spacing */}
          <div className="lg:col-span-2">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-grafian-blue-light mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-[14px]">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Products', path: '/products' },
                { label: 'Certifications', path: '/certifications' },
                { label: 'Contact Us', path: '/contact' },
              ].map((l) => (
                <li key={l.path}>
                  <button
                    onClick={() => navigate(l.path)}
                    className="inline-flex items-center gap-2 text-slate-200/90 hover:text-white transition-colors group"
                  >
                    <ArrowRight className="h-4 w-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-grafian-blue-light mb-5">
              Therapeutic Areas
            </h4>
            <ul className="space-y-3 text-[14px]">
              {categoryOrder.map((c) => {
                const Icon = iconMap[categoryIcons[c]] || Heart;
                return (
                  <li key={c}>
                    <button
                      onClick={() => navigate(`/products?category=${encodeURIComponent(c)}`)}
                      className="inline-flex items-center gap-2.5 text-slate-200/90 hover:text-white transition-colors text-left"
                    >
                      <Icon className="h-4 w-4 opacity-70 text-grafian-blue-light" />
                      {c}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact — larger icons */}
          <div className="lg:col-span-3">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-grafian-blue-light mb-5">
              Get in Touch
            </h4>
            <ul className="space-y-3.5 text-[14px] text-slate-200/90">
              <li className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center shrink-0">
                  <MapPin className="h-4.5 w-4.5 text-grafian-blue-light" />
                </div>
                <span className="leading-relaxed pt-1.5">
                  {company.address.line1}, {company.address.line2}, {company.address.city} - {company.address.pincode}, {company.address.state}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center shrink-0">
                  <Phone className="h-4.5 w-4.5 text-grafian-blue-light" />
                </div>
                <a href={`tel:${company.phones[0].replace(/\s/g, '')}`} className="hover:text-white pt-1.5">
                  {company.phones.join(', ')}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center shrink-0">
                  <Mail className="h-4.5 w-4.5 text-grafian-blue-light" />
                </div>
                <a href={`mailto:${company.emails[0]}`} className="hover:text-white break-all pt-1.5">
                  {company.emails[0]}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust badges row — larger cert badges, cleaner layout */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-3 flex items-center gap-3">
            <div className="h-16 w-16 rounded-2xl bg-white p-1.5 shadow-pharma-lg flex items-center justify-center shrink-0">
              <img src="/certificates/who-gmp.png" alt="WHO-GMP Certified" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">WHO-GMP</div>
              <div className="text-[11px] text-slate-300/80">Certified Manufacturer</div>
            </div>
          </div>
          <div className="md:col-span-3 flex items-center gap-3">
            <div className="h-16 w-16 rounded-2xl bg-white p-1.5 shadow-pharma-lg flex items-center justify-center shrink-0">
              <img src="/certificates/iso-9001.png" alt="ISO 9001:2015 Certified" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">ISO 9001:2015</div>
              <div className="text-[11px] text-slate-300/80">Quality Management</div>
            </div>
          </div>
          <div className="md:col-span-6 flex items-start gap-3 text-[13px] text-slate-200/80 leading-relaxed">
            <Stethoscope className="h-5 w-5 text-grafian-blue-light shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white mb-1">For Healthcare Professionals</div>
              All prescription medicines are intended for use under medical supervision. Please consult a registered medical practitioner before prescribing or use.
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-300/80">
          <div>© {new Date().getFullYear()} {company.name}. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">About</button>
            <button onClick={() => navigate('/products')} className="hover:text-white transition-colors">Products</button>
            <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
