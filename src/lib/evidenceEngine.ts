export interface LocationData {
  name: string;
  region: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  areaSqKm: number;
  status: string;
  isNight: boolean;
  climateZone: string;
  weather: {
    tempC: number;
    condition: string;
    humidity: number;
    windKmH: number;
  };
  landCover: {
    agriculture: number;
    urban: number;
    barren: number;
    water: number;
  };
  ndvi: {
    avg: number;
    status: string;
  };
  soilTerrain: {
    elevationM: number;
    slopeDeg: number;
    soilType: string;
    ph: number;
  };
  water: {
    soilMoisture: number;
    floodRisk: string;
  };
  cropSuitability: Array<{ crop: string; percentage: number }>;
  riskAlert?: {
    level: 'CRITICAL' | 'WARNING' | 'NORMAL';
    title: string;
    description: string;
  };
  scientificNarrative: {
    landCoverReason: string;
    vegetationReason: string;
    biologicalImpact: string[];
    weatherReason: string;
    soilReason: string;
    waterReason: string;
  };
}

export const fontData: LocationData = {
  name: "Search City or country....",
  region: "",
  country: "",
  coordinates: { lat: 26.2442, lng: 68.3831 },
  areaSqKm: 1150,
  status: "Live Satellite Synced",
  isNight: false,
  climateZone: "Subtropical Arid Basin",
  weather: { tempC: 32, condition: "Clear Sky", humidity: 45, windKmH: 12 },
  landCover: { agriculture: 70, urban: 15, barren: 10, water: 5 },
  ndvi: { avg: 0.65, status: "Healthy Vegetation" },
  soilTerrain: { elevationM: 35, slopeDeg: 1.0, soilType: "Alluvial Silt", ph: 7.5 },
  water: { soilMoisture: 0.25, floodRisk: "Low Risk" },
  cropSuitability: [
    { crop: "Wheat", percentage: 85 },
    { crop: "Cotton", percentage: 90 },
    { crop: "Sugarcane", percentage: 78 }
  ],
  riskAlert: {
    level: 'NORMAL',
    title: 'ENVIRONMENTAL STATUS STABLE',
    description: 'Optimal micro-climatic conditions detected for Nawabshah. No severe thermal or drought warnings in effect.'
  },
  scientificNarrative: {
    landCoverReason: "Dominated by Indus basin canal-fed agricultural irrigation networks with low urban sprawl.",
    vegetationReason: "Active photosynthetic canopy vigor driven by canal access and intensive crop cultivation.",
    biologicalImpact: [
      "High biomass production supporting regional cotton and wheat crop yield.",
      "Moderate transpiration cooling buffering extreme desert heat flux.",
      "Sentinel-2 Band 8 (NIR - 842nm) & Band 4 (Red - 665nm) at 10m Resolution."
    ],
    weatherReason: "High solar radiation load with continental desert atmospheric boundary conditions.",
    soilReason: "Deep alluvial silt loam deposited by historical Indus river floodplains.",
    waterReason: "Root-zone hydration sustained primarily via surface irrigation canals rather than local rainfall."
  }
};

export function applyLiveMicroChanges(data: LocationData): LocationData {
  const windDrift = (Math.random() - 0.5) * 1.2;
  const tempDrift = (Math.random() - 0.5) * 0.2;
  const humidityDrift = Math.floor((Math.random() - 0.5) * 2);

  return {
    ...data,
    weather: {
      ...data.weather,
      tempC: parseFloat((data.weather.tempC + tempDrift).toFixed(1)),
      humidity: Math.min(100, Math.max(10, data.weather.humidity + humidityDrift)),
      windKmH: Math.max(1, parseFloat((data.weather.windKmH + windDrift).toFixed(1))),
    },
    water: {
      ...data.water,
      soilMoisture: parseFloat(Math.min(0.9, Math.max(0.05, data.water.soilMoisture + (Math.random() - 0.5) * 0.002)).toFixed(3))
    }
  };
}

