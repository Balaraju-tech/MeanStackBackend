const express = require("express");
const app = require("./app");
const port = process.env.port || 8000; 
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// app.options('*', cors({
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   }))

app.use('/*', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
  });

  


app.use(cookieParser());
mongoose.connect("mongodb://localhost:27017/local").then(()=>{
    console.log("Connection successful");
}).catch((err)=>{
    console.log(err);
    throw err;
});
mongoose.connection.on("connected", ()=>{
    console.log("MONGODB CONNECTION IS SUCCESSFUL");
});


app.listen(port, ()=>{
    console.log("App is listening on port ", port);
});