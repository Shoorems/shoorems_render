const mongoose =require('mongoose');
const myModel =  mongoose.model('billHistory', {
  id:String,
  username:String,
  message:String,
  disco_name:String,
  meter_type:String,
  meter_number:String,
  customer_name:String,
  amount:Number,
  purchase_code:String,
  status:String,
  date:Date

})
module.exports=myModel