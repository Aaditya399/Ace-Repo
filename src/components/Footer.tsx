import React from 'react';
import Logo from './Logo';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegal }) => {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#09090b] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-200 dark:border-neutral-800">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Logo onClick={() => onNavigate('hero')} />
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm">
              Independent studio building focused, high-standard digital products that lead.
              Parent identity: <strong className="text-neutral-900 dark:text-white font-semibold">Ace Foundation</strong>.
            </p>
            <div className="text-xs text-neutral-500 font-mono">
              Designed & engineered by a solo founder &middot; Operating globally.
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
              NAVIGATION
            </div>
            <ul className="space-y-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('apps')}
                  className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  Featured Apps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('philosophy')}
                  className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  Why "Ace"
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  Founder & Roadmap
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('developer')}
                  className="hover:text-black dark:hover:text-white transition-colors cursor-pointer text-blue-600 dark:text-blue-400 font-bold"
                >
                  Developer Profile & Media &rarr;
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  Open Journal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Dispatch
                </button>
              </li>
            </ul>
          </div>

          {/* Socials & Ecosystem */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
              ECOSYSTEM & CHANNELS
            </div>
            <ul className="space-y-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
              <li>
                <a
                  href="https://github.com/Aaditya399"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span>GitHub (@Aaditya399)</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/aaditya-acharya-6798793b0?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span>LinkedIn (Aaditya Acharya)</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/990Aaditya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span>X / Twitter (@990Aaditya)</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/aadityaa.with?obrf=NjBidHkyd2J2NWpu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Instagram (@aadityaa.with)</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/share/1E47XX4ZPu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Facebook</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li>
                <span className="text-neutral-500 font-mono text-[11px]">
                  Protocol: Local-First Open Standard (.ace)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quiet Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <div>
            &copy; {new Date().getFullYear()} Ace Labs. All rights reserved.
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
              Top Card Standard
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
