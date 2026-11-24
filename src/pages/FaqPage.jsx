import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Phone } from 'lucide-react';
import { FAQS } from '../data/faqs';
import { Link } from 'react-router-dom';

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredFaqs = FAQS.map(cat => {
    const matchingQuestions = cat.questions.filter(q =>
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...cat,
      questions: matchingQuestions
    };
  }).filter(cat => cat.questions.length > 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#9A7736]">
            Patron Inquiries
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325]">
            Frequently Asked Questions
          </h1>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto" />
          <p className="text-xs sm:text-sm text-[#556987]">
            Insights into our certified GI origins, laboratory purity protocols, and express courier handling.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-10 max-w-xl mx-auto">
          <Search className="w-4 h-4 text-[#718096] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g., curcumin, shelf life, Ceylon cinnamon, shipping)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-[#EDE6D8] rounded-xl text-xs text-[#0B1325] shadow-sm focus:outline-none focus:border-[#C5A059]"
          />
        </div>

        {/* FAQ Categories & Accordions */}
        <div className="space-y-10">
          {filteredFaqs.map((cat, catIdx) => (
            <div key={cat.category} className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#0B1325] border-b border-[#EDE6D8] pb-2">
                {cat.category}
              </h2>

              <div className="space-y-3">
                {cat.questions.map((item, qIdx) => {
                  const key = `${catIdx}-${qIdx}`;
                  const isOpen = openItems[key];

                  return (
                    <div
                      key={qIdx}
                      className="bg-white rounded-2xl border border-[#EDE6D8] shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(catIdx, qIdx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                      >
                        <span className="font-serif text-sm font-semibold text-[#0B1325]">
                          {item.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#9A7736] flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#718096] flex-shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs text-[#556987] leading-relaxed border-t border-[#F3EFE6]">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions banner */}
        <div className="mt-16 p-8 bg-[#0B1325] text-white rounded-3xl border border-[#C5A059]/40 text-center space-y-3">
          <h3 className="font-serif text-xl font-bold text-white">
            Have a question not addressed here?
          </h3>
          <p className="text-xs text-[#CBD5E1] max-w-md mx-auto">
            Our luxury concierge desk is available to assist you with batch test reports, custom corporate orders, or bespoke spice curation.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A059] hover:bg-[#DFBF77] text-[#070D1E] text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Concierge Desk</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
