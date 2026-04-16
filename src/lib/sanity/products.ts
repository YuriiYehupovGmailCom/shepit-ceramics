import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "./client";
import { categoryLabels, Product, ProductCategory } from "@/types/product";

interface SanityProductRecord {
  _id: string;
  slug: string;
  name: string;
  price: number;
  currency?: string;
  category: ProductCategory;
  description?: string;
  details?: string[];
  inStock?: boolean;
  mainImage?: string;
  gallery?: string[];
}

const productProjection = `{
  _id,
  "slug": slug.current,
  name,
  price,
  currency,
  category,
  description,
  details,
  inStock,
  "mainImage": mainImage.asset->url,
  "gallery": gallery[].asset->url
}`;

const productsQuery = `*[
  _type == "product" &&
  coalesce(storefrontEnabled, false) == true
]|order(coalesce(sortOrder, 9999) asc, _createdAt desc)${productProjection}`;

const productBySlugQuery = `*[
  _type == "product" &&
  slug.current == $slug &&
  coalesce(storefrontEnabled, false) == true
][0]${productProjection}`;

function mapProduct(record: SanityProductRecord): Product {
  const gallery = (record.gallery || []).filter(Boolean);
  const images = gallery.length
    ? gallery
    : record.mainImage
      ? [record.mainImage]
      : [];

  return {
    id: record._id,
    slug: record.slug,
    name: record.name,
    price: record.price,
    currency: record.currency || "₴",
    category: record.category,
    categoryUk: categoryLabels[record.category] || record.category,
    image: record.mainImage || images[0] || "",
    images,
    description: record.description || "",
    details: record.details || [],
    inStock: record.inStock ?? true,
  };
}

export async function getProducts(): Promise<Product[]> {
  const result = await sanityClient.fetch<SanityProductRecord[]>(productsQuery);

  return result
    .filter((product) => product.slug && product.name && product.category)
    .map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const result = await sanityClient.fetch<SanityProductRecord | null>(
    productBySlugQuery,
    { slug }
  );

  if (!result) {
    return null;
  }

  return mapProduct(result);
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 60_000,
  });
}

export function useProduct(slug?: string) {
  return useQuery({
    queryKey: ["products", slug],
    queryFn: () => getProductBySlug(slug || ""),
    enabled: Boolean(slug),
    staleTime: 60_000,
  });
}
