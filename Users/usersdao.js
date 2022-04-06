
const usersDB = require("../model/users");
const usersDBA = require("../db/userDb");

const getUsersList = async ()=>{
    try{
        const users = await usersDB.find();
        return users;
    }catch(err){
        throw err;
    }
}

const getUser = async(userDetails)=>{
    try{
        const userDetailsFound =await usersDB.find({userName : userDetails.userName});
        return userDetailsFound
    }
    catch(err){
        throw err;
    }
};


const addUser = async (userDetails)=>{
    const userDetailsFound = await getUser(userDetails);
    userDetails.password = bcrypt.hashSync(userDetails.password, 8);
       if(userDetailsFound === 0){
        try{
            const insertedData = await usersDB.collection.insertOne({
            userName: userDetail.userName,
            password: userDetail.password,
            qualification: userDetail.qualification,
            admin: userDetail.admin});
            return {data:insertedData};
        }
        catch(err){
            throw err;
        }
       }else{
           return {data: null};
       }
}

const deletUser = async(userName)=>{
    const userDetailsFound = getUser(userDetails);
    

}