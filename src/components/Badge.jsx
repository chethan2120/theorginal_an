import React from 'react';

export default function Badge({ text }) {
  if (!text) return null;

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#0B1325]/90 text-[#DFBF77] border border-[#C5A059]/40 backdrop-blur-md shadow-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mr-1.5 animate-pulse" />
      {text}
    </span>
  );
}
