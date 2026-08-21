const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../modernized_app.db');
const db = new sqlite3.Database(dbPath);

const dbAsync = {
  get: (sql, params = []) => new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => err ? reject(err) : resolve(row));
  }),
  all: (sql, params = []) => new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows));
  }),
  run: (sql, params = []) => new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  }),
  exec: (sql) => new Promise((resolve, reject) => {
    db.exec(sql, (err) => err ? reject(err) : resolve());
  })
};

const initDb = async () => {
  const seedPath = path.resolve(__dirname, '../db/seed.sql');
  if (fs.existsSync(seedPath)) {
    const seedSql = fs.readFileSync(seedPath, 'utf8');
    await dbAsync.exec(seedSql);
  }
};

module.exports = { db, dbAsync, initDb };