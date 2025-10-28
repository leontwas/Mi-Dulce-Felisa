import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Cake, CartContextType, CartItem } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (cake: Cake) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === cake.id);
      
      if (existingItem) {
        return currentCart.map(item =>
          item.id === cake.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentCart, { ...cake, quantity: 1 }];
    });
  };

  const removeFromCart = (cakeId: string) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === cakeId);
      
      if (existingItem && existingItem.quantity > 1) {
        return currentCart.map(item =>
          item.id === cakeId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      
      return currentCart.filter(item => item.id !== cakeId);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  
  return context;
};