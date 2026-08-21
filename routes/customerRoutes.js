const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.getCustomers);
router.get('/:custNo', customerController.getCustomerById);
router.post('/', customerController.createCustomer);
router.put('/:custNo', customerController.updateCustomer);
router.delete('/:custNo', customerController.deleteCustomer);

module.exports = router;