const signatureModel = require('../Model/signatureModel.js');

const signatureController = (req, res) => {
  try {
    const signature = new signatureModel(req.body);
    signature
      .save()
      .then()
      .catch(err => console.log(err));
    res.status(200).send({
      status: 'success',
      message: 'working'
    });
  } catch (err) {
    res.status(404).send({
      status: 'error',
      message: err.message
    });
  }
};

module.exports = signatureController;
