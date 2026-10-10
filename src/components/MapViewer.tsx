'use client';
import React, { useState } from 'react';

export default function MapViewer() {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>('ghotki-agri');
  const [activeLayer, setActiveLayer] = useState<'sentinel' | 'ndvi' | 'smap'>('sentinel');

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
      
      {/* Top Geospatial Data Overlay Bar */}
      <div className="absolute top-3 left-3 right-3 z-[400] flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-950/90 backdrop-blur-md rounded-lg border border-slate-800 text-xs shadow-xl">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded border border-slate-700/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-400 font-medium">BBox Center:</span>
            <span className="text-slate-200 font-mono font-bold">27.9571° N, 69.3001° E (Ghotki)</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded border border-slate-700/80">
            <span className="text-sky-400 font-semibold">NDVI Index:</span>
            <span className="text-slate-200 font-mono font-bold">+0.48 (Agri Surge)</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded border border-slate-700/80">
            <span className="text-teal-400 font-semibold">Soil Moisture:</span>
            <span className="text-slate-200 font-mono font-bold">0.28 m³/m³ (SMAP L3)</span>
          </div>
        </div>

        {/* Layer Toggles */}
        <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded border border-slate-800">
          <button
            onClick={() => setActiveLayer('sentinel')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
              activeLayer === 'sentinel' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sentinel-2 RGB
          </button>
          <button
            onClick={() => setActiveLayer('ndvi')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
              activeLayer === 'ndvi' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            NDVI Delta
          </button>
        </div>
      </div>

      {/* Main Interactive Map Canvas */}
      <div className="w-full h-[480px] lg:h-[540px] relative z-[10]">
        <iframe
          title="Orbital Sentinel-X Map View"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          src="https://www.openstreetmap.org/export/embed.html?bbox=68.5000%2C27.2000%2C70.1000%2C28.6000&amp;layer=mapnik"
          className="w-full h-full filter contrast-[1.05] brightness-[0.95]"
        ></iframe>
      </div>

      {/* Bottom Floating Hotspot Detail Cards */}
      <div className="absolute bottom-3 left-3 right-3 z-[400] bg-slate-900/95 backdrop-blur-md p-3.5 rounded-lg border border-slate-800 text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-sky-950 border border-sky-800/80 text-sky-400 font-bold text-sm">
            🛰️ HOTSPOT DETECTED
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-slate-100 text-sm">Ghotki Agricultural Delta & Canal Network</h4>
              <span className="text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.2 rounded">
                Verified Zone
              </span>
            </div>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Multi-temporal satellite synthesis shows +14.2% vegetation expansion and stable river channel boundaries across the active timeline baseline.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-center whitespace-nowrap">
          <span className="text-[10px] text-slate-500 font-mono">Provenance Tag: Satellite-Derived</span>
        </div>
      </div>

    </div>
  );
}