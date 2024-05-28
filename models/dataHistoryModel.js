const mongoose =require('mongoose');
const myModel =  mongoose.model('dataHistory', {
  id:String,
  username:String,
  message:String,
  data_name:String,
  bundle:String,
  volume:Number,
  phone:String,
  profit:Number,
  amount:Number,
  status:String,
  date:Date

})
module.exports=myModel