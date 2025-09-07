import React, { useMemo, useState } from "react";
import { MapPin, Loader2, Image as ImageIcon, Globe2, SlidersHorizontal } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { predictGeology, terrainPngURL, PredictResponse } from "@/utils/terrainService";

export default function TerrainPredictor() {
  const { toast } = useToast();
  const [lat, setLat] = useState<number>(22.57);
  const [lon, setLon] = useState<number>(88.36);
  const [grid, setGrid] = useState<number>(40);
  const [variation, setVariation] = useState<number>(30);
  const [withPng, setWithPng] = useState<boolean>(true);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PredictResponse | null>(null);

  const terrainImg = useMemo(() => {
    if (!data) return null;
    if (data.terrain_png_b64) return `data:image/png;base64,${data.terrain_png_b64}`;
    return terrainPngURL(lat, lon, grid, variation);
  }, [data, lat, lon, grid, variation]);

  const submit = async () => {
    try {
      setLoading(true);
      setData(null);
      const resp = await predictGeology({
        latitude: lat,
        longitude: lon,
        include_terrain_png: withPng,
        grid_size: grid,
        variation,
      });
      setData(resp);
      toast({
        title: resp.state ? `Result: ${resp.state}` : "Location not matched",
        description: resp.state
          ? "Geological details retrieved successfully."
          : resp.message ?? "Try different coordinates.",
      });
    } catch (e: any) {
      toast({ title: "Request failed", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Form */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe2 className="h-5 w-5" />
              Terrain & Geology Lookup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lat">Latitude</Label>
                <Input id="lat" type="number" step="0.0001" value={lat}
                       onChange={(e) => setLat(Number(e.target.value))} />
              </div>
              <div>
                <Label htmlFor="lon">Longitude</Label>
                <Input id="lon" type="number" step="0.0001" value={lon}
                       onChange={(e) => setLon(Number(e.target.value))} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="grid">Grid size</Label>
                <Input id="grid" type="number" min={10} max={200} value={grid}
                       onChange={(e) => setGrid(Number(e.target.value))} />
              </div>
              <div>
                <Label htmlFor="var">Variation</Label>
                <Input id="var" type="number" min={1} max={200} value={variation}
                       onChange={(e) => setVariation(Number(e.target.value))} />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Include 3D terrain PNG</span>
              </div>
              <Switch checked={withPng} onCheckedChange={setWithPng} />
            </div>

            <Button onClick={submit} disabled={loading} className="w-full">
              {loading ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" />Fetching…</>) : (<><MapPin className="h-4 w-4 mr-2" />Analyze</>)}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!data && !loading && (
              <p className="text-muted-foreground">Enter coordinates and click <b>Analyze</b>.</p>
            )}

            {data?.state && (
              <div className="rounded-lg border p-4">
                <div className="text-sm text-muted-foreground">Matched State</div>
                <div className="text-xl font-semibold">{data.state}</div>
              </div>
            )}

            {data?.geology && (
              <div className="rounded-lg border p-4">
                <div className="text-sm text-muted-foreground mb-2">Geological details</div>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(data.geology).map(([k, v]) => (
                    <div key={k} className="text-sm">
                      <div className="text-muted-foreground">{k}</div>
                      <div className="font-medium">{v ?? "—"}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {terrainImg && (
              <div className="rounded-lg overflow-hidden border">
                <img src={terrainImg} alt="Terrain" className="w-full h-[420px] object-contain bg-muted"/>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
