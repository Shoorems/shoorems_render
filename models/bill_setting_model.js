const mongoose =require('mongoose');
const myModel =  mongoose.model('bill_setting', {
  rest_id: Number,
  api_id: Number,
  biller_name:String,
  api:String,
  charge:Number,
  enable:Boolean
})
module.exports=myModel