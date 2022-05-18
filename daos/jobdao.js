const jobsDb = require('../db/jobs');  
const logger = require('../logger');

const getJobs = async()=>{
    try{
        const jobs = await jobsDb.find();
        return jobs;
    }catch(err){
        logger.error(err);
        throw err;
    }
};

const insertJob = async(jobDetails)=>{
    try{
        const data = await jobsDb.collection.insertOne({jobTitle: jobDetails.jobTitle, jobDescription: jobDetails.jobDescription, eligibility: jobDetails.eligibility, jobRole: jobDetails.jobRole, appliedBy: jobDetails.appliedBy});
        return data;
    }catch(err){
        logger.error(err);
        throw err;
    }
};

module.exports = {getJobs, insertJob};