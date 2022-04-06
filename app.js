const express = require("express");
const app = express();
var cookieParser = require('cookie-parser'); 
app.use(cookieParser());


module.exports = app;
