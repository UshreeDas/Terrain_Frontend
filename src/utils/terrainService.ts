import { API_URL } from "@/config";

export type Geology = Record<string, string | number | null | undefined>;

export type PredictRequest = {
  latitude: number;
  longitude: number;
  include_terrain_png?: boolean;
  grid_size?: number;
  variation?: number;
};

export type PredictResponse = {
  state: string | null;
  geology: Geology | null;
  terrain_png_b64?: string;
  message?: string;
};

export async function predictGeology(body: PredictRequest): Promise<PredictResponse> {
  console.log("POST /predict ->", body, "API_URL:", API_URL);

  const res = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Treat Flask's 404 as "no match" instead of throwing
    if (res.status === 404 && (data?.message || data?.state === null)) {
      return { state: null, geology: null, message: data?.message ?? "No match found" };
    }
    throw new Error(data?.error || data?.message || `HTTP ${res.status}`);
  }
  return data;
}

/** Direct image URL if you didn't request base64 */
export function terrainPngURL(lat: number, lon: number, grid = 50, variation = 50) {
  const p = new URL(`${API_URL}/terrain`);
  p.searchParams.set("lat", String(lat));
  p.searchParams.set("lon", String(lon));
  p.searchParams.set("grid_size", String(grid));
  p.searchParams.set("variation", String(variation));
  return p.toString();
}
