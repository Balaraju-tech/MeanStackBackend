
const fs = require("fs");
const jwt = require('jsonwebtoken');
const users = require("./model/users");

let createJWTToken = async function(userID){
    let secretKey = await fs.readFileSync(`D:/angular13/jobSearchPortal/jobSearchServer/secret.json`);
    secretKey = JSON.parse(secretKey);
    let token = await jwt.sign({id:userID}, secretKey.key, {expiresIn: 86400});
    return token;
}

let verifyTokenAndGetUserDetails = async function(req,res, next){
    const {cookies} = req;
    console.log("THE TOKEN FROM UI IS*************************************************");
    console.log(cookies)
    let secretKey = await fs.readFileSync(`D:/angular13/jobSearchPortal/jobSearchServer/secret.json`);
    const decoded = jwt.verify(cookieToken, secretKey);
    console.log("IAM IN THE MIDDLEWARE");
    console.log(decoded);
    const userDetails = users.findOne(decoded.id) 
    if (userDetails === null) {
        res.sendStatus(401);
      } else if (userDetails) {
            next();
       }
}

module.exports = {createJWTToken, verifyTokenAndGetUserDetails}