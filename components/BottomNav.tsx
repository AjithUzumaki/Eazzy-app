"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Tag, User } from "lucide-react";

const TABS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/orders", label: "Bookings", icon: Calendar },
  { href: "/offers", label: "Offers", icon: Tag },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper dark:border-white/10 dark:bg-[#0B0B0B] md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around py-2">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-3 py-1 text-xs ${
                active ? "text-amber" : "text-muted"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
