const express = require("express");
const app = express();
var cookieParser = require('cookie-parser'); 
app.use(cookieParser());

const AuthController = require("./Auth/login");
app.use("/auth", AuthController);

const ListOfJobsController = require("./Jobs/jobs");
app.use("/jobs", ListOfJobsController);

const ListOfUsersController = require("./Users/users");
app.use("/users", ListOfUsersController);

module.exports = app;
