const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../crm_database.sqlite');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database connection:', err.message);
  } else {
    console.log('Connected to SQLite database at:', DB_PATH);
    initDatabase();
  }
});

function initDatabase() {
  const seedSqlPath = path.join(__dirname, '../seed.sql');
  if (fs.existsSync(seedSqlPath)) {
    const sql = fs.readFileSync(seedSqlPath, 'utf8');
    db.exec(sql, (err) => {
      if (err) {
        console.error('Error executing seed SQL script:', err.message);
      } else {
        console.log('Database schema and seed data successfully initialized.');
      }
    });
  }
}

module.exports = db;