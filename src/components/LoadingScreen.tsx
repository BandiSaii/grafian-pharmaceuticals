'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

interface LoadingScreenProps {
  show: boolean;
}

/**
 * First-impression loading screen.
 * Fast (1 second), elegant, attractive.
 * Shows ONLY the company logo on a clean white background with a smooth
 * entrance + exit animation. No certificate info, no long delays.
 */
export function LoadingScreen({ show }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
        >
          {/* Decorative soft halos — subtle, fast */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[380px] rounded-full bg-grafian-blue-50 blur-3xl opacity-60" />
          </div>

          {/* Logo with quick, attractive entrance */}
          <div className="relative flex flex-col items-center gap-5 px-6">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, filter: 'blur(12px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Logo className="h-40 md:h-56 w-auto" priority />
            </motion.div>

            {/* Slim progress bar — fast fill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="w-40 h-1 rounded-full bg-grafian-blue-100 overflow-hidden"
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="h-full w-full rounded-full bg-gradient-to-r from-grafian-blue-deep via-grafian-blue-mid to-grafian-blue-light"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
