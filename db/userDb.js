
const usersDB = require("../model/users");

let addUser= function(userDetail, res, callback){
    usersDB.collection.insertOne({
        userName: userDetail.userName,
        password: userDetail.password,
        qualification: userDetail.qualification,
        admin: userDetail.admin
    }, (err, data)=>{
            callback(err,data, res);
    });
};

module.exports= {addUser}