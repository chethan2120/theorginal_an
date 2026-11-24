import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandLogo({ size = 'md', variant = 'horizontal', showTagline = true }) {
  if (variant === 'mark-only') {
    return (
      <Link to="/" className="inline-flex items-center group">
        <div className="relative overflow-hidden rounded-md border border-[#C5A059]/40 shadow-sm transition-transform duration-300 group-hover:scale-105">
          <img
            src="/images/logo.jpg"
            alt="THE ORIGINAL Crest"
            className={`${size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-16 h-16' : 'w-11 h-11'} object-cover`}
          />
        </div>
      </Link>
    );
  }

  return (
    <Link to="/" className="inline-flex items-center gap-3 group focus:outline-none">
      {/* Brand Emblem Logo Image */}
      <div className="relative overflow-hidden rounded border border-[#C5A059]/40 shadow-sm transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
        <img
          src="/images/logo.jpg"
          alt="THE ORIGINAL"
          className={`${size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-14 h-14' : 'w-11 h-11'} object-cover`}
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span className={`tracking-[0.25em] font-serif uppercase font-semibold text-[#0B1325] dark:text-[#FDFBF7] transition-colors group-hover:text-[#C5A059] ${
          size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-lg'
        }`}>
          THE ORIGINAL
        </span>
        {showTagline && (
          <span className={`tracking-[0.22em] text-[#9A7736] font-medium uppercase text-[9px] -mt-0.5 ${
            size === 'sm' ? 'hidden sm:block' : ''
          }`}>
            Royal Spices & Dry Fruits
          </span>
        )}
      </div>
    </Link>
  );
}
