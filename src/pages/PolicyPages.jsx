import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';

export function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#EDE6D8] shadow-sm space-y-6 text-xs sm:text-sm text-[#556987] leading-relaxed">
        <div className="flex items-center gap-3 border-b border-[#EDE6D8] pb-4">
          <Truck className="w-6 h-6 text-[#9A7736]" />
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1325]">
            Shipping & Royal Delivery Policy
          </h1>
        </div>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0B1325]">1. Complimentary Express Delivery</h2>
          <p>
            THE ORIGINAL provides Complimentary Royal Express Courier Delivery on all domestic orders exceeding ₹999 across all serviceable PIN codes in India. For orders below ₹999, a nominal white-glove transport charge of ₹99 is applied at checkout.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0B1325]">2. Processing & Packaging Protocols</h2>
          <p>
            Every order is freshly packaged from our central humidity-controlled cellars in Mumbai. Whole spices and jumbo dry fruits are nitrogen-flushed and hand-sealed in protective UV barrier tin vessels within 24 hours of order receipt. Orders placed before 1:00 PM IST are dispatched on the same business day.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0B1325]">3. Transit Timelines</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Tier 1 Metro Hubs (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> 24 to 48 business hours.</li>
            <li><strong>Tier 2 & Regional Capitols:</strong> 2 to 4 business days.</li>
            <li><strong>Special Himalayan & Island Terroirs:</strong> 4 to 6 business days via dedicated priority air courier.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0B1325]">4. Tamper-Evident Security Seals</h2>
          <p>
            Each parcel is sealed with a serialized metallic gold security tape. If you suspect any tampering, seal breach, or outer box damage, please refuse delivery and notify our concierge desk immediately at 1800-419-7890.
          </p>
        </section>
      </div>
    </div>
  );
}

export function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#EDE6D8] shadow-sm space-y-6 text-xs sm:text-sm text-[#556987] leading-relaxed">
        <div className="flex items-center gap-3 border-b border-[#EDE6D8] pb-4">
          <RotateCcw className="w-6 h-6 text-[#9A7736]" />
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1325]">
            Returns & Purity Replacement Policy
          </h1>
        </div>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0B1325]">1. The Purity Guarantee</h2>
          <p>
            Because our spices and dry fruits are culinary perishables packed without artificial chemical preservatives, returns of opened food canisters for subjective preference are restricted. However, we maintain an unconditional replacement guarantee if any product fails our rigorous freshness or lab purity standards.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0B1325]">2. Damaged or Defective Items</h2>
          <p>
            In the rare event that a tin is dented during transit or a seal arrives broken, please contact our Concierge at <strong className="text-[#0B1325]">concierge@theoriginal.in</strong> within 48 hours of delivery with a photograph of the parcel. We will immediately dispatch an expedited replacement at no extra charge or issue a full store credit refund.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0B1325]">3. Order Cancellation</h2>
          <p>
            Orders can be cancelled free of charge before the packaging and nitrogen flush phase has commenced (typically within 2 hours of placement). Once handed over to the courier partner, cancellation is no longer possible.
          </p>
        </section>
      </div>
    </div>
  );
}

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#EDE6D8] shadow-sm space-y-6 text-xs sm:text-sm text-[#556987] leading-relaxed">
        <div className="flex items-center gap-3 border-b border-[#EDE6D8] pb-4">
          <Lock className="w-6 h-6 text-[#9A7736]" />
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1325]">
            Privacy & Data Protection Policy
          </h1>
        </div>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0B1325]">1. Respect for Patron Privacy</h2>
          <p>
            THE ORIGINAL Fine Spices & Dry Fruits Pvt. Ltd. is committed to protecting your personal information. We never sell, rent, or monetize patron contact lists or purchase histories with third-party advertising brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0B1325]">2. Information We Collect</h2>
          <p>
            We collect only the details strictly required to fulfill and deliver your royal orders: name, billing/shipping address, email address, phone number, and optional personalized gift messages.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0B1325]">3. Payment Gateway Security</h2>
          <p>
            Financial payment details (credit card numbers, UPI credentials) are processed exclusively through certified PCI-DSS Level 1 compliant gateway partners with 256-bit SSL encryption. We never store complete card numbers or CVV codes on our servers.
          </p>
        </section>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#EDE6D8] shadow-sm space-y-6 text-xs sm:text-sm text-[#556987] leading-relaxed">
        <div className="flex items-center gap-3 border-b border-[#EDE6D8] pb-4">
          <ShieldCheck className="w-6 h-6 text-[#9A7736]" />
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1325]">
            Terms of Service & Royal Standard
          </h1>
        </div>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0B1325]">1. Acceptance of Terms</h2>
          <p>
            By accessing or placing an order through THE ORIGINAL website, you agree to be bound by these Terms of Service and all applicable laws and regulations governing gourmet food retailing in India.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0B1325]">2. Natural Harvest Variations</h2>
          <p>
            As our spices and dry fruits are 100% natural and free of artificial coloring agents or chemical bleaches, slight organic variations in berry diameter, curcumin color hue, or pod tint reflect authentic agricultural terroirs and weather seasonality.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#0B1325]">3. Intellectual Property</h2>
          <p>
            The trademark "THE ORIGINAL", the monogram emblem, packaging designs, terroir chronicles, and photographs are the exclusive intellectual property of THE ORIGINAL Fine Spices & Dry Fruits Pvt. Ltd.
          </p>
        </section>
      </div>
    </div>
  );
}
