const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
const jobsDB = require("../model/jobs");  

const getJobs = async()=>{
    const data = await jobsDB.find();
    return data;
}


const createJob = async(jobDetails)=>{
    const data = await jobsDB.collection.insertOne({jobTitle: jobDetails.jobTitle, jobDescription: jobDetails.jobDescription, eligibility: jobDetails.eligibility, jobRole: jobDetails.jobRole, appliedBy: jobDetails.appliedBy});
    return data;
}

module.exports = {getJobs, createJob};