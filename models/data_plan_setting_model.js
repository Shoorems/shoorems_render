const mongoose =require('mongoose');
const myModel =  mongoose.model('data_plan', {
    package:String,
    data_name:String,
    rest_id: Number,
    api_id: Number,
    data_volume:Number,
    price_label:String,
    price:Number,
    profit:Number,
    enable:Boolean
})
module.exports=myModel