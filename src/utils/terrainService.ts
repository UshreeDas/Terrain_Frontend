// src/utils/terrainService.ts
import { API_URL } from "@/config";

export type Geology = Record<string, string | number | null | undefined>;

export type PredictRequest = {
  latitude: number;
  longitude: number;
  include_terrain_png?: boolean;
  grid_size?: number;      // default 50
  variation?: number;      // default 50
};

export type PredictResponse = {
  state: string | null;
  geology: Geology | null;
  terrain_png_b64?: string;
  message?: string;
};

export async function predictGeology(body: PredictRequest): Promise<PredictResponse> {
  const res = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || err?.message || `HTTP ${res.status}`);
  }
  return res.json();
}

/** Direct PNG (server renders) — handy if you don’t request base64 in /predict */
export function terrainPngURL(lat: number, lon: number, grid = 50, variation = 50) {
  const p = new URL(`${API_URL}/terrain`);
  p.searchParams.set("lat", String(lat));
  p.searchParams.set("lon", String(lon));
  p.searchParams.set("grid_size", String(grid));
  p.searchParams.set("variation", String(variation));
  return p.toString();
}
