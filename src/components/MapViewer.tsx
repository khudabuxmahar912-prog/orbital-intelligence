'use client';
import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { HotspotRecord } from '../lib/timelineData';

interface MapViewerProps {
  onLocationSelect?: (lat: number, lng: number) => void;
  activeHotspots?: HotspotRecord[];
  selectedHotspot?: HotspotRecord | null;
  changePolygon?: [number, number][];
}

export default function MapViewer({ onLocationSelect, activeHotspots = [], selectedHotspot, changePolygon = [] }: MapViewerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layerGroupRef = useRef<any>(null);
  const polygonLayerRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    import('leaflet').then((L) => {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      const map = L.map(mapContainerRef.current, {
        zoomControl: false
      }).setView([28.0033, 69.3139], 9);

      L.control.zoom({ position: 'topright' }).addTo(map);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors | Sentinel-X Platform'
      }).addTo(map);

      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Render markers and change polygon overlay
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;

    import('leaflet').then((L) => {
      layerGroupRef.current.clearLayers();

      // Render Spatial Change Polygon Overlay if available
      if (changePolygon && changePolygon.length > 0) {
        const poly = L.polygon(changePolygon, {
          color: '#ef4444',
          fillColor: '#f87171',
          fillOpacity: 0.4,
          weight: 2
        });
        poly.bindPopup('<b>Spatial Change Overlay Mask</b><br/>Calculated via Multi-Temporal Raster Differencing');
        layerGroupRef.current.addLayer(poly);
      }

      // Render Hotspot Markers
      if (activeHotspots && activeHotspots.length > 0) {
        activeHotspots.forEach((spot) => {
          const color = spot.intensityScore > 85 ? '#ef4444' : spot.intensityScore > 75 ? '#f59e0b' : '#38bdf8';
          
          const circleMarker = L.circleMarker([spot.lat, spot.lng], {
            radius: 10,
            color: '#ffffff',
            weight: 2,
            fillColor: color,
            fillOpacity: 0.9
          });

          circleMarker.bindPopup(`
            <div style="font-family: sans-serif; color: #0f172a;">
              <b style="color: #0284c7;">#${spot.rank} ${spot.name}</b><br/>
              <b>Category:</b> ${spot.category}<br/>
              <b>Intensity:</b> ${spot.intensityScore}/100<br/>
              <b>Affected Area:</b> ${spot.affectedArea}
            </div>
          `);

          circleMarker.on('click', () => {
            if (onLocationSelect) {
              onLocationSelect(spot.lat, spot.lng);
            }
          });

          layerGroupRef.current.addLayer(circleMarker);
        });
      }
    });
  }, [activeHotspots, changePolygon]);

  // Handle external selection zoom
  useEffect(() => {
    if (selectedHotspot && mapInstanceRef.current) {
      mapInstanceRef.current.setView([selectedHotspot.lat, selectedHotspot.lng], 11, {
        animate: true,
        duration: 1.0
      });
    }
  }, [selectedHotspot]);

  return (
    <div 
      style={{ width: '100%', height: '520px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #1e293b' }} 
      ref={mapContainerRef} 
    />
  );
}