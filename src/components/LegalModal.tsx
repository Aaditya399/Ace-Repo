import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-canvas border border-subtle rounded-3xl shadow-2xl p-6 sm:p-10 my-auto max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-subtle">
          <h2 className="font-display text-2xl font-bold text-primary">
            {isPrivacy ? 'Privacy Philosophy & Policy' : 'Terms of Service'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-secondary leading-relaxed">
          {isPrivacy ? (
            <>
              <p className="font-semibold text-primary">
                Last updated: October 2026 &middot; Sovereign Data Standard
              </p>
              <p>
                Ace Labs operates under a simple, non-negotiable principle: <strong>your data belongs exclusively to you</strong>.
              </p>
              <h3 className="font-display font-bold text-base text-primary pt-2">1. Zero Third-Party Telemetry</h3>
              <p>
                We do not integrate Google Analytics, Meta Pixel, Hotjar, Mixpanel, or any surveillance analytics in our software. When you browse this website or use our native apps, your browsing sessions are not fingerprinted or tracked across the web.
              </p>
              <h3 className="font-display font-bold text-base text-primary pt-2">2. Local-First Storage</h3>
              <p>
                All data generated in Ace Focus, Ace Canvas, and Ace Flow is saved directly to your device's local filesystem or indexed database. If you use iCloud or WebRTC peer-to-peer sync, data is transferred directly between your devices with client-side end-to-end encryption.
              </p>
              <h3 className="font-display font-bold text-base text-primary pt-2">3. Direct Correspondence</h3>
              <p>
                If you submit a contact form or join the Ace Dispatch, your email is stored solely to deliver product updates and reply to inquiries. We will never sell, lease, or monetize your contact information.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-primary">
                Last updated: October 2026 &middot; Fair Software Agreement
              </p>
              <p>
                By using Ace Labs software and web applications, you agree to these fair terms.
              </p>
              <h3 className="font-display font-bold text-base text-primary pt-2">1. Software Craft & Provision</h3>
              <p>
                Ace Labs crafts original software products. While we build to the highest technical standards of stability and security, our software is provided "as is" without warranty of continuous operation.
              </p>
              <h3 className="font-display font-bold text-base text-primary pt-2">2. Intellectual Property</h3>
              <p>
                The branding, visual identity, playing card metaphors, and source code of Ace Labs are protected by international copyright. Individual open-source components released under the Ace Foundation charter will be explicitly licensed on GitHub.
              </p>
              <h3 className="font-display font-bold text-base text-primary pt-2">3. Fair Use</h3>
              <p>
                You agree not to reverse engineer, disrupt network endpoints, or attempt unauthorized circumvention of security mechanisms within Ace Vault or companion tools.
              </p>
            </>
          )}
        </div>

        <div className="pt-6 mt-6 border-t border-subtle flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-neutral-900 dark:bg-white dark:text-neutral-950 rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
