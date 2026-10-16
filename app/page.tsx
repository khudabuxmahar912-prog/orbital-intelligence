'use client';
import React, { useState } from 'react';
import { fontData } from '../src/lib/evidenceEngine';

export default function MasterDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeLayer, setActiveLayer] = useState('Satellite Imagery');
  const [searchQuery, setSearchQuery] = useState('Ghotki, Sindh, Pakistan');

  return (
    <div className="min-h-screen bg-[#060d17] text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      
      {/* Top Header Navigation */}
      <header className="w-full bg-[#0a1526] border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between gap-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 font-bold">
              🌐
            </div>
            <div>
              <h1 className="text-sm font-black tracking-wider text-white font-mono uppercase">
                ORBITAL INTELLIGENCE
              </h1>
              <p className="text-[10px] text-sky-400 font-semibold tracking-wide">
                Powered by <span className="text-slate-200">SENTINEL-X</span>
              </p>
            </div>
          </div>
          <span className="hidden xl:inline text-xs text-slate-400 border-l border-slate-700 pl-3 italic">
            See the change. Understand the risk. Act before it escalates.
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location (e.g. Ghotki, Pakistan)"
              className="w-full bg-[#060e1a] border border-slate-700/60 rounded-lg pl-3 pr-9 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500 transition-colors placeholder:text-slate-500"
            />
            <span className="absolute right-3 top-2 text-xs text-slate-400">🔍</span>
          </div>
        </div>

        {/* Creator Attribution */}
        <div className="flex items-center gap-3 border-l border-slate-800 pl-3">
          <div className="w-7 h-7 rounded-full bg-sky-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
            KB
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-xs font-bold text-slate-200 block leading-tight">Khuda Bux Mahar</span>
            <span className="text-[10px] text-sky-400 font-medium block">Founder & Developer</span>
          </div>
        </div>
      </header>

      {/* Horizontal Nav Bar */}
      <nav className="bg-[#081120] border-b border-slate-800/80 px-4 py-1.5 flex items-center gap-1 overflow-x-auto scrollbar-none text-xs">
        {[
          'Overview', 'Explore Earth', 'Global Location Intelligence', 'Land Cover', 
          'Vegetation', 'Weather & Climate', 'Soil & Terrain', 'Water Intelligence', 
          'Agro Intelligence', 'Change Detection', 'Hotspots', 'SENTINEL AI', 
          'Live Telemetry', 'Data & Science', 'Reports'
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 rounded-md transition-all whitespace-nowrap font-medium ${
              activeTab === tab
                ? 'bg-sky-600/20 text-sky-400 border border-sky-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Main Body Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className="w-60 bg-[#081120] border-r border-slate-800/80 p-3 hidden md:flex flex-col gap-4 overflow-y-auto">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Location Intelligence</span>
            <div className="bg-[#060d17] border border-slate-800 p-2 rounded-lg text-xs flex items-center justify-between">
              <span className="text-slate-200 truncate">{searchQuery}</span>
              <span className="text-sky-400 text-xs">📍</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            {[
              { label: 'Overview', icon: '🏠' },
              { label: 'Land Cover', icon: '🍃' },
              { label: 'Vegetation', icon: '🌱' },
              { label: 'Weather & Climate', icon: '🌤️' },
              { label: 'Soil & Terrain', icon: '⛰️' },
              { label: 'Water Intelligence', icon: '💧' },
              { label: 'Agro Intelligence', icon: '🌾' },
              { label: 'Change Detection', icon: '📉' },
              { label: 'Hotspots', icon: '📍' },
              { label: 'SENTINEL AI', icon: '🤖' },
              { label: 'Live Telemetry', icon: '🛰️' },
              { label: 'Data & Science', icon: '📊' },
              { label: 'Reports', icon: '📑' }
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === item.label
                    ? 'bg-sky-600/15 text-sky-400 border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* NASA Hackathon Badge */}
          <div className="mt-auto bg-[#040912] border border-slate-800/80 rounded-xl p-3 text-center">
            <div className="w-8 h-8 mx-auto mb-1 bg-sky-950 rounded-full flex items-center justify-center text-xs font-bold text-sky-400">
              🚀
            </div>
            <h4 className="text-xs font-bold text-slate-200">NASA Space Apps Challenge 2026</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Global problems. Local solutions.</p>
            <div className="mt-2 text-[10px] text-emerald-400 font-mono flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              System Online
            </div>
          </div>
        </aside>

        {/* Center Workspace */}
        <main className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
          
          {/* Top Section: Map & Right Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* Map Container (2 Columns) */}
            <div className="lg:col-span-2 bg-[#081120] border border-slate-800/80 rounded-xl overflow-hidden relative min-h-[380px] flex flex-col shadow-xl">
              
              {/* Map Top Bar */}
              <div className="absolute top-3 left-3 z-20 bg-[#040a14]/90 backdrop-blur-md border border-slate-800 p-2.5 rounded-lg text-xs">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">AOI: {fontData.name} Region</span>
                <span className="text-slate-200 font-mono font-bold block">{fontData.coordinates.lat}°N, {fontData.coordinates.lng}°E</span>
                <span className="text-slate-400 text-[10px] block">Area: {fontData.areaSqKm} km²</span>
              </div>

              {/* Map Layers Toggle Selector */}
              <div className="absolute top-3 right-3 z-20 bg-[#040a14]/90 backdrop-blur-md border border-slate-800 p-2 rounded-lg text-xs flex flex-col gap-1 w-36 shadow-lg">
                <span className="text-[10px] font-bold text-slate-400 uppercase border-b border-slate-800 pb-1 mb-0.5">Map Layers</span>
                {[
                  'Satellite Imagery', 'Land Cover', 'NDVI', 'Elevation', 
                  'Soil Moisture', 'Temperature', 'Rainfall', 'Change Detection', 'Hotspots'
                ].map((layer) => (
                  <button
                    key={layer}
                    onClick={() => setActiveLayer(layer)}
                    className={`flex items-center gap-2 px-1.5 py-0.5 rounded text-[11px] text-left transition-colors ${
                      activeLayer === layer ? 'text-sky-400 font-bold bg-sky-950/60' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full border ${activeLayer === layer ? 'bg-sky-400 border-sky-300' : 'border-slate-600'}`}></span>
                    <span className="truncate">{layer}</span>
                  </button>
                ))}
              </div>

              {/* Map Canvas Embed */}
              <div className="w-full flex-1 relative z-10 bg-slate-950">
                <iframe
                  title="Sentinel-X Map Canvas"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=69.2000%2C27.5000%2C70.6000%2C28.5000&amp;layer=mapnik"
                  className="w-full h-full filter contrast-[1.1] brightness-[0.85] saturate-[1.2]"
                ></iframe>
              </div>

            </div>

            {/* Right Overview Panel */}
            <div className="bg-[#081120] border border-slate-800/80 rounded-xl p-4 flex flex-col gap-4 shadow-xl">
              
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white">{fontData.name}, {fontData.region}, {fontData.country}</h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{fontData.coordinates.lat}°N, {fontData.coordinates.lng}°E • Area: {fontData.areaSqKm} km²</p>
                </div>
                <span className="bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {fontData.status}
                </span>
              </div>

              {/* Weather & NDVI Quick Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#040a14] border border-slate-800/80 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-white font-mono">{fontData.weather.tempC}°C</span>
                    <span className="text-lg">☀️</span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium mt-1">{fontData.weather.condition}</p>
                  <p className="text-[10px] text-slate-400 mt-1">Humidity: {fontData.weather.humidity}% • Wind: {fontData.weather.windKmH} km/h</p>
                </div>

                <div className="bg-[#040a14] border border-slate-800/80 p-3 rounded-lg flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">NDVI (Avg)</span>
                    <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">{fontData.ndvi.avg}</div>
                  </div>
                  <span className="text-[10px] text-emerald-300 font-medium">{fontData.ndvi.status}</span>
                </div>
              </div>

              {/* Quick Insights List */}
              <div className="flex-1 flex flex-col gap-2 bg-[#040a14] border border-slate-800/80 p-3 rounded-lg">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>📄</span> Quick Insights
                </span>
                <ul className="text-xs text-slate-300 flex flex-col gap-2 mt-1">
                  <li className="flex items-start gap-2">
                    <span className="text-sky-400 text-sm mt-0.5">🌱</span>
                    <span>Land cover is <strong>{fontData.landCover.agriculture}% agricultural</strong>, {fontData.landCover.urban}% urban, {fontData.landCover.barren}% barren, <strong>{fontData.landCover.water}% water</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 text-sm mt-0.5">📈</span>
                    <span>Vegetation health (NDVI) is stable with minor seasonal variation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 text-sm mt-0.5">💧</span>
                    <span>Soil moisture is moderate ({fontData.water.soilMoisture} m³/m³) based on SMAP data.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 text-sm mt-0.5">🌾</span>
                    <span>Best crop match: Wheat, Cotton (high suitability).</span>
                  </li>
                </ul>
              </div>

              {/* Actions Row */}
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <button className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-md">
                  <span>View Full Analysis</span> ➔
                </button>
                <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1">
                  <span>📄</span> Generate Report
                </button>
              </div>

            </div>

          </div>

          {/* Bottom Grid: 6 Modular Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Card 1: Land Cover */}
            <div className="bg-[#081120] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>🍃</span> Land Cover
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">ESA WorldCover</span>
                </div>
                <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                  <div className="flex items-center justify-between p-1.5 bg-[#040a14] rounded border border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Agriculture</span>
                    <span className="font-mono font-bold text-slate-200">{fontData.landCover.agriculture}%</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 bg-[#040a14] rounded border border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Urban</span>
                    <span className="font-mono font-bold text-slate-200">{fontData.landCover.urban}%</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 bg-[#040a14] rounded border border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-stone-500"></span> Barren</span>
                    <span className="font-mono font-bold text-slate-200">{fontData.landCover.barren}%</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 bg-[#040a14] rounded border border-slate-800">
                    <span className="text-slate-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-500"></span> Water</span>
                    <span className="font-mono font-bold text-slate-200">{fontData.landCover.water}%</span>
                  </div>
                </div>
              </div>
              <button className="text-sky-400 text-xs font-semibold hover:underline self-start">View Details ➔</button>
            </div>

            {/* Card 2: Vegetation Health */}
            <div className="bg-[#081120] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>🌱</span> Vegetation Health
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">Sentinel-2 (NDVI)</span>
                </div>
                <div className="flex items-center justify-between bg-[#040a14] p-3 rounded-lg border border-slate-800 my-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block">NDVI (Avg)</span>
                    <span className="text-2xl font-black text-emerald-400 font-mono">{fontData.ndvi.avg}</span>
                  </div>
                  <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded border border-emerald-800">
                    Good Health
                  </span>
                </div>
              </div>
              <button className="text-sky-400 text-xs font-semibold hover:underline self-start mt-2">View Details ➔</button>
            </div>

            {/* Card 3: Weather & Climate */}
            <div className="bg-[#081120] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>🌤️</span> Weather & Climate
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">Open-Meteo / POWER</span>
                </div>
                <div className="grid grid-cols-3 gap-2 my-2 text-center text-xs">
                  <div className="bg-[#040a14] p-2 rounded border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Temp</span>
                    <span className="font-bold font-mono text-white">{fontData.weather.tempC}°C</span>
                  </div>
                  <div className="bg-[#040a14] p-2 rounded border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Humidity</span>
                    <span className="font-bold font-mono text-white">{fontData.weather.humidity}%</span>
                  </div>
                  <div className="bg-[#040a14] p-2 rounded border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Wind</span>
                    <span className="font-bold font-mono text-white">{fontData.weather.windKmH} km/h</span>
                  </div>
                </div>
              </div>
              <button className="text-sky-400 text-xs font-semibold hover:underline self-start mt-2">View Details ➔</button>
            </div>

            {/* Card 4: Soil & Terrain */}
            <div className="bg-[#081120] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>⛰️</span> Soil & Terrain
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">SoilGrids / SRTM</span>
                </div>
                <div className="grid grid-cols-2 gap-2 my-2 text-xs">
                  <div className="bg-[#040a14] p-2 rounded border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Elevation</span>
                    <span className="font-bold font-mono text-slate-200">{fontData.soilTerrain.elevationM} m</span>
                  </div>
                  <div className="bg-[#040a14] p-2 rounded border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Slope</span>
                    <span className="font-bold font-mono text-slate-200">{fontData.soilTerrain.slopeDeg}°</span>
                  </div>
                  <div className="bg-[#040a14] p-2 rounded border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Soil Type</span>
                    <span className="font-bold text-slate-200">{fontData.soilTerrain.soilType}</span>
                  </div>
                  <div className="bg-[#040a14] p-2 rounded border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">pH Level</span>
                    <span className="font-bold font-mono text-slate-200">{fontData.soilTerrain.ph}</span>
                  </div>
                </div>
              </div>
              <button className="text-sky-400 text-xs font-semibold hover:underline self-start">View Details ➔</button>
            </div>

            {/* Card 5: Water Intelligence */}
            <div className="bg-[#081120] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>💧</span> Water Intelligence
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">SMAP / GRACE</span>
                </div>
                <div className="bg-[#040a14] p-3 rounded-lg border border-slate-800 my-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Soil Moisture</span>
                    <span className="text-xl font-black text-sky-400 font-mono">{fontData.water.soilMoisture} m³/m³</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Flood Risk</span>
                    <span className="text-xs font-bold text-emerald-400">{fontData.water.floodRisk}</span>
                  </div>
                </div>
              </div>
              <button className="text-sky-400 text-xs font-semibold hover:underline self-start">View Details ➔</button>
            </div>

            {/* Card 6: Agricultural Suitability */}
            <div className="bg-[#081120] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>🌾</span> Agricultural Suitability
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">SENTINEL Agro AI</span>
                </div>
                <div className="flex flex-col gap-1.5 my-2 text-xs">
                  {fontData.cropSuitability.map((item) => (
                    <div key={item.crop} className="flex items-center justify-between">
                      <span className="text-slate-300 font-medium w-16">{item.crop}</span>
                      <div className="flex-1 mx-2 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-slate-400 font-mono text-[10px]">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="text-sky-400 text-xs font-semibold hover:underline self-start mt-1">View Details ➔</button>
            </div>

          </div>

        </main>

      </div>

      {/* Footer */}
      <footer className="bg-[#040912] border-t border-slate-800/80 px-4 py-2 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>© 2026 ORBITAL INTELLIGENCE — SENTINEL-X. Built for NASA Space Apps Challenge.</p>
        <p>Created by <span className="text-slate-300 font-semibold">Khuda Bux Mahar</span> (Founder & Developer)</p>
      </footer>

    </div>
  );
}