const express=require("express");
const Router=new express.Router();

Router.all('*' ,(req,res)=> {
    res.json({"error":"404 API Not Found"})
})

module.exports = Router;