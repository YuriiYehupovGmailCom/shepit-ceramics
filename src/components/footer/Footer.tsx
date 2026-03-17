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
    // In a real app, this would call an API
    alert(`Дякуємо! ${email} subscribed.`);
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
              Artisan ceramic jewelry rooted in Ukrainian craft tradition. Each
              piece is shaped by hand, glazed with earth-born pigments, and fired
              with intention.
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
                Shop
              </h4>
              <ul className="space-y-2">
                {["Earrings", "Pendants", "Brooches", "Bracelets"].map((item) => (
                  <li key={item}>
                    <Link
                      to="/collection"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-foreground mb-4">
                Info
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Care Guide", href: "/care" },
                  { label: "Shipping", href: "/care" },
                  { label: "Privacy", href: "/privacy-policy" },
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
              Newsletter
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              New pieces, studio stories, and early access to collections.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-transparent border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="p-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary-hover transition-colors"
                aria-label="Subscribe"
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
            © 2025 Shepit Ceramics. Handmade in Kyiv, Ukraine.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
