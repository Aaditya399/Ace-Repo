import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Theme selection"
      className={`inline-flex items-center p-1 rounded-xl bg-neutral-200/80 dark:bg-neutral-800/90 border border-neutral-300 dark:border-neutral-700 ${className}`}
    >
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-pressed={theme === 'light'}
        aria-label="Light mode"
        title="Light mode"
        className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
          theme === 'light'
            ? 'bg-white text-neutral-950 shadow-xs border border-neutral-300/60 font-semibold'
            : 'text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-pressed={theme === 'dark'}
        aria-label="Dark mode"
        title="Dark mode"
        className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
          theme === 'dark'
            ? 'bg-neutral-900 text-white shadow-xs dark:bg-neutral-700 font-semibold'
            : 'text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => setTheme('system')}
        aria-pressed={theme === 'system'}
        aria-label="System theme preference"
        title="System theme preference"
        className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
          theme === 'system'
            ? 'bg-white text-neutral-950 shadow-xs dark:bg-neutral-700 dark:text-white font-semibold'
            : 'text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
        }`}
      >
        <Monitor className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default ThemeToggle;
