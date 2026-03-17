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
            «Шепіт» — це тихий голос
            <br />
            <em className="italic">майстрині у кожній прикрасі</em>
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Наша студія розташована в серці Києва, де багатовікова керамічна
              традиція зустрічається з сучасним дизайном. Кожна прикраса починається
              як грудочка української каменеподібної глини — вилеплена руками,
              висушена на сонці, вкрита глазур'ю з натуральних пігментів
              і випалена за температури понад 1200°C.
            </p>
            <p>
              Ми віримо, що прикраси мають нести історію. Легкі недосконалості
              глазурі, органічні вигини форми — це не вади. Це шепіт руки
              майстрині, тиха ознака, що з'єднує вас із землею та нашим ремеслом.
            </p>
            <p>
              Кожна покупка підтримує незалежних українських ремісників і допомагає
              зберегти традиційні керамічні техніки, що передаються з покоління
              в покоління.
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
              alt="Майстриня створює керамічні прикраси в нашій київській студії"
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
