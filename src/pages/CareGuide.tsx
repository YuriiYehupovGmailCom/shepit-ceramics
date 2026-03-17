/**
 * CareGuide — Instructions for caring for ceramic jewelry.
 */

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { Droplets, Sun, Shield, Heart } from "lucide-react";

const careItems = [
  {
    icon: Droplets,
    title: "Уникайте тривалого контакту з водою",
    description:
      "Хоча наша кераміка високотемпературного випалу та міцна, ми рекомендуємо знімати прикраси перед плаванням, прийняттям душу чи миттям посуду.",
  },
  {
    icon: Sun,
    title: "Зберігайте подалі від прямих сонячних променів",
    description:
      "Тримайте прикраси в лляному мішечку, який входить у комплект. Тривале перебування на сонці може вплинути на шнур та шкіряні елементи.",
  },
  {
    icon: Shield,
    title: "Поводьтеся обережно",
    description:
      "Кераміка міцна, але може відколотися при падінні на тверду поверхню. Ставтеся до прикраси як до улюбленої чашки — з ніжною повагою.",
  },
  {
    icon: Heart,
    title: "Цінуйте патину часу",
    description:
      "З часом натуральні матеріали, такі як шкіра та льон, можуть набути легкої патини. Це частина живого характеру прикраси.",
  },
];

const CareGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="max-w-3xl mx-auto px-6 md:px-16 py-16">
        <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
          Догляд за прикрасами
        </h1>
        <p className="text-muted-foreground mb-12 max-w-lg">
          Ваша прикраса Shepit створена на роки. Дотримуйтесь цих простих
          порад, щоб зберегти її красу надовго.
        </p>

        <div className="space-y-10">
          {careItems.map((item) => (
            <div key={item.title} className="flex gap-5">
              <div className="w-10 h-10 rounded-sm bg-accent flex items-center justify-center flex-shrink-0">
                <item.icon size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CareGuide;
