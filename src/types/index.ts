export type AppStatus = 'Live' | 'Beta' | 'Coming Soon' | 'Completed';
export type PlatformType = 'Web' | 'iOS' | 'macOS' | 'Android' | 'iPadOS' | 'watchOS';

export interface AppFeature {
  title: string;
  description: string;
  highlight?: string;
}

export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
}

export interface AppScreenshot {
  url: string;
  alt: string;
  device: 'phone' | 'desktop';
  caption?: string;
}

export interface AppProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  status: AppStatus;
  featured?: boolean;
  category: string;
  suit: 'spade' | 'heart' | 'diamond' | 'club';
  suitPip: string;
  rank: string; // 'A', 'K', 'Q' etc - default 'A'
  accentColor: string;
  accentSoft: string;
  secondaryAccent?: string;
  platforms: PlatformType[];
  chips?: string[];
  cardPreviewImage?: string;
  releaseDate: string;
  version: string;
  heroMockup?: string;
  screenshots?: AppScreenshot[];
  smartAi?: string;
  worksEverywhere?: string;
  downloadUrl?: string;
  learnMoreUrl?: string;
  features: AppFeature[];
  howItWorks: HowItWorksStep[];
  faq: { question: string; answer: string }[];
  links: {
    web?: string;
    appStore?: string;
    googlePlay?: string;
    waitlist?: string;
    testFlight?: string;
    github?: string;
  };
}

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: 'Launch' | 'Engineering' | 'Design' | 'Vision';
  excerpt: string;
  content: string[];
}

export interface StudioPrinciple {
  number: string;
  title: string;
  tagline: string;
  description: string;
  suitSymbol: string;
}

export interface RoadmapChapter {
  era: string;
  title: string;
  timeline: string;
  description: string;
  status: 'Current' | 'Upcoming' | 'Vision';
  milestones: string[];
}
