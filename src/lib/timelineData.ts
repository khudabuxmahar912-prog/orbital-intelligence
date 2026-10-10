export interface HotspotRecord {
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

export interface TimelineSnapshot {
  year: number;
  acquisitionDate: string;
  sourceDataset: string;
  affectedArea: string;
  intensityScore: number;
  confidence: number;
  description: string;
  hotspots: HotspotRecord[];
  changeOverlayPolygon: [number, number][]; // Spatial bounding coordinates for change mask
}

export const TIMELINE_SNAPSHOTS: { [key: string]: TimelineSnapshot[] } = {
  'ghotki': [
    {
      year: 2022,
      acquisitionDate: '2022-08-14',
      sourceDataset: 'Sentinel-2 MSI Level-2A (Demo Baseline)',
      affectedArea: '310 ha',
      intensityScore: 68,
      confidence: 88.0,
      description: 'Baseline rural-agricultural configuration prior to major industrial corridor expansion.',
      hotspots: [
        { id: 101, rank: 1, name: 'Ghotki Rural Perimeter', category: 'Agricultural Shift', lat: 28.0033, lng: 69.3139, affectedArea: '210 ha', intensityScore: 68, confidence: 88.0, acquisitionDate: '2022-08-14', sourceDataset: 'Sentinel-2 MSI', description: 'Early agricultural baseline monitoring zone.' }
      ],
      changeOverlayPolygon: [[27.98, 69.29], [28.02, 69.29], [28.02, 69.33], [27.98, 69.33]]
    },
    {
      year: 2023,
      acquisitionDate: '2023-08-18',
      sourceDataset: 'Sentinel-2 MSI Level-2A (Demo Baseline)',
      affectedArea: '380 ha',
      intensityScore: 75,
      confidence: 89.5,
      description: 'Initial peripheral clearing detected along transportation arteries.',
      hotspots: [
        { id: 201, rank: 1, name: 'Ghotki Industrial Fringe', category: 'Urban Expansion', lat: 28.0033, lng: 69.3139, affectedArea: '280 ha', intensityScore: 75, confidence: 89.5, acquisitionDate: '2023-08-18', sourceDataset: 'Sentinel-2 MSI', description: 'Initial clearing along transport arteries.' }
      ],
      changeOverlayPolygon: [[27.985, 69.295], [28.025, 69.295], [28.025, 69.335], [27.985, 69.335]]
    },
    {
      year: 2024,
      acquisitionDate: '2024-08-12',
      sourceDataset: 'Sentinel-2 MSI Level-2A (Demo Baseline)',
      affectedArea: '420 ha',
      intensityScore: 82,
      confidence: 91.0,
      description: 'Accelerated structural grid development and commercial ground preparation.',
      hotspots: [
        { id: 301, rank: 1, name: 'Ghotki Urban Expansion Core', category: 'Urban Expansion', lat: 28.0033, lng: 69.3139, affectedArea: '350 ha', intensityScore: 82, confidence: 91.0, acquisitionDate: '2024-08-12', sourceDataset: 'Sentinel-2 MSI', description: 'Accelerated structural grid development.' }
      ],
      changeOverlayPolygon: [[27.99, 69.30], [28.03, 69.30], [28.03, 69.34], [27.99, 69.34]]
    },
    {
      year: 2025,
      acquisitionDate: '2025-08-19',
      sourceDataset: 'Sentinel-2 MSI Level-2A (Demo Baseline)',
      affectedArea: '455 ha',
      intensityScore: 89,
      confidence: 92.8,
      description: 'Substantial asphalt and concrete coverage replacing fertile agricultural fringe.',
      hotspots: [
        { id: 401, rank: 1, name: 'Ghotki Industrial & Urban Hub', category: 'Urban Expansion', lat: 28.0033, lng: 69.3139, affectedArea: '420 ha', intensityScore: 89, confidence: 92.8, acquisitionDate: '2025-08-19', sourceDataset: 'Sentinel-2 MSI', description: 'Substantial asphalt and concrete coverage.' }
      ],
      changeOverlayPolygon: [[27.995, 69.305], [28.035, 69.305], [28.035, 69.345], [27.995, 69.345]]
    },
    {
      year: 2026,
      acquisitionDate: '2026-08-15',
      sourceDataset: 'Sentinel-2 MSI Level-2A (Demo Baseline)',
      affectedArea: '480 ha',
      intensityScore: 92,
      confidence: 94.1,
      description: 'Mature urban and industrial core established; active footprint stabilization.',
      hotspots: [
        { id: 501, rank: 1, name: 'Ghotki Urban & Industrial Corridor', category: 'Urban Expansion', lat: 28.0033, lng: 69.3139, affectedArea: '480 ha', intensityScore: 92, confidence: 94.1, acquisitionDate: '2026-08-15', sourceDataset: 'Sentinel-2 MSI Level-2A', description: 'Rapid built-up expansion and industrial peripheral growth.' },
        { id: 502, rank: 2, name: 'Nawabshah Peri-Urban Sector', category: 'Urban Expansion', lat: 26.2442, lng: 68.3580, affectedArea: '340 ha', intensityScore: 88, confidence: 91.5, acquisitionDate: '2026-08-15', sourceDataset: 'Sentinel-2 MSI Level-2A', description: 'High reflectance variance and built-up footprint expansion.' },
        { id: 503, rank: 3, name: 'Sukkur Barrage Basin Water Flux', category: 'Water Anomaly', lat: 27.6903, lng: 68.8579, affectedArea: '520 ha', intensityScore: 82, confidence: 89.0, acquisitionDate: '2026-08-15', sourceDataset: 'Sentinel-1 SAR VV/VH', description: 'Backscatter coefficient anomaly detected along river banks.' },
        { id: 504, rank: 4, name: 'Sanghar Agricultural Crop Shift', category: 'Agricultural Shift', lat: 25.8051, lng: 68.9480, affectedArea: '780 ha', intensityScore: 76, confidence: 85.2, acquisitionDate: '2026-08-15', sourceDataset: 'Landsat-9 OLI / NDVI', description: 'Significant NDVI drop indicating crop rotation.' },
        { id: 505, rank: 5, name: 'Hyderabad Bypass Corridor', category: 'Urban Expansion', lat: 25.3960, lng: 68.3578, affectedArea: '290 ha', intensityScore: 71, confidence: 83.4, acquisitionDate: '2026-08-15', sourceDataset: 'Sentinel-2 MSI Level-2A', description: 'New structural grid development along highway.' }
      ],
      changeOverlayPolygon: [[28.00, 69.31], [28.04, 69.31], [28.04, 69.35], [28.00, 69.35]]
    }
  ]
};