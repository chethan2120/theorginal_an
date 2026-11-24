import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';
import Badge from './Badge';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useNotification();

  const [selectedWeight, setSelectedWeight] = useState(product.variants[0]?.weight || '');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const selectedVariant = product.variants.find(v => v.weight === selectedWeight) || product.variants[0];
  const isWishlisted = isInWishlist(product.id);

  const discountPercent = selectedVariant.originalPrice
    ? Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, selectedWeight, quantity);
    showToast(`Added ${quantity}x ${product.name} (${selectedWeight}) to your cart`, 'success');
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    if (!isWishlisted) {
      showToast(`Saved ${product.name} to your Wishlist`, 'info');
    } else {
      showToast(`Removed from Wishlist`, 'info');
    }
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-[#EDE6D8] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C5A059]/50 transition-all duration-300">
      {/* Top Media Area */}
      <div className="relative aspect-square overflow-hidden bg-[#F3EFE6]">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && <Badge text={product.badge} />}
          {discountPercent > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#9A7736] text-white shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Action Buttons (Wishlist & Quick View) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            type="button"
            onClick={handleWishlistToggle}
            aria-label="Wishlist"
            className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-200 shadow-md ${
              isWishlisted
                ? 'bg-red-50 text-red-600 border border-red-200'
                : 'bg-white/90 text-[#0B1325] hover:text-[#C5A059] hover:bg-white border border-[#EDE6D8]'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600' : ''}`} />
          </button>

          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              aria-label="Quick View"
              className="p-2.5 rounded-full bg-white/90 text-[#0B1325] hover:text-[#C5A059] hover:bg-white border border-[#EDE6D8] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Origin Terroir Pill */}
        {product.origin && (
          <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
            <span className="inline-block px-2.5 py-1 rounded-md bg-[#0B1325]/85 text-[#FDFBF7] text-[10px] font-medium tracking-wide truncate max-w-full backdrop-blur-sm border border-white/10">
              📍 {product.origin.split(',')[0]}
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Rating and Reviews */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-[#C5A059]">
              <Star className="w-3.5 h-3.5 fill-[#C5A059]" />
              <span className="ml-1 text-xs font-semibold text-[#0B1325]">{product.rating}</span>
            </div>
            <span className="text-[11px] text-[#718096]">({product.reviewCount} reviews)</span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-[#9A7736] transition-colors">
            <h3 className="font-serif text-lg font-semibold text-[#0B1325] line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Subtitle / Terroir */}
          <p className="text-xs text-[#9A7736] font-medium mt-0.5 line-clamp-1">
            {product.subtitle}
          </p>

          {/* Short Description */}
          <p className="text-xs text-[#556987] mt-2 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Weights, Price & Interactive Add to Cart Area */}
        <div className="mt-4 pt-3 border-t border-[#F3EFE6]">
          {/* Weight Variant Selector */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-[11px] font-medium text-[#718096] mb-1.5">
              <span>Select Weight:</span>
              <span className="text-[#0B1325] font-semibold">{selectedVariant.weight}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.variants.map((v) => (
                <button
                  key={v.weight}
                  type="button"
                  onClick={() => setSelectedWeight(v.weight)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all ${
                    selectedWeight === v.weight
                      ? 'bg-[#0B1325] text-[#DFBF77] border-[#0B1325] shadow-xs'
                      : 'bg-[#FAF7F2] text-[#4A5568] border-[#EDE6D8] hover:border-[#C5A059]'
                  }`}
                >
                  {v.weight}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-bold text-[#0B1325]">
              ₹{selectedVariant.price.toLocaleString('en-IN')}
            </span>
            {selectedVariant.originalPrice && (
              <span className="text-xs text-[#A0AEC0] line-through">
                ₹{selectedVariant.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-[10px] text-[#718096]">
              (Incl. of all taxes)
            </span>
          </div>

          {/* Quantity and Add to Cart Buttons */}
          <div className="flex items-center gap-2">
            {/* Quantity Selector */}
            <div className="flex items-center border border-[#EDE6D8] rounded-xl bg-[#FAF7F2] px-2 py-1 flex-shrink-0">
              <button
                type="button"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-5 h-6 text-sm font-semibold text-[#4A5568] hover:text-[#0B1325] flex items-center justify-center"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-6 text-center text-xs font-bold text-[#0B1325]">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(q => q + 1)}
                className="w-5 h-6 text-sm font-semibold text-[#4A5568] hover:text-[#0B1325] flex items-center justify-center"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex-grow flex items-center justify-center gap-2 py-2.5 px-3 bg-[#0B1325] hover:bg-[#162238] active:scale-[0.98] text-[#FDFBF7] text-xs font-semibold tracking-wider uppercase rounded-xl transition-all duration-200 shadow-md group/btn"
            >
              {isAdding ? (
                <>
                  <Check className="w-4 h-4 text-[#C5A059] animate-bounce" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#DFBF77] group-hover/btn:translate-y-[-1px] transition-transform" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
