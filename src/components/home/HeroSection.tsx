/**
 * HeroSection — Large atmospheric hero with split layout.
 * Left side: elegant typography + CTA.
 * Right side: hero image.
 */

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import heroImage from "@/assets/hero-ceramic.jpg";

const HeroSection = () => {
  const fadeRef = useScrollFadeIn();

  return (
    <section className="min-h-[85vh] grid grid-cols-1 lg:grid-cols-2 gap-0">
      {/* Text side */}
      <div
        ref={fadeRef}
        className="fade-up flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 lg:py-0 order-2 lg:order-1"
      >
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Ручна робота з України
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] text-foreground mb-6">
          Керамічні прикраси,
          <br />
          <em className="font-light italic">створені руками,</em>
          <br />
          випалені з любов'ю
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-md mb-8">
          Кожна прикраса зберігає тепло печі та дух української
          ремісничої традиції. Жодні дві не однакові — у цьому краса Shepit.
        </p>
        <Link
          to="/collection"
          className="inline-flex items-center gap-2 text-sm tracking-wider uppercase text-primary hover:text-primary-hover transition-colors group"
        >
          Переглянути колекцію
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {/* Image side */}
      <div className="relative overflow-hidden order-1 lg:order-2 h-[60vh] lg:h-auto">
        <img
          src={heroImage}
          alt="Керамічні сережки з українським орнаментом на темному тлі — Shepit Ceramics"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
    </section>
  );
};

export default HeroSection;
