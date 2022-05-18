const fs = require('fs');
const jwt = require('jsonwebtoken');
const users = require('./db/users');

const getSecretKey = async function () {
    let secretKey = await fs.readFileSync(
        'D:/angular13/jobSearchPortal/jobSearchServer/secret.json'
    );
    secretKey = JSON.parse(secretKey);
    return secretKey.key;
};

const createJWTToken = async function (userDetails) {
    const secretKey = await getSecretKey();
    const token = await jwt.sign({ id: userDetails._id, admin: userDetails.admin }, secretKey, { expiresIn: 86400 });
    return token;
};

const verifyTokenAndGetUserDetails = async function (req, res, next) {
    if (req.headers.authorization) {
        let token = req.headers.authorization;
        const bearertoken = token.split(' ');
        token = bearertoken[1];
        const secretKey = await getSecretKey();
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
