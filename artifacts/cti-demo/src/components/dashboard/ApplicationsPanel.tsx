import { useGetDomainApplications } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AppWindow, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ApplicationsPanel({ domain }: { domain: string }) {
  const { data, isLoading, isError } = useGetDomainApplications(domain);

  if (isLoading) return <Skeleton className="h-[400px] w-full" />;
  if (isError || !data || !data.appDetails) return null;

  return (
    <Card className="h-[400px] flex flex-col shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <AppWindow className="w-5 h-5 text-primary" /> Detected Applications
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto pr-2 space-y-4">
        {data.appDetails.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            No applications detected
          </div>
        ) : (
          data.appDetails.map((app, i) => (
            <div key={i} className="p-4 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-foreground">
                  {app.name}
                </h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {app.description}
              </p>
              
              {app.ai_scenarios && app.ai_scenarios.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-2 mb-2 text-xs font-medium text-secondary-foreground">
                    <Cpu className="w-4 h-4" /> Threat Scenarios
                  </div>
                  <ul className="space-y-1.5">
                    {app.ai_scenarios.map((scenario, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-destructive mt-0.5">•</span> {scenario}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
