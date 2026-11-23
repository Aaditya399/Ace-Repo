import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ROADMAP_CHAPTERS } from '../data/principles';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';

interface AboutProps {
  onNavigateToDeveloper?: () => void;
}

export const About: React.FC<AboutProps> = ({ onNavigateToDeveloper }) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);

  return (
    <section id="about" className="py-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Section with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24"
        >
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
              03 &middot; STUDIO ORIGIN
            </div>
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl font-semibold text-primary tracking-tight">
              One Maker. Uncompromising Standard.
            </h2>
            <p className="text-base text-secondary leading-relaxed font-normal">
              Ace Labs is an independent studio owned and operated by a solo founder who writes the code,
              designs every card interface, and directly supports every user.
            </p>
            <div className="pt-4 border-t border-border-subtle">
              <div className="text-[10px] text-muted font-mono mb-1 uppercase tracking-wider font-semibold">
                FOUNDER &amp; CHIEF ARCHITECT
              </div>
              <div className="text-sm font-bold text-primary">
                Aaditya Acharya &middot; Independent Product Engineer
              </div>
              <div className="text-xs text-secondary mt-0.5 mb-3">
                Operating under the long-term charter of Ace Foundation
              </div>

              {onNavigateToDeveloper && (
                <button
                  type="button"
                  onClick={onNavigateToDeveloper}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 text-xs font-semibold transition-all cursor-pointer group active:scale-95 shadow-2xs"
                >
                  <span>Explore Developer Profile &amp; Media Links</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-secondary leading-relaxed font-normal">
            <p>
              Modern software has become bogged down by bureaucracy. Product teams debate trivial metrics for months, analytics companies inject tracking scripts that slow down your machine, and apps morph into bloated subscriptions that you forget you own.
            </p>
            <p>
              Ace Labs was built on a different thesis: <strong className="text-primary font-semibold">the sharpest software is built by single craftspeople who care obsessively about the entire object</strong>. When the person architecting the local database is also tuning the typeface and the card shadow, there are zero handoff compromises.
            </p>
            <p>
              Every tool we release operates under the Ace philosophy: finite, local-first, and respectful of your cognitive peace. No venture capital pressure. No engagement traps. Just high-leverage software that lasts.
            </p>
          </div>
        </motion.div>

        {/* Roadmap / Ace Foundation Section */}
        <div className="pt-12 border-t border-border-subtle">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div className="max-w-2xl">
              <div className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2.5">
                04 &middot; THE LONG ROAD
              </div>
              <h3 className="font-['Outfit'] text-3xl sm:text-4xl font-semibold text-primary tracking-tight">
                The Evolution to Ace Foundation
              </h3>
              <p className="mt-2 text-sm sm:text-base text-secondary font-normal">
                Ace Labs is not built to be sold off to a tech conglomerate. We are building a sustainable studio structured to transition into a permanent foundation.
              </p>
            </div>

            {/* Interactive Chapter Indicator Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-surface-subtle rounded-2xl border border-border-subtle self-start md:self-auto shadow-2xs">
              {ROADMAP_CHAPTERS.map((ch, i) => (
                <button
                  key={ch.era}
                  onClick={() => setActiveChapterIndex(i)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    activeChapterIndex === i
                      ? 'bg-surface text-primary shadow-xs font-semibold'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {ch.era}
                </button>
              ))}
            </div>
          </motion.div>

          {/* 3 Roadmap Chapters with Staggered Scroll Animation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROADMAP_CHAPTERS.map((chapter, index) => {
              const isSelected = activeChapterIndex === index;

              return (
                <motion.div
                  key={chapter.era}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onClick={() => setActiveChapterIndex(index)}
                  className={`p-6 sm:p-7 rounded-[24px] border flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 text-white dark:bg-[#181822] border-blue-500/50 shadow-xl ring-1 ring-blue-500/30'
                      : 'bg-surface border-border-subtle hover:border-border-hover shadow-2xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-4">
                      <span className={isSelected ? 'text-blue-400 font-bold' : 'text-accent font-semibold'}>
                        {chapter.era}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                        isSelected
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                          : 'bg-surface-subtle text-secondary border border-border-subtle'
                      }`}>
                        {chapter.status}
                      </span>
                    </div>

                    <h4 className={`font-['Outfit'] text-xl font-bold mb-1 ${
                      isSelected ? 'text-white' : 'text-primary'
                    }`}>
                      {chapter.title}
                    </h4>
                    <div className={`text-xs font-mono mb-4 ${
                      isSelected ? 'text-neutral-400' : 'text-muted'
                    }`}>
                      {chapter.timeline}
                    </div>

                    <p className={`text-xs sm:text-sm leading-relaxed mb-6 font-normal ${
                      isSelected ? 'text-neutral-300' : 'text-secondary'
                    }`}>
                      {chapter.description}
                    </p>
                  </div>

                  {/* Milestones list with check indicators */}
                  <div className={`pt-4 border-t ${
                    isSelected ? 'border-neutral-800' : 'border-border-subtle'
                  }`}>
                    <div className={`text-[10px] font-mono mb-2 uppercase tracking-wider font-semibold ${
                      isSelected ? 'text-neutral-400' : 'text-muted'
                    }`}>
                      Key Milestones
                    </div>
                    <ul className="space-y-2 text-xs">
                      {chapter.milestones.map((m, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                            isSelected ? 'text-blue-400' : 'text-accent'
                          }`} />
                          <span className={isSelected ? 'text-neutral-200' : 'text-secondary'}>
                            {m}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
