// backend/index.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const app = express();
app.use(cors());
app.use(express.json());

// ----- helper: load CSV from /data -----
function loadCSV(name) {
  const csv = fs.readFileSync(path.join(__dirname, 'data', name), 'utf8');
  return Papa.parse(csv, { header: true, dynamicTyping: true }).data;
}

// ----- load CSV once at server start -----
const agroData = loadCSV('agro_sample.csv');       // location,date,yield,rainfall_mm,soil_salinity
const oceanData = loadCSV('ocean_sample.csv');     // location,date,sst_c,salinity

// ----- merge agro + ocean data -----
function getMergedData() {
  const map = {};
  agroData.forEach(r => { map[r.date + '_' + r.location] = { ...r }; });
  oceanData.forEach(r => {
    const key = r.date + '_' + r.location;
    if (map[key]) map[key] = { ...map[key], ...r };
    else map[key] = { ...r };
  });
  return Object.values(map).sort((a,b) => new Date(a.date) - new Date(b.date));
}

// ----- simple keyword/date parser -----
function simpleParse(message) {
  const known = ['Guntur', 'Vizag', 'Chennai', 'Mangalore']; // extend as needed
  let location = null;
  for (const k of known) if (new RegExp('\\b' + k + '\\b','i').test(message)) location = k;

  // extract years like "2022 to 2024" or single year
  const m = message.match(/(\d{4})(?:\s*(?:-|to)\s*(\d{4}))?/);
  let start = '2022-01-01', end = '2024-12-31';
  if (m) {
    start = `${m[1]}-01-01`;
    end = m[2] ? `${m[2]}-12-31` : `${m[1]}-12-31`;
  }

  // variables
  const variables = [];
  if (/rain/i.test(message)) variables.push('rainfall_mm');
  if (/yield/i.test(message)) variables.push('yield');
  if (/soil salin|soil_salin|salinity/i.test(message)) variables.push('soil_salinity');
  if (/sst|sea surface temp|sea surface/i.test(message)) variables.push('sst_c');

  if (variables.length === 0) variables.push('rainfall_mm');

  // analysis
  let analysis = 'timeseries';
  if (/compare|correl|correlation/i.test(message)) analysis = 'correlation';
  if (/map|district|choropleth/i.test(message)) analysis = 'map';

  return { location, startDate: start, endDate: end, variables, analysis };
}

// ----- build explanation of the data -----
function buildExplanation(data, filters) {
  if (!data.length) return 'No data available for the selected location or date range.';
  const first = data[0];
  const last = data[data.length-1];
  const variable = filters.variables[0];
  return `Between ${first.date} and ${last.date}, ${variable} changed from ${first[variable] ?? 'N/A'} to ${last[variable] ?? 'N/A'} at ${filters.location ?? 'the selected area'}.`;
}

// ----- run query & build chart spec -----
function runQueryAndAnalyze(filters) {
  const mergedData = getMergedData();
  const start = new Date(filters.startDate);
  const end = new Date(filters.endDate);

  // filter by date & location
  const filteredData = mergedData.filter(r => {
    const d = new Date(r.date);
    if (d < start || d > end) return false;
    if (filters.location && (!r.location || r.location.toLowerCase() !== filters.location.toLowerCase())) return false;
    return true;
  });

  // build Plotly-style traces
  const traces = [];
  filters.variables.forEach(v => {
    traces.push({
      name: v,
      x: filteredData.map(d => d.date),
      y: filteredData.map(d => d[v] ?? null)
    });
  });

  // optionally add SST trace
  if (filteredData.some(d => d.sst_c != null)) {
    traces.push({
      name: 'SST (°C)',
      x: filteredData.map(d => d.date),
      y: filteredData.map(d => d.sst_c ?? null)
    });
  }

  // summary
  const summary = filteredData.length
    ? `Found ${filteredData.length} records for ${filters.location ?? 'selected area'}. ${filters.variables[0]}: ${filteredData[0][filters.variables[0]] ?? 'N/A'} → ${filteredData[filteredData.length-1][filters.variables[0]] ?? 'N/A'}`
    : 'No data found for these filters.';

  // explanation
  const explanation = buildExplanation(filteredData, filters);

  return { filters, chart: { type: 'timeseries', traces, layout: { title: `${filters.variables.join(', ')} & SST` } }, summary, explanation, data: filteredData };
}

// ----- API endpoint -----
app.post('/api/chat/message', (req, res) => {
  const { message, history } = req.body;
  if (!message) return res.status(400).json({ error: 'message required' });

  // multi-turn conversation (currently just stored)
  const conversation = [...(history || []), { from: "user", text: message }];

  // parse filters
  const filters = simpleParse(message);

  // run analysis
  const result = runQueryAndAnalyze(filters);

  res.json(result);
});

// ----- start server -----
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
