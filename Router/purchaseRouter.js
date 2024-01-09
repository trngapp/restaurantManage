const express = require('express');
const Router = new express.Router();
const DishObject= require('../Model/dishObject');
const {SET_SYNC} = require('../DBconnect/redis.js');
const { ConnectionStates } = require('mongoose');
const authApi = require('../Middleware/authApi.js');


////IGNORE ...................................................................................................................
/*const checkValidPurchase= async (req,res)=>{
  const amountPaid=req.body.amountPaid;
  const dishes= req.body.dishes;
  for(const element of dishes){

  console.log(dishes);
    const name= element.dishName;
    const quantity= element.quantity;

  const dishfind= await DishObject.findOne({$and:[{dishName:name},{availableQuantity:{$gte:quantity}}]})
  if(!dishfind)
  {
   // sum = sum + (dish.pricePerItem * quantity);
   valid = 'invalid';
   //return ;
  }





    }

}*/
//......................................................................................................................







Router.post('/api/purchase',authApi,async (req,res)=>{



  const amountPaid=req.body.amountPaid;
  const dishes= req.body.dishes;
  var valid=' ';
  var sum=0;


       Promise.all(
        dishes.map(async (element)=>{

        console.log(dishes);
          const name= element.dishName;
          const quantity= element.quantity;
           //CHECKS IF DISHNAME OR THE QUANTITY IS AVAILABLE IN THE DATABASE : DISHOBJECT
        const dishfind= await DishObject.findOne({$and:[{dishName:name},{availableQuantity:{$gte:quantity}}]})
        if(dishfind)
        {
          sum = sum + (dishfind.pricePerItem * quantity);


        }
        else
        {
          ////NOT AVAILABLE
            valid="invalid";

        }
      })).then(()=>{
console.log(sum);
        if(valid==="invalid")
        {
          ///DISH NOT AVAILABLE
           return res.status(412).json({message:"Dish not available"});
        }
        else
        {
        if(sum<=amountPaid)
        {
             ///PAID AMOUNT IS CORRECT
            /// TO UPDATE THE DISH AND RETURING THE CHANGE AMOUNT TO USER
             const changeAmount= Math.abs(sum - amountPaid);

             Promise.all(dishes.map(async (dish)=>{
              const name=dish.dishName;
              const quantity=dish.quantity;
            const update= await DishObject.updateOne({dishName:name},{$inc:{availableQuantity:-quantity}});
            if(!update){
              return res.status(412).json({message:"some error occurred"});
            }
             })).then(()=>{
                return res.json({message:"thank you for visiting",changeAmount:changeAmount});
             })




        }
        else
        {
          ///THE PAID AMOUNT IS INCORRECT
          return res.status(412).json({message:"amount paid is incorrect"});
        }
      }



      })














})
module.exports=Router;














