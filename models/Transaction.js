const db = require('../config/db');

class Transaction {
  static getAll(filters, callback) {
    let sql = 'SELECT * FROM transactions WHERE 1=1';
    const params = [];

    if (filters.accNo) {
      sql += ' AND acc_no = ?';
      params.push(filters.accNo);
    }
    if (filters.company) {
      sql += ' AND company = ?';
      params.push(filters.company);
    }

    sql += ' ORDER BY created_at DESC';

    db.all(sql, params, (err, rows) => {
      callback(err, rows);
    });
  }

  static create(data, callback) {
    const sql = `
      INSERT INTO transactions (company, acc_no, sign, amt, sort_code, avail_bal, act_bal)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      data.company || 'BNK1',
      data.accNo,
      data.sign,
      data.amt,
      data.sortCode,
      data.availBal,
      data.actBal
    ];

    db.run(sql, params, function (err) {
      callback(err, { id: this.lastID, ...data });
    });
  }
}

module.exports = Transaction;