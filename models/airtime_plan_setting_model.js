const mongoose =require('mongoose');
const myModel =  mongoose.model('airtime_plan', {

  airtime_name:String,
  package:String,
  percentage:String
})
module.exports=myModel