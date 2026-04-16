export type ProductCategory = string;

export interface Product {
  slug: string;
  name: string;
  price: number;
  category: ProductCategory;
  categoryUk: string;
  image: string;
  images: string[];
  description: string;
  details: string[];
}
