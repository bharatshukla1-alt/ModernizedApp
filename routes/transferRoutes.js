const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferController');

router.get('/', transferController.getTransfers);
router.post('/account', transferController.processAccountTransfer);
router.post('/b2b', transferController.processB2BTransfer);

module.exports = router;