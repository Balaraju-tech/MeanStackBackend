const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
// const usersDB = require("../model/users");
const security = require("../security.utis");
const bcrypt = require("../bcrypt/bcrypt");
const { verifyTokenAndGetUserDetails } = require("../security.utis");
const err = require("http-errors");
router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());
const AppError = require("../errorHandling/apiError");
const logindao = require("./logindao");

const login = async (userData) => {
  const userDetails = await logindao.findUser(userData.userName);
  if(userDetails === null){
    throw new AppError(err.Unauthorized("Invalid username or password"));
  }else{
    const isPasswordValid = await bcrypt.comparePasswords(userData.password, userDetails.password);
    if (userData.userName === userDetails.userName && isPasswordValid === true) {
      const token = await security.createJWTToken();
      let user = { loggedIn: true, token: token, isAdmin: userDetails.admin };
      return user;
    } else {
      throw new AppError(err.Unauthorized("Invalid username or password"));
    }
  }

  // const user = await usersDB.findOne({ userName: userData.userName });
  // if (user === null) {
  //   throw new AppError(err.Unauthorized("Invalid username or password"));
  // } else {
  //   const isPasswordValid = bcrypt.compareSync(
  //     userData.password,
  //     user.password
  //   );
  //   if (userData.userName === user.userName && isPasswordValid === true) {
  //     const token = await security.createJWTToken();
  //     let userDetails = { loggedIn: true, token: token, isAdmin: user.admin };
  //     return userDetails;
  //   } else {
  //     throw new AppError(err.Unauthorized("Invalid username or password"));
  //   }
  // }
};

const signup = async(userDetails)=>{

  const user = await logindao.findUser(userDetails.userName);
  if(user===null){
    const bcryptedPassword = await bcrypt.encryptPassword(userDetails.password, 8);
    const loggedIn = await logindao.signUpUser(userDetails.userName,bcryptedPassword,userDetails.qualification);
    const loginData = {loggedIn: loggedIn};
    return loginData;
  }else{
    throw new AppError(err.Unauthorized("username is already taken"));
  }


  // const user = await usersDB.findOne({
  //   userName: userDetails.userName,
  // });
  // if (user === null) {
  //   const password = userDetails.password;
  //   const bcryptedPassword = bcrypt.hashSync(password, 8);
  //   await usersDB.collection.insertOne(
  //     {
  //       userName: userDetails.userName,
  //       password: bcryptedPassword,
  //       qualification: userDetails.qualification,
  //       admin: false,
  //     }
  //   );
  //   let loggedIn = {loggedIn: true};
  //   return loggedIn;
  // } else {
  //   throw new AppError(err.Unauthorized("username is already taken"));
  // }
};



router.post(
  "/getLoggedInUserEmail",
  verifyTokenAndGetUserDetails,
  (req, res) => {
    res.json({ userName: req.userName });
  }
);

module.exports = { login, signup };
