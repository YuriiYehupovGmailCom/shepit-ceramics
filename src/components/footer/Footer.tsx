/**
 * Footer — Simple footer with links, Instagram handle, and newsletter signup.
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Send } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Дякуємо! ${email} підписано.`);
    setEmail("");
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-lg tracking-widest uppercase text-foreground mb-4">
              Shepit
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
                {[
                  { label: "Чокери", href: "/collection" },
                  { label: "Підвіски", href: "/collection" },
                  { label: "Сережки", href: "/collection" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
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
                  { label: "Про нас", href: "/about" },
                  { label: "Догляд", href: "/care" },
                  { label: "Доставка", href: "/care" },
                  { label: "Конфіденційність", href: "/privacy-policy" },
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

          {/* Newsletter */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-foreground mb-4">
              Розсилка
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Нові прикраси, історії зі студії та ранній доступ до колекцій.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ваш@email.com"
                required
                className="flex-1 bg-transparent border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="p-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary-hover transition-colors"
                aria-label="Підписатися"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-muted-foreground">
            © 2025 Shepit Ceramics. Ручна робота, Київ, Україна.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Політика конфіденційності
            </Link>
            <Link to="/terms-of-service" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Умови використання
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
