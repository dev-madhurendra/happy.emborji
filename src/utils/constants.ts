const whatsappNo = import.meta.env.VITE_WHATSAPP_NO
export const whatsappHref = (pName: string) =>
  `https://wa.me/${whatsappNo}/?text=${encodeURIComponent(
    `Hi! I'm interested in ${pName}. Could you share more details?`
  )}`;

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove non-word characters
    .replace(/\s+/g, "-"); // replace spaces with hyphens
}
