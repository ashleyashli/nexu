import { useTheme } from "@/lib/theme-provider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="fixed right-4 top-4 z-40 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-1 text-text-secondary shadow-sm transition-all hover:border-border-hover hover:text-text-primary hover:bg-surface-2"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
