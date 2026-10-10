'use client';
import React from 'react';

interface OrbitalLogoProps {
  size?: number;
  className?: string;
}

export default function OrbitalLogo({ size = 42, className = '' }: OrbitalLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Orbital Intelligence Sentinel-X Logo"
    >
      {/* Outer Cyan Orbital Ring */}
      <ellipse 
        cx="50" 
        cy="50" 
        rx="44" 
        ry="20" 
        transform="rotate(-25 50 50)" 
        stroke="url(#cyan_gradient)" 
        strokeWidth="4" 
        strokeDasharray="180 30"
      />
      
      {/* Secondary Orbital Ring */}
      <ellipse 
        cx="50" 
        cy="50" 
        rx="42" 
        ry="18" 
        transform="rotate(35 50 50)" 
        stroke="#3b82f6" 
        strokeWidth="2" 
        strokeOpacity="0.6"
      />

      {/* Earth Globe Base */}
      <circle cx="50" cy="50" r="28" fill="#030712" stroke="#1e293b" strokeWidth="2" />
      <path 
        d="M32 42C36 40 42 44 46 41C50 38 52 32 58 34C64 36 68 42 72 44M28 54C34 52 38 58 44 56C50 54 54 62 60 60C66 58 70 62 74 58" 
        stroke="#0284c7" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeOpacity="0.7"
      />

      {/* Central Sentinel Security Shield */}
      <path 
        d="M50 36L59 40V51C59 57.5 54.5 62.5 50 64C45.5 62.5 41 57.5 41 51V40L50 36Z" 
        fill="#0f172a" 
        stroke="#38bdf8" 
        strokeWidth="2.5" 
        strokeLinejoin="round"
      />

      {/* Orbital Trajectory Dots */}
      <circle cx="20" cy="35" r="2.5" fill="#38bdf8" />
      <circle cx="80" cy="65" r="2.5" fill="#38bdf8" />

      {/* Radial Gradients */}
      <defs>
        <linearGradient id="cyan_gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0284c7" />
        </linearGradient>
      </defs>
    </svg>
  );
}