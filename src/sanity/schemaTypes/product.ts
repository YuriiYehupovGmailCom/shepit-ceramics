import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Назва",
      type: "string",
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Ціна",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Валюта",
      type: "string",
      initialValue: "₴",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Категорія",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "storefrontEnabled",
      title: "Показувати на сайті",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "sortOrder",
      title: "Порядок у каталозі",
      type: "number",
    }),
    defineField({
      name: "description",
      title: "Опис",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: "details",
      title: "Деталі",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "mainImage",
      title: "Головне фото",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Галерея",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "inStock",
      title: "В наявності",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "legacyId",
      title: "Legacy ID",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      categoryTitle: "category.title",
      media: "mainImage",
      price: "price",
      currency: "currency",
    },
    prepare({ title, categoryTitle, media, price, currency }) {
      return {
        title,
        subtitle:
          price !== undefined
            ? `${categoryTitle || "Без категорії"} • ${price} ${currency || ""}`.trim()
            : categoryTitle,
        media,
      };
    },
  },
});
