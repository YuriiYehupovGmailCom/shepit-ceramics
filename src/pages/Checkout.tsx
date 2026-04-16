/**
 * Checkout — Order form page with cart summary, customer info, and shipping.
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronsUpDown, LoaderCircle, Minus, Plus, Trash2 } from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const NOVA_POSHTA_API_URL = "https://api.novaposhta.ua/v2.0/json/";
const ORDER_NOTIFICATION_EMAIL = "yurii.yehupov@gmail.com";
const ORDER_NOTIFICATION_ENDPOINT = `https://formsubmit.co/ajax/${ORDER_NOTIFICATION_EMAIL}`;

type NovaPoshtaApiResponse<T> = {
  success: boolean;
  data: T[];
  errors?: string[];
};

type NovaPoshtaCity = {
  Ref: string;
  Description: string;
  AreaDescription?: string;
  SettlementTypeDescription?: string;
};

type NovaPoshtaWarehouse = {
  Ref: string;
  Description: string;
  Number?: string;
  CategoryOfWarehouse?: string;
};

const Checkout = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cityPopoverOpen, setCityPopoverOpen] = useState(false);
  const [warehousePopoverOpen, setWarehousePopoverOpen] = useState(false);
  const [cityQuery, setCityQuery] = useState("");
  const [warehouseQuery, setWarehouseQuery] = useState("");
  const [cityOptions, setCityOptions] = useState<NovaPoshtaCity[]>([]);
  const [warehouseOptions, setWarehouseOptions] = useState<NovaPoshtaWarehouse[]>([]);
  const [selectedCity, setSelectedCity] = useState<NovaPoshtaCity | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<NovaPoshtaWarehouse | null>(null);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingWarehouses, setIsLoadingWarehouses] = useState(false);
  const [deliveryError, setDeliveryError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    cityRef: "",
    warehouseRef: "",
    postalCode: "",
    comment: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const normalizedQuery = cityQuery.trim();

    if (normalizedQuery.length < 2) {
      setCityOptions([]);
      setIsLoadingCities(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsLoadingCities(true);

      try {
        const response = await fetch(NOVA_POSHTA_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
          body: JSON.stringify({
            apiKey: "",
            modelName: "Address",
            calledMethod: "getCities",
            methodProperties: {
              FindByString: normalizedQuery,
              Limit: 20,
            },
          }),
        });

        const result: NovaPoshtaApiResponse<NovaPoshtaCity> = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.errors?.[0] || "Не вдалося завантажити список міст.");
        }

        setCityOptions(result.data);
        setDeliveryError("");
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setCityOptions([]);
        setDeliveryError(error instanceof Error ? error.message : "Не вдалося завантажити список міст.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingCities(false);
        }
      }
    }, 350);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [cityQuery]);

  useEffect(() => {
    if (!selectedCity?.Ref) {
      setWarehouseOptions([]);
      setIsLoadingWarehouses(false);
      return;
    }

    const controller = new AbortController();

    const loadWarehouses = async () => {
      setIsLoadingWarehouses(true);

      try {
        const response = await fetch(NOVA_POSHTA_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
          body: JSON.stringify({
            apiKey: "",
            modelName: "Address",
            calledMethod: "getWarehouses",
            methodProperties: {
              CityRef: selectedCity.Ref,
            },
          }),
        });

        const result: NovaPoshtaApiResponse<NovaPoshtaWarehouse> = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.errors?.[0] || "Не вдалося завантажити список відділень.");
        }

        setWarehouseOptions(result.data);
        setDeliveryError("");
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setWarehouseOptions([]);
        setDeliveryError(error instanceof Error ? error.message : "Не вдалося завантажити список відділень.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingWarehouses(false);
        }
      }
    };

    loadWarehouses();

    return () => controller.abort();
  }, [selectedCity]);

  const filteredWarehouses = warehouseOptions.filter((warehouse) =>
    warehouse.Description.toLowerCase().includes(warehouseQuery.toLowerCase()),
  );

  const selectCity = (city: NovaPoshtaCity) => {
    setSelectedCity(city);
    setSelectedWarehouse(null);
    setWarehouseQuery("");
    setCityQuery(city.Description);
    setWarehouseOptions([]);
    setDeliveryError("");
    setForm((prev) => ({
      ...prev,
      city: city.Description,
      cityRef: city.Ref,
      address: "",
      warehouseRef: "",
      postalCode: "",
    }));
    setCityPopoverOpen(false);
  };

  const selectWarehouse = (warehouse: NovaPoshtaWarehouse) => {
    setSelectedWarehouse(warehouse);
    setWarehouseQuery(warehouse.Description);
    setDeliveryError("");
    setForm((prev) => ({
      ...prev,
      address: warehouse.Description,
      warehouseRef: warehouse.Ref,
      postalCode: warehouse.Number || "",
    }));
    setWarehousePopoverOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCity || !selectedWarehouse) {
      setDeliveryError("Оберіть місто та відділення Нової пошти.");
      return;
    }

    setIsProcessing(true);
    setSubmitError("");

    const orderItems = items
      .map((item, index) => {
        const lineTotal = item.product.price * item.quantity;
        return `${index + 1}. ${item.product.name} (${item.product.slug}) — ${item.quantity} x ${item.product.price} ₴ = ${lineTotal} ₴`;
      })
      .join("\n");

    const payload = new FormData();
    payload.append("_subject", `Нове замовлення Shepit Ceramics на ${totalPrice} ₴`);
    payload.append("_template", "table");
    payload.append("Ім'я", form.firstName);
    payload.append("Прізвище", form.lastName);
    payload.append("Телефон", form.phone);
    payload.append("Email клієнта", form.email || "Не вказано");
    payload.append("Місто", form.city);
    payload.append("Місто Ref", form.cityRef);
    payload.append("Відділення", form.address);
    payload.append("Відділення Ref", form.warehouseRef);
    payload.append("Номер відділення", form.postalCode || "Не визначено");
    payload.append("Коментар", form.comment || "Без коментаря");
    payload.append("Товари", orderItems);
    payload.append("Кількість позицій", String(items.length));
    payload.append("Сума замовлення", `${totalPrice} ₴`);
    payload.append("Спосіб оплати", "Оплата на картку ФОП");
    payload.append("Спосіб доставки", "Нова пошта");

    if (form.email) {
      payload.append("_replyto", form.email);
    }

    try {
      const response = await fetch(ORDER_NOTIFICATION_ENDPOINT, {
        method: "POST",
        body: payload,
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok || result.success !== "true") {
        throw new Error("Не вдалося надіслати замовлення на пошту.");
      }

      clearCart();
      navigate("/order-confirmation");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Не вдалося надіслати замовлення на пошту.");
    } finally {
      setIsProcessing(false);
    }
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
                    <Label className="text-sm text-foreground">Місто *</Label>
                    <Popover open={cityPopoverOpen} onOpenChange={setCityPopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          role="combobox"
                          aria-expanded={cityPopoverOpen}
                          className="mt-1 w-full justify-between rounded-sm font-normal"
                        >
                          <span className="truncate">
                            {selectedCity ? selectedCity.Description : "Оберіть місто"}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                        <Command shouldFilter={false}>
                          <CommandInput
                            value={cityQuery}
                            onValueChange={setCityQuery}
                            placeholder="Почніть вводити назву міста"
                          />
                          <CommandList>
                            {isLoadingCities ? (
                              <div className="flex items-center gap-2 px-3 py-4 text-sm text-muted-foreground">
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                                Завантаження міст...
                              </div>
                            ) : null}
                            {!isLoadingCities && cityQuery.trim().length < 2 ? (
                              <div className="px-3 py-4 text-sm text-muted-foreground">
                                Введіть щонайменше 2 символи.
                              </div>
                            ) : null}
                            <CommandEmpty>Місто не знайдено.</CommandEmpty>
                            <CommandGroup>
                              {cityOptions.map((city) => (
                                <CommandItem
                                  key={city.Ref}
                                  value={city.Ref}
                                  onSelect={() => selectCity(city)}
                                  className="flex items-start gap-2"
                                >
                                  <Check
                                    className={cn(
                                      "mt-0.5 h-4 w-4",
                                      selectedCity?.Ref === city.Ref ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  <div className="min-w-0">
                                    <div className="truncate">{city.Description}</div>
                                    {(city.AreaDescription || city.SettlementTypeDescription) ? (
                                      <div className="text-xs text-muted-foreground">
                                        {[city.SettlementTypeDescription, city.AreaDescription].filter(Boolean).join(", ")}
                                      </div>
                                    ) : null}
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label className="text-sm text-foreground">Відділення Нової пошти *</Label>
                    <Popover open={warehousePopoverOpen} onOpenChange={setWarehousePopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          role="combobox"
                          aria-expanded={warehousePopoverOpen}
                          disabled={!selectedCity}
                          className="mt-1 w-full justify-between rounded-sm font-normal"
                        >
                          <span className="truncate">
                            {selectedWarehouse ? selectedWarehouse.Description : "Оберіть відділення"}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                        <Command shouldFilter={false}>
                          <CommandInput
                            value={warehouseQuery}
                            onValueChange={setWarehouseQuery}
                            placeholder={selectedCity ? "Пошук відділення" : "Спершу оберіть місто"}
                          />
                          <CommandList>
                            {isLoadingWarehouses ? (
                              <div className="flex items-center gap-2 px-3 py-4 text-sm text-muted-foreground">
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                                Завантаження відділень...
                              </div>
                            ) : null}
                            <CommandEmpty>Відділення не знайдено.</CommandEmpty>
                            <CommandGroup>
                              {filteredWarehouses.map((warehouse) => (
                                <CommandItem
                                  key={warehouse.Ref}
                                  value={warehouse.Ref}
                                  onSelect={() => selectWarehouse(warehouse)}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      selectedWarehouse?.Ref === warehouse.Ref ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  <span className="truncate">{warehouse.Description}</span>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-sm text-foreground">Номер відділення</Label>
                    <Input id="postalCode" value={form.postalCode} readOnly className="mt-1 rounded-sm bg-muted/40" placeholder="Буде підставлено автоматично" />
                  </div>
                  {deliveryError ? (
                    <p className="text-sm text-destructive">{deliveryError}</p>
                  ) : null}
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
                    <div key={item.product.slug} className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-muted overflow-hidden rounded-sm flex-shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground truncate flex-1">{item.product.name}</p>
                          {item.product.stockQty > 1 && (
                            <div className="flex items-center border border-border rounded-sm flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="w-7 h-7 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
                                aria-label="Зменшити"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="px-1 text-xs min-w-[20px] text-center">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                                disabled={item.quantity >= item.product.stockQty}
                                className="w-7 h-7 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
                                aria-label="Збільшити"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.slug)}
                            className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{item.product.price} ₴</p>
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

                {submitError ? (
                  <p className="mt-3 text-center text-sm text-destructive">{submitError}</p>
                ) : null}

                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Оплата на картку ФОП
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
