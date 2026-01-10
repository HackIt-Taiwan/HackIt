"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { useI18n } from '@/i18n';

type EventsLoadingProps = {
  className?: string;
  label?: string;
};

const orbitTransition = { repeat: Infinity, ease: "linear", duration: 2.6 };
const slowSpin = { repeat: Infinity, ease: "linear", duration: 10 };

const EventsLoading: React.FC<EventsLoadingProps> = ({ className = '', label }) => {
  const { t } = useI18n();
  const text = label ?? (t("eventsList.loading") as string);

  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`.trim()}>
      <div className="relative flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
            animate={{ rotate: 360 }}
            transition={slowSpin}
          />
          <motion.div
            className="absolute inset-2 rounded-full border border-secondary/20"
            animate={{ rotate: -360 }}
            transition={{ ...slowSpin, duration: 14 }}
          />

          <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={orbitTransition}>
            <span className="absolute left-1/2 top-0 -translate-x-1/2 h-3 w-3 rounded-full bg-primary shadow-[0_0_12px_rgba(99,102,241,0.4)]"></span>
          </motion.div>
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: -360 }}
            transition={{ ...orbitTransition, duration: 3.4 }}
          >
            <span className="absolute left-1/2 bottom-0 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_12px_rgba(236,72,153,0.4)]"></span>
          </motion.div>
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ ...orbitTransition, duration: 4.2 }}
          >
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgba(34,197,94,0.35)]"></span>
          </motion.div>

          <motion.div
            className="absolute -top-3 -right-3 text-primary/80"
            animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.1, 0.95, 1] }}
            transition={{ duration: 3.6, repeat: Infinity }}
          >
            <FaStar />
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-700 dark:text-gray-200 font-semibold tracking-[0.3em] uppercase">
            {text}
          </p>
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((idx) => (
              <motion.span
                key={idx}
                className="h-1.5 w-1.5 rounded-full bg-primary/70"
                animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: idx * 0.15 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsLoading;
