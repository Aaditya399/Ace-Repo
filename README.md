# Ace Labs — Studio Gateway & Portfolio

> **"We craft the apps that lead."**  
> An independent product studio run by a solo founder, creating focused, high-standard digital products under the **Ace** brand with the long-term patron vision of **Ace Foundation**.

---

## Table of Contents
1. [Tech Stack & Architecture](#tech-stack--architecture)
2. [Folder Structure](#folder-structure)
3. [Design System & Tokens](#design-system--tokens)
4. [How to Add a New App (Data-Driven)](#how-to-add-a-new-app-data-driven)
5. [How to Customize the Logo, Colors, and Fonts](#how-to-customize-the-logo-colors-and-fonts)
6. [Why Key Decisions Were Made](#why-key-decisions-were-made)
7. [Customization Checklist for Launch](#customization-checklist-for-launch)
8. [Deployment Guide (Vercel & AI Studio)](#deployment-guide-vercel--ai-studio)

---

## Tech Stack & Architecture

- **Framework**: React 19 + TypeScript + Vite (ready for zero-config Next.js port or Vercel static/edge hosting)
- **Styling**: Tailwind CSS v4 with unified CSS custom properties (design tokens in `src/index.css`)
- **Animation**: `motion` (Framer Motion v12) for physics-based card fan, smooth spring lift, and hover transitions
- **Icons**: `lucide-react`
- **SEO & Structured Data**: OpenGraph, Twitter card metadata, and Schema.org JSON-LD for `Organization` and `SoftwareApplication`

---

## Folder Structure

```
├── index.html                   # SEO tags, Google Fonts, JSON-LD schema
├── metadata.json                # AI Studio application metadata
├── package.json                 # Dependencies and build scripts
├── src/
│   ├── App.tsx                  # Main app assembly & hash-based routing
│   ├── index.css                # Design tokens (light/dark variables, card utilities)
│   ├── main.tsx                 # React DOM mount point
│   ├── context/
│   │   └── ThemeContext.tsx     # Light / Dark / System theme provider
│   ├── types/
│   │   └── index.ts             # TypeScript definitions for Apps, Posts, Principles
│   ├── data/
│   │   ├── apps.ts              # Single source of truth for all Ace products
│   │   ├── principles.ts        # "Why Ace" principles & Ace Foundation roadmap
│   │   └── journal.ts           # Studio dispatches, devlogs, and essays
│   ├── components/
│   │   ├── Logo.tsx             # Standalone, easily swappable brand wordmark
│   │   ├── Navbar.tsx           # Sticky minimal 3-zone contract header
│   │   ├── Hero.tsx             # Hero section with headline, value prop, CTAs
│   │   ├── CardDeckVisual.tsx   # Interactive Framer Motion fanned playing cards
│   │   ├── FeaturedApps.tsx     # Filterable playing card app grid
│   │   ├── AppDetailModal.tsx   # Reusable full product showcase page template
│   │   ├── Philosophy.tsx       # "Why Ace" and 4 core studio principles
│   │   ├── About.tsx            # Solo founder origin story & Ace Foundation roadmap
│   │   ├── Journal.tsx          # Open field notes with reading modal
│   │   ├── ContactSection.tsx   # Validated inquiry form, waitlist, newsletter
│   │   ├── Footer.tsx           # Quiet footer with links and legal triggers
│   │   ├── ThemeToggle.tsx      # Accessible light/dark/system mode toggle
│   │   └── LegalModal.tsx       # Privacy Policy & Terms of Service modals
│   └── assets/
│       └── images/              # High-fidelity mockups & visual assets
```

---

## Design System & Tokens

All tokens are defined in **`src/index.css`** using standard CSS variables:

- `--bg-canvas`: Page background (`#fbfbfc` light, `#09090b` dark)
- `--bg-surface`: Card surface (`#ffffff` light, `#121215` dark)
- `--border-subtle`: Hairline card borders (`rgba(15, 23, 42, 0.08)` / `rgba(255, 255, 255, 0.08)`)
- `--text-primary`: Primary reading contrast (`#09090b` / `#fafafa`)
- `--text-secondary`: Subdued prose (`#52525b` / `#a1a1aa`)
- `--text-muted`: Metadata and pips (`#71717a`)
- `--accent`: Royal Cobalt (`#2563eb` / `#3b82f6`)

---

## How to Add a New App (Data-Driven)

You do **not** need to touch any UI components to add a new app. Simply open `src/data/apps.ts` and append a new object to `APPS_DATA`:

```typescript
{
  id: 'ace-notes',
  slug: 'ace-notes',
  name: 'Ace Notes',
  tagline: 'Frictionless capture for fleeting thoughts',
  shortDescription: 'Local-first rapid capture scratchpad with markdown cards.',
  fullDescription: 'Full product overview paragraph goes here...',
  status: 'Beta', // 'Live' | 'Beta' | 'Coming Soon'
  category: 'Writing',
  suit: 'club',   // 'spade' | 'heart' | 'diamond' | 'club'
  suitPip: '♣',
  rank: 'A',
  accentColor: '#10B981',
  accentSoft: 'rgba(16, 185, 129, 0.12)',
  platforms: ['macOS', 'iOS', 'Web'],
  releaseDate: 'January 2027',
  version: 'v0.5-beta',
  features: [
    { title: 'Feature 1', description: 'Explanation here...', highlight: 'Instant' },
  ],
  howItWorks: [
    { step: '01', title: 'Open', description: 'Hit hotkey...' },
  ],
  faq: [
    { question: 'Where is data stored?', answer: 'Locally on device...' }
  ],
  links: {
    web: 'https://notes.acelabs.studio',
    waitlist: '#contact'
  }
}
```

The app will **automatically** appear in:
1. The Hero animated card fan
2. The Featured Apps grid (with status filter)
3. Direct hash routing (`#app-ace-notes`)
4. The reusable App Detail modal with full features, FAQ, and download buttons
5. The "More from Ace Labs" deck browser
6. The Contact / Waitlist dropdown selector

---

## How to Customize the Logo, Colors, and Fonts

### 1. Logo
Open **`src/components/Logo.tsx`**. Replace the inline SVG or wordmark text with your custom SVG mark or vector brand.

### 2. Colors & Accent
Open **`src/index.css`**. Change `--accent` to your desired studio brand color (e.g. Amber `#D97706`, Emerald `#059669`, Violet `#7C3AED`).

### 3. Fonts
In **`index.html`**, change the Google Font import to your preferred typography pairing. Update `font-family` inside `src/index.css`.

---

## Why Key Decisions Were Made

1. **Subtle Playing Card Language Instead of a Casino Theme**:
   - The user requested inspiration from the ace playing card (the top card, highest leverage, the one that leads). We deliberately avoided cartoonish gambling tropes (roulette, poker chips, red felt). Instead, we used card proportions, rank & suit pips (A♠), rounded corners, soft elevation, and a smooth fanned deck interaction.
2. **Zero-Pill Discipline & Anti-Slop**:
   - Metadata is rendered with quiet typographic bullets (`·`) rather than colorful pill capsules, giving the brand a refined, calm, adult feel comparable to high-end consumer hardware and modern design studios.
3. **Data-Driven App Architecture**:
   - Solo founders build multiple apps over time. Hardcoding pages leads to code duplication. By centralizing apps in `src/data/apps.ts`, creating a new product takes 2 minutes and guarantees consistent UI quality.
4. **Offline-First & Local Sovereignty Framing**:
   - Rather than making generic SaaS claims, Ace Labs positions itself on craft, privacy, and speed—the exact values that distinguish independent studios from venture-backed surveillance software.

---

## Customization Checklist for Launch

- [ ] **Custom Domain**: Connect `acelabs.studio` or your chosen domain on Vercel
- [ ] **Logo Asset**: Update `src/components/Logo.tsx` with your final vector logo
- [ ] **Founder Bio**: Update `src/components/About.tsx` with your name, location, and story
- [ ] **Real App Links**: Add your real App Store, Google Play, and Web URLs in `src/data/apps.ts`
- [ ] **Email Receiver**: Connect `ContactSection.tsx` to Formspree, Resend, or your server endpoint
- [ ] **Social Handles**: Update X, GitHub, and Bluesky links in `Footer.tsx` and `ContactSection.tsx`
- [ ] **OpenGraph Image**: Place an `og-image.png` (1200x630px) in `/public`

---

## Deployment Guide (Vercel & AI Studio)

### Vercel Deployment:
1. Push this repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Framework Preset: **Vite** (or Other).
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click **Deploy**.
