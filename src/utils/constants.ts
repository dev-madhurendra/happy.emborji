export const whatsappHref = (pName: string) =>
  `https://wa.me/919999999999?text=${encodeURIComponent(
    `Hi! I'm interested in ${pName}. Could you share more details?`
  )}`;
