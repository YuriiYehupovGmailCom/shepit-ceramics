import { defineField, defineType } from "sanity";

const categoryOptions = [
  { title: "Чокери", value: "chokers" },
  { title: "Підвіски", value: "pendants" },
  { title: "Сережки", value: "earrings" },
  { title: "Горнята", value: "mugs" },
  { title: "Ялинкові прикраси", value: "xmas" },
  { title: "Вітряні дзвоники", value: "windchimes" },
  { title: "Набори", value: "sets" },
  { title: "Писанки", value: "pysanky" },
];

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
      type: "string",
      options: {
        list: categoryOptions,
        layout: "dropdown",
      },
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
      subtitle: "category",
      media: "mainImage",
      price: "price",
      currency: "currency",
    },
    prepare({ title, subtitle, media, price, currency }) {
      const categoryTitle =
        categoryOptions.find((option) => option.value === subtitle)?.title ||
        subtitle;

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
