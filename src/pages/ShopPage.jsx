import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, X, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [selectedBadge, setSelectedBadge] = useState('all');
  const [priceRange, setPriceRange] = useState(7500);
  const [sortBy, setSortBy] = useState('featured');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state if URL changes
  React.useEffect(() => {
    if (searchParam) setSearchQuery(searchParam);
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [searchParam, categoryParam]);

  // Categories
  const categories = [
    { id: 'all', name: 'All Reserves' },
    { id: 'spices', name: 'Royal Spices' },
    { id: 'dry-fruits', name: 'Imperial Dry Fruits' },
    { id: 'origins', name: 'Single-Origin Reserves' }
  ];

  // Badges
  const badges = ['all', 'Bestseller', 'GI Tagged', 'Rare Reserve', 'Terroir Selection', 'Wellness'];

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Subcategory filter
      if (selectedSubCategory !== 'all' && product.subCategory !== selectedSubCategory) {
        return false;
      }
      // Badge filter
      if (selectedBadge !== 'all' && product.badge !== selectedBadge) {
        return false;
      }
      // Price filter (based on lowest variant price)
      const minPrice = Math.min(...product.variants.map(v => v.price));
      if (minPrice > priceRange) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchSub = product.subtitle.toLowerCase().includes(q);
        const matchDesc = product.shortDescription.toLowerCase().includes(q);
        const matchOrigin = product.origin.toLowerCase().includes(q);
        if (!matchName && !matchSub && !matchDesc && !matchOrigin) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      const minPriceA = a.variants[0].price;
      const minPriceB = b.variants[0].price;

      if (sortBy === 'price-low') return minPriceA - minPriceB;
      if (sortBy === 'price-high') return minPriceB - minPriceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [selectedCategory, selectedSubCategory, selectedBadge, priceRange, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    setSelectedBadge('all');
    setPriceRange(7500);
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedSubCategory !== 'all' || selectedBadge !== 'all' || priceRange < 7500 || searchQuery !== '';

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 lg:py-16">
      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="border-b border-[#EDE6D8] pb-8 mb-8">
          <div className="flex items-center gap-2 text-xs text-[#718096] uppercase tracking-wider mb-2">
            <span>Catalogue</span>
            <span>/</span>
            <span className="text-[#9A7736] font-semibold">
              {categories.find(c => c.id === selectedCategory)?.name || 'All Reserves'}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1325]">
                The Royal Catalogue
              </h1>
              <p className="text-xs sm:text-sm text-[#556987] mt-1.5 max-w-xl">
                Single-origin whole & cold-ground spices, colossal dry fruits, and handcrafted gift chests.
              </p>
            </div>

            {/* Live Count and Filter Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#718096]">
                Showing <strong className="text-[#0B1325]">{filteredProducts.length}</strong> of {PRODUCTS.length} creations
              </span>
              <button
                type="button"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white border border-[#EDE6D8] rounded-xl text-xs font-semibold text-[#0B1325]"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#9A7736]" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Top Filter Bar / Search & Sort */}
        <div className="bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedSubCategory('all');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#0B1325] text-[#DFBF77] shadow-sm'
                    : 'bg-[#FAF7F2] text-[#4A5568] hover:bg-[#F3EFE6] border border-[#EDE6D8]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-60">
              <Search className="w-4 h-4 text-[#718096] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search treasures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#EDE6D8] rounded-xl text-xs text-[#0B1325] focus:outline-none focus:border-[#C5A059]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#718096] hover:text-[#0B1325]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-[#FAF7F2] border border-[#EDE6D8] rounded-xl text-xs font-semibold text-[#0B1325] focus:outline-none focus:border-[#C5A059] flex-shrink-0"
            >
              <option value="featured">Featured / Bestsellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="name-asc">Alphabetical (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Left Filter Sidebar */}
          <div className={`lg:block ${showMobileFilters ? 'block' : 'hidden'} bg-white p-6 rounded-2xl border border-[#EDE6D8] shadow-sm space-y-6`}>
            <div className="flex items-center justify-between pb-4 border-b border-[#EDE6D8]">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#9A7736]" />
                <h3 className="font-serif text-sm font-bold text-[#0B1325] uppercase tracking-wider">
                  Filter By
                </h3>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-[11px] font-semibold text-[#9A7736] hover:text-[#0B1325]"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Quality Standard / Badges Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1325] mb-2.5">
                Curator's Distinction
              </label>
              <div className="flex flex-wrap gap-1.5">
                {badges.map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBadge(b)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedBadge === b
                        ? 'bg-[#0B1325] text-[#DFBF77]'
                        : 'bg-[#FAF7F2] text-[#4A5568] hover:bg-[#F3EFE6] border border-[#EDE6D8]'
                    }`}
                  >
                    {b === 'all' ? 'All Badges' : b}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0B1325] mb-2">
                <span>Maximum Price</span>
                <span className="text-[#9A7736]">Up to ₹{priceRange}</span>
              </div>
              <input
                type="range"
                min="300"
                max="7500"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#718096] mt-1">
                <span>₹300</span>
                <span>₹3,500</span>
                <span>₹7,500</span>
              </div>
            </div>

            {/* Sourcing Guarantee Highlight */}
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EDE6D8] space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#9A7736] block">
                The Purity Pledge
              </span>
              <p className="text-[11px] text-[#556987] leading-relaxed">
                Zero aggregate auction stock. Each item is strictly single-origin, nitrogen-preserved, and laboratory tested.
              </p>
            </div>
          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#EDE6D8] p-12 text-center shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#EDE6D8] flex items-center justify-center mx-auto mb-4 text-[#9A7736]">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0B1325] mb-2">
                  No treasures match your search
                </h3>
                <p className="text-xs text-[#718096] max-w-md mx-auto mb-6">
                  We could not find any items matching your selected criteria. Try adjusting your filters or resetting to view the complete royal catalogue.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#0B1325] hover:bg-[#152238] text-[#FDFBF7] text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
