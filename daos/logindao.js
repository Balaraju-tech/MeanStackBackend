const usersDb = require('../db/users');
const logger = require('../logger');

const findUser = async(userName)=>{
    let userDetails = null;
    try{
        userDetails = await usersDb.findOne({userName: userName});
    }catch(err){
        logger.error(err);
        throw err;
    }
    return userDetails;
};

const signUpUser = async(userName, password, qualification)=>{
    let loggedIn = false;
    try{
        await usersDb.collection.insertOne({
            userName: userName,
            password: password,
            qualification: qualification,
            admin: false,
        });
        loggedIn = true;
    }catch(err){
        logger.error(err);
        throw err;
    }
    return loggedIn;
};



module.exports = {findUser, signUpUser};