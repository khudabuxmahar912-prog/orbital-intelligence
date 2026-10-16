'use client';
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue in Next.js
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Safe view changer component
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
  locationName 
}: { 
  lat: number; 
  lng: number; 
  zoom?: number; 
  locationName: string 
}) {
  const position: [number, number] = [lat, lng];

  return (
    <MapContainer 
      center={position} 
      zoom={zoom} 
      scrollWheelZoom={true} 
      style={{ width: '100%', height: '100%', background: '#020617' }}
    >
      <ChangeView center={position} zoom={zoom} />
      
      {/* 1. Base Google Satellite Imagery */}
      <TileLayer
        attribution='&copy; Google Maps Satellite'
        url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        maxZoom={20}
      />

      {/* 2. Google Hybrid Street & Place Name Labels */}
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
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}