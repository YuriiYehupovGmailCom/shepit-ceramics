/**
 * Checkout — Order form page with cart summary, customer info, and shipping.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";

const Checkout = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    postalCode: "",
    comment: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate order processing
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    navigate("/order-confirmation");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h1 className="font-serif text-2xl text-foreground mb-4">Ваш кошик порожній</h1>
          <p className="text-muted-foreground mb-8">Додайте товари з колекції, щоб оформити замовлення.</p>
          <Button onClick={() => navigate("/collection")} className="bg-primary text-primary-foreground hover:bg-primary-hover">
            До колекції
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-6 md:px-16 py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-10">
          Оформлення замовлення
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact */}
              <section>
                <h2 className="font-serif text-xl font-light text-foreground mb-4">Контактні дані</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm text-foreground">Ім'я *</Label>
                      <Input id="firstName" required value={form.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className="mt-1 rounded-sm" placeholder="Ваше ім'я" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm text-foreground">Прізвище *</Label>
                      <Input id="lastName" required value={form.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className="mt-1 rounded-sm" placeholder="Ваше прізвище" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm text-foreground">Телефон *</Label>
                    <Input id="phone" type="tel" required value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} className="mt-1 rounded-sm" placeholder="+380..." />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm text-foreground">Email</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className="mt-1 rounded-sm" placeholder="email@example.com" />
                  </div>
                </div>
              </section>

              <Separator />

              {/* Shipping */}
              <section>
                <h2 className="font-serif text-xl font-light text-foreground mb-4">Доставка</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="city" className="text-sm text-foreground">Місто *</Label>
                    <Input id="city" required value={form.city} onChange={(e) => handleChange("city", e.target.value)} className="mt-1 rounded-sm" placeholder="Ваше місто" />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-sm text-foreground">Адреса або відділення Нової Пошти *</Label>
                    <Input id="address" required value={form.address} onChange={(e) => handleChange("address", e.target.value)} className="mt-1 rounded-sm" placeholder="Відділення №..." />
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-sm text-foreground">Поштовий індекс</Label>
                    <Input id="postalCode" value={form.postalCode} onChange={(e) => handleChange("postalCode", e.target.value)} className="mt-1 rounded-sm" placeholder="01001" />
                  </div>
                </div>
              </section>

              <Separator />

              {/* Comment */}
              <section>
                <h2 className="font-serif text-xl font-light text-foreground mb-4">Коментар до замовлення</h2>
                <textarea
                  value={form.comment}
                  onChange={(e) => handleChange("comment", e.target.value)}
                  rows={3}
                  className="w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Побажання щодо замовлення..."
                />
              </section>
            </div>

            {/* Right: Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-muted/30 p-6 rounded-sm sticky top-24">
                <h2 className="font-serif text-xl font-light text-foreground mb-6">Ваше замовлення</h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-muted overflow-hidden rounded-sm flex-shrink-0">
                        <img src={item.product.image} alt={item.product.nameUk} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.product.nameUk}</p>
                        <p className="text-sm text-muted-foreground">{item.product.price} {item.product.currency}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center border border-border rounded-sm hover:bg-muted">
                            <Minus size={12} />
                          </button>
                          <span className="text-sm w-6 text-center">{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center border border-border rounded-sm hover:bg-muted">
                            <Plus size={12} />
                          </button>
                          <button type="button" onClick={() => removeFromCart(item.product.id)} className="ml-auto text-muted-foreground hover:text-foreground">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="mb-4" />

                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Доставка</span>
                  <span className="text-foreground">За тарифами перевізника</span>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-medium mb-6">
                  <span className="text-foreground">Разом</span>
                  <span className="text-foreground">{totalPrice} ₴</span>
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary-hover font-serif tracking-wider py-6"
                >
                  {isProcessing ? "Обробка..." : "Підтвердити замовлення"}
                </Button>

                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Оплата при отриманні (накладений платіж)
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
