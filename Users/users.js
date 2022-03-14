const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
const usersDB = require("../model/users");
const usersDBA = require("../db/userDb");

let deleteUser = function(userName, res, callback){
    usersDB.collection.deleteOne({userName: userName},(err, data)=>{
        callback(err,data, res);
    });
}

let sendResponse = function(err, data, res){
    if(err){
        res.sendStatus(401);
    }
    if(data){
        res.json(data);
    }
}

router.get("/", async(req, res)=>{
    const data = await usersDB.find();
    if(data){
        res.json(data);
    }
    else{
        res.sendStatus(401);
    }
});

router.post("/adduser/", (req, res)=>{
    const userDetails = req.body.userDetails;
    const userNameFound = new Promise((resolve, reject)=>{
        usersDB.find({userName : userDetails.userName},(err, data)=>{
            if(data){
                resolve(data);
            }else{
                reject(err);
            }
        });
});
    
    userNameFound.then(data=>{
       if(data.length === 0){
           usersDBA.addUser(userDetails, res, sendResponse);
       }else{
           res.json({acknowledged: false});
       }
    }).catch(err=>{
        res.status(401).json({acknowledged: false});
    })
});

router.post("/deleteUser/", (req, res)=>{
    const userName = req.body.userName;
    const userDetails = new Promise((resolve, reject)=>{
        usersDB.find({userName: userName}, (err, data)=>{
            if(err){
                reject(err);
            }
            if(data){
                resolve(data);
            }
        });
    })
    userDetails.then(data=>{
        if(data.length!==0){
            deleteUser(userName, res, sendResponse);
        }else{
            console.log("No User found");
        }
    }).catch(err=>{
        console.log(err);
    })
})

module.exports= router;