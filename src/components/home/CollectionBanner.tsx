/**
 * CollectionBanner — Full-width atmospheric image section.
 */

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import collectionImage from "@/assets/collection-flat-lay.jpg";

const CollectionBanner = () => {
  const fadeRef = useScrollFadeIn();

  return (
    <section ref={fadeRef} className="fade-up relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <img
        src={collectionImage}
        alt="Колекція керамічних прикрас Shepit Ceramics"
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/30 flex items-end">
        <div className="px-8 md:px-16 pb-12 md:pb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-card font-light mb-3">
            Повна колекція
          </h2>
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 text-sm tracking-wider uppercase text-card/90 hover:text-card transition-colors group"
          >
            Переглянути всі прикраси
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CollectionBanner;
