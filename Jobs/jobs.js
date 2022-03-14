const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
const jobsDB = require("../model/jobs");  
const { verifyTokenAndGetUserDetails } = require("../security.utis");


router.get("/", verifyTokenAndGetUserDetails, async (req, res)=>{
    const data = await jobsDB.find();
    console.log(data);
    if(data){
        res.json(data);
    }
    else{
        res.sendStatus(401);
    }
});

router.post("/createJob", (req, res)=>{
    if(req.body){
        const insertData = new Promise((resolve, reject)=>{
            jobsDB.collection.insertOne({jobTitle: req.body.jobTitle, jobDescription: req.body.jobDescription, eligibility: req.body.eligibility},
                (err, data)=>{
                    if(err) reject(err);
                    if(data) resolve(data);
            })
        });
        insertData.then((data)=>{
            res.json(data);
            console.log("THE DATA IS ");
            console.log(data);
        }).catch((err)=>{
            res.status(401).json({statusMessage: "There is some problem sending the data to DB"});
        });
        console.log("End Data received");
    }
});

module.exports = router;