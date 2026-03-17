/**
 * ProductDetail — Individual product page with image gallery, description,
 * and "Add to Bag" functionality.
 */

import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { getProductBySlug } from "@/data/products";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-foreground mb-4">Товар не знайдено</h1>
          <Link to="/" className="text-primary hover:text-primary-hover transition-colors">
            ← На головну
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="max-w-7xl mx-auto px-6 md:px-16 py-8">
        <Link
          to="/collection"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Повернутися до колекції
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image gallery */}
          <div>
            <div className="aspect-square overflow-hidden bg-muted rounded-sm mb-4">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.nameUk}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`w-16 h-16 overflow-hidden rounded-sm border-2 transition-colors ${
                      i === selectedImageIndex ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
              {product.categoryUk}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-1">
              {product.nameUk}
            </h1>
            <p className="text-xl font-medium text-foreground mb-6">
              {product.price} {product.currency}
            </p>

            <Separator className="mb-6" />

            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.descriptionUk}
            </p>

            <ul className="space-y-1 mb-8">
              {product.detailsUk.map((detail, i) => (
                <li key={i} className="text-sm text-muted-foreground">
                  • {detail}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-border rounded-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 hover:bg-muted transition-colors"
                  aria-label="Зменшити"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 py-2 text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 hover:bg-muted transition-colors"
                  aria-label="Збільшити"
                >
                  <Plus size={14} />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary-hover font-serif tracking-wider text-sm py-6"
              >
                Додати в кошик — {product.price * quantity} {product.currency}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Безкоштовна доставка від 3000 ₴
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
