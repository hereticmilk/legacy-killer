const express = require('express');
const path = require('path');
const db = require('./database');
const chroma = require('chroma-js');

const app = express();
const port = 3000;


app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.post('/tokens', (req, res) => {
    const { name, lightness, chroma, hue, contrast_ratio } = req.body;
  
    db.run(`INSERT INTO color_tokens (name, lightness, chroma, hue, contrast_ratio) VALUES (?, ?, ?, ?, ?)`,
      [name, lightness, chroma, hue, contrast_ratio],
      function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
      }
    );
});

app.get('/convert/:hex', (req, res) => {
  const { hex } = req.params;
  
  try {
    const color = chroma(`#${hex}`);
    const [l, c, h] = color.oklch();
    const contrast_ratio = chroma.contrast(color, 'white');
    
    res.json({ lightness: l, chroma: c, hue: h, contrast_ratio });
  } catch (err) {
    res.status(400).json({ error: 'Invalid HEX code' });
  }
});

app.get('/match/:lightness/:chroma/:hue/:contrast_ratio', (req, res) => {
    const { lightness, chroma, hue, contrast_ratio } = req.params;
    
    db.all(`SELECT * FROM color_tokens`, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      // This is a simple algorithm that finds the color token with the smallest total difference in OKLCH values and contrast ratio.
      // It could be improved by weighting the differences based on their importance.
      let minDifference = Infinity;
      let matchingToken = null;
      
      for (const row of rows) {
        const difference =
          Math.abs(row.lightness - lightness) +
          Math.abs(row.chroma - chroma) +
          Math.abs(row.hue - hue) +
          Math.abs(row.contrast_ratio - contrast_ratio);
        
        if (difference < minDifference) {
          minDifference = difference;
          matchingToken = row;
        }
      }
      
      if (matchingToken) {
        res.json(matchingToken);
      } else {
        res.status(404).json({ error: 'No matching color token found' });
      }
    });
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/tokens', (req, res) => {
    db.all('SELECT * FROM color_tokens', [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
});

app.delete('/tokens/:id', (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM color_tokens WHERE id = ?`, id, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Token deleted' });
  });
});
