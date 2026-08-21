const Transfer = require('../models/Transfer');
const Account = require('../models/Account');

exports.getTransfers = (req, res, next) => {
  const filters = {
    company: req.query.company,
    fromAccNo: req.query.fromAccNo,
    toAccNo: req.query.toAccNo
  };

  Transfer.getAll(filters, (err, transfers) => {
    if (err) return next(err);
    res.json({
      status: 'SUCCESS',
      message: 'Transfers retrieved successfully',
      data: transfers
    });
  });
};

exports.processAccountTransfer = (req, res, next) => {
  const {
    company,
    faccNo,
    taccNo,
    amt,
    fsortC,
    tsortC
  } = req.body;

  if (!faccNo || !taccNo || !amt) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'FACCNO, TACCNO, and AMT are required.'
    });
  }

  const transferAmount = parseFloat(amt);
  if (isNaN(transferAmount) || transferAmount <= 0) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'Transfer amount must be positive.'
    });
  }

  Account.getById(faccNo, (err, fromAccount) => {
    if (err) return next(err);
    if (!fromAccount) {
      return res.status(404).json({
        status: 'ERROR',
        message: `Source account ${faccNo} not found.`
      });
    }

    Account.getById(taccNo, (err, toAccount) => {
      if (err) return next(err);
      if (!toAccount) {
        return res.status(404).json({
          status: 'ERROR',
          message: `Target account ${taccNo} not found.`
        });
      }

      if (fromAccount.avail_bal + fromAccount.overdraft < transferAmount) {
        return res.status(400).json({
          status: 'ERROR',
          message: 'Insufficient balance in source account for transfer.'
        });
      }

      const newFromAvail = fromAccount.avail_bal - transferAmount;
      const newFromAct = fromAccount.act_bal - transferAmount;
      const newToAvail = toAccount.avail_bal + transferAmount;
      const newToAct = toAccount.act_bal + transferAmount;

      Account.updateBalances(faccNo, newFromAvail, newFromAct, (err) => {
        if (err) return next(err);

        Account.updateBalances(taccNo, newToAvail, newToAct, (err) => {
          if (err) return next(err);

          Transfer.create({
            company: company || 'BNK1',
            fromAccNo: faccNo,
            toAccNo: taccNo,
            fromSortCode: fsortC || fromAccount.sort_code,
            toSortCode: tsortC || toAccount.sort_code,
            amt: transferAmount,
            fromActBal: newFromAct,
            toActBal: newToAct,
            fromAvailBal: newFromAvail,
            toAvailBal: newToAvail
          }, (err, transferRecord) => {
            if (err) return next(err);
            res.status(201).json({
              status: 'SUCCESS',
              message: 'Account Transfer processed successfully (BNK1TFM)',
              data: transferRecord
            });
          });
        });
      });
    });
  });
};

exports.processB2BTransfer = (req, res, next) => {
  const {
    company,
    faccNo,
    taccNo,
    amt,
    actSign,
    actPnd,
    actPnc,
    avaSign,
    avaPnd,
    avaPnc,
    fscde1, fscde2, fscde3,
    tscde1, tscde2, tscde3
  } = req.body;

  const fsortCode = [fscde1, fscde2, fscde3].filter(Boolean).join('');
  const tsortCode = [tscde1, tscde2, tscde3].filter(Boolean).join('');

  const transferAmount = parseFloat(amt);
  if (isNaN(transferAmount) || transferAmount <= 0) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'Valid positive amount required for B2B transfer.'
    });
  }

  Transfer.create({
    company: company || 'BNK1',
    fromAccNo: faccNo,
    toAccNo: taccNo,
    fromSortCode: fsortCode,
    toSortCode: tsortCode,
    amt: transferAmount,
    actSign: actSign || '+',
    actPnd: actPnd || 0.0,
    actPnc: actPnc || 0.0,
    avaSign: avaSign || '+',
    avaPnd: avaPnd || 0.0,
    avaPnc: avaPnc || 0.0
  }, (err, record) => {
    if (err) return next(err);
    res.status(201).json({
      status: 'SUCCESS',
      message: 'B2B Batch Transfer created/queued (BNK1B2M)',
      data: record
    });
  });
};