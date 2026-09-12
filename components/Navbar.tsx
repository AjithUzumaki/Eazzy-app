"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, MapPin, Menu } from "lucide-react";
import Wordmark from "./Wordmark";
import { getSession, Session } from "@/lib/auth";

const DESKTOP_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services/AC", label: "Services" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#about", label: "About Us" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(getSession());
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper dark:border-white/10 dark:bg-[#0B0B0B]">
      {/* Mobile app-style header */}
      <div className="flex items-center justify-between px-5 py-4 md:hidden">
        <button aria-label="Menu" className="text-ink dark:text-white">
          <Menu size={22} />
        </button>
        <Link href="/">
          <Wordmark />
        </Link>
        <Link href="/profile" aria-label="Notifications" className="text-ink dark:text-white">
          <Bell size={22} />
        </Link>
      </div>

      {/* Desktop marketing nav */}
      <div className="mx-auto hidden max-w-6xl items-center justify-between px-8 py-4 md:flex">
        <Link href="/">
          <Wordmark size="text-2xl" tagline />
        </Link>
        <nav className="flex items-center gap-8 text-sm font-medium text-ink dark:text-white">
          {DESKTOP_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-amber">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-sm text-ink dark:text-white">
            <MapPin size={16} /> Chennai, India
          </span>
          <Link
            href={session ? "/" : "/login"}
            className="rounded bg-teal px-5 py-2.5 text-sm font-bold text-paper hover:bg-teal-dark"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
