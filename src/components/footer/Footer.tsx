/**
 * Footer — Simple footer with links and Instagram handle.
 */

import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { useCategories } from "@/lib/sanity/categories";

const Footer = () => {
  const { data: categories = [] } = useCategories();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-lg tracking-widest uppercase text-foreground mb-4">
              Shepit Ceramics
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Авторські керамічні прикраси, засновані на українській ремісничій
              традиції. Кожна прикраса вилеплена вручну, вкрита натуральною
              глазур'ю та випалена з любов'ю.
            </p>
            <a
              href="https://instagram.com/shepit.ceramics"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram size={16} />
              @shepit.ceramics
            </a>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-foreground mb-4">
                Магазин
              </h4>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat._id}>
                    <Link
                      to={`/collection?category=${cat.slug}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {cat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-foreground mb-4">
                Інформація
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "Про Shepit Ceramics", href: "/about" },
                  { label: "Догляд", href: "/care" },
                  { label: "Доставка", href: "/delivery" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-muted-foreground">
            © 2026 Shepit Ceramics. Малий Березний, Україна.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
