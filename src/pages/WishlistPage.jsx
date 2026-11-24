import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { wishlist, clearWishlist, wishlistCount } = useWishlist();

  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  if (wishlistCount === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF7F2] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-white border border-[#EDE6D8] flex items-center justify-center mb-6 text-[#9A7736] shadow-sm">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#0B1325] mb-2">
          Your Wishlist is Empty
        </h1>
        <p className="text-sm text-[#718096] max-w-sm mb-8 leading-relaxed">
          Save your favourite single-origin spices and imperial dry fruits to revisit anytime.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-[#0B1325] hover:bg-[#152238] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
        >
          Explore Royal Treasures
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#EDE6D8] pb-6 mb-8 flex items-baseline justify-between">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1325]">
              Saved Royal Treasures
            </h1>
            <p className="text-xs text-[#718096] mt-1">
              {wishlistCount} {wishlistCount === 1 ? 'creation' : 'creations'} saved in your private vault
            </p>
          </div>

          <button
            onClick={clearWishlist}
            className="flex items-center gap-1.5 text-xs text-[#718096] hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Wishlist</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
