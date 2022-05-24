const express = require('express');
const subscriber = require('../Controller/subscriberController');

const router = express.Router();
router.post('/pay', subscriber.subscriberController);
router.post('/cancel', subscriber.cancelSubscription);
router.post('/update-card', subscriber.updateCard);
router.post('/user-invoice', subscriber.subscriberInvoice);
router.post('/getData', subscriber.getData)
router.post('/getWebhook', subscriber.getWebhook);
router.post('/invoices', subscriber.setInvoices);
module.exports = router;
