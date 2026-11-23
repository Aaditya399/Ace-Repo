import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { AppProduct } from '../types';
import { 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  Sliders
} from 'lucide-react';

interface CardDeckVisualProps {
  apps: AppProduct[];
  onSelectApp: (app: AppProduct) => void;
}

export const CardDeckVisual: React.FC<CardDeckVisualProps> = ({ apps, onSelectApp }) => {
  // Order apps so Lernex is naturally in the middle with apps on both sides
  const lernexApp = apps.find(a => a.id === 'lernex') || apps[0];
  const otherApps = apps.filter(a => a.id !== 'lernex');
  
  // Distribute half of other apps to the left and half to the right
  const leftApps = otherApps.slice(0, Math.ceil(otherApps.length / 2));
  const rightApps = otherApps.slice(Math.ceil(otherApps.length / 2));

  // Structured deck list with Lernex right in the middle
  const deckCards: AppProduct[] = [
    ...leftApps,
    lernexApp,
    ...rightApps
  ];

  // The index of Lernex in this arranged deck
  const lernexIndex = deckCards.findIndex(a => a.id === 'lernex');

  const [activeIndex, setActiveIndex] = useState<number>(lernexIndex >= 0 ? lernexIndex : 0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Responsive device width tracking
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  // Live viewport visibility and scroll tracking state
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [viewportVisibility, setViewportVisibility] = useState<number>(1); // 0.0 to 1.0
  const [scrollSpread, setScrollSpread] = useState<number>(1); // 0.0 to 1.0
  const [manualScrub, setManualScrub] = useState<number | null>(null); // Interactive scrollbar override (0 to 1)
  const [mouseTilt, setMouseTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Responsive resize tracking
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Preload images
  useEffect(() => {
    const imgUrl = lernexApp?.cardPreviewImage || lernexApp?.heroMockup;
    if (imgUrl) {
      const img = new Image();
      img.src = imgUrl;
    }
  }, [lernexApp]);

  // LIVE SCROLL TRACKING WITH 40% VIEWPORT VISIBILITY THRESHOLD:
  // If the cards are visible below 40% (0.4) on the user's screen and descending towards 0%,
  // the cards close themselves according to the descending percentage (visibleRatio / 0.4).
  // Vice versa, as the screen appears and visibility rises from 0% towards 40%, they open smoothly.
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const stageEl = stageRef.current || containerRef.current;
        if (!stageEl) return;

        const rect = stageEl.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // Calculate visible vertical height of the card deck in the viewport
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(windowHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        // Visibility ratio from 0.0 (0%) to 1.0 (100%)
        const visibleRatio = rect.height > 0 ? Math.min(1, Math.max(0, visibleHeight / rect.height)) : 1;
        setViewportVisibility(visibleRatio);

        // Threshold: 40% (0.4)
        // When visibleRatio >= 0.4: cards are fully open (1.0)
        // When visibleRatio < 0.4: cards close down from 1.0 -> 0.0 proportionally
        const spread = visibleRatio >= 0.4 ? 1.0 : Math.max(0, visibleRatio / 0.4);
        setScrollSpread(spread);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Initial evaluation on mount

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Compute live effective fan expansion (0 = tucked behind front card, 1 = fully fanned out)
  const effectiveExpansion = manualScrub !== null 
    ? manualScrub 
    : isHovered 
    ? 1.0 
    : scrollSpread;

  const isFullyTucked = effectiveExpansion < 0.08;

  // Live mouse movement tracking over the deck stage for physical 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMouseTilt({
      x: (x - 0.5) * 2,
      y: (y - 0.5) * 2
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseTilt({ x: 0, y: 0 });
    setManualScrub(null);
  };

  // Wheel handling: scrolling while cursor is over the deck can cycle
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 20) {
      if (e.deltaX > 0) handleNext();
      else handlePrev();
    }
  };

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % deckCards.length);
  }, [deckCards.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + deckCards.length) % deckCards.length);
  }, [deckCards.length]);

  const handleReDeal = () => {
    setManualScrub(0);
    setTimeout(() => {
      setManualScrub(1);
      setTimeout(() => setManualScrub(null), 700);
    }, 220);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 35) handleNext();
    else if (diff < -35) handlePrev();
    setTouchStartX(null);
  };

  const activeApp = deckCards[activeIndex] || deckCards[0];

  // Dynamic responsive breakpoint geometry
  const isSmallMobile = windowWidth < 400;
  const isMediumMobile = windowWidth >= 400 && windowWidth < 640;
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // Responsive lateral fan offsets:
  // Ensures on any mobile device (320px to 480px), side cards peek in clearly and are fully visible!
  let step1X = 165;
  let step2X = 305;
  if (isSmallMobile) {
    step1X = 70;
    step2X = 120;
  } else if (isMediumMobile) {
    step1X = 94;
    step2X = 165;
  } else if (isTablet) {
    step1X = 135;
    step2X = 245;
  }

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-5xl mx-auto py-0.5 sm:py-1 select-none flex flex-col justify-center overflow-hidden"
      role="region"
      aria-label="Ace Labs Hand of Cards Carousel"
    >
      {/* Deck Controls Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 px-1 sm:px-2 mb-1.5 sm:mb-2.5 text-xs">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            isHovered 
              ? 'bg-emerald-500 animate-pulse' 
              : isFullyTucked 
              ? 'bg-amber-500' 
              : 'bg-blue-600 dark:bg-blue-400'
          }`} />
          <span className="font-mono text-secondary font-semibold uppercase tracking-wider text-[10px] sm:text-[11px]">
            THE ACE DECK &middot; {deckCards.length} APPS
          </span>
          <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            Lernex In Front
          </span>
        </div>

        {/* Live Deck Scrollbar & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Deck Fan Scrollbar Tracker / Scrubber */}
          <div 
            className="flex items-center gap-1.5 sm:gap-2 px-2 py-0.5 sm:py-1 rounded-lg bg-surface border border-border-subtle/80 shadow-2xs group cursor-pointer"
            title="Live Deck Scrollbar: Hover or scroll to fan cards out and tuck behind front card"
          >
            <Sliders className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-secondary group-hover:text-blue-500 transition-colors" />
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center justify-between text-[8.5px] sm:text-[9.5px] font-mono text-secondary leading-none w-20 sm:w-32">
                <span className="truncate">
                  {isFullyTucked 
                    ? 'Tucked' 
                    : isHovered 
                    ? 'Hover' 
                    : viewportVisibility < 0.4 
                    ? `Close (${Math.round(viewportVisibility * 100)}%)` 
                    : 'Fanned'}
                </span>
                <span className="font-semibold text-primary">{Math.round(effectiveExpansion * 100)}%</span>
              </div>
              {/* Interactive Scrub Track */}
              <div 
                className="relative w-20 sm:w-32 h-1 sm:h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden cursor-ew-resize"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickFactor = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
                  setManualScrub(clickFactor);
                }}
              >
                <div 
                  className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-150 rounded-full"
                  style={{ width: `${Math.round(effectiveExpansion * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Actions: Shuffle + Nav */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleReDeal}
              title="Shuffle & re-deal cards"
              className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-surface border border-border-subtle hover:border-border-hover text-[10px] sm:text-[11px] font-mono text-secondary hover:text-primary transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <RotateCcw className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-500" />
              <span className="hidden sm:inline">Shuffle</span>
            </button>

            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous card in hand"
              className="p-1 sm:p-1.5 rounded-lg bg-surface border border-border-subtle hover:border-border-hover text-secondary hover:text-primary transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next card in hand"
              className="p-1 sm:p-1.5 rounded-lg bg-surface border border-border-subtle hover:border-border-hover text-secondary hover:text-primary transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 
        Hand of Cards Carousel Stage (CSS Selector Target)
        - Mobile-optimized: height and lateral card spread ensure neighboring cards are cleanly visible!
        - Touch swipe left/right enabled.
      */}
      <div 
        ref={stageRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
        className="relative h-[325px] xs:h-[345px] sm:h-[370px] md:h-[405px] w-full flex items-center justify-center overflow-visible touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {deckCards.map((card, index) => {
          // Circular offset around activeIndex
          let offset = index - activeIndex;
          const half = Math.floor(deckCards.length / 2);
          while (offset > half) offset -= deckCards.length;
          while (offset < -half) offset += deckCards.length;

          const isCenter = offset === 0;
          const absOffset = Math.abs(offset);

          // Only render visible hand range (-2 to +2)
          if (absOffset > 2) return null;

          // Responsive rotation angle:
          // Slightly gentler on mobile so text on peeking neighbor cards remains legible
          const targetRotate = prefersReducedMotion 
            ? 0 
            : offset === 0 
            ? 0 
            : isMobile 
            ? (offset > 0 ? 4.5 + (absOffset - 1) * 2.5 : -4.5 - (absOffset - 1) * 2.5)
            : (offset > 0 ? 6 + (absOffset - 1) * 4.5 : -6 - (absOffset - 1) * 4.5);

          const targetX = offset === 0 
            ? 0 
            : offset > 0 
            ? (offset === 1 ? step1X : step2X)
            : (offset === -1 ? -step1X : -step2X);

          const targetY = isCenter 
            ? 0 
            : isMobile 
            ? (absOffset === 1 ? 8 : 16) 
            : (absOffset === 1 ? 12 : 24);

          const targetScale = isCenter 
            ? 1.0 
            : isMobile 
            ? (absOffset === 1 ? 0.88 : 0.76)
            : (absOffset === 1 ? 0.90 : 0.81);

          const targetOpacity = isCenter 
            ? 1 
            : isMobile 
            ? (absOffset === 1 ? 0.92 : 0.65)
            : (absOffset === 1 ? 0.92 : 0.70);

          // LIVE SPREAD INTERPOLATION:
          const spread = effectiveExpansion;

          const currentX = isCenter 
            ? 0 
            : targetX * spread + (1 - spread) * (offset * (isMobile ? 1.5 : 2.5));

          const currentY = isCenter 
            ? (isHovered && !isMobile ? -4 : 0) 
            : targetY * spread + (1 - spread) * (absOffset * (isMobile ? 1 : 2));

          const currentRotate = isCenter 
            ? (isHovered && !prefersReducedMotion && !isMobile ? mouseTilt.x * 2 : 0)
            : targetRotate * spread + (1 - spread) * (offset * 0.6) + (isHovered && !prefersReducedMotion && !isMobile ? mouseTilt.x * 1.5 : 0);

          const currentScale = isCenter 
            ? (isHovered && !isMobile ? 1.015 : 1.0)
            : (0.93 - absOffset * 0.02) + (targetScale - (0.93 - absOffset * 0.02)) * spread;

          const currentOpacity = isCenter 
            ? 1 
            : targetOpacity * Math.pow(spread, 1.25);

          const zIndex = isCenter 
            ? 40 
            : 40 - absOffset * 10;

          const isExpanding = spread > 0.5;
          const isScrollTracking = !isHovered && manualScrub === null;
          const delay = prefersReducedMotion 
            ? 0 
            : isCenter 
            ? 0 
            : isScrollTracking 
            ? 0 
            : isExpanding 
            ? absOffset * 0.04 
            : (2 - absOffset) * 0.03;

          const chips = card.chips || [card.platforms[0], card.platforms[1] || 'Web', 'Native'];

          return (
            <motion.div
              key={card.id}
              initial={{
                x: 0,
                y: 0,
                rotate: 0,
                scale: 0.94,
                opacity: isCenter ? 1 : 0
              }}
              animate={{
                x: currentX,
                y: currentY,
                scale: currentScale,
                rotate: currentRotate,
                opacity: currentOpacity,
                zIndex
              }}
              whileHover={
                isCenter 
                  ? { y: -6, scale: 1.015, transition: { duration: 0.22 } }
                  : spread > 0.3 
                  ? { y: currentY - 4, scale: currentScale + 0.02, transition: { duration: 0.22 } }
                  : {}
              }
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 26,
                mass: 0.8,
                delay
              }}
              onClick={() => {
                if (!isCenter && spread > 0.15) {
                  setActiveIndex(index);
                }
              }}
              style={{
                transformOrigin: 'bottom center',
                zIndex,
                pointerEvents: isCenter ? 'auto' : spread > 0.15 ? 'auto' : 'none'
              }}
              className={`absolute top-0.5 sm:top-1 
                         w-[205px] xs:w-[225px] sm:w-[255px] md:w-[285px] 
                         h-[305px] xs:h-[325px] sm:h-[355px] md:h-[390px]
                         rounded-xl sm:rounded-2xl p-3 xs:p-3.5 sm:p-4 md:p-5 flex flex-col justify-between
                         bg-surface border transition-colors duration-200
                         ${isCenter 
                           ? 'border-border-subtle hover:border-blue-500/50 shadow-lg sm:shadow-xl dark:shadow-2xl dark:shadow-black/75 cursor-default' 
                           : 'border-border-subtle/80 shadow-md hover:border-border-hover cursor-pointer'
                         } overflow-hidden`}
              role="group"
              aria-label={`${card.name} card`}
              aria-current={isCenter ? 'true' : undefined}
            >
              {/* Playing Card Subtle Inner Border Line */}
              <div className="absolute inset-1 sm:inset-1.5 rounded-lg sm:rounded-xl border border-border-subtle/40 pointer-events-none" />

              {/* Card Corner Index: Top-Left (App Initial + Suit Pip) */}
              <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col items-center leading-none pointer-events-none select-none z-20">
                <span className="font-['Outfit'] font-bold text-[9.5px] sm:text-[11px] text-primary">
                  {card.name.charAt(0)}
                </span>
                <span 
                  className="text-[8px] sm:text-[9px] font-bold mt-0.5"
                  style={{ color: card.accentColor }}
                >
                  {card.suitPip}
                </span>
              </div>

              {/* Card Corner Index: Bottom-Right Inverted */}
              <div className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 flex flex-col items-center leading-none rotate-180 pointer-events-none select-none z-20 opacity-70">
                <span className="font-['Outfit'] font-bold text-[9.5px] sm:text-[11px] text-primary">
                  {card.name.charAt(0)}
                </span>
                <span 
                  className="text-[8px] sm:text-[9px] font-bold mt-0.5"
                  style={{ color: card.accentColor }}
                >
                  {card.suitPip}
                </span>
              </div>

              {/* CENTER CARD: Full Front Profile (Lernex) */}
              {isCenter ? (
                <div className="relative z-10 flex flex-col justify-between h-full pt-0.5">
                  <div>
                    {/* Top Row: App Icon + Name + Status */}
                    <div className="flex items-start justify-between gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 pl-3.5 sm:pl-4">
                      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                        {/* App Icon (Rounded Square) */}
                        <div 
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-['Outfit'] font-bold text-xs sm:text-sm text-white shadow-xs shrink-0"
                          style={{ backgroundColor: card.accentColor }}
                          aria-label={`${card.name} icon`}
                        >
                          <span>{card.name.charAt(0)}</span>
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-['Outfit'] text-base sm:text-lg md:text-xl font-bold text-primary tracking-tight leading-tight truncate">
                            {card.name}
                          </h3>
                          <div className="text-[8px] sm:text-[9px] font-mono text-secondary font-medium uppercase tracking-wider truncate">
                            {card.category.split('&')[0].trim()}
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span className={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider shrink-0 ${
                        card.status === 'Live'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25'
                      }`}>
                        {card.status === 'Live' ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Live</span>
                          </>
                        ) : (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span>Upcoming</span>
                          </>
                        )}
                      </span>
                    </div>

                    {/* Tagline */}
                    <p className="text-[11px] sm:text-xs font-semibold text-primary/95 mb-0.5 sm:mb-1 leading-snug line-clamp-1">
                      {card.tagline}
                    </p>

                    {/* One-Line Summary */}
                    <p className="text-[10px] sm:text-[11px] text-secondary leading-snug line-clamp-2 mb-1.5 sm:mb-2 font-normal">
                      {card.shortDescription}
                    </p>

                    {/* Platform Chips */}
                    <div className="flex items-center gap-1 flex-wrap mb-1.5 sm:mb-2">
                      {chips.slice(0, isSmallMobile ? 2 : 3).map((chip) => (
                        <span 
                          key={chip}
                          className={`px-1 sm:px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-mono font-medium border ${
                            chip.toLowerCase().includes('ai') || chip.toLowerCase().includes('live')
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
                    {card.status === 'Live' && card.cardPreviewImage ? (
                      /* Small App Preview Image for Live Lernex (Cropped without distortion) */
                      <div className="h-18 xs:h-20 sm:h-22 md:h-24 w-full rounded-lg overflow-hidden border border-border-subtle relative bg-neutral-900/10 dark:bg-neutral-950/40">
                        <img
                          src={card.cardPreviewImage}
                          alt={`${card.name} preview`}
                          loading="eager"
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                      </div>
                    ) : (
                      /* Curated Ace Labs Upcoming Studio Blueprint Spec Box */
                      <div className="h-18 xs:h-20 sm:h-22 md:h-24 w-full rounded-lg overflow-hidden border border-border-subtle relative bg-surface-subtle p-2 flex flex-col justify-between">
                        <div 
                          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] pointer-events-none"
                          style={{
                            backgroundImage: `radial-gradient(${card.accentColor} 1px, transparent 1px)`,
                            backgroundSize: '10px 10px'
                          }}
                        />
                        <div className="relative z-10 flex items-center justify-between text-[7.5px] sm:text-[8px] font-mono text-secondary">
                          <span className="font-semibold uppercase tracking-wider flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: card.accentColor }} />
                            <span>ACE R&amp;D SPEC</span>
                          </span>
                          <span className="font-bold text-primary">{card.rank}{card.suitPip}</span>
                        </div>
                        <div className="relative z-10 text-[8.5px] sm:text-[9.5px] font-semibold text-primary/90 italic line-clamp-1">
                          "{card.tagline}"
                        </div>
                        <div className="relative z-10 text-[7px] sm:text-[7.5px] font-mono text-secondary flex items-center justify-between">
                          <span className="text-amber-600 dark:text-amber-400 font-semibold">In Conceptual R&amp;D</span>
                          <span className="text-muted">Zero Telemetry</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Version & View Details / Explore Vision Button */}
                  <div className="pt-1.5 sm:pt-2 border-t border-border-subtle flex items-center justify-between text-xs mt-auto">
                    <span className="text-[9px] sm:text-[10px] font-mono text-muted">
                      {card.version}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectApp(card);
                      }}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-primary text-surface text-[10.5px] sm:text-xs font-semibold flex items-center gap-1 shadow-2xs hover:opacity-90 transition-all cursor-pointer active:scale-95"
                    >
                      <span>{card.status === 'Live' ? 'Details' : 'Vision'}</span>
                      <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </button>
                  </div>
                </div>
              ) : (
                /* SIDE CARDS: Clean, focused preview with peek visibility on mobile */
                <div className="relative z-10 flex flex-col justify-between h-full pt-0.5">
                  <div>
                    {/* Top Row: App Icon + Status */}
                    <div className="flex items-start justify-between gap-1.5 mb-2 sm:mb-2.5 pl-3.5 sm:pl-4">
                      <div 
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-['Outfit'] font-bold text-xs sm:text-sm text-white shadow-xs shrink-0"
                        style={{ backgroundColor: card.accentColor }}
                      >
                        <span>{card.name.includes(':') ? card.name.split(':')[1].trim().charAt(0) : card.name.charAt(0)}</span>
                      </div>

                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[7.5px] sm:text-[8.5px] font-mono font-bold uppercase tracking-wider shrink-0 ${
                        card.status === 'Live'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25'
                      }`}>
                        {card.status === 'Live' ? 'Live' : 'Upcoming'}
                      </span>
                    </div>


                    <div className="mb-1 sm:mb-1.5">
                      <h3 className="font-['Outfit'] text-sm sm:text-base md:text-lg font-bold text-primary tracking-tight leading-tight truncate">
                        {card.name}
                      </h3>
                      <div className="text-[8px] sm:text-[9px] font-mono text-secondary uppercase tracking-wider truncate">
                        {card.category.split('&')[0].trim()}
                      </div>
                    </div>

                    <p className="text-[10px] sm:text-[11px] text-secondary leading-snug line-clamp-2 sm:line-clamp-3 font-normal mt-1">
                      {card.tagline}
                    </p>
                  </div>

                  <div className="pt-1.5 sm:pt-2 border-t border-border-subtle/80 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-accent">
                    <span>#{String(index + 1).padStart(2, '0')}</span>
                    <span className="font-semibold group-hover:underline">Tap to center &rarr;</span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Dot Indicators & Deck Position Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 mt-1.5 pt-1.5 sm:pt-2 border-t border-border-subtle/60 px-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-[11px] font-mono text-secondary truncate max-w-[260px] sm:max-w-none">
            <strong className="text-primary">{activeApp.name}</strong> &middot; {activeApp.tagline}
          </span>
        </div>

        {/* Dots */}
        <div 
          className="flex items-center gap-1.5"
          role="tablist"
          aria-label="Deck card selector"
        >
          {deckCards.map((card, i) => (
            <button
              key={card.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === i}
              aria-label={`Show ${card.name}`}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeIndex === i 
                  ? 'w-4 sm:w-5 bg-blue-600 dark:bg-blue-400' 
                  : 'w-1.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardDeckVisual;
