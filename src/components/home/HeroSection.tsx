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
          Кераміка ручної роботи
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] text-foreground mb-6">
          Шепіт – це щось між <em className="font-light italic"> тишею</em> і шумом
        </h1>
        <div className="max-w-xl mb-8 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Шепіт – це початок звуку. Щось не надто гучне, але і не тиша. Щось перехідне, щось середнє
            між нічим і дією. Це ранок, коли тільки починається метушня життя. Це вечір, коли
            на мить зупиняєшся, щоб попрощатися з пройдешнім днем. Це схід і
            захід сонця.
          </p>
          <p>
            Це шум дерев, шелест трав у полі, подих вітру, шурхіт крил
            птахів під час польоту...
          </p>
        </div>
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
