const express=require("express");
const app = new express();
 const {SET_SYNC}=require('./DBconnect/redis.js');
require('./DBconnect/db.js')
//const Redis = require('redis');

app.use(express.json());
const addRouter=require("./Router/addRouter.js");
const deleteRouter=require("./Router/deleteRouter.js");
const getRouter=require("./Router/getRouter.js");
const purchaseRouter=require("./Router/purchaseRouter.js");
const updateRouter=require("./Router/updateRouter.js");
const errorHandler=require("./Router/invalidRouter.js");

const port=3336;





  SET_SYNC('hey','hello').then((x)=>{
    console.log(x);
 });



app.use(addRouter);

app.use(deleteRouter);

app.use(getRouter);

app.use(purchaseRouter);
app.use(updateRouter);
app.use(errorHandler);

app.listen(port,()=>{
    console.log("listening on port");
})