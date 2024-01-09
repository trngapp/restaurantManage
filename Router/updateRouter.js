const express= require('express');
const Router= new express.Router();
const DishObject=require('../Model/dishObject.js');
const authApi = require('../Middleware/authApi.js');

Router.put('/api/updatedish',authApi ,async (req,res)=>{
    try
    {
        const dishName=req.body.dishName;
        const availableQuantity=req.body.availableQuantity;
        const pricePerItem=req.body.pricePerItem;

        const filter = {dishName:dishName};
        const update={availableQuantity:availableQuantity, pricePerItem:pricePerItem};

        const findDish= await DishObject.findOneAndUpdate({filter,update});
        if(findDish)
        {
                console.log("dish is updated");
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

