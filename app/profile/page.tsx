"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  CreditCard,
  HelpCircle,
  Info,
  Settings,
  LogOut,
  ChevronRight,
  User as UserIcon,
} from "lucide-react";
import { getSession, clearSession, Session } from "@/lib/auth";

const MENU = [
  { href: "/orders", label: "My Bookings", icon: Calendar },
  { href: "#", label: "My Addresses", icon: MapPin },
  { href: "#", label: "Payment Methods", icon: CreditCard },
  { href: "#", label: "Help & Support", icon: HelpCircle },
  { href: "#", label: "About Eazzy", icon: Info },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function ProfilePage() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(getSession());
  }, []);

  if (!session) {
    return (
      <div className="mx-auto max-w-sm px-5 py-16 text-center">
        <p className="text-muted">You're not logged in.</p>
        <Link href="/login" className="mt-4 inline-block rounded bg-teal px-6 py-3 font-bold text-paper">
          Log in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm px-5 pb-24 pt-8 md:pb-12">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-line dark:bg-white/10">
          <UserIcon size={32} className="text-muted" />
        </div>
        <h1 className="mt-3 font-heading text-lg font-bold text-ink dark:text-white">{session.name}</h1>
        <p className="text-sm text-muted">+91 {session.phone}</p>
      </div>

      <div className="mt-8 divide-y divide-line rounded border border-line bg-white dark:divide-white/10 dark:border-white/10 dark:bg-[#1A1A1A]">
        {MENU.map(({ href, label, icon: Icon }) => (
          <Link key={label} href={href} className="flex items-center gap-3 px-4 py-3.5">
            <Icon size={18} className="text-ink dark:text-white" />
            <span className="flex-1 text-sm text-ink dark:text-white">{label}</span>
            <ChevronRight size={16} className="text-muted" />
          </Link>
        ))}
      </div>

      <button
        onClick={() => {
          clearSession();
          window.location.href = "/";
        }}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded border border-red-200 py-3 text-sm font-bold text-red-500 hover:bg-red-50"
      >
        <LogOut size={16} /> Logout
      </button>
    </div>
  );
}
