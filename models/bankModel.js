const mongoose =require('mongoose');
const myModel =  mongoose.model('banks', {
   username: String,
   accountNumber:String,
   accountName:String,
   bankName:String,
})
module.exports=myModel