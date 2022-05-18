const usersDb = require('../db/users');
const logger = require('../logger');

const getUsersList = async () => {
    let users;
    try {
        users = await usersDb.find();
        return users;
    } catch (err) {
        logger.error(err);
        throw err;
    }
};

const getUser = async (userDetails) => {
    try {
        const userDetailsFound = await usersDb.find({
            userName: userDetails.userName,
        });
        return userDetailsFound;
    } catch (err) {
        logger.error(err);
        throw err;
    }
};

const addUserIfNotExist = async(userDetail)=>{
    try {
        const data = await usersDb.collection.updateOne(
            { userName: userDetail.userName },
            {
                $setOnInsert: {
                    userName: userDetail.userName,
                    password: userDetail.password,
                    qualification: userDetail.qualification,
                    admin: userDetail.admin,
                },
            },
            { upsert: true }
        );
        return data;
    } catch (err) {
        logger.error(err);
        throw err;
    }
};

const deletUser = async (userDetails) => {
    try{
        const userDetailsFound = getUser(userDetails);
        return userDetailsFound;
    }catch(err){
        logger.error(err);
    }
};

module.exports = { getUsersList, addUserIfNotExist, deletUser };
