import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TerrainPredictor from "@/components/TerrainPredictor";
import TerrainCards from "@/components/TerrainCards";
import AboutSection from "@/components/AboutSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <TerrainPredictor />   {/* replaces TerrainAnalysis */}
      <TerrainCards />
      <AboutSection />
      <footer className="bg-muted py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">© 2025 TerrainAI India.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
