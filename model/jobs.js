const mongoose = require("mongoose");
const jobs = new mongoose.Schema({
                        jobTitle: {type: String},
                        jobDescription: {type: String},
                        eligibility: {type: Number},
                                    });

module.exports = mongoose.model("job", jobs);  