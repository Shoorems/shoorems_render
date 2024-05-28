const mongoose =require('mongoose');
const myModel =  mongoose.model('sms_setting', {
  api:String,
  charge:Number,
  enable:Boolean
})
module.exports=myModel