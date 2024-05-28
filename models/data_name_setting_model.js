const mongoose =require('mongoose');
const myModel =  mongoose.model('data_name', {
  api:String,
  rest_id: Number,
  api_id: Number,
  data_name:String,
  enable:Boolean
})
module.exports=myModel