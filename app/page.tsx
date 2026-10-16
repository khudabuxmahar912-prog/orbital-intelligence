'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { fontData, fetchLiveLocationData, applyLiveMicroChanges, LocationData } from '../src/lib/evidenceEngine';
import SentinelAIAnalyst from '../src/components/SentinelAIAnalyst';

const DynamicLeafletMap = dynamic(() => import('../src/components/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-950 text-sky-400 font-mono text-xs">
      🛰️ Loading Real Satellite Canvas...
    </div>
  ),
});

export default function MasterDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationData, setLocationData] = useState<LocationData>(fontData);
  const [isSearching, setIsSearching] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Real-time live simulation states
  const [simulationSpeed, setSimulationSpeed] = useState<number>(1);
  const [isLiveAutoLoop, setIsLiveAutoLoop] = useState<boolean>(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Real-time ticker effect for live second-by-second changes
  useEffect(() => {
    if (!isLiveAutoLoop) return;

    const intervalTime = Math.max(300, 3000 / simulationSpeed);
    
    const timer = setInterval(() => {
      setLocationData((prev) => applyLiveMicroChanges(prev));
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isLiveAutoLoop, simulationSpeed]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isSearching) return;
    
    setIsSearching(true);
    const updatedData = await fetchLiveLocationData(searchQuery);
    setLocationData(updatedData);
    setIsSearching(false);
  };

  return (
    <div className="h-screen w-screen bg-[#060d17] text-slate-100 flex flex-col font-sans overflow-hidden selection:bg-sky-500 selection:text-white">
      
      {/* Top Header */}
<header className="w-full bg-[#0a1526] border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between gap-4 shrink-0 z-50 shadow-md">
  <div className="flex items-center gap-3">
    <div className="flex items-center gap-2.5">
      {/* 1. Sentinel-X Official Logo */}
      <img 
        src="/logo.png" 
        alt="Orbital Intelligence Logo" 
        className="w-9 h-9 rounded-full object-cover border border-sky-400/40 shadow-sm shadow-sky-500/20" 
      />
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

  <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search location..."
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

  <div className="flex items-center gap-3 border-l border-slate-800 pl-3">
    {/* 2. Khuda Bux Profile Picture */}
    <img 
      src="/profile.png" 
      alt="Khuda Bux Mahar" 
      className="w-8 h-8 rounded-full object-cover border border-sky-400/50 shadow-md"
    />
    <div className="hidden sm:block text-right">
      <span className="text-xs font-bold text-slate-200 block leading-tight">Khuda Bux Mahar</span>
      <span className="text-[10px] text-sky-400 font-medium block">Founder & Developer</span>
    </div>
  </div>
</header>

      {/* Navigation */}
      <nav className="bg-[#081120] border-b border-slate-800/80 px-4 py-1.5 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none text-xs shrink-0 z-40">
        <div className="flex items-center gap-1">
          {[
            'Overview', 'Land Cover', 'Vegetation', 'Weather & Climate', 
            'Soil & Terrain', 'Water Intelligence', 'Agro Intelligence', 
            'SENTINEL AI'
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
        </div>

        {/* Real-time Ticker & Speed Simulation Controls */}
        <div className="flex items-center gap-2 bg-[#040a14] border border-sky-500/30 px-3 py-1 rounded-lg text-xs font-mono shrink-0">
          <span className="text-emerald-400 animate-pulse font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            {isLiveAutoLoop ? 'LIVE STREAMING' : 'PAUSED'}
          </span>

          <div className="flex items-center gap-1 border-l border-slate-700 pl-2">
            <button 
              onClick={() => setIsLiveAutoLoop(!isLiveAutoLoop)} 
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${isLiveAutoLoop ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}
            >
              {isLiveAutoLoop ? '⏸ Pause' : '▶ Resume'}
            </button>

            {[1, 5, 20].map((speed) => (
              <button
                key={speed}
                onClick={() => setSimulationSpeed(speed)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                  simulationSpeed === speed ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-60 bg-[#081120] border-r border-slate-800/80 p-3 hidden md:flex flex-col gap-4 shrink-0 overflow-y-auto">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Location Intelligence</span>
            <div className="bg-[#060d17] border border-slate-800 p-2 rounded-lg text-xs flex items-center justify-between">
              <span className="text-slate-200 truncate font-semibold">{locationData.name}, {locationData.country}</span>
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
              { label: 'SENTINEL AI', icon: '🤖' }
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

          <div className="mt-auto bg-[#040912] border border-slate-800/80 rounded-xl p-3 text-center">
            <div className="w-8 h-8 mx-auto mb-1 bg-sky-950 rounded-full flex items-center justify-center text-xs font-bold text-sky-400">
              🚀
            </div>
            <h4 className="text-xs font-bold text-slate-200">NASA Space Apps Challenge 2026</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Global problems. Local solutions.</p>
            <div className="mt-2 text-[10px] text-emerald-400 font-mono flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              {locationData.isNight ? 'Live Night Node Active' : 'Live Daylight Node Active'}
            </div>
          </div>
        </aside>

        {/* Workspace */}
        <main className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-[#060d17]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'Overview' && (
            <>
              {/* 🚨 PREDICTIVE RISK ASSESSMENT ALERT BANNER */}
              {locationData.riskAlert && (
                <div className={`w-full border rounded-xl p-3 flex items-center justify-between gap-4 shadow-lg transition-all ${
                  locationData.riskAlert.level === 'CRITICAL' 
                    ? 'bg-rose-950/40 border-rose-500/60 text-rose-200' 
                    : locationData.riskAlert.level === 'WARNING'
                    ? 'bg-amber-950/40 border-amber-500/60 text-amber-200'
                    : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold shrink-0 ${
                      locationData.riskAlert.level === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400' :
                      locationData.riskAlert.level === 'WARNING' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {locationData.riskAlert.level === 'CRITICAL' ? '🔥' : locationData.riskAlert.level === 'WARNING' ? '⚠️' : '🛡️'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black uppercase tracking-wider">{locationData.riskAlert.title}</span>
                        <span className="text-[10px] bg-slate-900/80 px-2 py-0.5 rounded font-mono font-bold border border-slate-700">
                          48H FORECAST MODEL
                        </span>
                      </div>
                      <p className="text-xs mt-0.5 opacity-90">{locationData.riskAlert.description}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveTab('SENTINEL AI')} 
                    className="hidden sm:flex shrink-0 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-xs font-bold font-mono rounded-lg border border-slate-700 transition-colors items-center gap-1.5"
                  >
                    <span>🤖 Mitigation Plan</span>
                    <span>➔</span>
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-[#081120] border border-slate-800/80 rounded-xl overflow-hidden relative min-h-[380px] flex flex-col shadow-xl">
                  <div className="absolute top-3 left-3 z-20 bg-[#040a14]/90 backdrop-blur-md border border-slate-800 p-2.5 rounded-lg text-xs pointer-events-none">
                    <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">AOI: {locationData.name}</span>
                    <span className="text-slate-200 font-mono font-bold block">{locationData.coordinates.lat}°N, {locationData.coordinates.lng}°E</span>
                    <span className="text-slate-400 text-[10px] block">Area: {locationData.areaSqKm} km²</span>
                  </div>

                  <div className="w-full flex-1 relative z-10 bg-slate-950">
                    {isMounted && (
                      <DynamicLeafletMap 
                        lat={locationData.coordinates.lat} 
                        lng={locationData.coordinates.lng} 
                        locationName={locationData.name} 
                        isNight={locationData.isNight}
                      />
                    )}
                  </div>
                </div>

                <div className="bg-[#081120] border border-slate-800/80 rounded-xl p-4 flex flex-col gap-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <div>
                      <h2 className="text-base font-bold text-white">{locationData.name}, {locationData.region}</h2>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{locationData.coordinates.lat}°N, {locationData.coordinates.lng}°E</p>
                    </div>
                    <span className="bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {locationData.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#040a14] border border-slate-800/80 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-white font-mono transition-all">{locationData.weather.tempC}°C</span>
                        <span className="text-xl">{locationData.isNight ? '🌙' : '☀️'}</span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium mt-1">{locationData.weather.condition}</p>
                      <p className="text-[10px] text-sky-400 mt-1 font-mono">Humidity: {locationData.weather.humidity}% • Wind: {locationData.weather.windKmH} km/h</p>
                    </div>

                    <div className="bg-[#040a14] border border-slate-800/80 p-3 rounded-lg flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">NDVI (Avg)</span>
                        <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">{locationData.ndvi.avg}</div>
                      </div>
                      <span className="text-[10px] text-emerald-300 font-medium">{locationData.ndvi.status}</span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-2 bg-[#040a14] border border-slate-800/80 p-3 rounded-lg">
                    <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span>📄</span> {locationData.isNight ? 'Night Thermal Telemetry' : 'Daylight Telemetry Insights'}
                    </span>
                    <ul className="text-xs text-slate-300 flex flex-col gap-2 mt-1">
                      <li className="flex items-start gap-2">
                        <span className="text-sky-400 text-sm mt-0.5">🌱</span>
                        <span>Land cover: <strong>{locationData.landCover.agriculture}% agricultural</strong>, {locationData.landCover.urban}% urban.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 text-sm mt-0.5">📈</span>
                        <span>Vegetation greenness (NDVI) is currently {locationData.ndvi.avg}.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom 6 Interactive Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                <div onClick={() => setActiveTab('Land Cover')} className="bg-[#081120] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg cursor-pointer hover:border-sky-500/50 transition-all hover:scale-[1.01]">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><span>🍃</span> Land Cover</h3>
                      <span className="text-[10px] text-sky-400 font-mono">{locationData.isNight ? 'Night Thermal Scan' : 'ESA WorldCover'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                      <div className="flex items-center justify-between p-1.5 bg-[#040a14] rounded border border-slate-800">
                        <span className="text-slate-400">Agriculture</span>
                        <span className="font-mono font-bold text-slate-200">{locationData.landCover.agriculture}%</span>
                      </div>
                      <div className="flex items-center justify-between p-1.5 bg-[#040a14] rounded border border-slate-800">
                        <span className="text-slate-400">Urban</span>
                        <span className="font-mono font-bold text-slate-200">{locationData.landCover.urban}%</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sky-400 text-xs font-semibold flex items-center gap-1">View Details ➔</span>
                </div>

                <div onClick={() => setActiveTab('Vegetation')} className="bg-[#081120] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg cursor-pointer hover:border-sky-500/50 transition-all hover:scale-[1.01]">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><span>🌱</span> Vegetation Health</h3>
                      <span className="text-[10px] text-sky-400 font-mono">{locationData.isNight ? 'Thermal NDVI' : 'Sentinel-2 (NDVI)'}</span>
                    </div>
                    <div className="flex items-center justify-between bg-[#040a14] p-3 rounded-lg border border-slate-800 my-2">
                      <div>
                        <span className="text-[10px] text-slate-400 block">NDVI (Avg)</span>
                        <span className="text-2xl font-black text-emerald-400 font-mono">{locationData.ndvi.avg}</span>
                      </div>
                      <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded border border-emerald-800">{locationData.ndvi.status}</span>
                    </div>
                  </div>
                  <span className="text-sky-400 text-xs font-semibold mt-2 flex items-center gap-1">View Details ➔</span>
                </div>

                <div onClick={() => setActiveTab('Weather & Climate')} className="bg-[#081120] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg cursor-pointer hover:border-sky-500/50 transition-all hover:scale-[1.01]">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><span>🌤️</span> Weather & Climate</h3>
                      <span className="text-[10px] text-sky-400 font-mono">{locationData.isNight ? 'Live Night Node' : 'Open-Meteo Live'}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 my-2 text-center text-xs">
                      <div className="bg-[#040a14] p-2 rounded border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Temp</span>
                        <span className="font-bold font-mono text-white">{locationData.weather.tempC}°C</span>
                      </div>
                      <div className="bg-[#040a14] p-2 rounded border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Humidity</span>
                        <span className="font-bold font-mono text-sky-400">{locationData.weather.humidity}%</span>
                      </div>
                      <div className="bg-[#040a14] p-2 rounded border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Wind</span>
                        <span className="font-bold font-mono text-slate-200">{locationData.weather.windKmH} km/h</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sky-400 text-xs font-semibold mt-2 flex items-center gap-1">View Details ➔</span>
                </div>

                <div onClick={() => setActiveTab('Soil & Terrain')} className="bg-[#081120] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg cursor-pointer hover:border-sky-500/50 transition-all hover:scale-[1.01]">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><span>⛰️</span> Soil & Terrain</h3>
                      <span className="text-[10px] text-slate-400 font-mono">SoilGrids / SRTM</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 my-2 text-xs">
                      <div className="bg-[#040a14] p-2 rounded border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Elevation</span>
                        <span className="font-bold font-mono text-slate-200">{locationData.soilTerrain.elevationM} m</span>
                      </div>
                      <div className="bg-[#040a14] p-2 rounded border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Soil Type</span>
                        <span className="font-bold text-slate-200">{locationData.soilTerrain.soilType}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sky-400 text-xs font-semibold flex items-center gap-1">View Details ➔</span>
                </div>

                <div onClick={() => setActiveTab('Water Intelligence')} className="bg-[#081120] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg cursor-pointer hover:border-sky-500/50 transition-all hover:scale-[1.01]">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><span>💧</span> Water Intelligence</h3>
                      <span className="text-[10px] text-sky-400 font-mono">SMAP / GRACE</span>
                    </div>
                    <div className="bg-[#040a14] p-3 rounded-lg border border-slate-800 my-2 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Soil Moisture</span>
                        <span className="text-xl font-black text-sky-400 font-mono">{locationData.water.soilMoisture} m³/m³</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Status</span>
                        <span className="text-xs font-bold text-emerald-400">{locationData.water.floodRisk}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sky-400 text-xs font-semibold flex items-center gap-1">View Details ➔</span>
                </div>

                <div onClick={() => setActiveTab('Agro Intelligence')} className="bg-[#081120] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg cursor-pointer hover:border-sky-500/50 transition-all hover:scale-[1.01]">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><span>🌾</span> Agricultural Suitability</h3>
                      <span className="text-[10px] text-sky-400 font-mono">SENTINEL Agro AI</span>
                    </div>
                    <div className="flex flex-col gap-1.5 my-2 text-xs">
                      {locationData.cropSuitability.map((item) => (
                        <div key={item.crop} className="flex items-center justify-between">
                          <span className="text-slate-300 font-medium w-16">{item.crop}</span>
                          <div className="flex-1 mx-2 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${item.percentage}%` }}></div>
                          </div>
                          <span className="text-slate-400 font-mono text-[10px]">{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <span className="text-sky-400 text-xs font-semibold mt-1 flex items-center gap-1">View Details ➔</span>
                </div>
              </div>
            </>
          )}

          {/* TAB: SENTINEL AI */}
          {activeTab === 'SENTINEL AI' && (
            <SentinelAIAnalyst locationData={locationData} />
          )}

          {/* TAB: DETAILED SCIENTIFIC BREAKDOWN FOR EACH CARD */}
          {activeTab !== 'Overview' && activeTab !== 'SENTINEL AI' && (
            <div className="bg-[#081120] border border-slate-800/80 rounded-xl p-6 flex flex-col gap-6 shadow-2xl">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
                    <span>🔬</span> DEEP SCIENTIFIC BREAKDOWN: {activeTab.toUpperCase()}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-1">
                    Geospatial Intelligence Report for {locationData.name}, {locationData.country}
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Target GPS: {locationData.coordinates.lat}°N, {locationData.coordinates.lng}°E • Scan Status: {locationData.status}
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('Overview')} 
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg transition-colors shadow-md flex items-center gap-1"
                >
                  ← Back to Overview
                </button>
              </div>

              {activeTab === 'Land Cover' && (
                <div className="flex flex-col gap-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="bg-[#040a14] border border-slate-800 p-3 rounded-lg">
                      <span className="text-slate-400 font-medium">Agricultural Extent</span>
                      <div className="text-xl font-bold text-emerald-400 font-mono mt-1">{locationData.landCover.agriculture}%</div>
                    </div>
                    <div className="bg-[#040a14] border border-slate-800 p-3 rounded-lg">
                      <span className="text-slate-400 font-medium">Urban Built-up</span>
                      <div className="text-xl font-bold text-amber-400 font-mono mt-1">{locationData.landCover.urban}%</div>
                    </div>
                    <div className="bg-[#040a14] border border-slate-800 p-3 rounded-lg">
                      <span className="text-slate-400 font-medium">Barren Land</span>
                      <div className="text-xl font-bold text-stone-400 font-mono mt-1">{locationData.landCover.barren}%</div>
                    </div>
                    <div className="bg-[#040a14] border border-slate-800 p-3 rounded-lg">
                      <span className="text-slate-400 font-medium">Surface Water</span>
                      <div className="text-xl font-bold text-sky-400 font-mono mt-1">{locationData.landCover.water}%</div>
                    </div>
                  </div>

                  <div className="bg-[#040a14] border border-slate-800 p-4 rounded-xl flex flex-col gap-3">
                    <h3 className="font-bold text-sky-400 text-sm">🛰️ Scientific Causes & Spatial Dynamics (ESA WorldCover 10m)</h3>
                    <p className="text-slate-300 leading-relaxed">
                      Land cover distribution in <strong>{locationData.name}</strong> is driven by regional hydrological networks and urban infrastructure expansion. The high agricultural percentage ({locationData.landCover.agriculture}%) indicates strong canal-fed or alluvial flood-plain cultivation, whereas urban density ({locationData.landCover.urban}%) reflects human settlement and industrial corridors.
                    </p>
                    <div className="border-t border-slate-800/80 pt-2 text-slate-400">
                      <strong>Key Drivers & Reasons:</strong>
                      <ul className="list-disc ml-5 mt-1 space-y-1">
                        <li><strong>Irrigation Infrastructure:</strong> Sustained cropland due to proximity to primary water sources.</li>
                        <li><strong>Urbanization Index:</strong> Commercial and residential development around transport networks.</li>
                        <li><strong>Satellite Sensor Used:</strong> Sentinel-1 SAR & Sentinel-2 Optical Multi-Spectral Imaging.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* VEGETATION TAB BREAKDOWN */}
{activeTab === 'Vegetation' && (
  <div className="flex flex-col gap-4 text-xs">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="bg-[#040a14] border border-slate-800 p-3 rounded-lg">
        <span className="text-slate-400 font-medium">
          {locationData.isNight ? 'Thermal Emissivity Index' : 'Average Optical NDVI'}
        </span>
        <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">{locationData.ndvi.avg}</div>
        <span className="text-[10px] text-slate-500 block mt-0.5">Resolution: {locationData.isNight ? '100m Thermal' : '10m Optical'}</span>
      </div>
      <div className="bg-[#040a14] border border-slate-800 p-3 rounded-lg">
        <span className="text-slate-400 font-medium">Canopy State</span>
        <div className="text-sm font-bold text-sky-400 mt-2">{locationData.ndvi.status}</div>
      </div>
      <div className="bg-[#040a14] border border-slate-800 p-3 rounded-lg">
        <span className="text-slate-400 font-medium">Mathematical Formula</span>
        <div className="text-xs font-mono text-slate-200 mt-2">
          {locationData.isNight ? 'LST = Thermal IR Radiance / Emissivity' : 'NDVI = (NIR - Red) / (NIR + Red)'}
        </div>
      </div>
    </div>

    <div className="bg-[#040a14] border border-slate-800 p-4 rounded-xl flex flex-col gap-3">
      <h3 className="font-bold text-emerald-400 text-sm">
        🌱 {locationData.isNight ? 'Thermal Infrared Analysis' : 'Chlorophyll Absorption & Crop Canopy Reasoning'}
      </h3>
      
      {/* 100% Dynamic Location-Dependent Reason */}
      <p className="text-slate-300 leading-relaxed font-sans">
        {locationData.scientificNarrative.vegetationReason}
      </p>

      <div className="border-t border-slate-800/80 pt-2 text-slate-400">
        <strong>Biological & Environmental Impact:</strong>
        {/* 100% Dynamic Bullet Points for Selected Location */}
        <ul className="list-disc ml-5 mt-1 space-y-1">
          {locationData.scientificNarrative.biologicalImpact.map((point, idx) => (
            <li key={idx}><strong>{point.split(':')[0]}:</strong> {point.split(':')[1] || point}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)}
              {activeTab === 'Weather & Climate' && (
                <div className="flex flex-col gap-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="bg-[#040a14] border border-slate-800 p-3 rounded-lg">
                      <span className="text-slate-400 font-medium">Air Temperature</span>
                      <div className="text-xl font-bold text-white font-mono mt-1">{locationData.weather.tempC}°C</div>
                    </div>
                    <div className="bg-[#040a14] border border-slate-800 p-3 rounded-lg">
                      <span className="text-slate-400 font-medium">Relative Humidity</span>
                      <div className="text-xl font-bold text-sky-400 font-mono mt-1">{locationData.weather.humidity}%</div>
                    </div>
                    <div className="bg-[#040a14] border border-slate-800 p-3 rounded-lg">
                      <span className="text-slate-400 font-medium">Wind Speed</span>
                      <div className="text-xl font-bold text-slate-200 font-mono mt-1">{locationData.weather.windKmH} km/h</div>
                    </div>
                    <div className="bg-[#040a14] border border-slate-800 p-3 rounded-lg">
                      <span className="text-slate-400 font-medium">Condition</span>
                      <div className="text-sm font-bold text-amber-400 mt-2">{locationData.weather.condition}</div>
                    </div>
                  </div>

                  <div className="bg-[#040a14] border border-slate-800 p-4 rounded-xl flex flex-col gap-3">
                    <h3 className="font-bold text-amber-400 text-sm">🌤️ Atmospheric Mechanics & Meteorological Analysis</h3>
                    <p className="text-slate-300 leading-relaxed">
                      Current atmospheric measurements for <strong>{locationData.name}</strong> indicate an ambient surface temperature of {locationData.weather.tempC}°C with {locationData.weather.humidity}% relative humidity. The local air pressure and wind velocity ({locationData.weather.windKmH} km/h) are influenced by regional thermal convection and planetary boundary layer dynamics.
                    </p>
                    <div className="border-t border-slate-800/80 pt-2 text-slate-400">
                      <strong>Climate & Agricultural Influence:</strong>
                      <ul className="list-disc ml-5 mt-1 space-y-1">
                        <li><strong>Evapotranspiration Rate:</strong> Humidity and wind dynamics regulate daily crop water loss.</li>
                        <li><strong>Thermal Heat Stress:</strong> Temperature levels dictate seed germination and crop growth cycles.</li>
                        <li><strong>Data Stream:</strong> Live Numerical Weather Prediction (NWP) via Open-Meteo High-Resolution Models.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Soil & Terrain' && (
                <div className="flex flex-col gap-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-[#040a14] border border-slate-800 p-3 rounded-lg">
                      <span className="text-slate-400 font-medium">Topographical Elevation</span>
                      <div className="text-2xl font-bold text-white font-mono mt-1">{locationData.soilTerrain.elevationM} meters</div>
                    </div>
                    <div className="bg-[#040a14] border border-slate-800 p-3 rounded-lg">
                      <span className="text-slate-400 font-medium">Predominant Soil Class</span>
                      <div className="text-sm font-bold text-sky-400 mt-2">{locationData.soilTerrain.soilType}</div>
                    </div>
                    <div className="bg-[#040a14] border border-slate-800 p-3 rounded-lg">
                      <span className="text-slate-400 font-medium">Soil Acidity / Alkalinity</span>
                      <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">pH {locationData.soilTerrain.ph}</div>
                    </div>
                  </div>

                  <div className="bg-[#040a14] border border-slate-800 p-4 rounded-xl flex flex-col gap-3">
                    <h3 className="font-bold text-stone-300 text-sm">⛰️ Pedological Classification & Terrain Profile</h3>
                    <p className="text-slate-300 leading-relaxed">
                      Terrain elevation of {locationData.soilTerrain.elevationM}m above sea level in <strong>{locationData.name}</strong> creates a flat-to-gentle slope environment optimal for flood irrigation. The primary soil texture, <strong>{locationData.soilTerrain.soilType}</strong> with a pH of {locationData.soilTerrain.ph}, provides strong nutrient retention capability.
                    </p>
                    <div className="border-t border-slate-800/80 pt-2 text-slate-400">
                      <strong>Agronomic Evaluation:</strong>
                      <ul className="list-disc ml-5 mt-1 space-y-1">
                        <li><strong>Cation Exchange Capacity (CEC):</strong> High organic silt content allows effective fertilizer absorption.</li>
                        <li><strong>Runoff Risk:</strong> Low slope gradient reduces soil erosion during heavy rain events.</li>
                        <li><strong>Satellite Dataset:</strong> SRTM Shuttle Radar Topography Mission & SoilGrids 250m global maps.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Water Intelligence' && (
                <div className="flex flex-col gap-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-[#040a14] border border-slate-800 p-3 rounded-lg">
                      <span className="text-slate-400 font-medium">Volumetric Soil Moisture</span>
                      <div className="text-2xl font-bold text-sky-400 font-mono mt-1">{locationData.water.soilMoisture} m³/m³</div>
                    </div>
                    <div className="bg-[#040a14] border border-slate-800 p-3 rounded-lg">
                      <span className="text-slate-400 font-medium">Hydrological Flood Vulnerability</span>
                      <div className="text-sm font-bold text-emerald-400 mt-2">{locationData.water.floodRisk}</div>
                    </div>
                  </div>

                  <div className="bg-[#040a14] border border-slate-800 p-4 rounded-xl flex flex-col gap-3">
                    <h3 className="font-bold text-sky-400 text-sm">💧 Hydrological Balance & Moisture Saturation Analysis</h3>
                    <p className="text-slate-300 leading-relaxed">
                      Topsoil volumetric water content in <strong>{locationData.name}</strong> is currently measured at {locationData.water.soilMoisture} m³/m³. This indicates balanced root-zone hydration, supporting active vegetation without waterlogging or oxygen depletion risks.
                    </p>
                    <div className="border-t border-slate-800/80 pt-2 text-slate-400">
                      <strong>Hydrological System Factors:</strong>
                      <ul className="list-disc ml-5 mt-1 space-y-1">
                        <li><strong>Sub-surface Recharge:</strong> Ground moisture levels buffer against short-term rainfall shortages.</li>
                        <li><strong>Microwave Radiometry:</strong> L-Band microwave emission tracking penetrating up to 5cm into topsoil.</li>
                        <li><strong>Satellite Platform:</strong> NASA Soil Moisture Active Passive (SMAP) & GRACE Follow-On missions.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Agro Intelligence' && (
                <div className="flex flex-col gap-4 text-xs">
                  <div className="bg-[#040a14] border border-slate-800 p-4 rounded-xl flex flex-col gap-3">
                    <h3 className="font-bold text-emerald-400 text-sm">🌾 Multi-Crop Agro-Climatic Match Score</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
                      {locationData.cropSuitability.map((crop) => (
                        <div key={crop.crop} className="bg-[#081120] border border-slate-800 p-3 rounded-lg">
                          <span className="text-slate-300 font-bold block">{crop.crop}</span>
                          <span className="text-xl font-black text-emerald-400 font-mono">{crop.percentage}%</span>
                          <span className="text-[10px] text-slate-400 block mt-1">Suitability Score</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Agro-intelligence algorithm evaluates temperature ({locationData.weather.tempC}°C), soil pH ({locationData.soilTerrain.ph}), and soil moisture ({locationData.water.soilMoisture} m³/m³) for <strong>{locationData.name}</strong> to forecast optimal crop yield performance.
                    </p>
                  </div>
                </div>
              )}

            </div>
          )}

        </main>
      </div>
    </div>
  );
}