const fs = require('fs');
const chroma = require('chroma-js');

function convertHexToOklch(hex) {
  const color = chroma(hex);
  const [l, c, h] = color.oklch();
  const contrastRatio = chroma.contrast(color, 'white');
  
  return { lightness: l, chroma: c, hue: h, contrastRatio };
}

// Read the JSON file
const data = JSON.parse(fs.readFileSync('./json/android_legacy_solid.json', 'utf8'));

// Loop over each color and convert the HEX values
for (const colorName in data) {
  const hex = data[colorName];
  const oklch = convertHexToOklch(hex);
  
  // Add the OKLCH and contrast values to the JSON data
  data[colorName] = { value: hex, oklch: oklch };
}

// Write the updated data back to a new JSON file
fs.writeFileSync('./json/android_legacy_solid_converted.json', JSON.stringify(data, null, 2));
