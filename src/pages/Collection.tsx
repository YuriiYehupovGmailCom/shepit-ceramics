/**
 * Collection — Full product listing page with category filter.
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import { products } from "@/data/products";

const categories = ["all", "earrings", "pendants", "brooches", "bracelets"] as const;

const Collection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const fadeRef = useScrollFadeIn();

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        <div ref={fadeRef} className="fade-up mb-10">
          <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-2">
            Collection
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Browse our full range of handcrafted ceramic jewelry.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-sm rounded-sm border transition-colors capitalize ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="group block"
            >
              <div className="aspect-square overflow-hidden bg-muted rounded-sm mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-sm md:text-base font-medium text-foreground group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">{product.nameUk}</p>
              <p className="text-sm font-medium text-foreground mt-1">
                {product.price} {product.currency}
              </p>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Collection;
