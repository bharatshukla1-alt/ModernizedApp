const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.post('/action', menuController.handleMenuAction);

module.exports = router;