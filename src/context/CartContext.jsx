import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROMO_CODES } from '../data/products';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('the_original_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(() => {
    try {
      const saved = localStorage.getItem('the_original_promo');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('the_original_cart', JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem('the_original_promo', JSON.stringify(appliedPromo));
      } else {
        localStorage.removeItem('the_original_promo');
      }
    } catch (e) {
      console.error("Failed to save promo to localStorage", e);
    }
  }, [appliedPromo]);

  const addToCart = (product, selectedWeight, quantity = 1) => {
    const variant = product.variants.find(v => v.weight === selectedWeight) || product.variants[0];
    const cartItemId = `${product.id}-${variant.weight}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            productId: product.id,
            name: product.name,
            subtitle: product.subtitle,
            category: product.category,
            image: product.images[0],
            weight: variant.weight,
            price: variant.price,
            originalPrice: variant.originalPrice,
            quantity
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartOriginalTotal = cart.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0);
  const totalSavings = (cartOriginalTotal - cartSubtotal);

  // Promo Calculation
  let discountAmount = 0;
  if (appliedPromo) {
    if (cartSubtotal >= (appliedPromo.minOrder || 0)) {
      if (appliedPromo.type === 'percentage') {
        discountAmount = Math.round((cartSubtotal * appliedPromo.value) / 100);
      } else if (appliedPromo.type === 'flat') {
        discountAmount = appliedPromo.value;
      }
    }
  }

  // Free shipping threshold: ₹999
  const FREE_SHIPPING_THRESHOLD = 999;
  const shippingCost = cart.length === 0 || cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99;
  const amountRemainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const promo = PROMO_CODES[cleanCode];
    if (!promo) {
      return { success: false, message: "Invalid promotional code." };
    }
    if (cartSubtotal < (promo.minOrder || 0)) {
      return {
        success: false,
        message: `Order must be at least ₹${promo.minOrder} to unlock code ${cleanCode}.`
      };
    }
    setAppliedPromo({ ...promo, code: cleanCode });
    return { success: true, message: `Privilege code '${cleanCode}' successfully applied!` };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartOriginalTotal,
        totalSavings,
        discountAmount,
        shippingCost,
        cartTotal,
        cartCount,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        FREE_SHIPPING_THRESHOLD,
        amountRemainingForFreeShipping,
        freeShippingProgress
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
