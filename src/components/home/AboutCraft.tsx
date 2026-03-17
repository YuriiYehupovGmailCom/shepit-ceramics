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
            About the Craft
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6 leading-tight">
            "Shepit" means <em className="italic">whisper</em> in Ukrainian
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Our studio sits in the heart of Kyiv, where centuries of ceramic
              tradition meet contemporary design. Each piece begins as a lump of
              Ukrainian stoneware clay — shaped by hand, dried in the sun, glazed
              with earth-born pigments, and fired at over 1200°C.
            </p>
            <p>
              We believe jewelry should carry a story. The slight imperfections in
              our glazes, the organic curves of each form — these are not flaws.
              They are the whisper of the maker's hand, a quiet signature that
              connects you to the earth and to our craft.
            </p>
            <p>
              Every purchase supports independent Ukrainian artisans and helps
              preserve traditional ceramic techniques that have been passed down
              for generations.
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
              alt="Artisan shaping ceramic jewelry in our Kyiv studio"
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
