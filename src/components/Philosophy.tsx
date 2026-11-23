import React, { useState } from 'react';
import { motion } from 'motion/react';
import { STUDIO_PRINCIPLES } from '../data/principles';

export const Philosophy: React.FC = () => {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  return (
    <section id="philosophy" className="py-24 border-t border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Intro with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div className="max-w-2xl">
            <div className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2.5">
              02 &middot; STUDIO DOCTRINE
            </div>
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl font-semibold text-primary tracking-tight">
              Why We Call It "Ace"
            </h2>
            <p className="mt-3 text-base text-secondary leading-relaxed font-normal">
              In every deck of playing cards, the Ace occupies a singular position: it is the top card,
              the one of maximum value, and the first move that leads. We believe software should embody
              that exact restraint.
            </p>
          </div>

          {/* Quick Suit Principle Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-surface-subtle rounded-2xl border border-border-subtle self-start md:self-auto shadow-2xs">
            {STUDIO_PRINCIPLES.map((principle, idx) => {
              const isSelected = highlightedIndex === idx;
              const isRed = principle.suitSymbol === '♥' || principle.suitSymbol === '♦';

              return (
                <button
                  key={principle.number}
                  onClick={() => setHighlightedIndex(isSelected ? null : idx)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-surface shadow-xs scale-105 ring-1 ring-blue-500/30'
                      : 'hover:bg-surface/60 opacity-70 hover:opacity-100'
                  } ${isRed ? 'text-rose-600 dark:text-rose-400' : 'text-primary'}`}
                  title={principle.title}
                >
                  {principle.suitSymbol}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 4 Core Principles with Scroll Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {STUDIO_PRINCIPLES.map((principle, index) => {
            const isRed = principle.suitSymbol === '♥' || principle.suitSymbol === '♦';
            const isHighlighted = highlightedIndex === index;
            const isDimmed = highlightedIndex !== null && !isHighlighted;

            return (
              <motion.div
                key={principle.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => setHighlightedIndex(isHighlighted ? null : index)}
                className={`p-7 sm:p-8 rounded-[24px] bg-surface border transition-all duration-300 relative overflow-hidden cursor-pointer shadow-xs ${
                  isHighlighted 
                    ? 'border-blue-500/60 shadow-xl ring-1 ring-blue-500/20' 
                    : isDimmed 
                    ? 'opacity-40 border-border-subtle' 
                    : 'border-border-subtle hover:border-border-hover'
                }`}
              >
                {/* Playing Card Inset Line */}
                <div className="absolute inset-2.5 rounded-[18px] border border-border-subtle/50 pointer-events-none" />

                {/* Subtle Ambient Suit Glow in Background */}
                <div 
                  className={`absolute right-4 bottom-2 select-none pointer-events-none opacity-[0.03] dark:opacity-[0.06] font-['Outfit'] text-[140px] leading-none ${
                    isRed ? 'text-rose-600' : 'text-slate-900 dark:text-white'
                  }`}
                  aria-hidden="true"
                >
                  {principle.suitSymbol}
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Playing card corner header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">
                          {principle.number}.
                        </span>
                        <span className="text-muted font-semibold tracking-widest uppercase text-[10px]">
                          PRINCIPLE
                        </span>
                      </div>

                      <span className={`w-9 h-9 rounded-xl border border-border-subtle bg-surface-subtle flex items-center justify-center font-bold text-lg shadow-2xs ${
                        isRed ? 'text-rose-600 dark:text-rose-400' : 'text-primary'
                      }`}>
                        {principle.suitSymbol}
                      </span>
                    </div>

                    <h3 className="font-['Outfit'] text-2xl font-semibold text-primary mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
                      {principle.tagline}
                    </p>
                    <p className="text-sm text-secondary leading-relaxed font-normal">
                      {principle.description}
                    </p>
                  </div>

                  {/* Bottom discrete finish */}
                  <div className="pt-6 mt-6 border-t border-border-subtle flex items-center justify-between text-xs text-muted font-mono">
                    <span>Non-Negotiable Baseline</span>
                    <span className="font-bold">A{principle.suitSymbol}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
