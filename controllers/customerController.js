const Customer = require('../models/Customer');

exports.getCustomers = (req, res, next) => {
  const filters = {
    company: req.query.company,
    sortCode: req.query.sortCode,
    search: req.query.search
  };

  Customer.getAll(filters, (err, customers) => {
    if (err) return next(err);
    res.json({
      status: 'SUCCESS',
      message: 'Customers retrieved successfully',
      data: customers
    });
  });
};

exports.getCustomerById = (req, res, next) => {
  const { custNo } = req.params;
  Customer.getById(custNo, (err, customer) => {
    if (err) return next(err);
    if (!customer) {
      return res.status(404).json({
        status: 'ERROR',
        message: `Customer ${custNo} not found`,
        dummy: ''
      });
    }
    res.json({
      status: 'SUCCESS',
      data: customer,
      message: 'Customer record details map (BNK1DCM)'
    });
  });
};

exports.createCustomer = (req, res, next) => {
  const {
    company,
    custNo,
    title,
    firstName,
    initials,
    lastName,
    addressLine1,
    addressLine2,
    city,
    postcode,
    country,
    dobDd,
    dobMm,
    dobYy,
    sortCode,
    creditScore,
    scoreDateDd,
    scoreDateMm,
    scoreDateYy
  } = req.body;

  if (!custNo || !firstName || !lastName) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'CUSTNO, CHRISTN/CUSTFNAM, and CUSTSN/CUSTLNAM are required fields.'
    });
  }

  const newCustomer = {
    custNo,
    company: company || 'BNK1',
    title: title || '',
    firstName,
    initials: initials || '',
    lastName,
    addressLine1: addressLine1 || '',
    addressLine2: addressLine2 || '',
    city: city || '',
    postcode: postcode || '',
    country: country || '',
    dobDd: dobDd || '',
    dobMm: dobMm || '',
    dobYy: dobYy || '',
    sortCode: sortCode || '',
    creditScore: creditScore || 0,
    scoreDateDd: scoreDateDd || '',
    scoreDateMm: scoreDateMm || '',
    scoreDateYy: scoreDateYy || ''
  };

  Customer.create(newCustomer, (err, result) => {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({
          status: 'ERROR',
          message: `Customer record ${custNo} already exists.`
        });
      }
      return next(err);
    }
    res.status(201).json({
      status: 'SUCCESS',
      message: 'Customer created successfully (BNK1CCM)',
      data: result
    });
  });
};

exports.updateCustomer = (req, res, next) => {
  const { custNo } = req.params;
  Customer.update(custNo, req.body, (err, result) => {
    if (err) return next(err);
    if (result.changes === 0) {
      return res.status(404).json({
        status: 'ERROR',
        message: `Customer ${custNo} not found for update`
      });
    }
    res.json({
      status: 'SUCCESS',
      message: `Customer ${custNo} updated successfully`
    });
  });
};

exports.deleteCustomer = (req, res, next) => {
  const { custNo } = req.params;
  Customer.delete(custNo, (err, result) => {
    if (err) return next(err);
    if (result.changes === 0) {
      return res.status(404).json({
        status: 'ERROR',
        message: `Customer ${custNo} not found for deletion`
      });
    }
    res.json({
      status: 'SUCCESS',
      message: `Customer ${custNo} deleted successfully`
    });
  });
};