import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  if (typeof ScrollTrigger.clearScrollMemory === 'function') {
    ScrollTrigger.clearScrollMemory('manual');
  }
}

/**
 * Initializes luxury scroll animations within a container element:
 * - Scroll Reveal & Fade-in on Scroll
 * - Slide-in on Scroll (Left, Right, Up)
 * - Scroll-triggered Text Animation (clip/letter reveal)
 * - Parallax Scrolling
 * - Staggered Animations for grids & lists
 * - Sticky / Scroll-pinned Animations
 * 
 * @param {React.RefObject | HTMLElement} containerRef - Root element for GSAP context
 * @returns {Function} cleanup function to revert GSAP context
 */
export function initScrollAnimations(containerRef) {
  if (typeof window === 'undefined') return () => {};

  const element = containerRef?.current || containerRef;
  if (!element) return () => {};

  const isMobile = window.innerWidth < 768;

  const ctx = gsap.context(() => {
    // 1. Fade-in on Scroll (.scroll-fade)
    const fadeEls = gsap.utils.toArray('.scroll-fade');
    fadeEls.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: isMobile ? 15 : 25 },
        {
          opacity: 1,
          y: 0,
          duration: isMobile ? 0.6 : 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // 2. Slide-in from Left on Scroll (.scroll-slide-left)
    const slideLeftEls = gsap.utils.toArray('.scroll-slide-left');
    slideLeftEls.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: isMobile ? -20 : -45 },
        {
          opacity: 1,
          x: 0,
          duration: isMobile ? 0.6 : 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // 3. Slide-in from Right on Scroll (.scroll-slide-right)
    const slideRightEls = gsap.utils.toArray('.scroll-slide-right');
    slideRightEls.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: isMobile ? 20 : 45 },
        {
          opacity: 1,
          x: 0,
          duration: isMobile ? 0.6 : 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // 4. Scroll-Triggered Text Animation (.scroll-text-reveal)
    const textRevealEls = gsap.utils.toArray('.scroll-text-reveal');
    textRevealEls.forEach((el) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: isMobile ? 15 : 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: isMobile ? 0.7 : 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // 5. Parallax Scrolling Elements (.scroll-parallax) - Only on desktop for silky smooth mobile performance
    if (!isMobile) {
      const parallaxEls = gsap.utils.toArray('.scroll-parallax');
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.2');
        gsap.to(el, {
          y: () => -(ScrollTrigger.maxScroll(window) * speed * 0.08),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });
    }

    // 6. Staggered Animations (.scroll-stagger-group)
    const staggerGroups = gsap.utils.toArray('.scroll-stagger-group');
    staggerGroups.forEach((group) => {
      const items = group.querySelectorAll('.scroll-stagger-item');
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: isMobile ? 15 : 25 },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.5 : 0.7,
            stagger: isMobile ? 0.06 : 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    // Refresh triggers to ensure correct layout calculations
    ScrollTrigger.refresh();
  }, element);

  return () => ctx.revert();
}
