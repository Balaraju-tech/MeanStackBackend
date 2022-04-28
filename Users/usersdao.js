const usersDB = require("../model/users");

const getUsersList = async () => {
  let users;
  try {
    users = await usersDB.find();
    return users;
  } catch (err) {
    console.log("There is an error", err);
    throw err;
  }
};

const getUser = async (userDetails) => {
  try {
    const userDetailsFound = await usersDB.find({
      userName: userDetails.userName,
    });
    return userDetailsFound;
  } catch (err) {
    console.log("There is an error", err);
    throw err;
  }
};

const addUserIfNotExist = async(userDetail)=>{
  try {
    const data = await usersDB.collection.updateOne(
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
    console.log("There is an error", err);
    throw err;
  }
};

const deletUser = async (userDetails) => {
  const userDetailsFound = getUser(userDetails);
  return userDetailsFound;
};

module.exports = { getUsersList, addUserIfNotExist, deletUser };
