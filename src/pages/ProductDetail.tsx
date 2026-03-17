/**
 * ProductDetail — Individual product page with image gallery, description,
 * and "Add to Bag" functionality.
 *
 * ROUTING: Uses the `:slug` param from react-router to find the product.
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
import { getProductBySlug, products } from "@/data/products";
import ProductGrid from "@/components/home/ProductGrid";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // 404 handling
  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-foreground mb-4">Product not found</h1>
          <Link to="/" className="text-primary hover:text-primary-hover transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Add the product `quantity` times
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
        {/* Back link */}
        <Link
          to="/collection"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image gallery */}
          <div>
            <div className="aspect-square overflow-hidden bg-muted rounded-sm mb-4">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnail strip (for multiple images) */}
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
              {product.category}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-1">
              {product.name}
            </h1>
            <p className="text-sm text-muted-foreground italic mb-4">
              {product.nameUk}
            </p>
            <p className="text-xl font-medium text-foreground mb-6">
              {product.price} {product.currency}
            </p>

            <Separator className="mb-6" />

            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Details list */}
            <ul className="space-y-1 mb-8">
              {product.details.map((detail, i) => (
                <li key={i} className="text-sm text-muted-foreground">
                  • {detail}
                </li>
              ))}
            </ul>

            {/* Quantity selector + Add to bag */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-border rounded-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 hover:bg-muted transition-colors"
                  aria-label="Decrease"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 py-2 text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 hover:bg-muted transition-colors"
                  aria-label="Increase"
                >
                  <Plus size={14} />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary-hover font-serif tracking-wider text-sm py-6"
              >
                Add to Bag — {product.price * quantity} {product.currency}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Free shipping on orders over 3000 UAH
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
