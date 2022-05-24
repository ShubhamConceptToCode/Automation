const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name must be there']
  },
  email: {
    type: String,
    required: [true, 'email must be there'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  webhook : "String",
  customerId: {
    type: String,
  },
  cardId: {
    type: String,
  },
  subscriptionId: {
    type: String,
  },
  sub_status: {
    type: String,
    defaultValue: 'inactive'
  },
  line :{
    type: String,
    required: [true, 'line must be there']
  },
  postal_code:{
    type: String,
    required: [true, 'postal code must be']
  },
  city : {
    type: String,
    required: [true, 'city must be']
  },
  state : {
    type: String,
    required: [true, 'state must be']
  },
  country:{
    type: String,
    required: [true, 'country must be']
  },
  createdAt : {
    type : Date,
    default : new Date()
  },
  api_key : "String",
  
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
