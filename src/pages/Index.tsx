import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TerrainAnalysis from "@/components/TerrainAnalysis";
import TerrainCards from "@/components/TerrainCards";
import AboutSection from "@/components/AboutSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <TerrainAnalysis />
      <TerrainCards />
      <AboutSection />
      
      {/* Footer */}
      <footer className="bg-muted py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              © 2024 TerrainAI India. Advanced terrain recognition for a better tomorrow.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Support</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">API Docs</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
