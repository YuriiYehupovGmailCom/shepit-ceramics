/**
 * ProductDetail — Individual product page with image gallery, description,
 * and "Add to Bag" functionality.
 *
 * IMAGE GALLERY STATE:
 * - `selectedImageIndex` tracks which image is shown in the main view.
 * - Clicking a thumbnail updates this index instantly.
 * - On mobile, touch swipe gestures cycle through images.
 */

import {useParams, Link, useNavigate, useLocation} from "react-router-dom";
import { useState, useRef, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useProduct } from "@/lib/sanity/products";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: product, isLoading, isError } = useProduct(slug);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // --- Image gallery state ---
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [product?.slug]);

  const handleBack = () => {
    if (location.state?.from === "collection") {
      navigate(-1);
    } else {
      navigate("/collection");
    }
  };

  // Navigate to next/previous image (wraps around)
  const goToImage = useCallback(
    (direction: 1 | -1) => {
      if (!product) return;
      setSelectedImageIndex((prev) =>
        (prev + direction + product.images.length) % product.images.length
      );
    },
    [product]
  );

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      goToImage(diff > 0 ? 1 : -1);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Завантаження товару...</p>
      </div>
    );
  }

  if (isError || !product) {
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

  const hasMultipleImages = product.images.length > 1;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-background">
      {product && (
        <Helmet>
          <title>{product.name} — Shepit Ceramics</title>
          <meta name="description" content={product.description || `${product.name} — керамічна прикраса ручної роботи`} />
          <meta property="og:title" content={`${product.name} — Shepit Ceramics`} />
          <meta property="og:description" content={product.description || `Керамічна прикраса ручної роботи`} />
          <meta property="og:image" content={product.image} />
          <meta property="og:type" content="product" />
          <link rel="canonical" href={`https://shepit-ceramics.com/product/${product.slug}`} />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": product.name,
              "description": product.description,
              "image": product.images,
              "offers": {
                "@type": "Offer",
                "price": product.price,
                "priceCurrency": "UAH",
                "availability": product.stockQty > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
              }
            })}
          </script>
        </Helmet>
      )}
      <Header />
      <CartDrawer />

      <main className="max-w-7xl mx-auto px-6 md:px-16 py-8">
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Повернутися до колекції
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* ===== IMAGE GALLERY ===== */}
          <div>
            {/* Main image with swipe support */}
            <div
              className="relative aspect-square overflow-hidden bg-muted rounded-sm mb-4 cursor-pointer group"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={product.images[selectedImageIndex]}
                alt={`${product.name} — фото ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />

              {/* Navigation arrows (visible on hover, desktop only) */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={() => goToImage(-1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-background/70 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                    aria-label="Попереднє фото"
                  >
                    <ChevronLeft size={18} className="text-foreground" />
                  </button>
                  <button
                    onClick={() => goToImage(1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-background/70 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                    aria-label="Наступне фото"
                  >
                    <ChevronRight size={18} className="text-foreground" />
                  </button>
                </>
              )}

              {/* Mobile dots indicator */}
              {hasMultipleImages && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden">
                  {product.images.map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === selectedImageIndex
                          ? "bg-foreground"
                          : "bg-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail row — visible when multiple images exist */}
            {hasMultipleImages && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-sm border-2 transition-all ${
                      i === selectedImageIndex
                        ? "border-primary ring-1 ring-primary/30"
                        : "border-transparent hover:border-muted-foreground/30"
                    }`}
                    aria-label={`Фото ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ===== PRODUCT INFO ===== */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
              {product.categoryUk}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-1">
              {product.name}
            </h1>
            <p className="text-xl font-medium text-foreground mb-6">
              {product.price} ₴
            </p>

            <Separator className="mb-6" />

            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>

            <ul className="space-y-1 mb-8">
              {product.details.map((detail, i) => (
                <li key={i} className="text-sm text-muted-foreground">
                  • {detail}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 mb-4">
              {product.stockQty > 1 && (
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
                    onClick={() => setQuantity((q) => Math.min(product.stockQty, q + 1))}
                    className="px-3 py-2 hover:bg-muted transition-colors"
                    aria-label="Збільшити"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              )}

              <Button
                onClick={handleAddToCart}
                className={product.stockQty > 1 ? "flex-1" : "w-full"}
                variant="default"
                size="lg"
              >
                Додати в кошик — {product.price * quantity} ₴
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
