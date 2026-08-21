const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/', transactionController.getTransactions);
router.post('/deposit-withdrawal', transactionController.processDepositWithdrawal);

module.exports = router;