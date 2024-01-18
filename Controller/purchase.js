
const DishObject= require('../Model/dishObject');
const redis= require("../DBconnect/redis.js");
async function nodeRedisDemo(amountPaid) {
    try {
      //const client = createClient();
     // await client.connect();
      const Amount = await redis.get('paidAmountAll');
      if(Amount===null)
      {
        await redis.set('paidAmountAll', parseInt(amountPaid));

      }
      else{
       // await client.set('amountPaid', amountPaid);
      console.log(Amount);
      const val=parseInt(amountPaid)+parseInt(Amount);
       await redis.set('paidAmountAll', val);
       console.log("added");
      }



      //await redis.quit();
    } catch (e) {
      console.error(e);
    }
}


const purchaseDish = async (req,res)=>{



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
                  nodeRedisDemo(amountPaid);
  
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  }
  module.exports = {purchaseDish}