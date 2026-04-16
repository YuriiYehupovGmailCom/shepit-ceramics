import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "./client";

export interface Category {
  _id: string;
  title: string;
  slug: string;
  order: number;
}

const categoriesQuery = `*[_type == "category"]|order(coalesce(order, 999) asc, title asc){
  _id,
  title,
  "slug": slug.current,
  order
}`;

const categoryBySlugQuery = `*[
  _type == "category" &&
  slug.current == $slug
][0]{
  _id,
  title,
  "slug": slug.current,
  order
}`;

export async function getCategories(): Promise<Category[]> {
  return sanityClient.fetch<Category[]>(categoriesQuery);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return sanityClient.fetch<Category | null>(categoryBySlugQuery, { slug });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 60_000,
  });
}

export function useCategory(slug?: string) {
  return useQuery({
    queryKey: ["categories", slug],
    queryFn: () => getCategoryBySlug(slug || ""),
    enabled: Boolean(slug),
    staleTime: 60_000,
  });
}
