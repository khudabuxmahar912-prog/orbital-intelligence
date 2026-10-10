export interface Hotspot {
  id: number;
  rank: number;
  name: string;
  category: 'Urban Expansion' | 'Agricultural Shift' | 'Water Anomaly';
  lat: number;
  lng: number;
  affectedArea: string;
  intensityScore: number;
  confidence: number;
  acquisitionDate: string;
  sourceDataset: string;
  description: string;
}

export const SINDH_HOTSPOTS: Hotspot[] = [
  {
    id: 1,
    rank: 1,
    name: 'Ghotki Urban & Industrial Corridor',
    category: 'Urban Expansion',
    lat: 28.0033,
    lng: 69.3139,
    affectedArea: '480 ha',
    intensityScore: 92,
    confidence: 94.1,
    acquisitionDate: '2023-08 vs 2026-08',
    sourceDataset: 'Sentinel-2 MSI Level-2A',
    description: 'Rapid built-up expansion and industrial peripheral growth detected around Ghotki main urban grid.'
  },
  {
    id: 2,
    rank: 2,
    name: 'Nawabshah Peri-Urban Growth Sector',
    category: 'Urban Expansion',
    lat: 26.2442,
    lng: 68.3580,
    affectedArea: '340 ha',
    intensityScore: 88,
    confidence: 91.5,
    acquisitionDate: '2023-08 vs 2026-08',
    sourceDataset: 'Sentinel-2 MSI Level-2A',
    description: 'High reflectance variance and built-up footprint expansion converting agricultural fringes.'
  },
  {
    id: 3,
    rank: 3,
    name: 'Sukkur Barrage Basin Water Flux',
    category: 'Water Anomaly',
    lat: 27.6903,
    lng: 68.8579,
    affectedArea: '520 ha',
    intensityScore: 82,
    confidence: 89.0,
    acquisitionDate: '2023-08 vs 2026-08',
    sourceDataset: 'Sentinel-1 SAR VV/VH',
    description: 'Backscatter coefficient anomaly detected along river basin banks and canal networks.'
  },
  {
    id: 4,
    rank: 4,
    name: 'Sanghar Agricultural Crop Shift',
    category: 'Agricultural Shift',
    lat: 25.8051,
    lng: 68.9480,
    affectedArea: '780 ha',
    intensityScore: 76,
    confidence: 85.2,
    acquisitionDate: '2023-08 vs 2026-08',
    sourceDataset: 'Landsat-9 OLI / NDVI Index',
    description: 'Significant NDVI drop indicating seasonal crop rotation changes or irrigation shifts.'
  },
  {
    id: 5,
    rank: 5,
    name: 'Hyderabad Bypass Commercial Corridor',
    category: 'Urban Expansion',
    lat: 25.3960,
    lng: 68.3578,
    affectedArea: '290 ha',
    intensityScore: 71,
    confidence: 83.4,
    acquisitionDate: '2023-08 vs 2026-08',
    sourceDataset: 'Sentinel-2 MSI Level-2A',
    description: 'New structural grid development detected along major highway transit routes.'
  }
];