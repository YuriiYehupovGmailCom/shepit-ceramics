/**
 * Product data for Shepit Ceramics.
 * In a real app, this would come from a database/CMS.
 * Each product has a unique slug used for routing.
 */

import productEarring1 from "@/assets/product-earring-1.jpg";
import productEarring2 from "@/assets/product-earring-2.jpg";
import productPendant1 from "@/assets/product-pendant-1.jpg";
import productPendant2 from "@/assets/product-pendant-2.jpg";
import productBrooch1 from "@/assets/product-brooch-1.jpg";
import productBracelet1 from "@/assets/product-bracelet-1.jpg";

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameUk: string; // Ukrainian name
  price: number;
  currency: string;
  category: "earrings" | "pendants" | "brooches" | "bracelets";
  image: string;
  images: string[];
  description: string;
  details: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "terracotta-arc-earrings",
    name: "Terracotta Arc Earrings",
    nameUk: "Сережки «Терракотова Арка»",
    price: 1450,
    currency: "UAH",
    category: "earrings",
    image: productEarring1,
    images: [productEarring1],
    description:
      "Hand-shaped terracotta earrings with an organic curved form. Each pair is unique — slight variations in glaze and texture are a hallmark of the handmade process.",
    details: [
      "Material: High-fire stoneware clay",
      "Glaze: Natural terracotta with matte finish",
      "Hooks: Hypoallergenic gold-plated brass",
      "Size: approx. 3.5 × 2.5 cm",
      "Weight: 8g per earring",
    ],
    inStock: true,
  },
  {
    id: "2",
    slug: "forest-pendant-necklace",
    name: "Forest Pendant Necklace",
    nameUk: "Кулон «Лісовий»",
    price: 1850,
    currency: "UAH",
    category: "pendants",
    image: productPendant1,
    images: [productPendant1],
    description:
      "An organic-shaped ceramic pendant with a rich forest green glaze on a hand-braided cord. Inspired by the ancient forests of the Carpathian mountains.",
    details: [
      "Material: High-fire stoneware clay",
      "Glaze: Forest green with amber undertones",
      "Cord: Hand-braided cotton, adjustable length",
      "Pendant size: approx. 3 × 2.5 cm",
    ],
    inStock: true,
  },
  {
    id: "3",
    slug: "vyshyvanka-brooch",
    name: "Vyshyvanka Pattern Brooch",
    nameUk: "Брошка «Вишиванка»",
    price: 980,
    currency: "UAH",
    category: "brooches",
    image: productBrooch1,
    images: [productBrooch1],
    description:
      "A ceramic brooch featuring traditional Ukrainian vyshyvanka (embroidery) patterns pressed into clay. A wearable piece of cultural heritage.",
    details: [
      "Material: High-fire stoneware clay",
      "Glaze: Natural terracotta on cream",
      "Pin: Stainless steel brooch pin",
      "Diameter: approx. 4 cm",
    ],
    inStock: true,
  },
  {
    id: "4",
    slug: "terracotta-bead-bracelet",
    name: "Terracotta Bead Bracelet",
    nameUk: "Браслет «Глиняні Намистини»",
    price: 1200,
    currency: "UAH",
    category: "bracelets",
    image: productBracelet1,
    images: [productBracelet1],
    description:
      "Hand-rolled terracotta beads on a natural linen macramé cord with an adjustable sliding knot. Each bead carries the warmth of the kiln.",
    details: [
      "Material: High-fire terracotta beads",
      "Cord: Natural linen, adjustable",
      "Bead size: approx. 10mm each",
      "Fits wrists 15–20 cm",
    ],
    inStock: true,
  },
  {
    id: "5",
    slug: "earth-stone-studs",
    name: "Earth Stone Studs",
    nameUk: "Пусети «Земляний Камінь»",
    price: 780,
    currency: "UAH",
    category: "earrings",
    image: productEarring2,
    images: [productEarring2],
    description:
      "Minimal ceramic stud earrings in a duo of sage green and terracotta. Perfect for everyday wear — light, subtle, and grounding.",
    details: [
      "Material: High-fire stoneware clay",
      "Glaze: Sage green + terracotta duo",
      "Posts: Surgical steel",
      "Size: approx. 1.2 cm",
      "Weight: 3g per earring",
    ],
    inStock: true,
  },
  {
    id: "6",
    slug: "midnight-teardrop-pendant",
    name: "Midnight Teardrop Pendant",
    nameUk: "Кулон «Опівнічна Крапля»",
    price: 2100,
    currency: "UAH",
    category: "pendants",
    image: productPendant2,
    images: [productPendant2],
    description:
      "A dramatic teardrop pendant with a deep brown glaze kissed with gold leaf accents. The organic shape evokes falling rain at midnight.",
    details: [
      "Material: High-fire stoneware clay",
      "Glaze: Dark brown with 24k gold leaf accents",
      "Cord: Genuine leather, adjustable",
      "Pendant size: approx. 5 × 2.5 cm",
    ],
    inStock: true,
  },
];

/**
 * Helper to find a product by its URL slug.
 */
export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

/**
 * Helper to get products filtered by category.
 */
export const getProductsByCategory = (category: string): Product[] =>
  products.filter((p) => p.category === category);
