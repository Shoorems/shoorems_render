const mongoose =require('mongoose');
const myModel =  mongoose.model('smsHistory', {
  id:String,
  username:String,
  message:String,
  sender_name:String,
  message:String,
  amount:Number,
  total_number:Number,
  correct_number:Number,
  wrong_number:Number,
  status:String,
  date:Date

})
module.exports=myModel