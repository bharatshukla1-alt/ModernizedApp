const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/', accountController.getAccounts);
router.get('/:accNo', accountController.getAccountById);
router.post('/', accountController.createAccount);
router.put('/:accNo', accountController.updateAccount);
router.delete('/:accNo', accountController.deleteAccount);

module.exports = router;