import { useGetDomainCounts } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Users, Building2, Briefcase, Skull, ShieldAlert } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function OverviewPanel({ domain }: { domain: string }) {
  const { data, isLoading, isError } = useGetDomainCounts(domain);

  if (isLoading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
    </div>
  );

  if (isError || !data) return null;

  const stats = [
    { 
      label: "Total Compromised", 
      value: data.total, 
      icon: Skull, 
      color: "text-destructive", 
      bg: "bg-destructive/10" 
    },
    { 
      label: "Employees", 
      value: data.employees, 
      icon: Briefcase, 
      color: "text-primary", 
      bg: "bg-primary/10" 
    },
    { 
      label: "Users / Clients", 
      value: data.users, 
      icon: Users, 
      color: "text-secondary-foreground", 
      bg: "bg-secondary" 
    },
    { 
      label: "Third Parties", 
      value: data.third_parties, 
      icon: Building2, 
      color: "text-chart-4", 
      bg: "bg-chart-4/10" 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <div className={`w-8 h-8 rounded-md flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {formatNumber(stat.value)}
              </div>
              {(stat.label === "Employees" && data.last_employee_compromised) && (
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-amber-500" />
                  Last: {new Date(data.last_employee_compromised).toLocaleDateString()}
                </p>
              )}
              {(stat.label === "Users / Clients" && data.last_user_compromised) && (
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-amber-500" />
                  Last: {new Date(data.last_user_compromised).toLocaleDateString()}
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
