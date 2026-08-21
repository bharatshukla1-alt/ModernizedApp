const Account = require('../models/Account');

exports.getAccounts = (req, res, next) => {
  const filters = {
    company: req.query.company,
    custNo: req.query.custNo,
    sortCode: req.query.sortCode
  };

  Account.getAll(filters, (err, accounts) => {
    if (err) return next(err);
    res.json({
      status: 'SUCCESS',
      message: 'Accounts retrieved successfully',
      data: accounts
    });
  });
};

exports.getAccountById = (req, res, next) => {
  const { accNo } = req.params;
  Account.getById(accNo, (err, account) => {
    if (err) return next(err);
    if (!account) {
      return res.status(404).json({
        status: 'ERROR',
        message: `Account ${accNo} not found`
      });
    }
    res.json({
      status: 'SUCCESS',
      data: account,
      message: 'Account details map (BNK1DAM)'
    });
  });
};

exports.createAccount = (req, res, next) => {
  const {
    company,
    accNo,
    custNo,
    accType,
    intRt,
    overdraft,
    sortCode,
    openDd,
    openMm,
    openYy,
    lastStmtDd,
    lastStmtMm,
    lastStmtYy,
    nextStmtDd,
    nextStmtMm,
    nextStmtYy,
    availBal,
    actBal
  } = req.body;

  if (!accNo || !custNo || !sortCode) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'ACCNO, CUSTNO, and SORTC are mandatory fields.'
    });
  }

  const newAccount = {
    accNo,
    company: company || 'BNK1',
    custNo,
    accType: accType || 'CURR',
    intRt: intRt || 0.00,
    overdraft: overdraft || 0.00,
    sortCode,
    openDd: openDd || '',
    openMm: openMm || '',
    openYy: openYy || '',
    lastStmtDd: lastStmtDd || '',
    lastStmtMm: lastStmtMm || '',
    lastStmtYy: lastStmtYy || '',
    nextStmtDd: nextStmtDd || '',
    nextStmtMm: nextStmtMm || '',
    nextStmtYy: nextStmtYy || '',
    availBal: availBal || 0.00,
    actBal: actBal || 0.00
  };

  Account.create(newAccount, (err, result) => {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({
          status: 'ERROR',
          message: `Account record ${accNo} already exists.`
        });
      }
      return next(err);
    }
    res.status(201).json({
      status: 'SUCCESS',
      message: 'Account created successfully (BNK1CAM)',
      data: result
    });
  });
};

exports.updateAccount = (req, res, next) => {
  const { accNo } = req.params;
  Account.update(accNo, req.body, (err, result) => {
    if (err) return next(err);
    if (result.changes === 0) {
      return res.status(404).json({
        status: 'ERROR',
        message: `Account ${accNo} not found for update (BNK1UAM)`
      });
    }
    res.json({
      status: 'SUCCESS',
      message: `Account ${accNo} updated successfully (BNK1UAM)`
    });
  });
};

exports.deleteAccount = (req, res, next) => {
  const { accNo } = req.params;
  Account.delete(accNo, (err, result) => {
    if (err) return next(err);
    if (result.changes === 0) {
      return res.status(404).json({
        status: 'ERROR',
        message: `Account ${accNo} not found for deletion`
      });
    }
    res.json({
      status: 'SUCCESS',
      message: `Account ${accNo} deleted successfully`
    });
  });
};