'use client';
import React, { useState } from 'react';
import Header from '../src/components/Header';
import MapViewer from '../src/components/MapViewer';
import TimelinePlayer from '../src/components/TimelinePlayer';
import LiveLocationMap from '../src/components/LiveLocationMap';
import ReportModal from '../src/components/ReportModal';
import { generateIntelligenceReportData, GeospatialReportData } from '../src/lib/reportGenerator';

export default function Home() {
  const [activeModule, setActiveModule] = useState<'satellite' | 'liveGPS'>('satellite');
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [activeReport, setActiveReport] = useState<GeospatialReportData | null>(null);

  const handleOpenReport = () => {
    const reportData = generateIntelligenceReportData(null, selectedYear);
    setActiveReport(reportData);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Branded Sticky Header */}
      <Header 
        activeModule={activeModule} 
        setActiveModule={setActiveModule} 
        onGenerateReport={handleOpenReport}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 flex flex-col gap-6 relative z-10">
        
        {/* Module A View */}
        {activeModule === 'satellite' && (
          <div className="flex flex-col gap-6">
            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">Earth Observation System</span>
                  <h2 className="text-xl font-bold text-white">Global Surface Dynamics & Regional Change Detection</h2>
                  <p className="text-xs text-slate-400 mt-1">Multi-temporal Sentinel-2 satellite imagery analysis (2022–2026) — Active Year: {selectedYear}</p>
                </div>
                <button
                  onClick={handleOpenReport}
                  className="self-start sm:self-center px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-lg shadow-lg transition-all flex items-center gap-1.5 whitespace-nowrap"
                >
                  📄 Generate Intelligence Report
                </button>
              </div>
              <MapViewer />
            </div>

            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 shadow-xl">
              <TimelinePlayer onYearChange={(snapshot: any) => setSelectedYear(snapshot?.year || 2026)} />
            </div>
          </div>
        )}

        {/* Module B View */}
        {activeModule === 'liveGPS' && (
          <div className="flex flex-col gap-6">
            <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 shadow-xl">
              <div className="mb-4">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Live Movement & Telemetry</span>
                <h2 className="text-xl font-bold text-white">Consent-Based Real-Time Telemetry Node</h2>
                <p className="text-xs text-slate-400 mt-1">Voluntary GPS streaming with Open-Meteo weather and traceable data provenance</p>
              </div>
              <LiveLocationMap viewerToken="team-default" />
            </div>
          </div>
        )}

      </main>

      {/* Geospatial Intelligence Report Modal */}
      {activeReport && (
        <ReportModal 
          report={activeReport} 
          onClose={() => setActiveReport(null)} 
        />
      )}

      {/* Footer Branding */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 px-4 text-center text-xs text-slate-400 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 ORBITAL INTELLIGENCE — SENTINEL-X. Built for NASA Space Apps Challenge.</p>
          <p className="text-slate-400 font-medium">Created by <span className="text-slate-200 font-semibold">Khuda Bux Mahar</span> (Founder & Developer)</p>
        </div>
      </footer>
    </div>
  );
}