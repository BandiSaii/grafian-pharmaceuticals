'use client';

import { motion } from 'framer-motion';
import { Heart, Droplet, Wind, Pill, Shield, Sparkles, Leaf, ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react';
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
      {/* decorative blob */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-grafian-blue-light/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-grafian-blue-light/10 blur-3xl" />

      <div className="container mx-auto px-4 py-14 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl bg-white p-3 inline-block shadow-pharma">
              <Logo className="h-20 md:h-24 w-auto" />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-200/90 max-w-sm">
              {company.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['WHO-GMP', 'ISO 9001:2015', 'Made in India'].map((b) => (
                <span
                  key={b}
                  className="rounded-full bg-white/10 backdrop-blur px-3 py-1 text-[11px] font-medium tracking-wide text-white"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-grafian-blue-light mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
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
                    className="inline-flex items-center gap-1.5 text-slate-200/90 hover:text-white transition-colors"
                  >
                    <ArrowRight className="h-3 w-3 opacity-60" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-grafian-blue-light mb-4">
              Therapeutic Areas
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categoryOrder.map((c) => {
                const Icon = iconMap[categoryIcons[c]] || Heart;
                return (
                  <li key={c}>
                    <button
                      onClick={() => navigate(`/products?category=${encodeURIComponent(c)}`)}
                      className="inline-flex items-center gap-2 text-slate-200/90 hover:text-white transition-colors text-left"
                    >
                      <Icon className="h-3.5 w-3.5 opacity-70" />
                      {c}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-grafian-blue-light mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm text-slate-200/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-grafian-blue-light shrink-0" />
                <span>
                  {company.address.line1}, {company.address.line2}, {company.address.city} - {company.address.pincode}, {company.address.state}, {company.address.country}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 mt-0.5 text-grafian-blue-light shrink-0" />
                <a href={`tel:${company.phones[0].replace(/\s/g, '')}`} className="hover:text-white">
                  {company.phones.join(', ')}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 text-grafian-blue-light shrink-0" />
                <a href={`mailto:${company.emails[0]}`} className="hover:text-white break-all">
                  {company.emails[0]}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 mt-0.5 text-grafian-blue-light shrink-0" />
                <span>{company.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust badges row */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          <div className="flex items-center gap-3 text-xs">
            <img src="/certificates/who-gmp.png" alt="WHO-GMP Certified" className="h-12 w-12 object-contain rounded-full bg-white p-0.5" />
            <div>
              <div className="font-semibold text-white">WHO-GMP</div>
              <div className="text-slate-300/80">Certified</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <img src="/certificates/iso-9001.png" alt="ISO 9001:2015 Certified" className="h-12 w-12 object-contain rounded-full bg-white p-0.5" />
            <div>
              <div className="font-semibold text-white">ISO 9001:2015</div>
              <div className="text-slate-300/80">Quality Management</div>
            </div>
          </div>
          <div className="text-xs text-slate-200/80 leading-relaxed col-span-2 md:col-span-2">
            <div className="font-semibold text-white mb-1">For Healthcare Professionals</div>
            All prescription medicines are intended for use under medical supervision. Please consult a registered medical practitioner before use.
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-300/80">
          <div>© {new Date().getFullYear()} {company.name}. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <button onClick={() => navigate('/about')} className="hover:text-white">About</button>
            <button onClick={() => navigate('/products')} className="hover:text-white">Products</button>
            <button onClick={() => navigate('/contact')} className="hover:text-white">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
