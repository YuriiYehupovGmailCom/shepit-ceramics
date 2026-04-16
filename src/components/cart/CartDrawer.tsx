/**
 * CartDrawer — Slide-over shopping cart using Shadcn Sheet.
 */

import { Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const {
    items,
    isOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-background">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl tracking-wide">
            Ваш кошик ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">
              Кошик порожній. Перегляньте нашу колекцію, щоб знайти щось особливе.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map(({ product, quantity }) => (
                <div key={product.slug} className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-sm bg-muted flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-sm font-medium truncate flex-1">
                        {product.name}
                      </h4>
                      {product.stockQty > 1 && (
                        <div className="flex items-center border border-border rounded-sm flex-shrink-0">
                          <button
                            onClick={() => updateQuantity(product.slug, quantity - 1)}
                            disabled={quantity <= 1}
                            className="w-7 h-7 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
                            aria-label="Зменшити"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-1 text-xs min-w-[20px] text-center">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.slug, quantity + 1)}
                            disabled={quantity >= product.stockQty}
                            className="w-7 h-7 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
                            aria-label="Збільшити"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() => removeFromCart(product.slug)}
                        className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                        aria-label="Видалити"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mt-0.5">
                      {product.price} ₴
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Підсумок</span>
                <span className="font-medium">{totalPrice} ₴</span>
              </div>
              <Separator />
              <Button
                onClick={() => { setCartOpen(false); navigate("/checkout"); }}
                className="w-full bg-primary text-primary-foreground hover:bg-primary-hover font-serif tracking-wider"
              >
                Оформити замовлення
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
