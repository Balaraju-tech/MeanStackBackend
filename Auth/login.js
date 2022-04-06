const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const jobsDB = require("../model/jobs");
const usersDB = require("../model/users");
const app = require("../app");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const security = require("../security.utis");
const usersDBA = require("../db/userDb");
const bcrypt = require('bcrypt');
const { verifyTokenAndGetUserDetails } = require("../security.utis");

router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json()); 

let sendResponse = function (err, data, res) {
  if (err) {
    res.sendStatus(401);
  }
  if (data) {
    res.json(data);
  }
};

router.post("/login", async (req, res) => {
  let secretKey = fs.readFileSync(
    `D:/angular13/jobSearchPortal/jobSearchServer/secret.json`
  );
  secretKey = JSON.parse(secretKey);
  const userName = req.body.userName;
  const password = req.body.password;
  const user = await usersDB.findOne({ userName: userName });
  if (user === null) {
    res.sendStatus(401);
  } else {
    const isPasswordValid = bcrypt.compareSync(password, user.password); 
    if (userName === user.userName && isPasswordValid === true) {
      const token = await security.createJWTToken();
      res.status(200).json({ loggedIn: true, token: token, isAdmin: user.admin});
    } else {
      res.sendStatus(401);
    }
  }
});

router.post("/signup", async (req, res) => {;
  const user = await usersDB.findOne({
    userName: req.body.userDetails.userName,
  });
  if (user === null) {
    console.log("USER IS NULL");
    const token = await security.createJWTToken();
    const password = req.body.password;
    const bcryptedPassword = bcrypt.hashSync(password, 8);
    usersDB.collection.insertOne(
      {
        userName: req.body.userName,
        password: bcryptedPassword,
        qualification: req.body.qualification,
        admin: false,
      },
      (err, data) => {
          if(err) res.status(402).json({loggedIn: false});

          if(data){
            res.cookie('token',  token, { httpOnly: true, secure: false })
            .status(200)
            .json({ loggedIn: true  });
              
          }
      }
    );
  } else {
    res.status(501).json({loggedIn: false});
  }
});

router.post("/getLoggedInUserEmail",verifyTokenAndGetUserDetails, (req, res)=>{
    res.json({userName: req.userName});
})

module.exports = router;
