import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, Sparkles, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { useNotification } from '../context/NotificationContext';

export default function CollectionsPage() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { showToast } = useNotification();

  // Corporate Inquiry Form state
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryCompany, setInquiryCompany] = useState('');
  const [inquiryQuantity, setInquiryQuantity] = useState('25-50');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const collections = PRODUCTS.filter(p => p.category === 'collections');

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail) {
      showToast('Please provide your name and work email.', 'error');
      return;
    }
    setInquirySubmitted(true);
    showToast('Your bespoke gifting inquiry has been submitted to the Concierge!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 lg:py-20">
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero Banner */}
        <div className="relative bg-[#0B1325] text-white rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-[#C5A059]/40 shadow-2xl overflow-hidden mb-16">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#152238] border border-[#C5A059]/40 text-[#DFBF77] text-xs font-semibold uppercase tracking-widest">
              <Gift className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Royal Heirlooms & Festive Hampers</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Gift Chests & Hampers
            </h1>

            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              Curated for monumental celebrations, luxury weddings, and distinguished corporate gifting. Encased in handcrafted solid teakwood chests, brass-hinged spice vaults, and signature navy-blue velvet trunks embossed with our metallic gold seal.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#DFBF77]">
              <span className="flex items-center gap-1.5 bg-[#152238] px-3 py-1.5 rounded-lg border border-[#C5A059]/30">
                <Sparkles className="w-4 h-4 text-[#C5A059]" /> Bespoke Wax-Sealed Calligraphy
              </span>
              <span className="flex items-center gap-1.5 bg-[#152238] px-3 py-1.5 rounded-lg border border-[#C5A059]/30">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" /> Pan-India Temperature-Regulated Dispatch
              </span>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="mb-20">
          <div className="border-b border-[#EDE6D8] pb-4 mb-8">
            <h2 className="font-serif text-2xl font-bold text-[#0B1325]">
              Signature Gift Vaults
            </h2>
            <p className="text-xs text-[#718096]">
              Ready for immediate order with complimentary gift messaging
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>

        {/* Bespoke Corporate & Wedding Gifting Concierge Section */}
        <div className="bg-white rounded-3xl border border-[#EDE6D8] p-8 sm:p-12 lg:p-16 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">
                Bespoke Concierge
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#0B1325]">
                Custom Corporate & Wedding Orders
              </h3>
              <p className="text-xs sm:text-sm text-[#556987] leading-relaxed">
                Elevate your organization's festive gifts or wedding favors. Our dedicated luxury gifting manager will assist with:
              </p>

              <div className="space-y-3 text-xs text-[#0B1325]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <span>Custom metal brass plaques etched with your company or family insignia.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <span>Curated spice and dry fruit assortments tailored to your budget and recipient tastes.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <span>Individual doorstep delivery across 28 states with live dispatch dashboard tracking.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <span>Tax-compliant GST invoicing and dedicated account executive support.</span>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#EDE6D8]">
              {inquirySubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#0B1325]">
                    Inquiry Received
                  </h4>
                  <p className="text-xs text-[#556987] max-w-sm mx-auto leading-relaxed">
                    Thank you. Our Senior Gifting Concierge will reach out within 4 business hours with our bespoke catalogue and tier-pricing sheet.
                  </p>
                  <button
                    onClick={() => setInquirySubmitted(false)}
                    className="text-xs font-semibold text-[#9A7736] hover:underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <h4 className="font-serif text-lg font-bold text-[#0B1325] border-b border-[#EDE6D8] pb-3">
                    Request Bespoke Gifting Catalogue
                  </h4>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0B1325] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Singhania"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#EDE6D8] rounded-xl text-xs text-[#0B1325] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0B1325] mb-1">
                        Work / Personal Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="vikram@singhania.com"
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#EDE6D8] rounded-xl text-xs text-[#0B1325] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0B1325] mb-1">
                        Organization / Family Name
                      </label>
                      <input
                        type="text"
                        placeholder="Singhania Capital"
                        value={inquiryCompany}
                        onChange={(e) => setInquiryCompany(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#EDE6D8] rounded-xl text-xs text-[#0B1325] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0B1325] mb-1">
                      Estimated Hamper Quantity
                    </label>
                    <select
                      value={inquiryQuantity}
                      onChange={(e) => setInquiryQuantity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#EDE6D8] rounded-xl text-xs text-[#0B1325] focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="10-25">10 – 25 Hampers</option>
                      <option value="25-50">25 – 50 Hampers</option>
                      <option value="50-100">50 – 100 Hampers</option>
                      <option value="100+">100+ Hampers (Custom Insignia Engraving)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0B1325] hover:bg-[#152238] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#DFBF77]" />
                    <span>Connect with Gifting Concierge</span>
                  </button>

                  <p className="text-[10px] text-[#718096] text-center">
                    Confidentiality assured. We respect your corporate privacy.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
