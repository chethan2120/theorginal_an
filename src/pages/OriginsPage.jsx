import React, { useState } from 'react';
import { Compass, Award, ShieldCheck, MapPin } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

export default function OriginsPage() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const originsProducts = PRODUCTS.filter(p => p.category === 'origins');

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
              <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Certified Single-Estate Terroirs</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Single-Origin Harvest Reserves
            </h1>

            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              Strictly non-blended, estate-traceable harvests from protected micro-regions. Each batch originates from a single generational grower, harvested during peak seasonal potency, and tested for exceptional active compounds.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#DFBF77]">
              <span className="flex items-center gap-1.5 bg-[#152238] px-3 py-1.5 rounded-lg border border-[#C5A059]/30">
                <MapPin className="w-4 h-4 text-[#C5A059]" /> 100% Traceable Estates
              </span>
              <span className="flex items-center gap-1.5 bg-[#152238] px-3 py-1.5 rounded-lg border border-[#C5A059]/30">
                <Award className="w-4 h-4 text-[#C5A059]" /> Peak Altitude Terroirs
              </span>
              <span className="flex items-center gap-1.5 bg-[#152238] px-3 py-1.5 rounded-lg border border-[#C5A059]/30">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" /> Zero Additives or Blending
              </span>
            </div>
          </div>
        </div>

        {/* Terroir Map Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-[#EDE6D8] shadow-sm">
            <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#9A7736] mb-2">
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              <span>Pulwama Valley, Kashmir • 1,700m</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-[#0B1325] mb-2">Wild Mamra Almonds</h3>
            <p className="text-xs text-[#718096] leading-relaxed">
              Glacier-fed soil yielding hand-cracked boat-shaped kernels packed with 50%+ natural oil content.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EDE6D8] shadow-sm">
            <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#9A7736] mb-2">
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              <span>Madikeri Highland, Coorg • 1,100m</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-[#0B1325] mb-2">Wild Rainforest Cardamom</h3>
            <p className="text-xs text-[#718096] leading-relaxed">
              Jumbo 8.5mm pods wild-harvested beneath misty tropical canopies with explosive sweet eucalyptus oils.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EDE6D8] shadow-sm">
            <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#9A7736] mb-2">
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              <span>Kandahar Oasis, Afghanistan • Arid Sun</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-[#0B1325] mb-2">Royal Black Kishmish</h3>
            <p className="text-xs text-[#718096] leading-relaxed">
              Naturally sun-cured colossal black seedless grapes with rich anthocyanins and velvety molasses chew.
            </p>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EDE6D8]">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0B1325]">The Micro-Lot Reserves</h2>
              <p className="text-xs text-[#718096]">Limited seasonal quantities harvested exclusively for THE ORIGINAL patrons</p>
            </div>
            <span className="text-xs font-semibold text-[#9A7736] bg-[#F5EEDC] px-3 py-1 rounded-full">
              {originsProducts.length} Lots Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {originsProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
