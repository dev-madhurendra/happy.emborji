import type React from "react"
import { Link } from "react-router-dom";
import { Heart, Mail, MapPin, Phone, Sparkles, Instagram, Facebook, MessageCircle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t bg-gradient-to-br from-pink-50 via-purple-50 to-amber-50">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-pink-200/30 blur-3xl"></div>
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-purple-200/30 blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="group mb-4 inline-flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 shadow-lg transition-transform group-hover:scale-105">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="font-serif text-2xl font-bold">happy.embroji</span>
            </Link>
            
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Handcrafted crochet and embroidery made with love. Each piece tells a story, crafted with premium materials and timeless techniques. Custom orders welcome.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="mailto:happy.embroji@gmail.com" 
                className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 transition-colors group-hover:bg-pink-200">
                  <Mail className="h-4 w-4 text-pink-600" />
                </div>
                <span>happy.embroji@gmail.com</span>
              </a>

              <a 
                href="tel:+919999999999" 
                className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 transition-colors group-hover:bg-purple-200">
                  <Phone className="h-4 w-4 text-purple-600" />
                </div>
                <span>+91 99999 99999</span>
              </a>

              <div className="group flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                  <MapPin className="h-4 w-4 text-amber-600" />
                </div>
                <span>Khalilabad, Sant Kabir Nagar, Uttar Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <FooterCol title="Shop">
            <FooterLink href="/products">All Products</FooterLink>
            <FooterLink href="/crochet">Crochet Collection</FooterLink>
            <FooterLink href="/embroidery">Embroidery Art</FooterLink>
            <FooterLink href="/products?category=bouquet">Bouquets</FooterLink>
            <FooterLink href="/products?category=keychain">Keychains</FooterLink>
          </FooterCol>

          {/* Company Links */}
          <FooterCol title="Company">
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/reviews">Customer Reviews</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
          </FooterCol>

          {/* Legal & Social */}
          <FooterCol title="Connect">
            <div className="mb-4 space-y-2">
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/shipping">Shipping Info</FooterLink>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Follow Us
              </p>
              <div className="flex gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-md transition-all hover:scale-110 hover:shadow-lg"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md transition-all hover:scale-110 hover:shadow-lg"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-lg bg-green-500 text-white shadow-md transition-all hover:scale-110 hover:shadow-lg"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>
          </FooterCol>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 rounded-2xl border-2 bg-gradient-to-r from-pink-100 via-purple-100 to-amber-100 p-8 text-center">
          <Sparkles className="mx-auto mb-3 h-8 w-8 text-amber-600" />
          <h3 className="mb-2 text-xl font-bold">Stay Updated!</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Get notified about new collections, special offers, and exclusive discounts.
          </p>
          <div className="mx-auto flex max-w-md gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border-2 bg-white px-4 py-2 text-sm outline-none focus:border-pink-500"
            />
            <button className="rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-white/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm md:flex-row">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} happy.embroji. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 fill-pink-500 text-pink-500 animate-pulse" />
            <span>in India</span>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">We accept:</span>
            <div className="flex gap-1">
              <div className="rounded bg-white px-2 py-1 text-xs font-semibold shadow-sm">GPay</div>
              <div className="rounded bg-white px-2 py-1 text-xs font-semibold shadow-sm">PhonePe</div>
              <div className="rounded bg-white px-2 py-1 text-xs font-semibold shadow-sm">Card</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">{title}</h3>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        to={href} 
        className="group inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="mr-2 h-1 w-1 rounded-full bg-pink-400 opacity-0 transition-opacity group-hover:opacity-100"></span>
        {children}
      </Link>
    </li>
  )
}