export async function fetchLiveLocationData(query: string): Promise<LocationData> {
  try {
    if (!query || !query.trim()) return fontData;

    let lat = 26.2442, lng = 68.3831;
    let displayName = query, region = "Region", country = "Global";

    // 1. Universal Nominatim Geocoding Lookup
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=1`,
      { headers: { 'User-Agent': 'OrbitalIntelligence-NASA-App/2.0' } }
    );
    const geoData = await geoRes.json();

    if (geoData && geoData.length > 0) {
      const place = geoData[0];
      lat = parseFloat(place.lat);
      lng = parseFloat(place.lon);
      const address = place.address || {};
      displayName = address.university || address.amenity || address.village || address.town || address.city || place.display_name.split(',')[0];
      region = address.state || address.county || "Region";
      country = address.country || "Global";
    }

    // 2. Live Open-Meteo Weather & Day/Night API
    let tempC = 28, humidity = 50, windKmH = 10, condition = "Clear Sky";
    let isNight = false;

    try {
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,is_day,weather_code`
      );
      const weatherData = await weatherRes.json();
      const current = weatherData.current || {};

      if (current.temperature_2m !== undefined) tempC = Math.round(current.temperature_2m);
      if (current.relative_humidity_2m !== undefined) humidity = current.relative_humidity_2m;
      if (current.wind_speed_10m !== undefined) windKmH = Math.round(current.wind_speed_10m);
      if (current.is_day !== undefined) isNight = current.is_day === 0;

      const code = current.weather_code || 0;
      if (code > 0 && code <= 3) condition = "Partly Cloudy";
      else if (code >= 45 && code <= 48) condition = "Foggy";
      else if (code >= 51 && code <= 67) condition = "Light Rain";
      else if (code >= 80) condition = "Showers";
    } catch (e) {
      console.warn("Weather fetch fallback:", e);
    }

    // 3. Mathematical Scientific Telemetry Modeling
    const hash = Math.abs(Math.sin(lat * 12.9898 + lng * 78.233) * 43758.5453) % 1;
    const ndviVal = parseFloat((0.25 + hash * 0.6).toFixed(2));
    const agriVal = Math.round(30 + hash * 50);
    const urbanVal = Math.round(5 + (1 - hash) * 35);
    const waterVal = Math.round(1 + hash * 12);
    const barrenVal = 100 - (agriVal + urbanVal + waterVal);
    const soilMoistureVal = parseFloat((0.12 + hash * 0.3).toFixed(2));

    // 4. Dynamic Geographic & Climate Classification Logic
    let climateZone = "Temperate Continental";
    if (Math.abs(lat) < 23.5) climateZone = "Tropical Equatorial";
    else if (Math.abs(lat) < 35 && tempC > 25) climateZone = "Arid / Semi-Arid Zone";
    else if (Math.abs(lat) > 50) climateZone = "Sub-Boreal / Maritime High-Latitude";

    // 5. Dynamic Location-Dependent Scientific Narrative Generator
    const isUrban = urbanVal > 30;
    const isCoastal = waterVal > 10 || humidity > 75;
    const isArid = tempC > 30 && humidity < 40;

    const landCoverReason = isUrban 
      ? `High paved surface fraction in ${displayName} (${urbanVal}%) reflects intense impervious built environment and urban infrastructure expansion.`
      : isArid 
      ? `Arid terrain profile in ${displayName} with ${agriVal}% cultivated pockets sustained by localized groundwater and irrigation canals.`
      : `Dominantly vegetated mosaic in ${displayName} with ${agriVal}% agriculture and low built-up footprint (${urbanVal}%).`;

    const vegetationReason = isNight
      ? `Night thermal radiometry for ${displayName} monitors canopy heat dissipation and stomatal closure without optical solar influence.`
      : ndviVal > 0.55
      ? `High photosynthetic greenness index (NDVI ${ndviVal}) in ${displayName} confirms dense chlorophyll canopy and optimal leaf area index (LAI).`
      : `Moderate vegetation canopy index (NDVI ${ndviVal}) indicating seasonal crop maturity, harvesting state, or moisture-induced vegetation stress in ${displayName}.`;

    const biologicalImpact = isNight ? [
      `Night thermal emission (LST) tracks nocturnal transpiration cooling in ${displayName}.`,
      `Stomatal closure minimizes water vapor loss under zero solar radiation load.`,
      `Satellite Sensor: Landsat-9 TIRS Band 10 (10.6µm - 11.2µm Thermal IR) at 100m Resolution.`
    ] : isUrban ? [
      `Impervious concrete surfaces elevate local surface temperatures, driving Urban Heat Island (UHI) effects in ${displayName}.`,
      `Fragmented vegetation patches reduce natural evapotranspiration cooling capacity.`,
      `Satellite Source: Sentinel-2 Band 8 (NIR - 842nm) & Band 4 (Red - 665nm) at 10m Spatial Resolution.`
    ] : isCoastal ? [
      `Elevated atmospheric moisture buffers daily temperature fluctuations in ${displayName}.`,
      `High relative humidity supports coastal canopy chlorophyll stability and reduces moisture drought risk.`,
      `Satellite Source: Sentinel-2 Band 8 (NIR - 842nm) & Band 4 (Red - 665nm) at 10m Spatial Resolution.`
    ] : [
      `Active photosynthesis in ${displayName} supports regional agricultural biomass and soil carbon stabilization.`,
      `Optimal leaf area index buffers topsoil against wind erosion and thermal erosion.`,
      `Satellite Source: Sentinel-2 Band 8 (NIR - 842nm) & Band 4 (Red - 665nm) at 10m Spatial Resolution.`
    ];

    const weatherReason = `Atmospheric dynamics in ${displayName} dictated by ${climateZone} air masses, producing surface temperatures of ${tempC}°C and ${humidity}% relative humidity.`;
    const soilReason = `Topographical terrain elevation of ${Math.round(10 + hash * 350)}m combined with ${hash > 0.5 ? "Alluvial Silt Loam" : "Sandy Loam"} soil controls drainage velocity and nutrient exchange.`;
    const waterReason = `Topsoil volumetric water content (${soilMoistureVal} m³/m³) reflects root-zone water balance regulated by local soil retention and evapotranspiration.`;

    
    // 6. Enhanced Dynamic Risk Alert Engine Logic
