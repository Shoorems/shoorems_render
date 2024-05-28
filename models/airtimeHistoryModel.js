const mongoose =require('mongoose');
const myModel =  mongoose.model('airtimeHistory', {
  id:String,
  username:String,
  message:String,
  airtime_name:String,
  phone:String,
  amount:Number,
  status:String,
  date:Date

})
module.exports=myModel