import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, MapPin, Award, Clock, ArrowRight, ShieldCheck, LogOut } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

export default function AccountPage() {
  const { showToast } = useNotification();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('the_original_orders') || '[]');
      setOrders(savedOrders);
    } catch {
      setOrders([]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card Header */}
        <div className="bg-[#0B1325] text-white p-6 sm:p-10 rounded-3xl border-2 border-[#C5A059]/40 shadow-2xl mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#152238] border-2 border-[#C5A059] flex items-center justify-center text-[#DFBF77] font-serif text-2xl font-bold">
                TO
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FDFBF7]">
                    Aditya Mehta
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C5A059] text-[#070D1E]">
                    Gold Patron
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] mt-1">
                  aditya.mehta@example.com • Patron Since 2024
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 border-t sm:border-t-0 sm:border-l border-[#1E293B] pt-4 sm:pt-0 sm:pl-8 text-xs">
              <div>
                <span className="text-[10px] text-[#94A3B8] uppercase block">Royal Circle Points</span>
                <span className="font-serif text-2xl font-bold text-[#DFBF77]">1,450</span>
              </div>
              <div>
                <span className="text-[10px] text-[#94A3B8] uppercase block">Total Orders</span>
                <span className="font-serif text-2xl font-bold text-[#DFBF77]">{Math.max(orders.length, 1)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Orders History (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-[#EDE6D8] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#EDE6D8] pb-4">
              <h2 className="font-serif text-xl font-bold text-[#0B1325] flex items-center gap-2">
                <Package className="w-5 h-5 text-[#9A7736]" />
                <span>Your Order History</span>
              </h2>
              <span className="text-xs text-[#718096]">
                {orders.length} past orders
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="py-8 text-center space-y-3">
                <p className="text-xs text-[#718096]">You haven't placed an order yet in this browser session.</p>
                <Link
                  to="/shop"
                  className="inline-block px-5 py-2.5 bg-[#0B1325] text-[#DFBF77] text-xs font-semibold rounded-xl uppercase tracking-wider"
                >
                  Discover Collections
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.orderId} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EDE6D8] space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                      <div>
                        <span className="font-bold text-[#0B1325]">Order #{ord.orderId}</span>
                        <span className="text-[#718096] ml-2">
                          {new Date(ord.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {ord.status || 'Confirmed'}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#556987]">
                      {ord.items.map((it, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="line-clamp-1">{it.quantity}x {it.name} ({it.weight})</span>
                          <span className="font-bold text-[#0B1325]">₹{(it.price * it.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#EDE6D8] text-xs">
                      <span className="font-bold text-[#0B1325]">Total: ₹{ord.total.toLocaleString('en-IN')}</span>
                      <Link
                        to={`/order-confirmation/${ord.orderId}`}
                        className="text-[#9A7736] font-semibold hover:text-[#0B1325] flex items-center gap-1"
                      >
                        <span>View Tracking</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Address & Club Privileges (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#EDE6D8] shadow-sm space-y-4">
              <h3 className="font-serif text-base font-bold text-[#0B1325] flex items-center gap-2 border-b border-[#EDE6D8] pb-3">
                <MapPin className="w-4 h-4 text-[#9A7736]" />
                <span>Default Delivery Vault</span>
              </h3>
              <div className="text-xs text-[#556987] leading-relaxed">
                <strong className="text-[#0B1325] block mb-1">Aditya Mehta (Primary Residence)</strong>
                <p>42 Heritage Manor, Penthouse 4B</p>
                <p>Altamount Road, Cumballa Hill</p>
                <p>Mumbai, Maharashtra – 400026</p>
                <p className="mt-2 text-[#718096]">Phone: +91 98765 43210</p>
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#EDE6D8] space-y-3">
              <h3 className="font-serif text-sm font-bold text-[#0B1325] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#9A7736]" />
                <span>The Original Privilege Club</span>
              </h3>
              <p className="text-xs text-[#556987] leading-relaxed">
                As a Gold Patron, you receive complimentary express shipping on all orders, private previews of seasonal saffron and cardamom harvests, and dedicated concierge access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
