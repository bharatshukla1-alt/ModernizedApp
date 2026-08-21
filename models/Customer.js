const db = require('../config/db');

class Customer {
  static getAll(filters, callback) {
    let sql = 'SELECT * FROM customers WHERE 1=1';
    const params = [];

    if (filters.company) {
      sql += ' AND company = ?';
      params.push(filters.company);
    }
    if (filters.sortCode) {
      sql += ' AND sort_code = ?';
      params.push(filters.sortCode);
    }
    if (filters.search) {
      sql += ' AND (first_name LIKE ? OR last_name LIKE ? OR cust_no LIKE ?)';
      const term = `%${filters.search}%`;
      params.push(term, term, term);
    }

    db.all(sql, params, (err, rows) => {
      callback(err, rows);
    });
  }

  static getById(custNo, callback) {
    const sql = 'SELECT * FROM customers WHERE cust_no = ?';
    db.get(sql, [custNo], (err, row) => {
      callback(err, row);
    });
  }

  static create(data, callback) {
    const sql = `
      INSERT INTO customers (
        cust_no, company, title, first_name, initials, last_name, address_line1, address_line2, 
        city, postcode, country, dob_dd, dob_mm, dob_yy, sort_code, credit_score, score_date_dd, score_date_mm, score_date_yy
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      data.custNo,
      data.company || 'BNK1',
      data.title,
      data.firstName,
      data.initials,
      data.lastName,
      data.addressLine1,
      data.addressLine2,
      data.city,
      data.postcode,
      data.country,
      data.dobDd,
      data.dobMm,
      data.dobYy,
      data.sortCode,
      data.creditScore || 0,
      data.scoreDateDd,
      data.scoreDateMm,
      data.scoreDateYy
    ];

    db.run(sql, params, function (err) {
      callback(err, { custNo: data.custNo, ...data });
    });
  }

  static update(custNo, data, callback) {
    const sql = `
      UPDATE customers SET
        company = COALESCE(?, company),
        title = COALESCE(?, title),
        first_name = COALESCE(?, first_name),
        initials = COALESCE(?, initials),
        last_name = COALESCE(?, last_name),
        address_line1 = COALESCE(?, address_line1),
        address_line2 = COALESCE(?, address_line2),
        city = COALESCE(?, city),
        postcode = COALESCE(?, postcode),
        country = COALESCE(?, country),
        dob_dd = COALESCE(?, dob_dd),
        dob_mm = COALESCE(?, dob_mm),
        dob_yy = COALESCE(?, dob_yy),
        sort_code = COALESCE(?, sort_code),
        credit_score = COALESCE(?, credit_score),
        score_date_dd = COALESCE(?, score_date_dd),
        score_date_mm = COALESCE(?, score_date_mm),
        score_date_yy = COALESCE(?, score_date_yy)
      WHERE cust_no = ?
    `;
    const params = [
      data.company,
      data.title,
      data.firstName,
      data.initials,
      data.lastName,
      data.addressLine1,
      data.addressLine2,
      data.city,
      data.postcode,
      data.country,
      data.dobDd,
      data.dobMm,
      data.dobYy,
      data.sortCode,
      data.creditScore,
      data.scoreDateDd,
      data.scoreDateMm,
      data.scoreDateYy,
      custNo
    ];

    db.run(sql, params, function (err) {
      callback(err, { changes: this.changes });
    });
  }

  static delete(custNo, callback) {
    const sql = 'DELETE FROM customers WHERE cust_no = ?';
    db.run(sql, [custNo], function (err) {
      callback(err, { changes: this.changes });
    });
  }
}

module.exports = Customer;