const express = require("express");
const app = express();
const process = require('process')
const port = process.env.port || 8000; 
const mongoose = require("mongoose");
const cors = require("cors");
const AuthController = require("./routes/authRoutes");
const JobsController = require("./routes/jobRoutes");
const userRouteController = require("./routes/userRoutes");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(cors());

app.use("/auth", AuthController);

app.use("/jobs", JobsController);
app.use("/users", userRouteController);

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success:0,
        message: err.message,
        stack: err.stack,
    });
    next(err);
});

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