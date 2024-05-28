const mongoose = require('mongoose');
const myModel = mongoose.model('users', {
  fullName: String,
  username: String,
  phone: String,
  email: String,
  pwd: String,
  reseller: String,
  wallet: Number,
  pin:String,
  validator:String,
  webhook_url:String,
  date: Date

})
module.exports = myModel