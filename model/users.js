const mongoose = require("mongoose");
const users = new mongoose.Schema({
                                userName: {type: String},
                                password: {type: String},
                                qualification: {type: String},
                                admin: {type: Boolean}
                                    });

module.exports = mongoose.model("user", users);