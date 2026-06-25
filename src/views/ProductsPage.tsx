'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, SlidersHorizontal, ArrowRight, Heart, Droplet, Wind, Pill, Shield, Sparkles, Leaf, Inbox } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { products, categoryOrder, categoryDescriptions, searchProducts, type ProductCategory } from '@/lib/products';
import { type Route } from '@/lib/router';

interface ProductsPageProps {
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

export function ProductsPage({ route, navigate }: ProductsPageProps) {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'category'>('category');

  // Derive active category from URL params — no effect needed.
  const activeCategory: ProductCategory | 'All' = useMemo(() => {
    if (route.params.category) {
      const found = categoryOrder.find((c) => c === route.params.category);
      if (found) return found;
    }
    return 'All';
  }, [route.params.category]);

  const setActiveCategory = (cat: ProductCategory | 'All') => {
    if (cat === 'All') {
      navigate('/products');
    } else {
      navigate(`/products?category=${encodeURIComponent(cat)}`);
    }
  };

  const filtered = useMemo(() => {
    let list = query.trim() ? searchProducts(query) : products;
    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.brandName.localeCompare(b.brandName));
    } else {
      list = [...list].sort((a, b) =>
        categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category) ||
        a.brandName.localeCompare(b.brandName)
      );
    }
    return list;
  }, [query, activeCategory, sortBy]);

  const grouped = useMemo(() => {
    if (sortBy !== 'category') return null;
    const groups: Record<string, typeof products> = {};
    for (const p of filtered) {
      if (!groups[p.category]) groups[p.category] = [];
      groups[p.category].push(p);
    }
    return groups;
  }, [filtered, sortBy]);

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero-radial py-12 md:py-16">
        <div className="absolute inset-0 pattern-grid opacity-50" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-grafian-blue-200/30 blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-1.5 text-xs font-semibold text-grafian-blue-deep border border-grafian-blue-200 mb-4">
              <Pill className="h-3.5 w-3.5" /> {products.length} Formulations across {categoryOrder.length} segments
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-grafian-blue-deep leading-[1.1] mb-3 text-balance">
              Our complete product range
            </h1>
            <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
              Browse our full portfolio of evidence-based pharmaceutical formulations. Use the search or filter by therapeutic segment to find what you need.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-7 max-w-2xl"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by brand name, generic name, composition..."
                className="w-full rounded-full bg-white border border-grafian-blue-200 pl-12 pr-12 py-3.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-pharma focus:outline-none focus:ring-2 focus:ring-grafian-blue-mid/50"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FILTERS + LIST */}
      <section className="bg-white py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[260px_1fr] gap-8">
            {/* Sidebar */}
            <aside className="lg:sticky lg:top-32 self-start space-y-6">
              {/* Categories */}
              <div>
                <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <SlidersHorizontal className="h-4 w-4" />
                  Therapeutic Segment
                </div>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setActiveCategory('All')}
                    className={`w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium transition-colors flex items-center justify-between ${
                      activeCategory === 'All'
                        ? 'bg-grafian-blue-50 text-grafian-blue-deep border border-grafian-blue-200'
                        : 'text-slate-700 hover:bg-grafian-blue-50/60 border border-transparent'
                    }`}
                  >
                    All Products
                    <span className="text-[11px] font-semibold opacity-70">{products.length}</span>
                  </button>
                  {categoryOrder.map((c) => {
                    const Icon = categoryIcons[c];
                    const count = products.filter((p) => p.category === c).length;
                    const active = activeCategory === c;
                    return (
                      <button
                        key={c}
                        onClick={() => setActiveCategory(c)}
                        className={`w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium transition-colors flex items-center gap-2.5 ${
                          active
                            ? 'bg-grafian-blue-50 text-grafian-blue-deep border border-grafian-blue-200'
                            : 'text-slate-700 hover:bg-grafian-blue-50/60 border border-transparent'
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0 opacity-70" />
                        <span className="flex-1">{c}</span>
                        <span className="text-[11px] font-semibold opacity-70">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sort */}
              <div>
                <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Sort By
                </div>
                <div className="space-y-1.5">
                  {[
                    { value: 'category', label: 'Group by Segment' },
                    { value: 'name', label: 'Alphabetical (A-Z)' },
                  ].map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setSortBy(s.value as 'category' | 'name')}
                      className={`w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        sortBy === s.value
                          ? 'bg-grafian-blue-50 text-grafian-blue-deep border border-grafian-blue-200'
                          : 'text-slate-700 hover:bg-grafian-blue-50/60 border border-transparent'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl bg-gradient-to-br from-grafian-blue-deep to-grafian-blue-mid p-5 text-white shadow-pharma">
                <div className="text-sm font-bold mb-1.5">Need product samples?</div>
                <p className="text-xs text-slate-100/90 mb-3 leading-relaxed">
                  Healthcare professionals can request product samples, visual aids and full prescribing information.
                </p>
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white text-grafian-blue-deep px-4 py-2 text-xs font-semibold"
                >
                  Request Info <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </aside>

            {/* Main list */}
            <div>
              {/* Result summary */}
              <div className="flex items-center justify-between mb-5">
                <div className="text-sm text-slate-600">
                  Showing <span className="font-bold text-grafian-blue-deep">{filtered.length}</span> of {products.length} products
                  {activeCategory !== 'All' && (
                    <span className="text-slate-500"> in <span className="font-semibold text-grafian-blue-deep">{activeCategory}</span></span>
                  )}
                  {query && (
                    <span className="text-slate-500"> matching <span className="font-semibold text-grafian-blue-deep">&ldquo;{query}&rdquo;</span></span>
                  )}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {filtered.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl bg-grafian-blue-50/40 border border-dashed border-grafian-blue-200 p-12 text-center"
                  >
                    <Inbox className="h-12 w-12 text-grafian-blue-300 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-slate-900 mb-1">No products found</h3>
                    <p className="text-sm text-slate-500 mb-4">Try a different search term or category.</p>
                    <button
                      onClick={() => { setQuery(''); setActiveCategory('All'); }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-grafian-blue-deep text-white px-4 py-2 text-xs font-semibold"
                    >
                      Reset Filters
                    </button>
                  </motion.div>
                ) : grouped ? (
                  <motion.div
                    key="grouped"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-10"
                  >
                    {Object.entries(grouped).map(([cat, list]) => {
                      const Icon = categoryIcons[cat as ProductCategory];
                      return (
                        <div key={cat}>
                          <div className="flex items-center gap-3 mb-5">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-grafian-blue-deep to-grafian-blue-mid text-white flex items-center justify-center shadow-pharma">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h2 className="text-xl font-black text-slate-900">{cat}</h2>
                              <p className="text-xs text-slate-500">{list.length} formulations • {categoryDescriptions[cat as ProductCategory]}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {list.map((p, i) => (
                              <ProductCard
                                key={p.slug}
                                product={p}
                                index={i}
                                onClick={() => navigate(`/product/${p.slug}`)}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                  >
                    {filtered.map((p, i) => (
                      <ProductCard
                        key={p.slug}
                        product={p}
                        index={i}
                        onClick={() => navigate(`/product/${p.slug}`)}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductsPage;
