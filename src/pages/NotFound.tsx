import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Code2 } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground px-4">
      <div className="text-center max-w-md space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-2xl mx-auto">
          404
        </div>
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Page Not Found</h1>
          <p className="text-sm text-muted-foreground">
            The page <code className="text-cyan-400 font-mono text-xs bg-muted px-1.5 py-0.5 rounded">{location.pathname}</code> does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/">
            <Button variant="outline" className="rounded-xl text-xs sm:text-sm">
              <Home className="w-4 h-4 mr-1.5" />
              Return Home
            </Button>
          </Link>
          
          <Link to="/playground">
            <Button className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/20">
              <Code2 className="w-4 h-4 mr-1.5" />
              Open Playground
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
