import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShieldCheck, ShoppingBag, Tag, Check, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
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
  const [giftNote, setGiftNote] = useState('');

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

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F2] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 rounded-full bg-white border border-[#EDE6D8] flex items-center justify-center mb-6 text-[#9A7736] shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#0B1325] mb-2">
          Your Royal Bag is Empty
        </h1>
        <p className="text-sm text-[#718096] max-w-md mb-8 leading-relaxed">
          You haven't selected any fine spices or colossal dry fruits yet. Discover our single-origin harvests from across India and beyond.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/spices"
            className="px-8 py-3.5 bg-[#0B1325] hover:bg-[#152238] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
          >
            Explore Royal Spices
          </Link>
          <Link
            to="/dry-fruits"
            className="px-8 py-3.5 bg-white hover:bg-[#F3EFE6] text-[#0B1325] text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-[#EDE6D8]"
          >
            Imperial Dry Fruits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="border-b border-[#EDE6D8] pb-6 mb-8 flex flex-col sm:flex-row items-baseline justify-between gap-2">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325]">
              Your Royal Cart
            </h1>
            <p className="text-xs text-[#718096] mt-1">
              Review your selected spice terroirs and imperial dry fruits ({cartCount} items)
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-[#718096] hover:text-red-600 transition-colors"
          >
            Clear Entire Bag
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="p-4 bg-white rounded-2xl border border-[#EDE6D8] shadow-sm mb-8">
          {amountRemainingForFreeShipping > 0 ? (
            <div>
              <div className="flex items-center justify-between text-xs text-[#0B1325] font-medium mb-1.5">
                <span>Add <strong className="text-[#9A7736]">₹{amountRemainingForFreeShipping}</strong> more to qualify for <strong>Complimentary Royal Express Delivery</strong></span>
                <span className="text-[#718096]">{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-2.5 bg-[#FAF7F2] rounded-full overflow-hidden border border-[#EDE6D8]">
                <div
                  className="h-full bg-gradient-to-r from-[#DFBF77] to-[#9A7736] transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
              <Check className="w-4 h-4 text-[#C5A059]" />
              <span>Complimentary Royal Express Shipping Unlocked!</span>
            </div>
          )}
        </div>

        {/* Main Grid: Cart Items (8 cols) + Order Summary (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#EDE6D8] shadow-sm divide-y divide-[#EDE6D8] overflow-hidden">
            <div className="p-4 bg-[#FAF7F2] text-[11px] font-bold uppercase tracking-wider text-[#718096] hidden sm:grid sm:grid-cols-12">
              <span className="sm:col-span-6">Product Details</span>
              <span className="sm:col-span-2 text-center">Unit Price</span>
              <span className="sm:col-span-2 text-center">Quantity</span>
              <span className="sm:col-span-2 text-right">Subtotal</span>
            </div>

            {cart.map((item) => (
              <div key={item.cartItemId} className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* Product Info */}
                <div className="sm:col-span-6 flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover border border-[#EDE6D8] bg-[#FAF7F2] flex-shrink-0"
                  />
                  <div>
                    <Link
                      to={`/product/${item.productId}`}
                      className="font-serif text-sm sm:text-base font-bold text-[#0B1325] hover:text-[#9A7736] transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#FAF7F2] text-[#4A5568] border border-[#EDE6D8]">
                      Size: {item.weight}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="flex items-center gap-1 text-[11px] text-[#A0AEC0] hover:text-red-600 transition-colors mt-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                {/* Unit Price */}
                <div className="sm:col-span-2 sm:text-center text-xs font-semibold text-[#556987]">
                  <span className="sm:hidden font-bold text-[#0B1325] mr-2">Unit:</span>
                  ₹{item.price.toLocaleString('en-IN')}
                </div>

                {/* Quantity Controls */}
                <div className="sm:col-span-2 flex items-center sm:justify-center">
                  <div className="flex items-center border border-[#EDE6D8] rounded-xl bg-[#FAF7F2] px-2 py-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="w-6 h-7 text-xs font-bold text-[#4A5568] hover:text-[#0B1325]"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-[#0B1325]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="w-6 h-7 text-xs font-bold text-[#4A5568] hover:text-[#0B1325]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Line Total */}
                <div className="sm:col-span-2 text-left sm:text-right">
                  <span className="sm:hidden font-bold text-[#0B1325] mr-2">Total:</span>
                  <span className="text-sm font-bold text-[#0B1325]">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}

            {/* Optional Gift Message Box */}
            <div className="p-6 bg-[#FAF7F2] border-t border-[#EDE6D8]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B1325] mb-2">
                <MessageSquare className="w-4 h-4 text-[#9A7736]" />
                <span>Complimentary Royal Gift Card Message</span>
              </div>
              <textarea
                rows={2}
                placeholder="Include a personal gift message to be calligraphed on our embossed parchment card..."
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                className="w-full p-3 bg-white border border-[#EDE6D8] rounded-xl text-xs text-[#0B1325] focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          {/* Right: Order Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-[#EDE6D8] p-6 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#0B1325] border-b border-[#EDE6D8] pb-3">
                Order Summary
              </h3>

              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-emerald-900">{appliedPromo.code}</span>
                      <p className="text-emerald-700 text-[11px]">{appliedPromo.description}</p>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-xs font-bold text-emerald-800 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Privilege Code"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError('');
                      }}
                      className="flex-1 px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EDE6D8] rounded-xl uppercase tracking-wider focus:outline-none focus:border-[#C5A059]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#0B1325] text-[#DFBF77] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#152238] transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1">{couponError}</p>
                )}
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      applyPromoCode('ORIGINAL10');
                      showToast("Privilege code 'ORIGINAL10' applied!", 'success');
                    }}
                    className="text-[10px] text-[#9A7736] font-medium bg-[#FAF7F2] px-2 py-1 rounded border border-[#EDE6D8] hover:border-[#C5A059] inline-flex items-center gap-1"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    <span>ORIGINAL10 (10% Off)</span>
                  </button>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs text-[#556987] pt-2 border-t border-[#EDE6D8]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#0B1325]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Privilege Discount ({appliedPromo?.code})</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {totalSavings > 0 && !discountAmount && (
                  <div className="flex justify-between text-[#9A7736] font-semibold">
                    <span>Retail Catalog Savings</span>
                    <span>-₹{totalSavings.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Royal Express Shipping</span>
                  <span className="font-semibold text-[#0B1325]">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
                    ) : (
                      `₹${shippingCost}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-3 border-t border-[#EDE6D8] text-base">
                  <span className="font-bold text-[#0B1325]">Total Amount</span>
                  <span className="font-bold text-2xl text-[#0B1325]">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-[#0B1325] hover:bg-[#152238] text-[#FDFBF7] text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group border border-[#C5A059]/40"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#DFBF77] group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-[#718096]">
                <ShieldCheck className="w-4 h-4 text-[#9A7736]" />
                <span>100% Purity Certified • Tamper-Proof Packaging</span>
              </div>
            </div>

            {/* Support Concierge Card */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EDE6D8] text-xs text-[#556987]">
              <span className="font-semibold text-[#0B1325] block mb-1">Need assistance with your order?</span>
              <p className="text-[11px] leading-relaxed">
                Contact our Royal Concierge team at 1800-419-7890 or email concierge@theoriginal.in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
