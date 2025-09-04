import { Card, CardContent } from "@/components/ui/card";
import { Mountain, Trees, Sun, Waves, Wheat } from "lucide-react";

const TerrainCards = () => {
  const terrainTypes = [
    {
      icon: <Mountain className="h-12 w-12" />,
      name: "Mountains",
      color: "text-terrain-mountain",
      bg: "bg-terrain-mountain/10",
      description: "High-altitude regions including the Himalayas, Western Ghats, and Eastern Ghats",
      features: ["Rocky formations", "Steep slopes", "Alpine vegetation", "Snow coverage"],
      coverage: "33%"
    },
    {
      icon: <Trees className="h-12 w-12" />,
      name: "Forests",
      color: "text-terrain-forest", 
      bg: "bg-terrain-forest/10",
      description: "Dense forest cover including tropical, temperate, and mangrove forests",
      features: ["Dense canopy", "Biodiversity", "Carbon sequestration", "Wildlife habitats"],
      coverage: "24%"
    },
    {
      icon: <Sun className="h-12 w-12" />,
      name: "Deserts",
      color: "text-terrain-desert",
      bg: "bg-terrain-desert/10", 
      description: "Arid regions including the Thar Desert and other dry landscapes",
      features: ["Sandy terrain", "Low rainfall", "Sparse vegetation", "Extreme temperatures"],
      coverage: "12%"
    },
    {
      icon: <Waves className="h-12 w-12" />,
      name: "Coastal",
      color: "text-terrain-coastal",
      bg: "bg-terrain-coastal/10",
      description: "Coastal regions along the Arabian Sea, Bay of Bengal, and Indian Ocean",
      features: ["Beaches", "Estuaries", "Salt marshes", "Coral reefs"],
      coverage: "8%"
    },
    {
      icon: <Wheat className="h-12 w-12" />,
      name: "Plains",
      color: "text-terrain-plain",
      bg: "bg-terrain-plain/10",
      description: "Fertile plains including the Indo-Gangetic Plain and Deccan Plateau",
      features: ["Agricultural land", "River systems", "Flat topography", "High productivity"],
      coverage: "23%"
    }
  ];

  return (
    <section id="features" className="py-20 px-6 bg-gradient-terrain">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Indian Terrain Classifications
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI system is trained to recognize and classify the diverse terrain types 
            found across the Indian subcontinent with high precision and accuracy
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {terrainTypes.map((terrain, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-terrain transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50"
            >
              <CardContent className="p-6 text-center">
                <div className={`${terrain.bg} ${terrain.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  {terrain.icon}
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">{terrain.name}</h3>
                
                <div className="text-3xl font-bold text-primary mb-3">{terrain.coverage}</div>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {terrain.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">Key Features:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {terrain.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Coverage percentages are approximate and based on geographical surveys of India
          </p>
        </div>
      </div>
    </section>
  );
};

export default TerrainCards;