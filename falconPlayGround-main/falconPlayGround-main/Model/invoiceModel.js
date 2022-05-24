const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    receipt_url : "String",
    invoiceId : 'String',
    amount_due: 'Number',
    amount_paid : 'Number',
    charge : "String",
    currency : 'String',
    customer : 'String',
    customer_email : 'String',
    customer_name : 'String',
    invoice_pdf : 'String',
    number : 'String',
    payment_intent : 'String',
    period_start : 'String',
    period_end : 'String',
    status : 'String',
    subscription : 'String',
    total : 'Number',
})

const invoice = mongoose.model('Invoice',invoiceSchema);

module.exports = invoice;