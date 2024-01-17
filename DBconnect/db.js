const mongoose = require('mongoose');
require("dotenv").config();
//const DB='mongodb+srv://trng5836:Q4uR3vNouNVqaN3W@restaurantmanage.muw5wlg.mongodb.net/?retryWrites=true&w=majority'
const DB = process.env.MONGODATABASE_URI
mongoose.connect(DB,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log("connected...");})
.catch((error)=>{console.log(error)});