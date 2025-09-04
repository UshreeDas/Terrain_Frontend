import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Zap, Globe } from "lucide-react";
import heroImage from "@/assets/hero-terrain.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-terrain">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            Advanced Terrain
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Recognition System
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Harness the power of AI to analyze and classify India's diverse landscapes. 
            From the Himalayas to coastal regions, get precise terrain insights instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-gradient-hero text-lg px-8 py-6">
              <Upload className="h-5 w-5 mr-2" />
              Start Analysis
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Globe className="h-5 w-5 mr-2" />
              Explore Features
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: <Zap className="h-8 w-8 text-primary" />,
              title: "Lightning Fast",
              description: "Process terrain images in seconds with our optimized AI models"
            },
            {
              icon: <Globe className="h-8 w-8 text-accent" />,
              title: "India-Focused",
              description: "Specialized for Indian geography and terrain classifications"
            },
            {
              icon: <Upload className="h-8 w-8 text-terrain-forest" />,
              title: "Easy Upload",
              description: "Simple drag-and-drop interface for seamless terrain analysis"
            }
          ].map((feature, index) => (
            <Card key={index} className="p-6 bg-gradient-card shadow-card-custom border-border/50">
              <div className="text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;