const mongoose =require('mongoose');
const myModel =  mongoose.model('cable_plan', {
    package:String,
    cable_name:String,
    rest_id: Number,
    api_id: Number,
    price_label:String,
    price:Number,
    enable:Boolean
})
module.exports=myModel