"use client";

import { CinematicFooter } from "@/components/ui/motion-footer";

export default function MotionFooterDemo() {
  return (
    <div className="relative w-full bg-[#080D1A] min-h-screen font-sans selection:bg-[#D4AF37]/30 overflow-x-hidden">
      <main className="relative z-10 w-full min-h-[120vh] bg-[#0B1326] flex flex-col items-center justify-center text-white border-b border-[#D4AF37]/20 shadow-2xl rounded-b-3xl px-6 py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(212,175,55,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        <span className="text-[#D4AF37] text-sm uppercase tracking-[0.3em] font-semibold mb-4">
          THE ORIGINAL
        </span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#FBF8F3] mb-6">
          Scroll down to reveal the Cinematic Footer
        </h1>
        <p className="max-w-xl text-slate-300 text-base mb-12">
          Featuring smooth parallax typography, magnetic glass pills, diagonal continuous marquee, and GSAP ScrollTrigger reveal.
        </p>
        
        <div className="w-[1px] h-32 bg-gradient-to-b from-[#D4AF37] to-transparent animate-pulse" />
      </main>

      <CinematicFooter />
    </div>
  );
}
