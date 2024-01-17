const express= require('express');
const Router= new express.Router();
const DishObject=require('../Model/dishObject.js');
const authApi = require('../Middleware/authApi.js');
const {updateDishSchemaCheck}=require("../Middleware/schemaValid.js");
Router.put('/api/updatedish',[authApi,updateDishSchemaCheck] ,async (req,res)=>{
    try
    {
        const dishName=req.body.dishName;
        const availableQuantity=req.body.availableQuantity;
        const pricePerItem=req.body.pricePerItem;

        const filter = {dishName:dishName};
        const update={availableQuantity:availableQuantity, pricePerItem:pricePerItem};

        const findDish= await DishObject.updateOne({dishName:dishName},{$set:{availableQuantity:availableQuantity, pricePerItem:pricePerItem}},{multi: true });
        if(findDish)
        {
                console.log(`dish is updated ${findDish}`);
                res.status(200).json({message:`Dish is updated : ${dishName}`});
        }
        else
        {
                console.log('No dish found');
                res.status(412).json({message:'No dish found'});
        }

    }
    catch(err){
                 console.log(err);
                 res.status(400).send(err);
    }

})
module.exports =Router;

