const db = require('../config/db');

class Transfer {
  static getAll(filters, callback) {
    let sql = 'SELECT * FROM transfers WHERE 1=1';
    const params = [];

    if (filters.company) {
      sql += ' AND company = ?';
      params.push(filters.company);
    }
    if (filters.fromAccNo) {
      sql += ' AND from_acc_no = ?';
      params.push(filters.fromAccNo);
    }
    if (filters.toAccNo) {
      sql += ' AND to_acc_no = ?';
      params.push(filters.toAccNo);
    }

    sql += ' ORDER BY created_at DESC';

    db.all(sql, params, (err, rows) => {
      callback(err, rows);
    });
  }

  static create(data, callback) {
    const sql = `
      INSERT INTO transfers (
        company, from_acc_no, to_acc_no, from_sort_code, to_sort_code, amt,
        from_act_bal, to_act_bal, from_avail_bal, to_avail_bal,
        act_sign, act_pnd, act_pnc, ava_sign, ava_pnd, ava_pnc
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      data.company || 'BNK1',
      data.fromAccNo,
      data.toAccNo,
      data.fromSortCode,
      data.toSortCode,
      data.amt,
      data.fromActBal,
      data.toActBal,
      data.fromAvailBal,
      data.toAvailBal,
      data.actSign || '+',
      data.actPnd || 0.0,
      data.actPnc || 0.0,
      data.avaSign || '+',
      data.avaPnd || 0.0,
      data.avaPnc || 0.0
    ];

    db.run(sql, params, function (err) {
      callback(err, { id: this.lastID, ...data });
    });
  }
}

module.exports = Transfer;