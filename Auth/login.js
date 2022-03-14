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
  } else if (userName === user.userName && password === user.password) {
    const token = await security.createJWTToken();

    res.cookie('token',  token, { httpOnly: false, secure: false, maxAge: 3600000 })
    .status(200)
    .json({ loggedIn: true  });
    // res.cookie('jwt',token, { httpOnly: true, secure: false, maxAge: 3600000 })

    // res.status(202).json({ loggedIn: true });
  } else {
    res.sendStatus(401);
  }
});

router.post("/signup", async (req, res) => {;
  const user = await usersDB.findOne({
    userName: req.body.userDetails.userName,
  });
  if (user === null) {
    const token = await security.createJWTToken();
    usersDB.collection.insertOne(
      {
        userName: req.body.userName,
        password: req.body.password,
        qualification: req.body.qualification,
        admin: req.body.admin,
      },
      (err, data) => {
          if(err) res.status(401).json({acknowledged: false});

          if(data){
            res.cookie('token',  token, { httpOnly: true, secure: false })
            .status(200)
            .json({ loggedIn: true  });
              
          }
      }
    );
  } else {
    res.status(401);
  }
});

module.exports = router;
