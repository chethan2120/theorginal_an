import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, Award, Leaf, ArrowRight, Check } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { useNotification } from '../context/NotificationContext';
import { CinematicFooter } from './ui/motion-footer';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useNotification();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast('Welcome to The Royal Circle! Use code ORIGINAL10 for 10% off.', 'success');
    setEmail('');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Value Pillars Banner */}
      <div className="border-y border-[#C5A059]/25 bg-[#0B1325]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-xl bg-[#152238] border border-[#C5A059]/30 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-[#DFBF77]" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-[#FDFBF7]">Certified GI Terroirs</h4>
                <p className="text-xs text-[#A0AEC0]">Single-origin authentic provenance</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-xl bg-[#152238] border border-[#C5A059]/30 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#DFBF77]" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-[#FDFBF7]">7-Stage Lab Certified</h4>
                <p className="text-xs text-[#A0AEC0]">Zero dyes, fillers, or adulterants</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-xl bg-[#152238] border border-[#C5A059]/30 flex items-center justify-center flex-shrink-0">
                <Leaf className="w-6 h-6 text-[#DFBF77]" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-[#FDFBF7]">Nitrogen Fresh Sealed</h4>
                <p className="text-xs text-[#A0AEC0]">Preserving delicate volatile oils</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-xl bg-[#152238] border border-[#C5A059]/30 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">👑</span>
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-[#FDFBF7]">Complimentary Express</h4>
                <p className="text-xs text-[#A0AEC0]">Free delivery on orders over ₹999</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Corporate Details & Newsletter */}
      <footer className="bg-[#070D1E] text-[#FAF7F2] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand Bio & Seal */}
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-block bg-[#0B1325] p-2 rounded-xl border border-[#C5A059]/40 shadow-md">
                <BrandLogo size="md" theme="dark" />
              </div>

              <p className="text-xs text-[#CBD5E1] leading-relaxed max-w-md pt-2">
                THE ORIGINAL is purveyor to those who understand that authentic flavor begins in the soil. We bypass commodity spice aggregators to deliver pristine, single-origin GI harvests and royal grade dry fruits directly to connoisseurs.
              </p>

              {/* Newsletter Subscription */}
              <div className="pt-4">
                <span className="text-xs font-serif font-semibold text-[#DFBF77] tracking-wider uppercase block mb-2">
                  Join The Royal Circle
                </span>
                <p className="text-[11px] text-[#94A3B8] mb-3">
                  Receive private reserve harvest invitations and a 10% welcome privilege code.
                </p>
                {isSubscribed ? (
                  <div className="flex items-center gap-2 p-3 bg-[#152238] rounded-xl border border-[#C5A059]/40 text-xs text-[#DFBF77]">
                    <Check className="w-4 h-4 text-[#C5A059]" />
                    <span>Privilege code <strong>ORIGINAL10</strong> is active for your cart!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-[#0F172A] border border-[#334155] rounded-xl text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#C5A059]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#C5A059] hover:bg-[#DFBF77] text-[#070D1E] text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1 shadow-md"
                    >
                      <span>Join</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Quick Links: Spices */}
            <div>
              <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#DFBF77] mb-4">
                Royal Spices
              </h4>
              <ul className="space-y-2.5 text-xs text-[#CBD5E1]">
                <li><Link to="/spices" className="hover:text-[#DFBF77] transition-colors">Lakadong Turmeric (7.8%)</Link></li>
                <li><Link to="/spices" className="hover:text-[#DFBF77] transition-colors">Alleppey 8mm Cardamom</Link></li>
                <li><Link to="/spices" className="hover:text-[#DFBF77] transition-colors">Tellicherry TGSEB Pepper</Link></li>
                <li><Link to="/spices" className="hover:text-[#DFBF77] transition-colors">Alba Ceylon Cinnamon</Link></li>
                <li><Link to="/spices" className="hover:text-[#DFBF77] transition-colors">Kashmiri Mongra Saffron</Link></li>
                <li><Link to="/spices" className="hover:text-[#DFBF77] transition-colors">Guntur Stemless Chillies</Link></li>
              </ul>
            </div>

            {/* Quick Links: Dry Fruits & Reserves */}
            <div>
              <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#DFBF77] mb-4">
                Imperial Dry Fruits
              </h4>
              <ul className="space-y-2.5 text-xs text-[#CBD5E1]">
                <li><Link to="/dry-fruits" className="hover:text-[#DFBF77] transition-colors">King Cashews (W180 Jumbo)</Link></li>
                <li><Link to="/dry-fruits" className="hover:text-[#DFBF77] transition-colors">California Nonpareil Almonds</Link></li>
                <li><Link to="/dry-fruits" className="hover:text-[#DFBF77] transition-colors">Antep Roasted Pistachios</Link></li>
                <li><Link to="/dry-fruits" className="hover:text-[#DFBF77] transition-colors">Diamond Medjool Dates</Link></li>
                <li><Link to="/dry-fruits" className="hover:text-[#DFBF77] transition-colors">Chilean Light Walnuts</Link></li>
                <li><Link to="/origins" className="hover:text-[#DFBF77] transition-colors">Single-Origin Reserves</Link></li>
              </ul>
            </div>

            {/* Concierge Desk & Legal */}
            <div>
              <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#DFBF77] mb-4">
                Client Concierge
              </h4>
              <div className="space-y-3 text-xs text-[#CBD5E1]">
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#94A3B8] block text-[10px]">Toll-Free Helpline</span>
                    <a href="tel:18004197890" className="hover:text-white font-medium">1800-419-7890</a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#94A3B8] block text-[10px]">Patron Concierge</span>
                    <a href="mailto:concierge@theoriginal.in" className="hover:text-white font-medium">concierge@theoriginal.in</a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed text-[#94A3B8]">
                    The Heritage Pavilions, Marine Lines, Mumbai 400020
                  </p>
                </div>

                <div className="pt-2 border-t border-[#1E293B] space-y-1 text-[11px]">
                  <Link to="/shipping-policy" className="block text-[#94A3B8] hover:text-[#DFBF77]">Shipping & Delivery</Link>
                  <Link to="/returns-policy" className="block text-[#94A3B8] hover:text-[#DFBF77]">Returns & Refunds</Link>
                  <Link to="/privacy-policy" className="block text-[#94A3B8] hover:text-[#DFBF77]">Privacy Policy</Link>
                  <Link to="/terms" className="block text-[#94A3B8] hover:text-[#DFBF77]">Terms of Service</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* The Cinematic Motion Footer (with smooth parallax, magnetic pills, and marquee) */}
      <CinematicFooter />
    </div>
  );
}
