const usersDB = require('../db/users');
const usersDAO = require('../daos/usersdao');
const bcrypt = require('bcrypt');


const getListOfUsers = async()=>{
    const data = await usersDAO.getUsersList();
    return data;
};

const addUserIfNotExist = async(userDetails)=>{
    userDetails.password = await bcrypt.hashSync(userDetails.password, 8);
    let data = await usersDAO.addUserIfNotExist(userDetails);
    return data;
};

const deleteUser = async (usernameToDelete)=>{
    const userDetails = await usersDB.find({userName: usernameToDelete});
    let data;
    if(userDetails!== 0 ){
        data =  await usersDB.collection.deleteOne({userName: usernameToDelete});
    }
    else{
        data = {};
    }
    return data;      
};

module.exports= {getListOfUsers, deleteUser, addUserIfNotExist};