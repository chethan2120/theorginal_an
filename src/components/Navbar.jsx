import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, ChevronDown, Menu, X, ArrowRight, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import BrandLogo from './BrandLogo';
import SearchModal from './SearchModal';

export default function Navbar() {
  const { cartCount, cartSubtotal, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsShopDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsShopDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-300 relative ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-[#C5A059]/40 py-0.5'
          : 'bg-[#FAF7F2] border-b border-[#EDE6D8]'
      }`}>
        {/* Dynamic Scroll Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#C5A059] via-[#DFBF77] to-[#C5A059] transition-all duration-150 z-50 pointer-events-none"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Top Announcement Bar */}
        <div className="bg-[#0B1325] text-[#FDFBF7] text-[10.5px] py-1 px-4 border-b border-[#C5A059]/30 text-center">
          <p className="tracking-wide font-medium">
            Complimentary Royal Express Delivery on orders above <strong className="text-[#DFBF77]">₹999</strong> • Use Code <strong className="text-[#DFBF77] font-bold">ORIGINAL10</strong> for 10% Off
          </p>
        </div>

        {/* Main Navigation Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-[70px]'}`}>
            {/* Left: Mobile Toggle, Brand Logo & Page Context */}
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

            {/* Center: Desktop Navigation Links (Strictly: Home, Shop [dropdown], Why Us, About Us, Contact Us) */}
            <nav className="hidden lg:flex items-center gap-7">
              {/* 1. Home */}
              <NavLink
                to="/"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  const hero = document.getElementById('hero-section');
                  if (hero) hero.scrollIntoView({ behavior: 'smooth' });
                }}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-[0.2em] font-semibold transition-all py-2 relative hover:text-[#9A7736] ${
                    isActive
                      ? 'text-[#9A7736] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A059]'
                      : 'text-[#0B1325]'
                  }`
                }
              >
                Home
              </NavLink>

              {/* 2. Shop with Interactive Mega Menu Dropdown */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setIsShopDropdownOpen(true)}
                onMouseLeave={() => setIsShopDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsShopDropdownOpen(prev => !prev)}
                  className={`flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-semibold py-2 transition-colors hover:text-[#9A7736] ${
                    isShopDropdownOpen || location.pathname.startsWith('/shop') || location.pathname.startsWith('/spices') || location.pathname.startsWith('/dry-fruits')
                      ? 'text-[#9A7736]'
                      : 'text-[#0B1325]'
                  }`}
                  aria-expanded={isShopDropdownOpen}
                >
                  <span>Shop</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isShopDropdownOpen ? 'rotate-180 text-[#9A7736]' : ''}`} />
                </button>

                {/* Mega Dropdown Panel matching user image */}
                {isShopDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[820px] bg-white rounded-2xl shadow-2xl border border-[#EDE6D8] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* 3 Visual Cards Side by Side */}
                    <div className="p-4 grid grid-cols-3 gap-3 bg-white">
                      {/* Card 1: Dry Fruits */}
                      <Link
                        to="/dry-fruits"
                        onClick={() => setIsShopDropdownOpen(false)}
                        className="group relative rounded-xl overflow-hidden aspect-[4/3] block bg-[#0B1325] border border-slate-100 hover:border-[#C5A059] transition-all shadow-sm hover:shadow-md"
                      >
                        <img
                          src="/images/mega/user_dry_fruits_card.jpg"
                          onError={(e) => { e.currentTarget.src = "/images/mega/dry-fruits-mega.jpg"; }}
                          alt="Dry Fruits Assortment"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-3.5">
                          <h4 className="font-serif text-base font-bold text-white group-hover:text-[#DFBF77] transition-colors leading-snug">
                            Dry Fruits
                          </h4>
                          <p className="text-[11px] text-slate-200 mt-0.5 line-clamp-1 font-normal">
                            Nature's goodness in every...
                          </p>
                        </div>
                      </Link>

                      {/* Card 2: Whole Spices */}
                      <Link
                        to="/spices?type=whole"
                        onClick={() => setIsShopDropdownOpen(false)}
                        className="group relative rounded-xl overflow-hidden aspect-[4/3] block bg-[#0B1325] border border-slate-100 hover:border-[#C5A059] transition-all shadow-sm hover:shadow-md"
                      >
                        <img
                          src="/images/mega/user_whole_spices_card.jpg"
                          onError={(e) => { e.currentTarget.src = "/images/mega/whole-spices-mega.jpg"; }}
                          alt="Whole Spices Assortment"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-3.5">
                          <h4 className="font-serif text-base font-bold text-white group-hover:text-[#DFBF77] transition-colors leading-snug">
                            Whole Spices
                          </h4>
                          <p className="text-[11px] text-slate-200 mt-0.5 line-clamp-1 font-normal">
                            Small ingredients. Extraordinary...
                          </p>
                        </div>
                      </Link>

                      {/* Card 3: Spice Powders */}
                      <Link
                        to="/spices?type=ground"
                        onClick={() => setIsShopDropdownOpen(false)}
                        className="group relative rounded-xl overflow-hidden aspect-[4/3] block bg-[#0B1325] border border-slate-100 hover:border-[#C5A059] transition-all shadow-sm hover:shadow-md"
                      >
                        <img
                          src="/images/mega/spice-powders-mega.jpg"
                          onError={(e) => { e.currentTarget.src = "/images/mega/spice-powders-banner.jpg"; }}
                          alt="Spice Powders Assortment"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-3.5">
                          <h4 className="font-serif text-base font-bold text-white group-hover:text-[#DFBF77] transition-colors leading-snug">
                            Spice Powders
                          </h4>
                          <p className="text-[11px] text-slate-200 mt-0.5 line-clamp-1 font-normal">
                            Everyday essentials that bring...
                          </p>
                        </div>
                      </Link>
                    </div>

                    {/* Bottom Bar: Weight-based packs / View all products */}
                    <div className="px-5 py-3 border-t border-[#EDE6D8] bg-[#FAF7F2] flex items-center justify-between">
                      <span className="text-xs text-[#556987] font-medium tracking-wide">
                        Weight-based packs • 100% Single Origin
                      </span>
                      <Link
                        to="/shop"
                        onClick={() => setIsShopDropdownOpen(false)}
                        className="text-xs font-bold text-[#0B1325] hover:text-[#9A7736] flex items-center gap-1.5 transition-colors group"
                      >
                        <span>View all products</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Why Us */}
              <NavLink
                to="/why-us"
                className={({ isActive }) =>
                  `text-xs uppercase tracking-[0.2em] font-semibold transition-all py-2 relative hover:text-[#9A7736] ${
                    isActive
                      ? 'text-[#9A7736] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A059]'
                      : 'text-[#0B1325]'
                  }`
                }
              >
                Why Us
              </NavLink>

              {/* 4. About Us */}
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-xs uppercase tracking-[0.2em] font-semibold transition-all py-2 relative hover:text-[#9A7736] ${
                    isActive
                      ? 'text-[#9A7736] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A059]'
                      : 'text-[#0B1325]'
                  }`
                }
              >
                About Us
              </NavLink>

              {/* 5. Contact Us */}
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-xs uppercase tracking-[0.2em] font-semibold transition-all py-2 relative hover:text-[#9A7736] ${
                    isActive
                      ? 'text-[#9A7736] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A059]'
                      : 'text-[#0B1325]'
                  }`
                }
              >
                Contact Us
              </NavLink>
            </nav>

            {/* Right: Actions (Search, Profile, Wishlist, Cart) */}
            <div className="flex items-center gap-1.5 sm:gap-2">
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

              {/* Profile Link */}
              <Link
                to="/account"
                className="flex items-center gap-1.5 p-2 text-[#0B1325] hover:text-[#9A7736] hover:bg-[#F3EFE6] rounded-full transition-all"
                aria-label="Profile"
                title="My Account"
              >
                <User className="w-4 h-4" />
                <span className="hidden xl:inline text-xs font-semibold uppercase tracking-wider text-[#0B1325]">Profile</span>
              </Link>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="relative flex items-center gap-1.5 p-2 text-[#0B1325] hover:text-[#9A7736] hover:bg-[#F3EFE6] rounded-full transition-all"
                aria-label="Wishlist"
                title="Saved Wishlist"
              >
                <div className="relative">
                  <Heart className="w-4 h-4" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#C5A059] text-[#0B1325] text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span className="hidden xl:inline text-xs font-semibold uppercase tracking-wider text-[#0B1325]">Wishlist</span>
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

              {/* Mobile Navigation Links */}
              <nav className="mt-6 flex flex-col space-y-1">
                <NavLink
                  to="/"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-serif font-semibold text-[#0B1325] hover:bg-[#F3EFE6]"
                >
                  <span>Home</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </NavLink>

                {/* Shop Subcategories */}
                <div className="pt-2 pb-1">
                  <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-[#9A7736] block mb-1">
                    Shop Categories
                  </span>
                  <Link
                    to="/dry-fruits"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-[#0B1325] hover:bg-[#F3EFE6]"
                  >
                    <span>Dry Fruits</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                  </Link>
                  <Link
                    to="/spices?type=whole"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-[#0B1325] hover:bg-[#F3EFE6]"
                  >
                    <span>Whole Spices</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                  </Link>
                  <Link
                    to="/spices?type=ground"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-[#0B1325] hover:bg-[#F3EFE6]"
                  >
                    <span>Spice Powders</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                  </Link>
                  <Link
                    to="/shop"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-[#9A7736] hover:bg-[#F3EFE6]"
                  >
                    <span>View All Products</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                  </Link>
                </div>

                <NavLink
                  to="/why-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-serif font-semibold text-[#0B1325] hover:bg-[#F3EFE6]"
                >
                  <span>Why Us</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </NavLink>

                <NavLink
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-serif font-semibold text-[#0B1325] hover:bg-[#F3EFE6]"
                >
                  <span>About Us</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </NavLink>

                <NavLink
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-serif font-semibold text-[#0B1325] hover:bg-[#F3EFE6]"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </NavLink>
              </nav>
            </div>

            {/* Bottom Mobile Account & Concierge */}
            <div className="pt-6 border-t border-[#EDE6D8] text-xs space-y-2">
              <Link
                to="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between text-[#0B1325] font-semibold hover:text-[#9A7736] py-1"
              >
                <span>Profile / My Account</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between text-[#0B1325] font-semibold hover:text-[#9A7736] py-1"
              >
                <span>Wishlist ({wishlistCount})</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
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
