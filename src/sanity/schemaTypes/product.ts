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
      name: "category",
      title: "Категорія",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
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
      name: "stockQty",
      title: "Кількість на складі",
      type: "number",
      initialValue: 1,
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "name",
      categoryTitle: "category.title",
      media: "mainImage",
      price: "price",
      stockQty: "stockQty",
    },
    prepare({ title, categoryTitle, media, price, stockQty }) {
      return {
        title,
        subtitle:
          price !== undefined
            ? `${categoryTitle || "Без категорії"} • ${price} ₴${stockQty ? ` • В наявності: ${stockQty}` : ""}`.trim()
            : categoryTitle,
        media,
      };
    },
  },
});
