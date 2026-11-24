import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, ChevronRight, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import BrandLogo from './BrandLogo';
import SearchModal from './SearchModal';

export default function Navbar() {
  const { cartCount, cartSubtotal, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Streamlined, high-end navigation links
  const navLinks = [
    { name: 'Shop All', path: '/shop' },
    { name: 'Spices', path: '/spices' },
    { name: 'Dry Fruits', path: '/dry-fruits' },
    { name: 'Collections', path: '/collections' },
    { name: 'Heritage', path: '/about' },
  ];

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[#EDE6D8]' : 'bg-[#FAF7F2] border-b border-[#EDE6D8]'
      }`}>
        {/* Streamlined Top Announcement Bar */}
        <div className="bg-[#0B1325] text-[#FDFBF7] text-[11px] py-1.5 px-4 border-b border-[#C5A059]/30 text-center">
          <p className="tracking-wide font-medium">
            Complimentary Royal Express Delivery on orders above <strong className="text-[#DFBF77]">₹999</strong> • Use Code <strong className="text-[#DFBF77] font-bold">ORIGINAL10</strong> for 10% Off
          </p>
        </div>

        {/* Main Navigation Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Left: Mobile Toggle & Brand Logo */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-[#0B1325] hover:text-[#9A7736] focus:outline-none"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <BrandLogo size="md" theme="light" />
            </div>

            {/* Center: Desktop Navigation Links (Spacious & Refined) */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs uppercase tracking-[0.2em] font-semibold transition-all py-1.5 relative hover:text-[#9A7736] ${
                      isActive
                        ? 'text-[#9A7736] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A059]'
                        : 'text-[#0B1325]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right: Actions (Search, Wishlist, Cart) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#0B1325] hover:text-[#9A7736] hover:bg-[#F3EFE6] rounded-full transition-all"
                aria-label="Search items"
                title="Search catalogue"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="relative p-2 text-[#0B1325] hover:text-[#9A7736] hover:bg-[#F3EFE6] rounded-full transition-all"
                aria-label="Wishlist"
                title="Saved treasures"
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#C5A059] text-[#0B1325] text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Cart Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 py-2 px-3 bg-[#0B1325] hover:bg-[#152238] text-[#FDFBF7] rounded-xl transition-all shadow-sm group border border-[#C5A059]/40 ml-1"
                aria-label="Open cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-[#DFBF77]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 bg-[#C5A059] text-[#0B1325] text-[8px] font-bold rounded-full flex items-center justify-center border border-white">
                      {cartCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-[11px] font-bold text-[#FDFBF7]">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#070D1E]/75 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF7F2] shadow-2xl flex flex-col justify-between p-6 border-r border-[#C5A059]/30">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#EDE6D8]">
                <BrandLogo size="sm" theme="light" />
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#718096] hover:text-[#0B1325]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 flex flex-col space-y-1">
                <NavLink
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-serif font-semibold text-[#0B1325] hover:bg-[#F3EFE6]"
                >
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </NavLink>
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-serif font-semibold tracking-wide transition-colors ${
                        isActive
                          ? 'bg-[#0B1325] text-[#DFBF77]'
                          : 'text-[#0B1325] hover:bg-[#F3EFE6] hover:text-[#9A7736]'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </NavLink>
                ))}
                <NavLink
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-serif font-semibold text-[#0B1325] hover:bg-[#F3EFE6]"
                >
                  <span>Contact & Gifting</span>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </NavLink>
              </nav>
            </div>

            {/* Bottom Concierge Card */}
            <div className="pt-6 border-t border-[#EDE6D8] text-xs space-y-2">
              <Link
                to="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between text-[#0B1325] font-semibold hover:text-[#9A7736] py-1"
              >
                <span>My Royal Account</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              </Link>
              <div className="flex items-center gap-2 text-[#718096] pt-1">
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Concierge Desk: 1800-419-7890</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
