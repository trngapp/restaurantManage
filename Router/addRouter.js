const express=require('express');
const Router= new express.Router();

const DishObject = require('../Model/dishObject.js');
const authApi = require('../Middleware/authApi.js');
const {addDishSchemaCheck}=require("../Middleware/schemaValid.js")

Router.post('/api/dishadd',[authApi,addDishSchemaCheck],async (req,res)=>{
try
{
   // console.log(req.body);

const dishName=req.body.dishName;
const availableQuantity=req.body.availableQuantity;
const pricePerItem=req.body.pricePerItem;
const dishType=req.body.dishType;
const servesPeople=req.body.servesPeople;

const Dish = new DishObject({
dishName:dishName,
availableQuantity:availableQuantity,
pricePerItem:pricePerItem,
dishType:dishType,
servesPeople:servesPeople
})

const find = await DishObject.findOne({dishName:dishName});
if(find)
{
    res.status(412).json({message:"already created"});

    console.log("dish already in the menue");
}
else
{
    const newDish = await Dish.save();
 res.status(200).json({message:`New dishItem is added to restaurant : ${dishName}`});
 console.log("new dish is added");
}


}
catch(error)
{
console.log(error);
res.json({error:error});
}
})
module.exports=Router;