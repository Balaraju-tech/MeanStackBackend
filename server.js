const express = require('express');
const app = express();
const process = require('process');
const port = process.env.port || 8000; 
const mongoose = require('mongoose');
const cors = require('cors');
const AuthController = require('./routes/authRoutes');
const JobsController = require('./routes/jobRoutes');
const userRouteController = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const logger = require('./logger');
const {errorHandler} = require('./errorHandling/apiError');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(cors());
app.use('/auth', AuthController);
app.use('/jobs', JobsController);
app.use('/users', userRouteController);

app.use((err, req, res, next)=>{
    errorHandler(res, err);
    next(err);
});

mongoose.connect('mongodb://localhost:27017/local').then(()=>{
    logger.info('Connection successful');
}).catch((err)=>{
    logger.error('App has broken and the error is ',err);
    throw err;
});


app.listen(port, ()=>{
    logger.info('App is listening on port ', port);
});