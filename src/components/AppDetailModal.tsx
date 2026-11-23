import React, { useState, useEffect } from 'react';
import { AppProduct } from '../types';
import { 
  X, 
  ArrowLeft, 
  ExternalLink, 
  Download, 
  Share2, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Check,
  Shield,
  Zap,
  Sparkles,
  Smartphone,
  Monitor,
  Layers,
  Brain,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface AppDetailModalProps {
  app: AppProduct | null;
  allApps: AppProduct[];
  onClose: () => void;
  onSelectApp: (app: AppProduct) => void;
  onOpenWaitlist: (appName: string) => void;
}

export const AppDetailModal: React.FC<AppDetailModalProps> = ({
  app,
  allApps,
  onClose,
  onSelectApp,
  onOpenWaitlist,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [screenshotIndex, setScreenshotIndex] = useState<number>(0);

  // Reset screenshot carousel index when app changes
  useEffect(() => {
    setScreenshotIndex(0);
  }, [app?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && screenshots.length > 1) {
        setScreenshotIndex((prev) => (prev + 1) % screenshots.length);
      }
      if (e.key === 'ArrowLeft' && screenshots.length > 1) {
        setScreenshotIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, app]);

  if (!app) return null;

  // Active screenshots list (fallback to defaults if not provided)
  const screenshots = app.screenshots && app.screenshots.length > 0
    ? app.screenshots
    : [
        {
          url: app.heroMockup || '/src/assets/images/app_focus_mockup_1793111270071.jpg',
          alt: `${app.name} Mobile Dashboard Interface`,
          device: 'phone' as const,
          caption: 'Tactile Mobile Interface & Progress'
        },
        {
          url: '/src/assets/images/app_flow_mockup_1793111270487.jpg',
          alt: `${app.name} Active Recall Session`,
          device: 'phone' as const,
          caption: 'Transcript AI Context & Daily Review'
        },
        {
          url: app.heroMockup || '/src/assets/images/app_focus_mockup_1793111270071.jpg',
          alt: `${app.name} Desktop Enclave Workspace`,
          device: 'desktop' as const,
          caption: 'Desktop Workspace with Persistent Sidebar'
        }
      ];

  const activeScreenshot = screenshots[screenshotIndex] || screenshots[0];
  const moreApps = allApps.filter((a) => a.id !== app.id);
  const isRed = app.suit === 'heart' || app.suit === 'diamond';
  const suitColorClass = isRed ? 'text-rose-600 dark:text-rose-400' : 'text-neutral-900 dark:text-sky-300';

  const downloadDestination = app.downloadUrl || app.links.web || 'https://lernex.acelabs.studio/download';
  const learnMoreDestination = app.learnMoreUrl || app.links.web || 'https://lernex.acelabs.studio';

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePrevScreenshot = () => {
    setScreenshotIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const handleNextScreenshot = () => {
    setScreenshotIndex((prev) => (prev + 1) % screenshots.length);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="app-detail-title"
    >
      <div 
        className="relative w-full max-w-4xl bg-surface border border-border-subtle rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Top Bar: Back/Close Controls */}
        <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-md border-b border-border-subtle px-6 py-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-semibold text-secondary hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Apps Grid</span>
          </button>

          {/* Playing Card Header Pip */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-subtle border border-border-subtle text-xs font-mono font-bold">
            <span className="text-primary">{app.rank}</span>
            <span className={suitColorClass}>{app.suitPip}</span>
            <span className="text-primary uppercase tracking-wider">{app.name}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl text-secondary hover:text-primary hover:bg-surface-subtle transition-colors cursor-pointer"
              aria-label="Share link"
              title="Copy link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-secondary hover:text-primary hover:bg-surface-subtle transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 md:p-10 space-y-10">
          {/* Card INSIDE: Header & Short Overview */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* App Icon Placeholder (Rounded Square) */}
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-['Outfit'] font-bold text-2xl text-white shadow-md transition-transform"
                style={{ backgroundColor: app.accentColor }}
                aria-label={`${app.name} icon`}
              >
                <span>{app.name.charAt(0)}</span>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs text-secondary font-mono font-medium">
                  <span className="text-primary">{app.category}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span 
                    className="font-bold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide"
                    style={{ backgroundColor: app.accentSoft, color: app.accentColor }}
                  >
                    {app.status}
                  </span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{app.version}</span>
                </div>
                
                <h1 id="app-detail-title" className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight">
                  {app.name}
                </h1>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-lg sm:text-xl font-semibold text-primary/95 max-w-2xl">
              {app.tagline}
            </p>

            {/* Short overview (max 2 lines) */}
            <p className="text-sm sm:text-base text-secondary leading-relaxed max-w-3xl line-clamp-2">
              {app.shortDescription}
            </p>

            {/* Action Buttons: Live Download vs Upcoming Early Access */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {app.status === 'Live' ? (
                <>
                  <a
                    href={downloadDestination}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 text-xs sm:text-sm font-bold text-white rounded-xl transition-all inline-flex items-center gap-2 shadow-sm hover:opacity-95 active:scale-95"
                    style={{ backgroundColor: app.accentColor }}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download / Get {app.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
                  </a>

                  <a
                    href={learnMoreDestination}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-semibold text-secondary hover:text-primary transition-colors inline-flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>Learn more</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenWaitlist(app.name);
                    }}
                    className="px-6 py-3 text-xs sm:text-sm font-bold text-white rounded-xl transition-all inline-flex items-center gap-2 shadow-sm hover:opacity-95 active:scale-95 cursor-pointer"
                    style={{ backgroundColor: app.accentColor }}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Join Early Research Waitlist</span>
                  </button>

                  <a
                    href="mailto:aadityaacharya399@gmail.com?subject=Inquiry%20about%20Ace%20Labs%20R%26D"
                    className="text-xs sm:text-sm font-semibold text-secondary hover:text-primary transition-colors inline-flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>Discuss with Founder (Aaditya)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Visual Showcase: Live App Screenshots for Lernex VS Studio R&D Specification Sheet for Upcoming */}
          {app.status === 'Live' ? (
            /* Real Screenshots Carousel for Lernex */
            <div className="p-6 sm:p-8 rounded-2xl bg-surface-subtle/80 border border-border-subtle">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-accent flex items-center gap-1.5 mb-1">
                    {activeScreenshot.device === 'phone' ? (
                      <Smartphone className="w-3.5 h-3.5" />
                    ) : (
                      <Monitor className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {activeScreenshot.device === 'phone' ? 'Mobile View' : 'Desktop Window Frame'}
                    </span>
                  </div>
                  <h3 className="font-['Outfit'] text-xl font-bold text-primary">
                    Interactive Preview Carousel
                  </h3>
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevScreenshot}
                    aria-label="Previous screenshot"
                    className="p-2 rounded-xl bg-surface hover:bg-surface-subtle border border-border-subtle text-primary transition-colors cursor-pointer active:scale-95 shadow-2xs"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextScreenshot}
                    aria-label="Next screenshot"
                    className="p-2 rounded-xl bg-surface hover:bg-surface-subtle border border-border-subtle text-primary transition-colors cursor-pointer active:scale-95 shadow-2xs"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Carousel Stage Frame */}
              <div className="flex items-center justify-center py-4">
                {activeScreenshot.device === 'phone' ? (
                  /* Authentic Phone Mockup Frame */
                  <div className="w-full max-w-[280px] sm:max-w-[310px] aspect-[9/18.5] rounded-[38px] p-2.5 bg-neutral-950 border-[3px] border-neutral-700/80 shadow-2xl relative flex flex-col overflow-hidden">
                    {/* Dynamic Island / Notch */}
                    <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 shrink-0 flex items-center justify-end px-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                    </div>

                    {/* Phone Screen with Lazy Loaded Image */}
                    <div className="relative flex-1 rounded-[28px] overflow-hidden bg-neutral-900 border border-neutral-800/80">
                      <img
                        src={activeScreenshot.url}
                        alt={activeScreenshot.alt}
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Home Bar */}
                    <div className="w-28 h-1 bg-white/40 rounded-full mx-auto mt-2 shrink-0" />
                  </div>
                ) : (
                  /* Authentic Desktop Window Frame */
                  <div className="w-full max-w-2xl rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden flex flex-col">
                    {/* Window Chrome Titlebar */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900/90 border-b border-neutral-800">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-rose-500" />
                        <span className="w-3 h-3 rounded-full bg-amber-500" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500" />
                      </div>
                      <div className="flex items-center gap-1.5 px-4 py-1 rounded-md bg-neutral-950/80 border border-neutral-800 text-[11px] font-mono text-neutral-400">
                        <Lock className="w-3 h-3 text-emerald-400" />
                        <span>lernex.acelabs.studio/app</span>
                      </div>
                      <div className="w-12" />
                    </div>

                    {/* Desktop Screen Area */}
                    <div className="aspect-16/10 w-full overflow-hidden relative bg-neutral-900">
                      <img
                        src={activeScreenshot.url}
                        alt={activeScreenshot.alt}
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Carousel Caption & Dot Indicators */}
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border-subtle/80">
                <div className="text-xs font-mono text-secondary">
                  <span className="font-bold text-primary">
                    {String(screenshotIndex + 1).padStart(2, '0')} / {String(screenshots.length).padStart(2, '0')}:
                  </span>{' '}
                  <span>{activeScreenshot.caption || activeScreenshot.alt}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {screenshots.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setScreenshotIndex(idx)}
                      aria-label={`Jump to screenshot ${idx + 1}`}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        screenshotIndex === idx 
                          ? 'w-6 bg-accent' 
                          : 'w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Curated Studio Architecture & Vision Spec Sheet for Upcoming Initiatives */
            <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border-subtle relative overflow-hidden shadow-sm">
              <div 
                className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(${app.accentColor} 1px, transparent 1px)`,
                  backgroundSize: '16px 16px'
                }}
              />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
                <div>
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>ACE LABS R&amp;D SPECIFICATION SHEET</span>
                  </div>
                  <h3 className="font-['Outfit'] text-2xl font-bold text-primary">
                    Initiative Thesis &amp; Architecture
                  </h3>
                </div>

                <div className="flex items-center gap-2 self-start md:self-auto px-3 py-1.5 rounded-xl bg-surface-subtle border border-border-subtle font-mono text-xs text-secondary">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: app.accentColor }} />
                  <span>Rank: {app.rank}{app.suitPip}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span className="font-semibold text-primary">In Concept Phase</span>
                </div>
              </div>

              {/* 3 Non-Negotiable Studio Architecture Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 relative z-10">
                <div className="p-4 rounded-xl bg-surface-subtle border border-border-subtle/80 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-muted uppercase font-bold mb-1">PILLAR 01</div>
                    <div className="font-['Outfit'] font-bold text-sm text-primary mb-1">100% Local-First Engine</div>
                    <p className="text-xs text-secondary leading-relaxed">
                      Zero cloud requirement. The application will operate with absolute speed from on-device indexed stores.
                    </p>
                  </div>
                  <div className="mt-3 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    ✓ Verified Offline
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-subtle border border-border-subtle/80 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-muted uppercase font-bold mb-1">PILLAR 02</div>
                    <div className="font-['Outfit'] font-bold text-sm text-primary mb-1">Zero Telemetry Promise</div>
                    <p className="text-xs text-secondary leading-relaxed">
                      No Google Analytics, no tracking pixels, and no remote behavioral telemetry. Your files remain private.
                    </p>
                  </div>
                  <div className="mt-3 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    ✓ Sovereign Privacy
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-subtle border border-border-subtle/80 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-muted uppercase font-bold mb-1">PILLAR 03</div>
                    <div className="font-['Outfit'] font-bold text-sm text-primary mb-1">Tactile Physics &amp; Haptics</div>
                    <p className="text-xs text-secondary leading-relaxed">
                      Physical spring constants, sub-1ms hotkey response, and discreet playing-card constraints to eliminate cognitive fatigue.
                    </p>
                  </div>
                  <div className="mt-3 text-[10px] font-mono text-blue-600 dark:text-blue-400 font-semibold">
                    ✓ Sub-1ms Latency
                  </div>
                </div>
              </div>

              {/* Transparent Founder Commitment */}
              <div className="p-4 rounded-xl bg-surface-subtle/60 border border-border-subtle relative z-10 flex items-center justify-between gap-4 text-xs">
                <p className="text-secondary leading-relaxed">
                  <strong className="text-primary font-semibold">Note from Aaditya:</strong> This initiative is in active conceptual design at Ace Labs. Rather than publishing empty mockups or half-baked tools, we focus on finishing one masterpiece at a time.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenWaitlist(app.name);
                  }}
                  className="px-4 py-2 rounded-lg bg-primary text-surface font-semibold text-xs whitespace-nowrap cursor-pointer hover:opacity-90 transition-opacity shrink-0"
                >
                  Join Alpha Waitlist
                </button>
              </div>
            </div>
          )}

          {/* Smart AI & Works Everywhere Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* "Smart AI" */}
            <div className="p-6 rounded-2xl bg-surface border border-border-subtle relative overflow-hidden shadow-2xs">
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xs"
                  style={{ backgroundColor: app.accentSoft, color: app.accentColor }}
                >
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent">
                    {app.status === 'Live' ? 'POWERED BY GEMINI' : 'STUDIO AI PHILOSOPHY'}
                  </div>
                  <h3 className="font-['Outfit'] text-lg font-bold text-primary">
                    {app.status === 'Live' ? 'Smart AI' : 'Targeted Intelligence'}
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                {app.smartAi || 'We only introduce AI where it eliminates genuine cognitive friction—such as on-device parsing, synthesis, and active recall. Never generic chatbots or conversational fluff.'}
              </p>
            </div>

            {/* "Works everywhere" */}
            <div className="p-6 rounded-2xl bg-surface border border-border-subtle relative overflow-hidden shadow-2xs">
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                >
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {app.status === 'Live' ? 'RESPONSIVE ARCHITECTURE' : 'CROSS-PLATFORM BASELINE'}
                  </div>
                  <h3 className="font-['Outfit'] text-lg font-bold text-primary">
                    Works Everywhere
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                {app.worksEverywhere || 'Designed for zero-dependency native execution across macOS, iOS, Android, and modern Web browsers with identical keyboard hotkeys.'}
              </p>
            </div>
          </div>

          {/* Key Features (4 to 6 items with small icon and one short line each) */}
          <div>
            <div className="text-xs font-mono font-semibold text-accent uppercase tracking-widest mb-2.5">
              02 &middot; CORE CAPABILITIES
            </div>
            <h3 className="font-['Outfit'] text-2xl font-bold text-primary mb-6">
              Key Features
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {app.features.map((feature, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-surface border border-border-subtle flex items-start gap-3.5 hover:border-border-hover transition-colors shadow-2xs"
                >
                  <div 
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: app.accentSoft, color: app.accentColor }}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-['Outfit'] text-base font-bold text-primary">
                        {feature.title}
                      </h4>
                      {feature.highlight && (
                        <span 
                          className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                          style={{ backgroundColor: app.accentSoft, color: app.accentColor }}
                        >
                          {feature.highlight}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed font-normal">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product FAQ Accordion */}
          <div>
            <div className="text-xs font-mono font-semibold text-accent uppercase tracking-widest mb-2.5">
              03 &middot; CLARITY
            </div>
            <h3 className="font-['Outfit'] text-2xl font-bold text-primary mb-6">
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-3">
              {app.faq.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-border-subtle bg-surface overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-surface-subtle transition-colors cursor-pointer"
                    >
                      <span className="font-['Outfit'] text-sm sm:text-base font-bold text-primary">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-secondary shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-secondary leading-relaxed border-t border-border-subtle">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Small "More from Ace Labs" row linking back to the apps grid */}
          <div className="pt-8 border-t border-border-subtle">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Outfit'] text-lg font-bold text-primary">
                More from Ace Labs
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-accent hover:underline font-mono cursor-pointer"
              >
                View all in Apps Grid &rarr;
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {moreApps.map((other) => (
                <button
                  key={other.id}
                  type="button"
                  onClick={() => {
                    onSelectApp(other);
                  }}
                  className="p-3.5 rounded-xl border border-border-subtle bg-surface hover:border-border-hover transition-all text-left flex flex-col justify-between group cursor-pointer shadow-2xs hover:shadow-xs"
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="font-mono text-[10px] text-muted">
                      {other.rank}{other.suitPip}
                    </span>
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: other.accentColor }} 
                    />
                  </div>
                  <div>
                    <div className="font-['Outfit'] font-bold text-sm text-primary group-hover:text-accent transition-colors line-clamp-1">
                      {other.name}
                    </div>
                    <div className="text-[10px] font-mono text-secondary line-clamp-1">
                      {other.category.split('&')[0].trim()}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetailModal;
