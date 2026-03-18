import { Link, useLocation } from "wouter";
import { ShieldAlert, Search, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground group"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 transition-all">
            <ShieldAlert className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display font-bold text-lg">
            UMULINZI <span className="text-primary">CTI</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/search"
            className={cn(
              "text-sm font-medium flex items-center gap-2 transition-colors hover:text-primary",
              location === "/search" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Search className="w-4 h-4" />
            Search
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
