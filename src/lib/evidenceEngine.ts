export interface LocationData {
  name: string;
  region: string;
  country: string;
  coordinates: { lat: number; lng: number };
  areaSqKm: number;
  status: 'ANALYSIS READY' | 'PROCESSING' | 'DATA UNAVAILABLE';
  weather: {
    tempC: number;
    condition: string;
    humidity: number;
    windKmH: number;
    lastUpdated: string;
  };
  ndvi: {
    avg: number;
    status: string;
    historical: { month: string; value: number }[];
  };
  landCover: {
    agriculture: number;
    urban: number;
    barren: number;
    water: number;
    forest: number;
  };
  soilTerrain: {
    elevationM: number;
    slopeDeg: number;
    soilType: string;
    ph: number;
  };
  water: {
    soilMoisture: number;
    waterStorage: string;
    floodRisk: string;
  };
  cropSuitability: {
    crop: string;
    percentage: number;
  }[];
}

export const fontData: LocationData = {
  name: "Ghotki",
  region: "Sindh",
  country: "Pakistan",
  coordinates: { lat: 28.02, lng: 69.97 },
  areaSqKm: 1248,
  status: 'ANALYSIS READY',
  weather: {
    tempC: 32,
    condition: "Partly cloudy",
    humidity: 48,
    windKmH: 12,
    lastUpdated: "Nov 10, 2026 14:32"
  },
  ndvi: {
    avg: 0.62,
    status: "Healthy vegetation",
    historical: [
      { month: "Jan", value: 0.42 },
      { month: "Feb", value: 0.48 },
      { month: "Mar", value: 0.55 },
      { month: "Apr", value: 0.51 },
      { month: "May", value: 0.45 },
      { month: "Jun", value: 0.40 },
      { month: "Jul", value: 0.58 },
      { month: "Aug", value: 0.65 },
      { month: "Sep", value: 0.62 },
      { month: "Oct", value: 0.60 },
      { month: "Nov", value: 0.62 },
      { month: "Dec", value: 0.55 },
    ]
  },
  landCover: {
    agriculture: 62,
    urban: 18,
    barren: 12,
    water: 8,
    forest: 0
  },
  soilTerrain: {
    elevationM: 86,
    slopeDeg: 1.8,
    soilType: "Loam",
    ph: 7.4
  },
  water: {
    soilMoisture: 0.18,
    waterStorage: "Stable",
    floodRisk: "Low"
  },
  cropSuitability: [
    { crop: "Wheat", percentage: 78 },
    { crop: "Cotton", percentage: 72 },
    { crop: "Rice", percentage: 58 },
    { crop: "Sugarcane", percentage: 49 },
    { crop: "Chickpea", percentage: 41 }
  ]
};