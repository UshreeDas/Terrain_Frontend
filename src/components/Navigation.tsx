import { Button } from "@/components/ui/button";
import { Map, Satellite, BarChart3 } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="w-full px-6 py-4 bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Map className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">TerrainAI</span>
          <span className="text-sm text-muted-foreground ml-2">India</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#analyze" className="text-foreground hover:text-primary transition-colors">
            Analyze
          </a>
          <a href="#features" className="text-foreground hover:text-primary transition-colors">
            Features
          </a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">
            About
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Satellite className="h-4 w-4 mr-2" />
            Demo
          </Button>
          <Button size="sm" className="bg-gradient-hero">
            <BarChart3 className="h-4 w-4 mr-2" />
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;