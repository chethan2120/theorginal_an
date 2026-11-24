import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.origin.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleSelectProduct = (productId) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const popularSearches = [
    "Lakadong Turmeric",
    "Alleppey Cardamom",
    "King Cashews W180",
    "Kashmiri Saffron",
    "Ceylon Cinnamon",
    "Antep Pistachios",
    "Spice Chest"
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#070D1E]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative mx-auto max-w-2xl transform rounded-2xl bg-[#FAF7F2] shadow-2xl border border-[#C5A059]/40 overflow-hidden">
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-[#EDE6D8] px-4 py-3.5 bg-white">
          <Search className="w-5 h-5 text-[#9A7736] mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search rare spices, colossal dry fruits, origin terroirs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[#0B1325] placeholder-[#A0AEC0] focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-[#A0AEC0] hover:text-[#0B1325]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-3 px-2 py-1 text-xs text-[#718096] hover:text-[#0B1325] rounded bg-[#FAF7F2] border border-[#EDE6D8]"
          >
            ESC
          </button>
        </form>

        {/* Results / Suggestions */}
        <div className="p-5 max-h-96 overflow-y-auto">
          {query.trim() === '' ? (
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#9A7736] block mb-2.5">
                Popular Discoveries
              </span>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                      navigate(`/shop?search=${encodeURIComponent(term)}`);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-[#0B1325] border border-[#EDE6D8] hover:border-[#C5A059] hover:bg-[#F3EFE6] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-2">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#718096] block mb-2">
                Matching Products ({filteredProducts.length})
              </span>
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelectProduct(p.id)}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-white hover:bg-[#F3EFE6] border border-[#EDE6D8] hover:border-[#C5A059]/40 cursor-pointer transition-all group"
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-12 h-12 rounded-lg object-cover bg-[#FAF7F2] border border-[#EDE6D8]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-semibold text-[#0B1325] group-hover:text-[#9A7736] transition-colors line-clamp-1">
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-[#718096] truncate">
                      {p.origin} • From ₹{p.variants[0].price}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[#C5A059] text-xs font-semibold pr-2">
                    <Star className="w-3.5 h-3.5 fill-[#C5A059]" />
                    <span>{p.rating}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#A0AEC0] group-hover:text-[#0B1325] group-hover:translate-x-1 transition-all" />
                </div>
              ))}

              <button
                type="button"
                onClick={handleSearchSubmit}
                className="w-full mt-3 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[#9A7736] hover:text-[#0B1325] bg-white rounded-xl border border-[#EDE6D8]"
              >
                View all results for "{query}"
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm font-semibold text-[#0B1325]">No matching royal treasures found</p>
              <p className="text-xs text-[#718096] mt-1">Try searching for turmeric, pepper, cardamom, cashews, or almonds.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
