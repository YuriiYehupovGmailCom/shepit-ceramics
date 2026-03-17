/**
 * CartDrawer — Slide-over shopping cart using Shadcn Sheet.
 * 
 * HOW IT WORKS:
 * - Controlled by `isOpen` and `setCartOpen` from CartContext.
 * - Lists all items with quantity controls (+/−).
 * - Shows subtotal at the bottom.
 * - Uses Shadcn's Sheet component for the drawer behavior.
 */

import { Minus, Plus, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";

const CartDrawer = () => {
  const {
    items,
    isOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
    totalItems,
  } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-background">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl tracking-wide">
            Your Bag ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {/* Cart items list — scrollable middle section */}
        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">
              Your bag is empty. Explore our collection to find something you love.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4">
                  {/* Product thumbnail */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-sm bg-muted"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-medium truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {product.nameUk}
                    </p>
                    <p className="text-sm font-medium mt-1">
                      {product.price} {product.currency}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center border border-border rounded-sm hover:bg-muted transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm w-6 text-center">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-border rounded-sm hover:bg-muted transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal and checkout */}
            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{totalPrice} UAH</span>
              </div>
              <Separator />
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-hover font-serif tracking-wider">
                Proceed to Checkout
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Shipping calculated at checkout
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
