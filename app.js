const express=require("express");
const kill = require('kill-port')
const app = new express();
 //const {GET_SYNC}=require('./DBconnect/redis.js');
require('./DBconnect/db.js')
//require('./DBconnect/redis.js')
//require('./redisDemo.js')
//const Redis = require('redis');

app.use(express.json());
const Routes=require("./Router/Routes.js");
/*const addRouter=require("./Router/addRouter.js");
const deleteRouter=require("./Router/deleteRouter.js");
const getRouter=require("./Router/getRouter.js");
const purchaseRouter=require("./Router/purchaseRouter.js");
const updateRouter=require("./Router/updateRouter.js");
const errorHandler=require("./Router/invalidRouter.js");*/

const port=3500;








app.use(Routes);
/*app.use(addRouter);

app.use(deleteRouter);

app.use(getRouter);

app.use(purchaseRouter);
app.use(updateRouter);
app.use(errorHandler);*/

const server=app.listen(port,()=>{
    /*setTimeout(()=>{
        kill(port, 'tcp')
        .then(console.log)
        .catch(console.log)
    },10000)*/
    console.log("listening on port");
});

const closeServer= (async ()=>{
    await server.close();
    console.log("server closed");
})
module.exports={
    app,closeServer
}