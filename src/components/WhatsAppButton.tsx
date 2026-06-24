'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Phone } from 'lucide-react';
import { company } from '@/lib/company';

/**
 * Floating action button stack (bottom-right).
 * - WhatsApp primary button (large, animated pulse)
 * - Optional Call button (secondary)
 * - Friendly auto-invite bubble
 */
export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBubble(true), 4500);
    const t2 = setTimeout(() => setBubble(false), 13000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  const whatsappUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    `Hello ${company.name}, I would like to know more about your products.`
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Auto-invite bubble */}
      <AnimatePresence>
        {bubble && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="relative max-w-[280px] rounded-2xl bg-white shadow-pharma-lg border border-slate-100 p-4 pr-9"
          >
            <button
              onClick={() => setBubble(false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-700"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="h-7 w-7 rounded-full bg-[#25D366] flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div className="text-sm font-bold text-grafian-blue-deep">Need help?</div>
            </div>
            <div className="text-xs text-slate-600 leading-relaxed">
              Chat with our team on WhatsApp — we usually reply within minutes.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating action stack */}
      <div className="flex flex-col items-end gap-3">
        {/* Call button (secondary, smaller) */}
        <a
          href={`tel:${company.phones[0].replace(/\s/g, '')}`}
          className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-grafian-blue-deep to-grafian-blue-mid shadow-pharma-lg transition-all hover:scale-110"
          aria-label="Call us"
        >
          <Phone className="h-5 w-5 text-white" />
          <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-grafian-blue-deep px-2.5 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Call us
          </span>
        </a>

        {/* WhatsApp button (primary, larger) */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-pharma-lg"
          aria-label="Chat with us on WhatsApp"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring [animation-delay:1s]" />

          {/* WhatsApp icon */}
          <svg
            viewBox="0 0 32 32"
            className="relative h-9 w-9 fill-white drop-shadow-sm"
            aria-hidden="true"
          >
            <path d="M16.001 0C7.166 0 .003 7.163.003 16.001c0 2.82.737 5.573 2.135 7.993L0 32l8.184-2.146a15.93 15.93 0 0 0 7.817 2.022h.007C24.836 31.876 32 24.713 32 15.875 32 7.037 24.836 0 16.001 0Zm0 29.176h-.005a13.27 13.27 0 0 1-6.766-1.85l-.485-.288-5.025 1.317 1.342-4.9-.318-.503a13.21 13.21 0 0 1-2.028-7.05C2.316 8.7 8.547 2.469 16.005 2.469c3.611 0 7.005 1.408 9.557 3.962a13.41 13.41 0 0 1 3.961 9.558c0 7.458-6.231 13.187-13.522 13.187Zm7.404-10.103c-.406-.204-2.402-1.185-2.773-1.32-.372-.135-.642-.204-.912.205-.27.406-1.045 1.318-1.282 1.588-.236.27-.472.302-.878.102-.406-.205-1.713-.632-3.262-2.014-1.206-1.076-2.019-2.406-2.255-2.813-.236-.406-.025-.626.179-.828.184-.183.406-.472.61-.708.204-.236.27-.406.406-.677.135-.27.068-.507-.034-.71-.102-.204-.912-2.197-1.25-3.008-.33-.793-.665-.685-.912-.698l-.776-.014c-.27 0-.71.102-1.082.508-.372.406-1.418 1.385-1.418 3.378 0 1.992 1.452 3.917 1.654 4.187.204.27 2.854 4.355 6.913 6.107.966.418 1.722.668 2.31.855.971.309 1.854.265 2.553.16.779-.116 2.402-.981 2.74-1.928.339-.946.339-1.757.237-1.928-.102-.17-.372-.27-.778-.472Z" />
          </svg>

          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-grafian-blue-deep px-3 py-2 text-xs font-semibold text-white shadow-pharma flex items-center gap-1.5"
              >
                <Send className="h-3 w-3" /> Chat on WhatsApp
              </motion.span>
            )}
          </AnimatePresence>
        </motion.a>
      </div>
    </div>
  );
}
