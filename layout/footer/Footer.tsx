'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {Phone, Mail, MapPin, Clock,ArrowRight,ChevronDown, Send,} from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, } from "react-icons/fa";

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: 'Home',            href: '/' },
  { label: 'About Us',        href: '/about/profile' },
  { label: 'Board of Directors', href: '/about/bod' },
  { label: 'Management Team', href: '/about/mgt-teams' },
  { label: 'Departments',     href: '/about/departments' },
  { label: 'Career',          href: '/career' },
];

const SERVICES = [
  { label: 'Loan',      href: '/services/loan' },
  { label: 'Saving',    href: '/services/saving' },
  { label: 'Share',     href: '/services/share' },
  { label: 'Insurance', href: '/services/insurance' },
  { label: 'Others',    href: '/services/others' },
  { label: 'Online Banking', href: '/online-banking' },
];

const RESOURCES = [
  { label: 'Annual Reports',   href: '/reports' },
  { label: 'Financial Statements', href: '/reports/financial' },
  { label: 'Teams',            href: '/teams' },
  { label: 'Downloads',        href: '/downloads' },
  { label: 'FAQs',             href: '/faq' },
  { label: 'Notices',          href: '/notices' },
];

const SOCIAL_LINKS = [
  { Icon: FaFacebook, href: '#', label: 'Facebook',  color: 'hover:bg-blue-600' },
  { Icon: FaTwitter,  href: '#', label: 'Twitter',   color: 'hover:bg-sky-500' },
  { Icon: FaLinkedin, href: '#', label: 'LinkedIn',  color: 'hover:bg-blue-700' },
  { Icon: FaYoutube,  href: '#', label: 'YouTube',   color: 'hover:bg-red-600' },
];



const LEGAL_LINKS = [
  { label: 'Privacy Policy',     href: '/privacy' },
  { label: 'Terms of Service',   href: '/terms' },
  { label: 'Cookie Policy',      href: '/cookies' },
  { label: 'Grievance Redressal', href: '/grievance' },
];

// ─── Newsletter ───────────────────────────────────────────────────────────────

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail('');
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-stretch gap-0 rounded-lg overflow-hidden border border-white/15 focus-within:border-yellow-400/60 transition-colors duration-300">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="flex-1 bg-white/5 text-white placeholder-white/35 text-sm px-4 py-3 outline-none min-w-0"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-[#054f22] font-bold text-sm px-4 py-3 transition-all duration-200 active:scale-95"
          aria-label="Subscribe"
        >
          {sent ? 'Sent ✓' : <><Send size={14} /><span className="hidden sm:inline">Subscribe</span></>}
        </button>
      </div>
      {sent && (
        <p className="text-yellow-400 text-xs mt-2 font-medium">
          ✓ Thank you! You're now subscribed.
        </p>
      )}
    </form>
  );
}

