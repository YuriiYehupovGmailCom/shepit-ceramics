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
            Про Shepit Ceramics
          </h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Шепіт - це маленька майстерня, яка знаходиться у с. Малий Березний, Закарпатської області, де кожна прикраса створюється вручну.
          </p>
        </div>

        <div className="aspect-[16/9] overflow-hidden rounded-sm mb-16">
          <img
            src={collectionImage}
            alt="Колекція керамічних прикрас Shepit"
            className="w-full h-full object-cover"
          />
        </div>

        <div ref={storyRef} className="fade-up grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="text-muted-foreground leading-relaxed">
              Шепіт - це керамічні прикраси, кожна з яких ліпиться вручну зі шматка глини, випалюється при температурі понад 1000ʼС,
              розмальовується кольоровими поливами і проходить другий випал, деякі з прикрас ще проходять процес молочіння,
              який надає кераміці унікального бежево-коричневого відтінку.
            </p>
          </div>
          <div className="aspect-[3/4] overflow-hidden rounded-sm">
            <img
              src={artisanImage}
              alt="Майстриня за роботою в керамічній майстерні"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
