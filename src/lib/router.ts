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

/** Default route — used for SSR and the very first client render to avoid hydration mismatch. */
const DEFAULT_ROUTE: Route = { path: '/', params: {} };

function parseHash(): Route {
  if (typeof window === 'undefined') return DEFAULT_ROUTE;
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
  // IMPORTANT: Always initialize with DEFAULT_ROUTE so that the server-rendered
  // HTML matches the very first client render (avoids React hydration errors).
  // We then sync to the actual hash AFTER hydration inside useEffect.
  const [route, setRoute] = useState<Route>(DEFAULT_ROUTE);

  useEffect(() => {
    // Sync to the real hash now that we're mounted on the client.
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
