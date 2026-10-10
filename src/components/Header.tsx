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
    <header className="w-full bg-slate-950 border-b border-slate-800 px-3 lg:px-6 py-2.5 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: Brand Unit */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <button 
            onClick={() => setActiveModule('satellite')}
            className="flex items-center gap-3 text-left focus:outline-none"
            aria-label="Return to Main Dashboard"
          >
            <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
              <OrbitalLogo size={34} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm lg:text-base font-black tracking-wider text-slate-100 uppercase font-mono">
                  ORBITAL INTELLIGENCE
                </h1>
                <span className="text-[10px] font-bold tracking-widest text-sky-400 bg-sky-950 border border-sky-800/80 px-1.5 py-0.5 rounded uppercase">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 tracking-tight">
                <span className="text-sky-400 font-semibold">SENTINEL-X</span> | Satellite-Based Land Change Intelligence
              </p>
            </div>
          </button>
        </div>

        {/* Right Controls: Navigation, Report Button & Creator Badge */}
        <div className="flex items-center flex-wrap justify-center md:justify-end gap-2.5 w-full md:w-auto">
          
          {/* Module Switcher Nav */}
          <nav className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveModule('satellite')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                activeModule === 'satellite'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🛰️ Module A: Satellite
            </button>
            <button
              onClick={() => setActiveModule('liveGPS')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                activeModule === 'liveGPS'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              📍 Module B: Telemetry
            </button>
          </nav>

          {/* Prominent Report Generator Button */}
          {onGenerateReport && (
            <button
              onClick={onGenerateReport}
              className="px-3 py-1 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center gap-1"
            >
              📄 Report
            </button>
          )}

          {/* Creator Credit Badge */}
          <div className="flex items-center gap-2 border-l border-slate-800 pl-2.5 ml-0.5 text-right">
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