const userService = require("./user-service");


const getUsers= async(req, res)=>{
    console.log("ENTERED GET LIST OF USERS CONTROLLER");
    res.send(await userService.getListOfUsers());
}

const deleteUser = async(req, res)=>{
    const userNameToDelete = req.body.userName;
    res.send(await userService.deleteUser(userNameToDelete));
}

const addUserIfNotExist = async(req, res)=>{
    let userDetails = req.body.userDetails;
    res.send(await userService.addUserIfNotExist(userDetails));
}
 


module.exports= {getUsers, deleteUser, addUserIfNotExist }