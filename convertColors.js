const fs = require('fs');
const chroma = require('chroma-js');

function convertHexToOklch(hex) {
  const color = chroma(hex);
  const [l, c, h] = color.oklch();
  const contrastRatio = chroma.contrast(color, 'white');
  
  return { lightness: l, chroma: c, hue: h, contrastRatio };
}

// Read the JSON file
const data = JSON.parse(fs.readFileSync('./json/light_core_tokens.json', 'utf8'));

// Loop over each color and convert the HEX values
for (const colorName in data) {
  const color = data[colorName];
  
  for (const variant in color) {
    const shades = color[variant];
    
    for (const shade in shades) {
      const hex = shades[shade].value;
      const oklch = convertHexToOklch(hex);
      
      // Add the OKLCH and contrast values to the JSON data
      shades[shade].oklch = oklch;
    }
  }
}

// Write the updated data back to a new JSON file
fs.writeFileSync('./json/light_core_tokens_converted.json', JSON.stringify(data, null, 2));
