'use client';

import React, { useState, useEffect } from 'react';
import { fetchLiveLocationData, applyLiveMicroChanges, LocationData, fontData } from '@/src/lib/evidenceEngine';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [locationData, setLocationData] = useState<LocationData>(fontData);
  const [activeTab, setActiveTab] = useState<'Overview' | 'Land Cover' | 'Vegetation' | 'Soil & Terrain' | 'Weather & Water' | 'NISAR Radar Change'>('Overview');
  const [simSpeed, setSimSpeed] = useState<1 | 5 | 20>(1);

  // Live Micro-Changes Stream Simulation
  useEffect(() => {
    const intervalTime = 2000 / simSpeed;
    const interval = setInterval(() => {
      setLocationData(prev => applyLiveMicroChanges(prev));
    }, intervalTime);
    return () => clearInterval(interval);
  }, [simSpeed]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    const data = await fetchLiveLocationData(searchQuery);
    setLocationData(data);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans">
      
      {/* 1. TOP HEADER */}
      <header className="w-full bg-[#0a1526] border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between gap-4 shrink-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <img 
              src="/logo.jpeg" 
              alt="Orbital Intelligence Logo" 
              className="w-9 h-9 rounded-full object-cover border border-sky-400/40 shadow-sm shadow-sky-500/20" 
            />
            <div>
              <h1 className="text-sm font-black tracking-wider text-white font-mono uppercase">
                ORBITAL INTELLIGENCE
              </h1>
              <p className="text-[10px] text-sky-400 font-semibold tracking-wide">
                Powered by <span className="text-slate-200">SENTINEL-X (NISAR SAR)</span>
              </p>
            </div>
          </div>
          <span className="hidden xl:inline text-xs text-slate-400 border-l border-slate-700 pl-3 italic">
            See the change. Understand the risk. Act before it escalates.
          </span>
        </div>

        {/* Global Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search target location (e.g., Turbat, Nawabshah, London, Riyadh)..."
              className="w-full bg-[#060e1a] border border-sky-500/50 rounded-lg pl-3 pr-10 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-400 font-mono shadow-inner transition-colors truncate"
            />
            <button 
              type="submit" 
              disabled={isSearching}
              className="absolute right-2 top-1.5 text-xs text-sky-400 hover:text-sky-300 font-bold px-1"
            >
              {isSearching ? '⏳' : '🔍'}
            </button>
          </div>
        </form>

        {/* Founder Branding */}
        <div className="flex items-center gap-3 border-l border-slate-800 pl-3">
          <img 
            src="/profile.jpeg" 
            alt="Khuda Bux Mahar" 
            className="w-8 h-8 rounded-full object-cover border border-sky-400/50 shadow-md"
          />
          <div className="hidden sm:block text-right">
            <span className="text-xs font-bold text-slate-200 block leading-tight">Khuda Bux Mahar</span>
            <span className="text-[10px] text-sky-400 font-medium block">Founder & Developer</span>
          </div>
        </div>
      </header>

      {/* 2. MAIN DASHBOARD CONTENT */}
      <main className="flex-1 p-4 max-w-7xl w-full mx-auto flex flex-col gap-4">
        
        {/* Top Control Bar & Location Card */}
        <div className="bg-[#040a14] border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white font-mono">{locationData.name}</h2>
              <span className="text-xs px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800/60 font-semibold">
                {locationData.region}, {locationData.country}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-mono">
                {locationData.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Coordinates: {locationData.coordinates.lat}°N, {locationData.coordinates.lng}°E | Area: {locationData.areaSqKm} sq km | Zone: {locationData.climateZone}
            </p>
          </div>

          {/* Simulation Speed Toggles */}
          <div className="flex items-center gap-2 bg-[#020617] p-1.5 rounded-lg border border-slate-800 text-xs">
            <span className="text-slate-400 px-1 font-mono">Telemetry Stream Speed:</span>
            {([1, 5, 20] as const).map((speed) => (
              <button
                key={speed}
                onClick={() => setSimSpeed(speed)}
                className={`px-2.5 py-1 rounded font-mono font-bold transition-all ${
                  simSpeed === speed 
                    ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/50' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* 3. PREDICTIVE RISK ALERT BANNER */}
        {locationData.riskAlert && (
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md ${
            locationData.riskAlert.level === 'CRITICAL' 
              ? 'bg-rose-950/30 border-rose-600/60 text-rose-200' 
              : locationData.riskAlert.level === 'WARNING'
              ? 'bg-amber-950/30 border-amber-600/60 text-amber-200'
              : 'bg-emerald-950/30 border-emerald-600/60 text-emerald-200'
          }`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {locationData.riskAlert.level === 'CRITICAL' ? '🔥' : locationData.riskAlert.level === 'WARNING' ? '⚠️' : '🛡️'}
              </span>
              <div>
                <h3 className="text-xs font-bold font-mono tracking-wide uppercase">
                  {locationData.riskAlert.title}
                </h3>
                <p className="text-xs mt-0.5 opacity-90">
                  {locationData.riskAlert.description}
                </p>
              </div>
            </div>
            <button className="text-xs bg-slate-900/80 border border-slate-700 hover:border-sky-400 text-sky-300 font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors">
              🤖 SENTINEL AI Mitigation ➔
            </button>
          </div>
        )}

        {/* 4. DASHBOARD TABS */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs font-mono">
          {(['Overview', 'Land Cover', 'Vegetation', 'Soil & Terrain', 'Weather & Water', 'NISAR Radar Change'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {tab === 'NISAR Radar Change' ? '📡 NISAR Radar Delta' : tab}
            </button>
          ))}
        </div>

        {/* 5. TAB CONTENT BREAKDOWNS */}
        <div className="grid grid-cols-1 gap-4">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'Overview' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-[#040a14] border border-slate-800 p-3.5 rounded-xl">
                <span className="text-slate-400 font-medium">Temperature & Air</span>
                <div className="text-2xl font-bold text-amber-400 font-mono mt-1">{locationData.weather.tempC}°C</div>
                <span className="text-[10px] text-slate-500 block mt-0.5">{locationData.weather.condition} | Wind: {locationData.weather.windKmH} km/h</span>
              </div>
              <div className="bg-[#040a14] border border-slate-800 p-3.5 rounded-xl">
                <span className="text-slate-400 font-medium">Vegetation Canopy (NDVI)</span>
                <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">{locationData.ndvi.avg}</div>
                <span className="text-[10px] text-slate-500 block mt-0.5">{locationData.ndvi.status}</span>
              </div>
              <div className="bg-[#040a14] border border-slate-800 p-3.5 rounded-xl">
                <span className="text-slate-400 font-medium">Topsoil Moisture</span>
                <div className="text-2xl font-bold text-sky-400 font-mono mt-1">{locationData.water.soilMoisture} m³/m³</div>
                <span className="text-[10px] text-slate-500 block mt-0.5">Flood Status: {locationData.water.floodRisk}</span>
              </div>
              <div className="bg-[#040a14] border border-slate-800 p-3.5 rounded-xl">
                <span className="text-slate-400 font-medium">NISAR Radar Backscatter</span>
                <div className="text-2xl font-bold text-purple-400 font-mono mt-1">{locationData.sarRadar.backscatterDb} dB</div>
                <span className="text-[10px] text-slate-500 block mt-0.5">L-Band Penetration: ~{locationData.sarRadar.penetrationDepthCm} cm</span>
              </div>
            </div>
          )}

          {/* TAB 2: LAND COVER */}
          {activeTab === 'Land Cover' && (
            <div className="bg-[#040a14] border border-slate-800 p-4 rounded-xl flex flex-col gap-3 text-xs">
              <h3 className="font-bold text-sky-400">🗺️ Land Cover Distribution & Satellite Reasoning</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
                <div className="bg-[#020617] p-2.5 rounded border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">AGRICULTURE</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">{locationData.landCover.agriculture}%</span>
                </div>
                <div className="bg-[#020617] p-2.5 rounded border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">URBAN BUILT-UP</span>
                  <span className="text-lg font-bold text-amber-400 font-mono">{locationData.landCover.urban}%</span>
                </div>
                <div className="bg-[#020617] p-2.5 rounded border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">BARREN LAND</span>
                  <span className="text-lg font-bold text-slate-400 font-mono">{locationData.landCover.barren}%</span>
                </div>
                <div className="bg-[#020617] p-2.5 rounded border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">WATER BODIES</span>
                  <span className="text-lg font-bold text-sky-400 font-mono">{locationData.landCover.water}%</span>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans mt-2">
                {locationData.scientificNarrative.landCoverReason}
              </p>
            </div>
          )}

          {/* TAB 3: VEGETATION */}
          {activeTab === 'Vegetation' && (
            <div className="bg-[#040a14] border border-slate-800 p-4 rounded-xl flex flex-col gap-3 text-xs">
              <h3 className="font-bold text-emerald-400">🌱 Canopy Chlorophyll & Radar Backscatter Reasoning</h3>
              <p className="text-slate-300 leading-relaxed font-sans">
                {locationData.scientificNarrative.vegetationReason}
              </p>
              <div className="border-t border-slate-800 pt-2 text-slate-400">
                <strong>Biological & Radar Impact:</strong>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  {locationData.scientificNarrative.biologicalImpact.map((point, idx) => (
                    <li key={idx}><strong>{point.split(':')[0]}:</strong> {point.split(':')[1] || point}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4 & 5: SOIL / WEATHER */}
          {(activeTab === 'Soil & Terrain' || activeTab === 'Weather & Water') && (
            <div className="bg-[#040a14] border border-slate-800 p-4 rounded-xl flex flex-col gap-2 text-xs">
              <h3 className="font-bold text-sky-400">📊 Telemetry & Terrain Analysis</h3>
              <p className="text-slate-300 leading-relaxed font-sans">
                {activeTab === 'Soil & Terrain' ? locationData.scientificNarrative.soilReason : locationData.scientificNarrative.weatherReason}
              </p>
            </div>
          )}

          {/* TAB 6: NISAR RADAR SURFACE CHANGE DELTA (NASA CHALLENGE SPECIFIC) */}
          {activeTab === 'NISAR Radar Change' && (
            <div className="bg-[#040a14] border border-slate-800 p-4 rounded-xl flex flex-col gap-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="font-bold text-purple-400 font-mono text-sm">
                  📡 NASA-ISRO Synthetic Aperture Radar (NISAR) — Surface Change Delta
                </h3>
                <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded font-mono">
                  {locationData.surfaceChange.period}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-1">
                <div className="bg-[#020617] border border-slate-800 p-3 rounded-lg">
                  <span className="text-slate-400 font-medium block">Vegetation Canopy Shift</span>
                  <div className={`text-xl font-bold font-mono mt-1 ${locationData.surfaceChange.vegetationDeltaPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {locationData.surfaceChange.vegetationDeltaPct >= 0 ? '+' : ''}{locationData.surfaceChange.vegetationDeltaPct}%
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">L-Band Canopy Scattering</span>
                </div>

                <div className="bg-[#020617] border border-slate-800 p-3 rounded-lg">
                  <span className="text-slate-400 font-medium block">Surface Water Delta</span>
                  <div className={`text-xl font-bold font-mono mt-1 ${locationData.surfaceChange.waterBodyDeltaPct >= 0 ? 'text-sky-400' : 'text-amber-400'}`}>
                    {locationData.surfaceChange.waterBodyDeltaPct >= 0 ? '+' : ''}{locationData.surfaceChange.waterBodyDeltaPct}%
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Specular Reflection Radar Signal</span>
                </div>

                <div className="bg-[#020617] border border-slate-800 p-3 rounded-lg">
                  <span className="text-slate-400 font-medium block">Urban Built-up Growth</span>
                  <div className="text-xl font-bold text-amber-400 font-mono mt-1">
                    +{locationData.surfaceChange.urbanExpansionPct}%
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Double-Bounce Backscatter</span>
                </div>
              </div>

              <div className="bg-[#020617] p-3 rounded border border-slate-800 text-slate-300 font-sans leading-relaxed">
                <strong>NISAR SAR Radar Explanation:</strong> NISAR L-Band (24cm wavelength) synthetic aperture radar signal penetrates soil surface and agricultural foliage in {locationData.name}, measuring backscatter intensity ({locationData.sarRadar.backscatterDb} dB) to track subtle ground deformation, surface roughness shifts, and topsoil moisture variations over time.
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}