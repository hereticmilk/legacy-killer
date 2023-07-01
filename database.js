const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.run(`CREATE TABLE color_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  lightness REAL,
  chroma REAL,
  hue REAL,
  contrast_ratio REAL
)`);

module.exports = db;
