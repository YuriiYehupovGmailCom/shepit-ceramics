/**
 * Product data for Shepit Ceramics.
 */

import chokerPhotoNew from "@/assets/choker-photo-new.png";
import chokerPhoto2 from "@/assets/choker-photo-2.png";
import ptashkaPhoto1 from "@/assets/ptashka-photo-1.png";
import ptashkaPhoto2 from "@/assets/ptashka-photo-2.png";
import earringsGreenPhoto from "@/assets/earrings-green-photo.png";
import mugPhoto1 from "@/assets/mug-photo-1.png";
import mugPhoto2 from "@/assets/mug-photo-2.png";
import horseOrnament from "@/assets/horse-ornament.png";
import windChime1 from "@/assets/wind-chime-1.png";
import windChime2 from "@/assets/wind-chime-2.png";
import windChime3 from "@/assets/wind-chime-3.png";

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameUk: string;
  price: number;
  currency: string;
  category: "chokers" | "pendants" | "earrings" | "mugs" | "xmas" | "windchimes";
  categoryUk: string;
  image: string;
  images: string[];
  description: string;
  descriptionUk: string;
  details: string[];
  detailsUk: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "choker-ceramic-pendant",
    name: "Choker with Ceramic Pendant",
    nameUk: "Чокер з керамічною підвіскою і намистинами",
    price: 600,
    currency: "₴",
    category: "chokers",
    categoryUk: "Чокери",
    image: chokerPhotoNew,
    images: [chokerPhotoNew, chokerPhoto2],
    description:
      "A choker with a handmade ceramic pendant and beads. Copper fittings and memory wire base create a comfortable fit.",
    descriptionUk:
      "Чокер з керамічною підвіскою ручної роботи та намистинами. Мідна фурнітура, основа — дріт із пам'яттю.",
    details: [
      "Material: Beige clay, milk-fired",
      "Glaze: White and green",
      "Fittings: Copper",
      "Base: Memory wire",
      "Circumference: 37 cm + 6 cm chain extender",
      "Pendant size: 3.3 × 3.3 cm",
    ],
    detailsUk: [
      "Матеріал: бежева глина молочена",
      "Полива: біла і зелена",
      "Фурнітура: мідна",
      "Основа: дріт із пам'яттю",
      "Окружність: 37 см + 6 см ланцюжок подовжувач",
      "Розмір керамічної підвіски: 3,3×3,3 см",
    ],
    inStock: true,
  },
  {
    id: "2",
    slug: "ptashka-ceramic-pendant",
    name: "Ceramic Pendant «Ptashka»",
    nameUk: "Керамічна підвіска «Пташка»",
    price: 300,
    currency: "₴",
    category: "pendants",
    categoryUk: "Підвіски",
    image: ptashkaPhoto1,
    images: [ptashkaPhoto1, ptashkaPhoto2],
    description:
      "A ceramic pendant shaped like a bird — «Ptashka». Made from beige clay with black and transparent glaze.",
    descriptionUk:
      "Керамічна підвіска у формі пташки. Виготовлена з бежевої глини з чорною і прозорою поливами.",
    details: [
      "Material: Beige clay",
      "Glaze: Black and transparent",
      "Size: 3.4 × 3.6 cm",
    ],
    detailsUk: [
      "Матеріал: бежева глина",
      "Полива: чорна і прозора",
      "Розмір: 3,4×3,6 см",
    ],
    inStock: true,
  },
  {
    id: "3",
    slug: "ceramic-earrings-green",
    name: "Ceramic Earrings",
    nameUk: "Керамічні сережки",
    price: 350,
    currency: "₴",
    category: "earrings",
    categoryUk: "Сережки",
    image: earringsGreenPhoto,
    images: [earringsGreenPhoto],
    description:
      "Round ceramic earrings with geometric patterns in green and white glaze on beige clay.",
    descriptionUk:
      "Круглі керамічні сережки з геометричним орнаментом. Біла і зелена поливи на бежевій глині молоченій.",
    details: [
      "Material: Beige clay, milk-fired",
      "Glaze: White and green",
      "Size: 3 × 3 cm",
    ],
    detailsUk: [
      "Матеріал: бежева глина молочена",
      "Полива: біла і зелена",
      "Розмір: 3×3 см",
    ],
    inStock: true,
  },
  {
    id: "4",
    slug: "ceramic-mug-blue-ornament",
    name: "Ceramic Mug with Blue Ornament",
    nameUk: "Керамічна чашка з синім орнаментом",
    price: 650,
    currency: "₴",
    category: "mugs",
    categoryUk: "Горнятка",
    image: mugPhoto1,
    images: [mugPhoto1, mugPhoto2],
    description:
      "A handmade ceramic mug with a traditional blue geometric ornament. Perfect for your morning coffee or tea.",
    descriptionUk:
      "Керамічна чашка ручної роботи з традиційним синім геометричним орнаментом. Ідеальна для ранкової кави чи чаю.",
    details: [
      "Material: White stoneware clay",
      "Glaze: White and cobalt blue",
      "Volume: ~250 ml",
      "Dishwasher safe",
    ],
    detailsUk: [
      "Матеріал: біла кам'яна глина",
      "Полива: біла і кобальтова синя",
      "Об'єм: ~250 мл",
      "Можна мити в посудомийній машині",
    ],
    inStock: true,
  },
  {
    id: "5",
    slug: "ceramic-horse-ornament",
    name: "Ceramic Horse Christmas Ornament",
    nameUk: "Керамічний конячка — ялинкова прикраса",
    price: 250,
    currency: "₴",
    category: "xmas",
    categoryUk: "Новорічні прикраси",
    image: horseOrnament,
    images: [horseOrnament],
    description:
      "A charming ceramic horse ornament inspired by Ukrainian folk art. Hand-painted with sun and plant motifs.",
    descriptionUk:
      "Чарівна керамічна конячка — ялинкова прикраса в дусі української народної традиції. Розписана вручну сонячними та рослинними мотивами.",
    details: [
      "Material: White clay",
      "Decoration: Hand-painted folk motifs",
      "Hanging: Red thread loop",
      "Size: ~7 × 6 cm",
    ],
    detailsUk: [
      "Матеріал: біла глина",
      "Декор: розпис народними мотивами вручну",
      "Підвіс: червона нитка",
      "Розмір: ~7 × 6 см",
    ],
    inStock: true,
  },
  {
    id: "6",
    slug: "ceramic-fish-wind-chime",
    name: "Ceramic Fish Wind Chime",
    nameUk: "Керамічний передзвін «Рибки»",
    price: 800,
    currency: "₴",
    category: "windchimes",
    categoryUk: "Передзвони",
    image: windChime1,
    images: [windChime1, windChime2, windChime3],
    description:
      "A handcrafted ceramic wind chime with fish-shaped pendants on a natural driftwood branch. Each fish is individually sculpted and glazed.",
    descriptionUk:
      "Керамічний передзвін з підвісками у формі рибок на натуральній гілці. Кожна рибка вилеплена та вкрита глазур'ю індивідуально.",
    details: [
      "Material: White and brown clay",
      "Decoration: Folk geometric patterns",
      "Hanging: Natural cotton cord on driftwood",
      "Size: ~20 × 25 cm",
    ],
    detailsUk: [
      "Матеріал: біла і коричнева глина",
      "Декор: народні геометричні орнаменти",
      "Підвіс: натуральна бавовняна нитка на гілці",
      "Розмір: ~20 × 25 см",
    ],
    inStock: true,
  },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (category: string): Product[] =>
  products.filter((p) => p.category === category);
