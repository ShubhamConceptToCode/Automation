const User = require('../Model/userModel.js');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const stripe = require('stripe')(
   process.env.STRIPE_SECRET_KEY
);

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const cust_Id = await createCustomerId(newUser.email, newUser.name, req);
    newUser.customerId = cust_Id;
    newUser.save({ validateBeforeSave: false });
    const token = signToken(newUser._id);
    res.status(200).send({
      status: 'success',
      data: {
        name: newUser.name,
        token,
        email: newUser.email,
        customerId : cust_Id
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(401).send({
      status: 'error',
      message: err.message
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).send({
        status: 'error',
        message: 'please provide email and password'
      });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(401).send({
        status: 'error',
        message: 'Incorrect email and password'
      });
    }
    const token = signToken(user._id);
    let data = {
      name: user.name,
      token,
      email: user.email,
    }
    console.log("successfully login");
    if(user.cardId){
      data = {
        name: user.name,
        token,
        email: user.email,
        cardId: user.cardId
      }
    }
    if(user.customerId) {
      data = {
        name: user.name,
        token,
        email: user.email,
        cardId: user.cardId,
        customerId : user.customerId
      }
    } 
    
    res.status(200).send({
      status: 'success',
      data : data
    });
  } catch (err) {
    console.log(err.message);
    res.status(401).send({
      status: 'error',
      message: err.message
    });

  }
};

exports.update = async (req, res, next) => {
  try {
    console.log("this is req body", req.body);
    const decoded = await promisify(jwt.verify)(req.body.token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });
    console.log(user);
    user.name = req.body.name;
    user.email = req.body.email;
    user.city = req.body.city;
    user.line = req.body.line;
    user.state = req.body.state;
    user.country = req.body.country;
    user.postal_code = req.body.postal_code;
    console.log(req.body.password);
    if (req.body.password) {
      user.password = req.body.password;
      user.passwordConfirm = req.body.passwordConfirm;
    }
    user.save({ validateBeforeSave: false });
    res.status(200).json({
      status: 'success',
      name: user.name,
      email: user.email
    });
  } catch (err) {
    res.status(401).json({
      status: 'error'
    });
  }
};

const createCustomerId = async (email, name, req) => {
 const address = {
    line1: req.body.line,
    postal_code: req.body.postal_code,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country
  }
  console.log(address);
  const customer = await stripe.customers.create({
    name,
    email,
    address
  });
  return customer.id;
};

exports.updateWebhook = async (req, res) => {
  try{
    const decoded = await promisify(jwt.verify)(req.body.token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });
    user.webhook = req.body.webhook;
    console.log("here is our webhook" , req.body.webhook, user);
    user.save({ validateBeforeSave: false });
    res.status(200).send({
      status: 'success'
    }) 
  }catch(err){
    console.log(err);
    res.status(400).send({ status: 'error' });
  }
}