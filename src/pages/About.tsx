/**
 * About — Our story and philosophy page.
 */

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import artisanImage from "@/assets/artisan-studio.jpg";
import collectionImage from "@/assets/collection-flat-lay.jpg";

const About = () => {
  const heroRef = useScrollFadeIn();
  const storyRef = useScrollFadeIn();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="max-w-5xl mx-auto px-6 md:px-16 py-16">
        <div ref={heroRef} className="fade-up mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
            About Shepit
          </h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            "Shepit" means <em>whisper</em> in Ukrainian. We create ceramic jewelry
            that carries the quiet voice of the maker — each curve, each glaze
            variation is a signature of the human hand.
          </p>
        </div>

        <div className="aspect-[16/9] overflow-hidden rounded-sm mb-16">
          <img
            src={collectionImage}
            alt="Our ceramic jewelry collection"
            className="w-full h-full object-cover"
          />
        </div>

        <div ref={storyRef} className="fade-up grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-serif text-2xl font-light text-foreground mb-4">
              Our Studio
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Based in Kyiv, Ukraine, our small studio is where tradition meets
              intention. We work with local stoneware clay, sourced from Ukrainian
              deposits, and fire each piece at temperatures exceeding 1200°C.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our glazes are made from earth-born pigments — iron, copper, cobalt —
              mixed in small batches. The result is color that feels alive, never
              synthetic.
            </p>
          </div>
          <div className="aspect-[3/4] overflow-hidden rounded-sm">
            <img
              src={artisanImage}
              alt="Artisan at work in our Kyiv studio"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="max-w-2xl">
          <h2 className="font-serif text-2xl font-light text-foreground mb-4">
            Our Values
          </h2>
          <ul className="space-y-3 text-muted-foreground leading-relaxed">
            <li>
              <strong className="text-foreground">Handmade, not mass-produced.</strong> Every
              piece is shaped individually. We never use molds.
            </li>
            <li>
              <strong className="text-foreground">Sustainably sourced.</strong> Local clay,
              natural glazes, minimal packaging using recycled paper.
            </li>
            <li>
              <strong className="text-foreground">Cultural preservation.</strong> Our designs
              honor traditional Ukrainian ceramic motifs while embracing modern form.
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
