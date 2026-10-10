'use client';
import React, { useRef } from 'react';
import OrbitalLogo from './OrbitalLogo';
import { GeospatialReportData } from '../lib/reportGenerator';

interface ReportModalProps {
  report: GeospatialReportData;
  onClose: () => void;
}

export default function ReportModal({ report, onClose }: ReportModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Controls Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <OrbitalLogo size={32} />
            <div>
              <h3 className="text-sm font-bold text-white uppercase font-mono">Geospatial Intelligence Report</h3>
              <p className="text-[11px] text-slate-400">ID: {report.reportId} | Generated: {new Date(report.generatedAt).toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold transition-all shadow-md"
            >
              🖨️ Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-all"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div ref={printRef} className="p-6 lg:p-8 overflow-y-auto flex-1 bg-slate-900 text-slate-100 font-sans space-y-6">
          
          {/* Header Branding */}
          <div className="border-b border-slate-800 pb-6 flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">OFFICIAL SCIENTIFIC BRIEFING</span>
              <h1 className="text-xl lg:text-2xl font-black text-white font-mono mt-1">{report.title}</h1>
              <p className="text-xs text-slate-400 mt-1">{report.creator}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-slate-400 block">Location: {report.location.regionName}</span>
              <span className="text-xs font-mono text-slate-400 block">Coordinates: {report.location.coordinates}</span>
              <span className="text-xs font-mono text-sky-400 block mt-1">{report.observationPeriod}</span>
            </div>
          </div>

          {/* Meteorological Data Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">1. Meteorological Live Observations</h3>
            <div className="grid grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-[11px] text-slate-400 uppercase block">Temperature</span>
                <span className="text-lg font-bold text-amber-400">{report.meteorological.temperature}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase block">Humidity</span>
                <span className="text-lg font-bold text-sky-400">{report.meteorological.humidity}</span>
              </div>
              <div className="col-span-2 text-[11px] text-slate-500">
                Source: {report.meteorological.source} | Observation Time: {report.meteorological.timestamp}
              </div>
            </div>
          </div>

          {/* Environmental Telemetry Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">2. Soil & Hydrological Provenance</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-mono uppercase float-right">{report.soilMoisture.classification}</span>
                <span className="text-xs text-slate-400 block">Soil Moisture</span>
                <span className="text-base font-bold text-emerald-400 mt-1 block">{report.soilMoisture.value}</span>
                <span className="text-[10px] text-slate-500 mt-2 block">Source: {report.soilMoisture.source}</span>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono uppercase float-right">{report.waterBodies.classification}</span>
                <span className="text-xs text-slate-400 block">Water Bodies</span>
                <span className="text-base font-bold text-slate-200 mt-1 block">{report.waterBodies.value}</span>
                <span className="text-[10px] text-slate-500 mt-2 block">Source: {report.waterBodies.source}</span>
              </div>
            </div>
          </div>

          {/* Air Quality & Demonstration Indicators */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">3. Atmospheric & Land Classification Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <span className="text-[10px] bg-rose-950 text-rose-400 px-2 py-0.5 rounded font-mono uppercase float-right">unavailable</span>
                <span className="text-xs text-slate-400 block">Air Quality Index (AQI)</span>
                <span className="text-base font-bold text-rose-400 mt-1 block">{report.airQuality.status}</span>
                <span className="text-[10px] text-slate-500 mt-2 block">{report.airQuality.note}</span>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <span className="text-[10px] bg-amber-950 text-amber-400 px-2 py-0.5 rounded font-mono uppercase float-right">{report.landCover.classification}</span>
                <span className="text-xs text-slate-400 block">Land Cover Index</span>
                <span className="text-base font-bold text-amber-400 mt-1 block">{report.landCover.value}</span>
                <span className="text-[10px] text-slate-500 mt-2 block">Source: {report.landCover.source}</span>
              </div>
            </div>
          </div>

          {/* Observed Hotspots */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">4. Regional Hotspots & Change Indicators</h3>
            <div className="bg-slate-950/60 rounded-xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-3">Hotspot ID</th>
                    <th className="p-3">Location / Indicator</th>
                    <th className="p-3">Impact Variance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {report.hotspots.map((hs) => (
                    <tr key={hs.id}>
                      <td className="p-3 font-mono text-sky-400">{hs.id}</td>
                      <td className="p-3 font-semibold text-slate-200">{hs.name}</td>
                      <td className="p-3 text-emerald-400">{hs.impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Scientific Limitations Section */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">⚠️ Scientific Limitations & Transparency Declaration</h4>
            <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1">
              {report.limitationsAndUncertainties.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Footer Signature */}
          <div className="border-t border-slate-800 pt-4 flex justify-between items-center text-[11px] text-slate-500 font-mono">
            <span>ORBITAL INTELLIGENCE — SENTINEL-X</span>
            <span>{report.creator}</span>
          </div>

        </div>

      </div>
    </div>
  );
}