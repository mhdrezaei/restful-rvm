const express = require("express");
const router = express.Router();
const { statusChecker } = require("../controller/statusController");

router.route("/status").get(statusChecker);

module.exports = router;