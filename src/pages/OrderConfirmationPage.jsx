import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, Clock, Printer, ArrowRight, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import BrandLogo from '../components/BrandLogo';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const orders = JSON.parse(localStorage.getItem('the_original_orders') || '[]');
      const found = orders.find(o => o.orderId === orderId);
      if (found) {
        setOrder(found);
      } else {
        const lastOrder = JSON.parse(localStorage.getItem('the_original_last_order') || 'null');
        if (lastOrder && lastOrder.orderId === orderId) {
          setOrder(lastOrder);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  // Fallback order state if navigated directly
  const displayOrder = order || {
    orderId: orderId || 'TO-894210',
    createdAt: new Date().toISOString(),
    customer: {
      name: 'Aditya Mehta',
      email: 'aditya@gmail.com',
      phone: '9876543210',
      address: '42 Heritage Manor, Altamount Road, Mumbai, Maharashtra - 400026'
    },
    items: [
      {
        cartItemId: 'sample-1',
        name: 'Lakadong High-Curcumin Turmeric',
        weight: '250g',
        price: 649,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80'
      },
      {
        cartItemId: 'sample-2',
        name: 'King California Jumbo Almonds (Nonpareil Supreme 20/22)',
        weight: '500g',
        price: 749,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1508061252445-5350f37f3747?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 1398,
    discount: 140,
    promoCode: 'ORIGINAL10',
    shipping: 0,
    total: 1258,
    paymentMethod: 'card',
    status: 'Confirmed & In Packaging'
  };

  // Estimated delivery date: 3 business days from now
  const estDate = new Date();
  estDate.setDate(estDate.getDate() + 3);
  const formattedEstDate = estDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header Banner */}
        <div className="bg-[#0B1325] text-white p-8 sm:p-12 rounded-3xl border-2 border-[#C5A059]/40 shadow-2xl text-center space-y-4 mb-10 relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-[#152238] border-2 border-[#C5A059] flex items-center justify-center mx-auto text-[#DFBF77]">
            <CheckCircle2 className="w-8 h-8 text-[#C5A059]" />
          </div>

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#DFBF77] block">
            The Royal Seal of Confirmation
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FDFBF7]">
            Thank You For Your Patronage
          </h1>

          <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-lg mx-auto leading-relaxed">
            Your order <strong className="text-[#DFBF77]">#{displayOrder.orderId}</strong> has been received by our master cellars. We have dispatched a confirmation digest to <strong>{displayOrder.customer.email}</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-[#DFBF77]">
            <span className="flex items-center gap-1.5 bg-[#152238] px-3 py-1.5 rounded-lg border border-[#C5A059]/30">
              <Clock className="w-4 h-4 text-[#C5A059]" /> Estimated Arrival: {formattedEstDate}
            </span>
            <span className="flex items-center gap-1.5 bg-[#152238] px-3 py-1.5 rounded-lg border border-[#C5A059]/30">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" /> Tamper-Proof Nitrogen Vault
            </span>
          </div>
        </div>

        {/* Live Order Tracking Interactive Simulator */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EDE6D8] shadow-sm mb-10">
          <h3 className="font-serif text-base font-bold text-[#0B1325] uppercase tracking-wider mb-6">
            Dispatch Timeline & Quality Verification
          </h3>

          <div className="relative">
            <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#EDE6D8] -translate-y-1/2 z-0" />
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative z-10">
              {/* Step 1 */}
              <div className="flex sm:flex-col items-center sm:text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0B1325] text-[#DFBF77] border-2 border-[#C5A059] flex items-center justify-center font-bold text-xs shadow-md">
                  ✓
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#0B1325]">Order Confirmed</h4>
                  <p className="text-[10px] text-[#718096]">Payment simulated & approved</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex sm:flex-col items-center sm:text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0B1325] text-[#DFBF77] border-2 border-[#C5A059] flex items-center justify-center font-bold text-xs shadow-md animate-pulse">
                  2
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#0B1325]">Terroir Packaging</h4>
                  <p className="text-[10px] text-[#9A7736] font-semibold">Nitrogen flush & wax seal</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex sm:flex-col items-center sm:text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#718096] border border-[#EDE6D8] flex items-center justify-center text-xs">
                  3
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#718096]">Express Dispatch</h4>
                  <p className="text-[10px] text-[#A0AEC0]">BlueDart Luxury Courier</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex sm:flex-col items-center sm:text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#718096] border border-[#EDE6D8] flex items-center justify-center text-xs">
                  4
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-[#718096]">White-Glove Delivery</h4>
                  <p className="text-[10px] text-[#A0AEC0]">Doorstep presentation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice & Order Summary Details */}
        <div className="bg-white rounded-2xl border border-[#EDE6D8] shadow-lg overflow-hidden mb-10 print:border-none">
          {/* Header */}
          <div className="p-6 sm:p-8 bg-[#FAF7F2] border-b border-[#EDE6D8] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <BrandLogo size="md" />
            <div className="text-right text-xs">
              <span className="font-bold text-[#0B1325] block">Invoice #{displayOrder.orderId}</span>
              <span className="text-[#718096]">{new Date(displayOrder.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Delivery & Billing Address */}
          <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-[#EDE6D8] text-xs">
            <div>
              <span className="font-bold text-[#0B1325] uppercase tracking-wider block mb-1">
                Recipient Details:
              </span>
              <p className="font-bold text-sm text-[#0B1325]">{displayOrder.customer.name}</p>
              <p className="text-[#556987] mt-0.5">{displayOrder.customer.email}</p>
              <p className="text-[#556987]">Phone: {displayOrder.customer.phone}</p>
            </div>

            <div>
              <span className="font-bold text-[#0B1325] uppercase tracking-wider block mb-1">
                Destination Address:
              </span>
              <p className="text-[#556987] leading-relaxed">
                {displayOrder.customer.address}
              </p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded bg-[#FAF7F2] border border-[#EDE6D8] text-[11px] font-semibold text-[#0B1325]">
                Method: {displayOrder.paymentMethod.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Items Table */}
          <div className="p-6 sm:p-8 divide-y divide-[#EDE6D8]">
            {displayOrder.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-[#FAF7F2] border border-[#EDE6D8]" />
                  <div>
                    <h4 className="font-serif font-bold text-[#0B1325]">{item.name}</h4>
                    <span className="text-[11px] text-[#718096]">Weight: {item.weight} × {item.quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-[#0B1325]">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Financial Breakdown */}
          <div className="p-6 sm:p-8 bg-[#FAF7F2] border-t border-[#EDE6D8] space-y-2 text-xs text-[#556987]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-[#0B1325]">₹{displayOrder.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {displayOrder.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Privilege Discount ({displayOrder.promoCode})</span>
                <span>-₹{displayOrder.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Express Delivery</span>
              <span className="font-bold text-[#0B1325]">{displayOrder.shipping === 0 ? 'Complimentary' : `₹${displayOrder.shipping}`}</span>
            </div>
            <div className="flex justify-between items-baseline pt-3 border-t border-[#EDE6D8] text-sm">
              <span className="font-bold text-[#0B1325]">Total Setteled</span>
              <span className="font-bold text-2xl text-[#0B1325]">
                ₹{displayOrder.total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-[#F3EFE6] text-[#0B1325] text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-[#EDE6D8] flex items-center justify-center gap-2 shadow-sm"
          >
            <Printer className="w-4 h-4 text-[#9A7736]" />
            <span>Print Official Receipt</span>
          </button>

          <Link
            to="/shop"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#0B1325] hover:bg-[#152238] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Continue Exploring Treasures</span>
            <ArrowRight className="w-4 h-4 text-[#DFBF77]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
