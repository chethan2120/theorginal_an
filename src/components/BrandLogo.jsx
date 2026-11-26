import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function BrandLogo({ size = 'md', variant = 'horizontal', showTagline = true, theme = 'light' }) {
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (location.pathname !== '/') {
      navigate('/');
    }

    // Re-verify after route switch to ensure we are at top
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 40);
  };

  if (variant === 'mark-only') {
    return (
      <a href="/" onClick={handleLogoClick} className="inline-flex items-center group cursor-pointer">
        <div className="relative overflow-hidden rounded-lg border border-[#C5A059]/60 shadow-sm transition-transform duration-300 group-hover:scale-105 bg-[#070D1E]">
          <img
            src="/images/logo.jpg"
            alt="THE ORIGINAL Crest"
            className={`${size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-16 h-16' : 'w-11 h-11'} object-cover`}
          />
        </div>
      </a>
    );
  }

  return (
    <a href="/" onClick={handleLogoClick} className="inline-flex items-center gap-3 group focus:outline-none cursor-pointer">
      {/* Brand Emblem Logo Image */}
      <div className="relative overflow-hidden rounded-lg border border-[#C5A059]/60 shadow-sm transition-transform duration-300 group-hover:scale-105 flex-shrink-0 bg-[#070D1E]">
        <img
          src="/images/logo.jpg"
          alt="THE ORIGINAL"
          className={`${size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-14 h-14' : 'w-11 h-11'} object-cover`}
        />
      </div>

      {/* Brand Typography - strictly styled with high contrast */}
      <div className="flex flex-col text-left">
        <span
          className={`tracking-[0.24em] font-serif uppercase font-bold transition-colors ${
            isDark
              ? 'text-[#FDFBF7] group-hover:text-[#DFBF77]'
              : 'text-[#070D1E] group-hover:text-[#9A7736]'
          } ${size === 'sm' ? 'text-xs sm:text-sm' : size === 'lg' ? 'text-2xl' : 'text-base sm:text-lg'}`}
          style={{ color: isDark ? '#FDFBF7' : '#070D1E' }}
        >
          THE ORIGINAL
        </span>
        {showTagline && (
          <span
            className="tracking-[0.22em] font-semibold uppercase text-[9px] sm:text-[10px] -mt-0.5"
            style={{ color: '#9A7736' }}
          >
            Royal Spices & Dry Fruits
          </span>
        )}
      </div>
    </a>
  );
}
