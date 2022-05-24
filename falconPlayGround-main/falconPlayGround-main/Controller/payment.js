const stripe = require('stripe')(
  'sk_test_51K6VnzSFPhDcxBVM0aXtB1CNXgSq7SRTyPtWPuB6fj6G7SuId2RSucc4uiWacmAHyZptedXUxtIbPigRVGrpv5cG00foPSwVde'
);

const payment = async (req, res) => {
  try {
    const priceId = req.body.priceId;
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: 'http://localhost:3001/dashboard',
      cancel_url: 'http://localhost:3001/error'
    });
    res.status(200).send({
      status: 'success',
      session
    });
  } catch (err) {
    res.status(404).send({
      status: 'error',
      message: err.message
    });
    console.log(err.message);
  }
};

module.exports = payment;
