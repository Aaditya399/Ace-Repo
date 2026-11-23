import { JournalPost } from '../types';

export const JOURNAL_POSTS: JournalPost[] = [
  {
    id: 'post-1',
    slug: 'why-we-build-software-as-decks',
    title: 'Why we build software as discrete cards instead of endless feeds',
    date: 'October 18, 2026',
    readTime: '4 min read',
    category: 'Design',
    excerpt: 'How the physical ergonomics of playing cards solve cognitive overwhelm in digital tools.',
    content: [
      'Look at any modern productivity app: endless vertical backlogs, infinite kanban boards, cascading dropdown menus. They are designed as bottomless pits that continuously demand your attention.',
      'When we founded Ace Labs, we asked: what is the opposite of an infinite feed? The answer was right in our pockets: a deck of playing cards.',
      'A playing card has fixed borders. You can only hold so many in your hand at once. You can deal three cards for a morning sprint, lay them flat on your table, turn them over when finished, and physically feel the satisfaction of clearing your hand.',
      'In Lernex and our upcoming studio initiatives, we brought this mental model into software. Instead of looking at 80 uncompleted tasks, you see discrete tactile cards. When you finish them, your sprint is done. No guilt, no endless scrolling.'
    ]
  },
  {
    id: 'post-2',
    slug: 'crafting-zero-latency-audio-and-mechanics',
    title: 'Audio Worklets & Zero-Latency Mechanics: The Ace Engineering Baseline',
    date: 'September 24, 2026',
    readTime: '6 min read',
    category: 'Engineering',
    excerpt: 'A technical deep-dive into how we eliminate audio buffer stutter and engineer sub-1ms key mechanics.',
    content: [
      'Standard web sound generators often use naive browser Web Audio loops. While functional, switching soundscapes introduces a perceptible 80-120ms stutter that breaks focus.',
      'For our upcoming audio enclaves, we prototype all audio synthesis cores using WebAssembly and AudioWorklet nodes running on isolated high-priority threads. Audio transitions crossfade instantaneously with zero hitch.',
      'We also audit every single keyboard interaction across Lernex and our upcoming software. Triggering a study review or focus sprint dispatches in under 1.2ms—faster than a single display refresh frame on a 120Hz ProMotion panel.'
    ]
  },
  {
    id: 'post-3',
    slug: 'the-road-to-ace-foundation',
    title: 'The road to Ace Foundation: From solo studio to self-sustaining software lab',
    date: 'August 12, 2026',
    readTime: '5 min read',
    category: 'Vision',
    excerpt: 'The long-term roadmap behind Ace Labs and why we are structuring the company to transition into a perpetual trust.',
    content: [
      'Too many wonderful software tools get acquired by conglomerates only to be stripped for parts, stuffed with ad trackers, or shut down three years later.',
      'Ace Labs was intentionally incorporated to prevent this cycle. We operate as a high-margin, debt-free solo studio led by Aaditya Acharya. We do not have venture capital investors demanding hyper-growth at the expense of user trust.',
      'Our 5-year charter establishes the path toward "Ace Foundation"—a permanent patron entity that will hold the copyrights and open-source licenses of all Ace software, guaranteeing they remain private and available for decades to come.'
    ]
  },
  {
    id: 'post-4',
    slug: 'local-first-encryption-standards',
    title: 'Offline-First and Local Encryption: Our non-negotiable engineering baseline',
    date: 'June 30, 2026',
    readTime: '5 min read',
    category: 'Engineering',
    excerpt: 'Why every app we ship must work flawlessly without WiFi and protect user records with client-derived keys.',
    content: [
      'If an app stops working when your airplane takes off, it is not an app; it is a glorified remote website.',
      'Every tool we craft at Ace Labs begins with an offline-first architecture. SQLite and indexed on-device stores are the source of truth; network synchronization is an optional secondary convenience.',
      'In Lernex and our upcoming sovereign vaults, all data written to disk is encrypted with keys generated from your hardware enclave. Even if company servers were seized, nobody could read your personal learning notes or telemetry.'
    ]
  }
];
