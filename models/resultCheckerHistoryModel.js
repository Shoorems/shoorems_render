const mongoose =require('mongoose');
const myModel =  mongoose.model('resultCheckerHistory', {
  id:String,
  username:String,
  message:String,
  exam_name:String,
  quantity:Number,
  amount:Number,
  code:String,
  status:String,
  date:Date

})
module.exports=myModel