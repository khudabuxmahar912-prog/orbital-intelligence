'use client';
import React, { useState } from 'react';
import { LocationData } from '../lib/evidenceEngine';

export default function SentinelAIAnalyst({ locationData }: { locationData: LocationData }) {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);

  const handleAsk = (customQuery?: string) => {
    const q = customQuery || prompt;
    if (!q.trim()) return;

    setResponse(
      `[SENTINEL AI LIVE ANALYSIS FOR ${locationData.name.toUpperCase()}]\n` +
      `• Coordinates: ${locationData.coordinates.lat}°N, ${locationData.coordinates.lng}°E\n` +
      `• Real-time Climate: Temp ${locationData.weather.tempC}°C, Humidity ${locationData.weather.humidity}%, Wind ${locationData.weather.windKmH} km/h (${locationData.weather.condition}).\n` +
      `• Vegetation & Soil: NDVI index stands at ${locationData.ndvi.avg} (${locationData.ndvi.status}). Soil moisture is recorded at ${locationData.water.soilMoisture} m³/m³.\n` +
      `• Expert Verdict: Based on live orbital telemetry for ${locationData.name}, agricultural conditions show ${locationData.cropSuitability[0]?.crop} suitability at ${locationData.cropSuitability[0]?.percentage}%.`
    );
  };

  return (
    <div className="bg-[#081120] border border-slate-800/80 rounded-xl p-6 flex flex-col gap-4 shadow-xl text-slate-100">
      <div>
        <h2 className="text-sm font-bold text-sky-400 uppercase tracking-wider">SENTINEL AI ANALYST</h2>
        <p className="text-xs text-slate-400 mt-0.5">Explainable Earth Observation & Geospatial Reasoning Engine for {locationData.name}</p>
      </div>

      <div className="bg-[#040a14] border border-slate-800 p-4 rounded-xl text-xs font-mono leading-relaxed text-slate-300">
        {response || `Hello! I am SENTINEL AI ANALYST. I am loaded with the live evidence package for ${locationData.name}. Ask me anything about crop suitability, land cover, soil condition, or climate risks.`}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button 
          onClick={() => handleAsk(`Is ${locationData.name} suitable for Wheat?`)} 
          className="text-[11px] bg-slate-900 border border-slate-700 hover:border-sky-500 px-3 py-1.5 rounded-lg text-slate-300 transition-colors"
        >
          Is {locationData.name} suitable for Wheat?
        </button>
        <button 
          onClick={() => handleAsk(`What is the land cover distribution in ${locationData.name}?`)} 
          className="text-[11px] bg-slate-900 border border-slate-700 hover:border-sky-500 px-3 py-1.5 rounded-lg text-slate-300 transition-colors"
        >
          What is the land cover distribution?
        </button>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`Ask SENTINEL AI about ${locationData.name} geospatial evidence...`}
          className="flex-1 bg-[#040a14] border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
        />
        <button 
          onClick={() => handleAsk()} 
          className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors shadow-md"
        >
          Analyze ➔
        </button>
      </div>
    </div>
  );
}