import React, { useState } from 'react';
import { Check, Copy, Send, ArrowUpRight } from 'lucide-react';
import { AppProduct } from '../types';

interface ContactSectionProps {
  apps: AppProduct[];
  preselectedApp?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ apps, preselectedApp = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    appInterest: preselectedApp || 'General Studio Inquiry',
    message: ''
  });

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSubmitted(true);
  };

  const copyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('hello@acelabs.studio');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Banner Strip */}
        <div className="mb-20 p-8 sm:p-10 rounded-3xl bg-neutral-900 text-white dark:bg-[#15151b] border border-neutral-800 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-400 mb-2 uppercase tracking-wider">
              <span>♠</span>
              <span>THE ACE DISPATCH &middot; DIRECT RELEASE CHANNEL</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">
              Get invited to private betas and new app drops.
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              One concise dispatch every quarter. No marketing funnels, zero spam, strictly product launches and beta test slots.
            </p>

            {newsletterSubmitted ? (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-sm font-medium">
                <Check className="w-4 h-4" />
                <span>You are on the private dispatch list. Thank you!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="px-4 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-400 text-sm focus:outline-none focus:border-blue-400 flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-white text-neutral-950 font-bold text-xs rounded-xl hover:bg-neutral-100 transition-colors whitespace-nowrap cursor-pointer shadow-xs"
                >
                  Join Dispatch
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Inquiries */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              06 &middot; DIRECT CORRESPONDENCE
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Talk to the Studio
            </h2>
            <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Have feedback on an app, want early beta access, or exploring a partnership with Ace Labs?
              Every note lands directly in the founder's personal inbox.
            </p>

            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-5">
              <div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mb-1 uppercase tracking-wider font-semibold">
                  DIRECT INBOX
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-neutral-900 dark:text-white font-mono">
                    hello@acelabs.studio
                  </span>
                  <button
                    onClick={copyEmail}
                    className="p-1.5 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors cursor-pointer text-xs flex items-center gap-1 font-mono font-semibold border border-neutral-200 dark:border-neutral-700"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mb-1 uppercase tracking-wider font-semibold">
                  STUDIO MODEL
                </div>
                <div className="text-sm text-neutral-700 dark:text-neutral-300">
                  Independent &middot; Solo Engineer-Led &middot; Distributed globally
                </div>
              </div>

              <div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mb-2 uppercase tracking-wider font-semibold">
                  OFFICIAL CHANNELS
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>X / Twitter</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://bsky.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>Bluesky</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form with strong light mode contrast */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#131317] border border-neutral-300 dark:border-neutral-800 shadow-md relative overflow-hidden">
              {/* Card Inset Line */}
              <div className="absolute inset-2.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 pointer-events-none" />

              <div className="relative z-10">
                {formSubmitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">
                      Message Dispatched
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-sm mx-auto leading-relaxed">
                      Thank you, {formData.name}. Your note regarding {formData.appInterest} was delivered.
                      I read and reply to all genuine messages within 24–48 hours.
                    </p>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          appInterest: 'General Studio Inquiry',
                          message: ''
                        });
                      }}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline pt-4 cursor-pointer"
                    >
                      Send another note &rarr;
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase tracking-wider">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Alex Vance"
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 text-sm focus:outline-none focus:border-blue-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase tracking-wider">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@example.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 text-sm focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase tracking-wider">
                        Subject / App Inquiry
                      </label>
                      <select
                        value={formData.appInterest}
                        onChange={(e) => setFormData({ ...formData, appInterest: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm focus:outline-none focus:border-blue-600 cursor-pointer"
                      >
                        <option value="General Studio Inquiry">General Studio Inquiry</option>
                        {apps.map((app) => (
                          <option key={app.id} value={`${app.name} (${app.status})`}>
                            {app.name} &middot; {app.status} Waitlist & Feedback
                          </option>
                        ))}
                        <option value="Partnership / Press">Partnership / Press</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5 uppercase tracking-wider">
                        Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Share your thoughts, feature requests, or early beta questions..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 text-sm focus:outline-none focus:border-blue-600 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-6 text-sm font-bold text-white bg-neutral-900 hover:bg-black dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message to Ace Labs</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
