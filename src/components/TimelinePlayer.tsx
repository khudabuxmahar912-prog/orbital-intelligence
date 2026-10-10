'use client';
import React, { useState, useEffect } from 'react';
import { TimelineSnapshot, TIMELINE_SNAPSHOTS } from '../lib/timelineData';

interface TimelinePlayerProps {
  locationKey?: string;
  onYearChange: (snapshot: TimelineSnapshot) => void;
}

export default function TimelinePlayer({ locationKey = 'ghotki', onYearChange }: TimelinePlayerProps) {
  const snapshots = TIMELINE_SNAPSHOTS[locationKey] || TIMELINE_SNAPSHOTS['ghotki'];
  const [currentIndex, setCurrentIndex] = useState(snapshots.length - 1); // default to 2026 (latest)
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    onYearChange(snapshots[currentIndex]);
  }, [currentIndex, locationKey]);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= snapshots.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, snapshots.length]);

  const currentSnapshot = snapshots[currentIndex];

  return (
    <div style={{ background: '#0f172a', padding: '16px 20px', borderRadius: '12px', border: '1px solid #1e293b', marginTop: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 'bold', textTransform: 'uppercase' }}>Multi-Temporal Intelligence Timeline</span>
          <h3 style={{ fontSize: '1rem', margin: '2px 0 0 0', color: '#f8fafc' }}>Observation Year: {currentSnapshot.year} ({currentSnapshot.acquisitionDate})</h3>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            style={{ background: '#1e293b', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
          >
            ◀ Prev
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            style={{ background: isPlaying ? '#ef4444' : '#0284c7', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
          >
            {isPlaying ? 'Pause' : 'Play Timeline'}
          </button>
          <button 
            onClick={() => setCurrentIndex((prev) => Math.min(snapshots.length - 1, prev + 1))}
            style={{ background: '#1e293b', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
          >
            Next ▶
          </button>
        </div>
      </div>

      {/* Slider */}
      <input 
        type="range" 
        min={0} 
        max={snapshots.length - 1} 
        value={currentIndex} 
        onChange={(e) => setCurrentIndex(Number(e.target.value))}
        style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer', marginBottom: '8px' }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
        {snapshots.map((s, idx) => (
          <span 
            key={s.year} 
            onClick={() => setCurrentIndex(idx)}
            style={{ cursor: 'pointer', color: currentIndex === idx ? '#38bdf8' : '#94a3b8', fontWeight: currentIndex === idx ? 'bold' : 'normal' }}
          >
            {s.year}
          </span>
        ))}
      </div>
    </div>
  );
}