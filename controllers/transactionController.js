const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

exports.getTransactions = (req, res, next) => {
  const filters = {
    accNo: req.query.accNo,
    company: req.query.company
  };

  Transaction.getAll(filters, (err, transactions) => {
    if (err) return next(err);
    res.json({
      status: 'SUCCESS',
      message: 'Transactions retrieved successfully',
      data: transactions
    });
  });
};

exports.processDepositWithdrawal = (req, res, next) => {
  const { company, accNo, sign, amt, sortCode } = req.body;

  if (!accNo || !sign || !amt) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'ACCNO, SIGN (+/-), and AMT are required.'
    });
  }

  if (sign !== '+' && sign !== '-') {
    return res.status(400).json({
      status: 'ERROR',
      message: 'SIGN field must be + (Deposit) or - (Withdrawal)'
    });
  }

  const amountNum = parseFloat(amt);
  if (isNaN(amountNum) || amountNum <= 0) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'Amount must be a valid positive number.'
    });
  }

  Account.getById(accNo, (err, account) => {
    if (err) return next(err);
    if (!account) {
      return res.status(404).json({
        status: 'ERROR',
        message: `Account ${accNo} not found.`
      });
    }

    let newAvail = account.avail_bal;
    let newAct = account.act_bal;

    if (sign === '+') {
      newAvail += amountNum;
      newAct += amountNum;
    } else {
      if (newAvail + account.overdraft < amountNum) {
        return res.status(400).json({
          status: 'ERROR',
          message: 'Insufficient funds / limit exceeded for withdrawal.'
        });
      }
      newAvail -= amountNum;
      newAct -= amountNum;
    }

    Account.updateBalances(accNo, newAvail, newAct, (err) => {
      if (err) return next(err);

      Transaction.create({
        company: company || account.company,
        accNo,
        sign,
        amt: amountNum,
        sortCode: sortCode || account.sort_code,
        availBal: newAvail,
        actBal: newAct
      }, (err, record) => {
        if (err) return next(err);
        res.status(201).json({
          status: 'SUCCESS',
          message: sign === '+' ? 'Deposit successful (BNK1CDM)' : 'Withdrawal successful (BNK1CDM)',
          data: {
            accNo,
            sign,
            amount: amountNum,
            availBal: newAvail,
            actBal: newAct,
            transactionId: record.id
          }
        });
      });
    });
  });
};