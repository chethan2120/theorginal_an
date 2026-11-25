import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Star,
  ChevronRight,
  ChevronDown,
  Compass,
  Check,
  Sparkles,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { TESTIMONIALS, BRAND_VALUES } from '../data/reviews';
import { FAQS } from '../data/faqs';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import DishOrbitCarousel from '../components/ui/dish-orbit-carousel';
import { initScrollAnimations } from '../utils/scrollAnimations';

export default function HomePage() {
  const containerRef = useRef(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeCompassTab, setActiveCompassTab] = useState('turmeric');
  const [isCompassHovered, setIsCompassHovered] = useState(false);
  const [bundleAdding, setBundleAdding] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const { addToCart } = useCart();
  const { showToast } = useNotification();

  // Scroll animations initialization
  useEffect(() => {
    const cleanup = initScrollAnimations(containerRef);
    return cleanup;
  }, []);

  // Auto slideshow for "Explore by Terroir & Aroma" (Compass)
  useEffect(() => {
    if (isCompassHovered) return;
    const compassOrder = ['turmeric', 'cardamom', 'cashews', 'saffron', 'almonds'];
    const timer = setInterval(() => {
      setActiveCompassTab((prev) => {
        const nextIdx = (compassOrder.indexOf(prev) + 1) % compassOrder.length;
        return compassOrder[nextIdx];
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [isCompassHovered]);

  // 1. Hero Grand Cinematic Slides
  const HERO_SLIDES = [
    {
      id: 'spices',
      tabLabel: 'Whole Spices',
      tagline: 'Single-Origin Malabar & Western Ghats',
      title: 'Pristine Whole Spices',
      eyebrow: 'GI Certified Terroirs',
      potency: 'Essential Oils > 8.5% • Hand-Sorted',
      description: 'Hand-picked Alleppey Extra-Bold 8mm green cardamom, Tellicherry TGSEB black peppercorns, and Alba Ceylon cinnamon quills directly from high-elevation heritage estates.',
      provenance: 'Idukki Valley & Tellicherry, Kerala',
      image: '/images/mega/user_whole_spices_card.jpg',
      link: '/spices?type=whole',
      actionText: 'Explore Whole Spices',
      highlights: ['8mm+ Jumbo Pods', 'Zero Chemical Fumigation', 'Cryo-Cold Processed']
    },
    {
      id: 'dry-fruits',
      tabLabel: 'Imperial Dry Fruits',
      tagline: 'Colossal Gradings & Naturally Sun-Dried',
      title: 'Imperial Calibre Dry Fruits',
      eyebrow: 'Colossal Gradings',
      potency: 'Grade W180 King Cashews & Nonpareil Supreme',
      description: 'The world\'s largest cashew grading (only 180 colossal nuts per lb), California snowmelt-irrigated Nonpareil almonds, and crisp roasted Antep pistachios.',
      provenance: 'Mangalore Coast & California Orchards',
      image: '/images/mega/user_dry_fruits_card.jpg',
      link: '/dry-fruits',
      actionText: 'Explore Imperial Dry Fruits',
      highlights: ['Colossal W180 Grade', 'Zero Chemical Bleach', 'Raw Natural Crunch']
    },
    {
      id: 'powders',
      tabLabel: 'Cryo-Milled Powders',
      tagline: 'Ground Under Liquid N₂ at -20°C',
      title: 'Cryogenic Spice Powders',
      eyebrow: 'Peak Bioactive Potency',
      potency: '7.8% High-Curcumin Lakadong & Grade A1 Saffron',
      description: 'Milled at sub-zero temperatures using liquid nitrogen to protect volatile turmerone aromatic oils that normal commercial heat grinding destroys.',
      provenance: 'Jaintia Hills, Meghalaya & Pampore, Kashmir',
      image: '/images/mega/spice-powders-mega.jpg',
      link: '/spices?type=ground',
      actionText: 'Explore Ground Spices',
      highlights: ['7.8% Natural Curcumin', 'Sub-Zero Nitrogen Milled', '100% Raw Bioactivity']
    }
  ];

  const [heroSlideIdx, setHeroSlideIdx] = useState(0);

  // Auto-cycle hero slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeHeroSlide = HERO_SLIDES[heroSlideIdx];

  // 2. The Royal Bestsellers (Strictly 4 products on Home page, rest in Shop)
  const bestsellers = PRODUCTS.filter(p => p.isBestseller).slice(0, 4);

  // Sensory Compass Data
  const compassItems = {
    turmeric: {
      id: 'spc-lakadong-turmeric',
      title: 'Lakadong High-Curcumin Turmeric',
      subtitle: '7.8% Natural Curcumin • Jaintia Hills, Meghalaya',
      elevation: '620m MSL',
      notes: 'Deep marigold hue, pungent ginger-earth warmth, high aromatic turmerone oils.',
      pairings: 'Golden Milk, Dal Tadka, Bone Broths, Ayurvedic Tonics',
      image: '/images/products/lakadong-turmeric.jpg',
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
      image: '/images/products/alleppey-cardamom.jpg',
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
      image: '/images/products/king-cashews.jpg',
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
      image: '/images/products/kashmiri-saffron.jpg',
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
      image: '/images/products/california-almonds.jpg',
      price: 399,
      weight: '250g'
    }
  };

  const activeCompass = compassItems[activeCompassTab];

  // Curated Flights (Pure Spice & Nut Combinations, Not Gifting)
  const flights = [
    {
      id: 'flight-immunity',
      title: 'The Royal Immunity & Ojas Flight',
      tagline: 'Lakadong 7.8% Turmeric + Kashmiri Mongra Saffron',
      discountTag: 'Save 15%',
      items: [
        { id: 'spc-lakadong-turmeric', weight: '250g', name: 'Lakadong Turmeric (250g)', price: 649 },
        { id: 'spc-kashmiri-saffron', weight: '1g', name: 'Kashmiri Saffron (1g)', price: 499 }
      ],
      bundlePrice: 975,
      originalPrice: 1148,
      image: '/images/products/kashmiri-saffron.jpg'
    },
    {
      id: 'flight-vitality',
      title: 'The Imperial Morning Vitality Trio',
      tagline: 'Jumbo 20/22 Almonds + King W180 Cashews + Medjool Dates',
      discountTag: 'Save 18%',
      items: [
        { id: 'df-california-almonds', weight: '250g', name: 'California Jumbo Almonds', price: 399 },
        { id: 'df-king-cashews-w180', weight: '250g', name: 'Royal King Cashews W180', price: 479 },
        { id: 'df-medjool-dates', weight: '250g', name: 'Royal Medjool Dates', price: 389 }
      ],
      bundlePrice: 1039,
      originalPrice: 1267,
      image: '/images/products/king-cashews.jpg'
    },
    {
      id: 'flight-aroma',
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
      image: '/images/products/alleppey-cardamom.jpg'
    },
    {
      id: 'flight-dessert',
      title: 'The Royal Shahi Dessert Flight',
      tagline: 'Kashmiri Saffron + Antep Pistachios + Alleppey Cardamom',
      discountTag: 'Save 17%',
      items: [
        { id: 'spc-kashmiri-saffron', weight: '1g', name: 'Grade A1 Kashmiri Saffron', price: 499 },
        { id: 'df-antep-pistachios', weight: '250g', name: 'Roasted Antep Pistachios', price: 549 },
        { id: 'spc-alleppey-cardamom', weight: '100g', name: 'Alleppey 8mm Cardamom', price: 499 }
      ],
      bundlePrice: 1285,
      originalPrice: 1547,
      image: '/images/products/antep-pistachios.jpg'
    }
  ];

  // Orbit Carousel Items (Spices & Dry Fruits, not food dishes)
  const SPICE_ORBIT_ITEMS = [
    {
      productId: 'spc-lakadong-turmeric',
      title: 'World-Record',
      subtitle: 'Lakadong Turmeric',
      eyebrow: '#1 GI-Tagged Golden Rhizome',
      image: '/images/products/lakadong-turmeric.jpg',
      rating: 4.9,
      chef: 'Jaintia Hills Co-Op',
      kitchen: 'Meghalaya, 620m MSL',
      description: 'Verified 7.8% natural curcumin content (3x ordinary grocery turmeric). Cold-ground under liquid nitrogen to protect volatile aromatic turmerones.',
      likes: 1840,
      ingredients: ['7.8% Natural Curcumin', 'Volatile Turmerones', 'Cold-Ground Liquid N₂', 'Zero Adulteration'],
      accent: '#E5A00D',
      weight: '100g'
    },
    {
      productId: 'spc-alleppey-cardamom',
      title: '8mm+ Extra Bold',
      subtitle: 'Royal Cardamom',
      eyebrow: '#2 High-Altitude Malabar Reserve',
      image: '/images/products/alleppey-cardamom.jpg',
      rating: 5.0,
      chef: 'Idukki Estate Guild',
      kitchen: 'Western Ghats, 1,150m MSL',
      description: 'Hand-sorted 8mm+ jumbo green pods harvested at peak maturity. Intense camphor warmth, spearmint, and sweet eucalyptus bouquet.',
      likes: 2150,
      ingredients: ['8mm+ Extra Bold Pods', 'Sun-Shade Dried', 'Eucalyptus & Mint Notes', 'Essential Oils > 8%'],
      accent: '#4E8752',
      weight: '100g'
    },
    {
      productId: 'spc-kashmiri-saffron',
      title: 'Grade A1 Super',
      subtitle: 'Kashmiri Saffron',
      eyebrow: '#3 Red Gold of Pampore',
      image: '/images/products/kashmiri-saffron.jpg',
      rating: 5.0,
      chef: 'Pampore Saffron Guild',
      kitchen: 'Kashmir Valley, 1,630m MSL',
      description: 'Pure unbroken all-red Mongra stigmas without yellow style or pollen debris. Crocin coloring strength > 240, yielding radiant golden liquor.',
      likes: 3200,
      ingredients: ['Grade A1 Mongra', 'Crocin Strength > 240', 'Zero Yellow Style', 'Hand-Plucked Autumn'],
      accent: '#D13838',
      weight: '1g'
    },
    {
      productId: 'df-king-cashews-w180',
      title: 'Colossal Jumbo',
      subtitle: 'King Cashews W180',
      eyebrow: '#4 Imperial Size Selection',
      image: '/images/products/king-cashews.jpg',
      rating: 4.9,
      chef: 'Mangalore Coastal Orchards',
      kitchen: 'Karnataka Coastline',
      description: 'The largest cashew grading in the world (only 180 nuts per lb). Naturally sweet with a dense, creamy bite that dissolves on the palate.',
      likes: 1980,
      ingredients: ['W180 Jumbo Grade', '100% Raw Unroasted', 'Zero Cholesterol', 'Sweet Coconut Cream'],
      accent: '#C5A059',
      weight: '250g'
    },
    {
      productId: 'df-california-almonds',
      title: 'Supreme Grade',
      subtitle: 'California Almonds',
      eyebrow: '#5 Nonpareil 20/22 Selection',
      image: '/images/products/california-almonds.jpg',
      rating: 4.8,
      chef: 'San Joaquin Estate',
      kitchen: 'Central Valley, California',
      description: 'Plump golden kernels with snappy crunch, high natural vitamin E, and clean sweet almond butter finish. Steam pasteurized (Zero PPO).',
      likes: 1650,
      ingredients: ['Nonpareil Supreme 20/22', 'Steam Pasteurized', 'Zero PPO Chemicals', 'Snappy Freshness'],
      accent: '#B87B44',
      weight: '250g'
    }
  ];

  const handleOrbitOrder = (dish) => {
    const product = PRODUCTS.find(p => p.id === dish.productId);
    if (product) {
      addToCart(product, dish.weight || '100g', 1);
      showToast(`Added ${dish.title} ${dish.subtitle} (${dish.weight}) to your bag!`, 'success');
    }
  };

  const handleAddBundle = (flight) => {
    setBundleAdding(flight.id);
    flight.items.forEach(it => {
      const prod = PRODUCTS.find(p => p.id === it.id);
      if (prod) {
        addToCart(prod, it.weight, 1);
      }
    });
    showToast(`Added ${flight.title} to your bag!`, 'success');
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
    <div ref={containerRef} className="min-h-screen bg-[#FAF7F2]">
      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* 1. Grand Editorial Hero Section */}
      <section className="relative bg-[#070D1E] text-white overflow-hidden border-b-2 border-[#C5A059]/40 pt-3 sm:pt-5 pb-12 sm:pb-16">
        {/* Ambient Atmosphere Glows with Parallax */}
        <div data-speed="0.25" className="scroll-parallax absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none" />
        <div data-speed="0.2" className="scroll-parallax absolute bottom-0 left-10 w-[500px] h-[500px] bg-[#152238]/70 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Bold Luxury Typography & Brand Positioning */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left scroll-slide-left">

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FDFBF7] leading-[1.12] scroll-text-reveal">
                India's Purest Harvests. <br />
                <span className="gold-gradient-text italic font-normal">
                  Single-Origin & Imperial Calibre.
                </span>
              </h1>

              {/* Refined Brand Narrative */}
              <p className="text-sm sm:text-base text-[#CBD5E1] font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Purveyors of rare, GI-tagged heirlooms: world-record 7.8% curcumin turmeric from Meghalaya, 8mm+ jumbo cardamom from Idukki, and colossal W180 king cashews. Cold-ground under liquid nitrogen at -20°C and nitrogen-sealed at peak aroma.
              </p>

              {/* Interactive Category Jump Tabs */}
              <div className="pt-2">
                <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap mb-5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#DFBF77] mr-1 hidden sm:inline-block">
                    Featured Pillars:
                  </span>
                  {HERO_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setHeroSlideIdx(idx)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-2 ${
                        heroSlideIdx === idx
                          ? 'bg-[#C5A059] text-[#070D1E] shadow-lg shadow-[#C5A059]/25 font-bold'
                          : 'bg-[#152238]/80 hover:bg-[#1E2E4B] text-slate-300 border border-[#C5A059]/30'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${heroSlideIdx === idx ? 'bg-[#070D1E]' : 'bg-[#DFBF77]'}`} />
                      <span>{slide.tabLabel}</span>
                    </button>
                  ))}
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link
                    to="/shop"
                    className="w-full sm:w-auto px-8 py-4 bg-[#C5A059] hover:bg-[#DFBF77] text-[#070D1E] text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-xl hover:shadow-[#C5A059]/30 flex items-center justify-center gap-2 group"
                  >
                    <span>Explore All 22 Treasures</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to="/why-us"
                    className="w-full sm:w-auto px-7 py-4 bg-[#152238] hover:bg-[#1E2A4D] text-[#FDFBF7] text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 border border-[#C5A059]/40 flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#DFBF77]" />
                    <span>The Purity Creed (Why Us)</span>
                  </Link>
                </div>
              </div>

              {/* 4 Trust Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#1E293B] max-w-xl mx-auto lg:mx-0 text-left">
                <div className="bg-[#0B1325]/70 border border-[#C5A059]/25 rounded-xl p-3">
                  <span className="block font-serif text-xl sm:text-2xl font-bold text-[#DFBF77]">7.8%</span>
                  <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block">Curcumin Lakadong</span>
                </div>
                <div className="bg-[#0B1325]/70 border border-[#C5A059]/25 rounded-xl p-3">
                  <span className="block font-serif text-xl sm:text-2xl font-bold text-[#DFBF77]">8mm+</span>
                  <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block">Jumbo Extra Bold</span>
                </div>
                <div className="bg-[#0B1325]/70 border border-[#C5A059]/25 rounded-xl p-3">
                  <span className="block font-serif text-xl sm:text-2xl font-bold text-[#DFBF77]">W180</span>
                  <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block">King Cashew Calibre</span>
                </div>
                <div className="bg-[#0B1325]/70 border border-[#C5A059]/25 rounded-xl p-3">
                  <span className="block font-serif text-xl sm:text-2xl font-bold text-[#DFBF77]">-20°C</span>
                  <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block">Cryo-Milled Aroma</span>
                </div>
              </div>

            </div>

            {/* Right Column: Editorial Showcase Stage (Clean, Cinematic Photography with Gold Accent Frame) */}
            <div className="lg:col-span-5 scroll-slide-right">
              <div className="relative rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-[#0F1A33] via-[#0B1326] to-[#070D1E] border-2 border-[#C5A059]/40 shadow-2xl overflow-hidden group">
                
                {/* Ambient Radial Halo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />

                {/* Terroir & Origin Header Bar */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#C5A059]/20 relative z-10 text-xs">
                  <span className="text-[#DFBF77] font-semibold tracking-wide flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{activeHeroSlide.provenance}</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#152238] border border-[#C5A059]/40 text-[#DFBF77] text-[10px] font-bold uppercase tracking-wider">
                    {activeHeroSlide.eyebrow}
                  </span>
                </div>

                {/* Cinematic Editorial Image in Arched Showcase */}
                <div className="py-5 relative z-10">
                  <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl bg-[#070D1E]">
                    <img
                      src={activeHeroSlide.image}
                      alt={activeHeroSlide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E]/80 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Potency Tag */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#070D1E]/90 border border-[#C5A059]/50 text-[#DFBF77] text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                        ✦ {activeHeroSlide.potency}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Title & Editorial Description */}
                <div className="relative z-10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl font-bold text-[#FDFBF7]">
                      {activeHeroSlide.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeHeroSlide.description}
                  </p>

                  {/* Highlights Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeHeroSlide.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md bg-[#152238] border border-[#C5A059]/25 text-[10px] text-[#DFBF77] font-medium"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>

                  {/* Direct Link CTA */}
                  <div className="pt-4 border-t border-[#C5A059]/20 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {HERO_SLIDES.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setHeroSlideIdx(idx)}
                          className={`h-1.5 rounded-full transition-all ${
                            heroSlideIdx === idx ? 'w-6 bg-[#C5A059]' : 'w-2 bg-[#1E2E4B]'
                          }`}
                          aria-label={`Slide ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <Link
                      to={activeHeroSlide.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#DFBF77] hover:text-white transition-colors"
                    >
                      <span>{activeHeroSlide.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4 Value Pillar Cards Below Hero */}
      <section className="bg-[#0B1325] border-b border-[#C5A059]/30 py-6 sm:py-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            
            {/* Card 1: Certified GI Terroirs */}
            <div className="bg-[#152238]/90 hover:bg-[#1E2E4B] border border-[#C5A059]/30 hover:border-[#C5A059]/60 rounded-2xl p-4 sm:p-5 flex items-start gap-4 transition-all duration-300 shadow-md group">
              <div className="w-10 h-10 rounded-xl bg-[#070D1E] border border-[#C5A059]/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Compass className="w-5 h-5 text-[#DFBF77]" />
              </div>
              <div className="min-w-0">
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#FDFBF7] tracking-wide">
                  Certified GI Terroirs
                </h4>
                <p className="text-xs text-[#CBD5E1] mt-1 leading-snug font-light">
                  Single-origin authentic provenance
                </p>
              </div>
            </div>

            {/* Card 2: 7-Stage Lab Certified */}
            <div className="bg-[#152238]/90 hover:bg-[#1E2E4B] border border-[#C5A059]/30 hover:border-[#C5A059]/60 rounded-2xl p-4 sm:p-5 flex items-start gap-4 transition-all duration-300 shadow-md group">
              <div className="w-10 h-10 rounded-xl bg-[#070D1E] border border-[#C5A059]/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5 text-[#DFBF77]" />
              </div>
              <div className="min-w-0">
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#FDFBF7] tracking-wide">
                  7-Stage Lab Certified
                </h4>
                <p className="text-xs text-[#CBD5E1] mt-1 leading-snug font-light">
                  Zero dyes, fillers, or adulterants
                </p>
              </div>
            </div>

            {/* Card 3: Nitrogen Fresh Sealed */}
            <div className="bg-[#152238]/90 hover:bg-[#1E2E4B] border border-[#C5A059]/30 hover:border-[#C5A059]/60 rounded-2xl p-4 sm:p-5 flex items-start gap-4 transition-all duration-300 shadow-md group">
              <div className="w-10 h-10 rounded-xl bg-[#070D1E] border border-[#C5A059]/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-[#DFBF77]" />
              </div>
              <div className="min-w-0">
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#FDFBF7] tracking-wide">
                  Nitrogen Fresh Sealed
                </h4>
                <p className="text-xs text-[#CBD5E1] mt-1 leading-snug font-light">
                  Preserving delicate volatile oils
                </p>
              </div>
            </div>

            {/* Card 4: 👑 Complimentary Express */}
            <div className="bg-[#152238]/90 hover:bg-[#1E2E4B] border border-[#C5A059]/30 hover:border-[#C5A059]/60 rounded-2xl p-4 sm:p-5 flex items-start gap-4 transition-all duration-300 shadow-md group">
              <div className="w-10 h-10 rounded-xl bg-[#070D1E] border border-[#C5A059]/40 flex items-center justify-center flex-shrink-0 text-lg group-hover:scale-110 transition-transform">
                👑
              </div>
              <div className="min-w-0">
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#FDFBF7] tracking-wide">
                  Complimentary Express
                </h4>
                <p className="text-xs text-[#CBD5E1] mt-1 leading-snug font-light">
                  Free delivery on orders over ₹999
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Interactive Terroir & Aroma Compass Section */}
      <section
        className="py-14 sm:py-20 bg-white border-b border-[#EDE6D8]"
        onMouseEnter={() => setIsCompassHovered(true)}
        onMouseLeave={() => setIsCompassHovered(false)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736] flex items-center justify-center gap-2">
              <Compass className="w-4 h-4" />
              <span>Sensory Profiler</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] mt-1.5 scroll-text-reveal">
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
                    ? 'bg-[#0B1325] text-[#DFBF77] shadow-md border border-[#C5A059]'
                    : 'bg-[#FAF7F2] text-[#556987] hover:bg-[#F3EFE6] border border-[#EDE6D8]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Compass Dynamic Card */}
          <div className="bg-[#FAF7F2] rounded-3xl border border-[#EDE6D8] p-6 sm:p-8 lg:p-10 shadow-sm max-w-5xl mx-auto scroll-fade">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 relative aspect-square rounded-2xl overflow-hidden border-2 border-[#C5A059]/30 shadow-lg bg-[#0B1325]">
                <img
                  src={activeCompass.image}
                  alt={activeCompass.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#0B1325]/90 text-[#DFBF77] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#C5A059]/40">
                  Elevation: {activeCompass.elevation}
                </span>
              </div>

              <div className="md:col-span-7 space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#9A7736] block">
                  {activeCompass.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1325]">
                  {activeCompass.title}
                </h3>

                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <span className="font-bold text-[#0B1325] block mb-0.5">Volatile Aroma & Flavor Profile:</span>
                    <p className="text-[#556987] leading-relaxed">{activeCompass.notes}</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#0B1325] block mb-0.5">Recommended Pairings:</span>
                    <p className="text-[#556987] leading-relaxed">{activeCompass.pairings}</p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-[#EDE6D8]">
                  <div>
                    <span className="text-[10px] text-[#718096] uppercase tracking-wider block">Harvest Pack</span>
                    <span className="font-serif text-xl font-bold text-[#0B1325]">
                      ₹{activeCompass.price} <span className="text-xs font-normal text-[#718096]">/ {activeCompass.weight}</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddCompassToCart}
                    className="px-6 py-2.5 bg-[#0B1325] hover:bg-[#152238] text-[#DFBF77] text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-[#C5A059]/50 shadow-md"
                  >
                    Add To Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Three Pillars Categories Section (Zero Gifts) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">
              Curated Catalogues
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] mt-1.5 scroll-text-reveal">
              Explore Our Harvest Pillars
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 scroll-stagger-group">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={cat.id === 'origins' ? '/origins' : `/${cat.id}`}
                className="scroll-stagger-item group relative rounded-3xl overflow-hidden border border-[#EDE6D8] bg-[#FAF7F2] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0B1325]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E]/90 via-[#070D1E]/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#0B1325]/80 backdrop-blur-md border border-[#C5A059]/40 text-[#DFBF77] text-[10px] font-bold uppercase tracking-wider">
                      {cat.count}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[11px] font-medium text-[#DFBF77] tracking-wider uppercase block">
                      {cat.tagline}
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
                    <span>Explore Harvests</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Royal Orbit Showcase: Spices & Dry Fruits Carousel */}
      <section className="bg-[#070D1E] text-white py-10 sm:py-14 border-y-2 border-[#C5A059]/40 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#152238] border border-[#C5A059]/40 text-[#DFBF77] text-xs font-semibold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Interactive Sensory Showcase</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FDFBF7] tracking-tight scroll-text-reveal">
            The Royal Orbit Showcase
          </h2>
          <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-xl mx-auto mt-2">
            Scroll down to rotate through our single-origin spices and imperial dry fruits. Press "Add to Bag" to acquire any harvest directly.
          </p>
        </div>

        <div className="w-full">
          <DishOrbitCarousel
            dishes={SPICE_ORBIT_ITEMS}
            height="530px"
            onOrder={handleOrbitOrder}
          />
        </div>
      </section>

      {/* 5. The Royal Bestsellers Grid */}
      <section className="py-16 sm:py-20 bg-[#F4EFE6]/60 border-b border-[#EDE6D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">
                Acclaimed Worldwide
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] mt-1 scroll-text-reveal">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 scroll-stagger-group">
            {bestsellers.map((product) => (
              <div key={product.id} className="scroll-stagger-item">
                <ProductCard
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Curated Connoisseur Flights */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#EDE6D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">
              Synergistic Pairings
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] mt-1.5 scroll-text-reveal">
              The Connoisseur's Flights
            </h2>
            <p className="text-xs text-[#556987] mt-1.5">
              Carefully combined single-origin spices and whole dry fruits for morning vitality, culinary depth, and natural immunity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 scroll-stagger-group">
            {flights.map((b) => (
              <div
                key={b.id}
                className="scroll-stagger-item bg-[#FAF7F2] rounded-3xl border border-[#EDE6D8] p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all"
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
                    <span className="text-xs text-[#718096] line-through block">₹{b.originalPrice}</span>
                    <span className="font-serif text-xl font-bold text-[#0B1325]">₹{b.bundlePrice}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddBundle(b)}
                    disabled={bundleAdding === b.id}
                    className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#DFBF77] text-[#070D1E] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-1.5"
                  >
                    <span>{bundleAdding === b.id ? 'Adding...' : 'Add Flight'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Patron Reviews */}
      <section className="py-16 sm:py-20 bg-[#F4EFE6]/50 border-b border-[#EDE6D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">
              Patron Testimonials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] mt-1.5 scroll-text-reveal">
              Praised by Chefs & Connoisseurs
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 scroll-stagger-group">
            {TESTIMONIALS.map((review) => (
              <div
                key={review.id}
                className="scroll-stagger-item bg-white p-6 rounded-2xl border border-[#EDE6D8] shadow-sm flex flex-col justify-between"
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
                  <div className="w-9 h-9 rounded-full bg-[#0B1325] text-[#DFBF77] font-serif font-bold text-xs flex items-center justify-center border border-[#C5A059]/40 flex-shrink-0">
                    {review.name.charAt(0)}
                  </div>
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

      {/* 8. Brand Value Pillars */}
      <section className="py-16 bg-white border-b border-[#EDE6D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 scroll-stagger-group">
            {BRAND_VALUES.map((val) => (
              <div
                key={val.id}
                className="scroll-stagger-item p-6 rounded-2xl bg-[#FAF7F2] border border-[#EDE6D8] text-center flex flex-col items-center"
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

      {/* 9. Interactive Frequently Asked Questions (DIRECTLY ABOVE FOOTER) */}
      <section className="py-16 sm:py-24 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736] block">
              Purity & Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] mt-2 scroll-text-reveal">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-3" />
            <p className="text-xs text-[#556987] mt-3 max-w-xl mx-auto">
              Everything you need to know about our single-origin certification, GC-MS laboratory testing, nitrogen sealing, and express delivery.
            </p>
          </div>

          <div className="space-y-3.5 scroll-fade">
            {FAQS.flatMap(cat => cat.questions).map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#EDE6D8] overflow-hidden transition-all shadow-sm hover:border-[#C5A059]/50"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-semibold text-[#0B1325]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#C5A059] flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#556987] leading-relaxed border-t border-[#F3EFE6] bg-[#FAF7F2]/40">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
