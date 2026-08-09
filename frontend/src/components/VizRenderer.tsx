// frontend/src/components/VizRenderer.tsx
import React from "react";
import Plot from "react-plotly.js";

export default function VizRenderer({ chart }: any) {
  if (!chart) return null;
  const data = chart.traces.map((t: any) => ({ x: t.x, y: t.y, type: "scatter", mode: "lines+markers", name: t.name }));
  const layout = chart.layout || { margin: { t: 30 } };
  return <div style={{ marginTop: 8 }}><Plot data={data} layout={{ ...layout, autosize: true }} style={{ width: "100%", height: 280 }} /></div>;
}
