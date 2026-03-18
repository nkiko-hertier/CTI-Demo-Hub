import { useGetDomainStealerFamilies } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Bug } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";

export function StealersPanel({ domain }: { domain: string }) {
  const { data, isLoading, isError } = useGetDomainStealerFamilies(domain);

  if (isLoading) return <Skeleton className="h-[400px] w-full" />;
  if (isError || !data || !data.stealerFamilies) return null;

  const chartData = Object.entries(data.stealerFamilies)
    .map(([name, count]) => ({ name, count: Number(count) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10

  return (
    <Card className="h-[400px] flex flex-col shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Bug className="w-5 h-5 text-primary" /> Malware Families
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 pb-0">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            No malware data
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke="hsl(var(--foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                width={80}
              />
              <RechartsTooltip 
                cursor={{ fill: 'hsl(var(--muted))' }}
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
