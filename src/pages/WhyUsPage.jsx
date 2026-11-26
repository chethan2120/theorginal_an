import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, CheckCircle2, ArrowRight, Leaf, Snowflake, Microscope, Scale, Compass } from 'lucide-react';
import { initScrollAnimations } from '../utils/scrollAnimations';

export default function WhyUsPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const cleanup = initScrollAnimations(containerRef);
    return cleanup;
  }, []);

  const purityPillars = [
    {
      icon: <Award className="w-7 h-7 text-[#D4AF37]" />,
      title: "100% Single-Origin & GI Tagged",
      desc: "We refuse multi-origin blending. Every spice and dry fruit originates from a documented geographical terroir — from the Jaintia Hills of Meghalaya to the Pampore plateau of Kashmir."
    },
    {
      icon: <Snowflake className="w-7 h-7 text-[#D4AF37]" />,
      title: "Cryogenic Cold-Grinding (-20°C)",
      desc: "Conventional high-speed industrial grinding generates 80°C frictional heat that vaporizes delicate essential oils. We grind under liquid nitrogen to lock in 100% of volatile aromatic compounds."
    },
    {
      icon: <Microscope className="w-7 h-7 text-[#D4AF37]" />,
      title: "Independent Laboratory Tested",
      desc: "Every harvest batch undergoes HPLC testing for active bioactive markers: 7.8% Curcumin in Turmeric, >6.2% Piperine in Pepper, and Category 1 Crocin >240 in Kashmiri Saffron."
    },
    {
      icon: <Scale className="w-7 h-7 text-[#D4AF37]" />,
      title: "Colossal Physical Grading",
      desc: "Zero broken bits or underweight kernels. Our green cardamoms are screened at 8mm+ diameter, our cashews are colossal King W180 grade, and our Nonpareil almonds are Supreme 20/22."
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-[#D4AF37]" />,
      title: "Zero Chemical Additives",
      desc: "Zero lead chromate dyes, zero papaya seeds, zero sulfur dioxide bleach, and zero glucose syrup dipping on dates. Clean, wholesome, unadulterated nature in every pack."
    },
    {
      icon: <Leaf className="w-7 h-7 text-[#D4AF37]" />,
      title: "Inert Nitrogen Freshness Seal",
      desc: "Oxygen is the enemy of spice aroma and nut crispness. Our premium oxygen-barrier pouches are flushed with pure inert nitrogen for 18-month harvest-day vitality."
    }
  ];

  // Visual Harvest Standards Showcase Images
  const harvestStandards = [
    {
      title: "Lakadong High-Curcumin Turmeric",
      gi: "GI Tag No. 544",
      metric: "7.8% Verified Curcumin",
      terroir: "Jaintia Hills, Meghalaya",
      image: "/images/products/lakadong-turmeric.jpg"
    },
    {
      title: "Alleppey Royal Green Cardamom",
      gi: "GI Tag No. 43",
      metric: "8mm+ Extra Bold Jumbo",
      terroir: "Idukki Valley, Kerala",
      image: "/images/products/alleppey-cardamom.jpg"
    },
    {
      title: "Imperial King Cashews W180",
      gi: "Grade W180 Colossal",
      metric: "180 Whole Nuts / lb",
      terroir: "Mangalore Coastal Orchards",
      image: "/images/products/king-cashews.jpg"
    },
    {
      title: "Kashmiri Mongra Saffron",
      gi: "GI Tag No. 635",
      metric: "Crocin Strength > 240",
      terroir: "Pampore Plateau, Kashmir",
      image: "/images/products/kashmiri-saffron.jpg"
    }
  ];

  const comparisonData = [
    {
      metric: "Terroir Traceability",
      theOriginal: "100% Single-Estate & GI-Tagged with documented farmer source",
      ordinary: "Blended from multiple unknown commercial auctions"
    },
    {
      metric: "Curcumin Potency (Turmeric)",
      theOriginal: "7.8% Verified Natural Curcumin (Lakadong GI)",
      ordinary: "1.5% - 2.5% standard commercial grade"
    },
    {
      metric: "Cardamom Pod Size",
      theOriginal: "8mm+ Extra Bold Jumbo pods hand-sorted at peak harvest",
      ordinary: "5mm - 6mm mixed immature & hollow pods"
    },
    {
      metric: "Grinding Method",
      theOriginal: "Cryogenic liquid nitrogen milling at -20°C (zero heat loss)",
      ordinary: "High-speed hammer mills producing 75°C-90°C frictional heat"
    },
    {
      metric: "Cashew Nut Grading",
      theOriginal: "Colossal W180 King Grade (160-180 nuts per pound)",
      ordinary: "W240 or W320 standard small/medium broken grades"
    },
    {
      metric: "Almond Pasteurization",
      theOriginal: "Pure natural steam pasteurized (100% PPO chemical free)",
      ordinary: "Propylene Oxide (PPO) chemical gas treated"
    },
    {
      metric: "Packaging Integrity",
      theOriginal: "Multi-layer barrier pouch flushed with inert nitrogen",
      ordinary: "Standard poly-pouch with atmospheric air & moisture ingress"
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#FAF7F2] min-h-screen">
      {/* 1. Hero Header with Ambient Atmosphere & Studio Visual */}
      <section className="relative bg-[#070D1E] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-[#C5A059]/40 overflow-hidden">
        {/* Parallax ambient glow */}
        <div data-speed="0.3" className="scroll-parallax absolute -top-20 -right-20 w-[500px] h-[500px] bg-[#C5A059]/15 rounded-full blur-[130px] pointer-events-none" />
        <div data-speed="0.2" className="scroll-parallax absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-[#152238]/70 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left scroll-slide-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#152238] border border-[#C5A059]/40 text-[#DFBF77] text-xs font-semibold uppercase tracking-widest shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>The Royal Standard of Purity</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FDFBF7] scroll-text-reveal leading-[1.15]">
                Why Discerning Kitchens Choose <br />
                <span className="gold-gradient-text italic font-normal">THE ORIGINAL</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                We exist for one uncompromising purpose: to purvey the world’s most potent single-origin spices and colossal imperial dry fruits, free from commercial dilution, chemical treatments, and bulk auction blending.
              </p>

              <div className="flex flex-wrap gap-3 pt-2 justify-center lg:justify-start">
                <a
                  href="#standards"
                  className="px-6 py-3 rounded-xl bg-[#C5A059] hover:bg-[#DFBF77] text-[#070D1E] font-bold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2"
                >
                  <span>Explore 6 Purity Pillars</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#comparison"
                  className="px-6 py-3 rounded-xl bg-[#152238] hover:bg-[#1E2E4B] text-[#FDFBF7] font-bold text-xs uppercase tracking-wider transition-all border border-[#C5A059]/40 inline-flex items-center gap-2"
                >
                  <Microscope className="w-3.5 h-3.5 text-[#DFBF77]" />
                  <span>Lab Comparison Table</span>
                </a>
              </div>
            </div>

            {/* Right Hero Visual Showcase */}
            <div className="lg:col-span-5 scroll-slide-right">
              <div className="relative rounded-3xl p-3 bg-gradient-to-b from-[#152238] to-[#0B1325] border-2 border-[#C5A059]/50 shadow-2xl overflow-hidden group">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#070D1E] relative">
                  <img
                    src="/images/mega/user_whole_spices_card.jpg"
                    alt="Pristine Whole Spices Terroir"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E]/90 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-[#070D1E]/90 border border-[#C5A059]/50 text-[#DFBF77] text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                      Single-Origin GI Harvests Only
                    </span>
                    <p className="font-serif text-sm font-bold text-white mt-2">
                      Zero Auction Blending • 100% Direct Terroir
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sticky Quick Anchor Sub-Navigation */}
      <div className="sticky top-[70px] z-30 bg-[#0B1325]/95 backdrop-blur-md border-b border-[#C5A059]/30 py-2.5 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 sm:gap-6 overflow-x-auto text-[11px] uppercase tracking-wider font-semibold text-slate-300">
          <a href="#standards" className="hover:text-[#DFBF77] transition-colors whitespace-nowrap">
            Purity Pillars
          </a>
          <span className="text-[#C5A059]/50">•</span>
          <a href="#visual-showcase" className="hover:text-[#DFBF77] transition-colors whitespace-nowrap">
            Physical Standards
          </a>
          <span className="text-[#C5A059]/50">•</span>
          <a href="#comparison" className="hover:text-[#DFBF77] transition-colors whitespace-nowrap">
            Lab Comparison
          </a>
          <span className="text-[#C5A059]/50">•</span>
          <a href="#ethical" className="hover:text-[#DFBF77] transition-colors whitespace-nowrap">
            Ethical Farm-Gate
          </a>
        </div>
      </div>

      {/* 3. Six Purity Pillars Grid */}
      <section id="standards" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 scroll-fade">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">Our Quality Creed</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] mt-2 scroll-text-reveal">
            The Six Pillars of Authentic Purity
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-stagger-group">
          {purityPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="scroll-stagger-item bg-white rounded-3xl p-8 border border-[#EDE6D8] shadow-sm hover:shadow-xl hover:border-[#C5A059]/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#0B1325] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                  {pillar.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0B1325] mb-3 group-hover:text-[#9A7736] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#556987] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#EDE6D8] flex items-center gap-2 text-[11px] font-semibold text-[#9A7736]">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Verified Standard</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Visual Harvest Standards Showcase (NEW IMAGES) */}
      <section id="visual-showcase" className="py-16 bg-[#070D1E] text-white border-y-2 border-[#C5A059]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 scroll-fade">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#DFBF77]">Sensory & Physical Calibre</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
              Visualizing Authentic Terroir Standards
            </h2>
            <p className="text-xs text-slate-300 mt-2">
              Every crop undergoes strict macroscopic inspection and bioactive certification before packaging.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 scroll-stagger-group">
            {harvestStandards.map((item, idx) => (
              <div
                key={idx}
                className="scroll-stagger-item bg-[#0B1325] rounded-3xl overflow-hidden border border-[#C5A059]/30 hover:border-[#C5A059] transition-all group shadow-xl"
              >
                <div className="aspect-square relative overflow-hidden bg-black/40">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-[#070D1E]/90 border border-[#C5A059]/50 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#DFBF77] uppercase tracking-wider backdrop-blur-sm">
                    {item.gi}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="font-serif text-base font-bold text-white group-hover:text-[#DFBF77] transition-colors">
                    {item.title}
                  </h4>
                  <div className="text-xs font-semibold text-[#DFBF77] flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{item.metric}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Provenance: {item.terroir}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Comparative Specification Table */}
      <section id="comparison" className="py-20 bg-[#F4EFE6]/70 border-b border-[#EDE6D8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 scroll-fade">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">Direct Comparison</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] mt-2 scroll-text-reveal">
              THE ORIGINAL vs. Ordinary Groceries
            </h2>
            <p className="text-xs text-[#556987] mt-2">
              See the exact laboratory and physical metrics that separate our harvests from mass-market offerings.
            </p>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-[#EDE6D8] shadow-xl scroll-fade">
            <div className="grid grid-cols-12 bg-[#0B1325] text-white p-4 sm:p-6 text-xs sm:text-sm font-semibold tracking-wider uppercase">
              <div className="col-span-4 sm:col-span-3 text-[#DFBF77]">Attribute</div>
              <div className="col-span-5 sm:col-span-5 text-white">THE ORIGINAL Standard</div>
              <div className="col-span-3 sm:col-span-4 text-slate-400">Ordinary Grocery Store</div>
            </div>

            <div className="divide-y divide-[#EDE6D8]">
              {comparisonData.map((row, idx) => (
                <div key={idx} className="grid grid-cols-12 p-4 sm:p-6 text-xs items-center hover:bg-[#FAF7F2] transition-colors">
                  <div className="col-span-4 sm:col-span-3 font-bold text-[#0B1325]">
                    {row.metric}
                  </div>
                  <div className="col-span-5 sm:col-span-5 font-semibold text-[#1B4D3E] flex items-start gap-2 pr-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                    <span>{row.theOriginal}</span>
                  </div>
                  <div className="col-span-3 sm:col-span-4 text-slate-500 pl-2">
                    {row.ordinary}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Direct Farm-Gate Terroirs with Estate Image */}
      <section id="ethical" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1325] text-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-[#C5A059]/40 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6 scroll-slide-left">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#DFBF77]">Fair Farmer Prosperity</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
                Ethically Harvested at Fair Farm-Gate Premiums
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                By eliminating intermediary auction agents, we pay generational farming families 25% to 40% above standard spot prices. This ensures sustainable regenerative harvesting and allows artisans to wait for peak seasonal maturity before picking.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/spices"
                  className="px-6 py-3.5 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-[#0B1325] font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-md"
                >
                  <span>Shop Royal Spices</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/dry-fruits"
                  className="px-6 py-3.5 rounded-xl bg-[#152238] hover:bg-[#1E304F] text-[#FDFBF7] font-bold text-xs uppercase tracking-wider transition-all border border-[#C5A059]/40 inline-flex items-center gap-2"
                >
                  <span>Shop Imperial Dry Fruits</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 scroll-slide-right">
              <div className="rounded-2xl overflow-hidden border-2 border-[#C5A059]/50 shadow-2xl relative aspect-[4/3]">
                <img
                  src="/images/mega/user_dry_fruits_card.jpg"
                  alt="Harvest Terroir Estate"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#DFBF77] block">
                    Generational Heritage Estates
                  </span>
                  <p className="font-serif text-xs font-semibold text-white">
                    Mangalore Coastal Orchards & Malabar Hills
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
