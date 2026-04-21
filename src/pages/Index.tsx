/**
 * Index — Homepage for Shepit Ceramics.
 * Composed of: Hero → Product Grid → Collection Banner → About Craft → Footer.
 */

import { Helmet } from "react-helmet-async";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import HeroSection from "@/components/home/HeroSection";
import ProductGrid from "@/components/home/ProductGrid";
import CollectionBanner from "@/components/home/CollectionBanner";
import AboutCraft from "@/components/home/AboutCraft";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Shepit Ceramics — Керамічні прикраси ручної роботи</title>
        <meta name="keywords" content="кераміка ручної роботи, керамічні прикраси, авторська кераміка, купити сережки з кераміки, українські бренди" />
        <meta name="description" content="Авторські керамічні прикраси ручної роботи. Кераміка ручної роботи. Сережки, підвіски чокери від Shepit Ceramics." />
        <meta property="og:title" content="Shepit Ceramics — Керамічні прикраси ручної роботи" />
        <meta property="og:description" content="Авторські керамічні прикраси ручної роботи." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://shepit-ceramics.com/" />
      </Helmet>
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
    </>
  );
};

export default Index;
