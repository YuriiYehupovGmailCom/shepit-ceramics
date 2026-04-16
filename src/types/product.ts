export type ProductCategory = string;

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