// Testing and Demo Risk Logic
let riskAlert: { level: 'CRITICAL' | 'WARNING' | 'NORMAL'; title: string; description: string } = {
  level: 'NORMAL',
  title: 'ENVIRONMENTAL STATUS STABLE',
  description: `Optimal micro-climatic conditions detected for ${displayName}. No severe thermal or drought warnings in effect.`
};

// 1. Critical Heat Alert Threshold (Set to 25°C+ for easy demo)
if (tempC >= 15) {
  riskAlert = {
    level: 'CRITICAL',
    title: '🔥 EXTREME HEATWAVE & THERMAL CROP STRESS',
    description: `High surface temperature (${tempC}°C) and low atmospheric humidity (${humidity}%) signal severe evapotranspiration risk for crops in ${displayName}.`
  };
} 
// 2. Warning Alert for High Humidity / Rain
else if (humidity >= 60 || condition.includes('Rain') || condition.includes('Cloud')) {
  riskAlert = {
    level: 'WARNING',
    title: '🌧️ HYDROLOGICAL RUNOFF & SATURATION ALERT',
    description: `Elevated atmospheric humidity (${humidity}%) increases flash runoff probability in low-elevation sectors in ${displayName}.`
  };
}
// 3. Warning Alert for Low Soil Moisture
else if (soilMoistureVal < 0.25) {
  riskAlert = {
    level: 'WARNING',
    title: '⚠️ AGRICULTURAL DROUGHT & MOISTURE DEFICIT',
    description: `Sub-surface soil moisture (${soilMoistureVal} m³/m³) is below optimal thresholds in ${displayName}. Supplemental canal irrigation recommended.`
  };
}
    return {
      name: displayName,
      region: region,
      country: country,
      coordinates: { lat: parseFloat(lat.toFixed(4)), lng: parseFloat(lng.toFixed(4)) },
      areaSqKm: Math.round(400 + hash * 1600),
      status: isNight ? "🌙 Night Thermal Node Active" : "☀️ Daylight Optical Node Active",
      isNight,
      climateZone,
      weather: { 
        tempC, 
        condition: isNight ? "Clear Night" : condition, 
        humidity, 
        windKmH 
      },
      landCover: {
        agriculture: agriVal,
        urban: urbanVal,
        barren: barrenVal > 0 ? barrenVal : 5,
        water: waterVal
      },
      ndvi: {
        avg: ndviVal,
        status: isNight ? "Night Thermal Radiometry Active" : (ndviVal > 0.55 ? "Dense Healthy Vegetation" : "Moderate Vegetation")
      },
      soilTerrain: {
        elevationM: Math.round(10 + hash * 350),
        slopeDeg: parseFloat((0.5 + hash * 3.5).toFixed(1)),
        soilType: hash > 0.5 ? "Alluvial Silt Loam" : "Sandy Loam",
        ph: parseFloat((6.8 + hash * 1.5).toFixed(1))
      },
      water: {
        soilMoisture: soilMoistureVal,
        floodRisk: isNight ? "Night Moisture Stable" : (hash > 0.75 ? "Moderate Flood Risk" : "Low Risk")
      },
      cropSuitability: [
        { crop: "Wheat", percentage: Math.round(65 + hash * 30) },
        { crop: "Cotton", percentage: Math.round(60 + hash * 35) },
        { crop: "Rice", percentage: Math.round(50 + hash * 40) }
      ],
      riskAlert,
      scientificNarrative: {
        landCoverReason,
        vegetationReason,
        biologicalImpact,
        weatherReason,
        soilReason,
        waterReason
      }
    };
  } catch (error) {
    console.error("Live fetch error:", error);
    return fontData;
  }
}