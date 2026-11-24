import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Sparkles, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

export default function CheckoutPage() {
  const { cart, cartSubtotal, discountAmount, shippingCost, cartTotal, appliedPromo, clearCart } = useCart();
  const { showToast } = useNotification();
  const navigate = useNavigate();

  // Form Fields
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Maharashtra',
    postalCode: '',
    deliveryMethod: 'express',
    paymentMethod: 'card',
    cardNumber: '4111 2222 3333 4444',
    cardExpiry: '12/28',
    cardCvv: '842',
    upiId: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !formData.email.includes('@')) newErrors.email = 'Valid email is required.';
    if (!formData.phone || formData.phone.length < 10) newErrors.phone = 'Valid 10-digit mobile number is required.';
    if (!formData.firstName) newErrors.firstName = 'First name is required.';
    if (!formData.lastName) newErrors.lastName = 'Last name is required.';
    if (!formData.address) newErrors.address = 'Street address is required.';
    if (!formData.city) newErrors.city = 'City is required.';
    if (!formData.postalCode || formData.postalCode.length < 6) newErrors.postalCode = 'Valid 6-digit PIN code is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please complete all mandatory delivery fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    // Create Order Record
    const orderId = 'TO-' + Math.floor(100000 + Math.random() * 900000);
    const orderRecord = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}${formData.apartment ? ', ' + formData.apartment : ''}, ${formData.city}, ${formData.state} - ${formData.postalCode}`
      },
      items: cart,
      subtotal: cartSubtotal,
      discount: discountAmount,
      promoCode: appliedPromo?.code || null,
      shipping: shippingCost,
      total: cartTotal,
      deliveryMethod: formData.deliveryMethod,
      paymentMethod: formData.paymentMethod,
      status: 'Confirmed & In Packaging'
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem('the_original_orders') || '[]');
      existingOrders.unshift(orderRecord);
      localStorage.setItem('the_original_orders', JSON.stringify(existingOrders));
      localStorage.setItem('the_original_last_order', JSON.stringify(orderRecord));
    } catch (err) {
      console.error("Order save error", err);
    }

    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate(`/order-confirmation/${orderId}`);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F2] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#0B1325] mb-2">No Items in Bag</h2>
        <p className="text-sm text-[#718096] mb-6">Please add items to your royal cart before proceeding to checkout.</p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-[#0B1325] text-[#DFBF77] text-xs font-semibold uppercase tracking-wider rounded-xl"
        >
          Explore Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="border-b border-[#EDE6D8] pb-6 mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#0B1325]">
              Royal Express Checkout
            </h1>
            <p className="text-xs text-[#718096] mt-1">
              Complete your delivery address and preferred settlement method
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0B1325] bg-white px-3 py-1.5 rounded-xl border border-[#EDE6D8]">
            <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* Integration Notice Alert Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-bold">Demonstration E-Commerce Mode: </strong>
            Real payment gateway keys (e.g., Razorpay, Stripe, or Cashfree) and logistics API credentials (BlueDart, Shiprocket) will be configured upon production deployment with client credentials. You can complete this checkout safely to test the full customer confirmation experience.
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Columns: Delivery & Payment Details */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Contact Information */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EDE6D8] shadow-sm space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#EDE6D8]">
                  <span className="w-6 h-6 rounded-full bg-[#0B1325] text-[#DFBF77] text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="font-serif text-base font-bold text-[#0B1325] uppercase tracking-wider">
                    Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1325] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. aditya@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs text-[#0B1325] focus:outline-none focus:border-[#C5A059] ${
                        errors.email ? 'border-red-500' : 'border-[#EDE6D8]'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1325] mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs text-[#0B1325] focus:outline-none focus:border-[#C5A059] ${
                        errors.phone ? 'border-red-500' : 'border-[#EDE6D8]'
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] text-red-600 mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery Address */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EDE6D8] shadow-sm space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#EDE6D8]">
                  <span className="w-6 h-6 rounded-full bg-[#0B1325] text-[#DFBF77] text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="font-serif text-base font-bold text-[#0B1325] uppercase tracking-wider">
                    Shipping & Delivery Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1325] mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Aditya"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs text-[#0B1325] focus:outline-none focus:border-[#C5A059] ${
                        errors.firstName ? 'border-red-500' : 'border-[#EDE6D8]'
                      }`}
                    />
                    {errors.firstName && <p className="text-[10px] text-red-600 mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1325] mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Mehta"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs text-[#0B1325] focus:outline-none focus:border-[#C5A059] ${
                        errors.lastName ? 'border-red-500' : 'border-[#EDE6D8]'
                      }`}
                    />
                    {errors.lastName && <p className="text-[10px] text-red-600 mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1325] mb-1">
                    Street Address & Building *
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="e.g. 42 Heritage Manor, Altamount Road"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-3.5 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs text-[#0B1325] focus:outline-none focus:border-[#C5A059] ${
                      errors.address ? 'border-red-500' : 'border-[#EDE6D8]'
                    }`}
                  />
                  {errors.address && <p className="text-[10px] text-red-600 mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1325] mb-1">
                      Apartment / Suite
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      placeholder="Penthouse 4B"
                      value={formData.apartment}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EDE6D8] rounded-xl text-xs text-[#0B1325] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1325] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Mumbai"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs text-[#0B1325] focus:outline-none focus:border-[#C5A059] ${
                        errors.city ? 'border-red-500' : 'border-[#EDE6D8]'
                      }`}
                    />
                    {errors.city && <p className="text-[10px] text-red-600 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1325] mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="400026"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={`w-full px-3.5 py-2.5 bg-[#FAF7F2] border rounded-xl text-xs text-[#0B1325] focus:outline-none focus:border-[#C5A059] ${
                        errors.postalCode ? 'border-red-500' : 'border-[#EDE6D8]'
                      }`}
                    />
                    {errors.postalCode && <p className="text-[10px] text-red-600 mt-1">{errors.postalCode}</p>}
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Simulation Selection */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EDE6D8] shadow-sm space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#EDE6D8]">
                  <span className="w-6 h-6 rounded-full bg-[#0B1325] text-[#DFBF77] text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="font-serif text-base font-bold text-[#0B1325] uppercase tracking-wider">
                    Settlement Method
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* Card Option */}
                  <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'border-[#0B1325] bg-[#FAF7F2] ring-1 ring-[#0B1325]'
                      : 'border-[#EDE6D8] bg-white hover:border-[#C5A059]'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="mt-1 accent-[#0B1325]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0B1325]">Credit / Debit Card (Simulated)</span>
                        <div className="flex gap-1 text-[10px] font-semibold text-[#718096]">
                          <span>Visa</span> • <span>Mastercard</span> • <span>Amex</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#718096] mt-0.5">Secure tokenized simulation</p>
                    </div>
                  </label>

                  {/* UPI Option */}
                  <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'upi'
                      ? 'border-[#0B1325] bg-[#FAF7F2] ring-1 ring-[#0B1325]'
                      : 'border-[#EDE6D8] bg-white hover:border-[#C5A059]'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleChange}
                      className="mt-1 accent-[#0B1325]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0B1325]">Instant UPI / QR Scan</span>
                        <span className="text-[10px] text-[#9A7736] font-semibold">GPay • PhonePe • Paytm</span>
                      </div>
                      <p className="text-[11px] text-[#718096] mt-0.5">Instant confirmation via VPA or QR code</p>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#0B1325] bg-[#FAF7F2] ring-1 ring-[#0B1325]'
                      : 'border-[#EDE6D8] bg-white hover:border-[#C5A059]'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="mt-1 accent-[#0B1325]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0B1325]">Pay on White-Glove Delivery (Cash/UPI)</span>
                        <span className="text-[10px] text-emerald-700 font-bold">Verified</span>
                      </div>
                      <p className="text-[11px] text-[#718096] mt-0.5">Settle with courier partner upon inspecting outer seal</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Order Summary Card & Place Order Action */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EDE6D8] shadow-lg space-y-6">
                <h3 className="font-serif text-lg font-bold text-[#0B1325] border-b border-[#EDE6D8] pb-3">
                  Review Your Order ({cart.length} creations)
                </h3>

                {/* Items preview */}
                <div className="divide-y divide-[#EDE6D8] max-h-72 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.cartItemId} className="py-3 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.image}
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover border border-[#EDE6D8] bg-[#FAF7F2] flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-serif font-bold text-[#0B1325] truncate">{item.name}</h4>
                          <span className="text-[11px] text-[#718096]">{item.weight} × {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-[#0B1325] flex-shrink-0">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals Breakdown */}
                <div className="space-y-2 pt-3 border-t border-[#EDE6D8] text-xs text-[#556987]">
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

                  <div className="flex justify-between">
                    <span>Royal Express Delivery</span>
                    <span className="font-semibold text-[#0B1325]">
                      {shippingCost === 0 ? <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span> : `₹${shippingCost}`}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-3 border-t border-[#EDE6D8] text-base">
                    <span className="font-bold text-[#0B1325]">Grand Total</span>
                    <span className="font-bold text-2xl text-[#0B1325]">
                      ₹{cartTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Complete Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#0B1325] hover:bg-[#152238] active:scale-[0.98] text-[#FDFBF7] text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 border border-[#C5A059]/40 group"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="w-4 h-4 text-[#C5A059] animate-spin" />
                      <span>Confirming Your Order...</span>
                    </>
                  ) : (
                    <>
                      <span>Authorize & Place Royal Order</span>
                      <ArrowRight className="w-4 h-4 text-[#DFBF77] group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#718096]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#9A7736]" />
                  <span>The Original Guarantee: 100% Purity & Authenticity</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
