export const categoryLabels = {
  chokers: "Чокери",
  pendants: "Підвіски",
  earrings: "Сережки",
  mugs: "Горнята",
  xmas: "Ялинкові прикраси",
  windchimes: "Вітряні дзвоники",
  sets: "Набори",
  pysanky: "Писанки",
} as const;

export type ProductCategory = keyof typeof categoryLabels;

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  category: ProductCategory;
  categoryUk: string;
  image: string;
  images: string[];
  description: string;
  details: string[];
  inStock: boolean;
}
