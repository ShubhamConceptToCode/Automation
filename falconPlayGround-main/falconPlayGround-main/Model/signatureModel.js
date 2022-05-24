const mongoose = require('mongoose');

const signatureSchema = new mongoose.Schema({
  signatureImg: {
    type: String,
    require: [true, 'signature must needed']
  }
});

const signatureModel = mongoose.model('signatureModel', signatureSchema);

module.exports = signatureModel;
