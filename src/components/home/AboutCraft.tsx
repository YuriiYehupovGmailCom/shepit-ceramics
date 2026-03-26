/**
 * AboutCraft — Storytelling section with text + vertical image.
 * Explains the "Shepit" philosophy.
 */

import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import artisanImage from "@/assets/artisan-studio.jpg";

const AboutCraft = () => {
  const textRef = useScrollFadeIn();
  const imageRef = useScrollFadeIn();

  return (
    <section className="px-6 md:px-16 py-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
        {/* Text — takes 3 of 5 columns */}
        <div ref={textRef} className="fade-up lg:col-span-3 order-2 lg:order-1">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Про ремесло
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6 leading-tight">
            Шепіт — це маленька майстерня, де кожна прикраса створюється вручну.
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Шепіт - це керамічні прикраси, кожна з яких ліпиться вручну зі шматка глини, випалюється при температурі понад 1000°С,
              розмальовується кольоровими поливами і проходить другий випал, деякі з прикрас ще проходять процес молочіння,
              який надає кераміці унікального бежево-коричневого відтінку.
            </p>
          </div>
        </div>

        {/* Vertical image — takes 2 of 5 columns */}
        <div
          ref={imageRef}
          className="fade-up lg:col-span-2 order-1 lg:order-2"
        >
          <div className="aspect-[3/4] overflow-hidden rounded-sm">
            <img
              src={artisanImage}
              alt="Майстриня створює керамічні прикраси в керамічній майстерні"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCraft;
