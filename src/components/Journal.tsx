import React, { useState } from 'react';
import { motion } from 'motion/react';
import { JOURNAL_POSTS } from '../data/journal';
import { JournalPost } from '../types';
import { ArrowUpRight, X, ArrowLeft } from 'lucide-react';

export const Journal: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<JournalPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Design', 'Engineering', 'Vision'];

  const filteredPosts = activeCategory === 'All'
    ? JOURNAL_POSTS
    : JOURNAL_POSTS.filter((p) => p.category === activeCategory);

  return (
    <section id="journal" className="py-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2.5">
              05 &middot; OPEN FIELD NOTES
            </div>
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl font-semibold text-primary tracking-tight">
              Studio Journal
            </h2>
            <p className="mt-3 text-base text-secondary max-w-xl font-normal leading-relaxed">
              Authentic engineering logs, design decisions, and architectural essays published directly from the desk of Ace Labs.
            </p>
          </div>

          {/* Category Tabs */}
          <div 
            role="tablist"
            className="flex items-center gap-1 p-1 bg-surface-subtle rounded-2xl border border-border-subtle self-start md:self-auto shadow-2xs"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-surface text-primary shadow-xs font-semibold'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Posts Grid with Staggered Scroll Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => setSelectedPost(post)}
              className="p-7 sm:p-8 rounded-[24px] bg-surface border border-border-subtle
                         hover:border-border-hover hover:shadow-lg transition-all duration-200
                         flex flex-col justify-between cursor-pointer group relative overflow-hidden"
            >
              {/* Card Inset Line */}
              <div className="absolute inset-2.5 rounded-[18px] border border-border-subtle/50 pointer-events-none transition-colors group-hover:border-border-hover/60" />

              <div className="relative z-10">
                {/* Clean unboxed metadata */}
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-muted mb-4">
                  <span className="text-accent uppercase tracking-wider">{post.category}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.date}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-['Outfit'] text-xl sm:text-2xl font-semibold text-primary group-hover:text-accent transition-colors mb-3 leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-secondary leading-relaxed line-clamp-3 font-normal">
                  {post.excerpt}
                </p>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-border-subtle flex items-center justify-between text-xs font-semibold text-primary">
                <span>Read Dispatch</span>
                <ArrowUpRight className="w-4 h-4 text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Reading Article Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl bg-surface border border-border-subtle rounded-3xl shadow-2xl p-6 sm:p-10 my-auto max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-border-subtle">
              <button
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-xs font-semibold text-secondary hover:text-primary transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Journal</span>
              </button>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-surface-subtle cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted mb-3 font-mono font-semibold">
              <span className="text-accent uppercase tracking-wider">{selectedPost.category}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{selectedPost.date}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-primary mb-6 leading-tight">
              {selectedPost.title}
            </h1>

            <div className="space-y-4 text-sm sm:text-base text-secondary leading-relaxed font-normal">
              {selectedPost.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-8 mt-8 border-t border-border-subtle flex items-center justify-between text-xs text-muted font-mono">
              <span>Published by Ace Labs Studio</span>
              <button
                onClick={() => setSelectedPost(null)}
                className="font-bold text-accent hover:underline cursor-pointer"
              >
                Close Article &times;
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Journal;
