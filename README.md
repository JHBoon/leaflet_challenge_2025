# Earthquake Visualizer



This project is an interactive map that displays live earthquake data from the [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/). It allows users to view recent seismic activity filtered by time—today, past 7 days, or past 30 days—while providing detailed information for each event.

> This project was created as part of the **Data Analyst Bootcamp** at the **Academy of Irvine**.

---

## 🌍 Features

- Interactive **Leaflet.js map**
- Earthquakes visualized as circle markers:
  - **Size** based on magnitude (exponentially scaled)
  - **Color** based on depth in kilometers
- **Time-based filtering**:
  - Last hour
  - Today (**default view**)
  - Past 7 days
  - Past 30 days
- **Popups** with:
  - Location
  - Magnitude
  - Local date & time
- **Click-to-zoom** on earthquake markers
- **Legend** explaining depth and magnitude visualization
- **Zoom limits** to avoid repeated world map tiles
- Map centered on the **Americas**

---

## 🛠️ Technologies Used

- [Leaflet.js](https://leafletjs.com/) – for map rendering
- [D3.js](https://d3js.org/) – for loading GeoJSON data
- [USGS Earthquake GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- ChatGPT for tech support
- Xpert Learning Assistent Chat + for techsupport and course specific questions
- Stackoverflow
---

## 🧩 Enhancements Beyond the Core Assignment

In addition to the base project requirements, the following **custom enhancements** were implemented:

- Time-based earthquake filtering (hour, day, 7 days, 30 days)
- **Default view set to Today’s earthquakes**
- **Legend** with:
  - Color-coded depth in kilometers
  - Circle size = magnitude
- **Zoom limits** to prevent infinite map repetition
- **Click-to-zoom** to focus quickly on any earthquake location
- **Map centered on the Americas**
- Earthquake **popups include date and time**
- Unused or redundant layers (like tectonic plates) were skipped to simplify the interface

---

## 🗺️ Example: Depth Color Coding

| Depth Range (km) | Color       |
|------------------|-------------|
| -10 to 10        | `#98ee00`   |
| 10 to 30         | `#d4ee00`   |
| 30 to 50         | `#eecc00`   |
| 50 to 70         | `#ee9c00`   |
| 70 to 90         | `#ea822c`   |
| 90+              | `#ea2c2c`   |

> **Magnitude** is reflected in circle size (scaled exponentially for visual clarity).

---

## 📁 Project Structure


