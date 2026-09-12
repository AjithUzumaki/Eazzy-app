// Dark/light mode helper. Applies a "dark" class to <html>, matching
// Tailwind's `darkMode: "class"` strategy, and remembers the choice.

const KEY = "eazzy_theme";

export type Theme = "light" | "dark";

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem(KEY) as Theme) || "light";
}

export function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(KEY, theme);
}
