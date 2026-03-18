import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 cyber-grid pointer-events-none" />
      
      <div className="relative z-10 text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-2xl bg-destructive/10 border border-destructive/30 flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-destructive" />
          </div>
        </div>
        
        <div>
          <h1 className="text-6xl font-display font-bold text-foreground mb-2">404</h1>
          <h2 className="text-xl font-mono text-muted-foreground uppercase tracking-widest">Sector Not Found</h2>
        </div>
        
        <p className="text-muted-foreground font-sans">
          The intelligence sector you are attempting to access does not exist or requires higher clearance.
        </p>
        
        <Link href="/">
          <Button variant="outline" className="mt-4 font-mono tracking-widest">
            RETURN TO BASE
          </Button>
        </Link>
      </div>
    </div>
  );
}
