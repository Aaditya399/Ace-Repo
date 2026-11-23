import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection = 'developer' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Developer', id: 'developer', isSpecial: true },
    { label: 'Apps', id: 'apps' },
    { label: 'Philosophy', id: 'philosophy' },
    { label: 'About', id: 'about' },
    { label: 'Journal', id: 'journal' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-30 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-2xs'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark (single element) */}
          <div className="flex items-center gap-4">
            <Logo onClick={() => onNavigate('developer')} />
          </div>

          {/* Zone 2: Concise navigation links with high contrast */}
          <nav 
            className="hidden md:flex items-center gap-6 text-sm font-semibold"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
                  activeSection === link.id
                    ? 'text-neutral-950 dark:text-white border-b-2 border-blue-600 dark:border-blue-400 font-bold'
                    : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {link.isSpecial && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold">
                    ♠ Founder
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action (+ Theme toggle) */}
          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle className="hidden sm:inline-flex" />
            
            <button
              onClick={() => handleLinkClick('apps')}
              className="px-4 py-2 text-xs font-bold text-white bg-neutral-900 hover:bg-black dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
            >
              Explore Apps
            </button>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white rounded-lg"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-20 md:hidden bg-white dark:bg-[#09090b] border-b border-neutral-200 dark:border-neutral-800 px-6 py-6 shadow-xl animate-in fade-in duration-150">
          <nav className="flex flex-col gap-4 text-base font-semibold">
            {navLinks.map((link, idx) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left py-2 text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-neutral-400 font-mono">0{idx + 1}</span>
              </button>
            ))}

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-500">Theme</span>
              <ThemeToggle />
            </div>

            <button
              onClick={() => handleLinkClick('apps')}
              className="mt-2 w-full py-2.5 text-center text-sm font-bold text-white bg-neutral-900 hover:bg-black dark:bg-white dark:text-neutral-950 rounded-xl"
            >
              Explore All Apps
            </button>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
