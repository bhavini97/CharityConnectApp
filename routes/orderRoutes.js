const express = require("express");
const router = express.Router();
const orderCtrl = require('../controller/order');
const authMiddleware = require('../middleware/jwt/jwt')


router.post('/pay',authMiddleware,orderCtrl.postPaymentOrder);
router.get('/payment-status',authMiddleware,orderCtrl.getPaymentStatus);

module.exports = router
