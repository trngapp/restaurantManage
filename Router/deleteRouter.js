const express = require("express");
const Router = new express.Router();
const DishObject = require("../Model/dishObject");
const authApi = require('../Middleware/authApi.js');

Router.delete("/api/delete",authApi,async (req,res)=>{

try
{

  const dishName=req.body.dishName;

  const find = await DishObject.findOne({dishName:dishName});
if(find)
{
    const deleteItem = await DishObject.deleteOne({dishName:dishName});

    if(deleteItem){
  console.log("deleted the dish ");
  res.status(200).json({message:`deleted the dish :'${dishName}'`});
    }
    else{
        console.log("Not deleted");
        res.status(412).json({message:"cannot delete the item"});
    }
}
else{
      res.status(412).send({message:"Item not available "});
}



}
catch(error)
{
console.log(error);
res.status(404).json({message:`some error occured : ${error}`});
}



})
module.exports=Router;