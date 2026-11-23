/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { APPS_DATA } from './data/apps';
import { AppProduct } from './types';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedApps from './components/FeaturedApps';
import AppDetailModal from './components/AppDetailModal';
import Philosophy from './components/Philosophy';
import About from './components/About';
import Journal from './components/Journal';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import DeveloperProfile from './components/DeveloperProfile';

function AceLabsApp() {
  const [selectedApp, setSelectedApp] = useState<AppProduct | null>(null);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const [contactAppInterest, setContactAppInterest] = useState<string>('General Studio Inquiry');
  const [activeSection, setActiveSection] = useState<string>('developer');
  const [currentView, setCurrentView] = useState<'developer' | 'home'>('developer');
  const [isDeveloperIntro, setIsDeveloperIntro] = useState<boolean>(true);

  const pendingScrollTargetRef = useRef<string | null>(null);

  // Handle URL Hash navigation and direct app linking (e.g. #developer, #apps, #app-lernex)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');

      if (!hash || hash === 'developer') {
        setIsDeveloperIntro(true);
        setCurrentView('developer');
        setActiveSection('developer');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('app-')) {
        const appSlug = hash.replace('app-', '');
        const matched = APPS_DATA.find((a) => a.slug === appSlug || a.id === appSlug);
        if (matched) {
          setSelectedApp(matched);
        }
      } else if (['apps', 'philosophy', 'about', 'journal', 'contact', 'hero'].includes(hash)) {
        pendingScrollTargetRef.current = hash === 'hero' ? null : hash;
        setIsDeveloperIntro(false);
        setCurrentView('home');
        setActiveSection(hash === 'hero' ? 'apps' : hash);
        if (hash !== 'hero') {
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
              pendingScrollTargetRef.current = null;
            }
          }, 480);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = useCallback((sectionId: string) => {
    if (sectionId === 'developer') {
      pendingScrollTargetRef.current = null;
      setIsDeveloperIntro(true);
      setCurrentView('developer');
      setActiveSection('developer');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '#developer');
      return;
    }

    const isSwitchingView = currentView !== 'home';
    setIsDeveloperIntro(false);
    setCurrentView('home');
    setActiveSection(sectionId === 'hero' ? 'apps' : sectionId);

    if (sectionId === 'hero') {
      pendingScrollTargetRef.current = null;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '#hero');
    } else {
      pendingScrollTargetRef.current = sectionId;
      window.history.pushState(null, '', `#${sectionId}`);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          pendingScrollTargetRef.current = null;
        }
      }, isSwitchingView ? 480 : 60);
    }
  }, [currentView]);

  const handleTransitionFromDeveloperToMain = useCallback(() => {
    pendingScrollTargetRef.current = null;
    setIsDeveloperIntro(false);
    setCurrentView('home');
    setActiveSection('apps');
    window.history.pushState(null, '', '#hero');
  }, []);

  const openAppDetail = (app: AppProduct) => {
    setSelectedApp(app);
    window.history.pushState(null, '', `#app-${app.slug}`);
  };

  const closeAppDetail = () => {
    setSelectedApp(null);
    window.history.pushState(null, '', currentView === 'developer' ? '#developer' : '#apps');
  };

  const handleOpenWaitlist = (appName: string) => {
    setContactAppInterest(`${appName} Waitlist`);
    navigateTo('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-primary selection:bg-accent selection:text-white">
      {/* Sticky Minimal Navbar */}
      <Navbar onNavigate={navigateTo} activeSection={activeSection} />

      {/* Main Content Area: Developer Portfolio First -> Smooth Transition into Apps & Studio */}
      <main className={`flex-1 ${currentView === 'developer' && isDeveloperIntro ? 'relative z-50' : ''}`}>
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            if (pendingScrollTargetRef.current) {
              const target = document.getElementById(pendingScrollTargetRef.current);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                pendingScrollTargetRef.current = null;
                return;
              }
            }
            window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
          }}
        >
          {currentView === 'developer' ? (
            <motion.div
              key="developer-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            >
              <DeveloperProfile
                onEnterApps={handleTransitionFromDeveloperToMain}
                onIntroActiveChange={setIsDeveloperIntro}
                onExploreApp={(slugOrId) => {
                  const matched = APPS_DATA.find((a) => a.slug === slugOrId || a.id === slugOrId);
                  if (matched) {
                    openAppDetail(matched);
                  } else {
                    navigateTo('apps');
                  }
                }}
                lernexApp={APPS_DATA.find((a) => a.id === 'lernex')}
              />
            </motion.div>
          ) : (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* 1. Hero with Animated Playing Card Deck Fan */}
              <Hero
                apps={APPS_DATA}
                onExploreApps={() => navigateTo('apps')}
                onOurStory={() => navigateTo('about')}
                onSelectApp={openAppDetail}
              />

              {/* 2. Featured Apps (Data-driven showcase with playing card language) */}
              <FeaturedApps apps={APPS_DATA} onSelectApp={openAppDetail} />

              {/* 3. Philosophy / Why Ace (Top card, velocity, sovereign craft) */}
              <Philosophy />

              {/* 4. About (Solo Founder story & Ace Foundation roadmap with direct Developer link) */}
              <About onNavigateToDeveloper={() => navigateTo('developer')} />

              {/* 5. Open Journal & News (Engineering field notes and updates) */}
              <Journal />

              {/* 6. Contact & Waitlist (Interactive form + email newsletter) */}
              <ContactSection
                apps={APPS_DATA}
                preselectedApp={contactAppInterest}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Quiet Footer shown on Main Studio view */}
      {currentView === 'home' && (
        <Footer
          onNavigate={navigateTo}
          onOpenLegal={(type) => setLegalModal(type)}
        />
      )}

      {/* Card Inside Detail Modal (Accessible globally from any view) */}
      <AppDetailModal
        app={selectedApp}
        allApps={APPS_DATA}
        onClose={closeAppDetail}
        onSelectApp={openAppDetail}
        onOpenWaitlist={handleOpenWaitlist}
      />

      {/* Legal & Privacy Policy Modal */}
      <LegalModal
        type={legalModal}
        onClose={() => setLegalModal(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AceLabsApp />
    </ThemeProvider>
  );
}
