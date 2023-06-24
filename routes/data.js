const express = require("express");
const router = express.Router();
const { userData } = require("../controller/dataController");

router.route("/charge").post(userData);

module.exports = router;
