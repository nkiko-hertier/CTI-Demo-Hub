import { useState } from "react";
import { useGetDomainUrls } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Link, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function UrlsPanel({ domain }: { domain: string }) {
  const { data, isLoading, isError } = useGetDomainUrls(domain);
  const [activeTab, setActiveTab] = useState<"employees" | "clients">("employees");

  if (isLoading) return <Skeleton className="h-[400px] w-full" />;
  if (isError || !data) return null;

  const urls = activeTab === "employees" ? data.data.employees_urls : data.data.clients_urls;

  return (
    <Card className="h-full flex flex-col shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Globe className="w-5 h-5 text-primary" /> Compromised URLs
        </CardTitle>
        <div className="flex bg-muted p-1 rounded-lg border border-border">
          <button
            onClick={() => setActiveTab("employees")}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
              activeTab === "employees" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Employees
          </button>
          <button
            onClick={() => setActiveTab("clients")}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
              activeTab === "clients" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Clients
          </button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto max-h-[350px] pr-2">
        {!urls || urls.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            No data found
          </div>
        ) : (
          <div className="space-y-2">
            {urls.slice(0, 15).map((item, i) => (
              <div key={i} className="flex items-start justify-between p-3 rounded-lg bg-card border border-border hover:bg-muted/50 transition-colors shadow-sm">
                <div className="flex items-start gap-3 overflow-hidden">
                  <div className="mt-1">
                    <Link className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-mono text-foreground truncate max-w-[200px] sm:max-w-[300px]" title={item.url}>
                      {item.url}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 capitalize">Type: {item.type}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="ml-2 whitespace-nowrap">
                  {item.occurrence} hits
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
