const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.run(`CREATE TABLE color_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  lightness REAL,
  chroma REAL,
  hue REAL,
  contrast_ratio REAL
)`, function(err) {
  if (err) {
    console.error(err.message);
    return;
  }

  // Insert the color tokens into the database
  const colorData = require('./json/light_core_tokens_converted.json');
  for (const colorName in colorData) {
    const color = colorData[colorName];
    
    for (const variant in color) {
      const shades = color[variant];
      
      for (const shade in shades) {
        const { value, oklch } = shades[shade];
        
        db.run(`INSERT INTO color_tokens (name, lightness, chroma, hue, contrast_ratio) VALUES (?, ?, ?, ?, ?)`,
          [`${colorName} ${variant} ${shade}`, oklch.lightness, oklch.chroma, oklch.hue, oklch.contrastRatio],
          function(err) {
            if (err) {
              console.error(err.message);
            }
          }
        );
      }
    }
  }
});

module.exports = db;
