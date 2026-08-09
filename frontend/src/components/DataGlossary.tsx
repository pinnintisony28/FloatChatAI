import React from "react";
import "./DataGlossary.css"; // Make sure to create this CSS file

const glossary = [
  { 
    term: "Location", 
    description: "The name of the place or region where the data was recorded. Example: Guntur, Vizag, Srikakulam.",
    icon: "📍"
  },
  { 
    term: "Date", 
    description: "The specific day, month, or year when the data was recorded. Format: YYYY-MM-DD, e.g., 2022-01-01.",
    icon: "📅"
  },
  { 
    term: "Yield", 
    description: "The crop production from that location on that date. Unit: tons per hectare (t/ha), e.g., 3.4.",
    icon: "🌾"
  },
  { 
    term: "Rainfall (mm)", 
    description: "The amount of rainfall recorded in that location on that date. Unit: millimeters (mm), e.g., 120.",
    icon: "🌧️"
  },
  { 
    term: "Soil Salinity", 
    description: "The salt content of the soil in that area. Unit: ppt or percentage, e.g., 1.2.",
    icon: "🏜️"
  },
  { 
    term: "SST (°C)", 
    description: "Sea Surface Temperature near that location. Unit: °C, e.g., 29.1.",
    icon: "🌊"
  },
  { 
    term: "Ocean Salinity", 
    description: "Salt content of the ocean water near that location. Unit: ppt, e.g., 35.0.",
    icon: "🧂"
  }
];

export default function DataGlossary() {
  return (
    <div className="data-glossary-container">
      {/* <h2>Data Terms Explained</h2> */}
      <ul className="data-glossary-grid">
        {glossary.map((item, idx) => (
          <li key={idx} className="data-glossary-item">
            <div className="term-number">{idx + 1}</div>
            <div className="term-content">
              <h3>
                <span className="term-icon">{item.icon}</span>
                {item.term}
              </h3>
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}