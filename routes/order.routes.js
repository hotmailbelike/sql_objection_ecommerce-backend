const express = require('express');
const router = express.Router();
const isAdmin = require('../middleWares/isAdmin');
const auth = require('../middleWares/auth');

const { placeOrder } = require('../controllers/order.ctrl');

router.post('/api/order', auth, placeOrder);

module.exports = router;
