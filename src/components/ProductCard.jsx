import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye, Check, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';
import Badge from './Badge';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useNotification();

  const [selectedWeight, setSelectedWeight] = useState(product.variants[0]?.weight || '');
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
    addToCart(product, selectedWeight, 1);
    showToast(`Added ${product.name} (${selectedWeight}) to your cart`, 'success');
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
    <div className="group relative flex flex-col bg-white rounded-2xl border border-[#EDE6D8] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#C5A059]/50 transition-all duration-300">
      {/* Top Media Area */}
      <div className="relative aspect-square overflow-hidden bg-[#F3EFE6]">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && <Badge text={product.badge} />}
          {discountPercent > 0 && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-[#9A7736] text-white shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Action Buttons (Wishlist & Quick View) */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            type="button"
            onClick={handleWishlistToggle}
            aria-label="Wishlist"
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-xs ${
              isWishlisted
                ? 'bg-red-50 text-red-600 border border-red-200'
                : 'bg-white/90 text-[#0B1325] hover:text-[#C5A059] hover:bg-white border border-[#EDE6D8]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-600' : ''}`} />
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
              className="p-2 rounded-full bg-white/90 text-[#0B1325] hover:text-[#C5A059] hover:bg-white border border-[#EDE6D8] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xs"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Origin Terroir Pill */}
        {product.origin && (
          <div className="absolute bottom-2 left-2 right-2 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#0B1325]/85 text-[#FDFBF7] text-[9.5px] font-medium tracking-wide truncate max-w-full backdrop-blur-xs border border-white/10">
              <MapPin className="w-2.5 h-2.5 text-[#DFBF77] flex-shrink-0" />
              <span className="truncate">{product.origin.split(',')[0]}</span>
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details (Simple, Compact & Refined) */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-1">
            <div className="flex items-center text-[#C5A059]">
              <Star className="w-3 h-3 fill-[#C5A059]" />
              <span className="ml-1 text-[11px] font-semibold text-[#0B1325]">{product.rating}</span>
            </div>
            <span className="text-[10px] text-[#718096]">({product.reviewCount})</span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-[#9A7736] transition-colors">
            <h3 className="font-serif text-sm sm:text-base font-bold text-[#0B1325] line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Subtitle / Terroir */}
          <p className="text-[10.5px] text-[#9A7736] font-medium mt-0.5 line-clamp-1">
            {product.subtitle}
          </p>
        </div>

        {/* Weights, Price & Direct Add Area */}
        <div className="mt-2.5 pt-2 border-t border-[#F3EFE6] space-y-2">
          {/* Weight Variant Selector - Minimalist Micro Pills */}
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] font-medium text-[#718096] uppercase tracking-wider">Pack</span>
            <div className="flex flex-wrap gap-1">
              {product.variants.map((v) => (
                <button
                  key={v.weight}
                  type="button"
                  onClick={() => setSelectedWeight(v.weight)}
                  className={`px-1.5 py-0.5 text-[9.5px] font-semibold rounded transition-all ${
                    selectedWeight === v.weight
                      ? 'bg-[#0B1325] text-[#DFBF77] border border-[#0B1325]'
                      : 'bg-[#FAF7F2] text-[#4A5568] border border-[#EDE6D8] hover:border-[#C5A059]'
                  }`}
                >
                  {v.weight}
                </button>
              ))}
            </div>
          </div>

          {/* Price & Add to Cart Button */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold text-[#0B1325] leading-none">
                ₹{selectedVariant.price.toLocaleString('en-IN')}
              </span>
              {selectedVariant.originalPrice && (
                <span className="text-[9.5px] text-[#A0AEC0] line-through mt-0.5">
                  ₹{selectedVariant.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex items-center gap-1.5 py-1.5 px-3 bg-[#0B1325] hover:bg-[#162238] active:scale-[0.98] text-[#FDFBF7] text-[10.5px] font-semibold tracking-wider uppercase rounded-lg transition-all shadow-xs"
            >
              {isAdding ? (
                <>
                  <Check className="w-3 h-3 text-[#C5A059]" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3 h-3 text-[#DFBF77]" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
