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

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #FFFFFF 0%, #E6C875 50%, #C5A03A 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 25px rgba(212, 175, 55, 0.25));
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
      // Background Parallax
      gsap.fromTo(
        giantTextRef.current,
        { y: "8vh", scale: 0.85, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Staggered Content Reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
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
        className="relative min-h-[90vh] md:h-screen w-full bg-[#080D1A]"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* The actual footer stays fixed underneath during scroll */}
        <footer className="fixed bottom-0 left-0 flex h-full w-full flex-col justify-between overflow-hidden bg-[#080D1A] text-[#FBF8F3] cinematic-footer-wrapper border-t border-[#D4AF37]/20">
          
          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background brand watermark */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[2vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none text-center"
          >
            THE ORIGINAL
          </div>

          {/* 1. Diagonal Sleek Marquee */}
          <div className="absolute top-10 left-0 w-full overflow-hidden border-y border-[#D4AF37]/30 bg-[#0B1326]/80 backdrop-blur-md py-3.5 z-10 -rotate-1 scale-105 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-semibold tracking-[0.25em] text-[#C5A03A] uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs uppercase tracking-widest mb-6">
              <span>✦</span> The Royal Standard of Purity <span>✦</span>
            </div>

            <h2
              ref={headingRef}
              className="text-4xl md:text-7xl font-bold footer-text-glow tracking-tight mb-8"
            >
              Taste The Purest Harvest
            </h2>
            <p className="max-w-2xl text-slate-300 text-sm md:text-base leading-relaxed mb-10">
              Single-origin GI tagged spices and colossal imperial dry fruits. Purveyed from generational heritage estates and delivered to your doorstep in nitrogen-sealed freshness.
            </p>

            {/* Interactive Magnetic Pills Layout */}
            <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
              {/* Primary Action Links */}
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton as={Link} to="/spices" className="footer-glass-pill px-8 py-4 rounded-full text-[#FBF8F3] font-semibold text-sm md:text-base flex items-center gap-3 group">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform"></span>
                  Shop Royal Spices
                </MagneticButton>
                
                <MagneticButton as={Link} to="/dry-fruits" className="footer-glass-pill px-8 py-4 rounded-full text-[#FBF8F3] font-semibold text-sm md:text-base flex items-center gap-3 group">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C5A03A] group-hover:scale-125 transition-transform"></span>
                  Shop Imperial Dry Fruits
                </MagneticButton>

                <MagneticButton as={Link} to="/origins" className="footer-glass-pill px-8 py-4 rounded-full text-[#FBF8F3] font-semibold text-sm md:text-base flex items-center gap-3 group">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E6C875] group-hover:scale-125 transition-transform"></span>
                  Single-Origin Reserves
                </MagneticButton>
              </div>

              {/* Secondary Navigation Links */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-6 w-full mt-2">
                <MagneticButton as={Link} to="/about" className="footer-glass-pill px-5 py-2.5 rounded-full text-slate-300 font-medium text-xs md:text-sm hover:text-white">
                  Our Brand Story
                </MagneticButton>
                <MagneticButton as={Link} to="/faqs" className="footer-glass-pill px-5 py-2.5 rounded-full text-slate-300 font-medium text-xs md:text-sm hover:text-white">
                  Purity & Lab Reports
                </MagneticButton>
                <MagneticButton as={Link} to="/contact" className="footer-glass-pill px-5 py-2.5 rounded-full text-slate-300 font-medium text-xs md:text-sm hover:text-white">
                  Concierge Support
                </MagneticButton>
                <MagneticButton as={Link} to="/shipping-policy" className="footer-glass-pill px-5 py-2.5 rounded-full text-slate-300 font-medium text-xs md:text-sm hover:text-white">
                  Shipping Policy
                </MagneticButton>
                <MagneticButton as={Link} to="/privacy-policy" className="footer-glass-pill px-5 py-2.5 rounded-full text-slate-300 font-medium text-xs md:text-sm hover:text-white">
                  Privacy Policy
                </MagneticButton>
              </div>
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
