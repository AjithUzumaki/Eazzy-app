"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Moon, Sun } from "lucide-react";
import { getStoredTheme, applyTheme, Theme } from "@/lib/theme";

export default function SettingsPage() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(getStoredTheme());
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
  }

  return (
    <div className="mx-auto max-w-sm px-5 pb-24 pt-8 md:pb-12">
      <div className="flex items-center gap-3">
        <Link href="/profile" className="text-ink dark:text-white">
          <ChevronLeft size={22} />
        </Link>
        <h1 className="font-heading text-xl font-bold text-ink dark:text-white">Settings</h1>
      </div>

      <div className="mt-8 rounded border border-line bg-white p-4 dark:border-white/10 dark:bg-[#1A1A1A]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === "dark" ? (
              <Moon size={18} className="text-amber" />
            ) : (
              <Sun size={18} className="text-amber-dark" />
            )}
            <div>
              <p className="text-sm font-bold text-ink dark:text-white">Dark Mode</p>
              <p className="text-xs text-muted">Switch between light and dark theme</p>
            </div>
          </div>
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className={`relative h-7 w-12 rounded-full transition ${
              theme === "dark" ? "bg-amber" : "bg-line"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                theme === "dark" ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
