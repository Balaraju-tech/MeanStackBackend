const jobService = require('../Jobs/jobs');

const getJobs = async(req, res)=>{
    const data = await jobService.getJobs();
    res.json(data);
}

const createJob = async(req, res)=>{
        const data = await jobService.createJob(req.body)
        res.json(data);
}


module.exports = {getJobs, createJob};