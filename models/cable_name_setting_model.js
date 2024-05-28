const mongoose =require('mongoose');
const myModel =  mongoose.model('cable_name', {

  rest_id: Number,
  api_id: Number,
  cable_name:String,
  api:String,
  enable:Boolean
})
module.exports=myModel