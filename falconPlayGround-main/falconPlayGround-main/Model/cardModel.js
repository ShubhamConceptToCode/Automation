const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  cardId: {
    type: 'String',
    required: [true, 'cardId must should be there']
  },
  name: {
    type: 'String',
    required:[true, 'name must be there']
  },
  brand: 'String',
  country: 'String',
  customer: 'String',
  cvc_check: 'String',
  exp_month: 'String',
  exp_year: 'String',
  funding: 'String',
  last4: 'Number'
});

const card = mongoose.model('card', cardSchema);

module.exports = card;
