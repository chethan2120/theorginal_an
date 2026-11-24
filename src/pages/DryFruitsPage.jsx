import React, { useState } from 'react';
import { Sparkles, Award, ShieldCheck, Heart } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

export default function DryFruitsPage() {
  const [selectedSub, setSelectedSub] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const dryFruits = PRODUCTS.filter(p => p.category === 'dry-fruits');

  const filteredDryFruits = selectedSub === 'all'
    ? dryFruits
    : dryFruits.filter(p => p.subCategory === selectedSub);

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
              <span>Colossal Graded Harvests & Sun-Dried Fruits</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Imperial Dry Fruits
            </h1>

            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              We hand-select only the top 1% size grades: King Cashews (W180), Nonpareil 20/22 California Almonds, naturally split Antep Pistachios, and Jumbo Medjool Dates from the Jordan Valley. Steam-pasteurized with zero toxic chemical fumigants.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#DFBF77]">
              <span className="flex items-center gap-1.5 bg-[#152238] px-3 py-1.5 rounded-lg border border-[#C5A059]/30">
                <Award className="w-4 h-4 text-[#C5A059]" /> W180 King Cashews (The World's Largest)
              </span>
              <span className="flex items-center gap-1.5 bg-[#152238] px-3 py-1.5 rounded-lg border border-[#C5A059]/30">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" /> 100% Steam-Pasteurized (Zero PPO)
              </span>
            </div>
          </div>
        </div>

        {/* Subcategory Filter Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#EDE6D8] pb-6 mb-10">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#0B1325]">
              The Imperial Cellar
            </h2>
            <p className="text-xs text-[#718096] mt-0.5">
              Showing {filteredDryFruits.length} grand-cru varieties
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
              All Dry Fruits
            </button>
            <button
              onClick={() => setSelectedSub('raw-nuts')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                selectedSub === 'raw-nuts'
                  ? 'bg-[#0B1325] text-[#DFBF77]'
                  : 'bg-white text-[#4A5568] hover:bg-[#F3EFE6] border border-[#EDE6D8]'
              }`}
            >
              Raw Whole Nuts
            </button>
            <button
              onClick={() => setSelectedSub('roasted-nuts')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                selectedSub === 'roasted-nuts'
                  ? 'bg-[#0B1325] text-[#DFBF77]'
                  : 'bg-white text-[#4A5568] hover:bg-[#F3EFE6] border border-[#EDE6D8]'
              }`}
            >
              Roasted & Salted
            </button>
            <button
              onClick={() => setSelectedSub('exotic-fruits')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                selectedSub === 'exotic-fruits'
                  ? 'bg-[#0B1325] text-[#DFBF77]'
                  : 'bg-white text-[#4A5568] hover:bg-[#F3EFE6] border border-[#EDE6D8]'
              }`}
            >
              Sun-Cured Fruits
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDryFruits.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>

        {/* Grading Chart / Educational Section */}
        <div className="mt-20 p-8 sm:p-12 bg-white rounded-3xl border border-[#EDE6D8] shadow-sm">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">
              Standard of Excellence
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1325] mt-1">
              Decoding Dry Fruit Grading
            </h3>
            <p className="text-xs text-[#556987] mt-2">
              Why our sizes, moisture levels, and pasteurization standards exceed industry baselines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#EDE6D8]">
              <div className="w-10 h-10 rounded-xl bg-[#0B1325] text-[#DFBF77] flex items-center justify-center font-bold text-sm mb-4">
                W180
              </div>
              <h4 className="font-serif text-base font-bold text-[#0B1325] mb-2">King Cashew Sizing</h4>
              <p className="text-xs text-[#556987] leading-relaxed">
                Standard market cashews are W320 or W240. The Original exclusively selects W180 (fewer than 180 colossal kernels per pound), yielding an extraordinary buttery creaminess.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#EDE6D8]">
              <div className="w-10 h-10 rounded-xl bg-[#0B1325] text-[#DFBF77] flex items-center justify-center font-bold text-sm mb-4">
                20/22
              </div>
              <h4 className="font-serif text-base font-bold text-[#0B1325] mb-2">Supreme Almond Sizing</h4>
              <p className="text-xs text-[#556987] leading-relaxed">
                Our California Nonpareil almonds are graded 20/22 count — plump, unbroken, and sweet. Natural steam pasteurization replaces toxic chemical PPO gassing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#EDE6D8]">
              <div className="w-10 h-10 rounded-xl bg-[#0B1325] text-[#DFBF77] flex items-center justify-center font-bold text-sm mb-4">
                &lt;5%
              </div>
              <h4 className="font-serif text-base font-bold text-[#0B1325] mb-2">Loose Skin Diamond Dates</h4>
              <p className="text-xs text-[#556987] leading-relaxed">
                Our Royal Medjool dates carry a loose-skin reading below 5%, ensuring thick, succulent, caramel-like flesh that never tears or dries into leather.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
