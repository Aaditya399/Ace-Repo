import { StudioPrinciple, RoadmapChapter } from '../types';

export const STUDIO_PRINCIPLES: StudioPrinciple[] = [
  {
    number: '01',
    title: 'The Top Card',
    tagline: 'Always build what leads, never what mimics',
    description: 'In a deck of cards, the Ace stands alone at the pinnacle. It is the card of highest leverage. We do not chase crowded micro-trends or clone existing utilities. Every app under Ace Labs must redefine its category or offer an unmistakably superior standard of craft.',
    suitSymbol: '♠'
  },
  {
    number: '02',
    title: 'Zero Latency To Flow',
    tagline: 'Speed is the prerequisite for clear thinking',
    description: 'Software that lags breaks human concentration. We build our tools with native performance, instantaneous keyboard shortcuts, and local-first databases so your thoughts move faster than your fingers.',
    suitSymbol: '♣'
  },
  {
    number: '03',
    title: 'Absolute Data Sovereignty',
    tagline: 'Your mind belongs to you, not an advertising server',
    description: 'We believe modern software has traded user dignity for engagement metrics. Ace Labs operates with zero surveillance trackers, zero analytics cookies, and local-first encryption where you own your raw files.',
    suitSymbol: '♥'
  },
  {
    number: '04',
    title: 'Playing Card Ergonomics',
    tagline: 'Discrete, tactile, and finite by design',
    description: 'Infinite feeds breed fatigue. We design our software around finite physical analogies: compact decks, tactile cards, and clear completion states that let you finish your work and step away with peace of mind.',
    suitSymbol: '♦'
  }
];

export const ROADMAP_CHAPTERS: RoadmapChapter[] = [
  {
    era: 'Chapter I',
    title: 'Ace Labs (Solo Product Studio)',
    timeline: '2025 – Present',
    description: 'An independent product studio founded by a solo engineer-designer. Prototyping, launching, and refining a suite of 5 focused daily driver apps (Focus, Canvas, Flow, Reader, Vault).',
    status: 'Current',
    milestones: [
      'Launch Ace Focus v2 & Ace Canvas',
      'Deploy on-device local sync architecture',
      'Establish sustainable direct-to-consumer software revenue'
    ]
  },
  {
    era: 'Chapter II',
    title: 'Ecosystem Interoperability',
    timeline: '2027',
    description: 'Connecting individual Ace apps into a seamless, unified local-first workstation where notes, focus blocks, telemetry, and security passkeys share an open cryptographic protocol.',
    status: 'Upcoming',
    milestones: [
      'Universal Ace Card Protocol (.ace file standard)',
      'Cross-app keyboard command center',
      'Peer-to-peer decentralized sync mesh'
    ]
  },
  {
    era: 'Chapter III',
    title: 'Ace Foundation (Long-term Vision)',
    timeline: '2028 and Beyond',
    description: 'The parent identity: a non-profit patron foundation dedicated to protecting digital dignity, funding open-source local-first software, and building independent computing tools for future generations.',
    status: 'Vision',
    milestones: [
      'Transition core protocols into public goods trust',
      'Grant funding for sovereign software research',
      'Enduring 100-year digital preservation vault'
    ]
  }
];
