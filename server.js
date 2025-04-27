const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database('contacts.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// API endpoint for form submission
app.post('/api/contact', (req, res) => {
  const { name, phone, email, message } = req.body;
  
  // Log to file
  const logEntry = `${new Date().toISOString()} | Name: ${name}, Phone: ${phone}, Email: ${email}, Message: ${message}\n`;
  fs.appendFile(path.join(__dirname, 'contact.log'), logEntry, (err) => {
    if (err) {
      console.error('Error writing to contact.log:', err);
    }
  });

  db.run(
    'INSERT INTO contacts (name, phone, email, message) VALUES (?, ?, ?, ?)',
    [name, phone, email, message],
    function(err) {
      if (err) {
        console.error('Error inserting contact:', err);
        res.status(500).json({ error: 'Failed to save contact' });
      } else {
        res.status(201).json({ id: this.lastID });
      }
    }
  );
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 