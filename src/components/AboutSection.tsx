import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Globe, BarChart3, Users, Award } from "lucide-react";

const AboutSection = () => {
  const stats = [
    { icon: <Shield className="h-6 w-6" />, number: "99.2%", label: "Accuracy Rate" },
    { icon: <Zap className="h-6 w-6" />, number: "<3s", label: "Processing Time" },
    { icon: <Globe className="h-6 w-6" />, number: "50M+", label: "Images Analyzed" },
    { icon: <Users className="h-6 w-6" />, number: "1000+", label: "Active Users" }
  ];

  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Advanced Analytics",
      description: "Get detailed insights including vegetation index, elevation data, and seasonal patterns"
    },
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      title: "Secure Processing",
      description: "Enterprise-grade security ensures your data remains private and protected"
    },
    {
      icon: <Award className="h-8 w-8 text-terrain-forest" />,
      title: "Proven Accuracy",
      description: "Validated by geologists and tested across diverse Indian terrain samples"
    }
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Trusted by Professionals
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Join thousands of researchers, geologists, and planners who rely on our 
            terrain recognition system for accurate land analysis
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="shadow-card-custom bg-gradient-card">
                <CardContent className="p-6 text-center">
                  <div className="text-primary mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Built for India's Diverse Geography
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our AI models are specifically trained on Indian terrain data, from the snow-capped 
              Himalayas to the tropical coastlines. We understand the unique geological and 
              geographical features that make India's landscape so diverse.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h4>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-terrain rounded-2xl p-8">
            <h4 className="text-2xl font-bold text-foreground mb-6 text-center">
              Why Choose TerrainAI?
            </h4>
            <div className="space-y-4">
              {[
                "✓ Specialized for Indian terrain patterns",
                "✓ Real-time processing and instant results", 
                "✓ Integration with GIS and mapping platforms",
                "✓ Continuous model updates and improvements",
                "✓ 24/7 technical support and documentation",
                "✓ Bulk processing for large-scale projects"
              ].map((item, index) => (
                <div key={index} className="flex items-center text-foreground">
                  <span className="text-primary font-bold mr-3">{item.charAt(0)}</span>
                  <span>{item.slice(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button size="lg" className="bg-gradient-hero">
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-hero text-white rounded-2xl p-12">
          <h3 className="text-3xl font-bold mb-4">Ready to Analyze Your Terrain?</h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join the future of terrain analysis. Upload your first image and experience 
            the power of AI-driven land classification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              View Documentation
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;