/**
 * CareGuide — Instructions for caring for ceramic jewelry.
 */

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { Droplets, Sparkles, Shield, FlowerIcon, Waves } from "lucide-react";

const careItems = [
  {
    icon: Shield,
    title: "Уникайте ударів та падінь",
    description:
      "Незважаючи на міцність, кераміка може тріснути або розбитися від удару об тверду поверхню.",
  },
  {
    icon: Sparkles,
    title: "Очищення",
    description:
      "Кераміку можна мити теплою водою з милом. Використовуйте м'яку ганчірку, серветку або губку.",
  },
  {
    icon: Droplets,
    title: "Уникайте хімікатів",
    description:
      "Не використовуйте агресивні мийні засоби, абразивні пасти чи щітки, оскільки вони можуть пошкодити глазур.",
  },
  {
    icon: FlowerIcon,
    title: "Захист від косметики",
    description:
      "Одягайте прикраси після нанесення парфумів, лаку для волосся та крему, щоб уникнути пошкодження поверхні.",
  },
  {
    icon: Waves,
    title: "Водні процедури",
    description:
      "Знімайте вироби перед відвідуванням басейну, сауни чи моря — хлор та сіль можуть пошкодити металеві кріплення та покриття.",
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
