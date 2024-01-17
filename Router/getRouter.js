const express = require("express");
const Router = new express.Router();
const DishObject = require('../Model/dishObject.js');
const authApi = require('../Middleware/authApi.js');

Router.get('/api/getdish/:dishName',authApi,async (req,res)=>{
    try
    {
        const dishName= req.params.dishName;
        const detail = await DishObject.findOne({dishName: dishName});
        if(detail){
            console.log(detail);
            res.json(detail);
        }
        else{
res.status(412).json({message:"Dish Not found "});
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(412).json({error:error});
    }
})
Router.get('/api/getall',authApi,async(req,res)=>{
    try
    {
       // const dishName= req.body.dishName;
        const detail = await DishObject.find();
        if(detail){
            console.log(detail);
            res.json(detail);
        }
        else{
res.status(412).json({message:"Dish Not found "});
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(412).json({error:error});
    }
})
module.exports=Router;