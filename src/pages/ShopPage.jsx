import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, X, RotateCcw, ChevronDown, Check, ArrowUpDown } from 'lucide-react';
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
  
  // Mobile Amazon/Flipkart interactive controls
  const [showMobileFilterDrawer, setShowMobileFilterDrawer] = useState(false);
  const [showMobileSortDrawer, setShowMobileSortDrawer] = useState(false);
  const [mobileActiveFilterTab, setMobileActiveFilterTab] = useState('category');

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

  // Sort Options
  const sortOptions = [
    { id: 'featured', label: 'Featured / Bestsellers' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'rating', label: 'Customer Rating' },
    { id: 'reviews', label: 'Most Reviewed' },
    { id: 'name-asc', label: 'Alphabetical (A - Z)' }
  ];

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

  const activeFilterCount = (selectedCategory !== 'all' ? 1 : 0) +
    (selectedBadge !== 'all' ? 1 : 0) +
    (priceRange < 7500 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-6 sm:py-10 lg:py-16">
      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Mobile Sticky Amazon/Flipkart Filter & Sort Bar */}
      <div className="lg:hidden sticky top-14 sm:top-16 z-30 bg-white border-y border-[#EDE6D8] shadow-xs px-3 py-2 -mx-0 mb-4">
        <div className="flex items-center justify-between gap-2">
          {/* Sort Dropdown Trigger (Flipkart style) */}
          <button
            type="button"
            onClick={() => setShowMobileSortDrawer(true)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#FAF7F2] hover:bg-[#F3EFE6] border border-[#EDE6D8] rounded-xl text-xs font-semibold text-[#0B1325] transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-[#9A7736]" />
            <span className="truncate">
              Sort: {sortOptions.find(s => s.id === sortBy)?.label.split('/')[0]}
            </span>
            <ChevronDown className="w-3 h-3 text-[#718096]" />
          </button>

          {/* Filter Drawer Trigger with Badge (Flipkart/Amazon style) */}
          <button
            type="button"
            onClick={() => setShowMobileFilterDrawer(true)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
              hasActiveFilters
                ? 'bg-[#0B1325] text-[#DFBF77] border-[#C5A059]'
                : 'bg-[#FAF7F2] hover:bg-[#F3EFE6] text-[#0B1325] border-[#EDE6D8]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#9A7736]" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#C5A059] text-[#070D1E] text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="p-2 text-[#9A7736] hover:text-[#0B1325] bg-[#FAF7F2] border border-[#EDE6D8] rounded-xl"
              title="Reset all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Amazon-style Horizontally Scrollable Interactive Quick Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-0.5 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory(selectedCategory === 'spices' ? 'all' : 'spices')}
            className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors flex items-center gap-1 border ${
              selectedCategory === 'spices'
                ? 'bg-[#0B1325] text-[#DFBF77] border-[#C5A059]'
                : 'bg-white text-[#556987] border-[#EDE6D8]'
            }`}
          >
            <span>Spices</span>
            {selectedCategory === 'spices' && <Check className="w-3 h-3" />}
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory(selectedCategory === 'dry-fruits' ? 'all' : 'dry-fruits')}
            className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors flex items-center gap-1 border ${
              selectedCategory === 'dry-fruits'
                ? 'bg-[#0B1325] text-[#DFBF77] border-[#C5A059]'
                : 'bg-white text-[#556987] border-[#EDE6D8]'
            }`}
          >
            <span>Dry Fruits</span>
            {selectedCategory === 'dry-fruits' && <Check className="w-3 h-3" />}
          </button>

          <button
            type="button"
            onClick={() => setSelectedBadge(selectedBadge === 'GI Tagged' ? 'all' : 'GI Tagged')}
            className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors flex items-center gap-1 border ${
              selectedBadge === 'GI Tagged'
                ? 'bg-[#0B1325] text-[#DFBF77] border-[#C5A059]'
                : 'bg-white text-[#556987] border-[#EDE6D8]'
            }`}
          >
            <span>GI Tagged</span>
            {selectedBadge === 'GI Tagged' && <Check className="w-3 h-3" />}
          </button>

          <button
            type="button"
            onClick={() => setSelectedBadge(selectedBadge === 'Bestseller' ? 'all' : 'Bestseller')}
            className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors flex items-center gap-1 border ${
              selectedBadge === 'Bestseller'
                ? 'bg-[#0B1325] text-[#DFBF77] border-[#C5A059]'
                : 'bg-white text-[#556987] border-[#EDE6D8]'
            }`}
          >
            <span>Bestsellers</span>
            {selectedBadge === 'Bestseller' && <Check className="w-3 h-3" />}
          </button>

          <button
            type="button"
            onClick={() => setPriceRange(priceRange === 500 ? 7500 : 500)}
            className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors flex items-center gap-1 border ${
              priceRange === 500
                ? 'bg-[#0B1325] text-[#DFBF77] border-[#C5A059]'
                : 'bg-white text-[#556987] border-[#EDE6D8]'
            }`}
          >
            <span>Under ₹500</span>
            {priceRange === 500 && <Check className="w-3 h-3" />}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="border-b border-[#EDE6D8] pb-6 sm:pb-8 mb-6 sm:mb-8">
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
                Single-origin whole & cold-ground spices, colossal dry fruits, and handcrafted reserve harvests.
              </p>
            </div>

            {/* Live Count */}
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-xs font-semibold text-[#718096]">
                Showing <strong className="text-[#0B1325]">{filteredProducts.length}</strong> of {PRODUCTS.length} creations
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Top Filter Bar / Search & Sort */}
        <div className="hidden lg:flex bg-white p-4 rounded-2xl border border-[#EDE6D8] shadow-sm mb-8 items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedSubCategory('all');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
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
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative w-64">
              <Search className="w-4 h-4 text-[#718096] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search treasures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-[#FAF7F2] border border-[#EDE6D8] rounded-xl text-xs text-[#0B1325] focus:outline-none focus:border-[#C5A059]"
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
              className="px-3 py-2 bg-[#FAF7F2] border border-[#EDE6D8] rounded-xl text-xs font-semibold text-[#0B1325] focus:outline-none focus:border-[#C5A059] flex-shrink-0 cursor-pointer"
            >
              {sortOptions.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Left Filter Sidebar */}
          <div className="hidden lg:block bg-white p-6 rounded-2xl border border-[#EDE6D8] shadow-sm space-y-6">
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
                  className="flex items-center gap-1 text-[11px] font-semibold text-[#9A7736] hover:text-[#0B1325] cursor-pointer"
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
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
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

          {/* Product Grid */}
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
                  className="px-6 py-2.5 bg-[#0B1325] hover:bg-[#152238] text-[#FDFBF7] text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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

      {/* Flipkart / Amazon Style Mobile Sort Bottom Drawer */}
      {showMobileSortDrawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#070D1E]/70 backdrop-blur-xs"
            onClick={() => setShowMobileSortDrawer(false)}
          />
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl z-50 p-6 border-t border-[#EDE6D8] animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#EDE6D8]">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-[#9A7736]" />
                <h3 className="font-serif text-base font-bold text-[#0B1325]">
                  Sort By
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowMobileSortDrawer(false)}
                className="p-1.5 text-[#718096] hover:text-[#0B1325]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-2 divide-y divide-[#EDE6D8]">
              {sortOptions.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSortBy(opt.id);
                    setShowMobileSortDrawer(false);
                  }}
                  className="w-full flex items-center justify-between py-3.5 text-left text-sm font-medium text-[#0B1325] hover:text-[#9A7736]"
                >
                  <span className={sortBy === opt.id ? 'font-bold text-[#9A7736]' : ''}>
                    {opt.label}
                  </span>
                  {sortBy === opt.id && (
                    <Check className="w-4 h-4 text-[#9A7736]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Flipkart / Amazon Style Mobile Filter Slide-Up Bottom Drawer */}
      {showMobileFilterDrawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#070D1E]/75 backdrop-blur-xs"
            onClick={() => setShowMobileFilterDrawer(false)}
          />
          <div className="fixed inset-x-0 bottom-0 top-16 bg-white rounded-t-3xl shadow-2xl z-50 flex flex-col border-t border-[#EDE6D8] animate-in slide-in-from-bottom duration-250">
            
            {/* Drawer Header (Amazon/Flipkart format) */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EDE6D8]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#9A7736]" />
                <h3 className="font-serif text-base font-bold text-[#0B1325]">
                  Filters
                </h3>
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#0B1325] text-[#DFBF77] text-[10px] font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs font-semibold text-[#9A7736] hover:text-[#0B1325]"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowMobileFilterDrawer(false)}
                  className="p-1.5 text-[#718096] hover:text-[#0B1325]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Split Screen 2-Column Flipkart Layout */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Column: Filter Categories */}
              <div className="w-1/3 bg-[#FAF7F2] border-r border-[#EDE6D8] flex flex-col divide-y divide-[#EDE6D8] overflow-y-auto">
                <button
                  type="button"
                  onClick={() => setMobileActiveFilterTab('category')}
                  className={`p-3.5 text-left text-xs font-bold uppercase tracking-wider transition-colors ${
                    mobileActiveFilterTab === 'category'
                      ? 'bg-white text-[#9A7736] border-l-4 border-l-[#C5A059]'
                      : 'text-[#556987]'
                  }`}
                >
                  Category
                </button>
                <button
                  type="button"
                  onClick={() => setMobileActiveFilterTab('price')}
                  className={`p-3.5 text-left text-xs font-bold uppercase tracking-wider transition-colors ${
                    mobileActiveFilterTab === 'price'
                      ? 'bg-white text-[#9A7736] border-l-4 border-l-[#C5A059]'
                      : 'text-[#556987]'
                  }`}
                >
                  Price
                </button>
                <button
                  type="button"
                  onClick={() => setMobileActiveFilterTab('badge')}
                  className={`p-3.5 text-left text-xs font-bold uppercase tracking-wider transition-colors ${
                    mobileActiveFilterTab === 'badge'
                      ? 'bg-white text-[#9A7736] border-l-4 border-l-[#C5A059]'
                      : 'text-[#556987]'
                  }`}
                >
                  Badges
                </button>
              </div>

              {/* Right Column: Interactive Filter Options */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                {mobileActiveFilterTab === 'category' && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#718096] block mb-2">
                      Select Collection
                    </span>
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-medium border text-left transition-colors ${
                          selectedCategory === cat.id
                            ? 'bg-[#0B1325] text-[#DFBF77] border-[#C5A059]'
                            : 'bg-white text-[#0B1325] border-[#EDE6D8]'
                        }`}
                      >
                        <span>{cat.name}</span>
                        {selectedCategory === cat.id && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                )}

                {mobileActiveFilterTab === 'price' && (
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#718096] block">
                      Price Range
                    </span>
                    <div className="text-center py-2 bg-[#FAF7F2] rounded-xl border border-[#EDE6D8]">
                      <span className="text-xs text-[#718096]">Max Price:</span>{' '}
                      <strong className="text-base font-bold text-[#0B1325]">₹{priceRange}</strong>
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
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {[500, 1000, 2500, 7500].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setPriceRange(val)}
                          className={`py-2 px-2.5 rounded-lg text-xs font-semibold border ${
                            priceRange === val
                              ? 'bg-[#0B1325] text-[#DFBF77] border-[#C5A059]'
                              : 'bg-white text-[#556987] border-[#EDE6D8]'
                          }`}
                        >
                          Under ₹{val}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {mobileActiveFilterTab === 'badge' && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#718096] block mb-2">
                      Curator's Distinction
                    </span>
                    {badges.map(b => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBadge(b)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-medium border text-left transition-colors ${
                          selectedBadge === b
                            ? 'bg-[#0B1325] text-[#DFBF77] border-[#C5A059]'
                            : 'bg-white text-[#0B1325] border-[#EDE6D8]'
                        }`}
                      >
                        <span>{b === 'all' ? 'All Badges' : b}</span>
                        {selectedBadge === b && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Sticky Action Bar (Flipkart/Amazon format) */}
            <div className="p-4 border-t border-[#EDE6D8] bg-white flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowMobileFilterDrawer(false)}
                className="w-1/3 py-3 border border-[#EDE6D8] rounded-xl text-xs font-bold uppercase tracking-wider text-[#0B1325]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setShowMobileFilterDrawer(false)}
                className="flex-1 py-3 bg-[#C5A059] hover:bg-[#DFBF77] text-[#070D1E] rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
              >
                Apply ({filteredProducts.length} items)
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
