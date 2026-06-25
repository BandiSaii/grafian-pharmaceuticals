'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/lib/router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { LoadingScreen } from '@/components/LoadingScreen';
import { HomePage } from '@/views/HomePage';
import { AboutPage } from '@/views/AboutPage';
import { ProductsPage } from '@/views/ProductsPage';
import { ProductDetailsPage } from '@/views/ProductDetailsPage';
import { CertificationsPage } from '@/views/CertificationsPage';
import { ContactPage } from '@/views/ContactPage';
import { Toaster } from 'sonner';

export default function Home() {
  const { route, navigate } = useRouter();
  const [loading, setLoading] = useState(true);

  // First-impression loading screen: shows ONLY the logo on a white background.
  // Fast 1-second intro — attractive but doesn't make users wait.
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  // Update document title based on route for SEO/UX
  useEffect(() => {
    let title = 'Grafian Pharmaceuticals | Premium Pharmaceutical Company in Hyderabad';
    if (route.path === '/about') title = 'About Us | Grafian Pharmaceuticals';
    else if (route.path === '/products') title = 'Our Products | Grafian Pharmaceuticals';
    else if (route.path.startsWith('/product/')) title = 'Product Details | Grafian Pharmaceuticals';
    else if (route.path === '/certifications') title = 'Certifications | Grafian Pharmaceuticals';
    else if (route.path === '/contact') title = 'Contact Us | Grafian Pharmaceuticals';
    document.title = title;
  }, [route.path]);

  // Render the current page based on route.path
  const renderPage = () => {
    if (route.path === '/' || route.path === '') return <HomePage route={route} navigate={navigate} />;
    if (route.path === '/about') return <AboutPage route={route} navigate={navigate} />;
    if (route.path === '/products') return <ProductsPage route={route} navigate={navigate} />;
    if (route.path.startsWith('/product/')) return <ProductDetailsPage route={route} navigate={navigate} />;
    if (route.path === '/certifications') return <CertificationsPage route={route} navigate={navigate} />;
    if (route.path === '/contact') return <ContactPage route={route} navigate={navigate} />;
    // Fallback to home for unknown routes
    return <HomePage route={route} navigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LoadingScreen show={loading} />

      <Header route={route} navigate={navigate} />

      <main className="flex-1">{renderPage()}</main>

      <Footer route={route} navigate={navigate} />

      <WhatsAppButton />

      {/* Sonner toast notifications */}
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}
