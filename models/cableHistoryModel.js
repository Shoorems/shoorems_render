const mongoose =require('mongoose');
const myModel =  mongoose.model('cableHistory', {
  id:String,
  username:String,
  message:String,
  cable_name:String,
  cable_plan:String,
  iuc_number:Number,
  customer_name:String,
  amount:Number,
  status:String,
  date:Date

})
module.exports=myModel