// ─── Collapsible mobile column ────────────────────────────────────────────────

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Mobile: collapsible header */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center justify-between py-2 sm:py-0 sm:cursor-default"
        aria-expanded={open}
      >
        <h4 className="text-[11px] font-bold text-yellow-400 uppercase tracking-[0.18em]">
          {title}
        </h4>
        <ChevronDown
          size={14}
          className={`text-white sm:hidden transition-transform duration-250 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Content — always visible on sm+, toggle on mobile */}
      <div className={`mt-4 sm:block ${open ? 'block' : 'hidden'}`}>
        {children}
      </div>
    </div>
  );
}

// ─── Main Footer ──────────────────────────────────────────────────────────────

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden bg-[#074e22]"
      aria-label="Site Footer"
    >
      {/* ── Decorative geometric background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Large circle top-right */}
        <div className="absolute -top-32 -right-32 w-480px h-480px rounded-full border border-white/5" />
        <div className="absolute -top-20 -right-20 w-[320px] h-320px rounded-full border border-white/5" />
        {/* Bottom-left accent */}
        <div className="absolute -bottom-24 -left-24 w-360px] h-360px rounded-full border border-white/4" />
        {/* Diagonal stripe */}
        <div className="absolute top-0 right-0 w-1px h-full bg-gradient from-transparent via-yellow-400/10 to-transparent" />
        {/* Subtle green glow top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-600px h-2px bg-gradient from-transparent via-yellow-400/30 to-transparent" />
      </div>

      {/* ══════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════ */}
      <div className="relative border-b border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-7">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1">
                Start your financial journey
              </p>
              <h3 className="text-white text-lg sm:text-lg font-bold leading-tight">
                Become a Member of SFACL Dhanauri
              </h3>
              <p className="text-white text-sm mt-1">
                Join 10,000+ members enjoying better savings, loans & financial freedom.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink">
              <Link
                href="/membership"
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-[#054f22] font-bold text-sm px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-[0_0_24px_rgba(250,204,21,0.4)] active:scale-95"
              >
                Join Now <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:bg-white/5"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

    
      <div className="relative max-w-7xl mx-auto px-6 lg:px-9 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">

          {/* ── Col 1: Brand ── */}
          <div className="sm:col-span-2 lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="relative w-12 h-12 flex">
                <Image
                  src="/logo.png"
                  alt="SFACL Dhanauri Logo"
                  sizes="48px"
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div>
                <p className="text-white font-bold text-base leading-tight tracking-wide">SFACL DHANAURI</p>
                <p className="text-white text-[11px] tracking-widest">Small Farmer Agricultural Co-operative Limited</p>
              </div>
            </Link>

            <p className="text-white text-sm leading-relaxed max-w-xs">
              Empowering the community of Khareni Dang through trusted cooperative banking, accessible financial services, and member-first values since our founding.
            </p>

            {/* Contact info */}
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3 text-sm text-white group">
                <MapPin size={15} className="text-yellow-400/80 flex mt-0.5" />
                <span>Shantinagar, Ward No. 07, Khareni, Dang <br />
                      Lumbini Province
                </span>
              </li>
              <li>
                <a href="tel:+9779818145290" className="flex items-center gap-3 text-sm text-white hover:text-yellow-400 transition-colors duration-200 group">
                  <Phone size={15} className="text-yellow-400/80 flex" />
                  <span>+977 9818145290</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@sfacldhanauri.com" className="flex items-center gap-3 text-sm text-white hover:text-yellow-400 transition-colors duration-200 group">
                  <Mail size={15} className="text-yellow-400/80 flex" />
                  <span>info@sfacldhanauri.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white">
                <Clock size={15} className="text-yellow-400/80 flex" />
                <span>Sun–Fri: 10:00 AM – 5:00 PM</span>
              </li>
            </ul>

            {/* Social icons */}
            <div className="flex gap-2 mt-7">
              {SOCIAL_LINKS.map(({ Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`flex items-center justify-center w-9 h-9 rounded-lg bg-white/8 border border-white/10 text-white hover:text-white ${color} hover:border-transparent transition-all duration-250`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <FooterColumn title="Quick Links">
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-sm text-white hover:text-yellow-400 transition-colors duration-200 group"
                  >
                    <ArrowRight size={11} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-yellow-400" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>


     {/* ── Col 2: Quick Links ── */}
          <FooterColumn title="Quick Links">
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-center gap-1 text-sm text-white hover:text-yellow-400 transition-colors duration-200 group"
                  >
                    <ArrowRight size={11} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-yellow-400" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>


          {/* ── Col 3: Services ── */}
          <FooterColumn title="Our Services">
            <ul className="space-y-2.5">
              {SERVICES.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-sm text-white hover:text-yellow-400 transition-colors duration-200 group"
                  >
                    <ArrowRight size={11} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-yellow-400" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* ── Col 4: Resources + Newsletter ── */}
          <FooterColumn title="Resources">
            <ul className="space-y-2.5 mb-8">
              {RESOURCES.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-sm text-white hover:text-yellow-400 transition-colors duration-200 group"
                  >
                    <ArrowRight size={11} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-yellow-400" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter mini-section */}
            <div className="border-t border-white/10 pt-6">
              <h4 className="text-[11px] font-bold text-yellow-400 uppercase tracking-[0.18em] mb-1">
                Newsletter
              </h4>
              <p className="text-white text-xs leading-relaxed mb-1">
                Get updates on rates, notices & news.
              </p>
              <NewsletterForm />
            </div>
          </FooterColumn>

        </div>
      </div>

      <div className="relative border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Copyright */}
            <p className="text-white text-xs text-center md:text-left">
              © {year} SFACL Dhanauri — Small Farmer Agricultural Cooperative Ltd.
              All rights reserved.
            </p>

            {/* Legal links */}
            <nav aria-label="Legal links">
              <ul className="flex flex-wrap justify-center md:justify-end gap-x-5 gap-y-1">
                {LEGAL_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-white hover:text-white text-[11px] transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;