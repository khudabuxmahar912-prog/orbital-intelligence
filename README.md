# 🛰️ ORBITAL INTELLIGENCE — SENTINEL-X
> **Satellite-Based Land Change Intelligence & Real-Time Environmental Telemetry Node**  
> **Official Submission for NASA Space Apps Challenge 2026**
---
## 📌 Executive Summary
**ORBITAL INTELLIGENCE (Sentinel-X)** is a full-stack Earth Observation (EO) and Geospatial Intelligence platform designed to analyze surface dynamics, land-use changes, and real-time atmospheric conditions across multi-temporal baselines.
Engineered specifically for the **NASA Space Apps Challenge 2026**, Sentinel-X bridges high-resolution satellite observation (Sentinel-2 MSI) with ground-truth environmental telemetry. The system features interactive surface change tracking, voluntary consent-based GPS streaming, live weather modeling via Open-Meteo, and an automated **Geospatial Intelligence Report Generator** with strict data provenance and scientific transparency declarations.
---
## 👨‍💻 Founder & Developer Attribution
* **Founder & Lead Developer:** **Khuda Bux Mahar**
* **Role:** Full-Stack Architecture, Geospatial Integration, UI/UX Engineering, Data Provenance Pipeline, and Security Protocols.
* **Project Status:** Production Ready & Version Controlled (v1.0)
* **Event:** NASA Space Apps Challenge 2026
---
## ✨ Key Features & Architecture Breakdown
### 1. 🛰️ Module A: Earth Observation & Surface Change Detection
* **Multi-Temporal Satellite Timeline:** Enables interactive spatial analysis across a 2022–2026 multi-year temporal window.
* **Hotspot Overlay Engine:** Identifies critical surface transitions, including agricultural NDVI variance, hydrological channel shifts, and urban expansion dynamics.
* **Interactive Timeline Player:** Scrubbing controls and event listeners (`onYearChange`) that update environmental parameters dynamically.
* **Global & Regional Coverage:** Universal mapping engine focused on regional observation baselines (e.g., Ghotki Surface Dynamics) while maintaining full global pan/zoom capability.
### 2. 📍 Module B: Consent-Based Live Telemetry Node
* **Voluntary GPS Telemetry:** Real-time movement tracking designed for field researchers and disaster response units.
* **Live Weather Integration:** Embedded Open-Meteo Numerical Weather Prediction API providing live temperature, relative humidity, wind speed, and atmospheric parameters.
* **Privacy & Consent Controls:** Explicit token verification (`team-default`) ensuring data transmission occurs strictly with voluntary user consent.
### 3. 📄 Geospatial Intelligence Report Generator
* **On-Demand Briefing Engine:** Automatically collects active map coordinates, observation years, telemetry metrics, and regional hotspot evidence into a clean report format.
* **Print & PDF Export:** Integrated modal interface with a dedicated print trigger (`window.print()`) for direct PDF downloading or physical printing.
* **Scientific Provenance Matrix:** Explicitly tags every metric as Live API, Satellite-Derived, Static Data, or Demonstration Output.
* **Uncertainty & Limitations Declaration:** Formally documents missing ground monitoring data (e.g., OpenAQ station gaps) as `"Data unavailable"` to uphold scientific integrity.
---
## 🔬 Scientific Data Provenance & Classification Matrix
Sentinel-X maintains strict separation between verified satellite data, live API model estimates, static geographical boundaries, and heuristic classifiers:

| Feature / Metric | Primary Source / Sensor | Classification Tag | Scientific Description |
| :--- | :--- | :--- | :--- |
| **Surface Imagery** | Sentinel-2 MSI Multi-Temporal Baseline | `Satellite-Derived` | European Space Agency (ESA) Copernicus constellation band synthesis (2022–2026). |
| **Soil Moisture Grid** | NASA SMAP Level-3 Radiometer | `Satellite-Derived` | SPL3SMP E / 9km Equal-Area Scalable Earth Grid average moisture density. |
| **Meteorological Telemetry** | Open-Meteo NWP Model | `Live API Model Estimate` | High-resolution spatial interpolation for ambient temperature and relative humidity. |
| **Hydrography Layer** | OpenStreetMap / HydroSHEDS | `Static Geographic Data` | Mapped river basins, canal networks, and water bodies. |
| **Land Cover Index** | Sentinel-X Heuristic Engine | `Demonstration / Simulated` | Demonstration land-use classification matrix for spatial presentation. |
| **Air Quality (AQI)** | OpenAQ Station Network | `Data Unavailable` | Defaulted state when active ground sensors fall outside required proximity radius. |

---
## 🎨 UI/UX Design Standards
* **Color System:** Dark theme utilizing Deep Charcoal/Slate (`#020617` / `#0f172a`) with restrained Cyan (`#06b6d4`) and Teal (`#14b8a6`) operational accents.
* **Sticky Navigation Bridge:** Non-overlapping header container (`sticky top-0 z-50`) with backdrop blur, allowing geospatial map tiles to scroll beneath seamlessly like a bridge.
* **Vector Branding:** Custom inline SVG logo (`OrbitalLogo.tsx`) incorporating a central earth core, orbital trajectory rings, and a protective sentinel shield.
---
## 🛠️ Technology Stack & Dependencies
* **Frontend Framework:** Next.js (App Router, React)
* **Programming Language:** TypeScript (Strict Type Safety)
* **Styling Framework:** Tailwind CSS
* **Geospatial & Mapping:** Leaflet, React-Leaflet
* **Live API Services:** Open-Meteo Weather API
* **Icons & Vector Assets:** Custom SVG Components
---
## 📁 Repository Structure
