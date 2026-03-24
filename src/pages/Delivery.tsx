import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const Delivery = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="max-w-3xl mx-auto px-6 md:px-16 py-16">
        <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-8">
          Доставка
        </h1>

        <div className="space-y-6 text-foreground font-light leading-relaxed">
          <ul className="list-disc pl-5 space-y-4 marker:text-muted-foreground">
            <li>
              Доставка в межах України здійснюється компанією-перевізником Нова Пошта.
            </li>
            <li>
              Постараємось відправити товар в день замовлення або наступний.
            </li>
            <li>
              Якщо ви зробили замовлення у неділю, відправка буде здійснена у понеділок.
            </li>
            <li>
              Доставка Товару (у тому числі за повернення Товару) здійснюється за рахунок Покупця.
            </li>
            <li>
              Під час отримання Товару Покупець зобов’язаний перевірити цілісність та якість Товару, а також переконатися у відповідності його комплектації до замовлення. Огляд товару і відмова від посилки згідно з чинними правилами Нової Пошти.
            </li>
            <li>
              Зверніть увагу, що у відділенні посилка зберігається 7 календарних днів, після чого автоматично формується повернення.
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Delivery;
