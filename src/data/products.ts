export type Product = {
  id: string
  name: string
  price: number
  category: "crochet" | "embroidery"
  tags?: string[]
  image: string
  images?: string[]
}

export const products: Product[] = [
  {
    id: "p2",
    name: "Hoop Art – Initial",
    price: 29,
    category: "embroidery",
    tags: ["hoop-art"],
    image: "/embroidery-hoop.jpg",
    images: ["/embroidery-hoop.jpg", "/embroidery-closeup.jpg"],
  },
  {
    id: "p3",
    name: "Keychain – Daisy",
    price: 12,
    category: "crochet",
    tags: ["keychains"],
    image: "/crochet-keychain.jpg",
    images: ["/crochet-keychain.jpg"],
  },
  {
    id: "p4",
    name: "Name Frame – Pastel",
    price: 59,
    category: "embroidery",
    tags: ["name-frames"],
    image: "/embroidery-name-frame.jpg",
    images: ["/embroidery-name-frame.jpg"],
  },
  {
    id: "p5",
    name: "Baby Set – Booties",
    price: 35,
    category: "crochet",
    tags: ["baby-sets"],
    image: "/crochet-baby-set.jpg",
    images: ["/crochet-baby-set.jpg"],
  },
  {
    id: "p6",
    name: "Phone Charm – Hearts",
    price: 10,
    category: "crochet",
    tags: ["phone-charms"],
    image: "/crochet-phone-charm.jpg",
    images: ["/crochet-phone-charm.jpg"],
  },
  {
    id: "p7",
    name: "Coasters – Floral",
    price: 16,
    category: "crochet",
    tags: ["coasters"],
    image: "/crochet-coasters.jpg",
    images: ["/crochet-coasters.jpg"],
  },
  {
    id: "p8",
    name: "Hair Bow – Embroidered",
    price: 14,
    category: "embroidery",
    tags: ["hair-accessories"],
    image: "/embroidered-hair-bow.jpg",
    images: ["/embroidered-hair-bow.jpg"],
  },
  {
    id: "p9",
    name: "Bookmark – Petals",
    price: 9,
    category: "crochet",
    tags: ["bookmarks"],
    image: "/crochet-bookmark.jpg",
    images: ["/crochet-bookmark.jpg"],
  },
  {
    id: "p10",
    name: "Doll – Mini Friend",
    price: 39,
    category: "crochet",
    tags: ["dolls"],
    image: "/crochet-doll.jpg",
    images: ["/crochet-doll.jpg"],
  },
]
