export const whatsappNo = import.meta.env.VITE_WHATSAPP_NO;
const whatsappBase = (message: string) =>
  `https://wa.me/${whatsappNo}/?text=${encodeURIComponent(message)}`;

export const whatsappHref = (productName: string) =>
  whatsappBase(
    `Hi! I'm interested in *${productName}*. Could you share more details?`
  );

export const whatsappHrefGreetings = () =>
  whatsappBase("Hey 👋 Hope you're doing well!");

export function slugify(str?: string): string {
  if(!str) return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function deslugify(slug: string): string {
  return slug
    .replace(/-/g, " ")         
    .replace(/\s+/g, " ")        
    .trim()                     
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
