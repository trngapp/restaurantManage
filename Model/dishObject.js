const mongoose =require('mongoose');
const dishSchema=new mongoose.Schema({
    dishName:{
    type:String,
    required:true
    },
    availableQuantity:{
        type:Number,
        required:true
    },
    pricePerItem:{
        type:Number,
        required:true
    },
    dishType:{
        type:String,
        required:true
    },
    servesPeople:{
        type:Number,
        required:true
    }
})
const dishDetail = new mongoose.model("dish",dishSchema);
module.exports=dishDetail;