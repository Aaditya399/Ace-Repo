import React from 'react';

interface LogoProps {
  className?: string;
  showIcon?: boolean;
  onClick?: () => void;
}

/**
 * Ace Labs Brand Logo Component
 * ------------------------------
 * This is the single replaceable logo component for Ace Labs.
 * When the final custom brand mark is ready, edit or replace this file.
 */
export const Logo: React.FC<LogoProps> = ({ className = '', showIcon = true, onClick }) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`inline-flex items-center gap-2.5 font-display font-semibold tracking-tight text-primary transition-opacity hover:opacity-90 select-none whitespace-nowrap shrink-0 group ${className}`}
      aria-label="Ace Labs Home"
    >
      {showIcon && (
        <span 
          className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:rotate-[-4deg]"
          aria-hidden="true"
        >
          {/* Subtle playing card spade emblem */}
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C9.5 6 6 9.8 6 13.8C6 17.2 8.7 20 12 20C15.3 20 18 17.2 18 13.8C18 9.8 14.5 6 12 2Z" />
            <path d="M10.5 19H13.5L14 22H10L10.5 19Z" />
          </svg>
          {/* Subtle micro card pip corner in the logo */}
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-blue-500 opacity-80" />
        </span>
      )}
      <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
        Ace Labs
      </span>
    </a>
  );
};

export default Logo;
