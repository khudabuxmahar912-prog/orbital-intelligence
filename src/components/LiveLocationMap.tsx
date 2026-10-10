'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import 'leaflet/dist/leaflet.css';
import { LiveLocationSession } from '../lib/liveLocationStore';
import { fetchEnvironmentalTelemetry, EnvironmentalReport } from '../lib/environmentalTelemetry';

interface LiveLocationMapProps {
  viewerToken: string;
  onSessionCreated?: (sessionId: string) => void;
}

export default function LiveLocationMap({ viewerToken, onSessionCreated }: LiveLocationMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const watchIdRef = useRef<number | null>(null);

  const [isSharing, setIsSharing] = useState(false);
  const [permissionState, setPermissionState] = useState<'idle' | 'requesting' | 'granted' | 'denied' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('Location sharing inactive.');
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [envData, setEnvData] = useState<EnvironmentalReport | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [refreshCooldown, setRefreshCooldown] = useState(false);

  const sessionIdRef = useRef<string>(`session_${Math.random().toString(36).substring(2, 9)}`);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    import('leaflet').then((L) => {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      const map = L.map(mapContainerRef.current, { zoomControl: false }).setView([28.0033, 69.3139], 12);
      L.control.zoom({ position: 'topright' }).addTo(map);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors | Sentinel-X Telemetry Engine'
      }).addTo(map);

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const loadTelemetry = useCallback(async (lat: number, lng: number) => {
    const report = await fetchEnvironmentalTelemetry(lat, lng);
    setEnvData(report);
  }, []);

  const startSharing = () => {
    if (!('geolocation' in navigator)) {
      setPermissionState('error');
      setStatusMessage('Browser Geolocation API is not supported.');
      return;
    }

    setPermissionState('requesting');
    setStatusMessage('Acquiring GPS fix and querying live telemetry APIs...');

    const handleSuccess = async (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy } = position.coords;
      const timestamp = new Date().toLocaleTimeString();

      setPermissionState('granted');
      setIsSharing(true);
      setCurrentCoords({ lat: latitude, lng: longitude, accuracy });
      setLastUpdated(timestamp);

      await loadTelemetry(latitude, longitude);
      setStatusMessage(`Global Position Locked: [${latitude.toFixed(4)}, ${longitude.toFixed(4)}]`);

      if (mapInstanceRef.current) {
        mapInstanceRef.current.setView([latitude, longitude], 14, { animate: true });
      }

      try {
        await fetch('/api/live-location', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            userId: 'Global Field Operative',
            displayName: 'Live Field Node',
            lat: latitude,
            lng: longitude,
            accuracy,
            durationMinutes: 60,
            authorizedViewers: [viewerToken, 'team-default']
          })
        });
      } catch (err) {
        console.error('Failed to sync telemetry with server:', err);
      }
    };

    const handleError = () => {
      setPermissionState('denied');
      setIsSharing(false);
      setStatusMessage('Location permission denied or GPS unavailable.');
    };

    watchIdRef.current = navigator.geolocation.watchPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    });

    if (onSessionCreated) {
      onSessionCreated(sessionIdRef.current);
    }
  };

  // Rate-Limited Manual Refresh Control
  const handleManualRefresh = async () => {
    if (!currentCoords || refreshCooldown) return;
    setRefreshCooldown(true);
    setStatusMessage('Manually refreshing telemetry feeds...');
    await loadTelemetry(currentCoords.lat, currentCoords.lng);
    setStatusMessage(`Telemetry refreshed at ${new Date().toLocaleTimeString()}`);
    setTimeout(() => setRefreshCooldown(false), 5000);
  };

  const stopSharing = async () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    try {
      await fetch('/api/live-location', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionIdRef.current })
      });
    } catch (err) {
      console.error('Error revoking session:', err);
    }

    setIsSharing(false);
    setPermissionState('idle');
    setEnvData(null);
    setStatusMessage('Telemetry sharing stopped.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div 
        ref={mapContainerRef} 
        style={{ width: '100%', height: '400px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #1e293b' }} 
      />

      <div style={{ background: '#020617', padding: '16px', borderRadius: '10px', border: '1px solid #1e293b', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <span style={{ color: '#38bdf8', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Traceable Telemetry Engine</span>
            <h4 style={{ margin: '2px 0 0 0', color: '#f8fafc' }}>API & Satellite Provenance Dashboard</h4>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {isSharing && (
              <button 
                onClick={handleManualRefresh} 
                disabled={refreshCooldown}
                style={{ background: refreshCooldown ? '#334155' : '#0284c7', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: 'bold', cursor: refreshCooldown ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}
              >
                {refreshCooldown ? 'Refreshing...' : '🔄 Refresh Feeds'}
              </button>
            )}
            {!isSharing ? (
              <button 
                onClick={startSharing} 
                style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Start Telemetry
              </button>
            ) : (
              <button 
                onClick={stopSharing} 
                style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Stop Sharing
              </button>
            )}
          </div>
        </div>

        <div style={{ background: '#0f172a', padding: '10px 12px', borderRadius: '6px', border: '1px solid #1e293b', marginBottom: '12px', color: isSharing ? '#34d399' : '#94a3b8' }}>
          <strong>Status:</strong> {statusMessage}
        </div>

        {/* Detailed Provenance Telemetry Cards */}
        {envData && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '12px' }}>
            
            {/* Temperature Card */}
            <div style={{ background: '#0f172a', padding: '10px', borderRadius: '6px', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Temperature</span>
                <span style={{ fontSize: '0.65rem', background: '#0284c730', color: '#38bdf8', padding: '1px 4px', borderRadius: '3px' }}>{envData.temperature.classification}</span>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fbbf24', marginTop: '4px' }}>
                {envData.temperature.value} {envData.temperature.unit}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '4px' }}>Source: {envData.temperature.source}</div>
            </div>

            {/* Humidity Card */}
            <div style={{ background: '#0f172a', padding: '10px', borderRadius: '6px', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Humidity</span>
                <span style={{ fontSize: '0.65rem', background: '#0284c730', color: '#38bdf8', padding: '1px 4px', borderRadius: '3px' }}>{envData.humidity.classification}</span>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#38bdf8', marginTop: '4px' }}>
                {envData.humidity.value} {envData.humidity.unit}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '4px' }}>Source: {envData.humidity.source}</div>
            </div>

            {/* Soil Moisture Card */}
            <div style={{ background: '#0f172a', padding: '10px', borderRadius: '6px', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Soil Moisture</span>
                <span style={{ fontSize: '0.65rem', background: '#10b98130', color: '#34d399', padding: '1px 4px', borderRadius: '3px' }}>{envData.soilMoisture.classification}</span>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#34d399', marginTop: '4px' }}>
                {envData.soilMoisture.value}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '4px' }}>Source: {envData.soilMoisture.source}</div>
            </div>

            {/* Water Bodies Card */}
            <div style={{ background: '#0f172a', padding: '10px', borderRadius: '6px', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Water Bodies</span>
                <span style={{ fontSize: '0.65rem', background: '#64748b30', color: '#cbd5e1', padding: '1px 4px', borderRadius: '3px' }}>{envData.waterBodyStatus.classification}</span>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#f8fafc', marginTop: '6px' }}>
                {envData.waterBodyStatus.value}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '4px' }}>Source: {envData.waterBodyStatus.source}</div>
            </div>

            {/* Land Cover Card */}
            <div style={{ background: '#0f172a', padding: '10px', borderRadius: '6px', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Land Cover</span>
                <span style={{ fontSize: '0.65rem', background: '#f59e0b30', color: '#fbbf24', padding: '1px 4px', borderRadius: '3px' }}>{envData.landCoverIndex.classification}</span>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#f87171', marginTop: '6px' }}>
                {envData.landCoverIndex.value}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '4px' }}>Source: {envData.landCoverIndex.source}</div>
            </div>

            {/* Air Quality Card */}
            <div style={{ background: '#0f172a', padding: '10px', borderRadius: '6px', border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Air Quality (AQI)</span>
                <span style={{ fontSize: '0.65rem', background: '#ef444430', color: '#f87171', padding: '1px 4px', borderRadius: '3px' }}>{envData.airQualityAQI.classification}</span>
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#f87171', marginTop: '6px' }}>
                {envData.airQualityAQI.value}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '4px' }}>Note: {envData.airQualityAQI.error}</div>
            </div>

          </div>
        )}

        <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: '#64748b', lineHeight: '1.4' }}>
          🔒 <b>Provenance Guarantee:</b> Every metric clearly declares its data classification (API model estimate, satellite-derived grid, static geographic baseline, or demonstration) without misleading claims.
        </p>
      </div>
    </div>
  );
}