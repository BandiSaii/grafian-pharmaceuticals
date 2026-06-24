'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ChevronRight, Phone, Mail, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';
import { type Route } from '@/lib/router';
import { company } from '@/lib/company';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface HeaderProps {
  route: Route;
  navigate: (to: string) => void;
}

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Products', path: '/products' },
  { label: 'Certifications', path: '/certifications' },
  { label: 'Contact Us', path: '/contact' },
];

function isActive(currentPath: string, itemPath: string): boolean {
  if (itemPath === '/') return currentPath === '/';
  if (itemPath === '/products') return currentPath.startsWith('/products') || currentPath.startsWith('/product');
  return currentPath === itemPath;
}

export function Header({ route, navigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-pharma border-b border-grafian-blue-100'
          : 'bg-white border-b border-grafian-blue-100/60'
      )}
    >
      {/* Slim top utility strip — phone + email + certifications only (timings removed) */}
      <div className="hidden md:block bg-gradient-to-r from-grafian-blue-deep via-grafian-blue to-grafian-blue-mid text-white">
        <div className="container mx-auto px-4 flex items-center justify-between h-8 text-[12px]">
          <div className="flex items-center gap-5">
            <a href={`tel:${company.phones[0].replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:text-grafian-blue-light transition-colors">
              <Phone className="h-3.5 w-3.5" /> {company.phones.join('  •  ')}
            </a>
            <span className="opacity-50 hidden lg:inline">|</span>
            <a href={`mailto:${company.emails[0]}`} className="hidden lg:flex items-center gap-1.5 opacity-95 hover:text-grafian-blue-light transition-colors">
              <Mail className="h-3.5 w-3.5" /> {company.emails[0]}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-grafian-blue-light" />
            <span className="opacity-95 font-medium">WHO-GMP & ISO 9001:2015 Certified</span>
          </div>
        </div>
      </div>

      {/* Main nav — reduced height, larger logo, larger nav font */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24 md:h-28">
          {/* Logo — increased size for better visibility */}
          <button
            onClick={() => handleNav('/')}
            className="flex items-center gap-2 shrink-0 transition-transform hover:scale-[1.02]"
            aria-label="Grafian Pharmaceuticals home"
          >
            <Logo className="h-20 md:h-24 w-auto" priority />
          </button>

          {/* Desktop nav — slightly larger font size (text-base) */}
          <div className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <button
                      onClick={() => handleNav(item.path)}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'relative px-5 py-2.5 text-[15px] font-medium transition-colors rounded-md',
                        isActive(route.path, item.path)
                          ? 'text-grafian-blue-deep bg-grafian-blue-50'
                          : 'text-slate-700 hover:text-grafian-blue-deep hover:bg-grafian-blue-50/60'
                      )}
                    >
                      {item.label}
                      {isActive(route.path, item.path) && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute left-1/2 -translate-x-1/2 bottom-0.5 h-1 w-2/3 rounded-full bg-gradient-to-r from-grafian-blue-mid to-grafian-blue-light"
                        />
                      )}
                    </button>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <button
              onClick={() => handleNav('/contact')}
              className="ml-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-grafian-blue-deep to-grafian-blue-mid px-6 py-3 text-[15px] font-semibold text-white shadow-pharma transition-all hover:shadow-pharma-lg hover:-translate-y-0.5"
            >
              Enquire Now
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => handleNav('/products')}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-grafian-blue-50 text-grafian-blue-deep"
              aria-label="Search products"
            >
              <Search className="h-5 w-5" />
            </button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-grafian-blue-50 text-grafian-blue-deep"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[360px] bg-white p-0">
                <SheetHeader className="border-b border-grafian-blue-100 p-5">
                  <SheetTitle className="flex items-center justify-between">
                    <Logo className="h-24 w-auto" />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-3">
                  {navItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNav(item.path)}
                      className={cn(
                        'flex items-center justify-between rounded-lg px-4 py-3.5 text-[15px] font-medium transition-colors',
                        isActive(route.path, item.path)
                          ? 'bg-grafian-blue-50 text-grafian-blue-deep'
                          : 'text-slate-700 hover:bg-grafian-blue-50/60'
                      )}
                    >
                      {item.label}
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </button>
                  ))}
                  <button
                    onClick={() => handleNav('/contact')}
                    className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-grafian-blue-deep to-grafian-blue-mid px-5 py-3 text-[15px] font-semibold text-white shadow-pharma"
                  >
                    Enquire Now
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <div className="mt-6 rounded-xl bg-grafian-blue-50 p-4 text-[13px] text-slate-600">
                    <div className="font-semibold text-grafian-blue-deep mb-2">Quick Contact</div>
                    <div className="space-y-1.5">
                      <a href={`tel:${company.phones[0].replace(/\s/g, '')}`} className="flex items-start gap-2 hover:text-grafian-blue-deep">
                        <Phone className="h-4 w-4 mt-0.5 shrink-0 text-grafian-blue-mid" />
                        <span>{company.phones.join(', ')}</span>
                      </a>
                      <a href={`mailto:${company.emails[0]}`} className="flex items-start gap-2 hover:text-grafian-blue-deep break-all">
                        <Mail className="h-4 w-4 mt-0.5 shrink-0 text-grafian-blue-mid" />
                        <span>{company.emails[0]}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.4 }}
            className="h-1 origin-left bg-gradient-to-r from-grafian-blue-deep via-grafian-blue-mid to-grafian-blue-light"
          />
        )}
      </AnimatePresence>
    </header>
  );
}
