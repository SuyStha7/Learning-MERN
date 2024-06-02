const express = require('express')
const { processPayment, sendStripeAPI } = require('../controller/paymentController')
const router = express.Router()

router.post('/process/payment', processPayment)
router.get('/stripeapi', sendStripeAPI)

module.exports = router