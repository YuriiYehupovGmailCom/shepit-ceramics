/**
 * Product data for Shepit Ceramics.
 */

import ceramicEarringsBlue1 from "@/assets/ceramic-earrings-blue-1.png";
import ceramicEarringsBlue2 from "@/assets/ceramic-earrings-blue-2.png";
import ceramicEarringsBrown1 from "@/assets/ceramic-earrings-brown-1.png";
import ceramicEarringsBrown2 from "@/assets/ceramic-earrings-brown-2.png";
import lemkivshchynaSet1 from "@/assets/lemkivshchyna-set-1.png";
import lemkivshchynaSet2 from "@/assets/lemkivshchyna-set-2.png";
import lemkivshchynaSet3 from "@/assets/lemkivshchyna-set-3.png";
import ptashkaBrown1 from "@/assets/ptashka-brown-1.png";
import ceramicEarringsBrownWhite1 from "@/assets/ceramic-earrings-brown-white-1.png";
import horseOrnamentWhite1 from "@/assets/horse-ornament-white-1.png";
import horseOrnamentWhite2 from "@/assets/horse-ornament-white-2.png";
import chokerBlueWhite1 from "@/assets/choker-blue-white-1.png";
import chokerBlueWhite2 from "@/assets/choker-blue-white-2.png";
import ceramicEarringsBlueWhiteSquare from "@/assets/ceramic-earrings-blue-white-square.png";
import ptashkaWhite1 from "@/assets/ptashka-white-1.png";
import ptashkaBlack1 from "@/assets/ptashka-black-1.png";
import ptashkaGrey1 from "@/assets/ptashka-grey-1.png";
import ptashkaBrown2 from "@/assets/ptashka-brown-2.png";
import ptashkaBlackBeige from "@/assets/ptashka-black-beige.png";
import ptashkaTrident from "@/assets/ptashka-trident.png";
import ptashkaGreyWhite from "@/assets/ptashka-grey-white.png";
import earringsBlueWhiteSmall from "@/assets/earrings-blue-white-small.png";
import earringsGreenWhiteSmall from "@/assets/earrings-green-white-small.png";
import pysanka11 from "@/assets/pysanka-1-1.png";
import pysanka12 from "@/assets/pysanka-1-2.png";
import pysanka13 from "@/assets/pysanka-1-3.png";
import pysanka21 from "@/assets/pysanka-2-1.png";
import pysanka22 from "@/assets/pysanka-2-2.png";
import pysanka23 from "@/assets/pysanka-2-3.png";
import pysanka31 from "@/assets/pysanka-3-1.png";
import pysanka32 from "@/assets/pysanka-3-2.png";
import pysanka41 from "@/assets/pysanka-4-1.png";
import pysanka42 from "@/assets/pysanka-4-2.png";
import pysanka43 from "@/assets/pysanka-4-3.png";
import pysanka51 from "@/assets/pysanka-5-1.png";
import pysanka52 from "@/assets/pysanka-5-2.png";
import pysanka53 from "@/assets/pysanka-5-3.png";
import pysanka54 from "@/assets/pysanka-5-4.png";
import pysanka55 from "@/assets/pysanka-5-5.png";
import pysanka56 from "@/assets/pysanka-5-6.png";
import pysanka61 from "@/assets/pysanka-6-1.png";
import pysanka62 from "@/assets/pysanka-6-2.png";
import pysanka63 from "@/assets/pysanka-6-3.png";
import pysanka71 from "@/assets/pysanka-7-1.png";
import pysanka72 from "@/assets/pysanka-7-2.png";
import pysanka73 from "@/assets/pysanka-7-3.png";
import pysanka81 from "@/assets/pysanka-8-1.png";
import pysanka82 from "@/assets/pysanka-8-2.png";
import pysanka83 from "@/assets/pysanka-8-3.png";
import pysanka91 from "@/assets/pysanka-9-1.png";
import pysanka92 from "@/assets/pysanka-9-2.png";
import pysanka93 from "@/assets/pysanka-9-3.png";
import pysanka101 from "@/assets/pysanka-10-1.png";
import pysanka102 from "@/assets/pysanka-10-2.png";
import pysanka103 from "@/assets/pysanka-10-3.png";
import pysanka111 from "@/assets/pysanka-11-1.png";
import pysanka112 from "@/assets/pysanka-11-2.png";
import pysanka113 from "@/assets/pysanka-11-3.png";
import pysanka121 from "@/assets/pysanka-12-1.png";
import pysanka122 from "@/assets/pysanka-12-2.png";
import pysanka123 from "@/assets/pysanka-12-3.png";

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameUk: string;
  price: number;
  currency: string;
  category:
    | "chokers"
    | "pendants"
    | "earrings"
    | "mugs"
    | "xmas"
    | "windchimes"
    | "sets"
    | "pysanky";
  categoryUk: string;
  image: string;
  images: string[];
  description: string;
  descriptionUk: string;
  details: string[];
  detailsUk: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "7",
    slug: "ceramic-earrings-blue",
    name: "Ceramic Earrings",
    nameUk: "Керамічні сережки біло-сині",
    price: 350,
    currency: "₴",
    category: "earrings",
    categoryUk: "Сережки",
    image: ceramicEarringsBlue1,
    images: [ceramicEarringsBlue1, ceramicEarringsBlue2],
    description:
      "Handmade ceramic earrings with a blue and white geometric pattern on milk-fired beige clay.",
    descriptionUk:
      "Керамічні сережки ручної роботи з синьо-білим геометричним орнаментом на бежевій глині молоченій.",
    details: [
      "Material: Beige clay, milk-fired",
      "Glaze: White and blue",
      "Size: 2.5 × 2.5 cm",
    ],
    detailsUk: [
      "Матеріал: бежева глина молочена",
      "Полива: біла і синя",
      "Розмір: 2,5×2,5 см",
    ],
    inStock: true,
  },
  {
    id: "8",
    slug: "ceramic-earrings-brown",
    name: "Brown Ceramic Earrings",
    nameUk: "Керамічні сережки коричневі круглі",
    price: 350,
    currency: "₴",
    category: "earrings",
    categoryUk: "Сережки",
    image: ceramicEarringsBrown1,
    images: [ceramicEarringsBrown1, ceramicEarringsBrown2],
    description:
      "Handmade brown clay earrings with a white geometric glaze pattern.",
    descriptionUk:
      "Керамічні сережки ручної роботи з коричневої глини з білим геометричним орнаментом.",
    details: [
      "Material: Brown clay",
      "Glaze: White",
      "Size: 2.7 × 2.7 cm",
    ],
    detailsUk: [
      "Матеріал: коричнева глина",
      "Полива: біла",
      "Розмір: 2,7×2,7 см",
    ],
    inStock: true,
  },
  {
    id: "9",
    slug: "lemkivshchyna-ceramic-set",
    name: "Ceramic Jewelry Set «Lemkivshchyna»",
    nameUk: "Сережки та підвіска із колекції «Лемківщина»",
    price: 650,
    currency: "₴",
    category: "sets",
    categoryUk: "Набори",
    image: lemkivshchynaSet1,
    images: [lemkivshchynaSet1, lemkivshchynaSet2, lemkivshchynaSet3],
    description:
      "A ceramic jewelry set from the «Lemkivshchyna» collection with earrings and a pendant in vivid folk-inspired glazes.",
    descriptionUk:
      "Керамічний набір із колекції «Лемківщина»: сережки та підвіска з виразним орнаментом і кольоровими поливами.",
    details: [
      "Material: Beige clay",
      "Glaze: Colored glazes",
      "Earrings size: 2.7 × 2.7 cm",
      "Pendant size: 3 × 3 cm",
    ],
    detailsUk: [
      "Матеріал: бежева глина",
      "Полива: кольорові поливи",
      "Розмір сережок: 2,7×2,7 см",
      "Розмір підвіски: 3×3 см",
    ],
    inStock: true,
  },
  {
    id: "10",
    slug: "ptashka-ceramic-pendant-brown",
    name: "Ceramic Pendant «Ptashka»",
    nameUk: "Керамічна підвіска «Пташка з орнаментом Крила»",
    price: 300,
    currency: "₴",
    category: "pendants",
    categoryUk: "Підвіски",
    image: ptashkaBrown1,
    images: [ptashkaBrown1],
    description:
      "A ceramic pendant shaped like a bird, crafted from brown clay with white glaze details.",
    descriptionUk:
      "Керамічна підвіска у формі пташки з коричневої глини з білою поливою.",
    details: [
      "Material: Brown clay",
      "Glaze: White",
      "Size: 4 × 4.5 cm",
    ],
    detailsUk: [
      "Матеріал: коричнева глина",
      "Полива: біла",
      "Розмір: 4×4,5 см",
    ],
    inStock: true,
  },
  {
    id: "11",
    slug: "ceramic-earrings-brown-white",
    name: "Ceramic Earrings",
    nameUk: "Керамічні сережки коричневі восьмигранні",
    price: 350,
    currency: "₴",
    category: "earrings",
    categoryUk: "Сережки",
    image: ceramicEarringsBrownWhite1,
    images: [ceramicEarringsBrownWhite1],
    description:
      "Handmade ceramic earrings from brown clay with a white geometric glaze pattern.",
    descriptionUk:
      "Керамічні сережки ручної роботи з коричневої глини з білим геометричним орнаментом.",
    details: [
      "Material: Brown clay",
      "Glaze: White",
      "Size: 2.5 × 2.5 cm",
    ],
    detailsUk: [
      "Матеріал: коричнева глина",
      "Полива: біла",
      "Розмір: 2,5×2,5 см",
    ],
    inStock: true,
  },
  {
    id: "12",
    slug: "horse-christmas-ornament-white",
    name: "Christmas Ornament «Horse»",
    nameUk: "Ялинкова прикраса «Коник»",
    price: 400,
    currency: "₴",
    category: "xmas",
    categoryUk: "Ялинкові прикраси",
    image: horseOrnamentWhite1,
    images: [horseOrnamentWhite1, horseOrnamentWhite2],
    description:
      "A ceramic Christmas horse ornament made from beige clay with white glaze.",
    descriptionUk:
      "Керамічна ялинкова прикраса у формі коника з бежевої глини з білою поливою.",
    details: [
      "Material: Beige clay",
      "Glaze: White",
      "Size: 7 × 8 cm",
    ],
    detailsUk: [
      "Матеріал: бежева глина",
      "Полива: біла",
      "Розмір: 7×8 см",
    ],
    inStock: true,
  },
  {
    id: "13",
    slug: "choker-blue-white-beads",
    name: "Choker with Ceramic Pendant and Beads",
    nameUk: "Чокер з керамічною підвіскою і намистинами синій",
    price: 600,
    currency: "₴",
    category: "chokers",
    categoryUk: "Чокери",
    image: chokerBlueWhite1,
    images: [chokerBlueWhite1, chokerBlueWhite2],
    description:
      "A choker with a ceramic pendant made of milk-fired beige clay with white and blue glaze details, complemented by beads.",
    descriptionUk:
      "Виготовлений з молоченої бежевої глини з білою та синьою поливами.",
    details: [
      "Material: Beige clay, milk-fired",
      "Glaze: White and blue",
      "Fittings: Copper hardware",
      "Base: Memory wire",
      "Circumference: 37 cm + 6 cm extender chain",
      "Pendant size: 3.3 × 3.3 cm",
    ],
    detailsUk: [
      "Матеріал: бежева глина молочена",
      "Полива: біла і синя",
      "Фурнітура: мідна",
      "Основа: дріт із пам'яттю",
      "Окружність: 37 см + 6 см ланцюжок подовжувач",
      "Розмір керамічної підвіски: 3,3×3,3 см",
    ],
    inStock: true,
  },
  {
    id: "14",
    slug: "ceramic-earrings-blue-white-square",
    name: "Ceramic Earrings",
    nameUk: "Керамічні сережки синьо-білі круглі",
    price: 350,
    currency: "₴",
    category: "earrings",
    categoryUk: "Сережки",
    image: ceramicEarringsBlueWhiteSquare,
    images: [ceramicEarringsBlueWhiteSquare],
    description:
      "Handmade ceramic earrings with a blue and white geometric pattern on milk-fired beige clay.",
    descriptionUk:
      "Керамічні сережки ручної роботи з синьо-білим геометричним орнаментом на бежевій глині молоченій.",
    details: [
      "Material: Beige clay, milk-fired",
      "Glaze: White and blue",
      "Size: 3 × 3 cm",
    ],
    detailsUk: [
      "Матеріал: бежева глина молочена",
      "Полива: біла і синя",
      "Розмір: 3×3 см",
    ],
    inStock: true,
  },
  {
    id: "15",
    slug: "ptashka-white",
    name: "Ceramic Pendant «White Bird»",
    nameUk: "Керамічна підвіска «Пташка біла»",
    price: 300,
    currency: "₴",
    category: "pendants",
    categoryUk: "Підвіски",
    image: ptashkaWhite1,
    images: [ptashkaWhite1],
    description:
      "A delicate ceramic bird pendant, handcrafted from beige clay and covered with white glaze.",
    descriptionUk:
      "Ніжна керамічна підвіска у формі пташки, виготовлена з бежевої глини та вкрита білою поливою.",
    details: [
      "Material: Beige clay",
      "Glaze: White",
      "Size: 3.5 × 3.7 cm",
    ],
    detailsUk: [
      "Матеріал: бежева глина",
      "Полива: біла",
      "Розмір: 3.5х3.7 см",
    ],
    inStock: true,
  },
  {
    id: "16",
    slug: "ptashka-black",
    name: "Ceramic Pendant «Black Bird»",
    nameUk: "Керамічна підвіска «Пташка чорна»",
    price: 300,
    currency: "₴",
    category: "pendants",
    categoryUk: "Підвіски",
    image: ptashkaBlack1,
    images: [ptashkaBlack1],
    description:
      "A ceramic bird pendant handcrafted from beige clay and finished with black glaze.",
    descriptionUk:
      "Керамічна підвіска у формі пташки, виготовлена з бежевої глини та вкрита чорною поливою.",
    details: [
      "Material: Beige clay",
      "Glaze: Black",
      "Size: 3.6 × 4.2 cm",
    ],
    detailsUk: [
      "Матеріал: бежева глина",
      "Полива: чорна",
      "Розмір: 3.6х4.2 см",
    ],
    inStock: true,
  },
  {
    id: "17",
    slug: "ptashka-grey",
    name: "Ceramic Pendant «Grey Bird»",
    nameUk: "Керамічна підвіска «Пташка сіра»",
    price: 300,
    currency: "₴",
    category: "pendants",
    categoryUk: "Підвіски",
    image: ptashkaGrey1,
    images: [ptashkaGrey1],
    description:
      "A ceramic bird pendant made from milk-fired beige clay with white glaze accents.",
    descriptionUk:
      "Керамічна підвіска у формі пташки, виготовлена з молоченої бежевої глини та вкрита білою поливою.",
    details: [
      "Material: Beige clay, milk-fired",
      "Glaze: White",
      "Size: 4.1 × 5 cm",
    ],
    detailsUk: [
      "Матеріал: бежева глина молочена",
      "Полива: біла",
      "Розмір: 4.1х5 см",
    ],
    inStock: true,
  },
  {
    id: "18",
    slug: "ptashka-brown-small",
    name: "Ceramic Pendant «Brown Bird»",
    nameUk: "Керамічна підвіска «Пташка коричнева»",
    price: 300,
    currency: "₴",
    category: "pendants",
    categoryUk: "Підвіски",
    image: ptashkaBrown2,
    images: [ptashkaBrown2],
    description:
      "A small ceramic bird pendant made of brown clay with white glaze details.",
    descriptionUk:
      "Керамічна підвіска у формі пташки, виготовлена з коричневої глини та вкрита білою поливою.",
    details: [
      "Material: Brown clay",
      "Glaze: White",
      "Size: 3.1 × 3.5 cm",
    ],
    detailsUk: [
      "Матеріал: коричнева глина",
      "Полива: біла",
      "Розмір: 3.1х3.5 см",
    ],
    inStock: true,
  },
  {
    id: "19",
    slug: "ptashka-black-beige",
    name: "Ceramic Pendant «Black-Beige Bird»",
    nameUk: "Керамічна підвіска «Пташка чорно-бежева»",
    price: 300,
    currency: "₴",
    category: "pendants",
    categoryUk: "Підвіски",
    image: ptashkaGreyWhite,
    images: [ptashkaGreyWhite],
    description:
      "A ceramic bird pendant in black and beige, handcrafted from beige clay with black glaze.",
    descriptionUk:
      "Керамічна підвіска «Пташка чорно-бежева» з бежевої глини, вкрита чорною поливою.",
    details: [
      "Material: Beige clay",
      "Glaze: Black",
      "Size: 3.5 × 4 cm",
    ],
    detailsUk: [
      "Матеріал: бежева глина",
      "Полива: чорна",
      "Розмір: 3.5х4 см",
    ],
    inStock: true,
  },
  {
    id: "20",
    slug: "ptashka-trident",
    name: "Ceramic Pendant «Bird with Trident»",
    nameUk: "Керамічна підвіска «Пташка з тризубом»",
    price: 300,
    currency: "₴",
    category: "pendants",
    categoryUk: "Підвіски",
    image: ptashkaTrident,
    images: [ptashkaTrident],
    description:
      "A unique ceramic bird pendant featuring a Trident symbol, made from beige clay with white glaze.",
    descriptionUk:
      "Керамічна підвіска «Пташка з тризубом». Виготовлена з бежевої глини та вкрита білою поливою.",
    details: [
      "Material: Beige clay",
      "Glaze: White",
      "Size: 3.7 × 4.4 cm",
    ],
    detailsUk: [
      "Матеріал: бежева глина",
      "Полива: біла",
      "Розмір: 3.7х4.4 см",
    ],
    inStock: true,
  },
  {
    id: "21",
    slug: "ptashka-grey-white",
    name: "Ceramic Pendant «Grey-White Bird»",
    nameUk: "Керамічна підвіска «Пташка сіро-біла»",
    price: 300,
    currency: "₴",
    category: "pendants",
    categoryUk: "Підвіски",
    image: ptashkaBlackBeige,
    images: [ptashkaBlackBeige],
    description:
      "A grey and white ceramic bird pendant, handcrafted from milk-fired beige clay with white glaze.",
    descriptionUk:
      "Керамічна підвіска «Пташка сіро-біла». Виготовлена з молоченої бежевої глини та вкрита білою поливою.",
    details: [
      "Material: Beige clay, milk-fired",
      "Glaze: White",
      "Size: 3.2 × 3.7 cm",
    ],
    detailsUk: [
      "Матеріал: бежева глина молочена",
      "Полива: біла",
      "Розмір: 3.2х3.7 см",
    ],
    inStock: true,
  },
  {
    id: "22",
    slug: "earrings-blue-white-small",
    name: "Ceramic Earrings",
    nameUk: "Керамічні сережки синьо-білі",
    price: 350,
    currency: "₴",
    category: "earrings",
    categoryUk: "Сережки",
    image: earringsBlueWhiteSmall,
    images: [earringsBlueWhiteSmall],
    description:
      "Handmade blue and white ceramic earrings made from milk-fired beige clay.",
    descriptionUk:
      "Керамічні сережки синьо-білі з молоченої бежевої глини, вкриті білою та синьою поливами.",
    details: [
      "Material: Beige clay, milk-fired",
      "Glaze: White and blue",
      "Size: 2.5 × 2.5 cm",
    ],
    detailsUk: [
      "Матеріал: бежева глина молочена",
      "Полива: біла і синя",
      "Розмір: 2.5х2.5 см",
    ],
    inStock: true,
  },
  {
    id: "23",
    slug: "earrings-green-white-small",
    name: "Ceramic Earrings",
    nameUk: "Керамічні сережки зелені",
    price: 350,
    currency: "₴",
    category: "earrings",
    categoryUk: "Сережки",
    image: earringsGreenWhiteSmall,
    images: [earringsGreenWhiteSmall],
    description:
      "Handmade green ceramic earrings made from milk-fired beige clay.",
    descriptionUk:
      "Керамічні сережки зелені з молоченої бежевої глини, вкриті білою та зеленою поливами.",
    details: [
      "Material: Beige clay, milk-fired",
      "Glaze: White and green",
      "Size: 2.5 × 2.5 cm",
    ],
    detailsUk: [
      "Матеріал: бежева глина молочена",
      "Полива: біла і зелена",
      "Розмір: 2.5х2.5 см",
    ],
    inStock: true,
  },
  {
    id: "24",
    slug: "pysanka-1",
    name: "Pysanka 1",
    nameUk: "Писанка 1",
    price: 300,
    currency: "₴",
    category: "pysanky",
    categoryUk: "Писанки",
    image: pysanka11,
    images: [pysanka11, pysanka12, pysanka13],
    description:
      "Traditional pysanka made on a blown chicken egg with food-safe dye using wax-resist technique.",
    descriptionUk:
      "Писанка, виконана на видутому курячому яйці харчовими барвниками у восковій техніці.",
    details: [
      "Material: Blown chicken egg",
      "Coloring: Food-safe dye",
      "Technique: Wax-resist",
    ],
    detailsUk: [
      "Матеріали: видуте куряче яйце, барвник харчовий",
      "Техніка виконання: воскова",
    ],
    inStock: true,
  },
  {
    id: "25",
    slug: "pysanka-2",
    name: "Pysanka 2",
    nameUk: "Писанка 2",
    price: 300,
    currency: "₴",
    category: "pysanky",
    categoryUk: "Писанки",
    image: pysanka21,
    images: [pysanka21, pysanka22, pysanka23],
    description:
      "Traditional pysanka made on a blown chicken egg with food-safe dye using wax-resist technique.",
    descriptionUk:
      "Писанка, виконана на видутому курячому яйці харчовими барвниками у восковій техніці.",
    details: [
      "Material: Blown chicken egg",
      "Coloring: Food-safe dye",
      "Technique: Wax-resist",
    ],
    detailsUk: [
      "Матеріали: видуте куряче яйце, барвник харчовий",
      "Техніка виконання: воскова",
    ],
    inStock: true,
  },
  {
    id: "26",
    slug: "pysanka-3",
    name: "Pysanka 3",
    nameUk: "Писанка 3",
    price: 300,
    currency: "₴",
    category: "pysanky",
    categoryUk: "Писанки",
    image: pysanka31,
    images: [pysanka31, pysanka32],
    description:
      "Traditional pysanka made on a blown chicken egg with food-safe dye using wax-resist technique.",
    descriptionUk:
      "Писанка, виконана на видутому курячому яйці харчовими барвниками у восковій техніці.",
    details: [
      "Material: Blown chicken egg",
      "Coloring: Food-safe dye",
      "Technique: Wax-resist",
    ],
    detailsUk: [
      "Матеріали: видуте куряче яйце, барвник харчовий",
      "Техніка виконання: воскова",
    ],
    inStock: true,
  },
  {
    id: "27",
    slug: "pysanka-4",
    name: "Pysanka 4",
    nameUk: "Писанка 4",
    price: 300,
    currency: "₴",
    category: "pysanky",
    categoryUk: "Писанки",
    image: pysanka41,
    images: [pysanka41, pysanka42, pysanka43],
    description:
      "Traditional pysanka made on a blown chicken egg with food-safe dye using wax-resist technique.",
    descriptionUk:
      "Писанка, виконана на видутому курячому яйці харчовими барвниками у восковій техніці.",
    details: [
      "Material: Blown chicken egg",
      "Coloring: Food-safe dye",
      "Technique: Wax-resist",
    ],
    detailsUk: [
      "Матеріали: видуте куряче яйце, барвник харчовий",
      "Техніка виконання: воскова",
    ],
    inStock: true,
  },
  {
    id: "28",
    slug: "pysanka-5",
    name: "Pysanka 5",
    nameUk: "Писанка 5",
    price: 300,
    currency: "₴",
    category: "pysanky",
    categoryUk: "Писанки",
    image: pysanka51,
    images: [pysanka51, pysanka52, pysanka53, pysanka54, pysanka55, pysanka56],
    description:
      "Traditional pysanka made on a blown chicken egg with food-safe dye using wax-resist technique.",
    descriptionUk:
      "Писанка, виконана на видутому курячому яйці харчовими барвниками у восковій техніці.",
    details: [
      "Material: Blown chicken egg",
      "Coloring: Food-safe dye",
      "Technique: Wax-resist",
    ],
    detailsUk: [
      "Матеріали: видуте куряче яйце, барвник харчовий",
      "Техніка виконання: воскова",
    ],
    inStock: true,
  },
  {
    id: "29",
    slug: "pysanka-6",
    name: "Pysanka 6",
    nameUk: "Писанка 6",
    price: 300,
    currency: "₴",
    category: "pysanky",
    categoryUk: "Писанки",
    image: pysanka61,
    images: [pysanka61, pysanka62, pysanka63],
    description:
      "Traditional pysanka made on a blown chicken egg with food-safe dye using wax-resist technique.",
    descriptionUk:
      "Писанка, виконана на видутому курячому яйці харчовими барвниками у восковій техніці.",
    details: [
      "Material: Blown chicken egg",
      "Coloring: Food-safe dye",
      "Technique: Wax-resist",
    ],
    detailsUk: [
      "Матеріали: видуте куряче яйце, барвник харчовий",
      "Техніка виконання: воскова",
    ],
    inStock: true,
  },
  {
    id: "30",
    slug: "pysanka-7",
    name: "Pysanka 7",
    nameUk: "Писанка 7",
    price: 300,
    currency: "₴",
    category: "pysanky",
    categoryUk: "Писанки",
    image: pysanka71,
    images: [pysanka71, pysanka72, pysanka73],
    description:
      "Traditional pysanka made on a blown chicken egg with food-safe dye using wax-resist technique.",
    descriptionUk:
      "Писанка, виконана на видутому курячому яйці харчовими барвниками у восковій техніці.",
    details: [
      "Material: Blown chicken egg",
      "Coloring: Food-safe dye",
      "Technique: Wax-resist",
    ],
    detailsUk: [
      "Матеріали: видуте куряче яйце, барвник харчовий",
      "Техніка виконання: воскова",
    ],
    inStock: true,
  },
  {
    id: "31",
    slug: "pysanka-8",
    name: "Pysanka 8",
    nameUk: "Писанка 8",
    price: 300,
    currency: "₴",
    category: "pysanky",
    categoryUk: "Писанки",
    image: pysanka81,
    images: [pysanka81, pysanka82, pysanka83],
    description:
      "Traditional pysanka made on a blown chicken egg with food-safe dye using wax-resist technique.",
    descriptionUk:
      "Писанка, виконана на видутому курячому яйці харчовими барвниками у восковій техніці.",
    details: [
      "Material: Blown chicken egg",
      "Coloring: Food-safe dye",
      "Technique: Wax-resist",
    ],
    detailsUk: [
      "Матеріали: видуте куряче яйце, барвник харчовий",
      "Техніка виконання: воскова",
    ],
    inStock: true,
  },
  {
    id: "32",
    slug: "pysanka-9",
    name: "Pysanka 9",
    nameUk: "Писанка 9",
    price: 300,
    currency: "₴",
    category: "pysanky",
    categoryUk: "Писанки",
    image: pysanka91,
    images: [pysanka91, pysanka92, pysanka93],
    description:
      "Traditional pysanka made on a blown chicken egg with food-safe dye using wax-resist technique.",
    descriptionUk:
      "Писанка, виконана на видутому курячому яйці харчовими барвниками у восковій техніці.",
    details: [
      "Material: Blown chicken egg",
      "Coloring: Food-safe dye",
      "Technique: Wax-resist",
    ],
    detailsUk: [
      "Матеріали: видуте куряче яйце, барвник харчовий",
      "Техніка виконання: воскова",
    ],
    inStock: true,
  },
  {
    id: "33",
    slug: "pysanka-10",
    name: "Pysanka 10",
    nameUk: "Писанка 10",
    price: 300,
    currency: "₴",
    category: "pysanky",
    categoryUk: "Писанки",
    image: pysanka101,
    images: [pysanka101, pysanka102, pysanka103],
    description:
      "Traditional pysanka made on a blown chicken egg with food-safe dye using wax-resist technique.",
    descriptionUk:
      "Писанка, виконана на видутому курячому яйці харчовими барвниками у восковій техніці.",
    details: [
      "Material: Blown chicken egg",
      "Coloring: Food-safe dye",
      "Technique: Wax-resist",
    ],
    detailsUk: [
      "Матеріали: видуте куряче яйце, барвник харчовий",
      "Техніка виконання: воскова",
    ],
    inStock: true,
  },
  {
    id: "34",
    slug: "pysanka-11",
    name: "Pysanka 11",
    nameUk: "Писанка 11",
    price: 300,
    currency: "₴",
    category: "pysanky",
    categoryUk: "Писанки",
    image: pysanka111,
    images: [pysanka111, pysanka112, pysanka113],
    description:
      "Traditional pysanka made on a blown chicken egg with food-safe dye using wax-resist technique.",
    descriptionUk:
      "Писанка, виконана на видутому курячому яйці харчовими барвниками у восковій техніці.",
    details: [
      "Material: Blown chicken egg",
      "Coloring: Food-safe dye",
      "Technique: Wax-resist",
    ],
    detailsUk: [
      "Матеріали: видуте куряче яйце, барвник харчовий",
      "Техніка виконання: воскова",
    ],
    inStock: true,
  },
  {
    id: "35",
    slug: "pysanka-12",
    name: "Pysanka 12",
    nameUk: "Писанка 12",
    price: 300,
    currency: "₴",
    category: "pysanky",
    categoryUk: "Писанки",
    image: pysanka121,
    images: [pysanka121, pysanka122, pysanka123],
    description:
        "Traditional pysanka made on a blown chicken egg with food-safe dye using wax-resist technique.",
    descriptionUk:
        "Писанка, виконана на видутому курячому яйці харчовими барвниками у восковій техніці.",
    details: [
      "Material: Blown chicken egg",
      "Coloring: Food-safe dye",
      "Technique: Wax-resist",
    ],
    detailsUk: [
      "Матеріали: видуте куряче яйце, барвник харчовий",
      "Техніка виконання: воскова",
    ],
    inStock: true,
  },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (category: string): Product[] =>
  products.filter((p) => p.category === category);
