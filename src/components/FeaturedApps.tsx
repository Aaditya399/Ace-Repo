import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AppProduct } from '../types';
import { ArrowUpRight, Check, Sparkles, Compass, ShieldAlert, Cpu } from 'lucide-react';

interface FeaturedAppsProps {
  apps: AppProduct[];
  onSelectApp: (app: AppProduct) => void;
}

export const FeaturedApps: React.FC<FeaturedAppsProps> = ({ apps, onSelectApp }) => {
  const [filter, setFilter] = useState<'All' | 'Live' | 'Upcoming'>('All');

  const filteredApps = apps.filter((app) => {
    if (filter === 'All') return true;
    if (filter === 'Live') return app.status === 'Live';
    if (filter === 'Upcoming') return app.status === 'Coming Soon';
    return true;
  });

  return (
    <section id="apps" className="py-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2.5 flex items-center gap-2">
              <span>01 &middot; THE STUDIO SUITE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              <span>APP SHOWCASE & R&amp;D</span>
            </div>
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight">
              Crafted Applications
            </h2>
            <p className="mt-3 text-base sm:text-lg text-secondary max-w-2xl font-normal leading-relaxed">
              Explore Lernex, our live flagship learning tracker, alongside our upcoming studio initiatives exploring distraction-free cognitive ergonomics, spatial reasoning, and sovereign cryptography.
            </p>
          </div>

          {/* Interactive Filter Control: All (6), Live (1), Upcoming (5) */}
          <div 
            role="tablist"
            aria-label="Filter apps by status"
            className="flex items-center gap-1 p-1 bg-surface-subtle rounded-2xl border border-border-subtle self-start md:self-auto shadow-2xs overflow-x-auto max-w-full"
          >
            {(['All', 'Live', 'Upcoming'] as const).map((tab) => {
              const count = tab === 'All' 
                ? apps.length 
                : tab === 'Live'
                ? apps.filter(a => a.status === 'Live').length
                : apps.filter(a => a.status === 'Coming Soon').length;

              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={filter === tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    filter === tab
                      ? 'bg-surface text-primary shadow-xs font-semibold'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  <span>{tab}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                    filter === tab 
                      ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold' 
                      : 'bg-surface-subtle text-muted'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Apps Grid: Reusing exact shape, size, aspect ratio, corner radius, shadow & spacing */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          style={{ perspective: '1400px' }}
        >
          {filteredApps.map((app, index) => {
            const isLive = app.status === 'Live';
            const chips = app.chips || [app.platforms[0], app.platforms[1] || 'Web', 'Native'];

            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, rotateY: 75, y: 36, scale: 0.94 }}
                whileInView={{ opacity: 1, rotateY: 0, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ 
                  duration: 0.68, 
                  delay: (index % 3) * 0.12,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.015,
                  transition: { duration: 0.22, ease: 'easeOut' } 
                }}
                onClick={() => onSelectApp(app)}
                style={{ transformStyle: 'preserve-3d' }}
                className={`card-border group relative flex flex-col justify-between rounded-2xl p-6 sm:p-7
                           bg-surface 
                           border transition-all duration-300 cursor-pointer overflow-hidden
                           ${isLive 
                             ? 'border-blue-500/30 hover:border-blue-500/60 shadow-md hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/70' 
                             : 'border-border-subtle hover:border-amber-500/40 dark:hover:border-amber-500/50 shadow-sm hover:shadow-lg dark:hover:shadow-xl'
                           }`}
              >
                {/* Playing Card Subtle Inset Border */}
                <div className="absolute inset-2 rounded-xl border border-border-subtle/30 pointer-events-none" />

                {/* Card FRONT: Clean, compact, minimal */}
                <div className="relative z-10">
                  {/* Top Header: App icon placeholder (rounded square) + Name + Status badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* App Icon (Rounded Square) */}
                      <div 
                        className="w-11 h-11 rounded-xl flex items-center justify-center font-['Outfit'] font-bold text-lg text-white shadow-xs shrink-0 transition-transform group-hover:scale-105"
                        style={{ backgroundColor: app.accentColor }}
                        aria-label={`${app.name} icon`}
                      >
                        <span>{app.name.includes(':') ? app.name.split(':')[1].trim().charAt(0) : app.name.charAt(0)}</span>
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-primary tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight truncate">
                          {app.name}
                        </h3>
                        <div className="text-[11px] font-mono text-secondary font-medium uppercase tracking-wider flex items-center gap-1.5 truncate">
                          <span className="font-bold" style={{ color: app.accentColor }}>{app.suitPip}</span>
                          <span>{app.category}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    {isLive ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Live</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25 shrink-0">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>Upcoming</span>
                      </span>
                    )}
                  </div>

                  {/* Tagline: Clear, minimal */}
                  <p className="text-sm sm:text-base font-semibold text-primary/95 mt-1 mb-1 leading-snug line-clamp-1">
                    {app.tagline}
                  </p>

                  {/* One-line summary */}
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed line-clamp-2 mb-3.5 font-normal">
                    {app.shortDescription}
                  </p>

                  {/* Small Chips: e.g. Android, Desktop, AI-powered / Upcoming, In R&D */}
                  <div className="flex items-center gap-1.5 flex-wrap mb-4">
                    {chips.map((chip) => (
                      <span 
                        key={chip}
                        className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium border ${
                          chip.toLowerCase().includes('live') || chip.toLowerCase().includes('ai')
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 font-semibold'
                            : chip.toLowerCase().includes('upcoming')
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 font-semibold'
                            : 'bg-surface-subtle text-secondary border-border-subtle'
                        }`}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  {/* Visual Preview Container */}
                  {isLive && app.cardPreviewImage ? (
                    /* Real App Screenshot for Lernex */
                    <div className="h-32 sm:h-36 w-full rounded-xl overflow-hidden border border-border-subtle relative bg-neutral-900/10 dark:bg-neutral-950/40 mb-4 group/preview">
                      <img
                        src={app.cardPreviewImage}
                        alt={`${app.name} interface preview`}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover/preview:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-white/90 drop-shadow-sm">
                        <span className="font-semibold bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">Live Mobile App</span>
                        <span className="bg-emerald-600/80 px-1.5 py-0.5 rounded text-[9px] uppercase font-bold">Verified</span>
                      </div>
                    </div>
                  ) : (
                    /* Curated Ace Labs Upcoming Studio Blueprint (No fake mockups!) */
                    <div className="h-32 sm:h-36 w-full rounded-xl overflow-hidden border border-border-subtle relative bg-surface-subtle p-3.5 flex flex-col justify-between mb-4 group/preview transition-colors group-hover:border-amber-500/30">
                      {/* Blueprint Grid Lines Pattern */}
                      <div 
                        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] pointer-events-none"
                        style={{
                          backgroundImage: `radial-gradient(${app.accentColor} 1px, transparent 1px)`,
                          backgroundSize: '12px 12px'
                        }}
                      />
                      
                      {/* Top Header of Blueprint */}
                      <div className="relative z-10 flex items-center justify-between text-[9.5px] font-mono text-secondary">
                        <span className="uppercase tracking-wider font-semibold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: app.accentColor }} />
                          <span>ACE R&amp;D SPECIFICATION</span>
                        </span>
                        <span className="font-bold text-primary">{app.rank}{app.suitPip}</span>
                      </div>

                      {/* Vision / Thesis Statement inside the card */}
                      <div className="relative z-10 my-auto py-1">
                        <div className="text-[11px] sm:text-xs font-semibold text-primary/90 italic leading-snug line-clamp-2">
                          "{app.tagline}"
                        </div>
                        <div className="text-[9.5px] font-mono text-muted mt-1">
                          Non-negotiable baseline: Zero telemetry &middot; 100% on-device
                        </div>
                      </div>

                      {/* Bottom Blueprint Footer */}
                      <div className="relative z-10 pt-2 border-t border-border-subtle/80 flex items-center justify-between text-[9.5px] font-mono text-secondary">
                        <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>In Conceptual R&amp;D</span>
                        </span>
                        <span className="text-muted">Ace Labs Studio</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer: Version & Action Button */}
                <div className="relative z-10 pt-3 border-t border-border-subtle flex items-center justify-between text-xs mt-auto">
                  <div className="text-[11px] font-mono text-muted flex items-center gap-1.5">
                    <span 
                      className="w-1.5 h-1.5 rounded-full" 
                      style={{ backgroundColor: app.accentColor }} 
                    />
                    <span>{app.version}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectApp(app);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95 ${
                      isLive 
                        ? 'bg-surface-subtle group-hover:bg-primary group-hover:text-surface text-primary border-border-subtle' 
                        : 'bg-surface-subtle hover:bg-amber-500/10 text-primary border-border-subtle group-hover:border-amber-500/40'
                    }`}
                  >
                    <span>{isLive ? 'View Details' : 'Explore Vision'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedApps;
