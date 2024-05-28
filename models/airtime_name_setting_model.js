const mongoose =require('mongoose');
const myModel =  mongoose.model('airtime_name', {

  rest_id: Number,
  api_id: Number,
  airtime_name:String,
  api:String,
  enable:Boolean
})
module.exports=myModel