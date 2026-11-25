import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Leaf, ArrowRight, Sparkles, Award, ShieldCheck, MapPin } from 'lucide-react';
import { initScrollAnimations } from '../utils/scrollAnimations';

export default function AboutPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const cleanup = initScrollAnimations(containerRef);
    return cleanup;
  }, []);

  const estatePartners = [
    {
      region: "Jaintia Hills, Meghalaya",
      elevation: "620m MSL",
      produce: "Lakadong Turmeric (7.8% Curcumin)",
      image: "/images/products/lakadong-turmeric.jpg",
      desc: "Untouched organic rainfed soils yield the highest natural bioactive turmerone concentrations on earth."
    },
    {
      region: "Idukki Valley, Western Ghats",
      elevation: "1,150m MSL",
      produce: "Alleppey Extra Bold 8mm Cardamom",
      image: "/images/products/alleppey-cardamom.jpg",
      desc: "High-altitude cloud forests produce explosive eucalyptus notes and thick, emerald-hued oil-dense pods."
    },
    {
      region: "Mangalore Coastal Orchards",
      elevation: "25m Coastal",
      produce: "King Cashews (W180 Colossal)",
      image: "/images/products/king-cashews.jpg",
      desc: "Only 180 colossal nuts per pound. Hand-cracked and naturally sundried with zero sulfur bleaching."
    },
    {
      region: "Pampore Karewa Plateau",
      elevation: "1,630m Elevation",
      produce: "Kashmiri Mongra Saffron (Grade A1)",
      image: "/images/products/kashmiri-saffron.jpg",
      desc: "Glacial clay soils nurture unbroken crimson stigmas with Category 1 crocin color strength > 240."
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAF7F2] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 scroll-fade">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#152238] border border-[#C5A059]/40 text-[#DFBF77] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>The Heritage & Philosophy</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B1325] leading-tight scroll-text-reveal">
            The Royal Standard of Purity
          </h1>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto" />
          <p className="text-sm sm:text-base text-[#556987] leading-relaxed font-light">
            Founded with a singular conviction: that the world's most aromatic spices and colossal dry fruits must never be degraded into anonymous mass commodities.
          </p>
        </div>

        {/* 2. Narrative & Studio Visual Mosaic */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6 text-sm text-[#556987] leading-relaxed scroll-slide-left">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736] block">
              Historic Lineage
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0B1325]">
              Rediscovering What Spices Used to Be
            </h2>
            <p>
              For centuries, the historic Spice Route linked global empires to the lush rain-washed Western Ghats of Kerala and the fertile plains of Kashmir. Merchants crossed oceans not for generic seasoning, but for distinct agricultural terroirs whose microclimates and ancient soil profiles produced unmatched volatile aromatics.
            </p>
            <p>
              Yet, over the last half-century, industrial grocery supply chains systematically compromised this heritage. In modern commercial auctions, crops from hundreds of anonymous farms are dumped into giant silos, stripped of volatile oils for chemical extraction, and bulked up with fillers and synthetic dyes.
            </p>
            <p className="font-semibold text-[#0B1325] border-l-2 border-[#C5A059] pl-4 italic">
              <strong>THE ORIGINAL</strong> was born to restore the unbroken bond between the master terroir and the connoisseur's table.
            </p>
          </div>

          <div className="relative scroll-slide-right">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border-2 border-[#C5A059]/40 shadow-2xl bg-[#0B1325]">
              <img
                src="/images/mega/user_whole_spices_card.jpg"
                alt="Generational Malabar Spice Estate"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#0B1325] text-white p-6 rounded-2xl border border-[#C5A059]/50 shadow-xl max-w-xs hidden sm:block">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#DFBF77] block mb-1">
                Zero Middlemen
              </span>
              <p className="font-serif text-xs font-semibold text-slate-200">
                Direct partnerships with generational growers in Meghalaya, Idukki, Pampore & California.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Generational Terroir Partners Showcase (NEW IMAGES) */}
        <section className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14 scroll-fade">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">Traceable Provenance</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] mt-2 scroll-text-reveal">
              Our Generational Estate Guilds
            </h2>
            <p className="text-xs text-[#556987] mt-2">
              Every package can be traced back to its specific latitude, elevation, and artisan family harvest.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 scroll-stagger-group">
            {estatePartners.map((item, idx) => (
              <div
                key={idx}
                className="scroll-stagger-item bg-white rounded-3xl overflow-hidden border border-[#EDE6D8] hover:border-[#C5A059]/60 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] relative overflow-hidden bg-[#0B1325]">
                    <img
                      src={item.image}
                      alt={item.produce}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B1325]/90 border border-[#C5A059]/40 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#DFBF77] uppercase tracking-wider backdrop-blur-sm">
                      {item.elevation}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#9A7736]">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{item.region}</span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-[#0B1325] group-hover:text-[#9A7736] transition-colors leading-snug">
                      {item.produce}
                    </h4>

                    <p className="text-xs text-[#556987] leading-relaxed pt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-[#EDE6D8] flex items-center justify-between text-[11px] font-semibold text-[#1B4D3E]">
                    <span>100% Traceable</span>
                    <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 7-Stage Purity Verification Protocol */}
        <div className="bg-[#0B1325] text-white rounded-3xl p-8 sm:p-14 lg:p-16 border-2 border-[#C5A059]/40 shadow-2xl mb-24">
          <div className="max-w-2xl mx-auto text-center mb-14 space-y-3 scroll-fade">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#DFBF77]">
              Laboratory Rigor
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FDFBF7] scroll-text-reveal">
              The 7-Stage Purity Verification Protocol
            </h2>
            <p className="text-xs sm:text-sm text-[#CBD5E1]">
              Every single batch is tested before sealing. We refuse 90% of market yields to protect our standard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-[#CBD5E1] scroll-stagger-group">
            <div className="scroll-stagger-item p-6 rounded-2xl bg-[#152238] border border-[#C5A059]/30 space-y-2">
              <span className="text-xl font-serif font-bold text-[#DFBF77]">01</span>
              <h3 className="font-serif text-sm font-bold text-white">Geographical Origin Verification</h3>
              <p className="text-[#94A3B8] leading-relaxed">
                Confirming certified GI (Geographical Indication) status to prevent counterfeit blending from inferior agro-climatic zones.
              </p>
            </div>

            <div className="scroll-stagger-item p-6 rounded-2xl bg-[#152238] border border-[#C5A059]/30 space-y-2">
              <span className="text-xl font-serif font-bold text-[#DFBF77]">02</span>
              <h3 className="font-serif text-sm font-bold text-white">Volatile Essential Oil Assay</h3>
              <p className="text-[#94A3B8] leading-relaxed">
                GC-MS testing to guarantee peak concentrations of turmerone, piperine, eugenol, and crocin compounds.
              </p>
            </div>

            <div className="scroll-stagger-item p-6 rounded-2xl bg-[#152238] border border-[#C5A059]/30 space-y-2">
              <span className="text-xl font-serif font-bold text-[#DFBF77]">03</span>
              <h3 className="font-serif text-sm font-bold text-white">Zero-Dye & Lead Chromate Screen</h3>
              <p className="text-[#94A3B8] leading-relaxed">
                Rigorous multi-spectrum testing for toxic Sudan dyes, artificial food pigments, and chemical brighteners.
              </p>
            </div>

            <div className="scroll-stagger-item p-6 rounded-2xl bg-[#152238] border border-[#C5A059]/30 space-y-2">
              <span className="text-xl font-serif font-bold text-[#DFBF77]">04</span>
              <h3 className="font-serif text-sm font-bold text-white">Pesticide Residue Zero-Tolerance</h3>
              <p className="text-[#94A3B8] leading-relaxed">
                Screened against 240+ agricultural chemical compounds according to EU and FSSAI export-grade safety thresholds.
              </p>
            </div>

            <div className="scroll-stagger-item p-6 rounded-2xl bg-[#152238] border border-[#C5A059]/30 space-y-2">
              <span className="text-xl font-serif font-bold text-[#DFBF77]">05</span>
              <h3 className="font-serif text-sm font-bold text-white">Cryogenic Liquid Nitrogen Grinding</h3>
              <p className="text-[#94A3B8] leading-relaxed">
                Pulverized under -20°C liquid nitrogen atmosphere to avoid thermal volatilization, preserving 100% aromatic top-notes.
              </p>
            </div>

            <div className="scroll-stagger-item p-6 rounded-2xl bg-[#152238] border border-[#C5A059]/30 space-y-2">
              <span className="text-xl font-serif font-bold text-[#DFBF77]">06</span>
              <h3 className="font-serif text-sm font-bold text-white">Triple Nitrogen-Purged Barrier</h3>
              <p className="text-[#94A3B8] leading-relaxed">
                Packaged within food-safe, airtight oxygen-barrier canisters under inert nitrogen to eliminate oxidative staling.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Environmental & Grower Fair Trade Pledge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="scroll-slide-left p-8 rounded-3xl bg-white border border-[#EDE6D8] space-y-4 shadow-sm flex flex-col justify-between">
            <div>
              <HeartHandshake className="w-8 h-8 text-[#9A7736] mb-3" />
              <h3 className="font-serif text-xl font-bold text-[#0B1325]">Fair Grower Partnership</h3>
              <p className="text-xs text-[#556987] leading-relaxed">
                We pay our partnered farming families an average of 30% above agricultural auction benchmarks. In return, growers harvest strictly at peak maturity, practice regenerative organic composting, and reject chemical ripeners.
              </p>
            </div>
            <div className="pt-4 border-t border-[#EDE6D8] flex items-center gap-2 text-xs font-semibold text-[#9A7736]">
              <Award className="w-4 h-4 text-[#C5A059]" />
              <span>Direct Estate Premium Pledge</span>
            </div>
          </div>

          <div className="scroll-slide-right p-8 rounded-3xl bg-white border border-[#EDE6D8] space-y-4 shadow-sm flex flex-col justify-between">
            <div>
              <Leaf className="w-8 h-8 text-[#9A7736] mb-3" />
              <h3 className="font-serif text-xl font-bold text-[#0B1325]">Plastic-Neutral & Recyclable</h3>
              <p className="text-xs text-[#556987] leading-relaxed">
                Our packaging is crafted from endlessly recyclable tinplate, food-grade glass, and FSC-certified unbleached paper fibers. We actively offset 100% of our supply chain footprint through verified plastic recovery programs.
              </p>
            </div>
            <div className="pt-4 border-t border-[#EDE6D8] flex items-center gap-2 text-xs font-semibold text-[#1B4D3E]">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>100% Carbon & Plastic Neutral</span>
            </div>
          </div>
        </div>

        {/* 6. Bottom CTA with Studio Image Background */}
        <div className="scroll-fade text-center p-12 bg-white rounded-3xl border border-[#EDE6D8] shadow-sm max-w-2xl mx-auto space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#0B1325]">
            Experience The Difference Yourself
          </h3>
          <p className="text-xs text-[#718096]">
            Begin your culinary journey with our single-origin spices and imperial dry fruits.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0B1325] hover:bg-[#152238] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
            >
              <span>Explore The Royal Catalogue</span>
              <ArrowRight className="w-4 h-4 text-[#DFBF77]" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
