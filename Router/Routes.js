const express = require("express");
const Router = new express.Router();
const authApi = require('../Middleware/authApi.js');
const {addDishSchemaCheck}=require("../Middleware/schemaValid.js")
const DishControllerAdd =require("../Controller/add.js")
const DishControllerDelete = require("../Controller/delete.js")
const DishControllerGet= require("../Controller/get.js")
const DishControllerPurchase=require("../Controller/purchase.js")
const DishControllerUpdate=require("../Controller/update.js")
const {updateDishSchemaCheck}=require("../Middleware/schemaValid.js");

Router.post('/api/dishadd',authApi,addDishSchemaCheck,DishControllerAdd.Dish);
 Router.delete("/api/delete/:dishName",authApi,DishControllerDelete.dishDelete);
Router.get('/api/getall',authApi,DishControllerGet.getAll);
Router.post('/api/purchase',authApi,DishControllerPurchase.purchaseDish);
Router.put('/api/updatedish',[authApi,updateDishSchemaCheck] , DishControllerUpdate.updateDish);
//Router.get('/api/getdish/:dishName',authApi,DishControllerGet.getDish);
Router.all('*' ,(req,res)=> {
    res.json({"error":"404 API Not Found"})
})
module.exports = Router;