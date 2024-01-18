const DishObject = require('../Model/dishObject.js');

const getDish = async (req,res)=>{
    try
    {
        const dishName= req.params.dishName;
        console.log(dishName);
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
}

const getAll = async(req,res)=>{
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
}
module.exports = {getDish,getAll}