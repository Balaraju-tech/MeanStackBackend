const fs = require("fs");
const jwt = require("jsonwebtoken");
const users = require("./model/users");

let getSecretKey = async function () {
  let secretKey = await fs.readFileSync(
    `D:/angular13/jobSearchPortal/jobSearchServer/secret.json`
  );
  secretKey = JSON.parse(secretKey);
  return secretKey.key;
};

let createJWTToken = async function (userID) {
  let secretKey = await getSecretKey();
  let token = await jwt.sign({ id: userID }, secretKey, { expiresIn: 86400 });
  return token;
};

let verifyTokenAndGetUserDetails = async function (req, res, next) {
  console.log("THE HEADERS LOG IS ");
  console.log(req.headers);
  if (req.headers.authorization) {
    let token = req.headers.authorization;
    const bearertoken = token.split(" ");
    token = bearertoken[1];
    let secretKey = await getSecretKey();
    let decoded;
    try {
      decoded = await jwt.verify(token, secretKey);
      const userDetails = users.findOne(decoded.id);
      if (userDetails === null) {
        res.sendStatus(401);
      } else if (userDetails) {
        req.userName = userDetails.userName;
        next();
      }
    } catch (err) {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};

module.exports = { createJWTToken, verifyTokenAndGetUserDetails };
