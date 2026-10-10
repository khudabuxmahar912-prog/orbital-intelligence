'use client';
import React from 'react';
import OrbitalLogo from './OrbitalLogo';

interface HeaderProps {
  activeModule: 'satellite' | 'liveGPS';
  setActiveModule: (module: 'satellite' | 'liveGPS') => void;
  onGenerateReport?: () => void;
}

export default function Header({ activeModule, setActiveModule, onGenerateReport }: HeaderProps) {
  return (
    <header className="w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Brand Unit */}
        <button 
          onClick={() => setActiveModule('satellite')}
          className="flex items-center gap-3 text-left group focus:outline-none focus:ring-2 focus:ring-sky-500/50 rounded-lg p-1 transition-all"
          aria-label="Return to Main Dashboard"
        >
          <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-sky-500/40 transition-colors shadow-inner">
            <OrbitalLogo size={36} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm lg:text-base font-black tracking-wider text-slate-100 uppercase font-mono">
                ORBITAL INTELLIGENCE
              </h1>
              <span className="text-[10px] font-bold tracking-widest text-sky-400 bg-sky-950/80 border border-sky-800/60 px-1.5 py-0.5 rounded uppercase">
                v1.0
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 tracking-tight">
              <span className="text-sky-400 font-semibold">SENTINEL-X</span> | Satellite-Based Land Change Intelligence
            </p>
          </div>
        </button>

        {/* Center/Right Actions: Navigation & Report Button */}
        <div className="flex flex-wrap items-center gap-3">
          <nav className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-800" aria-label="Main Navigation">
            <button
              onClick={() => setActiveModule('satellite')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeModule === 'satellite'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              🛰️ Module A: Satellite Imagery
            </button>
            <button
              onClick={() => setActiveModule('liveGPS')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeModule === 'liveGPS'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              📍 Module B: Live Telemetry
            </button>
          </nav>

          {onGenerateReport && (
            <button
              onClick={onGenerateReport}
              className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center gap-1.5"
            >
              📄 Report
            </button>
          )}

          {/* Creator Credit Badge */}
          <div className="hidden sm:flex items-center gap-2.5 border-l border-slate-800 pl-3 ml-1 text-right">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold block leading-none">
                Created by
              </span>
              <span className="text-xs font-bold text-slate-200 tracking-wide block mt-0.5">
                Khuda Bux Mahar
              </span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}