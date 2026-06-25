'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Download, Mail, Phone, MessageCircle, CheckCircle2,
  Pill, Heart, Droplet, Wind, Shield, Sparkles, Leaf, PackageCheck, Beaker,
  Activity, Clock, Boxes, Snowflake, FileText, ChevronRight, Stethoscope,
} from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { getProductBySlug, products, type ProductCategory } from '@/lib/products';
import { company } from '@/lib/company';
import { type Route } from '@/lib/router';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ProductDetailsPageProps {
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

export function ProductDetailsPage({ route, navigate }: ProductDetailsPageProps) {
  const slug = route.path.split('/')[2];
  const product = getProductBySlug(slug);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  // Related products from same category
  const related = useMemo(() => {
    if (!product) return [];
    return products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Product not found</h1>
        <p className="text-slate-600 mb-5">The product you are looking for does not exist in our catalogue.</p>
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-grafian-blue-deep to-grafian-blue-mid px-5 py-2.5 text-sm font-semibold text-white shadow-pharma"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </button>
      </div>
    );
  }

  const Icon = categoryIcons[product.category];

  const infoBlocks = [
    { icon: Beaker, label: 'Composition', value: product.composition },
    { icon: Activity, label: 'Indications', value: product.indications },
    { icon: Clock, label: 'Dosage & Administration', value: product.dosage },
    { icon: CheckCircle2, label: 'Key Benefits', value: product.benefits },
    { icon: Boxes, label: 'Packaging Details', value: product.packaging },
    { icon: Snowflake, label: 'Storage Instructions', value: product.storage },
  ];

  const handleDownloadPdf = () => {
    // Generate a printable product sheet (browser print dialog -> Save as PDF)
    const win = window.open('', '_blank', 'width=800,height=900');
    if (!win) {
      toast.error('Please allow pop-ups to download the PDF.');
      return;
    }
    const html = generateProductPdfHtml(product);
    win.document.write(html);
    win.document.close();
    setTimeout(() => {
      win.focus();
      win.print();
    }, 400);
    toast.success('Preparing product information sheet…');
  };

  const handleEnquirySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '');
    const email = String(data.get('email') || '');
    const phone = String(data.get('phone') || '');
    const message = String(data.get('message') || '');

    const subject = `Product Enquiry: ${product.brandName}`;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProduct: ${product.brandName} (${product.genericName})\n\nMessage:\n${message}`;
    window.location.href = `mailto:${company.emails[0]}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast.success('Opening your email client…');
    setEnquiryOpen(false);
  };

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="bg-grafian-blue-50/40 border-b border-grafian-blue-100">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-slate-600">
            <button onClick={() => navigate('/')} className="hover:text-grafian-blue-deep">Home</button>
            <ChevronRight className="h-3 w-3 opacity-50" />
            <button onClick={() => navigate('/products')} className="hover:text-grafian-blue-deep">Products</button>
            <ChevronRight className="h-3 w-3 opacity-50" />
            <button
              onClick={() => navigate(`/products?category=${encodeURIComponent(product.category)}`)}
              className="hover:text-grafian-blue-deep"
            >
              {product.category}
            </button>
            <ChevronRight className="h-3 w-3 opacity-50" />
            <span className="font-semibold text-grafian-blue-deep">{product.brandName}</span>
          </nav>
        </div>
      </div>

      {/* HERO */}
      <section className="bg-white py-8 md:py-12 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Product image / mock medicine box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-32"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-pharma-lg border border-slate-100">
                {product.image ? (
                  <div className="aspect-[5/4] relative bg-white">
                    <Image
                      src={product.image}
                      alt={product.imageAlt ?? product.brandName}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div
                    className="aspect-[5/4] relative"
                    style={{
                      background: `linear-gradient(135deg, ${product.cardColor} 0%, ${product.cardColor2} 100%)`,
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1.5px)',
                        backgroundSize: '14px 14px',
                      }}
                    />
                    <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
                    <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

                    {/* Category + Rx */}
                    <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-grafian-blue-deep shadow-sm">
                      <Icon className="h-3.5 w-3.5" />
                      {product.category}
                    </div>
                    {product.prescriptionRequired && (
                      <div className="absolute top-5 right-5 inline-flex items-center gap-1 rounded-full bg-red-500/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
                        Rx Prescription
                      </div>
                    )}

                    {/* Mock medicine box design */}
                    <div className="absolute inset-x-8 bottom-8 text-white">
                      <div className="text-[11px] font-medium uppercase tracking-[0.25em] opacity-80 mb-1.5">
                        {product.genericName}
                      </div>
                      <div className="text-3xl md:text-4xl font-black leading-none drop-shadow-sm mb-2">
                        {product.brandName}
                      </div>
                      <div className="inline-flex items-center gap-1.5 rounded-md bg-white/15 backdrop-blur px-3 py-1 text-sm font-semibold">
                        <PackageCheck className="h-4 w-4" />
                        Strength: {product.strength}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  onClick={handleDownloadPdf}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-grafian-blue-200 px-4 py-3 text-sm font-semibold text-grafian-blue-deep hover:bg-grafian-blue-50 transition-colors shadow-pharma"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
                <button
                  onClick={() => setEnquiryOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-grafian-blue-deep to-grafian-blue-mid px-4 py-3 text-sm font-semibold text-white shadow-pharma hover:shadow-pharma-lg transition-shadow"
                >
                  <Mail className="h-4 w-4" />
                  Enquire Now
                </button>
              </div>

              {/* Quick contact strip */}
              <div className="mt-3 rounded-xl bg-grafian-blue-50/60 border border-grafian-blue-100 p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Phone className="h-3.5 w-3.5 text-grafian-blue-mid" />
                  <span>{company.phones[0]}</span>
                </div>
                <a
                  href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Hello, I am interested in ${product.brandName}. Please share more details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] text-white px-3 py-1.5 text-[11px] font-semibold"
                >
                  <MessageCircle className="h-3 w-3" /> WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Product info summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-grafian-blue-mid mb-2">
                {product.genericName}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] mb-3 text-balance">
                {product.brandName}
              </h1>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-grafian-blue-50 px-3 py-1 text-xs font-semibold text-grafian-blue-deep border border-grafian-blue-100">
                  <PackageCheck className="h-3 w-3" /> Strength: {product.strength}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-200">
                  <Icon className="h-3 w-3" /> {product.category}
                </span>
                {product.prescriptionRequired ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 border border-red-100">
                    Rx — To be sold on prescription only
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-100">
                    OTC — Over the counter
                  </span>
                )}
              </div>

              <p className="text-slate-700 leading-relaxed mb-5">
                {product.benefits}
              </p>

              {/* Quick info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="rounded-2xl bg-grafian-blue-50/50 border border-grafian-blue-100 p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">Generic Name</div>
                  <div className="text-sm font-semibold text-slate-900">{product.genericName}</div>
                </div>
                <div className="rounded-2xl bg-grafian-blue-50/50 border border-grafian-blue-100 p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">Composition</div>
                  <div className="text-sm font-semibold text-slate-900">{product.composition}</div>
                </div>
                <div className="rounded-2xl bg-grafian-blue-50/50 border border-grafian-blue-100 p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">Strength</div>
                  <div className="text-sm font-semibold text-slate-900">{product.strength}</div>
                </div>
                <div className="rounded-2xl bg-grafian-blue-50/50 border border-grafian-blue-100 p-4">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">Packaging</div>
                  <div className="text-sm font-semibold text-slate-900">{product.packaging}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setEnquiryOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-grafian-blue-deep to-grafian-blue-mid px-6 py-3 text-sm font-semibold text-white shadow-pharma hover:shadow-pharma-lg transition-shadow"
                >
                  <Mail className="h-4 w-4" /> Enquire About This Product
                </button>
                <button
                  onClick={handleDownloadPdf}
                  className="inline-flex items-center gap-2 rounded-full bg-white border border-grafian-blue-200 px-6 py-3 text-sm font-semibold text-grafian-blue-deep hover:bg-grafian-blue-50 transition-colors"
                >
                  <FileText className="h-4 w-4" /> Download Info Sheet
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DETAILED INFO */}
      <section className="bg-gradient-to-b from-grafian-blue-50/30 to-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">
              <div className="mb-2">
                <div className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-grafian-blue-mid mb-2">
                  Prescribing Information
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">Complete product details</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Detailed clinical and packaging information for healthcare professionals. For full prescribing information, please consult the package insert or contact our medical team.
                </p>
              </div>

              <div className="space-y-3">
                {infoBlocks.map((b, idx) => {
                  const BlockIcon = b.icon;
                  return (
                    <motion.div
                      key={b.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="rounded-2xl bg-white border border-slate-100 shadow-pharma p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-grafian-blue-deep to-grafian-blue-mid text-white flex items-center justify-center shrink-0 shadow-pharma">
                          <BlockIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-semibold uppercase tracking-wider text-grafian-blue-mid mb-1">
                            {b.label}
                          </div>
                          <p className="text-sm text-slate-700 leading-relaxed">{b.value}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Important safety note */}
              <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-5">
                <div className="flex items-start gap-3">
                  <Stethoscope className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-amber-900 mb-1">Important Safety Information</div>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      This product is intended for use under medical supervision. Dosage and indications may vary based on patient condition. Always consult a registered medical practitioner before starting, changing, or stopping any medication. Keep out of reach of children.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="rounded-2xl bg-gradient-to-br from-grafian-blue-deep via-grafian-blue to-grafian-blue-mid p-6 text-white shadow-pharma-lg relative overflow-hidden">
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-grafian-blue-light/20 blur-2xl" />
                <div className="relative">
                  <div className="text-xs font-semibold uppercase tracking-wider text-grafian-blue-light mb-2">
                    For Healthcare Professionals
                  </div>
                  <h3 className="text-lg font-bold mb-2">Need samples or visual aid?</h3>
                  <p className="text-sm text-slate-100/90 leading-relaxed mb-4">
                    Get product samples, branded visual aids, and full prescribing information delivered to your clinic or pharmacy.
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => setEnquiryOpen(true)}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-grafian-blue-deep px-4 py-2.5 text-sm font-semibold hover:bg-grafian-blue-50 transition-colors"
                    >
                      <Mail className="h-4 w-4" /> Send Enquiry
                    </button>
                    <a
                      href={`tel:${company.phones[0].replace(/\s/g, '')}`}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white px-4 py-2.5 text-sm font-semibold hover:bg-white/20 transition-colors"
                    >
                      <Phone className="h-4 w-4" /> Call Sales Team
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-slate-100 shadow-pharma p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  Quick Reference
                </div>
                <ul className="space-y-2.5 text-sm">
                  <li className="flex items-center justify-between gap-2">
                    <span className="text-slate-600">Brand</span>
                    <span className="font-semibold text-slate-900">{product.brandName}</span>
                  </li>
                  <li className="flex items-center justify-between gap-2">
                    <span className="text-slate-600">Category</span>
                    <span className="font-semibold text-slate-900">{product.category}</span>
                  </li>
                  <li className="flex items-center justify-between gap-2">
                    <span className="text-slate-600">Strength</span>
                    <span className="font-semibold text-slate-900">{product.strength}</span>
                  </li>
                  <li className="flex items-center justify-between gap-2">
                    <span className="text-slate-600">Type</span>
                    <span className="font-semibold text-slate-900">{product.prescriptionRequired ? 'Prescription' : 'OTC'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className="bg-white py-12 md:py-16 border-t border-slate-100">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-grafian-blue-mid mb-2">
                  Related Products
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                  More from {product.category}
                </h2>
              </div>
              <button
                onClick={() => navigate(`/products?category=${encodeURIComponent(product.category)}`)}
                className="inline-flex items-center gap-2 rounded-full border border-grafian-blue-200 px-4 py-2 text-xs font-semibold text-grafian-blue-deep hover:bg-grafian-blue-50 transition-colors"
              >
                View All <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p, i) => (
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
      )}

      {/* ENQUIRY MODAL */}
      <Dialog open={enquiryOpen} onOpenChange={setEnquiryOpen}>
        <DialogContent className="sm:max-w-[480px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-slate-900">
              Enquire about {product.brandName}
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              Fill in your details and our team will get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEnquirySubmit} className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="enq-name" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Name</Label>
                <Input id="enq-name" name="name" required placeholder="Your name" className="rounded-lg" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="enq-phone" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Phone</Label>
                <Input id="enq-phone" name="phone" required placeholder="Phone number" className="rounded-lg" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="enq-email" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email</Label>
              <Input id="enq-email" name="email" type="email" required placeholder="Your email" className="rounded-lg" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="enq-message" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Message</Label>
              <Textarea
                id="enq-message"
                name="message"
                rows={4}
                placeholder={`I am interested in ${product.brandName}. Please share pricing and availability.`}
                className="rounded-lg resize-none"
              />
            </div>
            <input type="hidden" name="product" value={product.brandName} />
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setEnquiryOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-gradient-to-r from-grafian-blue-deep to-grafian-blue-mid text-white">
                <Mail className="h-4 w-4 mr-1.5" /> Send Enquiry
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/**
 * Generates a printable HTML page that the user can "Save as PDF" via the browser print dialog.
 * This is a server-free approach that gives a professional-looking one-page product info sheet.
 */
function generateProductPdfHtml(product: ReturnType<typeof getProductBySlug>): string {
  if (!product) return '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${product.brandName} — Product Information | Grafian Pharmaceuticals</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0f172a; line-height: 1.55; padding: 40px; background: white; }
  .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #0c4a6e; padding-bottom: 18px; margin-bottom: 24px; }
  .brand { display: flex; align-items: center; gap: 12px; }
  .brand-logo { width: 56px; height: 38px; background: linear-gradient(135deg, #166534, #22c55e); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 22px; }
  .brand-text { font-size: 18px; font-weight: 800; color: #0c4a6e; }
  .brand-tag { font-size: 10px; color: #475569; text-transform: uppercase; letter-spacing: 1.5px; }
  .cert { display: flex; gap: 6px; align-items: center; font-size: 10px; color: #0369a1; font-weight: 600; }
  .cert-badge { padding: 3px 8px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; }
  .product-hero { background: linear-gradient(135deg, ${product.cardColor}, ${product.cardColor2}); color: white; padding: 32px; border-radius: 16px; margin-bottom: 24px; }
  .product-cat { font-size: 10px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.85; margin-bottom: 6px; }
  .product-name { font-size: 32px; font-weight: 900; line-height: 1.1; margin-bottom: 8px; }
  .product-generic { font-size: 14px; opacity: 0.9; margin-bottom: 14px; }
  .product-strength { display: inline-block; padding: 6px 14px; background: rgba(255,255,255,0.18); border-radius: 8px; font-size: 13px; font-weight: 600; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px; }
  .info-block { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 18px; }
  .info-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #0369a1; font-weight: 700; margin-bottom: 5px; }
  .info-value { font-size: 13px; color: #1e293b; line-height: 1.55; }
  .full { grid-column: 1 / -1; }
  .safety { background: #fffbeb; border: 1px solid #fcd34d; border-radius: 12px; padding: 14px 18px; margin-bottom: 20px; }
  .safety-title { font-size: 12px; font-weight: 800; color: #92400e; margin-bottom: 4px; }
  .safety-text { font-size: 11px; color: #78350f; }
  .footer { border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 24px; display: flex; justify-content: space-between; font-size: 10px; color: #64748b; }
  .footer-brand { font-weight: 700; color: #0c4a6e; }
  @media print {
    body { padding: 20px; }
    @page { margin: 12mm; }
  }
</style>
</head>
<body>
  <div class="header">
    <div class="brand">
      <div class="brand-logo">G</div>
      <div>
        <div class="brand-text">Grafian Pharmaceuticals</div>
        <div class="brand-tag">Committed to Quality Healthcare</div>
      </div>
    </div>
    <div class="cert">
      <span class="cert-badge">WHO-GMP</span>
      <span class="cert-badge">ISO 9001:2015</span>
    </div>
  </div>

  <div class="product-hero">
    <div class="product-cat">${product.category} ${product.prescriptionRequired ? '• Rx Prescription Medicine' : '• OTC Product'}</div>
    <div class="product-name">${product.brandName}</div>
    <div class="product-generic">${product.genericName}</div>
    <div class="product-strength">Strength: ${product.strength}</div>
  </div>

  <div class="grid">
    <div class="info-block">
      <div class="info-label">Generic Name</div>
      <div class="info-value">${product.genericName}</div>
    </div>
    <div class="info-block">
      <div class="info-label">Composition</div>
      <div class="info-value">${product.composition}</div>
    </div>
    <div class="info-block full">
      <div class="info-label">Indications</div>
      <div class="info-value">${product.indications}</div>
    </div>
    <div class="info-block full">
      <div class="info-label">Dosage & Administration</div>
      <div class="info-value">${product.dosage}</div>
    </div>
    <div class="info-block full">
      <div class="info-label">Key Benefits</div>
      <div class="info-value">${product.benefits}</div>
    </div>
    <div class="info-block">
      <div class="info-label">Packaging</div>
      <div class="info-value">${product.packaging}</div>
    </div>
    <div class="info-block">
      <div class="info-label">Storage</div>
      <div class="info-value">${product.storage}</div>
    </div>
  </div>

  <div class="safety">
    <div class="safety-title">⚠ Important Safety Information</div>
    <div class="safety-text">This product is intended for use under medical supervision. Always consult a registered medical practitioner before use. Keep out of reach of children. Read the package insert carefully before prescribing or dispensing.</div>
  </div>

  <div class="footer">
    <div>
      <div class="footer-brand">Grafian Pharmaceuticals</div>
      <div>H.No. 3-4-16, Shankuchakra Hemasouda Apartment, Srinivasapuram Colony, Ramanthapur, Hyderabad - 500013</div>
      <div>Phone: ${company.phones.join(', ')} • Email: ${company.emails[0]}</div>
    </div>
    <div style="text-align: right;">
      <div>Generated on ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
      <div>Document: Product Information Sheet</div>
    </div>
  </div>

  <script>
    window.onload = function() { setTimeout(function() { window.print(); }, 300); };
  </script>
</body>
</html>`;
}
export default ProductDetailsPage;