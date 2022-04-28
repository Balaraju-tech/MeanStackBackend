const express = require("express");
const router = express.Router();
const { verifyTokenAndGetUserDetails } = require("../security.utis");
const loginController = require("../auth/login-controller");
const common= require("../common/common");

router.post("/login", common.use(loginController.login));
router.post("/signup", common.use(loginController.signUp));
router.post("/getLoggedInUserEmail", common.use(verifyTokenAndGetUserDetails), common.use(loginController.getLoggedInUserEmail))

module.exports = router;