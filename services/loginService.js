const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const security = require('../security.utis');
const bcrypt = require('../bcrypt/bcrypt');
const { verifyTokenAndGetUserDetails } = require('../security.utis');
const err = require('http-errors');
router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());
const {AppError} = require('../errorHandling/apiError');
const logindao = require('../daos/logindao');

const login = async (userData) => {
    const userDetails = await logindao.findUser(userData.userName);
    if(userDetails === null){
        throw new AppError(err.Unauthorized('Invalid username or password'));
    }else{
        const isPasswordValid = await bcrypt.comparePasswords(userData.password, userDetails.password);
        if (userData.userName === userDetails.userName && isPasswordValid === true) {
            const token = await security.createJWTToken(userDetails);
            let user = { loggedIn: true, token: token, isAdmin: userDetails.admin };
            return user;
        } else {
            throw new AppError(err.Unauthorized('Invalid username or password'));
        }
    }
};

const signup = async(userDetails)=>{

    const user = await logindao.findUser(userDetails.userName);
    if(user===null){
        const bcryptedPassword = await bcrypt.encryptPassword(userDetails.password, 8);
        const loggedIn = await logindao.signUpUser(userDetails.userName,bcryptedPassword,userDetails.qualification);
        const loginData = {loggedIn: loggedIn};
        return loginData;
    }else{
        throw new AppError(err.Unauthorized('username is already taken'));
    }
};



router.post(
    '/getLoggedInUserEmail',
    verifyTokenAndGetUserDetails,
    (req, res) => {
        res.json({ userName: req.userName });
    }
);

module.exports = { login, signup };
