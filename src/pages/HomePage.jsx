import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Award, Leaf, Star, CheckCircle2, ChevronRight } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { TESTIMONIALS, BRAND_VALUES } from '../data/reviews';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Bestsellers & Featured
  const bestsellers = PRODUCTS.filter(p => p.isBestseller).slice(0, 8);
  const featuredCollections = PRODUCTS.filter(p => p.category === 'collections');

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* 1. Hero Section: Regal Brand Introduction */}
      <section className="relative bg-[#070D1E] text-white overflow-hidden py-16 lg:py-28 border-b-2 border-[#C5A059]/40">
        {/* Background glow effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#152238]/60 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#152238] border border-[#C5A059]/40 text-[#DFBF77] text-xs font-semibold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>The Royal Standard of Purity</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FDFBF7] leading-[1.15]">
                Single-Origin Spices & <br className="hidden sm:inline" />
                <span className="gold-gradient-text">Imperial Dry Fruits</span>
              </h1>

              <p className="text-base sm:text-lg text-[#CBD5E1] font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Purveyors of rare GI-tagged harvests, world-record curcumin turmeric, 8mm+ green cardamoms, and jumbo colossal nuts. Cold-ground and sealed under inert nitrogen to honor the authentic fragrance of the earth.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto px-8 py-4 bg-[#C5A059] hover:bg-[#DFBF77] text-[#070D1E] text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-xl hover:shadow-[#C5A059]/20 flex items-center justify-center gap-2 group"
                >
                  <span>Explore The Catalogue</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/collections"
                  className="w-full sm:w-auto px-8 py-4 bg-[#152238] hover:bg-[#1E293B] text-[#FDFBF7] text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 border border-[#C5A059]/40 flex items-center justify-center gap-2"
                >
                  <span>Royal Gift Chests</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#1E293B] max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <span className="block font-serif text-2xl font-bold text-[#DFBF77]">100%</span>
                  <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider">Unadulterated</span>
                </div>
                <div>
                  <span className="block font-serif text-2xl font-bold text-[#DFBF77]">GI</span>
                  <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider">Certified Terroirs</span>
                </div>
                <div>
                  <span className="block font-serif text-2xl font-bold text-[#DFBF77]">0%</span>
                  <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider">Fillers or Dyes</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual: Authentic Brand Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Floating Decorative Gold Border Frame */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#C5A059] to-[#DFBF77] opacity-30 blur-lg" />

                <div className="relative bg-[#0B1325] rounded-3xl p-6 sm:p-8 border-2 border-[#C5A059]/60 shadow-2xl text-center space-y-6">
                  {/* Actual Brand Logo Image */}
                  <div className="w-28 h-28 mx-auto rounded-2xl overflow-hidden border-2 border-[#C5A059] shadow-lg">
                    <img
                      src="/images/logo.jpg"
                      alt="THE ORIGINAL Emblem"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <span className="font-serif text-2xl font-bold tracking-[0.2em] text-[#FDFBF7] block uppercase">
                      THE ORIGINAL
                    </span>
                    <span className="text-xs tracking-[0.3em] text-[#C5A059] font-medium block uppercase mt-1">
                      Purveyors of Fine Spices & Dry Fruits
                    </span>
                  </div>

                  <div className="p-4 bg-[#152238]/80 rounded-2xl border border-[#C5A059]/30 text-left text-xs space-y-2.5">
                    <div className="flex items-center gap-2 text-[#DFBF77]">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                      <span>Lakadong Turmeric with 7.8% verified Curcumin</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#DFBF77]">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                      <span>Alleppey Extra Bold 8mm+ Green Cardamom</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#DFBF77]">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                      <span>Colossal King W180 Cashews & Nonpareil Almonds</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-center gap-2 text-xs text-[#94A3B8]">
                    <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                    <span>Sealed under inert nitrogen for 18-month freshness</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Product Categories Showcase */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">
            Curated Categories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] mt-2">
            The Pillars of The Collection
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/${cat.id}`}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-[#EDE6D8] bg-white flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F3EFE6]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1325] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#DFBF77]">
                    {cat.count}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-1">
                    {cat.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow bg-white">
                <p className="text-xs text-[#556987] leading-relaxed mb-6">
                  {cat.description}
                </p>

                <div className="flex items-center text-xs font-bold uppercase tracking-wider text-[#9A7736] group-hover:text-[#0B1325] transition-colors">
                  <span>Explore Collection</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. The Royal Bestsellers Grid */}
      <section className="py-20 bg-[#F4EFE6]/60 border-y border-[#EDE6D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">
                Acclaimed Worldwide
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] mt-1">
                The Royal Bestsellers
              </h2>
              <p className="text-xs text-[#556987] mt-2 max-w-lg">
                Hand-harvested, lab-certified single terroirs selected by Michelin-starred culinary masters.
              </p>
            </div>

            <Link
              to="/shop"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B1325] hover:text-[#9A7736] transition-colors"
            >
              <span>View All 24 Treasures</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Product Cards Grid with dynamic weights and cart controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Brand Heritage Story: The Purity Journey */}
      <section className="py-24 bg-[#0B1325] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual Mosaic */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-[#C5A059]/40 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80"
                  alt="Single Origin Sourcing"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Callout Card */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-[#152238] p-6 rounded-2xl border border-[#C5A059]/40 shadow-2xl max-w-xs">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#DFBF77] block mb-1">
                  Single Terroir Traceability
                </span>
                <p className="font-serif text-sm font-semibold text-white">
                  "Every batch is traceable to a specific village cooperative, harvest elevation, and soil chemistry."
                </p>
              </div>
            </div>

            {/* Story Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#152238] border border-[#C5A059]/30 text-[#DFBF77] text-xs font-semibold uppercase tracking-wider">
                <span>The Origin Philosophy</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#FDFBF7]">
                Why Ordinary Spices & Nuts Pale in Comparison
              </h2>

              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                The global spice commodity market prioritizes volume over vitality. Whole crops are mixed in mass auctions, stripping the volatile oils that hold therapeutic and gastronomic power.
              </p>

              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                At <strong>THE ORIGINAL</strong>, we do what commercial mass-producers cannot: we negotiate directly with generational farmer families in certified GI terroirs — the Jaintia Hills of Meghalaya, the misty Cardamom Hills of Idukki, and the high-altitude plateau of Pampore.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="border-l-2 border-[#C5A059] pl-4">
                  <h4 className="font-serif text-base font-bold text-white">Cold-Stone Milled</h4>
                  <p className="text-xs text-[#94A3B8] mt-1">Slow pulverized to protect aromatic turmerones from heat damage.</p>
                </div>
                <div className="border-l-2 border-[#C5A059] pl-4">
                  <h4 className="font-serif text-base font-bold text-white">Nitrogen Sealed</h4>
                  <p className="text-xs text-[#94A3B8] mt-1">Zero oxygen contact from packing facility to your kitchen door.</p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A059] hover:bg-[#DFBF77] text-[#070D1E] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
                >
                  <span>Read The Full Heritage Chronicle</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The Royal Gifting & Hampers Spotlight */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-3xl border-2 border-[#C5A059]/40 p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">
                Festive & Corporate Prestige
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325]">
                The Emperor's Gift Chests & Velvet Trunks
              </h2>
              <p className="text-sm text-[#556987] leading-relaxed">
                Whether celebrating a wedding alliance, royal festivities, or honoring valued corporate patrons, THE ORIGINAL gift chests leave an indelible mark of sophistication. Encased in solid sustainable teakwood or navy blue linen-textured trunks with brushed metallic gold hardware.
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-medium text-[#0B1325]">
                <span className="px-3 py-1.5 rounded-lg bg-[#F3EFE6] border border-[#EDE6D8]">✓ Solid Teakwood & Brass Clasps</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#F3EFE6] border border-[#EDE6D8]">✓ Custom Wax-Sealed Letters</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#F3EFE6] border border-[#EDE6D8]">✓ Pan-India White-Glove Dispatch</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/collections"
                  className="px-6 py-3.5 bg-[#0B1325] hover:bg-[#152238] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md text-center"
                >
                  Explore Gift Collections
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3.5 bg-white hover:bg-[#F3EFE6] text-[#0B1325] text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-[#EDE6D8] text-center"
                >
                  Inquire For Corporate Gifting
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#EDE6D8] shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
                  alt="Royal Gift Hamper"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Verified Customer & Chef Reviews */}
      <section className="py-20 bg-[#F4EFE6]/50 border-t border-[#EDE6D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">
              Patron Testimonials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] mt-2">
              Praised by Chefs & Connoisseurs
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-2xl border border-[#EDE6D8] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#C5A059] mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C5A059]" />
                    ))}
                  </div>

                  <p className="text-xs text-[#556987] leading-relaxed italic mb-4">
                    "{review.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F3EFE6] flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#C5A059]/40"
                  />
                  <div>
                    <h4 className="font-serif text-xs font-bold text-[#0B1325]">
                      {review.name}
                    </h4>
                    <p className="text-[10px] text-[#718096]">{review.title}</p>
                    <span className="text-[9px] text-[#9A7736] font-semibold block mt-0.5">
                      Verified Purchase • {review.product}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Value Pillars / Royal Standard of Purity */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BRAND_VALUES.map((val) => (
              <div
                key={val.id}
                className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#EDE6D8] text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0B1325] text-[#DFBF77] flex items-center justify-center mb-4 border border-[#C5A059]/30">
                  <Award className="w-6 h-6 text-[#C5A059]" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#0B1325] mb-2">
                  {val.title}
                </h3>
                <p className="text-xs text-[#556987] leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
