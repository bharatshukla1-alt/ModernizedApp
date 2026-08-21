const db = require('../config/db');

class Account {
  static getAll(filters, callback) {
    let sql = 'SELECT * FROM accounts WHERE 1=1';
    const params = [];

    if (filters.company) {
      sql += ' AND company = ?';
      params.push(filters.company);
    }
    if (filters.custNo) {
      sql += ' AND cust_no = ?';
      params.push(filters.custNo);
    }
    if (filters.sortCode) {
      sql += ' AND sort_code = ?';
      params.push(filters.sortCode);
    }

    db.all(sql, params, (err, rows) => {
      callback(err, rows);
    });
  }

  static getById(accNo, callback) {
    const sql = 'SELECT * FROM accounts WHERE acc_no = ?';
    db.get(sql, [accNo], (err, row) => {
      callback(err, row);
    });
  }

  static create(data, callback) {
    const sql = `
      INSERT INTO accounts (
        acc_no, company, cust_no, acc_type, int_rt, overdraft, sort_code,
        open_dd, open_mm, open_yy, last_stmt_dd, last_stmt_mm, last_stmt_yy,
        next_stmt_dd, next_stmt_mm, next_stmt_yy, avail_bal, act_bal
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      data.accNo,
      data.company || 'BNK1',
      data.custNo,
      data.accType,
      data.intRt || 0.0,
      data.overdraft || 0.0,
      data.sortCode,
      data.openDd,
      data.openMm,
      data.openYy,
      data.lastStmtDd,
      data.lastStmtMm,
      data.lastStmtYy,
      data.nextStmtDd,
      data.nextStmtMm,
      data.nextStmtYy,
      data.availBal || 0.0,
      data.actBal || 0.0
    ];

    db.run(sql, params, function (err) {
      callback(err, { accNo: data.accNo, ...data });
    });
  }

  static update(accNo, data, callback) {
    const sql = `
      UPDATE accounts SET
        company = COALESCE(?, company),
        acc_type = COALESCE(?, acc_type),
        int_rt = COALESCE(?, int_rt),
        overdraft = COALESCE(?, overdraft),
        sort_code = COALESCE(?, sort_code),
        open_dd = COALESCE(?, open_dd),
        open_mm = COALESCE(?, open_mm),
        open_yy = COALESCE(?, open_yy),
        last_stmt_dd = COALESCE(?, last_stmt_dd),
        last_stmt_mm = COALESCE(?, last_stmt_mm),
        last_stmt_yy = COALESCE(?, last_stmt_yy),
        next_stmt_dd = COALESCE(?, next_stmt_dd),
        next_stmt_mm = COALESCE(?, next_stmt_mm),
        next_stmt_yy = COALESCE(?, next_stmt_yy),
        avail_bal = COALESCE(?, avail_bal),
        act_bal = COALESCE(?, act_bal)
      WHERE acc_no = ?
    `;
    const params = [
      data.company,
      data.accType,
      data.intRt,
      data.overdraft,
      data.sortCode,
      data.openDd,
      data.openMm,
      data.openYy,
      data.lastStmtDd,
      data.lastStmtMm,
      data.lastStmtYy,
      data.nextStmtDd,
      data.nextStmtMm,
      data.nextStmtYy,
      data.availBal,
      data.actBal,
      accNo
    ];

    db.run(sql, params, function (err) {
      callback(err, { changes: this.changes });
    });
  }

  static updateBalances(accNo, availBal, actBal, callback) {
    const sql = 'UPDATE accounts SET avail_bal = ?, act_bal = ? WHERE acc_no = ?';
    db.run(sql, [availBal, actBal, accNo], function (err) {
      callback(err, { changes: this.changes });
    });
  }

  static delete(accNo, callback) {
    const sql = 'DELETE FROM accounts WHERE acc_no = ?';
    db.run(sql, [accNo], function (err) {
      callback(err, { changes: this.changes });
    });
  }
}

module.exports = Account;