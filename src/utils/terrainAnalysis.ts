// src/utils/terrainAnalysis.ts
export type TerrainResult = {
  type: "mountain" | "forest" | "desert" | "coastal" | "plain" | string;
  color: string;                 // usually same as type; used for UI colors
  confidence: number;            // 0..100
  description: string;
  coordinates?: { lat: number; lng: number } | null;
};

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

/**
 * Calls your FastAPI backend: POST /api/predict
 * Expects multipart form with key "file"
 */
export async function analyzeTerrainImage(file: File): Promise<TerrainResult> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_URL}/api/predict`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    // bubble up the server error message if any
    let msg = "Prediction failed";
    try { msg = (await res.json())?.detail ?? msg; } catch {}
    throw new Error(msg);
  }

  const data = (await res.json()) as TerrainResult;

  // normalize to ensure your component always has what it expects
  return {
    type: data.type,
    color: data.color || data.type,
    confidence: Math.max(0, Math.min(100, Number(data.confidence ?? 0))),
    description: data.description ?? "",
    coordinates: data.coordinates ?? undefined,
  };
}
