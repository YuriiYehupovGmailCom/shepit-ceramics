import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "./client";
import { Product } from "@/types/product";

export type { Product };

type ProductCategory = string;

interface SanityProductRecord {
  slug: string;
  name: string;
  price: number;
  category: {
    _type: "reference";
    _ref: string;
    title?: string;
    slug?: { current: string };
  };
  description?: string;
  details?: string[];
  mainImage?: string;
  gallery?: string[];
  stockQty?: number;
}

const productProjection = `{
  "slug": slug.current,
  name,
  price,
  category->{_id, title, slug},
  description,
  details,
  "mainImage": mainImage.asset->url,
  "gallery": gallery[].asset->url,
  stockQty
}`;

const productsQuery = `*[_type == "product"]|order(_createdAt desc)${productProjection}`;

const productBySlugQuery = `*[
  _type == "product" &&
  slug.current == $slug
][0]${productProjection}`;

function mapProduct(record: SanityProductRecord): Product {
  const gallery = (record.gallery || []).filter(Boolean);
  const images = gallery.length
    ? gallery
    : record.mainImage
      ? [record.mainImage]
      : [];

  const categorySlug = record.category?.slug?.current || "";
  const categoryLabel = record.category?.title || "";

  return {
    slug: record.slug,
    name: record.name,
    price: record.price,
    category: categorySlug as ProductCategory,
    categoryUk: categoryLabel,
    image: record.mainImage || images[0] || "",
    images,
    description: record.description || "",
    details: record.details || [],
    stockQty: record.stockQty ?? 1,
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
