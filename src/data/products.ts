/**
 * Product data for Shepit Ceramics.
 */

import chokerPhoto1 from "@/assets/choker-photo-1.png";
import chokerPhoto2 from "@/assets/choker-photo-2.png";
import ptashkaPhoto1 from "@/assets/ptashka-photo-1.png";
import ptashkaPhoto2 from "@/assets/ptashka-photo-2.png";
import earringsGreenPhoto from "@/assets/earrings-green-photo.png";
import productPendant2 from "@/assets/product-pendant-2.jpg";
import productBracelet1 from "@/assets/product-bracelet-1.jpg";
import productEarring2 from "@/assets/product-earring-2.jpg";

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameUk: string;
  price: number;
  currency: string;
  category: "earrings" | "pendants" | "brooches" | "bracelets";
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
    category: "pendants",
    categoryUk: "Кулони",
    image: chokerPhoto1,
    images: [chokerPhoto1, chokerPhoto2],
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
    categoryUk: "Кулони",
    image: ptashkaPendant,
    images: [ptashkaPendant],
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
    image: ceramicEarringsGreen,
    images: [ceramicEarringsGreen],
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
    slug: "terracotta-bead-bracelet",
    name: "Terracotta Bead Bracelet",
    nameUk: "Браслет «Глиняні Намистини»",
    price: 1200,
    currency: "₴",
    category: "bracelets",
    categoryUk: "Браслети",
    image: productBracelet1,
    images: [productBracelet1],
    description:
      "Hand-rolled terracotta beads on a natural linen macramé cord with an adjustable sliding knot.",
    descriptionUk:
      "Терракотові намистини ручної роботи на лляному шнурі макраме з регульованим вузлом.",
    details: [
      "Material: High-fire terracotta beads",
      "Cord: Natural linen, adjustable",
      "Bead size: approx. 10mm each",
      "Fits wrists 15–20 cm",
    ],
    detailsUk: [
      "Матеріал: високотемпературні терракотові намистини",
      "Шнур: натуральний льон, регульований",
      "Розмір намистин: прибл. 10 мм кожна",
      "Підходить для зап'ясть 15–20 см",
    ],
    inStock: true,
  },
  {
    id: "5",
    slug: "earth-stone-studs",
    name: "Earth Stone Studs",
    nameUk: "Пусети «Земляний Камінь»",
    price: 780,
    currency: "₴",
    category: "earrings",
    categoryUk: "Сережки",
    image: productEarring2,
    images: [productEarring2],
    description:
      "Minimal ceramic stud earrings in sage green and terracotta. Light, subtle, and grounding.",
    descriptionUk:
      "Мінімалістичні керамічні пусети у дуеті шавлієвого зеленого та терракоти. Легкі, витончені, заземлюючі.",
    details: [
      "Material: High-fire stoneware clay",
      "Glaze: Sage green + terracotta duo",
      "Posts: Surgical steel",
      "Size: approx. 1.2 cm",
      "Weight: 3g per earring",
    ],
    detailsUk: [
      "Матеріал: високотемпературна кам'яна глина",
      "Глазур: шавлієвий зелений + терракота",
      "Штифти: хірургічна сталь",
      "Розмір: прибл. 1,2 см",
      "Вага: 3 г кожна сережка",
    ],
    inStock: true,
  },
  {
    id: "6",
    slug: "midnight-teardrop-pendant",
    name: "Midnight Teardrop Pendant",
    nameUk: "Кулон «Опівнічна Крапля»",
    price: 2100,
    currency: "₴",
    category: "pendants",
    categoryUk: "Кулони",
    image: productPendant2,
    images: [productPendant2],
    description:
      "A dramatic teardrop pendant with deep brown glaze and gold leaf accents.",
    descriptionUk:
      "Вражаючий каплеподібний кулон із глибокою коричневою глазур'ю та акцентами сусального золота.",
    details: [
      "Material: High-fire stoneware clay",
      "Glaze: Dark brown with 24k gold leaf accents",
      "Cord: Genuine leather, adjustable",
      "Pendant size: approx. 5 × 2.5 cm",
    ],
    detailsUk: [
      "Матеріал: високотемпературна кам'яна глина",
      "Глазур: темно-коричнева з акцентами сусального золота 24к",
      "Шнур: натуральна шкіра, регульований",
      "Розмір кулона: прибл. 5 × 2,5 см",
    ],
    inStock: true,
  },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (category: string): Product[] =>
  products.filter((p) => p.category === category);
