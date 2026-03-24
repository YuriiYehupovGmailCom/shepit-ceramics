/**
 * OrderConfirmation — Success page shown after placing an order.
 */

import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Button } from "@/components/ui/button";

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-primary" strokeWidth={1.5} />
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4">
          Дякуємо за замовлення!
        </h1>

        <p className="text-muted-foreground leading-relaxed mb-6 max-w-md mx-auto">
          Ваше замовлення прийнято. Найближчим часом надійде повідомлення для підтвердження деталей та відправки.
        </p>

        <p className="text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
          Кожен виріб Shepit Ceramics — це ручна робота, тому прикраса буде дбайливо упакована та доставлена з любов'ю 🤍
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="outline" className="font-serif tracking-wider px-8 py-5">
              На головну
            </Button>
          </Link>
          <Link to="/collection">
            <Button className="bg-primary text-primary-foreground hover:bg-primary-hover font-serif tracking-wider px-8 py-5">
              До колекції
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
