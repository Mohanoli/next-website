'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUICK_ITEMS } from "@/components/home/QuickItems"
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function QuickMenu() {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const autoCloseTimeout = useRef<NodeJS.Timeout | null>(null);

  // Show sidebar after scroll + auto open logic
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 200;

      setVisible(scrolled);

      // Reset when user goes back up
      if (window.scrollY < 100) {
        setHasAutoOpened(false);
      }

      // 🔥 First-time auto expand
      if (scrolled && !hasAutoOpened) {
        setHasAutoOpened(true);

        // small delay for smoother feel
        setTimeout(() => {
          setExpanded(true);

          // Auto collapse after 2.5 sec
          if (autoCloseTimeout.current) {
            clearTimeout(autoCloseTimeout.current);
          }

          autoCloseTimeout.current = setTimeout(() => {
            setExpanded(false);
          }, 2500);
        }, 200);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (autoCloseTimeout.current) clearTimeout(autoCloseTimeout.current);
    };
  }, [hasAutoOpened]);

  // Hover handlers
  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    if (autoCloseTimeout.current) clearTimeout(autoCloseTimeout.current); // stop auto close
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setExpanded(false);
      setActiveTooltip(null);
    }, 180);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="quickmenu"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-1000 flex items-center"
        >
          {/* Toggle Tab */}
          <div className="flex flex-col items-center justify-center gap-1 w-6 h-30 rounded-l-xl bg-[#077430] text-white shadow-xl shrink-0">
            {expanded ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            <span
              className="text-[9px] font-bold uppercase tracking-widest"
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
            >
              Quick Links
            </span>
          </div>

          {/* Panel */}
          <motion.div
            animate={{
              width: expanded ? 'auto' : 0,
              opacity: expanded ? 1 : 0,
            }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <div
              className="flex flex-col py-2 px-1 gap-1"
              style={{
                background: 'linear-gradient(175deg, #065f2e 0%, #043d1d 100%)',
                boxShadow: '-8px 0 40px rgba(0,0,0,0.35)',
                borderRadius: '12px 0 0 12px',
                minWidth: '108px',
              }}
            >
              {QUICK_ITEMS.map((item, idx) => {
                const Icon = item.icon;

                return (
                  <Link key={item.id} href={item.href || '#'}>
                    <motion.div
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.045 }}
                      onMouseEnter={() =>
                        !expanded && setActiveTooltip(item.id)
                      }
                      onMouseLeave={() => setActiveTooltip(null)}
                      className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer group hover:bg-white/10"
                    >
                      {/* Icon */}
                      <div
                        className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center`}
                      >
                        <Icon size={15} className="text-white" />
                      </div>

                      {/* Label */}
                      {expanded && (
                        <span className="text-white/80 group-hover:text-white text-[12px] font-semibold whitespace-nowrap">
                          {item.label}
                        </span>
                      )}

                      {/* Indicator */}
                      <span
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-3px h-0 ${item.color} rounded-r-full group-hover:h-5 opacity-0 group-hover:opacity-100 transition-all`}
                      />

                      {/* Tooltip */}
                      <AnimatePresence>
                        {!expanded && activeTooltip === item.id && (
                          <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.18 }}
                            className="absolute right-full mr-3 px-2 py-1 text-[11px] bg-black text-white rounded-md whitespace-nowrap shadow-lg"
                          >
                            {item.label}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                );
              })}

              {/* Footer */}
              <div className="mx-3 mt-1 pt-2 border-t border-white/10">
                <p className="text-white/25 text-[9px] text-center tracking-widest uppercase">
                  SFACL
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default QuickMenu;