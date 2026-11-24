import React, { useState } from 'react';
import { Sparkles, Award, ShieldCheck, Flame } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

export default function SpicesPage() {
  const [selectedSub, setSelectedSub] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const spices = PRODUCTS.filter(p => p.category === 'spices');

  const filteredSpices = selectedSub === 'all'
    ? spices
    : spices.filter(p => p.subCategory === selectedSub);

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 lg:py-20">
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero Banner */}
        <div className="relative bg-[#0B1325] text-white rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-[#C5A059]/40 shadow-2xl overflow-hidden mb-16">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#152238] border border-[#C5A059]/40 text-[#DFBF77] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Estate Terroirs & Heritage Blends</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Royal Indian Spices
            </h1>

            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              Before modern commercial agriculture flattened taste into uniformity, Indian spices were prized globally for specific soil chemistry and volatile oil richness. We preserve this grand culinary legacy with single-origin, GI-tagged, cold-stone pulverized spices.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#DFBF77]">
              <span className="flex items-center gap-1.5 bg-[#152238] px-3 py-1.5 rounded-lg border border-[#C5A059]/30">
                <Award className="w-4 h-4 text-[#C5A059]" /> 7.8% High Curcumin Lakadong
              </span>
              <span className="flex items-center gap-1.5 bg-[#152238] px-3 py-1.5 rounded-lg border border-[#C5A059]/30">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" /> 8mm+ Extra Bold Alleppey Cardamom
              </span>
            </div>
          </div>
        </div>

        {/* Subcategory Filter Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#EDE6D8] pb-6 mb-10">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#0B1325]">
              The Spice Cabinet
            </h2>
            <p className="text-xs text-[#718096] mt-0.5">
              Showing {filteredSpices.length} single-origin varieties
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedSub('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                selectedSub === 'all'
                  ? 'bg-[#0B1325] text-[#DFBF77]'
                  : 'bg-white text-[#4A5568] hover:bg-[#F3EFE6] border border-[#EDE6D8]'
              }`}
            >
              All Spices
            </button>
            <button
              onClick={() => setSelectedSub('whole-spices')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                selectedSub === 'whole-spices'
                  ? 'bg-[#0B1325] text-[#DFBF77]'
                  : 'bg-white text-[#4A5568] hover:bg-[#F3EFE6] border border-[#EDE6D8]'
              }`}
            >
              Whole Seeds & Pods
            </button>
            <button
              onClick={() => setSelectedSub('ground-spices')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                selectedSub === 'ground-spices'
                  ? 'bg-[#0B1325] text-[#DFBF77]'
                  : 'bg-white text-[#4A5568] hover:bg-[#F3EFE6] border border-[#EDE6D8]'
              }`}
            >
              Cold-Stone Ground
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpices.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>

        {/* Educational Sourcing Guide Section */}
        <div className="mt-20 p-8 sm:p-12 bg-white rounded-3xl border border-[#EDE6D8] shadow-sm">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">
              Connoisseur's Guide
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1325] mt-1">
              How To Identify True Artisanal Spices
            </h3>
            <p className="text-xs text-[#556987] mt-2">
              The culinary differences between commodity auction stock and single-origin terroirs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#EDE6D8]">
              <span className="text-2xl font-serif font-bold text-[#9A7736] block mb-2">01</span>
              <h4 className="font-serif text-base font-bold text-[#0B1325] mb-2">Volatile Oil Density</h4>
              <p className="text-xs text-[#556987] leading-relaxed">
                When crushed, high-grade cloves and cardamoms immediately release visible oils that shimmer on fingertips. Our seeds contain up to 3x the essential oleoresin content of supermarket jars.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#EDE6D8]">
              <span className="text-2xl font-serif font-bold text-[#9A7736] block mb-2">02</span>
              <h4 className="font-serif text-base font-bold text-[#0B1325] mb-2">Cold-Milling Preservation</h4>
              <p className="text-xs text-[#556987] leading-relaxed">
                Industrial steel hammer mills generate excessive frictional heat (often above 70°C), vaporizing aromatic ketones. We cold-grind on natural granite stones below 35°C.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#EDE6D8]">
              <span className="text-2xl font-serif font-bold text-[#9A7736] block mb-2">03</span>
              <h4 className="font-serif text-base font-bold text-[#0B1325] mb-2">Absence of Fillers</h4>
              <p className="text-xs text-[#556987] leading-relaxed">
                Generic garam masalas often inflate volume with 60% cheap coriander and chili seeds. The Original formulation contains strictly 100% whole spices without artificial fillers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
