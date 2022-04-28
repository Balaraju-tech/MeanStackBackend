const usersDB = require('../model/users');

const findUser = async(userName)=>{
    let userDetails = null;
    try{
        userDetails = await usersDB.findOne({userName: userName});
    }catch(err){
        console.log(err);
        throw err;
    }
    return userDetails;
};

const signUpUser = async(userName, password, qualification)=>{
    let loggedIn = false;
    try{
    await usersDB.collection.insertOne({
        userName: userName,
        password: password,
        qualification: qualification,
        admin: false,
      });
      loggedIn = true;
    }catch(err){
        console.log(err);
        throw err;
    }
    return loggedIn;
}



module.exports = {findUser, signUpUser};