const mongoose =require('mongoose');
const myModel =  mongoose.model('formdatas', {
  rest_id: Number,
  api_id: Number,
  exam_name:String,
  api:String,
  price:Number,
  enable:Boolean
})
module.exports=myModel