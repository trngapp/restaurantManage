const Joi= require('joi');

const dishValidationSchema= Joi.object({
    dishName: Joi.string().required(),
    availableQuantity: Joi.number().min(0).required(),
    pricePerItem: Joi.number().min(1).required(),
    dishType: Joi.string().valid('maincourse', 'starter', 'dessert', 'beverage', 'other').required(),
    servesPeople: Joi.number().min(1).required(),
});



const updateDishValidationSchema= Joi.object({
    dishName: Joi.string().required(),
    availableQuantity: Joi.number().min(0).required(),
    pricePerItem: Joi.number().min(1).required()
});



const addDishSchemaCheck = (req,res,next)=>{
    const {error}=  dishValidationSchema.validate(
        req.body);
        if(error)
        {
            return res.status(400).json({
                message: 'Dish Add data Validation failed',
                errors: error
              });
        }
        next();
}

const updateDishSchemaCheck= (req,res,next)=>{
    const {error}= updateDishValidationSchema.validate(
        req.body);
        if(error)
        {
            return res.status(400).json({
                message: 'update Add data Validation failed',
                errors: error
              });
        }
        next();
}







module.exports={addDishSchemaCheck,updateDishSchemaCheck};
