import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon, Loader2, MapPin, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeTerrainImage, TerrainResult } from "@/utils/terrainAnalysis";

const TerrainAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<TerrainResult | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const terrainTypes = {
    mountain: { color: "text-terrain-mountain", bg: "bg-terrain-mountain/10" },
    forest: { color: "text-terrain-forest", bg: "bg-terrain-forest/10" },
    desert: { color: "text-terrain-desert", bg: "bg-terrain-desert/10" },
    coastal: { color: "text-terrain-coastal", bg: "bg-terrain-coastal/10" },
    plain: { color: "text-terrain-plain", bg: "bg-terrain-plain/10" }
  };

  const processFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload an image file (JPG, PNG, TIFF)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setError(null);
      setResult(null);
      
      // Display uploaded image
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Start analysis
      setIsAnalyzing(true);
      
      toast({
        title: "Analysis Started",
        description: "Processing your terrain image with AI...",
      });

      const analysisResult = await analyzeTerrainImage(file);
      
      setResult(analysisResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete!",
        description: `Terrain classified as ${analysisResult.type} with ${analysisResult.confidence}% confidence`,
      });

    } catch (error) {
      console.error('Analysis failed:', error);
      setIsAnalyzing(false);
      setError('Failed to analyze terrain. Please try again.');
      
      toast({
        title: "Analysis Failed",
        description: "There was an error processing your image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <section id="analyze" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            AI-Powered Terrain Analysis
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload an aerial, satellite, or ground-level image to get instant AI-powered terrain classification
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="shadow-terrain">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2 text-primary" />
                Upload Terrain Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="terrain-upload"
                  disabled={isAnalyzing}
                />
                <label htmlFor="terrain-upload" className="cursor-pointer">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    Drop your terrain image here
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Supports JPG, PNG, and TIFF formats (max 10MB)
                  </p>
                  <Button variant="outline" disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Browse Files
                      </>
                    )}
                  </Button>
                </label>
              </div>

              {uploadedImage && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={uploadedImage}
                    alt="Uploaded terrain"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <div className="flex items-center text-destructive">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">{error}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-terrain">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="h-5 w-5 mr-2 text-primary" />
                AI Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="text-center py-12">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground">Analyzing terrain with AI...</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Processing image with advanced machine learning models
                  </p>
                  <div className="mt-4 w-full bg-muted rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-hero animate-pulse" style={{ width: '60%' }} />
                  </div>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  <div className={`p-4 rounded-lg ${terrainTypes[result.color as keyof typeof terrainTypes]?.bg}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`text-2xl font-bold ${terrainTypes[result.color as keyof typeof terrainTypes]?.color}`}>
                        {result.type}
                      </h3>
                      <span className="text-lg font-semibold text-foreground">
                        {result.confidence}%
                      </span>
                    </div>
                    <p className="text-foreground/80 leading-relaxed">{result.description}</p>
                    
                    {result.coordinates && (
                      <div className="flex items-center mt-3 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>
                          Approx. Location: {result.coordinates.lat.toFixed(4)}°N, {result.coordinates.lng.toFixed(4)}°E
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">AI Confidence Score</h4>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="h-3 rounded-full bg-gradient-hero transition-all duration-1000 flex items-center justify-end pr-2"
                        style={{ width: `${result.confidence}%` }}
                      >
                        <span className="text-xs font-medium text-white">
                          {result.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button className="bg-gradient-hero">
                      <MapPin className="h-4 w-4 mr-2" />
                      View on Map
                    </Button>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <p className="text-foreground font-medium mb-2">Upload an image to start AI analysis</p>
                  <p className="text-sm text-muted-foreground">
                    Get instant terrain classification using advanced machine learning
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-muted rounded-full text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 mr-2" />
            Powered by Hugging Face Transformers • AI Model: Vision Transformer (ViT)
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerrainAnalysis;