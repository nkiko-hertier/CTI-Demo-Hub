import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, ChevronRight } from "lucide-react";
import { useGetSearchSuggestions } from "@workspace/api-client-react";
import { useDebounce } from "use-debounce";
import { OverviewPanel } from "@/components/dashboard/OverviewPanel";
import { UrlsPanel } from "@/components/dashboard/UrlsPanel";
import { PasswordsPanel } from "@/components/dashboard/PasswordsPanel";
import { StealersPanel } from "@/components/dashboard/StealersPanel";
import { ApplicationsPanel } from "@/components/dashboard/ApplicationsPanel";
import { motion, AnimatePresence } from "framer-motion";

export default function Search() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const domainParam = searchParams.get("domain");

  const [searchInput, setSearchInput] = useState(domainParam || "");
  const [debouncedInput] = useDebounce(searchInput, 300);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeDomain, setActiveDomain] = useState<string | null>(domainParam);

  const { data: suggestions } = useGetSearchSuggestions(
    { query: debouncedInput },
    { query: { enabled: debouncedInput.length > 2 && isDropdownOpen } }
  );

  const handleSearch = (domain: string) => {
    setIsDropdownOpen(false);
    setSearchInput(domain);
    setActiveDomain(domain);
    setLocation(`/search?domain=${domain}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchInput) {
      handleSearch(searchInput);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <Navbar />

      <main className="flex-1 relative z-10 container mx-auto px-4 py-8">
        {/* Search Bar Section */}
        <div className={`max-w-3xl mx-auto transition-all duration-500 ease-in-out ${activeDomain ? 'mb-12' : 'mt-32'}`}>
          <h2 className="text-center font-display font-semibold text-2xl mb-6 text-foreground">
            Domain Intelligence Search
          </h2>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <Input
              type="text"
              placeholder="Enter domain (e.g. example.com)"
              className="w-full pl-12 pr-28 h-16 text-lg bg-card border-border focus-visible:ring-primary focus-visible:border-primary rounded-xl shadow-sm font-sans"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute inset-y-2 right-2">
              <Button 
                onClick={() => handleSearch(searchInput)}
                disabled={!searchInput}
                className="h-full rounded-lg px-4 font-medium"
              >
                Search <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {isDropdownOpen && suggestions && suggestions.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50"
                >
                  {suggestions.map((company, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left px-4 py-3 flex items-center gap-4 hover:bg-muted transition-colors border-b border-border last:border-0"
                      onClick={() => handleSearch(company.domain)}
                    >
                      <div className="w-8 h-8 rounded bg-muted flex items-center justify-center overflow-hidden shrink-0 border border-border">
                        <img 
                          src={`https://logos.hunter.io/${company.domain}`} 
                          alt="" 
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-foreground font-medium truncate">{company.name}</div>
                        <div className="text-muted-foreground text-sm truncate">{company.domain}</div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeDomain && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 mb-8 p-6 bg-card border border-border rounded-2xl shadow-sm">
              <div className="w-14 h-14 rounded-xl bg-background flex items-center justify-center overflow-hidden shrink-0 border border-border shadow-sm">
                <img
                  src={`https://logos.hunter.io/${activeDomain}`}
                  alt={activeDomain}
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.style.display = "none";
                    const parent = img.parentElement;
                    if (parent) {
                      parent.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`;
                    }
                  }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-display font-semibold text-foreground">
                  {activeDomain}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Intelligence Report
                </p>
              </div>
            </div>

            <OverviewPanel domain={activeDomain} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <UrlsPanel domain={activeDomain} />
              </div>
              <PasswordsPanel domain={activeDomain} />
              
              <div className="xl:col-span-2">
                <ApplicationsPanel domain={activeDomain} />
              </div>
              <StealersPanel domain={activeDomain} />
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
