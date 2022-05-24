const stripe = require('stripe')(
  process.env.STRIPE_SECRET_KEY
);
const Card = require('../Model/cardModel');
const User = require('../Model/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Invoice = require('../Model/invoiceModel');


exports.subscriberController = async (req, res) => {
  try {
    const decoded = await promisify(jwt.verify)(req.body.token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });
    const customerId = user.customerId;
    console.log("this is our user",user);
    // Create the subscription
    const priceId = process.env.STRIPE_PRICE_ID;
    const { name, number, exp_month, exp_year, cvc, country } = req.body;
    let cd = {
      name: name,
      number: number,
      exp_month: exp_month,
      exp_year: exp_year,
      cvc: cvc,
      address_country: country,
      address_city: user.city,
      address_line1: user.line,
      address_state: user.state,
      address_zip: user.postal_code,
    };
    const cardToken = await stripe.tokens.create({
      card: cd
    });
    const temp_id = cardToken.id;
    const card = await stripe.customers.createSource(customerId, {
      source: temp_id
    });
    const obj = {
      cardId: card.id,
      brand: card.brand,
      country: card.address_country,
      customer: customerId,
      cvc_check: card.cvc_check,
      exp_month: card.exp_month,
      exp_year: card.exp_year,
      funding: card.funding,
      last4: card.last4,
      name: card.name
    };
    const newCard = await Card.create(obj);

    const subscription = await stripe.subscriptions.create({
      off_session: true,
      enable_incomplete_payments: false,
      collection_method: 'charge_automatically',
      items: [
        {
          price: priceId,
          quantity: '1'
        }
      ],
      customer: customerId
    });
    console.log(subscription);
    const api_key = jwt.sign({ customerId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });
    const invoiceRetrieve = await stripe.invoices.retrieve(
      subscription.latest_invoice
    );
    console.log(invoiceRetrieve);
    user.subscriptionId = subscription.id;
    user.sub_status = subscription.status;
    user.cardId = card.id;
    user.api_key = api_key;
    user.save({ validateBeforeSave: false });
    res.status(200).send({ 
      status:"success",
      data:{
        subscriptionId: subscription.id,
        sub_status: subscription.status,
        cardId : card.id
      }
    });
  } catch (error) {
    console.log('error coming form subscription',error.message);
    res.status(400).send({ error: { message: error.message } });
  }
};

exports.cancelSubscription = async (req, res) => {
  // Cancel the subscription
  try {
    const decoded = await promisify(jwt.verify)(req.body.token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });
    const deleted= await stripe.subscriptions.del(user.subscriptionId);
    const deletedCard = await stripe.customers.deleteSource(
      user.customerId,
      user.cardId
    );
      user.subscriptionId = "";
      user.cardId = "";
      user.sub_status = deleted.status;
      user.save({ validateBeforeSave: false });
    const card = await Card.deleteOne({ cardId : user.cardId })
    res.send({ subscription: deleted });
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({ error: { message: error.message } });
  }
};

exports.updateCard =async (req, res) => {
  try{
  const decoded = await promisify(jwt.verify)(req.body.token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: decoded.id });
  const customerId = user.customerId;
  console.log("here before delete");
  const deleted = await stripe.customers.deleteSource(
    customerId,
    user.cardId
  );
  console.log("here after delete");
  const { name, number, exp_month, exp_year, cvc, country } = req.body;
  let cd = {
    name: name,
    number: number,
    exp_month: exp_month,
    exp_year: exp_year,
    cvc: cvc,
    address_country: country,
    address_city: user.city,
    address_line1: user.line,
    address_state: user.state,
    address_zip: user.postal_code,
  };
  const cardToken = await stripe.tokens.create({
    card: cd
  });
  const temp_id = cardToken.id;
  const card = await stripe.customers.createSource(customerId, {
    source: temp_id
  });
  const obj = {
    cardId: card.id,
    brand: card.brand,
    country: card.address_country,
    customer: customerId,
    cvc_check: card.cvc_check,
    exp_month: card.exp_month,
    exp_year: card.exp_year,
    funding: card.funding,
    last4: card.last4,
    name: card.name
  };
  const newCard = await Card.create(obj);
  user.cardId = card.id;
  user.save({ validateBeforeSave: false});
  const deleteCard = await Card.deleteOne({ cardId : user.cardId });
  res.status(200).send({ 
    status: 'success',
    cardId : card.id,
  });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: { message: error.message } });
  }
}

exports.subscriberInvoice =async (req, res) => {
    console.log("here inside invoice");
    try{
    const customerId = req.body.customerId;
    const invoice = await Invoice.find({ customer : customerId });
    console.log(invoice);
    res.status(200).send({ 
      status: 'success',
      data : invoice
    })
  }catch(err){
    console.log("error from create Invoice", err.message);
    res.status(404).send({message:err.message});
  }
}

exports.getData = async (req, res) => {
  try{
  console.log(req.body.api_key);
  const user = await User.findOne({api_key : req.body.api_key});
  if(user){
    if(user.sub_status === "active"){
      res.status(200).send({
        status: 'success',
        api : true,
        user,
      }) 
    }
    else{
      res.status(200).send({
        status : 'success',
        api : false,
        message : "Api key is not active"
      })
    }
  }
  else{
    res.status(200).send({
      status: 'success',
      api : false,
      message : "Api key is not valid"
    })
  }}
  catch(err){
    res.status(500).send({
      status: 'error',
      api : false
    })
  }
}

exports.setInvoices = async (req, res) => {
  const invoiceRetrieve = req.body.data.object;
  const date = new Date();
  const newD = new Date(date.getFullYear(), date.getMonth()+1, date.getDate()).toUTCString().substring(5,16);
  const invoiceObject = {
    receipt_url : invoiceRetrieve.hosted_invoice_url,
    invoiceId : invoiceRetrieve.id,
    amount_due: invoiceRetrieve.amount_due,
    amount_paid : invoiceRetrieve.amount_paid,
    charge : invoiceRetrieve.charge,
    currency : invoiceRetrieve.currency,
    customer : invoiceRetrieve.customer,
    customer_email : invoiceRetrieve.customer_email,
    customer_name : invoiceRetrieve.customer_name,
    invoice_pdf : invoiceRetrieve.invoice_pdf,
    number : invoiceRetrieve.number,
    period_start : date.toUTCString().substring(5,16),
    period_end : newD,
    status : invoiceRetrieve.status,
    subscription : invoiceRetrieve.subscription,
    total : invoiceRetrieve.total,
  }
  const invoice = await Invoice.create(invoiceObject)
}

exports.getWebhook = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({api_key : req.body.api_key });
    if(user) {
      if(user.sub_status === "active"){
        console.log("this is our data which is coming from extension",req.body.data);
        res.status(200).send({
          status : "success",
          webhook : true
        })
      }
      else{
        res.status(200).send({
          status : "success",
          webhook : false,
          message : "Api key is not active"
        })
      }
    }
    else{
      res.status(200).send({
        status : "success",
        webhook : false,
        message : "Api key is not valid"
      })
    }
  }catch(err){
    console.log("error from webhook", err)
    res.status(404).send({
      status : "error",
    })
  }
}