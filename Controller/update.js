const DishObject=require('../Model/dishObject.js');
const updateDish = async (req,res)=>{
    try
    {
        const dishName=req.body.dishName;
        const availableQuantity=req.body.availableQuantity;
        const pricePerItem=req.body.pricePerItem;

        const filter = {dishName:dishName};
        const update={availableQuantity:availableQuantity, pricePerItem:pricePerItem};

        const findDish= await DishObject.findOneAndUpdate({dishName:dishName},{$set:{availableQuantity:availableQuantity, pricePerItem:pricePerItem}},{multi: true });
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

}
module.exports= {updateDish};