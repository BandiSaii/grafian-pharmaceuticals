'use client';

import { useEffect, useState, useCallback } from 'react';

/**
 * Lightweight hash-based router.
 * Routes:
 *   #/                          -> home
 *   #/about                     -> about
 *   #/products                  -> products (all)
 *   #/products?category=Cardiac -> products filtered
 *   #/product/:slug             -> product details
 *   #/certifications            -> certifications
 *   #/contact                   -> contact
 */
export interface Route {
  path: string; // e.g. "/", "/about", "/product/teryn-40-mg"
  params: Record<string, string>;
}

function parseHash(): Route {
  if (typeof window === 'undefined') return { path: '/', params: {} };
  const raw = window.location.hash.replace(/^#/, '');
  const [pathPart, queryPart] = raw.split('?');
  const path = pathPart || '/';
  const params: Record<string, string> = {};
  if (queryPart) {
    new URLSearchParams(queryPart).forEach((v, k) => {
      params[k] = v;
    });
  }
  return { path, params };
}

export function useRouter() {
  // Lazy initial state so the very first render already reflects the hash (if any).
  const [route, setRoute] = useState<Route>(() => parseHash());

  useEffect(() => {
    // Sync state once on mount in case the lazy init was SSR default.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRoute(parseHash());

    const onHashChange = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((to: string) => {
    if (typeof window === 'undefined') return;
    if (window.location.hash === `#${to}`) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = to;
  }, []);

  return { route, navigate };
}
