import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-primary/20 text-primary hover:bg-primary/30 border-primary/30 glow-primary",
    secondary: "border-transparent bg-secondary/20 text-secondary hover:bg-secondary/30 border-secondary/30",
    destructive: "border-transparent bg-destructive/20 text-destructive hover:bg-destructive/30 border-destructive/30",
    success: "border-transparent bg-chart-5/20 text-chart-5 hover:bg-chart-5/30 border-chart-5/30",
    warning: "border-transparent bg-chart-4/20 text-chart-4 hover:bg-chart-4/30 border-chart-4/30",
    outline: "text-foreground border-white/10",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
