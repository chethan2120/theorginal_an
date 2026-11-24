import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    totalSavings,
    discountAmount,
    shippingCost,
    cartTotal,
    cartCount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    amountRemainingForFreeShipping,
    freeShippingProgress
  } = useCart();

  const { showToast } = useNotification();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyPromoCode(couponInput);
    if (res.success) {
      showToast(res.message, 'success');
      setCouponInput('');
      setCouponError('');
    } else {
      setCouponError(res.message);
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#070D1E]/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#C5A059]/30">
          {/* Header */}
          <div className="p-5 bg-[#0B1325] text-white flex items-center justify-between border-b border-[#C5A059]/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#152238] flex items-center justify-center border border-[#C5A059]/30">
                <ShoppingBag className="w-4 h-4 text-[#DFBF77]" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-semibold tracking-wide text-[#FDFBF7]">
                  Your Royal Cart
                </h2>
                <span className="text-xs text-[#C5A059] font-medium">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#DFBF77]/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3.5 bg-[#F3EFE6] border-b border-[#EDE6D8]">
            {amountRemainingForFreeShipping > 0 ? (
              <div>
                <div className="flex items-center justify-between text-xs text-[#0B1325] font-medium mb-1.5">
                  <span>Add <strong className="text-[#9A7736]">₹{amountRemainingForFreeShipping}</strong> more for Complimentary Delivery</span>
                  <span className="text-[#718096]">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-2 bg-[#EDE6D8] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#DFBF77] to-[#9A7736] transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>You have unlocked Complimentary Royal Express Shipping!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EDE6D8]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-[#F3EFE6] border border-[#EDE6D8] flex items-center justify-center mb-4 text-[#9A7736]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#0B1325] mb-2">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[#718096] max-w-xs mb-6">
                  Experience the richness of single-origin Indian spices and royal grade dry fruits.
                </p>
                <div className="flex flex-col gap-2.5 w-full max-w-xs">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/spices');
                    }}
                    className="w-full py-2.5 px-4 bg-[#0B1325] hover:bg-[#162238] text-[#FDFBF7] text-xs font-semibold tracking-wider uppercase rounded-xl transition-all"
                  >
                    Explore Royal Spices
                  </button>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/dry-fruits');
                    }}
                    className="w-full py-2.5 px-4 bg-[#F3EFE6] hover:bg-[#EDE6D8] text-[#0B1325] text-xs font-semibold tracking-wider uppercase rounded-xl transition-all border border-[#EDE6D8]"
                  >
                    Discover Imperial Dry Fruits
                  </button>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="py-4 flex gap-4 items-start">
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl border border-[#EDE6D8] bg-white flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.productId}`}
                      onClick={() => setIsCartOpen(false)}
                      className="font-serif text-sm font-semibold text-[#0B1325] hover:text-[#9A7736] transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-[#F3EFE6] text-[#4A5568] border border-[#EDE6D8]">
                        {item.weight}
                      </span>
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#EDE6D8] rounded-lg bg-white px-2 py-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-5 h-6 text-xs font-bold text-[#4A5568] hover:text-[#0B1325]"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#0B1325]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-5 h-6 text-xs font-bold text-[#4A5568] hover:text-[#0B1325]"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-[#0B1325]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        {item.originalPrice && (
                          <span className="block text-[10px] text-[#A0AEC0] line-through">
                            ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-[#A0AEC0] hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Area with Promo & Totals */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#EDE6D8] space-y-3 shadow-lg">
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="font-bold text-emerald-900">{appliedPromo.code}</span>
                        <span className="text-emerald-700 ml-1.5 font-medium">({appliedPromo.description})</span>
                      </div>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-emerald-700 hover:text-red-600 font-bold ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Privilege Code (e.g. ORIGINAL10)"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError('');
                      }}
                      className="flex-1 px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EDE6D8] rounded-xl focus:outline-none focus:border-[#C5A059] uppercase tracking-wider"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-[#0B1325] text-[#DFBF77] text-xs font-semibold rounded-xl hover:bg-[#152238] transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1 font-medium">{couponError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#556987] pt-2 border-t border-[#F3EFE6]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#0B1325]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Privilege Discount ({appliedPromo?.code})</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {totalSavings > 0 && !discountAmount && (
                  <div className="flex justify-between text-[#9A7736] font-medium">
                    <span>Retail Catalog Savings</span>
                    <span>-₹{totalSavings.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Royal Express Shipping</span>
                  <span className="font-semibold text-[#0B1325]">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-700 uppercase font-bold text-[11px]">Free</span>
                    ) : (
                      `₹${shippingCost}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-[#EDE6D8] text-sm">
                  <span className="font-bold text-[#0B1325]">Estimated Order Total</span>
                  <span className="font-bold text-lg text-[#0B1325]">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Primary Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="py-3 px-3 text-center border border-[#EDE6D8] bg-[#FAF7F2] hover:bg-[#F3EFE6] text-[#0B1325] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
                >
                  View Full Cart
                </button>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="py-3 px-3 flex items-center justify-center gap-1.5 bg-[#0B1325] hover:bg-[#152238] text-[#FDFBF7] text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md transition-all group"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#DFBF77] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#718096] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9A7736]" />
                <span>100% Purity Certified • Tamper-Proof Packaging</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
