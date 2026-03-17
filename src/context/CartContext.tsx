/**
 * CartContext — Global shopping cart state management.
 *
 * HOW IT WORKS:
 * 1. CartProvider wraps the entire app (in App.tsx).
 * 2. Any component can call `useCart()` to access cart state & actions.
 * 3. State is stored in React context + useState (resets on page refresh).
 *    For persistence, you'd save to localStorage or a database.
 *
 * ACTIONS:
 * - addToCart(product)    → adds item or increments quantity
 * - removeFromCart(id)    → removes item entirely
 * - updateQuantity(id, q) → sets specific quantity (removes if 0)
 * - clearCart()           → empties the cart
 * - toggleCartOpen()      → opens/closes the cart drawer
 */

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/data/products";

// A cart item is a product plus a quantity
export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCartOpen: () => void;
  setCartOpen: (open: boolean) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Add a product — if it's already in the cart, increment quantity
  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    // Open the cart drawer to give feedback
    setIsOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);
  const toggleCartOpen = () => setIsOpen((prev) => !prev);
  const setCartOpen = (open: boolean) => setIsOpen(open);

  // Derived values
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCartOpen,
        setCartOpen,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * Custom hook to access cart state.
 * Must be used inside a <CartProvider>.
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
