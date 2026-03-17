/**
 * Index — Homepage for Shepit Ceramics.
 * Composed of: Hero → Product Grid → Collection Banner → About Craft → Footer.
 */

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import HeroSection from "@/components/home/HeroSection";
import ProductGrid from "@/components/home/ProductGrid";
import CollectionBanner from "@/components/home/CollectionBanner";
import AboutCraft from "@/components/home/AboutCraft";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main>
        <HeroSection />
        <ProductGrid />
        <CollectionBanner />
        <AboutCraft />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
