/**
 * Collection — Full product listing page with category filter.
 */

import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import { useProducts } from "@/lib/sanity/products";
import { useCategories } from "@/lib/sanity/categories";

const Collection = () => {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState<string>(urlCategory);
  const fadeRef = useScrollFadeIn();
  const { data: products = [], isLoading: productsLoading, isError: productsError } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const allCategories = [
    { key: "all", label: "Усі" },
    ...categories.map((cat) => ({ key: cat.slug, label: cat.title })),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        <div ref={fadeRef} className="fade-up mb-10">
          <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-2">
            Колекція
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Перегляньте повний асортимент керамічних прикрас ручної роботи.
          </p>
        </div>

        {/* Category filters */}
        {!categoriesLoading && (
          <div className="flex flex-wrap gap-2 mb-10">
            {allCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-1.5 text-sm rounded-sm border transition-colors ${
                  activeCategory === cat.key
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {productsLoading && (
          <p className="text-sm text-muted-foreground">Завантаження товарів...</p>
        )}

        {productsError && (
          <p className="text-sm text-destructive">
            Не вдалося завантажити каталог із Sanity.
          </p>
        )}

        {!productsLoading && !productsError && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => (
              <Link
                key={product.slug}
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
                <p className="text-sm font-medium text-foreground mt-1">
                  {product.price} ₴
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Collection;
