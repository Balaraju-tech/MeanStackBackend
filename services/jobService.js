const express = require('express');
const router = express.Router();
const jobsdao = require('../daos/jobdao');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

const getJobs = async()=>{
    const data = await jobsdao.getJobs();
    return data;
};


const createJob = async(jobDetails)=>{
    const data = await jobsdao.insertJob(jobDetails);
    return data;
};

module.exports = {getJobs, createJob};