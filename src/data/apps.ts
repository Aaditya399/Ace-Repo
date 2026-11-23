import { AppProduct } from '../types';

export const APPS_DATA: AppProduct[] = [
  {
    id: 'lernex',
    slug: 'lernex',
    name: 'Lernex',
    tagline: 'Learn smarter. Track every step.',
    shortDescription: 'An AI-powered learning tracker that turns your courses and videos into clear progress.',
    fullDescription: 'An AI-powered learning tracker that turns your courses, documentation, and video lectures into clear tangible progress. Built with transcript-based AI comprehension, adaptive study schedules, and an offline-first private vault.',
    status: 'Live',
    featured: true,
    category: 'Learning & Cognitive Mastery',
    suit: 'spade',
    suitPip: '♠',
    rank: 'A',
    accentColor: '#6366F1', // Soft indigo
    secondaryAccent: '#14B8A6', // Teal
    accentSoft: 'rgba(99, 102, 241, 0.12)',
    platforms: ['Android', 'macOS', 'Web', 'iPadOS'],
    chips: ['Android', 'Desktop', 'AI-powered'],
    cardPreviewImage: '/assets/aistudio/Screenshot_2026-10-29_233148_6d687a65.png',
    releaseDate: 'October 2026',
    version: 'v1.2 (Live)',
    heroMockup: '/assets/aistudio/Screenshot_2026-10-29_230954_bdf35a43.png',
    smartAi: 'Transcript-based AI help powered by Gemini for instant lecture summaries, conceptual flashcards, and timestamped explanations.',
    worksEverywhere: 'Adaptive layout with an ergonomic persistent sidebar on desktop and tactile thumb navigation on mobile.',
    downloadUrl: 'https://lernex.acelabs.studio/download',
    learnMoreUrl: 'https://lernex.acelabs.studio',
    screenshots: [
      {
        url: '/assets/aistudio/Screenshot_2026-10-29_233148_6d687a65.png',
        alt: 'Lernex Mobile: Course Checkpoints, Daily Goals & Study Streak',
        device: 'phone',
        caption: 'Lernex Mobile: Daily Goals & Video Milestones'
      },
      {
        url: '/assets/aistudio/Screenshot_2026-10-29_233212_8286799e.png',
        alt: 'Lernex Mobile: Habit Growth Tree & Session Sign In',
        device: 'phone',
        caption: 'Session Growth Tree: Every session you finish grows the tree'
      },
      {
        url: '/assets/aistudio/Screenshot_2026-10-29_230954_bdf35a43.png',
        alt: 'Lernex Desktop Workspace: Daily Milestones, Course Hub & Habit Streak',
        device: 'desktop',
        caption: 'Lernex Desktop Workspace: Daily Milestones & Course Hub'
      },
      {
        url: '/assets/aistudio/Screenshot_2026-10-29_230910_46287ae8.png',
        alt: 'Lernex Desktop: Onboarding & Account Hub',
        device: 'desktop',
        caption: 'Desktop Workspace: Onboarding & Account Overview'
      }
    ],
    features: [
      {
        title: 'Course & Video Progress',
        description: 'Auto-logs video lecture checkpoints, technical docs, and syllabus milestones into intuitive progress graphs.',
        highlight: 'Progress Tracker'
      },
      {
        title: 'Transcript-Based Gemini AI',
        description: 'Directly queries video transcripts to extract core principles, solve complex problems, and summarize lectures.',
        highlight: 'Gemini Powered'
      },
      {
        title: 'Smart Spaced Retention',
        description: 'Dynamic decay curve presents flashcards and active recall sprints at the exact psychological moment before forgetting.',
        highlight: 'Optimal Memory'
      },
      {
        title: 'Works Everywhere',
        description: 'Adaptive layout: expansive multi-column sidebar on desktop and thumb-first gesture navigation on mobile.',
        highlight: 'Multi-Device'
      },
      {
        title: 'Local Privacy Vault',
        description: 'All lecture notes, syllabus checklists, and learning streaks remain on your local device with zero cloud tracking.',
        highlight: '100% Private'
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Import Course or Video',
        description: 'Paste any lecture link, course syllabus, or document to immediately generate connected progress checkpoints.'
      },
      {
        step: '02',
        title: 'Ask Gemini from Transcripts',
        description: 'Use the integrated Gemini AI to inspect tricky concepts right at the exact video timestamp.'
      },
      {
        step: '03',
        title: 'Master through Spaced Recall',
        description: 'Complete 3-minute tactile daily reviews calibrated to your personal memory decay curve.'
      }
    ],
    faq: [
      {
        question: 'How does Lernex track video and course progress?',
        answer: 'Lernex connects directly with video lecture timestamps and course curricula, breaking lessons down into atomic verifiable steps so you always know where you left off.'
      },
      {
        question: 'What makes the Gemini transcript AI unique?',
        answer: 'Instead of generic chat, the AI understands the exact video lecture transcript and slide context, generating contextual practice questions and immediate clarifications.'
      },
      {
        question: 'Does Lernex work on mobile and desktop?',
        answer: 'Yes! Lernex adapts fluidly: a full desktop experience with persistent toolbars and sidebars, and a clean, thumb-friendly mobile interface for on-the-go review.'
      }
    ],
    links: {
      web: 'https://lernex.acelabs.studio',
      appStore: 'https://apps.apple.com/app/lernex',
      googlePlay: 'https://play.google.com/store/apps/details?id=studio.acelabs.lernex',
      testFlight: undefined,
      waitlist: undefined
    }
  },
  {
    id: 'upcoming-focus',
    slug: 'upcoming-focus',
    name: 'Upcoming: Cognitive Flow',
    tagline: 'Deep work rituals without digital friction',
    shortDescription: 'An upcoming Ace Labs exploration into distraction shields, physical sprint rituals, and ambient acoustic isolation. In conceptual R&D.',
    fullDescription: 'Our upcoming deep work enclave explores the ergonomics of dealing yourself a physical 3-card hand per session instead of drowning in infinite task feeds. Currently in active conceptual R&D at Ace Labs.',
    status: 'Coming Soon',
    category: 'Productivity & Mind',
    suit: 'spade',
    suitPip: '♠',
    rank: '2',
    accentColor: '#3B82F6', // Blue
    accentSoft: 'rgba(59, 130, 246, 0.12)',
    platforms: ['macOS', 'iOS', 'Web'],
    chips: ['Upcoming', 'In R&D', 'Vision'],
    releaseDate: 'In Studio R&D',
    version: 'Conceptual Spec',
    features: [
      {
        title: 'Tactile Hand Dealing',
        description: 'Restricting human working memory to 3 physical-feeling sprint cards to banish list anxiety.',
        highlight: 'Core Thesis'
      },
      {
        title: 'Acoustic Enclave',
        description: 'Binaural tape hiss, losslessly sampled rainfall, and zero-latency synthesis loops.',
        highlight: 'Audio Spec'
      },
      {
        title: 'Zero-Telemetry Core',
        description: 'No accounts, no remote server sync, and zero metrics collected on how you think.',
        highlight: 'Sovereign'
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Concept & Problem Formulation',
        description: 'Analyzing why modern task apps increase anxiety rather than protecting deep maker focus.'
      },
      {
        step: '02',
        title: 'Hardware & Interaction Prototyping',
        description: 'Designing physical hotkeys and sub-1ms audio worklets before assembling UI layers.'
      },
      {
        step: '03',
        title: 'Private Founder Beta',
        description: 'Testing internally with select independent software architects and writers.'
      }
    ],
    faq: [
      {
        question: 'When will this app be released?',
        answer: 'Ace Labs crafts software with patient restraint. We finish and polish one instrument at a time rather than rushing unverified software to market.'
      },
      {
        question: 'How can I get early access when ready?',
        answer: 'You can join the early research waitlist to receive private build releases as soon as alpha testing commences.'
      }
    ],
    links: {
      waitlist: '#contact'
    }
  },
  {
    id: 'upcoming-canvas',
    slug: 'upcoming-canvas',
    name: 'Upcoming: Spatial Thinking',
    tagline: 'Infinite thought architecture for independent builders',
    shortDescription: 'An upcoming Ace Labs workspace exploring non-linear research mapping, magnetic card decks, and zero-latency spatial reasoning.',
    fullDescription: 'Thoughts do not naturally exist in rigid vertical file trees. This planned spatial workspace will allow complex ideas, architectural schematics, and raw code to be organized into fannable, magnetic card decks.',
    status: 'Coming Soon',
    category: 'Spatial Creativity',
    suit: 'club',
    suitPip: '♣',
    rank: '3',
    accentColor: '#10B981', // Emerald
    accentSoft: 'rgba(16, 185, 129, 0.12)',
    platforms: ['macOS', 'Web', 'iPadOS'],
    chips: ['Upcoming', 'In R&D', 'Vision'],
    releaseDate: 'In Studio R&D',
    version: 'Conceptual Spec',
    features: [
      {
        title: 'Magnetic Card Stacking',
        description: 'Cards automatically cluster into compact physical decks with spring-loaded fanning physics.',
        highlight: 'Spatial UI'
      },
      {
        title: 'Sub-Millisecond Canvas Engine',
        description: 'WebGL-accelerated infinite viewport maintaining 120fps with thousands of concurrent nodes.',
        highlight: 'High Performance'
      },
      {
        title: 'Open File Standard',
        description: 'Stored as human-readable local files on your machine with zero vendor lock-in.',
        highlight: 'Open Storage'
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Spatial Canvas Architecture',
        description: 'Engineering a lightweight canvas renderer that bypasses browser DOM bloat.'
      },
      {
        step: '02',
        title: 'Tactile Gestures & Haptics',
        description: 'Fine-tuning trackpad flick and pinch ergonomics for natural card handling.'
      },
      {
        step: '03',
        title: 'Community Feedback Loop',
        description: 'Incorporating insights from research scientists and system engineers.'
      }
    ],
    faq: [
      {
        question: 'Why build another canvas tool?',
        answer: 'Existing canvas tools are bloated web apps reliant on heavy cloud subscriptions. We are designing a lightweight, offline-first canvas with tactile card deck mechanics.'
      }
    ],
    links: {
      waitlist: '#contact'
    }
  },
  {
    id: 'upcoming-rhythm',
    slug: 'upcoming-rhythm',
    name: 'Upcoming: Personal Rhythm',
    tagline: 'Graceful momentum over punitive habit streaks',
    shortDescription: 'An upcoming Ace Labs on-device telemetry study exploring natural creative energy curves, sleep recovery, and zero-telemetry habit tracking.',
    fullDescription: 'Streaks breed anxiety and guilt. Ace Labs is investigating personal momentum algorithms that embrace human rest cycles, correlating physical stamina with creative output without cloud surveillance.',
    status: 'Coming Soon',
    category: 'Human Rhythm & Health',
    suit: 'heart',
    suitPip: '♥',
    rank: '4',
    accentColor: '#F43F5E', // Rose
    accentSoft: 'rgba(244, 63, 94, 0.12)',
    platforms: ['iOS', 'watchOS', 'Web'],
    chips: ['Upcoming', 'In R&D', 'Vision'],
    releaseDate: 'In Studio R&D',
    version: 'Conceptual Spec',
    features: [
      {
        title: 'Rolling 7-Day Momentum',
        description: 'Replaces all-or-nothing streaks with graceful, forgiving biological momentum curves.',
        highlight: 'Humane Design'
      },
      {
        title: '100% On-Device Enclave',
        description: 'Apple Health and sleep logs are computed entirely within your phone’s secure sandbox.',
        highlight: 'Zero Cloud'
      },
      {
        title: 'Instant Lockscreen Widgets',
        description: 'Log recovery checkpoints in under 300 milliseconds with zero app startup lag.',
        highlight: 'Sub-300ms'
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Circadian Rhythm Modeling',
        description: 'Studying how sleep latency and physical output affect deep cognitive work blocks.'
      },
      {
        step: '02',
        title: 'Zero-Telemetry Cryptography',
        description: 'Ensuring biometric records never touch any remote server or third-party SDK.'
      },
      {
        step: '03',
        title: 'Pilot Testing',
        description: 'Validating momentum curve mathematics with long-distance athletes and makers.'
      }
    ],
    faq: [
      {
        question: 'Is my health data sent anywhere?',
        answer: 'No. Ace Labs guarantees that your telemetry stays strictly on your local hardware device.'
      }
    ],
    links: {
      waitlist: '#contact'
    }
  },
  {
    id: 'upcoming-synthesis',
    slug: 'upcoming-synthesis',
    name: 'Upcoming: Executive Synthesis',
    tagline: 'Distilled signal in a sea of algorithmic noise',
    shortDescription: 'An upcoming Ace Labs research tool distilling long-form literature, papers, and essays into tactile 3-minute executive briefing cards.',
    fullDescription: 'The web is flooded with algorithmic engagement traps. This upcoming project explores on-device extraction engines that extract core theses, supporting arguments, and methodology into clear, typographically calibrated reading cards.',
    status: 'Coming Soon',
    category: 'Information Architecture',
    suit: 'diamond',
    suitPip: '♦',
    rank: '5',
    accentColor: '#F59E0B', // Amber
    accentSoft: 'rgba(245, 158, 11, 0.12)',
    platforms: ['Web', 'macOS', 'iOS'],
    chips: ['Upcoming', 'In R&D', 'Vision'],
    releaseDate: 'In Studio R&D',
    version: 'Conceptual Spec',
    features: [
      {
        title: '3-Minute Card Briefs',
        description: 'Distills complex 40-page papers into structured cards highlighting methodology and takeaways.',
        highlight: 'High Signal'
      },
      {
        title: 'Reading Endurance Typography',
        description: 'Optical line length, calibrated margins, and warm serif contrast designed for deep focus.',
        highlight: 'Optical Comfort'
      },
      {
        title: 'Offline Research Stacks',
        description: 'Downloaded articles convert directly into clean offline Markdown with zero web trackers.',
        highlight: '100% Offline'
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Distillation Heuristics',
        description: 'Refining algorithmic summarization pipelines to preserve nuance without hallucination.'
      },
      {
        step: '02',
        title: 'Typography & Layout Calibration',
        description: 'Designing physical card proportions suited to both mobile screens and desktop monitors.'
      },
      {
        step: '03',
        title: 'Reader Feedback Group',
        description: 'Evaluating comprehension retention with graduate students and operators.'
      }
    ],
    faq: [
      {
        question: 'How does it compare to browser reader mode?',
        answer: 'Browser reader modes only restyle text. Our upcoming tool will parse structure, extract key citations, and package takeaways into discrete fannable cards.'
      }
    ],
    links: {
      waitlist: '#contact'
    }
  },
  {
    id: 'upcoming-vault',
    slug: 'upcoming-vault',
    name: 'Upcoming: Sovereign Vault',
    tagline: 'Zero-knowledge offline hardware security',
    shortDescription: 'An upcoming Ace Labs cryptographic enclave exploring offline physical recovery punch cards, local biometrics, and peer-to-peer sync.',
    fullDescription: 'Investigating high-assurance offline credential vaults that protect private keys, seed phrases, and sensitive notes using client-side Argon2id key derivation and verifiable physical card backups.',
    status: 'Coming Soon',
    category: 'Security & Privacy',
    suit: 'spade',
    suitPip: '♠',
    rank: '6',
    accentColor: '#8B5CF6', // Purple
    accentSoft: 'rgba(139, 92, 246, 0.12)',
    platforms: ['macOS', 'iOS', 'Android'],
    chips: ['Upcoming', 'In R&D', 'Vision'],
    releaseDate: 'In Studio R&D',
    version: 'Conceptual Spec',
    features: [
      {
        title: 'Silicon Enclave Isolation',
        description: 'Decryption keys never touch system RAM and remain protected by on-chip security silicon.',
        highlight: 'Hardware Level'
      },
      {
        title: 'Physical Punch Card Recovery',
        description: 'Generates verifiable physical paper or metal card templates for disaster recovery.',
        highlight: 'Analog Backup'
      },
      {
        title: 'Zero Cloud Footprint',
        description: 'Synchronization runs over direct peer-to-peer encrypted Wi-Fi without central servers.',
        highlight: 'P2P Encrypted'
      }
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Cryptographic Protocol Specification',
        description: 'Formulating audited zero-knowledge schemas and local key derivation pipelines.'
      },
      {
        step: '02',
        title: 'Physical Card Generation',
        description: 'Developing high-entropy punch templates readable with standard optical tools.'
      },
      {
        step: '03',
        title: 'Security Auditing',
        description: 'Subjecting all cryptography code to external penetration and formal verification.'
      }
    ],
    faq: [
      {
        question: 'Will this project be open source?',
        answer: 'Yes. The cryptographic primitives, storage specs, and sync engines will be published on GitHub under open source licenses.'
      }
    ],
    links: {
      waitlist: '#contact'
    }
  }
];
