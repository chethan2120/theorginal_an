"use client"

import React, { useState, useEffect, useRef } from "react"
import { Compass, ShoppingBag, ChevronLeft, ChevronRight, Star, ShieldCheck, Check } from "lucide-react"

export type Dish = {
  productId?: string
  title: string
  subtitle: string
  image: string
  alt?: string
  eyebrow?: string
  label?: string
  rating: number
  chef: string
  kitchen?: string
  description: string
  likes: number
  ingredients?: string[]
  accent: string
  price?: number
  weight?: string
}

export type DishOrbitCarouselProps = {
  dishes: Dish[]
  height?: string
  backdrop?: string
  loop?: boolean
  fontSrc?: string | null
  onPlay?: (dish: Dish, index: number) => void
  onOrder?: (dish: Dish, index: number) => void
  onChange?: (index: number) => void
  className?: string
}

export function DishOrbitCarousel({
  dishes,
  onPlay,
  onOrder,
  onChange,
  className,
}: DishOrbitCarouselProps) {
  const n = dishes.length
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "purity">("overview")
  const [animating, setAnimating] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const activeDish = dishes[index] || dishes[0]

  // Smooth slide change
  const goTo = (next: number) => {
    if (next === index || animating) return
    const target = ((next % n) + n) % n
    setAnimating(true)
    setIndex(target)
    onChange?.(target)
    setTimeout(() => setAnimating(false), 350)
  }

  const prev = () => goTo(index - 1)
  const next = () => goTo(index + 1)

  // Auto-slideshow (every 5 seconds, pauses on hover / touch)
  useEffect(() => {
    if (isPaused || n < 2) return
    const timer = setInterval(() => {
      goTo(index + 1)
    }, 5000)
    return () => clearInterval(timer)
  }, [index, isPaused, n])

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    setIsPaused(true)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    const deltaY = e.changedTouches[0].clientY - touchStartY.current

    // Only horizontal swipe
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) next()
      else prev()
    }
    touchStartX.current = null
    touchStartY.current = null
    setTimeout(() => setIsPaused(false), 2000)
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      prev()
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      next()
    }
  }

  if (!dishes || dishes.length === 0) return null

  return (
    <div
      className={`relative w-full text-white select-none transition-all duration-300 ${className || ""}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Sensory Terroir Showcase"
    >
      {/* Background Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 opacity-25"
        style={{ backgroundColor: activeDish.accent || "#C5A059" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Showcase Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[460px] py-4">
          
          {/* Left Column: Product Platter Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Ambient Ring & Halo */}
            <div className="relative group flex items-center justify-center">
              {/* Outer Decorative Gradient Ring */}
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-40 transition-all duration-500 scale-105"
                style={{ backgroundColor: activeDish.accent }}
              />

              {/* Platter Frame */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full border-2 border-[#C5A059]/70 ring-8 ring-[#C5A059]/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-[#0B1325] overflow-hidden p-2 transition-transform duration-500 hover:scale-[1.02]">
                <img
                  key={activeDish.image}
                  src={activeDish.image}
                  alt={activeDish.alt || `${activeDish.title} ${activeDish.subtitle}`}
                  className="w-full h-full object-cover rounded-full transition-all duration-500 animate-fadeIn"
                  draggable={false}
                />
              </div>

              {/* Number Badge floating */}
              <div className="absolute -top-2 -right-2 sm:top-2 sm:right-2 bg-[#0B1325]/95 border border-[#C5A059] text-[#DFBF77] rounded-full px-3 py-1 text-xs font-bold tracking-widest shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>LOT 0{index + 1}</span>
              </div>
            </div>

            {/* Mobile / Tablet Quick Indicator Dots */}
            <div className="flex lg:hidden items-center gap-2 mt-4">
              {dishes.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-7 bg-[#C5A059]" : "w-2 bg-[#1E2E4B] hover:bg-[#C5A059]/40"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Terroir Description & Direct Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left space-y-4">
            
            {/* Eyebrow / Provenance */}
            <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#152238] border border-[#C5A059]/40 text-[#DFBF77] text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                {activeDish.eyebrow || `#${index + 1} Reserve Selection`}
              </span>
              <span className="text-xs text-[#94A3B8] font-medium hidden sm:inline">
                {activeDish.kitchen}
              </span>
            </div>

            {/* Main Headline (WORLD-RECORD LAKADONG TURMERIC) - NEVER clipped */}
            <div className="space-y-1">
              <div className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-[#FDFBF7] uppercase break-words leading-tight">
                {activeDish.title}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF2] via-[#DFBF77] to-[#C5A059] uppercase break-words leading-tight">
                {activeDish.subtitle}
              </h3>
            </div>

            {/* Terroir Guild & Rating */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#C5A059] text-[#070D1E] font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{activeDish.rating.toFixed(1)}</span>
              </div>
              <span className="text-[#DFBF77] font-semibold">
                {activeDish.chef}
              </span>
              <span className="text-[#64748B] hidden sm:inline">•</span>
              <span className="text-[#94A3B8] hidden sm:inline">
                {activeDish.likes.toLocaleString()} Verified Patrons
              </span>
            </div>

            {/* Tabs for Overview vs Purity/Lab Specs */}
            <div className="pt-1">
              <div className="inline-flex rounded-xl bg-[#0B1325] border border-[#C5A059]/20 p-1 mb-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === "overview"
                      ? "bg-[#152238] text-[#DFBF77] shadow-sm"
                      : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  Terroir Overview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("purity")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === "purity"
                      ? "bg-[#152238] text-[#DFBF77] shadow-sm"
                      : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  Lab Certified Specs
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "overview" ? (
                <p className="text-xs sm:text-sm text-[#CBD5E1] font-light leading-relaxed max-w-xl mx-auto lg:mx-0 min-h-[48px]">
                  {activeDish.description}
                </p>
              ) : (
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start min-h-[48px]">
                  {activeDish.ingredients?.map((ing, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0B1325]/80 border border-[#C5A059]/30 text-[11px] text-[#DFBF77] font-medium"
                    >
                      <Check className="w-3 h-3 text-[#C5A059]" />
                      <span>{ing}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                type="button"
                onClick={() => onOrder?.(activeDish, index)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#C5A059] hover:bg-[#DFBF77] text-[#070D1E] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-[#C5A059]/30 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>
                  Add to Bag {activeDish.price ? `• ₹${activeDish.price}` : ""}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onPlay?.(activeDish, index)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#152238]/90 hover:bg-[#1E2A4D] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-[#C5A059]/40 flex items-center justify-center gap-2 cursor-pointer hover:border-[#DFBF77]"
              >
                <Compass className="w-4 h-4 text-[#DFBF77]" />
                <span>Explore Terroir</span>
              </button>
            </div>

          </div>

        </div>

        {/* Bottom Interactive Thumbnail Dock (Full 5-Item Carousel on All Devices) */}
        <div className="pt-6 pb-2 border-t border-[#C5A059]/20 mt-4">
          <div className="flex items-center justify-between gap-2">
            
            {/* Left Nav Arrow */}
            <button
              type="button"
              onClick={prev}
              className="w-9 h-9 rounded-xl bg-[#0B1325] border border-[#C5A059]/30 hover:border-[#C5A059] text-[#DFBF77] hover:text-white flex items-center justify-center transition-all flex-shrink-0 cursor-pointer shadow-sm hover:scale-105"
              aria-label="Previous harvest"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* 5 Thumbnails Grid / Dock */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3 flex-1 max-w-4xl mx-auto overflow-x-auto py-1">
              {dishes.map((d, i) => {
                const isActive = i === index
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    className={`flex flex-col items-center p-2 rounded-xl border transition-all duration-300 cursor-pointer text-center group ${
                      isActive
                        ? "bg-[#152238] border-[#C5A059] shadow-md ring-1 ring-[#C5A059]/40 scale-105"
                        : "bg-[#0B1325]/70 border-[#C5A059]/20 hover:border-[#C5A059]/50 hover:bg-[#0B1325]"
                    }`}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-[#C5A059]/40 bg-[#070D1E] p-0.5 mb-1 group-hover:scale-105 transition-transform flex-shrink-0">
                      <img
                        src={d.image}
                        alt={d.subtitle}
                        className="w-full h-full object-cover rounded-full"
                        draggable={false}
                      />
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs font-semibold line-clamp-1 transition-colors ${
                        isActive ? "text-[#DFBF77]" : "text-[#94A3B8] group-hover:text-white"
                      }`}
                    >
                      {d.subtitle}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Right Nav Arrow */}
            <button
              type="button"
              onClick={next}
              className="w-9 h-9 rounded-xl bg-[#0B1325] border border-[#C5A059]/30 hover:border-[#C5A059] text-[#DFBF77] hover:text-white flex items-center justify-center transition-all flex-shrink-0 cursor-pointer shadow-sm hover:scale-105"
              aria-label="Next harvest"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}

export default DishOrbitCarousel
