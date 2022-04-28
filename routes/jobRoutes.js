const express = require("express");
const router = express.Router();
const { verifyTokenAndGetUserDetails } = require("../security.utis");
const jobController = require("../Jobs/job-controller");
const common= require("../common/common");

router.get("/", common.use(verifyTokenAndGetUserDetails), common.use(jobController.getJobs));
router.post("/createJob/", common.use(verifyTokenAndGetUserDetails), common.use(jobController.createJob));
module.exports = router;