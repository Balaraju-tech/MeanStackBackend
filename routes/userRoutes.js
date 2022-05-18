const express = require('express');
const router = express.Router();
const { verifyTokenAndGetUserDetails } = require('../security.utis');
const userController = require('../controllers/user-controller');
const common = require('../common/common');

router.get('/',common.use(verifyTokenAndGetUserDetails),  common.use(userController.getUsers));
router.post('/deleteUser/', common.use(verifyTokenAndGetUserDetails), common.use(userController.deleteUser));
router.post('/adduser/',common.use(verifyTokenAndGetUserDetails), common.use(userController.addUserIfNotExist));

module.exports = router;