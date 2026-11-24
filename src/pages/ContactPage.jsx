import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

export default function ContactPage() {
  const { showToast } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all mandatory fields.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been received by our Royal Concierge.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">
            Patron Concierge
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0B1325]">
            Contact THE ORIGINAL
          </h1>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto" />
          <p className="text-xs sm:text-sm text-[#556987] leading-relaxed">
            Our luxury culinary concierge is at your service for order inquiries, bespoke wedding & corporate gifting, and lab purity certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Information Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EDE6D8] shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#0B1325] border-b border-[#EDE6D8] pb-4">
                Concierge Desks
              </h3>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B1325] text-[#DFBF77] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#C5A059]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#718096] block">
                    Toll-Free Helpline
                  </span>
                  <a href="tel:18004197890" className="font-serif text-base font-bold text-[#0B1325] hover:text-[#9A7736]">
                    1800-419-7890
                  </a>
                  <p className="text-[11px] text-[#718096] mt-0.5">Monday to Saturday, 9:00 AM – 8:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B1325] text-[#DFBF77] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#C5A059]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#718096] block">
                    Patron Concierge
                  </span>
                  <a href="mailto:concierge@theoriginal.in" className="font-serif text-sm font-bold text-[#0B1325] hover:text-[#9A7736]">
                    concierge@theoriginal.in
                  </a>
                  <p className="text-[11px] text-[#718096] mt-0.5">Average response time: 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B1325] text-[#DFBF77] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#C5A059]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#718096] block">
                    Corporate Flagship Cellar
                  </span>
                  <p className="font-serif text-sm font-bold text-[#0B1325]">
                    The Heritage Pavilions
                  </p>
                  <p className="text-[11px] text-[#556987] leading-relaxed mt-0.5">
                    4th Floor, Marine Lines, Mumbai, Maharashtra 400020
                  </p>
                </div>
              </div>
            </div>

            {/* Corporate Desk Callout */}
            <div className="p-6 bg-[#0B1325] text-white rounded-3xl border border-[#C5A059]/40 shadow-lg space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#DFBF77] block">
                Bespoke Corporate Gifting
              </span>
              <h4 className="font-serif text-base font-bold text-[#FDFBF7]">
                Executive & Festive Hampers
              </h4>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                For custom brass branding, bulk festive shipments (10+ hampers), or chef collaborations, contact our corporate department directly at <strong className="text-[#DFBF77]">gifting@theoriginal.in</strong>.
              </p>
            </div>
          </div>

          {/* Right: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#EDE6D8] shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0B1325]">
                  Message Dispatched
                </h3>
                <p className="text-xs text-[#556987] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your correspondence has been logged. A luxury concierge representative will reply to <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', inquiryType: 'general', message: '' });
                  }}
                  className="px-6 py-2.5 bg-[#FAF7F2] hover:bg-[#F3EFE6] text-[#0B1325] text-xs font-semibold rounded-xl border border-[#EDE6D8]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#0B1325] border-b border-[#EDE6D8] pb-3">
                  Send a Concierge Request
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1325] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Singhania"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EDE6D8] rounded-xl text-xs text-[#0B1325] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1325] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. vikram@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EDE6D8] rounded-xl text-xs text-[#0B1325] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1325] mb-1">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EDE6D8] rounded-xl text-xs text-[#0B1325] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1325] mb-1">
                      Purpose of Inquiry
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EDE6D8] rounded-xl text-xs text-[#0B1325] focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="general">General Inquiries & Orders</option>
                      <option value="gifting">Bespoke Wedding & Corporate Gifting</option>
                      <option value="purity">GC-MS Laboratory Test Certificates</option>
                      <option value="wholesale">Masterchef & Fine Dining Sourcing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1325] mb-1">
                    Your Message / Detailed Request *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe how our concierge may assist you..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3.5 bg-[#FAF7F2] border border-[#EDE6D8] rounded-xl text-xs text-[#0B1325] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0B1325] hover:bg-[#152238] text-[#FDFBF7] text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group border border-[#C5A059]/40"
                >
                  <Send className="w-4 h-4 text-[#DFBF77]" />
                  <span>Transmit Concierge Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
