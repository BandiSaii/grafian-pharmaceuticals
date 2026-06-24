'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

interface LoadingScreenProps {
  show: boolean;
}

/**
 * First-impression loading screen.
 * Shows ONLY the company logo on a clean white background — per user request:
 *   "When i open the website that the should appear first"
 *   "Do not show certificate information during loading or startup"
 *   "Keep the current animation effects. Use a clean white background."
 */
export function LoadingScreen({ show }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
        >
          {/* Decorative soft halo */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full bg-grafian-blue-50 blur-3xl opacity-70 animate-blob" />
            <div className="absolute left-[20%] top-[30%] h-32 w-32 rounded-full bg-grafian-blue-100 blur-3xl opacity-60 animate-float-slow" />
            <div className="absolute right-[20%] bottom-[25%] h-24 w-24 rounded-full bg-grafian-blue-200/40 blur-3xl opacity-50 animate-float-soft" />
          </div>

          <div className="relative flex flex-col items-center gap-6 px-6">
            <motion.div
              initial={{ scale: 0.7, opacity: 0, filter: 'blur(8px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="animate-logo-entrance"
            >
              <Logo className="h-52 md:h-72 w-auto" priority />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="text-sm font-medium uppercase tracking-[0.25em] text-grafian-blue-deep/70">
                Committed to Quality Healthcare
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-grafian-blue-mid animate-pulse" />
                <span className="h-1.5 w-1.5 rounded-full bg-grafian-blue-mid animate-pulse [animation-delay:200ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-grafian-blue-mid animate-pulse [animation-delay:400ms]" />
              </div>
            </motion.div>
          </div>

          {/* Subtle progress bar at bottom */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-grafian-blue-deep via-grafian-blue-mid to-grafian-blue-light"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
