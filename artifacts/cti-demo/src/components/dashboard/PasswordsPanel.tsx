import { useGetDomainPasswords } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { KeyRound } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";

const COLORS = {
  too_weak: "hsl(var(--destructive))",
  weak: "hsl(var(--chart-4))",
  medium: "hsl(var(--chart-2))",
  strong: "hsl(var(--chart-5))",
};

export function PasswordsPanel({ domain }: { domain: string }) {
  const { data, isLoading, isError } = useGetDomainPasswords(domain);

  if (isLoading) return <Skeleton className="h-[400px] w-full" />;
  if (isError || !data) return null;

  const transformData = (pwData: any) => [
    { name: "Too Weak", value: pwData.too_weak?.qty || 0, color: COLORS.too_weak },
    { name: "Weak", value: pwData.weak?.qty || 0, color: COLORS.weak },
    { name: "Medium", value: pwData.medium?.qty || 0, color: COLORS.medium },
    { name: "Strong", value: pwData.strong?.qty || 0, color: COLORS.strong },
  ].filter(d => d.value > 0);

  const employeeData = transformData(data.employeePasswords);

  return (
    <Card className="h-full shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <KeyRound className="w-5 h-5 text-primary" /> Password Strength
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center">
        {employeeData.length === 0 ? (
           <div className="text-muted-foreground text-sm">No password data</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={employeeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {employeeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
