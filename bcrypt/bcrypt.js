const bcrypt = require('bcrypt');

const comparePasswords = async(actualPassword, expectedPassword)=>{
    const passwordValid = await bcrypt.compareSync(actualPassword, expectedPassword);
    return passwordValid;
};

const encryptPassword = async(inputPassword)=>{
    const password = bcrypt.hashSync(inputPassword, 8);
    return password;
};

module.exports = {comparePasswords, encryptPassword};