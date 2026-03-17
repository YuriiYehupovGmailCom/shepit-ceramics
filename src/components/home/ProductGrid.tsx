/**
 * ProductGrid — Displays product cards in a responsive grid.
 * 2 columns on mobile, 3 on tablet, 4 on desktop.
 * Each card links to the product detail page.
 */

import { Link } from "react-router-dom";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import { products } from "@/data/products";

const ProductGrid = () => {
  const fadeRef = useScrollFadeIn();

  return (
    <section className="px-6 md:px-16 py-20 max-w-7xl mx-auto">
      <div ref={fadeRef} className="fade-up">
        <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-2">
          Our Collection
        </h2>
        <p className="text-muted-foreground text-sm mb-10 max-w-lg">
          Every piece is shaped, glazed, and fired by hand in our Kyiv studio.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

// Individual product card with hover effect
function ProductCard({ product }: { product: typeof products[number] }) {
  const fadeRef = useScrollFadeIn();

  return (
    <Link
      ref={fadeRef}
      to={`/product/${product.slug}`}
      className="fade-up group block"
    >
      {/* Image container with subtle zoom on hover */}
      <div className="aspect-square overflow-hidden bg-muted rounded-sm mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Product info */}
      <h3 className="font-serif text-sm md:text-base font-medium text-foreground group-hover:text-primary transition-colors">
        {product.name}
      </h3>
      <p className="text-xs text-muted-foreground mt-0.5">{product.nameUk}</p>
      <p className="text-sm font-medium text-foreground mt-1">
        {product.price} {product.currency}
      </p>
    </Link>
  );
}

export default ProductGrid;
