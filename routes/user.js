const express = require("express");
const router = express.Router();
const { userAuthentication } = require("../controller/userController");

router.route("/user").post(userAuthentication);

module.exports = router;
