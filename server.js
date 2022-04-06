const express = require("express");
const app = express();
const port = process.env.port || 8000; 
const mongoose = require("mongoose");
const cors = require("cors");
const AuthController = require("./Auth/login");
const ListOfJobsController = require("./Jobs/jobs");
const ListOfUsersController = require("./Users/users");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(cors());

app.use("/auth", AuthController);

app.use("/jobs", ListOfJobsController);

app.use("/users", ListOfUsersController);

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