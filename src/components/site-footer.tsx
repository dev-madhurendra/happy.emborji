import type React from "react";
import {
  Heart,
  Mail,
  MapPin,
  Phone,
  Leaf,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react";
import { whatsappNo, whatsappHrefGreetings } from "../utils/constants";

export function SiteFooter() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-[#D8CAB8] bg-[#FAF8F5]">
      {/* Background Gradient Circles */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#D87C5D]/10 blur-3xl"></div>
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-[#7A8B74]/15 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 h-80 w-80 rounded-full bg-[#E8D5C4]/20 blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <a
              href="/"
              className="group mb-4 inline-flex items-center gap-2 cursor-pointer"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#7A8B74] to-[#D87C5D] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md">
                <Leaf className="h-6 w-6 text-[#FAF8F5]" />
              </div>
              <span className="font-serif text-2xl font-bold text-[#3C3C3C]">
                happy.embroji
              </span>
            </a>

            <p className="mb-6 max-w-sm text-sm leading-relaxed text-[#556B2F]">
              Handcrafted crochet and embroidery made with love and care. Each
              piece tells a story of craftsmanship, patience, and timeless
              artistry.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <FooterContact
                href="mailto:happy.embroji@gmail.com"
                icon={<Mail className="h-4 w-4" />}
                text="happy.embroji@gmail.com"
              />
              <FooterContact
                href={`tel:${whatsappNo}`}
                icon={<Phone className="h-4 w-4" />}
                text={whatsappNo}
              />
              <div className="flex items-center gap-3 text-sm text-[#556B2F]">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8D5C4]/30">
                  <MapPin className="h-4 w-4 text-[#D87C5D]" />
                </div>
                <span>Khalilabad, Sant Kabir Nagar, Uttar Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <FooterCol title="Shop" icon="🧵">
            <FooterLink href="/products">All Products</FooterLink>
            <FooterSubSection>
              <FooterLink href="/crochet" isSubItem>
                Crochet Collection
              </FooterLink>
              <FooterLink href="/embroidery" isSubItem>
                Embroidery Art
              </FooterLink>
            </FooterSubSection>
            <FooterSubSection>
              <FooterLink href="/products?category=bouquet" isSubItem>
                Bouquets
              </FooterLink>
              <FooterLink href="/products?category=keychain" isSubItem>
                Keychains
              </FooterLink>
            </FooterSubSection>
          </FooterCol>

          {/* Company Links */}
          <FooterCol title="Company" icon="🏡">
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/reviews">Customer Reviews</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
          </FooterCol>

          {/* Connect & Legal */}
          <FooterCol title="Connect" icon="🌿">
            <div className="mb-4 space-y-2">
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/shipping">Shipping Info</FooterLink>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#556B2F]">
                Follow Us
              </p>
              <div className="flex gap-2">
                <SocialButton
                  href="https://instagram.com/@happy.embroji"
                  icon={<Instagram className="h-5 w-5" />}
                  hover="from-[#F2A97F] to-[#D87C5D]"
                />
                <SocialButton
                  href="https://facebook.com/@happy.embroji"
                  icon={<Facebook className="h-5 w-5" />}
                  hover="from-[#7A8B74] to-[#B3A078]"
                />
                <SocialButton
                  href={whatsappHrefGreetings()}
                  icon={<MessageCircle className="h-5 w-5" />}
                  hover="from-[#7A8B74] to-[#5D7059]"
                />
              </div>
            </div>
          </FooterCol>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 rounded-xl border border-[#D8CAB8] bg-[#FAF8F5]/70 p-8 text-center backdrop-blur-sm shadow-md">
          <Leaf className="mx-auto mb-3 h-8 w-8 text-[#7A8B74]" />
          <h3 className="mb-2 text-xl font-bold text-[#3C3C3C]">
            Stay Connected
          </h3>
          <p className="mb-4 text-sm text-[#556B2F]">
            Join our craft family to receive updates about new collections and
            exclusive offers.
          </p>
          <div className="mx-auto flex max-w-md gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-[#D8CAB8] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#3C3C3C] outline-none transition-colors focus:border-[#7A8B74] focus:ring-2 focus:ring-[#7A8B74]/30"
            />
            <button className="rounded-lg bg-[#7A8B74] px-6 py-2.5 text-sm font-semibold text-[#FAF8F5] transition-all duration-300 hover:bg-[#556B2F] hover:shadow-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#D8CAB8] bg-[#FAF8F5]/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm md:flex-row">
          <p className="text-[#556B2F]">
            © {new Date().getFullYear()} happy.embroji. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-[#556B2F]">
            <span>Made with</span>
            <Heart className="h-4 w-4 fill-[#D87C5D] text-[#D87C5D] animate-pulse" />
            <span>in India</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#556B2F]">We accept:</span>
            <div className="flex gap-1.5">
              {["GPay", "PhonePe", "Card"].map((m) => (
                <div
                  key={m}
                  className="rounded-md border border-[#D8CAB8] bg-[#FAF8F5] px-2.5 py-1 text-xs font-semibold text-[#3C3C3C]"
                >
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* Subcomponents */
function FooterCol({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#3C3C3C]">
        {icon && <span className="text-base">{icon}</span>}
        {title}
      </h3>
      <ul className="space-y-1">{children}</ul>
    </div>
  );
}

function FooterSubSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-3 border-l-2 border-[#D8CAB8] pl-3 space-y-1">
      {children}
    </div>
  );
}

function FooterLink({
  href,
  children,
  isSubItem = false,
}: {
  href: string;
  children: React.ReactNode;
  isSubItem?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        className={`group inline-flex items-center text-sm text-[#556B2F] transition-all duration-300 hover:text-[#7A8B74] hover:translate-x-1 cursor-pointer ${
          isSubItem ? "text-xs" : ""
        }`}
      >
        <span
          className={`mr-2 rounded-full bg-[#D87C5D] opacity-0 transition-all duration-300 group-hover:opacity-100 ${
            isSubItem ? "h-1 w-1" : "h-1.5 w-1.5"
          }`}
        ></span>
        {children}
      </a>
    </li>
  );
}

function FooterContact({
  href,
  icon,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3 text-sm text-[#556B2F] transition-colors hover:text-[#7A8B74]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8D5C4]/30 transition-all duration-300 group-hover:bg-[#E8D5C4]/50 group-hover:scale-105">
        <div className="text-[#7A8B74]">{icon}</div>
      </div>
      <span>{text}</span>
    </a>
  );
}

function SocialButton({
  href,
  icon,
  hover,
}: {
  href: string;
  icon: React.ReactNode;
  hover: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`flex h-10 w-10 items-center justify-center rounded-lg bg-[#FAF8F5] text-[#7A8B74] transition-all duration-300 hover:bg-gradient-to-br ${hover} hover:text-white hover:scale-110 shadow-sm cursor-pointer`}
    >
      {icon}
    </a>
  );
}
