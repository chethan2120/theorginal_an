"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES FOR THE ORIGINAL
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  
  --pill-bg-1: rgba(20, 29, 47, 0.7);
  --pill-bg-2: rgba(11, 19, 38, 0.9);
  --pill-shadow: rgba(0, 0, 0, 0.4);
  --pill-highlight: rgba(212, 175, 55, 0.25);
  --pill-inset-shadow: rgba(0, 0, 0, 0.6);
  --pill-border: rgba(212, 175, 55, 0.2);
  
  --pill-bg-1-hover: rgba(212, 175, 55, 0.15);
  --pill-bg-2-hover: rgba(15, 23, 42, 0.95);
  --pill-border-hover: rgba(212, 175, 55, 0.5);
  --pill-shadow-hover: rgba(212, 175, 55, 0.15);
  --pill-highlight-hover: rgba(212, 175, 55, 0.4);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.85; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(212, 175, 55, 0.6)); }
  15%, 45% { transform: scale(1.15); filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.9)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 35s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2.5s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(212, 175, 55, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(212, 175, 55, 0.05) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}

/* Royal Gold & Navy Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(212, 175, 55, 0.18) 0%, 
    rgba(15, 23, 42, 0.4) 45%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: #FBF8F3;
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: 14vw;
  line-height: 0.8;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(212, 175, 55, 0.12);
  background: linear-gradient(180deg, rgba(212, 175, 55, 0.16) 0%, transparent 65%);
  -webkit-background-clip: text;
  background-clip: text;
  font-family: 'Playfair Display', serif;
}

/* Golden Metallic Brand Title */
.footer-golden-title {
  background: linear-gradient(180deg, #FFFFFF 0%, #FDF7E7 20%, #DFBF77 50%, #C5A059 75%, #8E6D2E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 45px rgba(212, 175, 55, 0.4)) drop-shadow(0 4px 15px rgba(0, 0, 0, 0.9));
  font-family: 'Playfair Display', serif;
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (Zero Dependency)
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
    to?: string;
  };

export const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.1,
            rotationY: x * 0.1,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    },[]);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT (CinematicFooter for THE ORIGINAL)
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span className="text-[#F5E6C8]">Single-Origin Harvests</span> <span className="text-[#D4AF37]">✦</span>
    <span>Imperial Dry Fruits</span> <span className="text-[#D4AF37]">✦</span>
    <span className="text-[#F5E6C8]">Cold-Ground Under Liquid N₂</span> <span className="text-[#D4AF37]">✦</span>
    <span>Zero Preservatives</span> <span className="text-[#D4AF37]">✦</span>
    <span className="text-[#F5E6C8]">7.8% High Curcumin Lakadong</span> <span className="text-[#D4AF37]">✦</span>
    <span>Royal Alleppey 8mm Cardamom</span> <span className="text-[#D4AF37]">✦</span>
    <span className="text-[#F5E6C8]">Colossal W180 King Cashews</span> <span className="text-[#D4AF37]">✦</span>
  </div>
);

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    // React strict mode compatible GSAP context cleanup
    const ctx = gsap.context(() => {
      // Staggered Content Reveal
      if (headingRef.current && linksRef.current) {
        gsap.fromTo(
          [headingRef.current, linksRef.current],
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 60%",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }
    }, wrapperRef);

    return () => ctx.revert();
  },[]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* 
        The "Curtain Reveal" Wrapper:
        It sits in standard flow. Because it has clip-path, its contents
        are ONLY visible within its bounding box.
      */}
      <div
        ref={wrapperRef}
        className="relative w-full bg-[#080D1A] overflow-hidden"
      >
        {/* The cinematic footer in natural flow */}
        <footer className="relative flex min-h-[90vh] w-full flex-col justify-between overflow-hidden bg-[#080D1A] text-[#FBF8F3] cinematic-footer-wrapper border-t border-[#D4AF37]/20 pt-10">
          
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* 1. Diagonal Sleek Marquee */}
          <div className="absolute top-8 left-0 w-full overflow-hidden border-y border-[#D4AF37]/30 bg-[#0B1326]/80 backdrop-blur-md py-3 z-10 -rotate-1 scale-105 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-semibold tracking-[0.25em] text-[#C5A03A] uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content: THE ORIGINAL in Grand Metallic Golden Typography */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-24 pb-14 w-full max-w-5xl mx-auto text-center">
            {/* Elegant Brand Monogram Badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-[#D4AF37]/60 bg-[#0B1326] flex items-center justify-center shadow-2xl shadow-[#D4AF37]/15 mb-6 group hover:border-[#D4AF37] hover:scale-105 transition-all">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#DFBF77] tracking-widest">TO</span>
            </div>

            {/* The Brand Name in Golden Color */}
            <h2
              ref={headingRef}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black footer-golden-title tracking-[0.1em] sm:tracking-[0.14em] uppercase mb-4 select-none leading-none"
            >
              THE ORIGINAL
            </h2>

            {/* Brand Subtitle */}
            <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#DFBF77] font-semibold mb-3">
              Royal Spices & Imperial Dry Fruits
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] text-slate-400 uppercase tracking-widest font-medium mt-1">
              <span>100% Single-Origin GI</span>
              <span className="text-[#D4AF37]">✦</span>
              <span>Cryogenic Cold-Ground</span>
              <span className="text-[#D4AF37]">✦</span>
              <span>Inert Nitrogen Sealed</span>
            </div>

            {/* Refined Minimalist Footer Navigation */}
            <div
              ref={linksRef}
              className="flex flex-wrap justify-center items-center gap-5 sm:gap-8 mt-10 pt-8 border-t border-[#D4AF37]/20 w-full max-w-2xl text-xs uppercase tracking-widest text-slate-300 font-medium"
            >
              <Link to="/" className="hover:text-[#DFBF77] transition-colors">Home</Link>
              <Link to="/shop" className="hover:text-[#DFBF77] transition-colors">Shop</Link>
              <Link to="/spices" className="hover:text-[#DFBF77] transition-colors">Spices</Link>
              <Link to="/dry-fruits" className="hover:text-[#DFBF77] transition-colors">Dry Fruits</Link>
              <Link to="/why-us" className="hover:text-[#DFBF77] transition-colors">Why Us</Link>
              <Link to="/about" className="hover:text-[#DFBF77] transition-colors">About Us</Link>
              <Link to="/contact" className="hover:text-[#DFBF77] transition-colors">Contact</Link>
              <Link to="/privacy-policy" className="hover:text-[#DFBF77] transition-colors">Privacy</Link>
            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#D4AF37]/15 pt-6 bg-[#080D1A]/60 backdrop-blur-sm">
            
            {/* Copyright */}
            <div className="text-slate-400 text-[10px] md:text-xs font-medium tracking-wider uppercase order-2 md:order-1">
              © {new Date().getFullYear()} THE ORIGINAL. Pure Spices & Imperial Dry Fruits.
            </div>

            {/* Quality Standard Badge */}
            <div className="footer-glass-pill px-5 py-2 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-[#D4AF37]/30">
              <span className="text-slate-300 text-[10px] md:text-xs font-bold uppercase tracking-widest">Single-Origin Guarantee</span>
              <span className="animate-footer-heartbeat text-sm md:text-base text-[#D4AF37]">✦</span>
              <span className="text-[#D4AF37] font-semibold text-xs tracking-normal ml-1">100% Traceable</span>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-11 h-11 rounded-full footer-glass-pill flex items-center justify-center text-slate-300 hover:text-[#D4AF37] group order-3"
              aria-label="Scroll back to top"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}

export default CinematicFooter;
