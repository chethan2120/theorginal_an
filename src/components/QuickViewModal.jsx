import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, ShoppingBag, Check, Heart, ArrowRight, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';
import Badge from './Badge';

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useNotification();

  const [selectedWeight, setSelectedWeight] = useState(product?.variants[0]?.weight || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.images[0] || '');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedWeight(product.variants[0]?.weight || '');
      setSelectedImage(product.images[0]);
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const selectedVariant = product.variants.find(v => v.weight === selectedWeight) || product.variants[0];
  const isWishlisted = isInWishlist(product.id);

  const discountPercent = selectedVariant?.originalPrice
    ? Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, selectedWeight, quantity);
    showToast(`Added ${quantity}x ${product.name} (${selectedWeight}) to your cart`, 'success');
    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#070D1E]/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        <div className="relative transform overflow-hidden rounded-2xl bg-[#FAF7F2] text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-4xl border border-[#C5A059]/40">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-[#718096] hover:text-[#0B1325] bg-white/80 rounded-full backdrop-blur-md border border-[#EDE6D8]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Gallery */}
            <div className="p-6 md:p-8 bg-[#F3EFE6] flex flex-col justify-between">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[#EDE6D8] shadow-inner">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {product.badge && <Badge text={product.badge} />}
                  {discountPercent > 0 && (
                    <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-[#9A7736] text-white">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 mt-4">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === img
                          ? 'border-[#C5A059] shadow-md scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="p-6 md:p-8 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center text-[#C5A059]">
                    <Star className="w-4 h-4 fill-[#C5A059]" />
                    <span className="ml-1 text-sm font-semibold text-[#0B1325]">{product.rating}</span>
                  </div>
                  <span className="text-xs text-[#718096]">({product.reviewCount} customer reviews)</span>
                  <span className="text-xs text-[#C5A059] font-medium">• 100% Purity Certified</span>
                </div>

                <h2 className="font-serif text-2xl font-bold text-[#0B1325] leading-snug">
                  {product.name}
                </h2>
                <p className="text-xs font-semibold text-[#9A7736] tracking-wide uppercase mt-1">
                  {product.subtitle}
                </p>

                <p className="text-xs text-[#556987] leading-relaxed mt-3">
                  {product.shortDescription}
                </p>

                {/* Sourcing Highlight */}
                {product.origin && (
                  <div className="mt-4 p-3 bg-[#FAF7F2] rounded-xl border border-[#EDE6D8] text-xs flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-[#0B1325]">Terroir Origin: </span>
                      <span className="text-[#556987]">{product.origin}</span>
                    </div>
                  </div>
                )}

                {/* Weight Variant Selector */}
                <div className="mt-5">
                  <label className="block text-xs font-bold text-[#0B1325] uppercase tracking-wider mb-2">
                    Select Packaging Size:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.weight}
                        type="button"
                        onClick={() => setSelectedWeight(v.weight)}
                        className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                          selectedWeight === v.weight
                            ? 'bg-[#0B1325] text-[#DFBF77] border-[#0B1325] shadow-sm'
                            : 'bg-[#FAF7F2] text-[#4A5568] border-[#EDE6D8] hover:border-[#C5A059]'
                        }`}
                      >
                        {v.weight}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pricing Display */}
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-[#0B1325]">
                    ₹{selectedVariant?.price.toLocaleString('en-IN')}
                  </span>
                  {selectedVariant?.originalPrice && (
                    <span className="text-sm text-[#A0AEC0] line-through">
                      ₹{selectedVariant.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-xs text-[#718096]">(Inclusive of all taxes)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-[#F3EFE6] space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-[#EDE6D8] rounded-xl bg-[#FAF7F2] px-3 py-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-6 text-sm font-bold text-[#4A5568] hover:text-[#0B1325]"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-[#0B1325]">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-6 text-sm font-bold text-[#4A5568] hover:text-[#0B1325]"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="flex-1 py-3 px-5 bg-[#0B1325] hover:bg-[#152238] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {isAdding ? (
                      <>
                        <Check className="w-4 h-4 text-[#C5A059]" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#DFBF77]" />
                        <span>Add to Royal Cart</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3 rounded-xl border transition-colors ${
                      isWishlisted
                        ? 'bg-red-50 text-red-600 border-red-200'
                        : 'border-[#EDE6D8] text-[#718096] hover:text-[#0B1325]'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-600' : ''}`} />
                  </button>
                </div>

                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-[#9A7736] hover:text-[#0B1325] transition-colors"
                >
                  <span>View Full Product Specifications & Terroir Notes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
