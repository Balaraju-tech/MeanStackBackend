const userService = require('../services/user-service');


const getUsers= async(req, res)=>{
    res.send(await userService.getListOfUsers());
};

const deleteUser = async(req, res)=>{
    const userNameToDelete = req.body.userName;
    res.send(await userService.deleteUser(userNameToDelete));
};

const addUserIfNotExist = async(req, res)=>{
    let userDetails = req.body.userDetails;
    res.send(await userService.addUserIfNotExist(userDetails));
};
 


module.exports= {getUsers, deleteUser, addUserIfNotExist };