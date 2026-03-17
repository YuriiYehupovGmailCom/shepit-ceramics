/**
 * CareGuide — Instructions for caring for ceramic jewelry.
 */

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { Droplets, Sun, Shield, Heart } from "lucide-react";

const careItems = [
  {
    icon: Droplets,
    title: "Avoid Prolonged Water Exposure",
    description:
      "While our ceramics are high-fired and durable, we recommend removing jewelry before swimming, showering, or doing dishes.",
  },
  {
    icon: Sun,
    title: "Store Away from Direct Sunlight",
    description:
      "Keep your pieces in the provided linen pouch when not wearing them. Prolonged sun exposure can affect cord and leather elements.",
  },
  {
    icon: Shield,
    title: "Handle with Care",
    description:
      "Ceramic is strong but can chip if dropped on hard surfaces. Treat your piece as you would a favorite mug — with gentle respect.",
  },
  {
    icon: Heart,
    title: "Embrace the Patina",
    description:
      "Over time, natural materials like leather and linen may develop a subtle patina. This is part of the jewelry's living character.",
  },
];

const CareGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="max-w-3xl mx-auto px-6 md:px-16 py-16">
        <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
          Care Guide
        </h1>
        <p className="text-muted-foreground mb-12 max-w-lg">
          Your Shepit piece is made to last. Follow these simple guidelines to
          keep it beautiful for years.
        </p>

        <div className="space-y-10">
          {careItems.map((item) => (
            <div key={item.title} className="flex gap-5">
              <div className="w-10 h-10 rounded-sm bg-accent flex items-center justify-center flex-shrink-0">
                <item.icon size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CareGuide;
