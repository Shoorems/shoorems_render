const mongoose =require('mongoose');
const myModel =  mongoose.model('walletHistory', {
  id:String,
  username:String,
  message:String,
  amount:Number,
  prev_bal:Number,
  new_bal:Number,
  status:String,
  date:Date

})
module.exports=myModel