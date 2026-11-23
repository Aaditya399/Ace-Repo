import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight,
  ArrowDown,
  ArrowUpRight, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  Facebook,
  Mail, 
  Sparkles, 
  Code2,
  Layers
} from 'lucide-react';
import { AppProduct } from '../types';

interface DeveloperProfileProps {
  onEnterApps: () => void;
  onIntroActiveChange?: (active: boolean) => void;
  onExploreApp: (appId: string) => void;
  lernexApp?: AppProduct;
}

export const DeveloperProfile: React.FC<DeveloperProfileProps> = ({
  onEnterApps,
  onIntroActiveChange,
  onExploreApp,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);

  // Choreography state:
  // 1. 'spotlight': card pops up centered on a blank canvas for >= 2 seconds
  // 2. 'flipping': card performs smooth 360deg 3D flip while gliding to left box as content staggers in
  // 3. 'settled': card rests in its left-column pixel-width box with crisp portrait hover & zero lag
  const [introStage, setIntroStage] = useState<'spotlight' | 'flipping' | 'settled'>('spotlight');
  const [hasMeasured, setHasMeasured] = useState(false);
  const [introOffset, setIntroOffset] = useState<{ x: number; y: number; scale: number }>({
    x: 0,
    y: 0,
    scale: 1.08
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const developerEmail = 'aadityaacharya399@gmail.com';

  const cardSlotRef = useRef<HTMLDivElement>(null);
  const mountedAtRef = useRef<number>(Date.now());
  const hasScrolledRef = useRef<boolean>(false);
  const hasTriggeredRef = useRef<boolean>(false);
  const triggerTimerRef = useRef<number | null>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  // Respect user reduced-motion preferences
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Measure the card's docked left-column coordinates synchronously before paint
  // so it pops up cleanly in the center of the viewport with zero initial corner flash.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    const el = cardSlotRef.current;
    if (!el) {
      setHasMeasured(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const deltaX = vw / 2 - cardCenterX;
    const deltaY = vh / 2 - cardCenterY;

    const cardArea = Math.max(rect.width * rect.height, 1);
    const oneThirdScreenScale = Math.sqrt((vw * vh) / 3 / cardArea);
    const maxScaleW = (vw * 0.9) / Math.max(rect.width, 1);
    const maxScaleH = (vh * 0.86) / Math.max(rect.height, 1);
    const targetScale = Math.min(Math.max(1.22, oneThirdScreenScale), maxScaleW, maxScaleH);

    setIntroOffset({
      x: deltaX,
      y: deltaY,
      scale: targetScale
    });
    setHasMeasured(true);
  }, []);

  // Run intro flap-open reveal (0-0.95s) -> 1/3-screen spotlight hold (>= 2.1s) -> smooth 3D flip & dock -> settled
  useEffect(() => {
    onIntroActiveChange?.(true);

    const flipTimer = window.setTimeout(() => {
      setIntroStage('flipping');
    }, 3100);

    const settleTimer = window.setTimeout(() => {
      setIntroStage('settled');
      onIntroActiveChange?.(false);
    }, 4100);

    return () => {
      window.clearTimeout(flipTimer);
      window.clearTimeout(settleTimer);
      onIntroActiveChange?.(false);
    };
  }, [onIntroActiveChange]);

  // Scroll-to-end transition listener (armed only after settled so intro stays undisturbed)
  useEffect(() => {
    mountedAtRef.current = Date.now();
    hasScrolledRef.current = false;
    hasTriggeredRef.current = false;

    let rafId: number | null = null;

    const evaluateScroll = () => {
      rafId = null;
      if (hasTriggeredRef.current || introStage !== 'settled') return;

      const scrollTop = window.scrollY;
      if (scrollTop > 80) {
        hasScrolledRef.current = true;
      }

      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const docHeight = document.documentElement.scrollHeight;
      const distanceToBottom = Math.max(0, docHeight - (scrollTop + windowHeight));

      const transitionBand = 260;
      const rawProgress = distanceToBottom < transitionBand
        ? Math.min(1, Math.max(0, 1 - distanceToBottom / transitionBand))
        : 0;

      setScrollProgress(rawProgress);

      if (hasScrolledRef.current && distanceToBottom <= 18) {
        if (triggerTimerRef.current === null) {
          setIsTransitioning(true);
          triggerTimerRef.current = window.setTimeout(() => {
            if (!hasTriggeredRef.current) {
              hasTriggeredRef.current = true;
              onEnterApps();
            }
          }, 240);
        }
      } else {
        if (triggerTimerRef.current !== null) {
          window.clearTimeout(triggerTimerRef.current);
          triggerTimerRef.current = null;
          setIsTransitioning(false);
        }
      }
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(evaluateScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      if (triggerTimerRef.current !== null) window.clearTimeout(triggerTimerRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onEnterApps, introStage]);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(developerEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    }
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      handle: 'in/aaditya-acharya-6798793b0',
      url: 'https://www.linkedin.com/in/aaditya-acharya-6798793b0?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      icon: Linkedin,
      accent: '#0A66C2',
      description: 'Professional engineering background, career updates & Ace Labs milestones'
    },
    {
      name: 'GitHub',
      handle: '@Aaditya399',
      url: 'https://github.com/Aaditya399',
      icon: Github,
      accent: '#24292F',
      description: 'Open-source software instruments, codebases, and architectural experiments'
    },
    {
      name: 'X (Twitter)',
      handle: '@990Aaditya',
      url: 'https://x.com/990Aaditya',
      icon: Twitter,
      accent: '#1D9BF0',
      description: 'Public build logs, software design philosophies, and engineering notes'
    },
    {
      name: 'Instagram',
      handle: '@aadityaa.with',
      url: 'https://www.instagram.com/aadityaa.with?obrf=NjBidHkyd2J2NWpu',
      icon: Instagram,
      accent: '#E4405F',
      description: 'Studio creative moments, workspace rituals & behind-the-scenes life'
    },
    {
      name: 'Facebook',
      handle: 'Aaditya Acharya',
      url: 'https://www.facebook.com/share/1E47XX4ZPu/',
      icon: Facebook,
      accent: '#1877F2',
      description: 'Community connections, personal updates & studio announcements'
    },
    {
      name: 'Email Direct',
      handle: developerEmail,
      url: `mailto:${developerEmail}`,
      icon: Mail,
      accent: '#6366F1',
      description: 'Direct inquiries, architecture collaboration & product feedback'
    }
  ];

  const coreSkills = [
    {
      category: 'Languages & Core',
      skills: ['TypeScript', 'JavaScript (ESNext)', 'Python', 'Kotlin', 'SQL', 'HTML5/CSS3']
    },
    {
      category: 'Frameworks & UI',
      skills: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Canvas API']
    },
    {
      category: 'Architecture & AI',
      skills: ['Gemini AI SDK', 'Local-First Storage', 'SQLite / IndexedDB', 'Zero-Telemetry', 'REST / WebSockets']
    },
    {
      category: 'Studio Craft',
      skills: ['Product Design', 'Tactile Card UX', 'Typography Systems', 'Design Tokens', 'Cross-Platform Responsive']
    }
  ];

  const milestones = [
    {
      year: '2026',
      title: 'Lernex Flagship & Ace Labs Studio Suite',
      description: 'Shipped Lernex—an AI-powered learning and course progress tracker with Gemini transcript comprehension and adaptive study routines. Launched the tactile Ace Labs software showcase.'
    },
    {
      year: '2025',
      title: 'Local-First & Sovereign Software Research',
      description: 'Researched offline storage algorithms, privacy-preserving state synchronisation, and minimal cognitive interfaces.'
    },
    {
      year: '2024',
      title: 'Genesis of Ace Foundation',
      description: 'Drafted the Ace Studio Charter: reject bloated venture-capital backlogs, telemetry, and dark patterns in favour of solo handcrafted digital tools.'
    }
  ];

  const isSpotlight = introStage === 'spotlight';
  const isContentVisible = introStage !== 'spotlight';

  return (
    <div className="min-h-screen bg-canvas text-primary pt-6 pb-20 selection:bg-accent selection:text-white overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Navigation Header Bar & Quick Jump to Apps (Revealed smoothly as card docks) */}
        <motion.div 
          initial={{ opacity: 0, y: -12 }}
          animate={isContentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className={`flex flex-wrap items-center justify-between gap-3 py-4 mb-8 border-b border-border-subtle/80 relative z-10 ${
            isContentVisible ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono text-secondary uppercase tracking-wider">
              Developer Portfolio &middot; Aaditya Acharya
            </span>
          </div>

          <button
            type="button"
            onClick={onEnterApps}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-surface hover:bg-surface-subtle border border-border-subtle text-primary text-xs font-semibold transition-all cursor-pointer shadow-2xs group active:scale-95"
          >
            <span>Enter Ace Labs Apps &amp; Deck</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-blue-600 dark:text-blue-400" />
          </button>
        </motion.div>

        {/* Hero Section: Two-Column Spotlight */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-10 items-start mb-16 relative">
          
          {/* Left Column Slot: Well-proportioned fixed pixel box (~395px-420px on desktop) */}
          <div 
            ref={cardSlotRef}
            style={{
              perspective: '1800px',
              perspectiveOrigin: isSpotlight
                ? `calc(50% + ${introOffset.x}px) calc(50% + ${introOffset.y}px)`
                : '50% 50%'
            }}
            className={`relative w-full lg:w-[395px] xl:w-[420px] lg:shrink-0 ${
              introStage !== 'settled' ? 'z-50' : 'z-10'
            }`}
          >
            {/* Ambient card halo glow (follows card position subtly when settled) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isContentVisible ? { opacity: 0.7 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl blur-xl pointer-events-none" 
              aria-hidden="true"
            />

            {/* Targeted Master Developer Card (div:nth-of-type(2)):
                Enters face-down as an Ace card flap -> Flaps/flips open to 1/3 screen spotlight (>= 2s hold) -> Smooth 3D Flip + Glide into left box */}
            {hasMeasured ? (
              <motion.div
                key="architect-card-actor"
                initial={{
                  opacity: 0,
                  x: introOffset.x,
                  y: introOffset.y + 36,
                  scale: introOffset.scale * 0.46,
                  rotateY: prefersReducedMotion ? 0 : 180,
                  rotateX: prefersReducedMotion ? 0 : 24,
                  rotateZ: prefersReducedMotion ? 0 : -4
                }}
                animate={
                  isSpotlight
                    ? {
                        opacity: [0, 1, 1],
                        x: introOffset.x,
                        y: [introOffset.y + 36, introOffset.y + 10, introOffset.y],
                        scale: [introOffset.scale * 0.46, introOffset.scale * 0.84, introOffset.scale],
                        rotateY: prefersReducedMotion ? 0 : [180, 180, 0],
                        rotateX: prefersReducedMotion ? 0 : [24, 10, 0],
                        rotateZ: prefersReducedMotion ? 0 : [-4, 2, 0]
                      }
                    : {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                        rotateY: prefersReducedMotion ? 0 : 360,
                        rotateX: 0,
                        rotateZ: 0
                      }
                }
                transition={
                  isSpotlight
                    ? { duration: 0.95, times: [0, 0.3, 1], ease: [0.22, 1, 0.36, 1] }
                    : { duration: 0.95, ease: [0.22, 1, 0.36, 1] }
                }
                style={{ transformStyle: 'preserve-3d' }}
                className="relative w-full"
              >
                {/* FRONT FACE OF PLAYING CARD (div:nth-of-type(1)) */}
                <div 
                  style={{ backfaceVisibility: 'hidden' }}
                  className="relative rounded-3xl p-6 sm:p-8 bg-surface border border-border-subtle hover:border-blue-500/45 shadow-xl hover:shadow-2xl dark:shadow-2xl dark:shadow-black/75 overflow-hidden transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1"
                >
                  {/* Subtle inner border line matching card aesthetic */}
                  <div className="absolute inset-2 rounded-2xl border border-border-subtle/40 pointer-events-none" />

                  {/* Corner Card Index: Top-Left */}
                  <div className="absolute top-4 left-4 flex flex-col items-center leading-none pointer-events-none select-none">
                    <span className="font-['Outfit'] font-bold text-sm text-primary">A</span>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">♠</span>
                  </div>

                  {/* Corner Card Index: Bottom-Right */}
                  <div className="absolute bottom-4 right-4 flex flex-col items-center leading-none rotate-180 pointer-events-none select-none opacity-60">
                    <span className="font-['Outfit'] font-bold text-sm text-primary">A</span>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">♠</span>
                  </div>

                  {/* Card Header & Expandable Round Developer Photograph (div:nth-of-type(4)) */}
                  <div className="flex flex-col items-center text-center pt-4 pb-2">
                    <div 
                      className="relative mb-4 cursor-zoom-in"
                      onMouseEnter={() => setIsAvatarHovered(true)}
                      onMouseLeave={() => setIsAvatarHovered(false)}
                      onClick={() => setIsAvatarHovered((prev) => !prev)}
                    >
                      {/* Crisp Round Photo Container: smooth expansion + clean optical zoom with zero pixelation */}
                      <div 
                        className={`rounded-full overflow-hidden shadow-xl border-2 p-1 bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isAvatarHovered
                            ? 'w-44 h-44 sm:w-48 sm:h-48 border-blue-400 shadow-blue-500/25 ring-4 ring-blue-500/15'
                            : 'w-28 h-28 border-blue-500/50'
                        }`}
                      >
                        <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                          <img
                            src="/assets/aistudio/Screenshot_20260917-195238_4e2a1e47.jpg"
                            alt="Aaditya Acharya - Founder & Software Architect"
                            className={`w-full h-full object-cover object-[center_22%] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
                              isAvatarHovered ? 'scale-[1.36]' : 'scale-[1.24]'
                            }`}
                          />
                        </div>
                      </div>
                      {/* Verified Maker Badge */}
                      <div className={`absolute bottom-0 right-0 p-1 bg-surface rounded-full shadow-md border border-border-subtle transition-transform duration-300 ${
                        isAvatarHovered ? 'scale-110' : 'scale-100'
                      }`}>
                        <div className="w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                          ♠
                        </div>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-2">
                      <span>CHIEF ARCHITECT</span>
                      <span>&middot;</span>
                      <span>ACE FOUNDATION</span>
                    </div>

                    <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                      Aaditya Acharya
                    </h1>
                    
                    <p className="text-xs sm:text-sm text-secondary font-medium mt-1.5 max-w-xs mx-auto leading-relaxed">
                      Solo Founder &amp; Product Engineer crafting calm, local-first software instruments.
                    </p>
                  </div>

                  {/* Fast Bio Summary */}
                  <div className="my-5 py-4 border-y border-border-subtle/80 text-xs text-secondary leading-relaxed space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-muted">Role</span>
                      <span className="font-semibold text-primary">Founder &amp; Full-Stack Maker</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-muted">Flagship App</span>
                      <span className="font-semibold text-primary flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Lernex (Live)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-muted">Studio Model</span>
                      <span className="font-semibold text-primary">Solo Craft &middot; 0 Bloat</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-muted">Philosophy</span>
                      <span className="font-semibold text-primary">Local-First &middot; Privacy Vault</span>
                    </div>
                  </div>

                  {/* One-Click Copy Direct Email & Social Media Bar */}
                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="w-full py-2.5 px-4 rounded-xl bg-primary text-surface text-xs font-semibold flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition-all cursor-pointer active:scale-95"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Email Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">Copy {developerEmail}</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${developerEmail}?subject=Hello%20Aaditya%20-%20Ace%20Labs%20Inquiry`}
                      className="w-full py-2 px-4 rounded-xl bg-surface-subtle hover:bg-surface border border-border-subtle text-secondary hover:text-primary text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span>Send Direct Email</span>
                      <ArrowUpRight className="w-3 h-3 text-muted shrink-0" />
                    </a>

                    <div className="pt-1.5 flex items-center justify-center gap-2">
                      {socialLinks.slice(0, 5).map((s) => {
                        const IconComponent = s.icon;
                        return (
                          <a
                            key={s.name}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={s.name}
                            className="p-2 rounded-xl bg-surface-subtle hover:bg-surface border border-border-subtle text-secondary hover:text-primary transition-all hover:-translate-y-0.5 shadow-2xs"
                          >
                            <IconComponent className="w-4 h-4" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* BACK FACE OF PLAYING CARD (Initial flap before unveiling + mid-dock flip) */}
                <div
                  aria-hidden="true"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  className="absolute inset-0 rounded-3xl bg-surface border border-blue-500/40 shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8 pointer-events-none"
                >
                  <div className="absolute inset-3 rounded-2xl border border-blue-500/25 pointer-events-none" />
                  <div className="absolute inset-5 rounded-xl border border-border-subtle/50 pointer-events-none" />
                  <div
                    className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12] pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(#3B82F6 1px, transparent 1px)',
                      backgroundSize: '14px 14px'
                    }}
                  />
                  {/* Corner Pips on Sealed Back Face */}
                  <div className="absolute top-6 left-6 text-xs font-bold text-blue-600/70 dark:text-blue-400/70 select-none">
                    ♠
                  </div>
                  <div className="absolute bottom-6 right-6 text-xs font-bold text-blue-600/70 dark:text-blue-400/70 rotate-180 select-none">
                    ♠
                  </div>

                  <div className="relative z-10 flex flex-col items-center text-center space-y-3.5">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600/15 to-indigo-600/15 border border-blue-500/35 flex items-center justify-center text-4xl font-bold text-blue-600 dark:text-blue-400 shadow-md">
                      ♠
                    </div>
                    <div className="space-y-1">
                      <div className="font-['Outfit'] font-bold text-2xl text-primary tracking-tight">
                        ACE LABS
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-blue-600 dark:text-blue-400 font-semibold">
                        ARCHITECT EDITION
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Invisible initial sizing frame measured synchronously before paint */
              <div className="opacity-0 rounded-3xl p-6 sm:p-8 border border-transparent pointer-events-none">
                <div className="pt-4 pb-2 flex flex-col items-center">
                  <div className="w-28 h-28 mb-4" />
                  <div className="h-5 w-32 mb-2" />
                  <div className="h-9 w-48 mb-2" />
                  <div className="h-10 w-64" />
                </div>
                <div className="my-5 py-4 space-y-2.5">
                  <div className="h-4" /><div className="h-4" /><div className="h-4" /><div className="h-4" />
                </div>
                <div className="space-y-2.5">
                  <div className="h-10" /><div className="h-9" /><div className="h-9" />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Full Story, Mission, & Flagship Feature (Staggers in sequentially as card flips to left) */}
          <div className={`w-full lg:flex-1 lg:min-w-0 space-y-8 relative z-10 ${
            isContentVisible ? 'pointer-events-auto' : 'pointer-events-none'
          }`}>
            {/* Story & Manifesto */}
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 18 }}
                animate={isContentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest"
              >
                <span>01 &middot; THE MAKER MANIFESTO</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 18 }}
                animate={isContentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-['Outfit'] text-3xl sm:text-4xl font-bold text-primary tracking-tight leading-tight"
              >
                Crafting software from the heartwood, not the assembly line.
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 18 }}
                animate={isContentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm sm:text-base text-secondary leading-relaxed font-normal"
              >
                I am <strong className="text-primary font-semibold">Aaditya Acharya</strong>. I create independent software products under the Ace Labs label. I believe modern software has grown unnecessarily complex, loud, and extractive. We are bombarded with notifications, tracking scripts, and multi-layered corporate backlogs that prioritize engagement metrics over actual human utility.
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 18 }}
                animate={isContentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm sm:text-base text-secondary leading-relaxed font-normal"
              >
                At Ace Labs, I take the opposite route: I personally architect every database schema, code every client interaction, render every SVG icon, and write every word of documentation. By eliminating handoff friction between designers, managers, and engineers, every tool emerges cohesive, razor-sharp, and finite.
              </motion.p>
            </div>

            {/* Flagship Highlight Card: Lernex */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isContentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.65, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl bg-surface border border-border-subtle shadow-md relative overflow-hidden"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-['Outfit'] font-bold text-lg shadow-sm shrink-0">
                    L
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-['Outfit'] text-xl font-bold text-primary">
                        Lernex
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Flagship &middot; Live
                      </span>
                    </div>
                    <p className="text-xs text-secondary font-medium truncate">
                      AI-Powered Learning Tracker &amp; Study Milestone Hub
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onExploreApp('lernex')}
                  className="px-3.5 py-1.5 rounded-xl bg-primary text-surface text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
                >
                  <span>Explore Lernex</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-secondary leading-relaxed mb-4">
                Lernex is my flagship product. Built with Gemini transcript-based AI comprehension, adaptive study schedules, and an offline-first private vault, it turns YouTube courses, documentation, and technical lectures into verifiable progress milestones.
              </p>

              {/* Miniature dual screenshot preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="h-28 rounded-xl overflow-hidden border border-border-subtle relative bg-neutral-950/40">
                  <img 
                    src="/assets/aistudio/Screenshot_2026-10-29_230954_bdf35a43.png" 
                    alt="Lernex Desktop Dashboard"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 py-1 px-2 bg-gradient-to-t from-black/80 to-transparent text-[9.5px] font-mono text-neutral-300">
                    Desktop Workspace Hub
                  </div>
                </div>

                <div className="h-28 rounded-xl overflow-hidden border border-border-subtle relative bg-neutral-950/40">
                  <img 
                    src="/assets/aistudio/Screenshot_2026-10-29_233148_6d687a65.png" 
                    alt="Lernex Mobile View"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 py-1 px-2 bg-gradient-to-t from-black/80 to-transparent text-[9.5px] font-mono text-neutral-300">
                    Mobile Habit &amp; Streak Tracker
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Lower Portfolio Sections (Fade in sequentially after the card docks into left column) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isContentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className={isContentVisible ? 'pointer-events-auto relative z-10' : 'pointer-events-none relative z-10'}
        >
          {/* Section 2: All Media & Social Channels Hub */}
          <div className="mb-20 pt-12 border-t border-border-subtle">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1.5">
                  02 &middot; CHANNELS &amp; MEDIA
                </div>
                <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                  Connect With the Developer
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-secondary max-w-md font-normal">
                Find my code repositories, public design thoughts, professional history, and dispatch channels.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-2xl bg-surface border border-border-subtle hover:border-border-hover transition-all duration-200 group flex flex-col justify-between shadow-2xs hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-surface-subtle flex items-center justify-center text-primary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors border border-border-subtle">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>

                      <h3 className="font-['Outfit'] text-base font-bold text-primary mb-0.5">
                        {link.name}
                      </h3>
                      <div className="text-xs font-mono text-accent mb-2">
                        {link.handle}
                      </div>
                      <p className="text-[11px] text-secondary leading-snug line-clamp-2">
                        {link.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border-subtle/60 text-[10px] font-mono text-muted group-hover:text-primary transition-colors flex items-center gap-1">
                      <span>Open {link.name}</span>
                      <span>&rarr;</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Section 3: Technical Skills & Engineering Pillars */}
          <div className="mb-20 pt-12 border-t border-border-subtle">
            <div className="mb-8">
              <div className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1.5">
                03 &middot; TECHNICAL ARSENAL
              </div>
              <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                Software Architecture &amp; Tooling
              </h2>
              <p className="text-xs sm:text-sm text-secondary mt-1 max-w-xl font-normal">
                Specialized in high-performance frontend engineering, AI agent interfaces, and private local-first data systems.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {coreSkills.map((category) => (
                <div 
                  key={category.category}
                  className="p-5 rounded-2xl bg-surface border border-border-subtle shadow-2xs"
                >
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-3 pb-2 border-b border-border-subtle/80 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-blue-500" />
                    <span>{category.category}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-2 py-1 rounded-lg text-xs font-mono bg-surface-subtle text-secondary border border-border-subtle hover:text-primary transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Studio Journey & Milestones */}
          <div className="mb-20 pt-12 border-t border-border-subtle">
            <div className="mb-8">
              <div className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1.5">
                04 &middot; ENGINEERING MILESTONES
              </div>
              <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                Journey &amp; Evolution
              </h2>
            </div>

            <div className="space-y-4">
              {milestones.map((item) => (
                <div 
                  key={item.year}
                  className="p-5 sm:p-6 rounded-2xl bg-surface border border-border-subtle shadow-2xs flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6"
                >
                  <div className="px-3 py-1 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-bold text-sm border border-blue-500/20 shrink-0 self-start">
                    {item.year}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-['Outfit'] text-lg font-bold text-primary">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Direct Dispatch CTA */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-surface to-surface-subtle border border-border-subtle shadow-lg text-center relative overflow-hidden mb-14">
            <div className="max-w-xl mx-auto space-y-4 relative z-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DIRECT ACCESS</span>
              </div>

              <h3 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                Let's talk software, design, or collaboration.
              </h3>

              <p className="text-xs sm:text-sm text-secondary font-normal leading-relaxed">
                Have questions about Lernex, architecture inquiries, or interest in collaborating with an independent software studio? My inbox is always open.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:${developerEmail}?subject=Collaboration%20with%20Aaditya`}
                  className="px-6 py-2.5 rounded-xl bg-primary text-surface text-xs font-bold shadow-sm hover:opacity-95 transition-all inline-flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Aaditya Directly</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-5 py-2.5 rounded-xl bg-surface hover:bg-surface-subtle border border-border-subtle text-primary text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy Address'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Section 6: Scroll-to-End Transition Gate into Main Apps & Studio Tab */}
          <div 
            ref={portalRef}
            className="pt-6 pb-10"
          >
            <div className="relative rounded-3xl p-7 sm:p-9 bg-surface border border-border-subtle shadow-md overflow-hidden text-center">
              <div className="absolute inset-2 rounded-2xl border border-border-subtle/40 pointer-events-none" />
              
              <div className="relative z-10 max-w-lg mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  <Layers className="w-3 h-3" />
                  <span>NEXT TAB &middot; ACE LABS MAIN STUDIO</span>
                </div>

                <h3 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-primary tracking-tight">
                  {isTransitioning
                    ? 'Entering Ace Labs Apps & Card Deck...'
                    : 'Keep scrolling to enter the Apps Showcase'}
                </h3>

                <p className="text-xs text-secondary leading-relaxed">
                  Explore <strong className="text-primary">Lernex</strong> in the interactive Ace Deck alongside upcoming local-first initiatives, studio philosophy, and open journal.
                </p>

                {/* Live Scroll Transition Progress Track */}
                <div className="max-w-xs mx-auto pt-1 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-secondary">
                    <span className="flex items-center gap-1">
                      <ArrowDown className="w-3 h-3 text-blue-500 animate-bounce" />
                      <span>{isTransitioning ? 'Transitioning...' : 'Scroll down to switch tab'}</span>
                    </span>
                    <span className="font-bold text-primary">{Math.round(scrollProgress * 100)}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-150 rounded-full"
                      style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      hasTriggeredRef.current = true;
                      onEnterApps();
                    }}
                    className="px-6 py-2.5 rounded-xl bg-primary text-surface text-xs font-bold inline-flex items-center gap-2 shadow-sm hover:opacity-95 transition-all cursor-pointer active:scale-95"
                  >
                    <span>Open Apps &amp; Studio Showcase Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Blank canvas backdrop shown purely during the initial >=2s card spotlight */}
      <AnimatePresence>
        {isSpotlight && (
          <motion.div
            key="blank-intro-backdrop"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-canvas pointer-events-auto"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeveloperProfile;
