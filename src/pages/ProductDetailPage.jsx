import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  Heart,
  Check,
  ShieldCheck,
  Award,
  Leaf,
  Truck,
  RotateCcw,
  ChevronRight,
  Plus
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';
import Badge from '../components/Badge';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useNotification();

  const product = PRODUCTS.find(p => p.id === id);

  const [selectedWeight, setSelectedWeight] = useState(product?.variants[0]?.weight || '');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product?.images[0] || '');
  const [activeTab, setActiveTab] = useState('tasting');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (product) {
      setSelectedWeight(product.variants[0]?.weight || '');
      setActiveImage(product.images[0]);
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#0B1325] mb-2">Item Not Found</h2>
        <p className="text-sm text-[#718096] mb-6">The spice or dry fruit creation you are seeking is unavailable.</p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-[#0B1325] text-[#DFBF77] text-xs font-semibold uppercase tracking-wider rounded-xl"
        >
          Return to Royal Catalogue
        </Link>
      </div>
    );
  }

  const selectedVariant = product.variants.find(v => v.weight === selectedWeight) || product.variants[0];
  const isWishlisted = isInWishlist(product.id);

  const discountPercent = selectedVariant.originalPrice
    ? Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, selectedWeight, quantity);
    showToast(`Added ${quantity}x ${product.name} (${selectedWeight}) to your cart`, 'success');
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedWeight, quantity);
    navigate('/checkout');
  };

  // Related products from the same category
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  // Bundle companion product
  const bundleCompanion = PRODUCTS.find(p => p.id !== product.id && p.category !== product.category) || PRODUCTS[1];

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#718096] uppercase tracking-wider mb-8">
          <Link to="/" className="hover:text-[#0B1325]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/${product.category}`} className="hover:text-[#0B1325] capitalize">{product.category.replace('-', ' ')}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#9A7736] font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Top Product Specs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left: Gallery (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-[#EDE6D8] shadow-lg">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && <Badge text={product.badge} />}
                {discountPercent > 0 && (
                  <span className="inline-flex px-2.5 py-1 rounded text-xs font-bold uppercase bg-[#9A7736] text-white shadow-sm">
                    {discountPercent}% SAVINGS
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-colors shadow-md ${
                  isWishlisted
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'bg-white/90 text-[#0B1325] hover:text-[#C5A059] border border-[#EDE6D8]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-600' : ''}`} />
              </button>
            </div>

            {/* Thumbnails row */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 bg-white transition-all ${
                      activeImage === img
                        ? 'border-[#C5A059] shadow-md scale-105'
                        : 'border-[#EDE6D8] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Terroir Sourcing Stamp */}
            <div className="p-4 rounded-2xl bg-white border border-[#EDE6D8] flex items-center gap-3">
              <Award className="w-8 h-8 text-[#C5A059] flex-shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A7736] block">
                  Geographical Origin
                </span>
                <p className="text-xs font-semibold text-[#0B1325]">
                  {product.origin} • {product.elevation}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Purchasing Actions & Information (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              {/* Ratings and Reviews */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-[#C5A059]">
                  <Star className="w-4 h-4 fill-[#C5A059]" />
                  <span className="ml-1 text-sm font-bold text-[#0B1325]">{product.rating}</span>
                </div>
                <span className="text-xs text-[#718096]">({product.reviewCount} verified connoisseur reviews)</span>
                <span className="text-xs text-emerald-700 font-semibold">• In Stock (Fresh Batch)</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325] leading-tight">
                {product.name}
              </h1>

              <p className="text-sm font-semibold text-[#9A7736] tracking-wider uppercase mt-1">
                {product.subtitle}
              </p>
            </div>

            {/* Price Row */}
            <div className="p-4 bg-white rounded-2xl border border-[#EDE6D8] flex items-baseline justify-between flex-wrap gap-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-bold text-[#0B1325]">
                  ₹{selectedVariant.price.toLocaleString('en-IN')}
                </span>
                {selectedVariant.originalPrice && (
                  <span className="text-base text-[#A0AEC0] line-through">
                    ₹{selectedVariant.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-[#718096]">(Inclusive of all taxes)</span>
              </div>

              {discountPercent > 0 && (
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
                  Save ₹{(selectedVariant.originalPrice - selectedVariant.price).toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Short Narrative Description */}
            <p className="text-sm text-[#556987] leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Available Weight Variants */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0B1325]">
                <span>Choose Packaging Size:</span>
                <span className="text-[#9A7736] font-semibold">{selectedVariant.weight}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v.weight}
                    type="button"
                    onClick={() => setSelectedWeight(v.weight)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedWeight === v.weight
                        ? 'bg-[#0B1325] text-white border-[#0B1325] shadow-md ring-2 ring-[#C5A059]/40'
                        : 'bg-white text-[#4A5568] border-[#EDE6D8] hover:border-[#C5A059]'
                    }`}
                  >
                    <span className="block text-sm font-bold">{v.weight}</span>
                    <span className={`block text-xs mt-1 ${selectedWeight === v.weight ? 'text-[#DFBF77]' : 'text-[#0B1325] font-semibold'}`}>
                      ₹{v.price.toLocaleString('en-IN')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Add to Cart Action Row */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#EDE6D8] rounded-xl bg-white px-4 py-3 w-full sm:w-auto justify-between sm:justify-start">
                  <span className="text-xs font-bold text-[#718096] mr-4 sm:hidden uppercase">Qty:</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-8 h-8 text-base font-bold text-[#4A5568] hover:text-[#0B1325] flex items-center justify-center rounded-lg hover:bg-[#FAF7F2]"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-[#0B1325]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-8 h-8 text-base font-bold text-[#4A5568] hover:text-[#0B1325] flex items-center justify-center rounded-lg hover:bg-[#FAF7F2]"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full sm:flex-1 py-4 px-6 bg-[#0B1325] hover:bg-[#152238] active:scale-[0.98] text-[#FDFBF7] text-xs font-bold uppercase tracking-[0.18em] rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group border border-[#C5A059]/40"
                >
                  {isAdding ? (
                    <>
                      <Check className="w-4 h-4 text-[#C5A059] animate-bounce" />
                      <span>Added to Royal Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#DFBF77] group-hover:scale-110 transition-transform" />
                      <span>Add to Royal Bag</span>
                    </>
                  )}
                </button>

                {/* Buy Now Button */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full sm:w-auto py-4 px-6 bg-[#C5A059] hover:bg-[#DFBF77] text-[#070D1E] text-xs font-bold uppercase tracking-[0.18em] rounded-xl transition-all shadow-md"
                >
                  Instant Checkout
                </button>
              </div>

              {/* Privilege Code Callout */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EDE6D8] flex items-center justify-between text-xs">
                <span className="text-[#556987]">Use privilege code <strong className="text-[#0B1325]">ORIGINAL10</strong> for 10% off</span>
                <span className="text-[#9A7736] font-semibold">Instant Savings</span>
              </div>
            </div>

            {/* Trust Features Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#EDE6D8] text-center text-xs">
              <div className="p-3 rounded-xl bg-white border border-[#EDE6D8]">
                <Truck className="w-5 h-5 text-[#9A7736] mx-auto mb-1.5" />
                <span className="font-semibold text-[#0B1325] block text-[11px]">Free Shipping</span>
                <span className="text-[10px] text-[#718096]">On orders &gt; ₹999</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#EDE6D8]">
                <ShieldCheck className="w-5 h-5 text-[#9A7736] mx-auto mb-1.5" />
                <span className="font-semibold text-[#0B1325] block text-[11px]">GC-MS Lab Tested</span>
                <span className="text-[10px] text-[#718096]">0% Adulteration</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#EDE6D8]">
                <Leaf className="w-5 h-5 text-[#9A7736] mx-auto mb-1.5" />
                <span className="font-semibold text-[#0B1325] block text-[11px]">Nitrogen Sealed</span>
                <span className="text-[10px] text-[#718096]">18-Month Purity</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#EDE6D8]">
                <RotateCcw className="w-5 h-5 text-[#9A7736] mx-auto mb-1.5" />
                <span className="font-semibold text-[#0B1325] block text-[11px]">Easy Replacement</span>
                <span className="text-[10px] text-[#718096]">Quality Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed In-Depth Information Accordion */}
        <div className="bg-white rounded-3xl border border-[#EDE6D8] p-6 sm:p-10 mb-20 shadow-sm">
          {/* Tab Navigation */}
          <div className="flex border-b border-[#EDE6D8] gap-4 sm:gap-8 overflow-x-auto scrollbar-none pb-4">
            <button
              onClick={() => setActiveTab('tasting')}
              className={`font-serif text-sm sm:text-base font-bold pb-2 transition-colors whitespace-nowrap ${
                activeTab === 'tasting'
                  ? 'text-[#0B1325] border-b-2 border-[#C5A059]'
                  : 'text-[#718096] hover:text-[#0B1325]'
              }`}
            >
              Aroma & Tasting Notes
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`font-serif text-sm sm:text-base font-bold pb-2 transition-colors whitespace-nowrap ${
                activeTab === 'features'
                  ? 'text-[#0B1325] border-b-2 border-[#C5A059]'
                  : 'text-[#718096] hover:text-[#0B1325]'
              }`}
            >
              Artisanal Features
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`font-serif text-sm sm:text-base font-bold pb-2 transition-colors whitespace-nowrap ${
                activeTab === 'nutrition'
                  ? 'text-[#0B1325] border-b-2 border-[#C5A059]'
                  : 'text-[#718096] hover:text-[#0B1325]'
              }`}
            >
              Nutritional Profile
            </button>
            <button
              onClick={() => setActiveTab('storage')}
              className={`font-serif text-sm sm:text-base font-bold pb-2 transition-colors whitespace-nowrap ${
                activeTab === 'storage'
                  ? 'text-[#0B1325] border-b-2 border-[#C5A059]'
                  : 'text-[#718096] hover:text-[#0B1325]'
              }`}
            >
              Storage & Culinary Tips
            </button>
          </div>

          {/* Tab Content Panes */}
          <div className="pt-6">
            {activeTab === 'tasting' && (
              <div className="space-y-4 max-w-3xl">
                <h4 className="font-serif text-lg font-bold text-[#0B1325]">Sensory Evaluation</h4>
                <p className="text-xs sm:text-sm text-[#556987] leading-relaxed">
                  {product.tastingNotes}
                </p>
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EDE6D8] text-xs space-y-1.5">
                  <div><strong>Terroir Microclimate:</strong> {product.origin}</div>
                  <div><strong>Elevation:</strong> {product.elevation}</div>
                  <div><strong>Harvest Window:</strong> {product.harvestYear}</div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-3 max-w-3xl">
                <h4 className="font-serif text-lg font-bold text-[#0B1325]">The Original Quality Protocol</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#556987]">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="space-y-4 max-w-2xl">
                <h4 className="font-serif text-lg font-bold text-[#0B1325]">Nutritional Breakdown (Approx per 100g)</h4>
                <div className="divide-y divide-[#EDE6D8] border border-[#EDE6D8] rounded-xl bg-[#FAF7F2] text-xs">
                  {Object.entries(product.nutritionPer100g).map(([key, val]) => (
                    <div key={key} className="flex justify-between p-3">
                      <span className="font-semibold text-[#0B1325] capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-[#556987] font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'storage' && (
              <div className="space-y-3 max-w-3xl text-xs sm:text-sm text-[#556987] leading-relaxed">
                <h4 className="font-serif text-lg font-bold text-[#0B1325]">Preserving Aromatics & Texture</h4>
                <p>
                  Keep sealed in the original UV-protected container. Store in a dark pantry away from stove heat or direct morning sunlight. Avoid spooning with wet utensils.
                </p>
                <p>
                  For dry fruits and nuts in warm climates, refrigeration in an airtight glass jar extends peak crispness and halts natural essential oil degradation for up to 12 months.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Frequently Bought Together Bundle */}
        <div className="bg-[#FAF7F2] rounded-3xl border-2 border-[#C5A059]/40 p-6 sm:p-10 mb-20 shadow-md">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9A7736] block mb-1">
            Connoisseur's Pairing
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#0B1325] mb-6">
            Frequently Bought Together
          </h3>

          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-4 flex-wrap">
              {/* Product 1 */}
              <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#EDE6D8]">
                <img src={product.images[0]} alt="" className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#0B1325] line-clamp-1">{product.name}</h4>
                  <span className="text-xs font-semibold text-[#9A7736]">₹{selectedVariant.price}</span>
                </div>
              </div>

              <span className="text-xl font-bold text-[#9A7736]">+</span>

              {/* Product 2 */}
              <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#EDE6D8]">
                <img src={bundleCompanion.images[0]} alt="" className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#0B1325] line-clamp-1">{bundleCompanion.name}</h4>
                  <span className="text-xs font-semibold text-[#9A7736]">₹{bundleCompanion.variants[0].price}</span>
                </div>
              </div>
            </div>

            {/* Bundle Total & Add Action */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div>
                <span className="text-[11px] text-[#718096] block">Pair Price:</span>
                <span className="text-xl font-bold text-[#0B1325]">
                  ₹{(selectedVariant.price + bundleCompanion.variants[0].price).toLocaleString('en-IN')}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  addToCart(product, selectedWeight, 1);
                  addToCart(bundleCompanion, bundleCompanion.variants[0].weight, 1);
                  showToast(`Added pairing bundle to your royal cart!`, 'success');
                }}
                className="py-3 px-5 bg-[#0B1325] hover:bg-[#152238] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-[#DFBF77]" />
                <span>Add Both to Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Grid */}
        <div>
          <div className="flex items-end justify-between mb-8 border-b border-[#EDE6D8] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#9A7736]">Explore Similar</span>
              <h3 className="font-serif text-2xl font-bold text-[#0B1325] mt-0.5">
                More From This Collection
              </h3>
            </div>
            <Link to={`/${product.category}`} className="text-xs font-bold uppercase tracking-wider text-[#9A7736] hover:text-[#0B1325]">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
