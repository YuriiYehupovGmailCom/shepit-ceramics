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
            Колись з'явилася мрія про керамічну майстерню. Вона стала спробою знайти власний шлях,
            робити щось близьке серцю і перетворити це на справу життя.
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
            <h2 className="font-serif text-2xl font-light text-foreground mb-4">
              Майстерня
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Моя мрія здійснилась у 2024 році. Майстерня розташована в Малому Березному, Закарпаття.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Глазурі створюються з натуральних пігментів — заліза, міді, кобальту —
              змішаних у малих партіях. Результат — колір, що виглядає живим,
              ніколи штучним.
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

        <div className="max-w-2xl">
          <h2 className="font-serif text-2xl font-light text-foreground mb-4">
            Цінності
          </h2>
          <ul className="space-y-3 text-muted-foreground leading-relaxed">
            <li>
              <strong className="text-foreground">Ручна робота, а не масове виробництво.</strong>{" "}
              Кожна прикраса формується індивідуально, без використання форм.
            </li>
            <li>
              <strong className="text-foreground">Екологічні матеріали.</strong>{" "}
              Місцева глина, натуральні глазурі, мінімальне пакування з переробленого паперу.
            </li>
            <li>
              <strong className="text-foreground">Збереження культури.</strong>{" "}
              Дизайни вшановують традиційні українські керамічні мотиви, водночас приймаючи сучасну форму.
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
