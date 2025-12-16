export type Product = {
  _id: string
  name: string
  price: number
  category: string  
  tag: "embroidery" | "crochet"  
  image: string
  description?: string
  images?: string[]
  discount?: number
}

export type ProductMinimal = Pick<Product, "_id" | "name">


export const staticProducts: Product[] = [
  {
    _id: "p2",
    name: "Hoop Art – Initial",
    price: 29,
    category: "Hoop Art",
    tag: "embroidery",
    image: "/embroidery-hoop.jpg",
    images: ["/embroidery-hoop.jpg", "/embroidery-closeup.jpg"],
  },
  {
    _id: "p3",
    name: "Keychain – Daisy",
    price: 12,
    category: "Keychains",
    tag: "crochet",
    image: "/crochet-keychain.jpg",
    images: ["/crochet-keychain.jpg"],
  },
  {
    _id: "p4",
    name: "Name Frame – Pastel",
    price: 59,
    category: "Name Frames",
    tag: "embroidery",
    image: "/embroidery-name-frame.jpg",
    images: ["/embroidery-name-frame.jpg"],
  },
  {
    _id: "p5",
    name: "Baby Set – Booties",
    price: 35,
    category: "Baby Sets",
    tag: "crochet",
    image: "/crochet-baby-set.jpg",
    images: ["/crochet-baby-set.jpg"],
  },
  {
    _id: "p6",
    name: "Phone Charm – Hearts",
    price: 10,
    category: "Phone Charms",
    tag: "embroidery",
    image: "/crochet-phone-charm.jpg",
    images: ["/crochet-phone-charm.jpg"],
  },
  {
    _id: "p7",
    name: "Coasters – Floral",
    price: 16,
    category: "Coasters",
    tag: "crochet",
    image: "/crochet-coasters.jpg",
    images: ["/crochet-coasters.jpg"],
  },
  {
    _id: "p8",
    name: "Hair Bow – Embroidered",
    price: 14,
    category: "Hair Accessories",
    tag: "embroidery",
    image: "/embroidered-hair-bow.jpg",
    images: ["/embroidered-hair-bow.jpg"],
  },
  {
    _id: "p9",
    name: "Bookmark – Petals",
    price: 9,
    category: "Bookmarks",
    tag: "crochet",
    image: "/crochet-bookmark.jpg",
    images: ["/crochet-bookmark.jpg"],
  },
  {
    _id: "p10",
    name: "Doll – Mini Friend",
    price: 39,
    category: "Dolls",
    tag: "embroidery",
    image: "/crochet-doll.jpg",
    images: ["/crochet-doll.jpg"],
  },
]