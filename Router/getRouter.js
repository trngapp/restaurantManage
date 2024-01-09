const express = require("express");
const Router = new express.Router();
const DishObject = require('../Model/dishObject.js');
const authApi = require('../Middleware/authApi.js');

Router.get('/api/getdetail',authApi,async (req,res)=>{
    try
    {
        const dishName= req.body.dishName;
        const detail = await DishObject.findOne({dishName: dishName});
        if(detail){
            console.log(detail);
            res.json(detail);
        }
        else{
res.send("Dish Not found ");
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(404).send(error);
    }
})
module.exports=Router;