const loginService = require('../services/loginService');

const login = async(req, res)=>{
    const userDetails = await loginService.login(req.body);
    res.send(userDetails);
};

const signUp = async(req, res)=>{
    const loggedIn = await loginService.signup(req.body.userDetails);
    res.send(loggedIn);
};

const getLoggedInUserEmail = async(req, res) => {
    res.json({ userName: req.userName });
};


module.exports= {login, signUp, getLoggedInUserEmail};