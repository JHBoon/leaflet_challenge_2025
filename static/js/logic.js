// Create the 'basemap' tile layer that will be the background of our map.
// Create the 'street' tile layer
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 19,
  worldCopyJump: false,
  noWrap: true
});

// Create the map object with center and zoom options

// Focussed on my home area, Oakland, California
// var map = L.map('map').setView([37.8044, -122.2711], 8);

// Focussed on the America's:
var map = L.map('map').setView([15, -75], 3);

// Add the 'street' tile layer to the map
street.addTo(map);

 //Create the layer groups, base maps, and overlays for our two sets of data, earthquakes and tectonic_plates.
// Add a control to the map that will allow the user to change which layers are visible.

// The above assingment seems to create an obvious outcome.
// This was omitted intentionally as tectonic plate boundaries are expected to correlate with earthquake zones.
// Instead, the user has the option to select different time ranges:"last hour", "last day", "last 7 days", "last 30 days"
// Setting the earthquake layer groups
let hourEarthquakes = L.layerGroup();
let todayEarthquakes = L.layerGroup();
let weekEarthquakes = L.layerGroup();
let monthEarthquakes = L.layerGroup();

// Load GeoJSON data and populate the respective layers
function loadEarthquakeData(url, layerGroup) {
  d3.json(url).then(function(data) {
    L.geoJson(data, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
      style: styleInfo,
      onEachFeature: function(feature, layer) {
        let date = new Date(feature.properties.time);
        let formattedDate = date.toLocaleString();
        layer.bindPopup(
          `<strong>Location:</strong> ${feature.properties.place}<br>
           <strong>Magnitude:</strong> ${feature.properties.mag}<br>
           <strong>Date & Time:</strong> ${formattedDate}`
        );
        layer.on('click', function() {
          map.setView(layer.getLatLng(), 8);
        });
      }
    }).addTo(layerGroup);
  });
}
// Make a request that retrieves the earthquake geoJSON data sets.
loadEarthquakeData("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson", hourEarthquakes);
loadEarthquakeData("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", todayEarthquakes);
loadEarthquakeData("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", weekEarthquakes);
loadEarthquakeData("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", monthEarthquakes);

// Color based on depth
//This function returns the style data for each of the earthquakes we plot on
//the map. Pass the magnitude and depth of the earthquake into two separate functions 
//to calculate the color and radius.
function getColor(depth) {
  return depth > 90 ? "#ea2c2c" :
         depth > 70 ? "#ea822c" :
         depth > 50 ? "#ee9c00" :
         depth > 30 ? "#eecc00" :
         depth > 10 ? "#d4ee00" :
                      "#98ee00";
}

// Radius based on magnitude
function getRadius(magnitude) {
  return magnitude === 0 ? 1 : magnitude * magnitude * 1.2;
}

// Style each feature
function styleInfo(feature) {
  return {
    opacity: 0.5,
    fillOpacity: 0.5,
    fillColor: getColor(feature.geometry.coordinates[2]),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 1
  };
}

// Default to showing today's earthquakes
todayEarthquakes.addTo(map);

  // Create a legend control object.
let legend = L.control({ position: "bottomright" });
  // Then add all the details for the legend
legend.onAdd = function () {
  let div = L.DomUtil.create("div", "info legend");
  div.innerHTML +=
    `<h1 style="line-height:0.5em; font-size:10pt; margin-bottom:0.3em;">Earthquake Legend</h1>` +
    `<p style="line-height:0.5em; font-size:10pt; margin-bottom:0.2em;"><b>Circle size:</b> Magnitude (strength)</p>` +
    `<p style="line-height:0.5em; font-size:10pt; margin-bottom:0.5em;"><b>Circle color:</b> Depth in km (green: -10km, red: -90km)</p>`;

  // Initialize depth intervals and colors for the legend
  const depths = [-10, 10, 30, 50, 70, 90];
  const colors = [
    "#98ee00", 
    "#d4ee00", 
    "#eecc00", 
    "#ee9c00", 
    "#ea822c", 
    "#ea2c2c"];
  // Loop through our depth intervals to generate a label with a colored square for each interval.
  for (let i = 0; i < depths.length; i++) {
    div.innerHTML +=
      `<i style="background:${colors[i]}; width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.7;"></i>` +
      `${depths[i]}${depths[i + 1] ? `–${depths[i + 1]}` : "+"}<br>`;
  }
  return div;
};
legend.addTo(map);

  // Layer control for different time ranges
let baseMaps = {
  "Last Hour": hourEarthquakes,
  "Today": todayEarthquakes,
  "Last 7 Days": weekEarthquakes,
  "Last 30 Days": monthEarthquakes
};
L.control.layers(null, baseMaps, { collapsed: false }).addTo(map);

