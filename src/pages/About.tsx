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
            Про Shepit
          </h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            «Шепіт» — це тихий голос майстрині. Ми створюємо керамічні прикраси,
            які несуть у собі тепло рук — кожен вигин, кожна варіація глазурі є
            підписом людської руки.
          </p>
        </div>

        <div className="aspect-[16/9] overflow-hidden rounded-sm mb-16">
          <img
            src={collectionImage}
            alt="Наша колекція керамічних прикрас"
            className="w-full h-full object-cover"
          />
        </div>

        <div ref={storyRef} className="fade-up grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-serif text-2xl font-light text-foreground mb-4">
              Майстерня
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Розташована в Малому Березному, Закарпаття, невелика майстерня — це місце, де
              традиція зустрічається з наміром. Ми працюємо з місцевою кам'яною
              глиною, видобутою з українських родовищ, і випалюємо кожну
              прикрасу за температури понад 1200°C.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Наші глазурі створені з натуральних пігментів — заліза, міді, кобальту —
              змішаних у малих партіях. Результат — колір, що виглядає живим,
              ніколи штучним.
            </p>
          </div>
          <div className="aspect-[3/4] overflow-hidden rounded-sm">
            <img
              src={artisanImage}
              alt="Майстриня за роботою в нашій майстерні"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="max-w-2xl">
          <h2 className="font-serif text-2xl font-light text-foreground mb-4">
            Наші цінності
          </h2>
          <ul className="space-y-3 text-muted-foreground leading-relaxed">
            <li>
              <strong className="text-foreground">Ручна робота, а не масове виробництво.</strong>{" "}
              Кожна прикраса формується індивідуально. Ми ніколи не використовуємо форми.
            </li>
            <li>
              <strong className="text-foreground">Екологічні матеріали.</strong>{" "}
              Місцева глина, натуральні глазурі, мінімальне пакування з переробленого паперу.
            </li>
            <li>
              <strong className="text-foreground">Збереження культури.</strong>{" "}
              Наші дизайни вшановують традиційні українські керамічні мотиви, водночас приймаючи сучасну форму.
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
