'use client';
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, zoom, { animate: true });
    }
  }, [center, zoom, map]);
  return null;
}

export default function LeafletMap({ 
  lat, 
  lng, 
  zoom = 15, 
  locationName,
  isNight 
}: { 
  lat: number; 
  lng: number; 
  zoom?: number; 
  locationName: string;
  isNight: boolean;
}) {
  const position: [number, number] = [lat, lng];

  return (
    <div className={`w-full h-full relative transition-all duration-700 ${isNight ? 'brightness-[0.35] contrast-[1.4] saturate-[0.2]' : 'brightness-[1.05] contrast-[1.05]'}`}>
      <MapContainer 
        center={position} 
        zoom={zoom} 
        scrollWheelZoom={true} 
        style={{ width: '100%', height: '100%', background: isNight ? '#02040a' : '#020617' }}
      >
        <ChangeView center={position} zoom={zoom} />
        
        {/* Google Satellite & Hybrid Labels - 100% Free & No API Key Required */}
        <TileLayer
          attribution='&copy; Google Maps Satellite'
          url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          maxZoom={20}
        />
        <TileLayer
          attribution='&copy; Google Maps Labels'
          url="https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}"
          maxZoom={20}
        />

        <Marker position={position} icon={defaultIcon}>
          <Popup>
            <div className="text-slate-900 font-sans p-1">
              <span className="font-bold text-xs block">{locationName}</span>
              <span className="font-mono text-[10px] text-slate-600 block">{lat}°N, {lng}°E</span>
              <span className="text-[10px] font-bold mt-1 block text-sky-700">
                {isNight ? '🌙 Live Night Mode Active' : '☀️ Live Daylight Satellite View'}
              </span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}