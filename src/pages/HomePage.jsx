import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Star,
  CheckCircle2,
  ChevronRight,
  Flame,
  Coffee,
  Utensils,
  Plus,
  Check,
  Compass
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { TESTIMONIALS, BRAND_VALUES } from '../data/reviews';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeCompassTab, setActiveCompassTab] = useState('turmeric');
  const [bundleAdding, setBundleAdding] = useState(null);

  const { addToCart } = useCart();
  const { showToast } = useNotification();

  // Bestsellers
  const bestsellers = PRODUCTS.filter(p => p.isBestseller).slice(0, 8);

  // Compass feature data
  const compassItems = {
    turmeric: {
      id: 'spc-lakadong-turmeric',
      title: 'Lakadong High-Curcumin Turmeric',
      subtitle: '7.8% Natural Curcumin • Jaintia Hills, Meghalaya',
      elevation: '620m MSL',
      notes: 'Deep marigold hue, pungent ginger-earth warmth, high aromatic turmerone oils.',
      pairings: 'Golden Milk, Dal Tadka, Bone Broths, Ayurvedic Tonics',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
      price: 299,
      weight: '100g'
    },
    cardamom: {
      id: 'spc-alleppey-cardamom',
      title: 'Alleppey Royal Green Cardamom',
      subtitle: '8mm+ Extra Bold Jumbo Pods • Idukki, Kerala',
      elevation: '1,150m MSL',
      notes: 'Explosive sweet eucalyptus, camphor, refreshing minty citrus undertones.',
      pairings: 'Dum Biryanis, Masala Chai, Kheer, Cardamom Breads',
      image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
      price: 499,
      weight: '100g'
    },
    cashews: {
      id: 'df-king-cashews-w180',
      title: 'Royal King Cashews (W180 Jumbo)',
      subtitle: 'The King of Cashews • Mangalore Coastal Groves',
      elevation: '25m MSL',
      notes: 'Colossal curve, ivory color, sweet coconut cream chew that dissolves on palate.',
      pairings: 'Artisanal Cheeses, Festive Desserts, Morning Nourishment',
      image: 'https://images.unsplash.com/photo-1569466896818-335b1bedfcce?auto=format&fit=crop&w=800&q=80',
      price: 479,
      weight: '250g'
    },
    saffron: {
      id: 'spc-kashmiri-saffron',
      title: 'Kashmiri Mongra Saffron (Grade A1)',
      subtitle: 'Pampore Plateau Karewa Soil • Pulwama, Kashmir',
      elevation: '1,630m MSL',
      notes: 'Intense crimson stigmas, sweet floral hay aroma, Crocin strength > 240.',
      pairings: 'Shahi Biryani, Saffron Risotto, Kahwa Tea, Festive Kulfi',
      image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=800&q=80',
      price: 499,
      weight: '1g'
    },
    almonds: {
      id: 'df-california-almonds',
      title: 'California Jumbo Almonds (Nonpareil Supreme 20/22)',
      subtitle: 'Steam Pasteurized (Zero PPO) • Central Valley, California',
      elevation: '85m MSL',
      notes: 'Plump golden skin, snappy crunch, natural marzipan butteriness.',
      pairings: 'Almond Milk, Breakfast Bowls, Healthy Energy Snacking',
      image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80',
      price: 399,
      weight: '250g'
    }
  };

  const activeCompass = compassItems[activeCompassTab];

  // Bundles
  const bundles = [
    {
      id: 'bundle-immunity',
      title: 'The Royal Immunity & Ojas Flight',
      tagline: 'Lakadong 7.8% Turmeric + Kashmiri Mongra Saffron',
      discountTag: 'Save 15%',
      items: [
        { id: 'spc-lakadong-turmeric', weight: '250g', name: 'Lakadong Turmeric (250g)', price: 649 },
        { id: 'spc-kashmiri-saffron', weight: '1g', name: 'Kashmiri Saffron (1g)', price: 499 }
      ],
      bundlePrice: 975,
      originalPrice: 1148,
      image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'bundle-energy',
      title: 'The Emperor’s Morning Vitality Trio',
      tagline: 'Jumbo 20/22 Almonds + King W180 Cashews + Medjool Dates',
      discountTag: 'Save 18%',
      items: [
        { id: 'df-california-almonds', weight: '250g', name: 'California Jumbo Almonds', price: 399 },
        { id: 'df-king-cashews-w180', weight: '250g', name: 'Royal King Cashews W180', price: 479 },
        { id: 'df-medjool-dates', weight: '250g', name: 'Royal Medjool Dates', price: 389 }
      ],
      bundlePrice: 1039,
      originalPrice: 1267,
      image: 'https://images.unsplash.com/photo-1569466896818-335b1bedfcce?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'bundle-aroma',
      title: 'The Spice Connoisseur’s Essential Trio',
      tagline: 'Alleppey 8mm Cardamom + Tellicherry Peppercorns + Ceylon Cinnamon',
      discountTag: 'Save 20%',
      items: [
        { id: 'spc-alleppey-cardamom', weight: '100g', name: 'Alleppey Green Cardamom', price: 499 },
        { id: 'spc-tellicherry-pepper', weight: '100g', name: 'Tellicherry Extra Bold Pepper', price: 279 },
        { id: 'spc-ceylon-cinnamon', weight: '100g', name: 'True Alba Ceylon Cinnamon', price: 389 }
      ],
      bundlePrice: 935,
      originalPrice: 1167,
      image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const handleAddBundle = (bundle) => {
    setBundleAdding(bundle.id);
    bundle.items.forEach(it => {
      const prod = PRODUCTS.find(p => p.id === it.id);
      if (prod) {
        addToCart(prod, it.weight, 1);
      }
    });
    showToast(`Added ${bundle.title} to your bag!`, 'success');
    setTimeout(() => setBundleAdding(null), 800);
  };

  const handleAddCompassToCart = () => {
    const prod = PRODUCTS.find(p => p.id === activeCompass.id);
    if (prod) {
      addToCart(prod, activeCompass.weight, 1);
      showToast(`Added ${activeCompass.title} to your bag!`, 'success');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* 1. Hero Section: Tightened gap, sleek and impactful */}
      <section className="relative bg-[#070D1E] text-white overflow-hidden pt-8 sm:pt-10 pb-12 sm:pb-16 border-b-2 border-[#C5A059]/40">
        {/* Background glow effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#152238]/60 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FDFBF7] leading-[1.12]">
                Single-Origin Spices & <br className="hidden sm:inline" />
                <span className="gold-gradient-text">Imperial Dry Fruits</span>
              </h1>

              <p className="text-sm sm:text-base text-[#CBD5E1] font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Purveyors of rare GI-tagged harvests, world-record curcumin turmeric, 8mm+ green cardamoms, and jumbo colossal nuts. Cold-ground and sealed under inert nitrogen to honor the authentic fragrance of the earth.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#C5A059] hover:bg-[#DFBF77] text-[#070D1E] text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-xl hover:shadow-[#C5A059]/20 flex items-center justify-center gap-2 group"
                >
                  <span>Explore The Catalogue</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/collections"
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#152238] hover:bg-[#1E293B] text-[#FDFBF7] text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 border border-[#C5A059]/40 flex items-center justify-center gap-2"
                >
                  <span>Royal Gift Chests</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#1E293B] max-w-lg mx-auto lg:mx-0 text-left">
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

            {/* Right Hero Visual: Authentic Brand Emblem Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#C5A059] to-[#DFBF77] opacity-25 blur-lg" />

                <div className="relative bg-[#0B1325] rounded-3xl p-6 sm:p-7 border-2 border-[#C5A059]/60 shadow-2xl text-center space-y-4">
                  {/* Actual Brand Logo Image */}
                  <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden border-2 border-[#C5A059] shadow-lg bg-[#070D1E]">
                    <img
                      src="/images/logo.jpg"
                      alt="THE ORIGINAL Emblem"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.22em] text-[#FDFBF7] block uppercase">
                      THE ORIGINAL
                    </span>
                    <span className="text-[10px] tracking-[0.28em] text-[#C5A059] font-medium block uppercase mt-0.5">
                      Purveyors of Fine Spices & Dry Fruits
                    </span>
                  </div>

                  <div className="p-3.5 bg-[#152238]/80 rounded-2xl border border-[#C5A059]/30 text-left text-xs space-y-2">
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

                  <div className="pt-1 flex items-center justify-center gap-2 text-[11px] text-[#94A3B8]">
                    <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                    <span>Sealed under inert nitrogen for 18-month freshness</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Terroir & Aroma Compass Section (NEW SECTION) */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#EDE6D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736] flex items-center justify-center gap-2">
              <Compass className="w-4 h-4" />
              <span>Sensory Profiler</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] mt-1.5">
              Explore by Terroir & Aroma
            </h2>
            <p className="text-xs text-[#556987] mt-2">
              Select an heirloom harvest below to uncover its unique soil elevation, volatile notes, and culinary pairings.
            </p>
          </div>

          {/* Compass Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
            {[
              { id: 'turmeric', label: 'Lakadong Turmeric' },
              { id: 'cardamom', label: 'Alleppey Cardamom' },
              { id: 'cashews', label: 'King W180 Cashews' },
              { id: 'saffron', label: 'Kashmiri Saffron' },
              { id: 'almonds', label: 'California Almonds' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCompassTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all ${
                  activeCompassTab === tab.id
                    ? 'bg-[#0B1325] text-[#DFBF77] shadow-md ring-2 ring-[#C5A059]/40'
                    : 'bg-[#FAF7F2] text-[#4A5568] hover:bg-[#F3EFE6] border border-[#EDE6D8]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Compass Showcase Card */}
          <div className="bg-[#FAF7F2] rounded-3xl border border-[#EDE6D8] p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#EDE6D8] shadow-md bg-white">
                  <img
                    src={activeCompass.image}
                    alt={activeCompass.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#9A7736] uppercase tracking-wider">
                  <Award className="w-4 h-4 text-[#C5A059]" />
                  <span>Harvest Elevation: {activeCompass.elevation}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1325]">
                  {activeCompass.title}
                </h3>

                <p className="text-xs font-medium text-[#9A7736]">
                  {activeCompass.subtitle}
                </p>

                <div className="space-y-2 text-xs text-[#556987] pt-2 border-t border-[#EDE6D8]">
                  <p><strong>Aromatic Character:</strong> {activeCompass.notes}</p>
                  <p><strong>Recommended Pairings:</strong> {activeCompass.pairings}</p>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div>
                    <span className="text-[10px] text-[#718096] block uppercase font-bold">Standard Cut ({activeCompass.weight}):</span>
                    <span className="text-xl font-bold text-[#0B1325]">₹{activeCompass.price}</span>
                  </div>

                  <button
                    onClick={handleAddCompassToCart}
                    className="py-2.5 px-5 bg-[#0B1325] hover:bg-[#152238] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#DFBF77]" />
                    <span>Quick Add to Bag</span>
                  </button>

                  <Link
                    to={`/product/${activeCompass.id}`}
                    className="text-xs font-semibold text-[#9A7736] hover:text-[#0B1325] underline"
                  >
                    Specifications
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Product Categories Showcase */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">
            Curated Categories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] mt-1.5">
            The Pillars of The Collection
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-3" />
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

      {/* 4. The Royal Bestsellers Grid */}
      <section className="py-16 sm:py-20 bg-[#F4EFE6]/60 border-y border-[#EDE6D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">
                Acclaimed Worldwide
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] mt-1">
                The Royal Bestsellers
              </h2>
              <p className="text-xs text-[#556987] mt-1.5 max-w-lg">
                Hand-harvested, lab-certified single terroirs selected by Michelin-starred culinary masters.
              </p>
            </div>

            <Link
              to="/shop"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B1325] hover:text-[#9A7736] transition-colors"
            >
              <span>View All 22 Treasures</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

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

      {/* 5. Curated Bestseller Combos / "The Master's Flight" (NEW SECTION) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">
              Curated Pairings
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] mt-1.5">
              The Connoisseur's Flights
            </h2>
            <p className="text-xs text-[#556987] mt-1.5">
              Handpicked bundles designed to complement daily health rituals and culinary excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bundles.map((b) => (
              <div
                key={b.id}
                className="bg-[#FAF7F2] rounded-3xl border border-[#EDE6D8] p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 border border-[#EDE6D8] bg-white">
                    <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#0B1325] text-[#DFBF77] text-xs font-bold uppercase border border-[#C5A059]/40 shadow-sm">
                      {b.discountTag}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#0B1325]">
                    {b.title}
                  </h3>
                  <p className="text-xs text-[#9A7736] font-medium mt-0.5 mb-4">
                    {b.tagline}
                  </p>

                  <ul className="space-y-1.5 text-xs text-[#556987] mb-6">
                    {b.items.map((it, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{it.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#EDE6D8] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#A0AEC0] line-through block">₹{b.originalPrice}</span>
                    <span className="text-xl font-bold text-[#0B1325]">₹{b.bundlePrice}</span>
                  </div>

                  <button
                    onClick={() => handleAddBundle(b)}
                    disabled={bundleAdding === b.id}
                    className="py-2.5 px-4 bg-[#0B1325] hover:bg-[#152238] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-1.5"
                  >
                    {bundleAdding === b.id ? (
                      <Check className="w-4 h-4 text-[#C5A059]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#DFBF77]" />
                    )}
                    <span>{bundleAdding === b.id ? 'Added' : 'Add Bundle'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. The Purity Matrix / Commodity vs The Original (NEW SECTION) */}
      <section className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-[#EDE6D8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">
              Uncompromising Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] mt-1.5">
              The Original Difference
            </h2>
            <p className="text-xs text-[#556987] mt-1.5">
              A transparent comparison between commercial commodity spices and our single-origin harvests.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#EDE6D8] shadow-sm overflow-hidden">
            <div className="grid grid-cols-12 bg-[#0B1325] text-white p-4 sm:p-5 text-xs font-bold uppercase tracking-wider">
              <span className="col-span-4 sm:col-span-5">Quality Criteria</span>
              <span className="col-span-4 sm:col-span-3 text-[#A0AEC0]">Commercial Grocery</span>
              <span className="col-span-4 text-[#DFBF77]">THE ORIGINAL</span>
            </div>

            <div className="divide-y divide-[#EDE6D8] text-xs text-[#556987]">
              {[
                { label: 'Turmeric Curcumin Concentration', comm: '2.0% – 2.5% (Extracted)', orig: '7.8% Natural Lab-Verified' },
                { label: 'Cardamom Sizing Grade', comm: '6mm – 7mm Mixed Yields', orig: 'Strict 8mm+ Extra Bold Jumbo' },
                { label: 'Cinnamon Variety & Coumarin', comm: 'Cassia Bark (High Liver Coumarin)', orig: 'True Ceylon Alba (<0.004% Coumarin)' },
                { label: 'Milling & Grinding Process', comm: 'Hammer Mill (>70°C heat burns oils)', orig: 'Cold Granite Stone Rotation (<35°C)' },
                { label: 'Cashew Sizing Standard', comm: 'W320 / W240 Mixed Nuts', orig: 'W180 King Cashews (Top 1%)' },
                { label: 'Atmospheric Packaging', comm: 'Oxygen Permeable Plastic Pouch', orig: 'Triple Nitrogen-Flushed UV Tin' }
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-[#FAF7F2] transition-colors">
                  <span className="col-span-4 sm:col-span-5 font-bold text-[#0B1325]">{row.label}</span>
                  <span className="col-span-4 sm:col-span-3 text-[#718096]">{row.comm}</span>
                  <span className="col-span-4 font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                    <span>{row.orig}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Culinary Masterclass & Rituals (NEW SECTION) */}
      <section className="py-16 sm:py-20 bg-white border-t border-[#EDE6D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">
              From Master Kitchens
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] mt-1.5">
              Royal Culinary Rituals
            </h2>
            <p className="text-xs text-[#556987] mt-1.5">
              Discover classical preparations that honor volatile aromatic oils.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#EDE6D8] space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#0B1325] text-[#DFBF77] flex items-center justify-center">
                <Coffee className="w-5 h-5 text-[#C5A059]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0B1325]">The Golden Milk Ritual</h3>
              <p className="text-xs text-[#556987] leading-relaxed">
                Simmer 1 tsp Lakadong Turmeric with 2 crushed green cardamom pods in warm almond milk. Finish with 3 strands of Kashmiri Saffron. Rich in cellular curcuminoids.
              </p>
              <div className="pt-2 text-xs font-bold text-[#9A7736]">
                Uses: Lakadong Turmeric • Alleppey Cardamom • Saffron
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#EDE6D8] space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#0B1325] text-[#DFBF77] flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#C5A059]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0B1325]">The Dum Biryani Tempering</h3>
              <p className="text-xs text-[#556987] leading-relaxed">
                Bloom 8mm Alleppey Cardamom, cracked Tellicherry Peppercorns, and Star Anise in clarified cow ghee for 45 seconds to release oil esters into long-grain basmati.
              </p>
              <div className="pt-2 text-xs font-bold text-[#9A7736]">
                Uses: Green Cardamom • Tellicherry Pepper • Star Anise
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#EDE6D8] space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#0B1325] text-[#DFBF77] flex items-center justify-center">
                <Utensils className="w-5 h-5 text-[#C5A059]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0B1325]">Royal Breakfast Nourishment</h3>
              <p className="text-xs text-[#556987] leading-relaxed">
                Soak 5 King California Almonds and 2 Medjool Dates overnight in spring water. Pair with toasted Antep pistachios for sustained cognitive alertness.
              </p>
              <div className="pt-2 text-xs font-bold text-[#9A7736]">
                Uses: Jumbo Almonds • Medjool Dates • Pistachios
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Brand Heritage Story: The Purity Journey */}
      <section className="py-20 bg-[#0B1325] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#152238] p-5 rounded-2xl border border-[#C5A059]/40 shadow-2xl max-w-xs">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#DFBF77] block mb-1">
                  Single Terroir Traceability
                </span>
                <p className="font-serif text-xs font-semibold text-white">
                  "Every batch is traceable to a specific village cooperative, harvest elevation, and soil chemistry."
                </p>
              </div>
            </div>

            {/* Story Text */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#152238] border border-[#C5A059]/30 text-[#DFBF77] text-xs font-semibold uppercase tracking-wider">
                <span>The Origin Philosophy</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-[#FDFBF7]">
                Why Ordinary Spices & Nuts Pale in Comparison
              </h2>

              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                The global spice commodity market prioritizes volume over vitality. Whole crops are mixed in mass auctions, stripping the volatile oils that hold therapeutic and gastronomic power.
              </p>

              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                At <strong>THE ORIGINAL</strong>, we do what commercial mass-producers cannot: we negotiate directly with generational farmer families in certified GI terroirs — the Jaintia Hills of Meghalaya, the misty Cardamom Hills of Idukki, and the high-altitude plateau of Pampore.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="border-l-2 border-[#C5A059] pl-3">
                  <h4 className="font-serif text-sm font-bold text-white">Cold-Stone Milled</h4>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">Slow pulverized to protect aromatic turmerones from heat damage.</p>
                </div>
                <div className="border-l-2 border-[#C5A059] pl-3">
                  <h4 className="font-serif text-sm font-bold text-white">Nitrogen Sealed</h4>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">Zero oxygen contact from packing facility to your kitchen door.</p>
                </div>
              </div>

              <div className="pt-2">
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

      {/* 9. The Royal Gifting & Hampers Spotlight */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-3xl border-2 border-[#C5A059]/40 p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">
                Festive & Corporate Prestige
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325]">
                The Emperor's Gift Chests & Velvet Trunks
              </h2>
              <p className="text-xs sm:text-sm text-[#556987] leading-relaxed">
                Whether celebrating a wedding alliance, royal festivities, or honoring valued corporate patrons, THE ORIGINAL gift chests leave an indelible mark of sophistication. Encased in solid sustainable teakwood or navy blue linen-textured trunks with brushed metallic gold hardware.
              </p>

              <div className="flex flex-wrap gap-3 text-xs font-medium text-[#0B1325]">
                <span className="px-3 py-1.5 rounded-lg bg-white border border-[#EDE6D8]">✓ Solid Teakwood & Brass Clasps</span>
                <span className="px-3 py-1.5 rounded-lg bg-white border border-[#EDE6D8]">✓ Custom Wax-Sealed Letters</span>
                <span className="px-3 py-1.5 rounded-lg bg-white border border-[#EDE6D8]">✓ Pan-India White-Glove Dispatch</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-3">
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

      {/* 10. Verified Customer & Chef Reviews */}
      <section className="py-16 sm:py-20 bg-[#F4EFE6]/50 border-t border-[#EDE6D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">
              Patron Testimonials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] mt-1.5">
              Praised by Chefs & Connoisseurs
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-3" />
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

      {/* 11. Value Pillars */}
      <section className="py-16 sm:py-20 bg-white">
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
