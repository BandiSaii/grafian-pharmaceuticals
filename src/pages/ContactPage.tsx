'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Phone, Mail, Send, MessageCircle, ChevronRight,
  Building2, Navigation,
} from 'lucide-react';
import { company } from '@/lib/company';
import { type Route } from '@/lib/router';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ContactPageProps {
  route: Route;
  navigate: (to: string) => void;
}

export function ContactPage({ route, navigate }: ContactPageProps) {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '');
    const email = String(data.get('email') || '');
    const phone = String(data.get('phone') || '');
    const organization = String(data.get('organization') || '');
    const role = String(data.get('role') || '');
    const subject = String(data.get('subject') || '');
    const message = String(data.get('message') || '');

    const mailSubject = subject ? `Contact Form: ${subject}` : 'Contact Form Enquiry';
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nOrganization: ${organization}\nRole: ${role}\nSubject: ${subject}\n\nMessage:\n${message}`;
    window.location.href = `mailto:${company.emails[0]}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      setSubmitting(false);
      toast.success('Opening your email client — please send the pre-filled email to complete your enquiry.');
    }, 600);
  };

  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`;
  const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.mapQuery)}`;

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
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-1.5 text-xs font-semibold text-grafian-blue-deep border border-grafian-blue-200 mb-4">
              <MapPin className="h-3.5 w-3.5" /> Hyderabad, India
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-grafian-blue-deep leading-[1.1] mb-3 text-balance">
              We&apos;d love to hear from you
            </h1>
            <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
              Whether you are a doctor seeking product information, a distributor exploring partnership, or a patient with a query — our team is here to help. Reach us through any of the channels below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CARDS — premium cards with large gradient icons (3 cards, no Working Hours) */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0 }}
              className="group relative rounded-3xl bg-gradient-to-br from-grafian-blue-50/80 via-white to-white p-7 border border-slate-100 shadow-pharma hover:shadow-pharma-lg transition-all overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-grafian-blue-100/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-grafian-blue-deep to-grafian-blue-mid text-white flex items-center justify-center mb-5 shadow-pharma">
                  <Building2 className="h-8 w-8" />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-grafian-blue-mid mb-1.5">Head Office</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2.5">{company.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {company.address.line1}, {company.address.line2}, {company.address.city} - {company.address.pincode}, {company.address.state}, {company.address.country}
                </p>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative rounded-3xl bg-gradient-to-br from-grafian-blue-50/80 via-white to-white p-7 border border-slate-100 shadow-pharma hover:shadow-pharma-lg transition-all overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-grafian-blue-100/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-grafian-blue-deep to-grafian-blue-mid text-white flex items-center justify-center mb-5 shadow-pharma">
                  <Phone className="h-8 w-8" />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-grafian-blue-mid mb-1.5">Call Us</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2.5">Phone</h3>
                <div className="space-y-1.5">
                  {company.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block text-sm text-slate-700 hover:text-grafian-blue-deep font-semibold transition-colors">
                      {p}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative rounded-3xl bg-gradient-to-br from-grafian-blue-50/80 via-white to-white p-7 border border-slate-100 shadow-pharma hover:shadow-pharma-lg transition-all overflow-hidden sm:col-span-2 lg:col-span-1"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-grafian-blue-100/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-grafian-blue-deep to-grafian-blue-mid text-white flex items-center justify-center mb-5 shadow-pharma">
                  <Mail className="h-8 w-8" />
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-grafian-blue-mid mb-1.5">Email Us</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2.5">Email</h3>
                {company.emails.map((e) => (
                  <a key={e} href={`mailto:${e}`} className="block text-sm text-slate-700 hover:text-grafian-blue-deep font-semibold transition-colors break-all">
                    {e}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="bg-gradient-to-b from-grafian-blue-50/40 to-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-white border border-slate-100 shadow-pharma-lg p-7 md:p-8"
            >
              <div className="mb-6">
                <div className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-grafian-blue-mid mb-2">
                  Send Us a Message
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                  Let&apos;s start a conversation
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Fill in the form below and our team will respond within 24 working hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="c-name" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input id="c-name" name="name" required placeholder="Your name" className="rounded-lg" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="c-phone" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Phone <span className="text-red-500">*</span>
                    </Label>
                    <Input id="c-phone" name="phone" required placeholder="Phone number" className="rounded-lg" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="c-email" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input id="c-email" name="email" type="email" required placeholder="Your email" className="rounded-lg" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="c-org" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Organization / Clinic
                    </Label>
                    <Input id="c-org" name="organization" placeholder="Your organization" className="rounded-lg" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="c-role" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    I am a
                  </Label>
                  <Select name="role">
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor">Doctor / Healthcare Professional</SelectItem>
                      <SelectItem value="distributor">Distributor / Stockist</SelectItem>
                      <SelectItem value="pharmacy">Pharmacy / Retailer</SelectItem>
                      <SelectItem value="hospital">Hospital / Institution</SelectItem>
                      <SelectItem value="patient">Patient / Consumer</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="c-subject" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Subject <span className="text-red-500">*</span>
                  </Label>
                  <Input id="c-subject" name="subject" required placeholder="How can we help?" className="rounded-lg" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="c-message" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="c-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us more about your enquiry…"
                    className="rounded-lg resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-grafian-blue-deep to-grafian-blue-mid text-white rounded-full py-3 text-sm font-semibold shadow-pharma hover:shadow-pharma-lg disabled:opacity-60"
                >
                  {submitting ? (
                    'Preparing your email…'
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" /> Send Message
                    </>
                  )}
                </Button>

                <p className="text-[11px] text-slate-400 text-center">
                  By submitting this form, you agree to be contacted by {company.name} regarding your enquiry.
                </p>
              </form>
            </motion.div>

            {/* Map + WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-pharma-lg bg-white">
                <div className="p-5 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-grafian-blue-deep to-grafian-blue-mid text-white flex items-center justify-center">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-grafian-blue-mid">Find Us</div>
                      <div className="text-base font-bold text-slate-900">Our Location</div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {company.address.line1}, {company.address.line2}, {company.address.city} - {company.address.pincode}, {company.address.state}.
                  </p>
                </div>
                <div className="aspect-[4/3] w-full bg-slate-100">
                  <iframe
                    title="Grafian Pharmaceuticals location on Google Maps"
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <div className="p-4 border-t border-slate-100">
                  <a
                    href={mapLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-grafian-blue-50 border border-grafian-blue-200 px-4 py-2.5 text-sm font-semibold text-grafian-blue-deep hover:bg-grafian-blue-100 transition-colors"
                  >
                    <Navigation className="h-4 w-4" /> Open in Google Maps
                  </a>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="rounded-3xl bg-gradient-to-br from-[#25D366] to-[#128C7E] p-7 text-white shadow-pharma-lg relative overflow-hidden">
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
                <div className="relative">
                  <MessageCircle className="h-9 w-9 mb-3" />
                  <h3 className="text-xl font-bold mb-2">Prefer to chat?</h3>
                  <p className="text-sm text-white/90 leading-relaxed mb-4">
                    Message us on WhatsApp for instant responses during working hours. Our team usually replies within minutes.
                  </p>
                  <a
                    href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Hello ${company.name}, I would like to know more about your products.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white text-[#128C7E] px-5 py-2.5 text-sm font-semibold shadow-pharma hover:bg-white/90 transition-colors"
                  >
                    Chat on WhatsApp <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Quick CTA */}
              <div className="rounded-3xl bg-gradient-to-br from-grafian-blue-deep via-grafian-blue to-grafian-blue-mid p-7 text-white shadow-pharma-lg">
                <h3 className="text-lg font-bold mb-2">For Healthcare Professionals</h3>
                <p className="text-sm text-slate-100/90 leading-relaxed mb-4">
                  Get our complete product catalogue, visual aids, samples and full prescribing information delivered to your clinic.
                </p>
                <button
                  onClick={() => navigate('/products')}
                  className="inline-flex items-center gap-2 rounded-full bg-white text-grafian-blue-deep px-5 py-2.5 text-sm font-semibold hover:bg-grafian-blue-50 transition-colors"
                >
                  Browse Products <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
