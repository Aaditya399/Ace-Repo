import React from 'react';
import CardDeckVisual from './CardDeckVisual';
import { AppProduct } from '../types';
import { Shield, Zap } from 'lucide-react';

interface HeroProps {
  apps: AppProduct[];
  onExploreApps: () => void;
  onOurStory: () => void;
  onSelectApp: (app: AppProduct) => void;
}

export const Hero: React.FC<HeroProps> = ({
  apps,
  onExploreApps,
  onOurStory,
  onSelectApp,
}) => {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between pt-3 pb-3 sm:pt-4 sm:pb-4 md:pt-6 md:pb-5 overflow-hidden">
      {/* Subtle background ambient mesh */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none rounded-full" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative z-10 text-center w-full flex flex-col justify-between flex-1">
        {/* Top Header Group */}
        <div className="pt-1 sm:pt-2">
          {/* Subtle quiet kicker */}
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold tracking-wider uppercase text-neutral-600 dark:text-neutral-400 mb-2">
            <span className="text-blue-600 dark:text-blue-400 text-xs">♠</span>
            <span>INDEPENDENT SOFTWARE STUDIO</span>
            <span aria-hidden="true">&middot;</span>
            <span>ACE FOUNDATION</span>
          </div>

          {/* Main Hero Headline */}
          <h1 
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-neutral-900 dark:text-white max-w-3xl mx-auto leading-[1.12] mb-2"
            style={{ textWrap: 'balance' }}
          >
            We craft the apps that lead.
          </h1>

          {/* Subtitle Value Proposition */}
          <p 
            className="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto mb-3 font-normal leading-relaxed"
            style={{ textWrap: 'balance' }}
          >
            Ace Labs creates focused, local-first software. Each tool is engineered with the tactile poise of a premier card deck.
          </p>

          {/* High-Contrast CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-3">
            <button
              onClick={onExploreApps}
              className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-neutral-900 hover:bg-black dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 rounded-xl transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
            >
              Explore Apps
            </button>
            
            <button
              onClick={onOurStory}
              className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap border border-neutral-300 dark:border-neutral-700 shadow-2xs active:scale-95"
            >
              Our Story & Roadmap
            </button>
          </div>
        </div>

        {/* Hero Interactive Card Fan Stage (Single Screen Fitting) */}
        <div className="w-full flex-1 flex items-center justify-center my-auto">
          <CardDeckVisual apps={apps} onSelectApp={onSelectApp} />
        </div>

        {/* Trust Bar with crisp contrast */}
        <div className="pt-2 pb-1 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-neutral-600 dark:text-neutral-400 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="text-blue-600 dark:text-blue-400">♠</span> Solo Founder Craft
          </span>
          <span aria-hidden="true">&middot;</span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-neutral-500" /> Zero Ad Trackers or Telemetry
          </span>
          <span aria-hidden="true">&middot;</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-neutral-500" /> Local-First Storage
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
